/*
 * Service worker: guarda la app en el dispositivo para que funcione sin conexión cuando está publicada
 * en internet (en file:// los navegadores no lo permiten, pero allí ya funciona sin conexión).
 * Estrategia: responde con la copia guardada y la actualiza en segundo plano.
 * Si cambias archivos, sube VERSION para que se descarguen de nuevo.
 */
const VERSION = 'pau-v5';
const ARCHIVOS = [
  './', 'index.html', 'css/styles.css', 'manifest.webmanifest', 'icono.svg',
  'data/fuentes.js', 'data/temario-biologia.js', 'data/temario-quimica.js', 'data/tarjetas-2.js',
  'data/preguntas-biologia.js', 'data/preguntas-biologia-2.js',
  'data/preguntas-quimica.js', 'data/preguntas-quimica-2.js', 'data/preguntas-dificiles.js', 'data/ejercicios.js', 'data/esquemas.js', 'data/glosario.js', 'data/saludos.js',
  'js/store.js', 'js/plan.js', 'js/app.js'
];

self.addEventListener('install', function (ev) {
  ev.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(ARCHIVOS); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (ev) {
  ev.waitUntil(caches.keys().then(function (claves) {
    return Promise.all(claves.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (ev) {
  const req = ev.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  ev.respondWith(caches.open(VERSION).then(function (cache) {
    return cache.match(req, { ignoreSearch: true }).then(function (guardada) {
      const red = fetch(req).then(function (resp) {
        if (resp && resp.ok) cache.put(req, resp.clone());
        return resp;
      }).catch(function () { return guardada; });
      return guardada || red;
    });
  }));
});
