/*
 * Estado y persistencia local (localStorage). No se envía nada a ningún servidor.
 * Incluye exportación/importación JSON y la lógica de repaso espaciado de las tarjetas.
 */
window.PAU = window.PAU || {};

PAU.store = (function () {
  const KEY = 'pau-cat-progreso-v1';
  const VERSION = 1;
  const DIA = 24 * 60 * 60 * 1000;

  let disponible = true;
  let state = cargar();

  function nuevoEstado() {
    return {
      version: VERSION,
      creado: new Date().toISOString(),
      ajustes: {
        fechaExamen: '2027-06-01',
        minutosDia: 60,
        diasSemana: [1, 2, 3, 4, 5, 6], // 0 = domingo
        duracionSimulacro: 90
      },
      temas: {},      // id → { estado: 'pendiente'|'en-curso'|'dominado', prioridad: bool, visto: fecha }
      tarjetas: {},   // id → { intervalo (días), facilidad, vence (ms), repeticiones, fallos }
      respuestas: {}, // id pregunta → { intentos, aciertos, ultima: 0..1, fecha, historial: [0..1] }
      sesiones: [],   // { fecha, tipo, asignatura, total, puntos, porTema: {id: [puntos, total]} }
      diasHechos: {}  // 'AAAA-MM-DD' → minutos estimados
    };
  }

  function cargar() {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (!raw) return nuevoEstado();
      return normalizar(JSON.parse(raw));
    } catch (e) {
      disponible = false;
      return nuevoEstado();
    }
  }

  // Completa campos que falten (copias antiguas o importadas) sin perder lo que haya.
  function normalizar(s) {
    const base = nuevoEstado();
    if (!s || typeof s !== 'object') return base;
    const out = Object.assign(base, s);
    out.ajustes = Object.assign(nuevoEstado().ajustes, s.ajustes || {});
    ['temas', 'tarjetas', 'respuestas', 'diasHechos'].forEach(function (k) {
      if (!out[k] || typeof out[k] !== 'object' || Array.isArray(out[k])) out[k] = {};
    });
    if (!Array.isArray(out.sesiones)) out.sesiones = [];
    out.version = VERSION;
    return out;
  }

  function guardar() {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state));
      disponible = true;
      return true;
    } catch (e) {
      disponible = false;
      return false;
    }
  }

  function hoyISO(d) {
    const x = d || new Date();
    const m = String(x.getMonth() + 1).padStart(2, '0');
    const dd = String(x.getDate()).padStart(2, '0');
    return x.getFullYear() + '-' + m + '-' + dd;
  }

  /* ── Temas ── */
  function tema(id) {
    return state.temas[id] || { estado: 'pendiente', prioridad: false };
  }
  function setTema(id, cambios) {
    state.temas[id] = Object.assign({}, tema(id), cambios);
    guardar();
  }

  /* ── Tarjetas: repaso espaciado sencillo ──
   * «Otra vez»: vuelve en 10 minutos y cuenta como fallo.
   * «Difícil»: intervalo corto (×1,2; mínimo 1 día).
   * «Fácil»: intervalo creciente (1 → 3 → ×facilidad).
   */
  function tarjeta(id) {
    return state.tarjetas[id] || null;
  }
  function valorarTarjeta(id, valor) {
    const ahora = Date.now();
    const t = Object.assign({ intervalo: 0, facilidad: 2.3, repeticiones: 0, fallos: 0, vence: ahora }, state.tarjetas[id] || {});
    if (valor === 'otra') {
      t.intervalo = 0;
      t.fallos += 1;
      t.facilidad = Math.max(1.3, t.facilidad - 0.2);
      t.vence = ahora + 10 * 60 * 1000;
    } else if (valor === 'dificil') {
      t.intervalo = Math.max(1, Math.round(t.intervalo * 1.2));
      t.facilidad = Math.max(1.3, t.facilidad - 0.15);
      t.vence = ahora + t.intervalo * DIA;
    } else {
      t.intervalo = t.intervalo < 1 ? 1 : (t.intervalo < 3 ? 3 : Math.round(t.intervalo * t.facilidad));
      t.facilidad = Math.min(3, t.facilidad + 0.05);
      t.vence = ahora + t.intervalo * DIA;
    }
    t.repeticiones += 1;
    t.ultima = valor;
    state.tarjetas[id] = t;
    guardar();
    return t;
  }

  /* ── Preguntas ── */
  function registrarRespuesta(id, puntos) {
    const r = Object.assign({ intentos: 0, aciertos: 0, historial: [] }, state.respuestas[id] || {});
    r.intentos += 1;
    r.aciertos += puntos;
    r.ultima = puntos;
    r.fecha = new Date().toISOString();
    r.historial = (r.historial || []).concat(puntos).slice(-10);
    state.respuestas[id] = r;
    guardar();
  }
  function registrarSesion(s) {
    state.sesiones.push(Object.assign({ fecha: new Date().toISOString() }, s));
    if (state.sesiones.length > 500) state.sesiones = state.sesiones.slice(-500);
    marcarDia(Math.max(5, Math.round((s.total || 0) * 2)));
    guardar();
  }
  function marcarDia(minutos) {
    const k = hoyISO();
    state.diasHechos[k] = (state.diasHechos[k] || 0) + (minutos || 0);
    guardar();
  }

  /* ── Copia de seguridad ── */
  function exportar() {
    const data = JSON.stringify(Object.assign({ app: 'pau-cat-biologia-quimica', exportado: new Date().toISOString() }, state), null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pau-progreso-' + hoyISO() + '.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  // Devuelve una promesa con { ok, mensaje }.
  function importar(file) {
    return new Promise(function (resolve) {
      if (!file) return resolve({ ok: false, mensaje: 'No se ha seleccionado ningún archivo.' });
      if (file.size > 5 * 1024 * 1024) return resolve({ ok: false, mensaje: 'El archivo es demasiado grande para ser una copia de esta aplicación.' });
      const reader = new FileReader();
      reader.onerror = function () { resolve({ ok: false, mensaje: 'No se ha podido leer el archivo.' }); };
      reader.onload = function () {
        let data;
        try {
          data = JSON.parse(reader.result);
        } catch (e) {
          return resolve({ ok: false, mensaje: 'El archivo no es un JSON válido. Comprueba que sea una copia exportada desde esta aplicación.' });
        }
        if (!data || typeof data !== 'object' || !data.ajustes || !data.temas) {
          return resolve({ ok: false, mensaje: 'El archivo no parece una copia de progreso de esta aplicación.' });
        }
        delete data.app;
        delete data.exportado;
        state = normalizar(data);
        const ok = guardar();
        resolve(ok
          ? { ok: true, mensaje: 'Copia importada correctamente.' }
          : { ok: false, mensaje: 'Se ha leído la copia, pero el navegador no permite guardarla (¿modo privado o almacenamiento lleno?).' });
      };
      reader.readAsText(file);
    });
  }

  function borrarTodo() {
    state = nuevoEstado();
    try { window.localStorage.removeItem(KEY); } catch (e) { /* sin almacenamiento */ }
    guardar();
  }

  return {
    get state() { return state; },
    get disponible() { return disponible; },
    guardar: guardar,
    hoyISO: hoyISO,
    tema: tema,
    setTema: setTema,
    tarjeta: tarjeta,
    valorarTarjeta: valorarTarjeta,
    registrarRespuesta: registrarRespuesta,
    registrarSesion: registrarSesion,
    marcarDia: marcarDia,
    exportar: exportar,
    importar: importar,
    borrarTodo: borrarTodo
  };
})();
