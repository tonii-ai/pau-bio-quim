# PAU Biología y Química (Cataluña)

Web estática y gratuita para preparar la PAU de Biología y Química de Cataluña (convocatoria ordinaria de 2027): plan de estudio, temario por bloques, tarjetas con repaso espaciado, cuestionarios corregidos paso a paso, simulacros con temporizador y seguimiento del progreso.

- Sin servidor, sin cuentas, sin claves API y sin analítica.
- El progreso se guarda en el navegador (`localStorage`) y se puede exportar e importar como archivo `.json`.
- Funciona sin conexión una vez abierta (todo es local, no carga nada de internet).

## Cómo abrirla en tu ordenador

**Opción rápida:** haz doble clic en `index.html`. Se abre en el navegador y funciona tal cual.

**Opción con servidor local** (recomendable si vas a editar el contenido):

```bash
cd pau
python -m http.server 8000
# y abre http://localhost:8000
```

> El progreso se guarda por dirección: si abres la app como archivo (`file://…`) y otro día desde `http://localhost`, verás dos progresos distintos. Usa siempre la misma forma o pasa el progreso con Exportar/Importar.

## Cómo publicarla gratis

Cualquier alojamiento estático sirve, porque son solo archivos HTML, CSS y JS. Para publicar hace falta una cuenta gratuita en el servicio; para usar la web, no.

- **Netlify Drop:** entra en <https://app.netlify.com/drop> y arrastra la carpeta `pau`. Te da una URL al momento.
- **GitHub Pages:** sube la carpeta `pau` a un repositorio, ve a *Settings → Pages* y elige la rama y la carpeta. La web queda en `https://usuario.github.io/repositorio/`.
- **Cloudflare Pages:** crea un proyecto, sube la carpeta (sin paso de compilación) y publica.

En el móvil, abre la URL y usa «Añadir a pantalla de inicio» para tenerla como una app.

## Guardar y recuperar el progreso

1. Ve a **Progreso → Copia de seguridad → Exportar progreso**. Se descarga `pau-progreso-AAAA-MM-DD.json`.
2. Guarda el archivo en un lugar seguro (Drive, correo…).
3. Para recuperarlo, aquí o en otro dispositivo: **Progreso → Importar progreso** y eliges el archivo. Sustituye al progreso actual.

Haz una copia **antes de borrar los datos del navegador**, cambiar de móvil o usar el modo privado (en modo privado no se guarda nada al cerrar). Conviene exportar una vez por semana.

## Estructura

```
pau/
├── index.html                 Página única
├── css/styles.css             Estilos (colores en variables al principio; modo claro y oscuro)
├── data/                      CONTENIDO EDITABLE
│   ├── fuentes.js             Fuentes oficiales, qué está verificado y qué no
│   ├── temario-biologia.js    Bloques, temas, explicaciones y tarjetas de Biología
│   ├── temario-quimica.js     Ídem para Química
│   ├── tarjetas-2.js          Tarjetas añadidas al final de cada tema (no reordenar)
│   ├── preguntas-biologia.js  Preguntas de práctica (originales)
│   ├── preguntas-biologia-2.js  Ampliación: al menos 6 preguntas por tema
│   ├── preguntas-quimica.js
│   ├── preguntas-quimica-2.js
│   ├── preguntas-dificiles.js Problemas de nivel alto
│   ├── ejercicios.js          Ejercicios con contexto y apartados encadenados
│   ├── esquemas.js            Esquemas visuales (SVG) de algunos temas
│   └── glosario.js            Glosario catalán-castellano (términos y verbos de los enunciados)
├── manifest.webmanifest, icono.svg  Para instalarla como app en el móvil
├── sw.js                      Funcionamiento sin conexión cuando está publicada en internet
└── js/
    ├── store.js               Guardado local, exportar/importar, repaso espaciado
    ├── plan.js                Índice, estadísticas y generación del plan
    └── app.js                 Pantallas, navegación y cuestionarios
```

## Cómo añadir o cambiar contenido

**Una tarjeta:** añade `['pregunta', 'respuesta']` al final de la lista del tema en `data/tarjetas-2.js`. No cambies el orden de las existentes ni añadas tarjetas en `data/temario-*.js`, porque el progreso de cada tarjeta se guarda por su posición.

**Sesión inteligente (Hoy y Práctica):** elige 10 preguntas. Primero las falladas (vuelven a los 10 minutos), luego las acertadas que toca repasar (a los 3, 7, 21 y 60 días según los aciertos seguidos) y después preguntas nuevas de los temas más flojos.

**Un ejercicio con apartados:** añade un objeto a `PAU.ejercicios` en `data/ejercicios.js` con `id`, `asig`, `titulo`, `contexto` y `apartados` (cada apartado es una pregunta normal con su `tema`, sin `id`: se genera solo, como `eq1a`, `eq1b`…). Cada apartado debe poder responderse solo con el contexto, porque también puede salir suelto en un cuestionario.

**Un esquema:** añade una entrada a `PAU.esquemas` en `data/esquemas.js` con `titulo`, `descripcion` (texto alternativo) y `svg`. Usa `currentColor` y las variables de color (`var(--bio)`, `var(--qui)`, `var(--primary)`) para que se vea bien en modo oscuro, y `fill="none"` en las líneas.

**Informe de la semana (Progreso):** compara los últimos 7 días con los 7 anteriores y da recomendaciones concretas.

**Preguntas de desarrollo:** si la estudiante escribe su respuesta, la app marca los criterios cuyas palabras clave aparecen en el texto. Es una ayuda: ella confirma o corrige la valoración.

**Una pregunta:** añade un objeto a `data/preguntas-*.js` con un `id` nuevo y único:

```js
{ id: 'pq200', tema: 'q2t4', tipo: 'numerica', dificultad: 2,
  enunciado: '…', valor: 2.87, tolerancia: 0.02, unidad: '',
  modelo: 'Respuesta breve', pasos: ['Paso 1…', 'Paso 2…'] }
```

Tipos: `test` (`opciones`, `correcta` = índice desde 0), `numerica` (`valor`, `tolerancia`, `unidad`), `corta` y `desarrollo` (`criterios` para autoevaluarse).

En las `corta`, usa `aceptadas: ['a', 'b']` si basta con una de las palabras clave, o `requeridas: [['etanol'], ['co2', 'dioxido de carbono']]` si la respuesta tiene varias partes y deben aparecer todas. Escríbelas sin tildes. Si la respuesta lleva una negación («no es…») o no coincide, la app pide a la estudiante que la valore ella misma.

Las respuestas numéricas admiten coma o punto, notación científica, fracciones (1/4) y la unidad detrás («199,5 kJ/mol»).

**Si publicas la web y cambias archivos,** sube el número de `VERSION` en `sw.js` (por ejemplo, `pau-v3`) para que los móviles descarguen la versión nueva. Si añades un archivo, añádelo también a la lista `ARCHIVOS`.

**Un tema sin contenido fiable:** deja `puntos: []` y añade `pendiente: 'Texto explicando qué falta'`. La app lo mostrará como contenido pendiente.

Todas las preguntas actuales son **originales de práctica**. Si algún día añades una pregunta de un examen oficial, indícalo en el enunciado (convocatoria y año) y enlaza la fuente.

## Fuentes y verificación (consulta: 31/10/2026)

- Química: *Orientacions per a l'examen de Química PAU-2026* (Generalitat, Canal Universitats).
- Biología: *Orientacions al currículum de Biologia*, «Orientacions 2026» (coordinación PAU Biología, UB).
- Formato: exámenes y criterios de la convocatoria ordinaria de 2025 (Canal Universitats).

**Pendiente de comprobar** (también aparece en la pantalla *Fuentes* de la app):

- Si se publican orientaciones específicas para la PAU 2027 (el 31/10/2026 no existían) y si cambian algo.
- La fecha oficial de la PAU 2027 y qué día cae cada asignatura (la app usa el 1 de junio de 2027 como fecha provisional y editable).
- La duración de cada examen (el simulacro usa 90 minutos por defecto).
- Que el formato de 2027 siga siendo el de 2025.
