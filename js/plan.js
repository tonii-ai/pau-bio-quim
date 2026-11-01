/*
 * Índice del temario, estadísticas por tema y generación del plan de estudio.
 * Funciones puras sobre PAU.asignaturas, PAU.preguntas y el estado de PAU.store.
 */
window.PAU = window.PAU || {};

PAU.plan = (function () {
  const store = PAU.store;
  const DIA = 24 * 60 * 60 * 1000;

  /* ── Índice ── */
  const temas = [];
  const temaPorId = {};
  const asignaturaPorId = {};
  PAU.asignaturas.forEach(function (a) {
    asignaturaPorId[a.id] = a;
    a.bloques.forEach(function (b) {
      b.temas.forEach(function (t) {
        const info = { tema: t, bloque: b, asignatura: a };
        temas.push(info);
        temaPorId[t.id] = info;
      });
    });
  });

  const preguntasPorTema = {};
  const preguntaPorId = {};
  PAU.preguntas.forEach(function (p) {
    if (!temaPorId[p.tema]) return; // pregunta de un tema inexistente: se ignora
    (preguntasPorTema[p.tema] = preguntasPorTema[p.tema] || []).push(p);
    preguntaPorId[p.id] = p;
  });

  function tarjetasDe(temaId) {
    const t = temaPorId[temaId].tema;
    return (t.tarjetas || []).map(function (c, i) {
      return { id: temaId + '-c' + i, temaId: temaId, anverso: c[0], reverso: c[1] };
    });
  }

  function temasDe(asigId) {
    return temas.filter(function (x) { return !asigId || x.asignatura.id === asigId; });
  }

  /* ── Estadísticas ── */
  function statsTema(temaId) {
    const ps = preguntasPorTema[temaId] || [];
    let respondidas = 0, suma = 0, intentos = 0;
    ps.forEach(function (p) {
      const r = store.state.respuestas[p.id];
      if (r) { respondidas++; suma += r.ultima; intentos += r.intentos; }
    });
    const cards = tarjetasDe(temaId);
    const ahora = Date.now();
    let vistas = 0, debidas = 0, fallos = 0, aprendidas = 0;
    cards.forEach(function (c) {
      const s = store.tarjeta(c.id);
      if (!s) return;
      vistas++;
      fallos += s.fallos || 0;
      if (s.vence <= ahora) debidas++;
      if (s.intervalo >= 3) aprendidas++;
    });
    return {
      preguntas: ps.length,
      respondidas: respondidas,
      intentos: intentos,
      acierto: respondidas ? suma / respondidas : null,
      tarjetas: cards.length,
      vistas: vistas,
      debidas: debidas,
      aprendidas: aprendidas,
      fallos: fallos
    };
  }

  // 0 = sin problemas · 1 = muy débil. Combina aciertos, fallos en tarjetas y estado.
  function debilidad(temaId) {
    const s = statsTema(temaId);
    const estado = store.tema(temaId).estado;
    const errPreg = s.acierto === null ? 0.5 : 1 - s.acierto;
    const errTarj = s.vistas ? Math.min(1, s.fallos / (s.vistas * 2)) : 0.5;
    let d = errPreg * 0.65 + errTarj * 0.35;
    if (estado === 'dominado') d *= 0.6;
    if (estado === 'pendiente') d = Math.max(d, 0.6);
    if (store.tema(temaId).prioridad) d += 0.25;
    return d;
  }

  function temasDebiles(asigId, n) {
    return temasDe(asigId)
      .filter(function (x) { return statsTema(x.tema.id).respondidas > 0 || store.tema(x.tema.id).estado !== 'pendiente'; })
      .map(function (x) { return { info: x, d: debilidad(x.tema.id), s: statsTema(x.tema.id) }; })
      .filter(function (o) { return o.d >= 0.35; })
      .sort(function (a, b) { return b.d - a.d; })
      .slice(0, n || 5);
  }

  /* Repaso espaciado de preguntas: una pregunta fallada vuelve pronto; una acertada,
   * cada vez más tarde (3, 7, 21 y 60 días según los aciertos seguidos). */
  const INTERVALO_ACIERTO = [3, 7, 21, 60];
  function preguntaVencida(id, ahora) {
    const r = store.state.respuestas[id];
    if (!r || !r.fecha) return false;
    const pasado = ahora - new Date(r.fecha).getTime();
    if (r.ultima < 1) return pasado > 10 * 60000;
    let racha = 0;
    for (let i = (r.historial || []).length - 1; i >= 0 && r.historial[i] >= 1; i--) racha++;
    return pasado > INTERVALO_ACIERTO[Math.min(Math.max(racha, 1), INTERVALO_ACIERTO.length) - 1] * DIA;
  }

  // Sesión inteligente: falladas que tocan, repasos de acertadas, preguntas nuevas de los temas flojos y del resto.
  function sesionInteligente(n, asigId) {
    n = n || 10;
    const ahora = Date.now();
    const valida = function (p) { return !asigId || temaPorId[p.tema].asignatura.id === asigId; };
    const todas = PAU.preguntas.filter(valida);
    const resp = store.state.respuestas;
    const azar = function (lista) { return lista.map(function (x) { return [Math.random(), x]; }).sort(function (a, b) { return a[0] - b[0]; }).map(function (x) { return x[1]; }); };
    const falladas = azar(todas.filter(function (p) { return resp[p.id] && resp[p.id].ultima < 1 && preguntaVencida(p.id, ahora); }));
    const repasos = azar(todas.filter(function (p) { return resp[p.id] && resp[p.id].ultima >= 1 && preguntaVencida(p.id, ahora); }));
    const debiles = temasDebiles(asigId, 3).map(function (d) { return d.info.tema.id; });
    const nuevasDebiles = azar(todas.filter(function (p) { return !resp[p.id] && debiles.indexOf(p.tema) !== -1; }));
    const nuevasEstudiadas = azar(todas.filter(function (p) { return !resp[p.id] && store.tema(p.tema).estado !== 'pendiente'; }));
    const nuevas = azar(todas.filter(function (p) { return !resp[p.id]; }));
    const out = [];
    const tomar = function (lista, max) {
      for (let i = 0; i < lista.length && max > 0 && out.length < n; i++) {
        if (out.indexOf(lista[i].id) === -1) { out.push(lista[i].id); max--; }
      }
    };
    tomar(falladas, Math.ceil(n * 0.4));
    tomar(repasos, Math.ceil(n * 0.2));
    tomar(nuevasDebiles, Math.ceil(n * 0.3));
    tomar(nuevasEstudiadas, n);
    tomar(nuevas, n);
    tomar(falladas, n);
    tomar(azar(todas), n); // si ya lo ha visto todo, repasa cualquier pregunta
    return { ids: out, vencidas: falladas.length + repasos.length };
  }

  function resumenAsignatura(asigId) {
    const lista = temasDe(asigId);
    const r = { total: lista.length, pendiente: 0, 'en-curso': 0, dominado: 0, respondidas: 0, preguntas: 0, suma: 0, tarjetas: 0, aprendidas: 0 };
    lista.forEach(function (x) {
      r[store.tema(x.tema.id).estado]++;
      const s = statsTema(x.tema.id);
      r.preguntas += s.preguntas;
      r.respondidas += s.respondidas;
      if (s.acierto !== null) r.suma += s.acierto * s.respondidas;
      r.tarjetas += s.tarjetas;
      r.aprendidas += s.aprendidas;
    });
    r.acierto = r.respondidas ? r.suma / r.respondidas : null;
    return r;
  }

  /* ── Tarjetas que tocan hoy ── */
  function colaTarjetas(opts) {
    opts = opts || {};
    const ahora = Date.now();
    let fuente = opts.temaId ? [temaPorId[opts.temaId]] : temasDe(opts.asig);
    const debidas = [], nuevas = [];
    fuente.forEach(function (x) {
      const estudiado = opts.temaId || store.tema(x.tema.id).estado !== 'pendiente';
      tarjetasDe(x.tema.id).forEach(function (c) {
        const s = store.tarjeta(c.id);
        if (s) { if (s.vence <= ahora) debidas.push(c); }
        else if (estudiado) nuevas.push(c);
      });
    });
    return debidas.concat(nuevas.slice(0, opts.temaId ? 50 : 15));
  }

  /* ── Plan de estudio ── */
  function inicioDia(d) { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; }

  function parseFecha(iso) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
    if (!m) return null;
    const d = new Date(+m[1], +m[2] - 1, +m[3]);
    return isNaN(d) ? null : d;
  }

  function diasHastaExamen() {
    const f = parseFecha(store.state.ajustes.fechaExamen);
    if (!f) return null;
    return Math.round((inicioDia(f) - inicioDia(new Date())) / DIA);
  }

  // Intercala las dos asignaturas respetando el orden del temario; los temas prioritarios van primero.
  function ordenEstudio() {
    const porAsig = PAU.asignaturas.map(function (a) {
      const lista = temasDe(a.id).filter(function (x) { return store.tema(x.tema.id).estado !== 'dominado'; });
      return lista.filter(function (x) { return store.tema(x.tema.id).prioridad; })
        .concat(lista.filter(function (x) { return !store.tema(x.tema.id).prioridad; }));
    });
    const out = [];
    for (let i = 0; porAsig.some(function (l) { return i < l.length; }); i++) {
      porAsig.forEach(function (l) { if (l[i]) out.push(l[i]); });
    }
    return out;
  }

  function generar() {
    const aj = store.state.ajustes;
    const examen = parseFecha(aj.fechaExamen);
    if (!examen) return { error: 'Indica una fecha de examen válida para generar el plan.' };
    const hoy = inicioDia(new Date());
    if (examen <= hoy) return { error: 'La fecha del examen ya ha pasado o es hoy. Cámbiala para generar un plan nuevo.' };
    if (!aj.diasSemana || !aj.diasSemana.length) return { error: 'Elige al menos un día de estudio a la semana.' };

    const dias = [];
    for (let d = new Date(hoy); d < examen; d = new Date(d.getTime() + DIA)) {
      if (aj.diasSemana.indexOf(d.getDay()) !== -1) dias.push(new Date(d));
    }
    if (!dias.length) return { error: 'No hay días de estudio entre hoy y la fecha del examen con los días elegidos.' };

    const orden = ordenEstudio();
    const repaso = dias.length >= 12 ? Math.min(14, Math.round(dias.length * 0.15)) : 0;
    const diasEstudio = dias.length - repaso;

    // Sesiones por tema: 2 si está pendiente, 1 si está en curso. Si no caben, se comprime.
    let cola = [];
    orden.forEach(function (x) {
      const n = store.tema(x.tema.id).estado === 'pendiente' ? 2 : 1;
      for (let k = 0; k < n; k++) cola.push({ info: x, parte: n === 2 ? (k === 0 ? 'estudio' : 'práctica') : 'repaso' });
    });
    let aviso = null;
    if (cola.length > diasEstudio) {
      cola = orden.map(function (x) { return { info: x, parte: 'estudio y práctica' }; });
      if (cola.length > diasEstudio) {
        aviso = 'Hay más temas que días de estudio, así que algunos días agrupan dos o más temas. Si puedes, añade días o minutos. Si no, prioriza los temas que peor llevas.';
      } else {
        aviso = 'El tiempo es ajustado: cada tema tiene una sesión que combina estudio y práctica.';
      }
    }

    const porDia = Math.max(1, Math.ceil(cola.length / Math.max(1, diasEstudio)));
    const sesiones = dias.map(function (d, i) {
      if (i >= diasEstudio) {
        const j = i - diasEstudio;
        const asig = PAU.asignaturas[j % PAU.asignaturas.length];
        return {
          fecha: d,
          tipo: j % 2 === 0 ? 'simulacro' : 'repaso',
          asig: asig.id,
          texto: j % 2 === 0 ? 'Simulacro de ' + asig.nombre + ' (o un examen oficial con cronómetro)' : 'Repaso de errores y tarjetas de ' + asig.nombre
        };
      }
      const trozo = cola.slice(i * porDia, (i + 1) * porDia);
      if (!trozo.length) {
        return { fecha: d, tipo: 'refuerzo', texto: 'Refuerzo: practica tus temas más débiles y repasa tarjetas' };
      }
      return { fecha: d, tipo: 'tema', items: trozo };
    });

    return { sesiones: sesiones, diasEstudio: diasEstudio, repaso: repaso, total: dias.length, aviso: aviso, temasPendientes: orden.length };
  }

  function sesionHoy() {
    const p = generar();
    const hoyK = store.hoyISO();
    let tarea = null;
    if (!p.error) {
      tarea = p.sesiones.find(function (s) { return store.hoyISO(s.fecha) === hoyK; }) || null;
    }
    const min = store.state.ajustes.minutosDia || 60;
    const debiles = temasDebiles(null, 1);
    return {
      plan: p,
      tarea: tarea,
      tarjetas: colaTarjetas({}).length,
      debil: debiles[0] ? debiles[0].info : null,
      reparto: {
        tarjetas: Math.max(5, Math.round(min * 0.2)),
        estudio: Math.round(min * 0.5),
        practica: Math.max(5, min - Math.max(5, Math.round(min * 0.2)) - Math.round(min * 0.5))
      },
      hecho: !!store.state.diasHechos[hoyK]
    };
  }

  return {
    temas: temas,
    temaPorId: temaPorId,
    asignaturaPorId: asignaturaPorId,
    preguntasPorTema: preguntasPorTema,
    preguntaPorId: preguntaPorId,
    tarjetasDe: tarjetasDe,
    sesionInteligente: sesionInteligente,
    temasDe: temasDe,
    statsTema: statsTema,
    debilidad: debilidad,
    temasDebiles: temasDebiles,
    resumenAsignatura: resumenAsignatura,
    colaTarjetas: colaTarjetas,
    diasHastaExamen: diasHastaExamen,
    parseFecha: parseFecha,
    generar: generar,
    sesionHoy: sesionHoy
  };
})();
