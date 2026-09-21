# 🌻 Flores Amarillas para Fer — versión 2

Experiencia web romántica interactiva, preparada para publicar con GitHub Pages.

## Recorrido

1. **Inicio** — un girasol espera a que Fer lo toque.
2. **Crecimiento** — nace el árbol y aparecen las ramas.
3. **Corazón floral** — las flores amarillas forman una copa con forma de corazón.
4. **Foto + carta** — aparece la foto de Fer y una carta que se abre.
5. **Recuerdos** — una pequeña sección resume lo que significa compartir estos días.
6. **Final** — “Te volvería a elegir a ti” mientras siguen cayendo pétalos.

## Detalles añadidos

- Animaciones suaves y secuenciales.
- Pétalos amarillos durante las escenas finales.
- Destellos dorados.
- Canción MP3 integrada: `assets/cancion.mp3`.
- Botón para reproducir/pausar la canción.
- Carta que se abre y se cierra.
- Diseño responsive para celular y PC.
- Respeto por `prefers-reduced-motion`.
- Botón para reiniciar toda la experiencia.
- La foto está incluida en `assets/fer.jpeg`.

## Publicarlo en GitHub Pages

1. Crea un repositorio, por ejemplo `flores-amarillas-fer`.
2. Sube `index.html`, `style.css`, `script.js` y la carpeta `assets`.
3. Ve a **Settings → Pages**.
4. En **Build and deployment**, selecciona **Deploy from a branch**.
5. Elige la rama `main` y la carpeta `/ (root)`.
6. Guarda.

Tu enlace quedará parecido a:

`https://TU-USUARIO.github.io/flores-amarillas-fer/`

## Importante sobre la foto

Si el repositorio es público, la fotografía también será accesible desde el sitio. Si prefieres mantenerla fuera de un repositorio público, usa un repositorio privado o cambia la estrategia de alojamiento de la imagen.

## Personalización rápida

Todo el texto principal está en `index.html` y `script.js`.

Si quieres cambiar “212 días”, busca `212` en esos archivos.

La experiencia no depende de un framework ni de un servidor: son HTML, CSS y JavaScript normales.

## 🎵 Canción

La canción que subiste está incluida como `assets/cancion.mp3` y comienza cuando se toca el girasol. Se mantiene en reproducción durante toda la experiencia y puede pausarse desde el botón de música.

Si publicas el repositorio en GitHub, el archivo MP3 también quedará dentro del repositorio público si el repositorio es público.
