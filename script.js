const scenes = {
  intro: document.getElementById("intro"),
  growth: document.getElementById("growth"),
  heart: document.getElementById("heart"),
  letterScene: document.getElementById("letterScene"),
  memories: document.getElementById("memories"),
  final: document.getElementById("final")
};
const progressBar = document.getElementById("progressBar");
const flowers = document.getElementById("flowers");
const growthLine = document.getElementById("growthLine");
const petals = document.getElementById("petals");
const stars = document.getElementById("stars");
const message = document.getElementById("message");

let petalTimer = null;
let audioOn = false;
const song = document.getElementById("song");
song.volume = 0.72;


function showScene(name){
  Object.values(scenes).forEach(s => s.classList.remove("active"));
  scenes[name].classList.add("active");
  const order = Object.keys(scenes);
  progressBar.style.width = `${((order.indexOf(name)+1)/order.length)*100}%`;
}

function addPetal(){
  const p=document.createElement("span");
  p.className="petal";
  p.style.left=Math.random()*100+"%";
  p.style.setProperty("--drift",(Math.random()*190-95)+"px");
  p.style.animationDuration=(6+Math.random()*6)+"s";
  p.style.transform=`rotate(${Math.random()*180}deg)`;
  petals.appendChild(p);
  setTimeout(()=>p.remove(),13000);
}
function startPetals(){
  if(petalTimer) return;
  for(let i=0;i<12;i++) setTimeout(addPetal,i*130);
  petalTimer=setInterval(addPetal,430);
}
function stopPetals(){clearInterval(petalTimer);petalTimer=null}

function addStars(){
  stars.innerHTML="";
  for(let i=0;i<22;i++){
    const s=document.createElement("span");
    s.className="star";
    s.style.left=(8+Math.random()*84)+"%";
    s.style.top=(7+Math.random()*76)+"%";
    s.style.animationDelay=(Math.random()*2)+"s";
    stars.appendChild(s);
  }
}

function flowerSVG(x,y,s=.7,delay=0){
  let p="";
  for(let i=0;i<10;i++){
    const a=i*36;
    p += `<ellipse cx="${x}" cy="${y-14*s}" rx="${5*s}" ry="${14*s}" fill="#e9b62e" transform="rotate(${a} ${x} ${y})"/>`;
  }
  return `<g class="flower" style="animation-delay:${delay}s">${p}
    <circle cx="${x}" cy="${y}" r="${8*s}" fill="#60421f"/>
    <circle cx="${x-2*s}" cy="${y-2*s}" r="${2*s}" fill="#94703a" opacity=".8"/>
  </g>`;
}

// Corazón floral: puntos exteriores + interiores para evitar el aspecto de "círculo".
const heart=[];
for(let i=0;i<=34;i++){
  const t=Math.PI*2*i/34;
  heart.push([450+245*Math.pow(Math.sin(t),3),
    265-(190*Math.cos(t)-72*Math.cos(2*t)-42*Math.cos(3*t)-20*Math.cos(4*t))]);
}
[[450,190],[405,220],[495,220],[370,255],[530,255],[400,275],[500,275],
 [350,300],[550,300],[420,315],[480,315],[450,345]].forEach(p=>heart.push(p));
flowers.innerHTML=heart.map((p,i)=>flowerSVG(p[0],p[1],i%5===0?.84:.68,Math.min(i*.04,1.45))).join("");

async function growTree(){
  showScene("growth");
  scenes.growth.classList.add("growing");
  growthLine.textContent="Ten paciencia...";
  await sleep(1300);
  growthLine.textContent="Ya está creciendo.";
  await sleep(1800);
  growthLine.textContent="Y poco a poco...";
  scenes.growth.classList.add("blooming");
  addStars();
  startPetals();
  await sleep(2700);
  showScene("heart");
  scenes.growth.classList.remove("growing","blooming");
}

document.getElementById("sunflower").addEventListener("click",()=>{
  startSong();
  growTree();
});

document.getElementById("openLetter").addEventListener("click",()=>{
  showScene("letterScene");
});

const paragraphs=[
"Dicen que las flores amarillas representan la alegría, la esperanza y los sentimientos que queremos conservar para siempre.",
"Y hoy quería regalarte estas flores de una forma diferente.",
"Porque desde hace <strong>212 días</strong> tengo la suerte de compartir mi vida contigo.",
"Durante este tiempo hemos vivido momentos hermosos, hemos aprendido mucho el uno del otro y hemos construido recuerdos que guardo con muchísimo cariño.",
"He aprendido que no son solo los momentos fáciles los que fortalecen una relación.",
"A veces son las conversaciones difíciles las que más nos ayudan a crecer, entendernos mejor y unirnos aún más.",
"Y cada vez que superamos algo juntos, me doy cuenta de que no hay nadie con quien prefiera compartir mi vida.",
"Como diría una de mis nuevas frases favoritas: <em>“You have bewitched me, body and soul.”</em>",
"Y creo que no hay una mejor forma de describir lo que siento.",
"Gracias por escucharme. Gracias por acompañarme. Gracias por quedarte. Gracias por ser tú.",
"<strong>💛 Te burda amo muchísimo, Fer. 💛</strong>"
];

let typed=false;
async function typeMessage(){
  if(typed) return;
  typed=true;
  message.innerHTML="";
  for(const text of paragraphs){
    const p=document.createElement("p");
    message.appendChild(p);
    const temp=document.createElement("div");
    temp.innerHTML=text;
    const plain=temp.textContent;
    let out="";
    for(let i=0;i<plain.length;i+=3){
      out+=plain.slice(i,i+3);
      p.textContent=out;
      await sleep(16);
    }
    p.innerHTML=text;
    await sleep(220);
  }
}

const letter=document.getElementById("letter");
const letterToggle=document.getElementById("letterToggle");
function toggleLetter(){
  const open=letter.classList.toggle("open");
  letterToggle.classList.toggle("open",open);
  letterToggle.innerHTML=open?'Cerrar la carta <span>↑</span>':'Abrir la carta <span>↓</span>';
  if(open) typeMessage();
}
letterToggle.addEventListener("click",toggleLetter);
document.getElementById("closeLetter").addEventListener("click",toggleLetter);
document.getElementById("continueMemories").addEventListener("click",()=>{ letter.classList.remove("open"); letterToggle.classList.remove("open"); letterToggle.innerHTML='Abrir la carta <span>↓</span>'; showScene("memories"); });

document.getElementById("toFinal").addEventListener("click",()=>{
  showScene("final");
  addStars();
  startPetals();
});

document.getElementById("restart").addEventListener("click",()=>{
  stopPetals();
  petals.innerHTML="";
  stars.innerHTML="";
  letter.classList.remove("open");
  letterToggle.classList.remove("open");
  letterToggle.innerHTML='Abrir la carta <span>↓</span>';
  typed=false;
  showScene("intro");
});

async function startSong(){
  try{
    await song.play();
    audioOn = true;
    document.getElementById("musicToggle").classList.add("on");
  }catch(e){
    // Some browsers require the play call to happen after a direct user gesture.
  }
}

document.getElementById("musicToggle").addEventListener("click", async ()=>{
  if(song.paused){
    await startSong();
  }else{
    song.pause();
    audioOn = false;
    document.getElementById("musicToggle").classList.remove("on");
  }
});
