/*
 * Interfaz: enrutado por hash, vistas y motor de cuestionarios.
 * Todo el contenido se escapa con esc() antes de insertarlo en el HTML.
 */
(function () {
  'use strict';

  const store = PAU.store;
  const plan = PAU.plan;
  const fuentes = PAU.fuentes;
  const app = document.getElementById('app');

  /* ───────────── Utilidades ───────────── */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function pct(x) { return x == null ? '—' : Math.round(x * 100) + ' %'; }
  function num(x, dec) {
    return Number(x).toLocaleString('es-ES', { maximumFractionDigits: dec == null ? 4 : dec });
  }
  function fechaLarga(d) {
    return d.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
  }
  function fechaCorta(d) {
    return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  }
  function barajar(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function normalizar(s) {
    // Subíndices y superíndices a cifras normales: «CO₂» → «co2», «1s²» → «1s2».
    return String(s || '').replace(/[₀-₉]/g, function (c) { return String(c.charCodeAt(0) - 0x2080); })
      .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, function (c) { return SUP[c]; })
      .toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9\[\] ]+/g, ' ').replace(/\s+/g, ' ').trim();
  }
  const SUP = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁻': '-', '⁺': '+' };
  // Acepta «1,5», «1.5», «1,9e-3», «1,9·10^-3», «1,9 x 10⁻³», «−2,3» y una unidad detrás («199,5 kJ/mol»), que se ignora.
  function parseNumero(txt) {
    let s = String(txt || '').trim().replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]/g, function (c) { return SUP[c]; });
    s = s.replace(/\s+/g, '').replace(/[−–]/g, '-').replace(/,/g, '.').replace(/[·×xX*]10\^?/, 'e');
    const frac = s.match(/^(-?\d+)\/(\d+)$/); // fracciones como 1/4 (probabilidades)
    if (frac) return +frac[2] ? +frac[1] / +frac[2] : null;
    const m =s.match(/^([-+]?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?)(.*)$/i);
    if (!m) return null;
    if (m[2] && !/^[a-zµ°º%Ω]/i.test(m[2])) return null;
    const v = parseFloat(m[1]);
    return isFinite(v) ? v : null;
  }
  const NOMBRE_ESTADO = { pendiente: 'Pendiente', 'en-curso': 'En curso', dominado: 'Dominado' };
  const NOMBRE_TIPO = { test: 'Opción múltiple', numerica: 'Numérica', corta: 'Respuesta corta', desarrollo: 'Desarrollo' };
  const NOMBRE_DIF = { 1: 'Fácil', 2: 'Media', 3: 'Difícil' };

  function fuenteLink(id) {
    const f = fuentes.lista.find(function (x) { return x.id === id; });
    if (!f) return '';
    return '<a href="' + esc(f.url) + '" target="_blank" rel="noopener">' + esc(f.titulo) + '</a>';
  }

  function aviso(texto, tipo) {
    const zona = document.getElementById('toast');
    zona.textContent = texto;
    zona.className = 'toast visible ' + (tipo || '');
    clearTimeout(aviso.t);
    aviso.t = setTimeout(function () { zona.className = 'toast'; }, 4000);
  }

  function barra(valor, total, etiqueta, clase) {
    const p = total ? Math.round((valor / total) * 100) : 0;
    return '<div class="barra ' + (clase || '') + '" role="img" aria-label="' + esc(etiqueta + ': ' + p + ' %') + '"><span style="width:' + p + '%"></span></div>';
  }

  // Diálogo de confirmación accesible. Devuelve una promesa con true/false.
  function confirmar(titulo, texto, textoBoton) {
    return new Promise(function (resolve) {
      const dlg = document.getElementById('dialogo');
      dlg.innerHTML =
        '<form method="dialog" class="dialogo-cuerpo">' +
        '<h2 id="dlg-titulo">' + esc(titulo) + '</h2><p>' + esc(texto) + '</p>' +
        '<div class="fila-botones"><button value="no" class="btn">Cancelar</button>' +
        '<button value="si" class="btn peligro">' + esc(textoBoton || 'Confirmar') + '</button></div></form>';
      dlg.setAttribute('aria-labelledby', 'dlg-titulo');
      dlg.onclose = function () { resolve(dlg.returnValue === 'si'); };
      if (typeof dlg.showModal === 'function') {
        dlg.showModal();
        dlg.querySelector('button[value="no"]').focus();
      } else {
        resolve(window.confirm(titulo + '\n\n' + texto));
      }
    });
  }

  /* ───────────── Enrutado ───────────── */
  let reloj = null;
  function pararReloj() { if (reloj) { clearInterval(reloj); reloj = null; } }

  function ruta() {
    const h = location.hash.replace(/^#\/?/, '');
    const partes = h.split('?');
    const seg = partes[0].split('/').filter(Boolean);
    const q = {};
    (partes[1] || '').split('&').forEach(function (kv) {
      if (!kv) return;
      const i = kv.indexOf('=');
      q[decodeURIComponent(i < 0 ? kv : kv.slice(0, i))] = decodeURIComponent(i < 0 ? '' : kv.slice(i + 1));
    });
    return { vista: seg[0] || '', arg: seg[1], q: q };
  }

  const vistas = {
    '': vistaInicio,
    plan: vistaPlan,
    temario: vistaTemario,
    tema: vistaTema,
    repaso: vistaRepaso,
    practica: vistaPractica,
    quiz: vistaQuiz,
    resultado: vistaResultado,
    reloj: vistaReloj,
    progreso: vistaProgreso,
    fuentes: vistaFuentes,
    glosario: vistaGlosario
  };

  function render() {
    pararReloj();
    const r = ruta();
    const fn = vistas[r.vista] || vistaNoEncontrada;
    let html;
    try {
      html = fn(r);
    } catch (e) {
      console.error(e);
      html = '<section class="vacio"><h1 tabindex="-1">Algo ha fallado</h1><p>No se ha podido mostrar esta pantalla. Tu progreso sigue guardado. Prueba a volver al inicio.</p><a class="btn primario" href="#/">Ir al inicio</a></section>';
    }
    app.innerHTML = (store.disponible ? '' : avisoAlmacenamiento()) + html;
    marcarNav(r.vista);
    // Al cambiar de pantalla, el foco va al título; si se re-renderiza la misma, al elemento marcado.
    const h1 = app.querySelector('h1');
    if (h1) h1.setAttribute('tabindex', '-1');
    if (h1 && render.anterior !== location.hash) { h1.focus({ preventScroll: true }); window.scrollTo(0, 0); }
    else {
      const af = app.querySelector('[data-autofocus]');
      if (af) af.focus({ preventScroll: false });
    }
    render.anterior = location.hash;
    if (r.vista === 'quiz' && quiz && quiz.limite && !quiz.terminado) iniciarReloj();
    if (r.vista === 'reloj' && cronometro) iniciarCronometro();
  }

  function avisoAlmacenamiento() {
    return '<div class="banner error" role="alert"><strong>El navegador no permite guardar datos.</strong> Puede que estés en modo privado o que el almacenamiento esté lleno o bloqueado. Puedes usar la aplicación, pero el progreso se perderá al cerrar la pestaña. Exporta una copia desde «Progreso» antes de salir.</div>';
  }

  function marcarNav(vista) {
    const mapa = { tema: 'temario', repaso: 'temario', glosario: 'temario', quiz: 'practica', resultado: 'practica', reloj: 'practica', fuentes: 'progreso' };
    const activa = mapa[vista] != null ? mapa[vista] : vista;
    document.querySelectorAll('[data-nav]').forEach(function (a) {
      if (a.getAttribute('data-nav') === activa) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  }

  function vistaNoEncontrada() {
    return '<section class="vacio"><h1>Página no encontrada</h1><p>Este enlace no existe o ha cambiado.</p><a class="btn primario" href="#/">Volver al inicio</a></section>';
  }

  /* ───────────── Inicio ───────────── */
  // Saludo cariñoso: se elige uno al abrir la app (distinto del de la última vez) y se mantiene durante la visita.
  const saludo = (function () {
    const lista = (PAU.saludos && PAU.saludos.frases) || [];
    if (!lista.length) return '';
    let anterior = -1;
    try { anterior = +localStorage.getItem('pau-ultimo-saludo'); } catch (e) { /* sin almacenamiento */ }
    let i = Math.floor(Math.random() * lista.length);
    if (lista.length > 1 && i === anterior) i = (i + 1) % lista.length;
    try { localStorage.setItem('pau-ultimo-saludo', String(i)); } catch (e) { /* sin almacenamiento */ }
    return lista[i];
  })();
  function htmlSaludo() {
    if (!saludo) return '';
    const firma = PAU.saludos.firma ? ' <span class="firma">— ' + esc(PAU.saludos.firma) + '</span>' : '';
    return '<p class="saludo"><span class="corazon" aria-hidden="true">♥</span> ' + esc(saludo) + firma + '</p>';
  }

  function vistaInicio() {
    const s = plan.sesionHoy();
    const dias = plan.diasHastaExamen();
    const f = plan.parseFecha(store.state.ajustes.fechaExamen);
    let cuenta = '';
    if (dias != null && dias > 0) {
      cuenta = '<p class="cuenta"><strong>' + dias + '</strong> días hasta el ' + esc(f.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })) +
        ' <a href="#/plan" class="enlace-suave">(fecha provisional, cámbiala en el Plan)</a></p>';
    } else if (dias != null) {
      cuenta = '<p class="cuenta">La fecha del examen guardada ya ha pasado. <a href="#/plan">Actualízala en el Plan</a>.</p>';
    }

    let tareaHtml;
    if (s.plan.error) {
      tareaHtml = '<p>' + esc(s.plan.error) + ' <a href="#/plan">Ir al plan</a></p>';
    } else if (!s.tarea) {
      tareaHtml = '<p>Hoy no es día de estudio en tu plan. Si te apetece, repasa unas tarjetas: con 10 minutos basta.</p>';
    } else if (s.tarea.tipo === 'tema') {
      tareaHtml = '<ul class="lista-tareas">' + s.tarea.items.map(function (it) {
        const t = it.info.tema;
        return '<li><span class="chip ' + it.info.asignatura.id + '">' + esc(it.info.asignatura.nombre) + '</span> ' +
          '<a href="#/tema/' + t.id + '">' + esc(t.nombre) + '</a> <span class="suave">· ' + esc(it.parte) + '</span></li>';
      }).join('') + '</ul>';
    } else if (s.tarea.tipo === 'simulacro') {
      tareaHtml = '<p>' + esc(s.tarea.texto) + '.</p><a class="btn" href="#/practica">Preparar simulacro</a>';
    } else {
      tareaHtml = '<p>' + esc(s.tarea.texto) + '.</p>';
    }

    const pasos = [];
    pasos.push('<li><span class="paso-min">' + s.reparto.tarjetas + ' min</span> <span>Tarjetas de repaso' +
      (s.tarjetas ? ' (' + s.tarjetas + ' para hoy)' : ' (no tienes ninguna pendiente)') + '</span>' +
      (s.tarjetas ? ' <a class="btn pequeno" href="#/repaso">Repasar</a>' : '') + '</li>');
    pasos.push('<li><span class="paso-min">' + s.reparto.estudio + ' min</span> <span>Estudio del tema del plan</span></li>');
    const intel = plan.sesionInteligente(10);
    pasos.push('<li><span class="paso-min">' + s.reparto.practica + ' min</span> <span>Práctica: sesión inteligente' +
      (intel.vencidas ? ' (' + intel.vencidas + ' preguntas para repasar hoy)' : '') +
      (s.debil ? '. Tu tema a reforzar: <a href="#/tema/' + s.debil.tema.id + '?tab=practica">' + esc(s.debil.tema.nombre) + '</a>' : '') + '</span>' +
      ' <button class="btn pequeno" data-accion="quiz-inteligente">Practicar</button></li>');

    const asigs = PAU.asignaturas.map(function (a) {
      const r = plan.resumenAsignatura(a.id);
      return '<article class="tarjeta-asig ' + a.id + '">' +
        '<h3><a href="#/temario?a=' + a.id + '">' + esc(a.nombre) + '</a></h3>' +
        barra(r.dominado + r['en-curso'] * 0.5, r.total, 'Avance en ' + a.nombre, a.id) +
        '<p class="suave">' + r.dominado + ' dominados · ' + r['en-curso'] + ' en curso · ' + r.pendiente + ' pendientes de ' + r.total + ' temas</p>' +
        '<p class="suave">Acierto en práctica: ' + pct(r.acierto) + '</p>' +
        '<div class="fila-botones"><a class="btn pequeno" href="#/temario?a=' + a.id + '">Temario</a>' +
        '<a class="btn pequeno" href="#/practica?a=' + a.id + '">Practicar</a></div></article>';
    }).join('');

    return '<section>' +
      '<h1>Hoy</h1>' + htmlSaludo() + cuenta +
      '<div class="rejilla dos">' +
      '<article class="panel destacado"><h2>Sesión de hoy · ' + store.state.ajustes.minutosDia + ' min</h2>' + tareaHtml +
      '<ol class="pasos">' + pasos.join('') + '</ol>' +
      (s.hecho
        ? '<p class="ok-texto">Ya has registrado estudio hoy. Buen trabajo.</p>'
        : '<button class="btn primario" data-accion="marcar-hoy">He terminado la sesión de hoy</button>') +
      '</article>' +
      '<article class="panel"><h2>Mensaje del día</h2><p>' + esc(mensajeMotivador()) + '</p>' +
      '<p class="suave pequeno-texto">Temario basado en las orientaciones oficiales de la PAU de Cataluña (PAU 2026; las de 2027 aún no se han publicado). <a href="#/fuentes">Ver fuentes y qué falta por verificar</a>.</p></article>' +
      '</div>' +
      '<h2 class="separado">Asignaturas</h2><div class="rejilla dos">' + asigs + '</div>' +
      '</section>';
  }

  function mensajeMotivador() {
    const st = store.state;
    const semana = Object.keys(st.diasHechos).filter(function (k) {
      return (Date.now() - plan.parseFecha(k).getTime()) < 7 * 24 * 3600 * 1000;
    }).length;
    const total = Object.keys(st.respuestas).length;
    const fuertes = plan.temas.filter(function (x) {
      const s = plan.statsTema(x.tema.id); return s.respondidas >= 2 && s.acierto >= 0.8;
    });
    if (!total && !Object.keys(st.tarjetas).length) {
      return 'Para empezar, elige un tema que te resulte cómodo, lee la explicación y haz sus tarjetas. Los primeros días sirven para coger ritmo, no para hacerlo perfecto.';
    }
    if (semana >= 4) return 'Has estudiado ' + semana + ' días esta semana. Esa constancia es lo que más se nota en junio.';
    if (fuertes.length) return 'Ya llevas bien «' + fuertes[0].tema.nombre + '» (más del 80 % de aciertos). Puedes marcarlo como dominado y dedicar ese tiempo a otro tema.';
    const d = plan.temasDebiles(null, 1)[0];
    if (d) return 'Un paso concreto para hoy: repasa los errores frecuentes de «' + d.info.tema.nombre + '» y repite sus preguntas falladas. Fallar al practicar es justo lo que te ayuda a aprender.';
    return 'Has respondido ' + total + ' preguntas distintas. Cada corrección que lees con calma te deja mejor preparada para el examen.';
  }

  /* ───────────── Plan ───────────── */
  const DIAS = [['1', 'L', 'lunes'], ['2', 'M', 'martes'], ['3', 'X', 'miércoles'], ['4', 'J', 'jueves'], ['5', 'V', 'viernes'], ['6', 'S', 'sábado'], ['0', 'D', 'domingo']];

  function vistaPlan() {
    const aj = store.state.ajustes;
    const p = plan.generar();
    const form =
      '<form class="panel" id="form-ajustes" novalidate>' +
      '<h2>Ajustes</h2>' +
      '<div class="rejilla tres">' +
      '<label class="campo">Fecha del examen<input type="date" name="fechaExamen" value="' + esc(aj.fechaExamen) + '" required>' +
      '<span class="ayuda">Provisional: la PAU ordinaria de 2027 está prevista a principios de junio, pero la fecha oficial aún no se ha confirmado.</span></label>' +
      '<label class="campo">Minutos de estudio al día<input type="number" name="minutosDia" min="10" max="480" step="5" value="' + esc(aj.minutosDia) + '" required></label>' +
      '<label class="campo">Duración del simulacro (min)<input type="number" name="duracionSimulacro" min="10" max="240" step="5" value="' + esc(aj.duracionSimulacro) + '"></label>' +
      '</div>' +
      '<fieldset class="dias"><legend>Días de estudio</legend>' + DIAS.map(function (d) {
        return '<label class="dia"><input type="checkbox" name="dia" value="' + d[0] + '"' + (aj.diasSemana.indexOf(+d[0]) !== -1 ? ' checked' : '') +
          '><span aria-hidden="true">' + d[1] + '</span><span class="sr">' + d[2] + '</span></label>';
      }).join('') + '</fieldset>' +
      '<p class="error-texto" id="error-ajustes" role="alert"></p>' +
      '<button class="btn primario" type="submit">Guardar y recalcular el plan</button>' +
      '</form>';

    let cuerpo;
    if (p.error) {
      cuerpo = '<div class="banner aviso" role="status">' + esc(p.error) + '</div>';
    } else {
      const semanas = [];
      p.sesiones.forEach(function (s) {
        const lunes = new Date(s.fecha); lunes.setDate(lunes.getDate() - ((lunes.getDay() + 6) % 7));
        const k = store.hoyISO(lunes);
        let sem = semanas[semanas.length - 1];
        if (!sem || sem.k !== k) { sem = { k: k, lunes: lunes, dias: [] }; semanas.push(sem); }
        sem.dias.push(s);
      });
      const hoyK = store.hoyISO();
      cuerpo =
        '<p>' + p.total + ' días de estudio hasta el examen: ' + p.diasEstudio + ' para avanzar temario' +
        (p.repaso ? ' y los ' + p.repaso + ' últimos para simulacros y repaso' : '') + '. Quedan ' + p.temasPendientes + ' temas sin marcar como dominados.</p>' +
        (p.aviso ? '<div class="banner aviso" role="status">' + esc(p.aviso) + '</div>' : '') +
        semanas.map(function (sem, i) {
          const lista = '<ul class="lista-plan">' + sem.dias.map(function (s) {
            const esHoy = store.hoyISO(s.fecha) === hoyK;
            const hecho = store.state.diasHechos[store.hoyISO(s.fecha)];
            let txt;
            if (s.tipo === 'tema') {
              txt = s.items.map(function (it) {
                return '<span class="chip ' + it.info.asignatura.id + '">' + esc(it.info.asignatura.nombre.slice(0, 3)) + '</span> <a href="#/tema/' + it.info.tema.id + '">' + esc(it.info.tema.nombre) + '</a> <span class="suave">(' + esc(it.parte) + ')</span>';
              }).join('<br>');
            } else {
              txt = esc(s.texto);
            }
            return '<li class="' + (esHoy ? 'hoy' : '') + '"><span class="fecha">' + esc(fechaCorta(s.fecha)) + (esHoy ? ' · hoy' : '') + (hecho ? ' <span class="ok-texto" aria-label="hecho">✓</span>' : '') + '</span><span>' + txt + '</span></li>';
          }).join('') + '</ul>';
          return '<details class="semana"' + (i < 2 ? ' open' : '') + '><summary>Semana del ' + esc(fechaCorta(sem.lunes)) + '</summary>' + lista + '</details>';
        }).join('');
    }

    const estados = PAU.asignaturas.map(function (a) {
      return '<details class="panel" open><summary><h3 class="inline">' + esc(a.nombre) + '</h3></summary>' +
        a.bloques.map(function (b) {
          return '<h4>' + esc(b.nombre) + '</h4><ul class="lista-estados">' + b.temas.map(function (t) {
            const e = store.tema(t.id);
            return '<li><a href="#/tema/' + t.id + '">' + esc(t.nombre) + '</a>' +
              '<span class="controles-tema">' + selectorEstado(t.id, e.estado) +
              '<label class="check-prio"><input type="checkbox" data-accion="prioridad" data-tema="' + t.id + '"' + (e.prioridad ? ' checked' : '') + '> Prioridad</label></span></li>';
          }).join('') + '</ul>';
        }).join('') + '</details>';
    }).join('');

    return '<section><h1>Plan de estudio</h1>' +
      '<p class="suave">El plan reparte los temas que no tienes dominados entre los días que elijas y alterna Biología y Química. Los temas marcados con prioridad van primero. Los últimos días se reservan para simulacros y repaso. Es una guía: puedes cambiarla cuando quieras.</p>' +
      form + '<h2 class="separado">Calendario</h2>' + cuerpo +
      '<h2 class="separado">Estado de los temas</h2><p class="suave">Marca cada tema como pendiente, en curso o dominado. El plan se recalcula solo.</p>' + estados + '</section>';
  }

  function selectorEstado(id, estado) {
    return '<label class="sr" for="estado-' + id + '">Estado</label><select id="estado-' + id + '" data-accion="estado" data-tema="' + id + '">' +
      ['pendiente', 'en-curso', 'dominado'].map(function (k) {
        return '<option value="' + k + '"' + (k === estado ? ' selected' : '') + '>' + NOMBRE_ESTADO[k] + '</option>';
      }).join('') + '</select>';
  }

  /* ───────────── Temario ───────────── */
  function vistaTemario(r) {
    const filtro = r.q.a;
    const pestanas = '<div class="pestanas" role="tablist" aria-label="Asignatura">' +
      [['', 'Todas']].concat(PAU.asignaturas.map(function (a) { return [a.id, a.nombre]; })).map(function (p) {
        const sel = (filtro || '') === p[0];
        return '<a role="tab" aria-selected="' + sel + '" class="pestana' + (sel ? ' activa' : '') + '" href="#/temario' + (p[0] ? '?a=' + p[0] : '') + '">' + esc(p[1]) + '</a>';
      }).join('') + '</div>';

    const cont = PAU.asignaturas.filter(function (a) { return !filtro || a.id === filtro; }).map(function (a) {
      return '<section class="bloque-asig ' + a.id + '"><h2 class="titulo-asig ' + a.id + '">' + esc(a.nombre) + '</h2>' +
        '<p class="suave">Bloques según ' + fuenteLink(a.fuente) + '. Formato observado en 2025: ' + esc(a.examen.resumen) + '</p>' +
        a.bloques.map(function (b) {
          return '<h3>' + esc(b.nombre) + '</h3><ul class="lista-temas">' + b.temas.map(function (t) {
            const e = store.tema(t.id); const s = plan.statsTema(t.id);
            return '<li><a class="fila-tema ' + a.id + '" href="#/tema/' + t.id + '"><span class="nombre">' + esc(t.nombre) + '</span>' +
              '<span class="meta"><span class="estado ' + e.estado + '">' + NOMBRE_ESTADO[e.estado] + '</span>' +
              (e.prioridad ? '<span class="estado prioridad">Prioridad</span>' : '') +
              '<span class="suave">' + s.tarjetas + ' tarjetas · ' + s.preguntas + ' preguntas' + (s.acierto != null ? ' · ' + pct(s.acierto) : '') + '</span></span></a></li>';
          }).join('') + '</ul>';
        }).join('') + '</section>';
    }).join('');

    return '<section><h1>Temario</h1>' +
      '<p class="suave">El examen se entrega en catalán: consulta el <a href="#/glosario">glosario catalán-castellano</a> para reconocer los términos y los verbos de los enunciados.</p>' +
      pestanas + cont + '</section>';
  }

  /* ───────────── Glosario ───────────── */
  const NOMBRE_GRUPO = { enunciado: 'Enunciados', bio: 'Biología', qui: 'Química' };
  function vistaGlosario() {
    const lista = PAU.glosario || [];
    if (!lista.length) return '<section class="vacio"><h1>Glosario</h1><p>No hay términos cargados.</p></section>';
    const grupos = ['enunciado', 'bio', 'qui'].map(function (g) {
      const filas = lista.filter(function (x) { return x[2] === g; });
      return '<section class="grupo-glosario"><h2>' + NOMBRE_GRUPO[g] + '</h2><table class="tabla glosario"><thead><tr><th scope="col">Catalán</th><th scope="col">Castellano</th></tr></thead><tbody>' +
        filas.map(function (x) {
          return '<tr data-buscar="' + esc(normalizar(x[0] + ' ' + x[1])) + '"><td lang="ca">' + esc(x[0]) + '</td><td>' + esc(x[1]) + '</td></tr>';
        }).join('') + '</tbody></table></section>';
    }).join('');
    return '<section><h1>Glosario catalán-castellano</h1>' +
      '<p>El examen de la PAU en Cataluña se entrega en catalán. Aquí tienes los términos del temario y los verbos que aparecen en los enunciados. Traducción propia, no oficial.</p>' +
      '<label class="campo">Buscar un término (en catalán o en castellano)<input type="search" id="buscar-glosario" autocomplete="off"></label>' +
      '<p class="suave" id="glosario-cuenta" aria-live="polite">' + lista.length + ' términos.</p>' +
      '<p class="banner aviso" id="glosario-vacio" hidden>No hay ningún término que coincida con la búsqueda.</p>' +
      grupos + '</section>';
  }

  function vistaTema(r) {
    const info = plan.temaPorId[r.arg];
    if (!info) return vistaNoEncontrada();
    const t = info.tema, a = info.asignatura;
    const tab = r.q.tab || 'explicacion';
    const e = store.tema(t.id);
    const s = plan.statsTema(t.id);

    const cab = '<nav class="migas" aria-label="Ruta"><a href="#/temario?a=' + a.id + '">' + esc(a.nombre) + '</a> › ' + esc(info.bloque.nombre) + '</nav>' +
      '<h1>' + esc(t.nombre) + '</h1>' +
      '<div class="controles-tema grande">' + selectorEstado(t.id, e.estado) +
      '<label class="check-prio"><input type="checkbox" data-accion="prioridad" data-tema="' + t.id + '"' + (e.prioridad ? ' checked' : '') + '> Prioridad</label></div>' +
      '<div class="pestanas" role="tablist" aria-label="Secciones del tema">' +
      [['explicacion', 'Explicación'], ['tarjetas', 'Tarjetas (' + s.tarjetas + ')'], ['practica', 'Práctica (' + s.preguntas + ')']].map(function (p) {
        const sel = tab === p[0];
        return '<a role="tab" aria-selected="' + sel + '" class="pestana' + (sel ? ' activa' : '') + '" href="#/tema/' + t.id + '?tab=' + p[0] + '">' + esc(p[1]) + '</a>';
      }).join('') + '</div>';

    let cuerpo = '';
    if (tab === 'explicacion') {
      cuerpo += '<aside class="oficial"><p class="etiqueta">Temario oficial · traducción resumida</p><p>' + esc(t.oficial) + '</p>' +
        '<p class="suave pequeno-texto">Fuente: ' + fuenteLink(a.fuente) + ' (consultada el ' + esc(fuentes.consulta.split('-').reverse().join('/')) + ').</p>' +
        (t.noEvaluable && t.noEvaluable.length ? '<p class="etiqueta">No evaluable según las orientaciones</p><ul>' + t.noEvaluable.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' : '') +
        '</aside>';
      if (t.pendiente) cuerpo += '<div class="banner aviso">' + esc(t.pendiente) + '</div>';
      (PAU.esquemas && PAU.esquemas[t.id] || []).forEach(function (e) {
        cuerpo += '<figure class="esquema"><figcaption>' + esc(e.titulo) + '</figcaption>' +
          e.svg.replace('<svg ', '<svg role="img" aria-label="' + esc(e.descripcion) + '" ') +
          '<details><summary>Descripción del esquema</summary><p>' + esc(e.descripcion) + '</p></details></figure>';
      });
      if (t.puntos && t.puntos.length) {
        cuerpo += '<h2>Explicación</h2><p class="etiqueta-original">Material de estudio original</p><ul class="puntos">' + t.puntos.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>';
      } else {
        cuerpo += '<div class="banner aviso">Contenido pendiente de completar para este tema.</div>';
      }
      if (t.definiciones && t.definiciones.length) {
        cuerpo += '<h2>Definiciones</h2><dl class="definiciones">' + t.definiciones.map(function (d) { return '<dt>' + esc(d[0]) + '</dt><dd>' + esc(d[1]) + '</dd>'; }).join('') + '</dl>';
      }
      if (t.formulas && t.formulas.length) {
        cuerpo += '<h2>Fórmulas</h2><ul class="formulas">' + t.formulas.map(function (f) { return '<li><code>' + esc(f[0]) + '</code><span>' + esc(f[1]) + '</span></li>'; }).join('') + '</ul>';
      }
      if (t.ejemplo) {
        cuerpo += '<h2>Ejemplo resuelto</h2><div class="panel"><p><strong>' + esc(t.ejemplo.enunciado) + '</strong></p>' +
          '<details><summary>Ver resolución paso a paso</summary><ol class="pasos-sol">' + t.ejemplo.pasos.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ol>' +
          '<p class="resultado">' + esc(t.ejemplo.resultado) + '</p></details></div>';
      }
      if (t.errores && t.errores.length) {
        cuerpo += '<h2>Errores frecuentes</h2><ul class="errores">' + t.errores.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>';
      }
      cuerpo += '<div class="fila-botones separado"><a class="btn primario" href="#/tema/' + t.id + '?tab=tarjetas">Seguir con las tarjetas</a>' +
        '<a class="btn" href="#/tema/' + t.id + '?tab=practica">Ir a la práctica</a></div>';
    } else if (tab === 'tarjetas') {
      const cola = plan.colaTarjetas({ temaId: t.id });
      cuerpo += '<p>' + (cola.length ? 'Tienes ' + cola.length + ' tarjetas para repasar ahora en este tema.' : 'No hay tarjetas pendientes en este tema ahora mismo. Volverán cuando toque repasarlas.') + '</p>' +
        (cola.length ? '<a class="btn primario" href="#/repaso?tema=' + t.id + '">Repasar tarjetas</a>' : '') +
        '<h2 class="separado">Todas las tarjetas</h2><ul class="lista-tarjetas">' + plan.tarjetasDe(t.id).map(function (c) {
          const st = store.tarjeta(c.id);
          const prox = st ? (st.vence <= Date.now() ? 'toca repasar' : 'próximo repaso: ' + fechaCorta(new Date(st.vence))) : 'nueva';
          return '<li><details><summary>' + esc(c.anverso) + ' <span class="suave">· ' + esc(prox) + '</span></summary><p>' + esc(c.reverso) + '</p></details></li>';
        }).join('') + '</ul>';
    } else {
      const ps = plan.preguntasPorTema[t.id] || [];
      const falladas = ps.filter(function (p) { const x = store.state.respuestas[p.id]; return x && x.ultima < 1; });
      cuerpo += '<p>' + ps.length + ' preguntas originales de práctica. Respondidas: ' + s.respondidas + ' · acierto: ' + pct(s.acierto) + '.</p>' +
        (ps.length
          ? '<div class="fila-botones"><button class="btn primario" data-accion="quiz-tema" data-tema="' + t.id + '">Practicar este tema</button>' +
            (falladas.length ? '<button class="btn" data-accion="quiz-ids" data-ids="' + falladas.map(function (p) { return p.id; }).join(',') + '">Repetir falladas (' + falladas.length + ')</button>' : '') + '</div>'
          : '<div class="banner aviso">Todavía no hay preguntas para este tema. Puedes añadirlas en el archivo de preguntas (ver README).</div>') +
        htmlEjercicios(t.id) +
        '<article class="panel separado"><h2>Practica también con exámenes oficiales</h2>' +
        '<p>Los exámenes reales de años anteriores, con sus criterios de corrección, son el mejor complemento: busca los ejercicios de este tema en ' + fuenteLink('modelos') + ' (en catalán; consulta el <a href="#/glosario">glosario</a>). ' +
        'Hazlos en papel con el <a href="#/reloj">cronómetro</a> y corrígelos con los criterios oficiales.</p></article>';
    }

    return '<section>' + cab + '<div class="contenido-tema">' + cuerpo + '</div></section>';
  }

  /* ───────────── Repaso de tarjetas ───────────── */
  let repaso = null;
  function vistaRepaso(r) {
    const clave = (r.q.tema || '') + '|' + (r.q.a || '');
    // Se rehace la cola al entrar en la pantalla (no al re-renderizar tras cada tarjeta).
    if (!repaso || repaso.clave !== clave || render.anterior !== location.hash) {
      repaso = { clave: clave, cola: barajar(plan.colaTarjetas({ temaId: r.q.tema, asig: r.q.a })), hechas: 0, girada: false, fin: false };
    }
    const volver = r.q.tema ? '#/tema/' + r.q.tema + '?tab=tarjetas' : '#/';
    if (!repaso.cola.length) {
      const hechas = repaso.hechas;
      repaso.fin = true;
      return '<section class="vacio"><h1>' + (hechas ? 'Repaso terminado' : 'No hay tarjetas para repasar') + '</h1>' +
        '<p>' + (hechas ? 'Has repasado ' + hechas + ' tarjetas. Las que marcaste como fáciles volverán dentro de unos días.' :
          'Las tarjetas aparecen aquí cuando un tema está «en curso» o «dominado» y cuando les toca repaso. Abre un tema y empieza por sus tarjetas.') + '</p>' +
        '<div class="fila-botones"><a class="btn primario" href="' + volver + '">Volver</a><a class="btn" href="#/temario">Ver temario</a></div></section>';
    }
    const c = repaso.cola[0];
    const info = plan.temaPorId[c.temaId];
    return '<section class="repaso"><h1>Tarjetas</h1>' +
      '<p class="suave">' + repaso.cola.length + ' por repasar · ' + repaso.hechas + ' hechas</p>' +
      '<article class="tarjeta-memoria" aria-live="polite">' +
      '<p class="etiqueta"><span class="chip ' + info.asignatura.id + '">' + esc(info.asignatura.nombre) + '</span> ' + esc(info.tema.nombre) + '</p>' +
      '<p class="anverso">' + esc(c.anverso) + '</p>' +
      (repaso.girada ? '<hr><p class="reverso">' + esc(c.reverso) + '</p>' : '') +
      '</article>' +
      (repaso.girada
        ? '<div class="fila-botones valoracion" role="group" aria-label="¿Cómo te ha ido?">' +
          '<button class="btn otra" data-accion="valorar" data-v="otra" data-autofocus>Otra vez <kbd>1</kbd></button>' +
          '<button class="btn dificil" data-accion="valorar" data-v="dificil">Difícil <kbd>2</kbd></button>' +
          '<button class="btn facil" data-accion="valorar" data-v="facil">Fácil <kbd>3</kbd></button></div>' +
          '<p class="suave pequeno-texto">«Otra vez» la repite en esta sesión; «Difícil» la programa pronto; «Fácil» la espacia más.</p>'
        : '<button class="btn primario grande" data-accion="girar" data-autofocus>Mostrar respuesta <kbd>Espacio</kbd></button>') +
      '<p><a href="' + volver + '">Terminar por ahora</a></p></section>';
  }

  /* ───────────── Práctica ───────────── */
  function vistaPractica(r) {
    const asigSel = r.q.a || '';
    const opcionesTemas = PAU.asignaturas.map(function (a) {
      const oculto = asigSel && asigSel !== a.id ? ' hidden disabled' : '';
      return '<optgroup label="' + esc(a.nombre) + '"' + oculto + '>' + plan.temasDe(a.id).map(function (x) {
        return '<option value="' + x.tema.id + '" data-asig="' + a.id + '">' + esc(x.tema.nombre) + '</option>';
      }).join('') + '</optgroup>';
    }).join('');
    const falladas = Object.keys(store.state.respuestas).filter(function (id) {
      return plan.preguntaPorId[id] && store.state.respuestas[id].ultima < 1;
    });
    const debiles = plan.temasDebiles(null, 3);
    const intel = plan.sesionInteligente(10);

    return '<section><h1>Práctica y simulacros</h1>' +
      '<p class="banner info">Todas las preguntas de esta aplicación son <strong>originales de práctica</strong>: no proceden de exámenes oficiales. Para practicar con exámenes reales, usa los <a href="' + esc(fuentes.lista.find(function (f) { return f.id === 'modelos'; }).url) + '" target="_blank" rel="noopener">exámenes oficiales de años anteriores</a> con el cronómetro de abajo.</p>' +
      '<div class="rejilla dos">' +
      '<form class="panel" id="form-quiz"><h2>Cuestionario a medida</h2>' +
      '<label class="campo">Asignatura<select name="asig">' +
      '<option value="">Biología y Química</option>' + PAU.asignaturas.map(function (a) { return '<option value="' + a.id + '"' + (a.id === asigSel ? ' selected' : '') + '>' + esc(a.nombre) + '</option>'; }).join('') + '</select></label>' +
      '<label class="campo">Tema<select name="tema"><option value="">Todos los temas</option>' + opcionesTemas + '</select></label>' +
      '<div class="rejilla dos compacta">' +
      '<label class="campo">Dificultad<select name="dif"><option value="">Todas</option><option value="1">Fácil</option><option value="2">Media</option><option value="3">Difícil</option></select></label>' +
      '<label class="campo">Tipo<select name="tipo"><option value="">Todos</option>' + Object.keys(NOMBRE_TIPO).map(function (k) { return '<option value="' + k + '">' + NOMBRE_TIPO[k] + '</option>'; }).join('') + '</select></label>' +
      '</div>' +
      '<label class="campo">Número de preguntas<select name="n"><option>5</option><option selected>10</option><option>15</option><option>20</option></select></label>' +
      '<p class="error-texto" id="error-quiz" role="alert"></p>' +
      '<button class="btn primario" type="submit">Empezar</button></form>' +
      '<div>' +
      '<article class="panel destacado"><h2>Sesión inteligente</h2>' +
      '<p>10 preguntas elegidas para ti: las que fallaste, las acertadas que toca repasar (a los 3, 7, 21 y 60 días) y preguntas nuevas de tus temas más flojos. Es la forma más eficaz de practicar cada día.</p>' +
      (intel.vencidas ? '<p><strong>' + intel.vencidas + '</strong> preguntas te tocan hoy.</p>' : '') +
      '<button class="btn primario" data-accion="quiz-inteligente">Empezar sesión inteligente</button></article>' +
      '<article class="panel separado"><h2>Aprender de los errores</h2>' +
      (falladas.length
        ? '<p>Tienes ' + falladas.length + ' preguntas que no te salieron bien la última vez.</p><button class="btn primario" data-accion="quiz-ids" data-ids="' + falladas.join(',') + '">Repetir falladas</button>'
        : '<p class="suave">Aquí aparecerán las preguntas que falles, para repetirlas más adelante.</p>') +
      (debiles.length ? '<p class="separado">Temas a reforzar:</p><ul>' + debiles.map(function (d) {
        return '<li><a href="#/tema/' + d.info.tema.id + '?tab=practica">' + esc(d.info.tema.nombre) + '</a> <span class="suave">(' + pct(d.s.acierto) + ')</span></li>';
      }).join('') + '</ul>' : '') +
      '</article>' +
      '</div></div>' + htmlEjercicios(null) + '<div class="separado"><div>' +
      '<form class="panel" id="form-simulacro"><h2>Simulacro con temporizador</h2>' +
      '<p class="suave">Mezcla preguntas originales de todos los bloques de una asignatura. No se corrige hasta el final. El examen real de 2025 tenía 4 ejercicios de 2,5 puntos con apartados; este simulacro sirve para practicar la gestión del tiempo, pero no reproduce el examen oficial.</p>' +
      '<label class="campo">Asignatura<select name="asig">' + PAU.asignaturas.map(function (a) { return '<option value="' + a.id + '">' + esc(a.nombre) + '</option>'; }).join('') + '</select></label>' +
      '<label class="campo">Duración (minutos)<input type="number" name="min" min="5" max="240" value="' + esc(store.state.ajustes.duracionSimulacro) + '"></label>' +
      '<div class="fila-botones"><button class="btn primario" type="submit">Empezar simulacro</button>' +
      '<button class="btn" type="button" data-accion="cronometro">Solo cronómetro (examen oficial en papel)</button></div>' +
      '</form></div></div></section>';
  }

  // Lista de ejercicios con apartados (todos o los de un tema), con su progreso.
  function htmlEjercicios(temaId) {
    const lista = (PAU.ejercicios || []).filter(function (ej) {
      return !temaId || ej.apartados.some(function (ap) { return ap.tema === temaId; });
    });
    if (!lista.length) return '';
    return '<article class="panel separado"><h2>Ejercicios con apartados</h2>' +
      '<p class="suave">Un contexto (datos, un experimento o una situación) con varias preguntas encadenadas, la mayoría de nivel medio o difícil. Originales de práctica.</p>' +
      '<ul class="lista-ejercicios">' + lista.map(function (ej) {
        const hechos = ej.ids.filter(function (id) { return store.state.respuestas[id]; });
        const bien = ej.ids.filter(function (id) { const r = store.state.respuestas[id]; return r && r.ultima >= 1; }).length;
        return '<li><span class="chip ' + ej.asig + '">' + esc(plan.asignaturaPorId[ej.asig].nombre) + '</span> <strong>' + esc(ej.titulo) + '</strong> ' +
          '<span class="suave">· ' + ej.ids.length + ' apartados' + (hechos.length ? ' · ' + bien + ' bien la última vez' : '') + '</span> ' +
          '<button class="btn pequeno" data-accion="ejercicio" data-id="' + ej.id + '">' + (hechos.length ? 'Repetir' : 'Hacer') + '</button></li>';
      }).join('') + '</ul></article>';
  }

  /* ───────────── Motor de cuestionarios ───────────── */
  let quiz = null;

  function crearQuiz(ids, opciones) {
    if (!ids.length) { aviso('No hay preguntas que coincidan con esos filtros.', 'error'); return; }
    quiz = Object.assign({
      modo: 'practica',
      titulo: 'Práctica',
      ids: ids,
      i: 0,
      resp: {},       // id → { dada, puntos (null = pendiente de autoevaluar), corregida }
      inicio: Date.now(),
      limite: null,
      terminado: false,
      registrada: false
    }, opciones || {});
    if (location.hash === '#/quiz') render();
    else location.hash = '#/quiz';
  }

  // Practicar o repasar un tema pendiente lo pasa a «en curso».
  function tocarTema(id) {
    if (store.tema(id).estado === 'pendiente') store.setTema(id, { estado: 'en-curso' });
  }

  function filtrarPreguntas(f) {
    return PAU.preguntas.filter(function (p) {
      const info = plan.temaPorId[p.tema];
      if (!info) return false;
      if (f.asig && info.asignatura.id !== f.asig) return false;
      if (f.tema && p.tema !== f.tema) return false;
      if (f.dif && String(p.dificultad) !== String(f.dif)) return false;
      if (f.tipo && p.tipo !== f.tipo) return false;
      return true;
    });
  }

  // Simulacro: reparte las preguntas entre bloques e incluye algún desarrollo.
  function elegirSimulacro(asig, n) {
    const porBloque = {};
    barajar(filtrarPreguntas({ asig: asig })).forEach(function (p) {
      const b = plan.temaPorId[p.tema].bloque.id;
      (porBloque[b] = porBloque[b] || []).push(p);
    });
    const listas = Object.keys(porBloque).map(function (k) { return porBloque[k]; });
    const out = [];
    for (let i = 0; out.length < n && listas.some(function (l) { return l.length; }); i++) {
      const l = listas[i % listas.length];
      if (l.length) out.push(l.shift());
    }
    return out.map(function (p) { return p.id; });
  }

  function vistaQuiz() {
    if (!quiz) {
      return '<section class="vacio"><h1>No hay ningún cuestionario en marcha</h1><p>Prepara uno nuevo desde Práctica.</p><a class="btn primario" href="#/practica">Ir a Práctica</a></section>';
    }
    if (quiz.terminado) { location.replace('#/resultado'); return ''; }
    const p = plan.preguntaPorId[quiz.ids[quiz.i]];
    const info = plan.temaPorId[p.tema];
    const r = quiz.resp[p.id];
    const corregida = r && r.corregida;
    const simulacro = quiz.modo === 'simulacro';

    let entrada = '';
    const deshab = corregida || (simulacro && r) ? ' disabled' : '';
    if (p.tipo === 'test') {
      if (!quiz.orden) quiz.orden = {};
      if (!quiz.orden[p.id]) quiz.orden[p.id] = barajar(p.opciones.map(function (_, i) { return i; }));
      entrada = '<fieldset class="opciones"><legend class="sr">Elige una opción</legend>' + quiz.orden[p.id].map(function (idx, k) {
        let cls = '';
        if (corregida) { if (idx === p.correcta) cls = ' correcta'; else if (r && String(r.dada) === String(idx)) cls = ' incorrecta'; }
        return '<label class="opcion' + cls + '"><input type="radio" name="resp" value="' + idx + '"' + (r && String(r.dada) === String(idx) ? ' checked' : '') + deshab + '>' +
          '<span class="letra">' + 'ABCDEF'[k] + '</span><span>' + esc(p.opciones[idx]) + '</span></label>';
      }).join('') + '</fieldset>';
    } else if (p.tipo === 'numerica') {
      entrada = '<label class="campo">Tu resultado' + (p.unidad ? ' (' + esc(p.unidad) + ')' : '') +
        '<input type="text" inputmode="decimal" name="resp" autocomplete="off" value="' + esc(r ? r.dada : '') + '"' + deshab + ' aria-describedby="ayuda-num"></label>' +
        '<p class="ayuda" id="ayuda-num">Usa coma o punto decimal. Para potencias de 10 escribe, por ejemplo, 1,9e-3 o 1,9·10^-3. También valen fracciones (1/4). Puedes añadir la unidad: solo se corrige el número.</p>';
    } else if (p.tipo === 'corta') {
      entrada = '<label class="campo">Tu respuesta<input type="text" name="resp" autocomplete="off" value="' + esc(r ? r.dada : '') + '"' + deshab + '></label>';
    } else {
      entrada = '<label class="campo">Escribe tu respuesta (opcional, para compararla después)<textarea name="resp" rows="6"' + deshab + '>' + esc(r ? r.dada : '') + '</textarea></label>';
    }

    const total = quiz.ids.length;
    const cab = '<div class="cab-quiz"><span>' + esc(quiz.titulo) + ' · ' + (quiz.i + 1) + ' de ' + total + '</span>' +
      (quiz.limite ? '<span class="temporizador" id="temporizador" role="timer" aria-live="off">--:--</span>' : '') + '</div>' +
      barra(quiz.i + (corregida ? 1 : 0), total, 'Avance del cuestionario');

    let feedback = '';
    if (corregida) feedback = htmlCorreccion(p, r);

    let botones;
    const ultima = quiz.i === total - 1;
    if (simulacro) {
      botones = '<div class="fila-botones">' +
        (quiz.i > 0 ? '<button class="btn" type="button" data-accion="anterior">Anterior</button>' : '') +
        '<button class="btn primario" type="submit">' + (ultima ? 'Guardar y terminar' : 'Guardar y seguir') + '</button>' +
        '<button class="btn" type="button" data-accion="terminar">Terminar ahora</button></div>';
    } else if (!corregida) {
      botones = '<div class="fila-botones"><button class="btn primario" type="submit">' + (p.tipo === 'desarrollo' ? 'Ver corrección' : 'Comprobar') + '</button>' +
        '<button class="btn" type="button" data-accion="saltar">No lo sé</button></div>';
    } else {
      botones = '';
    }
    // Tras corregir, el botón para avanzar va debajo de la corrección.
    const avanzar = corregida && r.puntos != null && !simulacro
      ? '<div class="fila-botones"><button class="btn primario" type="button" data-accion="siguiente">' + (ultima ? 'Ver resultados' : 'Siguiente') + '</button></div>'
      : '';

    return '<section class="quiz">' + cab +
      '<p class="meta-pregunta"><span class="chip ' + info.asignatura.id + '">' + esc(info.asignatura.nombre) + '</span> ' + esc(info.tema.nombre) +
      ' · ' + NOMBRE_TIPO[p.tipo] + ' · ' + NOMBRE_DIF[p.dificultad] + ' · <span class="origen">Pregunta original de práctica</span></p>' +
      htmlContexto(p) +
      '<h1 class="enunciado"' + (corregida ? '' : ' data-autofocus') + '>' + esc(p.enunciado) + '</h1>' +
      '<form id="form-respuesta" data-id="' + p.id + '">' + entrada + '<p class="error-texto" id="error-resp" role="alert"></p>' + botones + '</form>' +
      '<div aria-live="polite">' + feedback + '</div>' + avanzar + '</section>';
  }

  function htmlContexto(p) {
    if (!p.contexto) return '';
    return '<div class="contexto"><p class="etiqueta">Ejercicio: ' + esc(p.tituloEjercicio) + '</p><p>' + esc(p.contexto) + '</p></div>';
  }

  // Corrige automáticamente lo que se puede. Devuelve { puntos | null, detalle }.
  function corregir(p, dada) {
    if (p.tipo === 'test') return { puntos: String(dada) === String(p.correcta) ? 1 : 0 };
    if (p.tipo === 'numerica') {
      const v = parseNumero(dada);
      if (v == null) return { puntos: 0, detalle: dada ? 'No se ha reconocido «' + dada + '» como número.' : 'Sin respuesta.' };
      const tol = Math.max(p.tolerancia || 0, Math.abs(p.valor) * 1e-9);
      return { puntos: Math.abs(v - p.valor) <= tol ? 1 : 0, valor: v };
    }
    if (p.tipo === 'corta') {
      const n = normalizar(dada), compacta = n.replace(/ /g, '');
      if (!n) return { puntos: 0, detalle: 'Sin respuesta.' };
      const coincide = function (lista) {
        return lista.some(function (acc) {
          const a = normalizar(acc), ac = a.replace(/ /g, '');
          if (ac.length <= 2) return compacta === ac || (' ' + n + ' ').indexOf(' ' + a + ' ') !== -1;
          return n.indexOf(a) !== -1 || compacta.indexOf(ac) !== -1;
        });
      };
      // «requeridas»: grupos de alternativas que deben aparecer todos (respuestas con varias partes).
      const grupos = p.requeridas || [p.aceptadas || []];
      const hechos = grupos.filter(coincide).length;
      // Si no coincide, o es incompleta, o lleva una negación («no es…»), que lo decida la estudiante.
      if (hechos < grupos.length) return { puntos: null, detalle: hechos ? 'Parece incompleta: comprueba que incluye todo lo que se pide.' : '' };
      if (/(^| )(no|ni|nunca|tampoco)( |$)/.test(n)) return { puntos: null, detalle: 'Tu respuesta incluye una negación: compruébala con la corrección.' };
      return { puntos: 1 };
    }
    return { puntos: null };
  }

  // Ayuda a autoevaluar el desarrollo: un criterio se da por «detectado» si en el texto aparecen
  // al menos la mitad de sus palabras clave (comparando la raíz de 5 letras). Es orientativo.
  const VACIAS = ['porque', 'cuando', 'donde', 'entre', 'sobre', 'hacia', 'desde', 'hasta', 'tiene', 'tienen', 'puede', 'pueden', 'mismo', 'misma', 'otros', 'otras', 'otro', 'otra', 'cada', 'como', 'para', 'pero', 'solo', 'tambien', 'ejemplo', 'ademas', 'segun', 'mayor', 'menor', 'mucho', 'mucha', 'muchos', 'todos', 'todas', 'estos', 'estas', 'este', 'esta', 'cual', 'cuales', 'sino', 'ambos'];
  function detectarCriterios(texto, criterios) {
    const t = normalizar(texto);
    if (!t) return criterios.map(function () { return false; });
    const raices = {};
    t.split(' ').forEach(function (w) { if (w.length >= 4) raices[w.slice(0, 5)] = true; });
    return criterios.map(function (c) {
      const clave = normalizar(c).split(' ').filter(function (w) { return w.length >= 5 && VACIAS.indexOf(w) === -1; })
        .map(function (w) { return w.slice(0, 5); })
        .filter(function (w, i, a) { return a.indexOf(w) === i; });
      if (clave.length < 2) return false;
      const hay = clave.filter(function (w) { return raices[w]; }).length;
      return hay / clave.length >= 0.5;
    });
  }

  function htmlCorreccion(p, r) {
    let estado = '';
    if (r.puntos == null) estado = '<p class="estado-resp pendiente">Compara tu respuesta con la corrección y valórala tú.</p>';
    else if (r.puntos >= 1) estado = '<p class="estado-resp bien">¡Correcto!</p>';
    else if (r.puntos > 0) estado = '<p class="estado-resp medio">Parcialmente correcto (' + Math.round(r.puntos * 100) + ' %).</p>';
    else estado = '<p class="estado-resp mal">' + (r.dada === '' || r.dada == null ? 'Sin responder.' : 'No es correcto.') + ' Mira la corrección: así es como se aprende.</p>';

    let extra = '';
    if (r.detalle) extra += '<p class="suave">' + esc(r.detalle) + '</p>';
    if (p.tipo === 'numerica') extra += '<p>Resultado esperado: <strong>' + esc(num(p.valor)) + (p.unidad ? ' ' + esc(p.unidad) : '') + '</strong>' + (p.tolerancia ? ' <span class="suave">(se acepta ± ' + esc(num(p.tolerancia)) + ' por redondeo)</span>' : '') + '</p>';
    if (p.tipo === 'test') extra += '<p>Respuesta correcta: <strong>' + esc(p.opciones[p.correcta]) + '</strong></p>';

    let auto = '';
    if (r.puntos == null && p.tipo === 'corta') {
      auto = '<p>La corrección automática no puede asegurar si está bien: puede estar dicha de otra forma. Compárala con la corrección.</p>' +
        '<div class="fila-botones" role="group" aria-label="Autoevaluación"><button class="btn facil" data-accion="auto" data-id="' + p.id + '" data-p="1" data-autofocus>Era correcta</button>' +
        '<button class="btn otra" data-accion="auto" data-id="' + p.id + '" data-p="0">No era correcta</button></div>';
    } else if (r.puntos == null && p.tipo === 'desarrollo') {
      const detectados = detectarCriterios(r.dada, p.criterios || []);
      const nDet = detectados.filter(Boolean).length;
      auto = (r.dada && String(r.dada).trim()
        ? '<p class="suave">' + (nDet ? 'Hemos marcado los ' + nDet + ' puntos cuyas palabras clave aparecen en tu texto. Revísalos: desmarca los que no estén bien explicados y marca los que hayas dicho con otras palabras.' : 'No hemos encontrado las palabras clave de los criterios en tu texto. Compáralo con la respuesta modelo y marca lo que sí hayas explicado.') + '</p>'
        : '<p class="suave">Consejo: escribe tu respuesta antes de ver la corrección. Así la app puede ayudarte a detectar qué puntos has incluido.</p>') +
        '<fieldset class="criterios"><legend>Marca los puntos que has incluido en tu respuesta</legend>' + (p.criterios || []).map(function (c, i) {
        return '<label><input type="checkbox" name="crit-' + p.id + '" value="' + i + '"' + (detectados[i] ? ' checked' : '') + (i === 0 ? ' data-autofocus' : '') + '> ' + esc(c) +
          (detectados[i] ? ' <span class="chip detectado">detectado</span>' : '') + '</label>';
      }).join('') + '</fieldset><button class="btn primario" data-accion="auto-crit" data-id="' + p.id + '">Guardar valoración</button>';
    } else if (p.tipo === 'desarrollo' && p.criterios) {
      auto = '<p class="suave">Criterios: ' + p.criterios.map(esc).join(' · ') + '</p>';
    }

    const foco = r.puntos != null ? ' tabindex="-1" data-autofocus' : '';
    return '<div class="correccion"' + foco + '>' + estado + extra +
      '<h2>Corrección</h2><p>' + esc(p.modelo) + '</p>' +
      (p.pasos && p.pasos.length ? '<ol class="pasos-sol">' + p.pasos.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ol>' : '') +
      auto + '</div>';
  }

  function responderActual(form, saltar) {
    const p = plan.preguntaPorId[form.getAttribute('data-id')];
    let dada = '';
    if (!saltar) {
      if (p.tipo === 'test') {
        const sel = form.querySelector('input[name="resp"]:checked');
        dada = sel ? sel.value : '';
      } else {
        dada = form.elements.resp.value.trim();
      }
      if (quiz.modo !== 'simulacro' && dada === '' && p.tipo !== 'desarrollo') {
        document.getElementById('error-resp').textContent = 'Escribe o elige una respuesta, o pulsa «No lo sé» para ver la corrección.';
        return;
      }
    }
    if (quiz.modo === 'simulacro') {
      quiz.resp[p.id] = { dada: dada };
      if (quiz.i < quiz.ids.length - 1) { quiz.i++; render(); } else terminarQuiz();
      return;
    }
    const c = saltar ? { puntos: p.tipo === 'desarrollo' ? null : 0 } : corregir(p, dada);
    quiz.resp[p.id] = { dada: dada, puntos: c.puntos, detalle: c.detalle, corregida: true };
    tocarTema(p.tema);
    if (c.puntos != null) store.registrarRespuesta(p.id, c.puntos);
    render();
  }

  function autoevaluar(id, puntos) {
    const r = quiz.resp[id];
    if (!r) return;
    r.puntos = puntos;
    r.corregida = true;
    store.registrarRespuesta(id, puntos);
    if (quiz.registrada) actualizarSesion();
    render();
  }

  function terminarQuiz() {
    quiz.terminado = true;
    pararReloj();
    if (quiz.modo === 'simulacro') {
      // Las no respondidas puntúan 0 en el simulacro, pero no se guardan como fallos en las estadísticas.
      quiz.ids.forEach(function (id) {
        const p = plan.preguntaPorId[id];
        const r = quiz.resp[id] || { dada: '' };
        const vacia = r.dada === '' || r.dada == null;
        const c = vacia && p.tipo !== 'desarrollo' ? { puntos: 0, detalle: 'Sin responder.' } : corregir(p, r.dada);
        quiz.resp[id] = { dada: r.dada, puntos: c.puntos, detalle: c.detalle, corregida: true };
        if (c.puntos != null && !vacia) { store.registrarRespuesta(id, c.puntos); tocarTema(p.tema); }
      });
    }
    actualizarSesion();
    location.hash = '#/resultado';
  }

  // Solo cuenta las preguntas ya puntuadas (las de autoevaluación pendiente no suman ni restan).
  function resumenQuiz() {
    let puntos = 0, contadas = 0;
    const porTema = {};
    quiz.ids.forEach(function (id) {
      const r = quiz.resp[id];
      const tema = plan.preguntaPorId[id].tema;
      porTema[tema] = porTema[tema] || [0, 0];
      if (!r || r.puntos == null) return;
      puntos += r.puntos; contadas++;
      porTema[tema][0] += r.puntos; porTema[tema][1] += 1;
    });
    return { puntos: puntos, contadas: contadas, porTema: porTema };
  }

  function actualizarSesion() {
    const res = resumenQuiz();
    const asigs = {};
    quiz.ids.forEach(function (id) { asigs[plan.temaPorId[plan.preguntaPorId[id].tema].asignatura.id] = 1; });
    const datos = { tipo: quiz.modo, asignatura: Object.keys(asigs).length === 1 ? Object.keys(asigs)[0] : 'ambas', total: res.contadas, puntos: res.puntos, porTema: res.porTema };
    if (!quiz.registrada) {
      store.registrarSesion(datos);
      quiz.registrada = true;
      quiz.indiceSesion = store.state.sesiones.length - 1;
    } else if (store.state.sesiones[quiz.indiceSesion]) {
      Object.assign(store.state.sesiones[quiz.indiceSesion], datos);
      store.guardar();
    }
  }

  function vistaResultado() {
    if (!quiz || !quiz.terminado) {
      return '<section class="vacio"><h1>Sin resultados</h1><p>Aún no has terminado ningún cuestionario en esta sesión.</p><a class="btn primario" href="#/practica">Ir a Práctica</a></section>';
    }
    const res = resumenQuiz();
    const nota = res.contadas ? res.puntos / res.contadas : null;
    const temasHtml = Object.keys(res.porTema).map(function (id) {
      const v = res.porTema[id];
      return '<tr><th scope="row"><a href="#/tema/' + id + '">' + esc(plan.temaPorId[id].tema.nombre) + '</a></th><td>' + num(v[0], 1) + ' / ' + v[1] + '</td><td>' + (v[1] ? pct(v[0] / v[1]) : 'pendiente') + '</td></tr>';
    }).join('');
    const falladas = quiz.ids.filter(function (id) { const r = quiz.resp[id]; return r && r.puntos != null && r.puntos < 1; });
    const pendientesAuto = quiz.ids.filter(function (id) { const r = quiz.resp[id]; return r && r.puntos == null; });

    let mensaje;
    if (nota == null) mensaje = 'Valora tus respuestas abiertas para ver el resultado.';
    else if (nota >= 0.8) mensaje = 'Muy buen resultado. Si se repite, puedes marcar estos temas como dominados.';
    else if (nota >= 0.5) mensaje = 'Vas por buen camino. Repasa las correcciones de las que fallaste y repítelas en unos días.';
    else mensaje = 'Hoy has detectado bastantes cosas que repasar, y eso es útil. Lee las correcciones con calma y vuelve a la explicación de los temas indicados.';

    const revision = quiz.ids.map(function (id, k) {
      const p = plan.preguntaPorId[id];
      const r = quiz.resp[id] || {};
      const icono = r.puntos == null ? '·' : (r.puntos >= 1 ? '✓' : (r.puntos > 0 ? '½' : '✗'));
      return '<details class="revision"' + (r.puntos == null ? ' open' : '') + '><summary><span class="icono ' + (r.puntos == null ? 'pend' : r.puntos >= 1 ? 'bien' : r.puntos > 0 ? 'medio' : 'mal') + '" aria-hidden="true">' + icono + '</span> ' +
        (k + 1) + '. ' + esc(p.enunciado) + '</summary>' + htmlContexto(p) +
        (r.dada !== undefined && r.dada !== '' ? '<p class="suave">Tu respuesta: ' + esc(p.tipo === 'test' ? p.opciones[r.dada] : r.dada) + '</p>' : '') +
        htmlCorreccion(p, r).replace(/ tabindex="-1" data-autofocus/, '') + '</details>';
    }).join('');

    return '<section><h1>Resultados</h1>' +
      '<div class="rejilla dos"><article class="panel destacado"><p class="nota-grande">' + (nota == null ? '—' : pct(nota)) + '</p>' +
      '<p>' + num(res.puntos, 1) + ' de ' + res.contadas + ' puntos' + (pendientesAuto.length ? ' · ' + pendientesAuto.length + ' por autoevaluar' : '') + '</p>' +
      '<p>' + esc(mensaje) + '</p></article>' +
      '<article class="panel"><h2>Por tema</h2><table class="tabla"><thead><tr><th scope="col">Tema</th><th scope="col">Puntos</th><th scope="col">Acierto</th></tr></thead><tbody>' + temasHtml + '</tbody></table></article></div>' +
      '<div class="fila-botones separado">' +
      (falladas.length ? '<button class="btn primario" data-accion="quiz-ids" data-ids="' + falladas.join(',') + '">Repetir las falladas (' + falladas.length + ')</button>' : '') +
      '<a class="btn" href="#/practica">Nueva práctica</a><a class="btn" href="#/progreso">Ver progreso</a></div>' +
      '<h2 class="separado">Revisión pregunta a pregunta</h2>' + revision + '</section>';
  }

  function iniciarReloj() {
    const el = document.getElementById('temporizador');
    function tick() {
      const resta = Math.max(0, quiz.limite - Date.now());
      const m = Math.floor(resta / 60000), s = Math.floor((resta % 60000) / 1000);
      if (el) {
        el.textContent = String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
        el.classList.toggle('poco', resta < 5 * 60000);
      }
      if (resta <= 0) { aviso('Se ha acabado el tiempo. Corrigiendo el simulacro.'); terminarQuiz(); }
    }
    tick();
    reloj = setInterval(tick, 1000);
  }

  /* ───────────── Cronómetro para exámenes oficiales ───────────── */
  let cronometro = null;
  function vistaReloj() {
    if (!cronometro) {
      return '<section class="vacio"><h1>Cronómetro</h1><p>Inícialo desde Práctica.</p><a class="btn primario" href="#/practica">Ir a Práctica</a></section>';
    }
    return '<section class="reloj"><h1>Examen oficial en papel</h1>' +
      '<p class="suave">Haz el examen en papel sin mirar apuntes. Al terminar, corrígelo con los criterios oficiales de corrección.</p>' +
      '<p class="reloj-grande" id="cronometro" role="timer">--:--</p>' +
      '<div class="fila-botones"><button class="btn" data-accion="cron-pausa">' + (cronometro.pausa ? 'Reanudar' : 'Pausar') + '</button>' +
      '<button class="btn peligro" data-accion="cron-fin">Terminar</button></div>' +
      '<p><a href="' + esc(fuentes.lista.find(function (f) { return f.id === 'modelos'; }).url) + '" target="_blank" rel="noopener">Abrir los exámenes oficiales</a></p></section>';
  }
  function iniciarCronometro() {
    const el = document.getElementById('cronometro');
    function tick() {
      const resta = cronometro.pausa ? cronometro.resta : Math.max(0, cronometro.fin - Date.now());
      const m = Math.floor(resta / 60000), s = Math.floor((resta % 60000) / 1000);
      if (el) { el.textContent = String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0'); el.classList.toggle('poco', resta < 5 * 60000); }
      if (resta <= 0 && !cronometro.avisado) { cronometro.avisado = true; aviso('¡Tiempo! Deja el bolígrafo y corrige con los criterios oficiales.'); }
    }
    tick();
    reloj = setInterval(tick, 1000);
  }

  /* ───────────── Progreso ───────────── */
  // Informe de los últimos 7 días comparado con los 7 anteriores, con recomendaciones concretas.
  function informeSemanal() {
    const st = store.state, ahora = Date.now(), SEM = 7 * 864e5;
    const resumen = function (desde, hasta) {
      const ses = st.sesiones.filter(function (x) { const t = new Date(x.fecha).getTime(); return t >= desde && t < hasta && x.total > 0; });
      const total = ses.reduce(function (a, x) { return a + x.total; }, 0);
      const puntos = ses.reduce(function (a, x) { return a + x.puntos; }, 0);
      const porTema = {};
      ses.forEach(function (x) {
        Object.keys(x.porTema || {}).forEach(function (id) {
          const v = x.porTema[id]; porTema[id] = porTema[id] || [0, 0];
          porTema[id][0] += v[0]; porTema[id][1] += v[1];
        });
      });
      return { total: total, acierto: total ? puntos / total : null, porTema: porTema };
    };
    const esta = resumen(ahora - SEM, ahora + 1);
    const antes = resumen(ahora - 2 * SEM, ahora - SEM);
    const diasClave = Object.keys(st.diasHechos).filter(function (k) { return ahora - plan.parseFecha(k).getTime() < SEM; });
    const minutos = diasClave.reduce(function (a, k) { return a + (st.diasHechos[k] || 0); }, 0);
    const temasSemana = Object.keys(esta.porTema).filter(function (id) { return esta.porTema[id][1] >= 2 && plan.temaPorId[id]; })
      .map(function (id) { return { id: id, ac: esta.porTema[id][0] / esta.porTema[id][1] }; })
      .sort(function (a, b) { return b.ac - a.ac; });
    const mejor = temasSemana[0], peor = temasSemana.length > 1 ? temasSemana[temasSemana.length - 1] : null;
    const tarjetas = plan.colaTarjetas({}).length;
    const vencidas = plan.sesionInteligente(10).vencidas;
    const sinEmpezar = plan.temas.filter(function (x) { return store.tema(x.tema.id).estado === 'pendiente'; }).length;
    const dias = plan.diasHastaExamen();

    let tendencia = '';
    if (esta.acierto != null && antes.acierto != null) {
      const dif = Math.round((esta.acierto - antes.acierto) * 100);
      tendencia = dif > 0 ? '+' + dif + ' puntos respecto a la semana anterior' : dif < 0 ? dif + ' puntos respecto a la semana anterior' : 'igual que la semana anterior';
    }
    const recs = [];
    if (!esta.total) recs.push('Esta semana aún no has practicado: empieza con una <button class="enlace-boton" data-accion="quiz-inteligente">sesión inteligente</button> de 10 preguntas.');
    if (tendencia && esta.acierto < antes.acierto - 0.05) recs.push('Tu acierto ha bajado: antes de seguir practicando, vuelve a leer la explicación de los temas en los que fallas.');
    if (peor && peor.ac < 0.7) recs.push('Refuerza <a href="#/tema/' + peor.id + '">' + esc(plan.temaPorId[peor.id].tema.nombre) + '</a> (' + pct(peor.ac) + ' esta semana): explicación, tarjetas y luego práctica.');
    if (vencidas) recs.push('Tienes ' + vencidas + ' preguntas que toca repasar: la sesión inteligente las incluye.');
    if (tarjetas) recs.push('Tienes ' + tarjetas + ' tarjetas pendientes: <a href="#/repaso">repásalas</a> (unos ' + Math.max(5, Math.round(tarjetas / 3)) + ' minutos).');
    if (diasClave.length < 4) recs.push('Has estudiado ' + diasClave.length + (diasClave.length === 1 ? ' día' : ' días') + ' esta semana: estudiar un poco casi cada día funciona mejor que darse atracones.');
    if (dias != null && dias > 0 && sinEmpezar) recs.push('Quedan ' + sinEmpezar + ' temas sin empezar y ' + dias + ' días hasta el examen: sigue el orden del <a href="#/plan">plan</a>.');
    if (!recs.length) recs.push('¡Vas muy bien! Mantén el ritmo y añade un simulacro esta semana.');

    return '<article class="panel destacado"><h2>Informe de la semana</h2>' +
      '<dl class="cifras"><div><dt>Días de estudio</dt><dd>' + diasClave.length + ' / 7</dd></div>' +
      '<div><dt>Tiempo registrado</dt><dd>' + minutos + ' min</dd></div>' +
      '<div><dt>Preguntas</dt><dd>' + esta.total + '</dd></div>' +
      '<div><dt>Acierto</dt><dd>' + pct(esta.acierto) + '</dd></div></dl>' +
      (tendencia ? '<p class="suave">Acierto: ' + esc(tendencia) + '.</p>' : '') +
      (mejor ? '<p>Tu mejor tema esta semana: <a href="#/tema/' + mejor.id + '">' + esc(plan.temaPorId[mejor.id].tema.nombre) + '</a> (' + pct(mejor.ac) + ').</p>' : '') +
      '<h3>Qué te recomendamos</h3><ul class="recomendaciones">' + recs.map(function (r) { return '<li>' + r + '</li>'; }).join('') + '</ul></article>';
  }

  function vistaProgreso() {
    const st = store.state;
    const asigs = PAU.asignaturas.map(function (a) {
      const r = plan.resumenAsignatura(a.id);
      const ses = st.sesiones.filter(function (s) { return s.asignatura === a.id && s.total > 0; }).slice(-12);
      const evol = ses.length
        ? '<div class="evolucion" role="img" aria-label="' + esc('Evolución de ' + a.nombre + ': ' + ses.map(function (s) { return Math.round(s.puntos / s.total * 100) + ' %'; }).join(', ')) + '">' +
          ses.map(function (s) { const p = Math.round(s.puntos / s.total * 100); return '<span class="col ' + a.id + '" style="height:' + Math.max(4, p) + '%" title="' + esc(new Date(s.fecha).toLocaleDateString('es-ES') + ': ' + p + ' %') + '"></span>'; }).join('') + '</div>' +
          '<p class="suave pequeno-texto">Acierto en las últimas ' + ses.length + ' sesiones de ' + esc(a.nombre) + ' (de la más antigua a la más reciente).</p>'
        : '<p class="suave">Aún no hay sesiones de práctica de ' + esc(a.nombre) + '.</p>';
      return '<article class="panel"><h2 class="titulo-asig ' + a.id + '">' + esc(a.nombre) + '</h2>' +
        '<dl class="cifras"><div><dt>Temas dominados</dt><dd>' + r.dominado + ' / ' + r.total + '</dd></div>' +
        '<div><dt>En curso</dt><dd>' + r['en-curso'] + '</dd></div>' +
        '<div><dt>Acierto</dt><dd>' + pct(r.acierto) + '</dd></div>' +
        '<div><dt>Preguntas hechas</dt><dd>' + r.respondidas + ' / ' + r.preguntas + '</dd></div>' +
        '<div><dt>Tarjetas aprendidas</dt><dd>' + r.aprendidas + ' / ' + r.tarjetas + '</dd></div></dl>' +
        evol + '</article>';
    }).join('');

    const recurrentes = Object.keys(st.respuestas).filter(function (id) {
      const r = st.respuestas[id];
      return plan.preguntaPorId[id] && r.intentos >= 2 && (r.aciertos / r.intentos) < 0.5;
    });
    const recurrentesHtml = recurrentes.length
      ? '<ul>' + recurrentes.slice(0, 10).map(function (id) {
        const p = plan.preguntaPorId[id]; const r = st.respuestas[id];
        return '<li>' + esc(p.enunciado.length > 110 ? p.enunciado.slice(0, 110) + '…' : p.enunciado) + ' <span class="suave">(' + esc(plan.temaPorId[p.tema].tema.nombre) + ' · ' + num(r.aciertos, 1) + '/' + r.intentos + ')</span></li>';
      }).join('') + '</ul><button class="btn primario" data-accion="quiz-ids" data-ids="' + recurrentes.join(',') + '">Practicar estos errores</button>'
      : '<p class="suave">No hay errores repetidos. Aquí aparecerán las preguntas que falles dos veces o más.</p>';

    const filas = plan.temas.map(function (x) {
      const s = plan.statsTema(x.tema.id); const e = store.tema(x.tema.id);
      return '<tr><th scope="row"><span class="chip ' + x.asignatura.id + '">' + esc(x.asignatura.nombre.slice(0, 3)) + '</span> <a href="#/tema/' + x.tema.id + '">' + esc(x.tema.nombre) + '</a></th>' +
        '<td><span class="estado ' + e.estado + '">' + NOMBRE_ESTADO[e.estado] + '</span></td><td>' + pct(s.acierto) + '</td><td>' + s.respondidas + '/' + s.preguntas + '</td><td>' + s.aprendidas + '/' + s.tarjetas + '</td></tr>';
    }).join('');

    const semana = Object.keys(st.diasHechos).filter(function (k) { return (Date.now() - plan.parseFecha(k).getTime()) < 7 * 864e5; }).length;

    return '<section><h1>Progreso</h1>' +
      '<p>' + esc(semana ? 'Esta semana has estudiado ' + semana + (semana === 1 ? ' día' : ' días') + '. ' + mensajeMotivador() : mensajeMotivador()) + '</p>' +
      informeSemanal() +
      '<div class="rejilla dos separado">' + asigs + '</div>' +
      '<article class="panel separado"><h2>Errores recurrentes</h2>' + recurrentesHtml + '</article>' +
      '<article class="panel separado"><h2>Detalle por tema</h2><div class="tabla-scroll"><table class="tabla"><thead><tr><th scope="col">Tema</th><th scope="col">Estado</th><th scope="col">Acierto</th><th scope="col">Preguntas</th><th scope="col">Tarjetas</th></tr></thead><tbody>' + filas + '</tbody></table></div></article>' +
      '<article class="panel separado" id="copia"><h2>Copia de seguridad</h2>' +
      '<p>Tu progreso se guarda solo en este navegador y en este dispositivo. No se envía a ningún servidor.</p>' +
      '<ul><li><strong>Antes de borrar los datos del navegador</strong>, cambiar de móvil o reinstalar el navegador, pulsa «Exportar progreso». Se descargará un archivo <code>.json</code>.</li>' +
      '<li>Guarda ese archivo en un lugar seguro (por ejemplo, en Google Drive o enviándotelo por correo).</li>' +
      '<li>Para recuperarlo, aquí o en otro dispositivo, pulsa «Importar progreso» y elige el archivo. Sustituye al progreso actual.</li>' +
      '<li>Conviene exportar una copia cada semana.</li></ul>' +
      '<div class="fila-botones"><button class="btn primario" data-accion="exportar">Exportar progreso</button>' +
      '<label class="btn">Importar progreso<input type="file" accept="application/json,.json" data-accion="importar" class="sr"></label>' +
      '<button class="btn peligro" data-accion="borrar">Borrar todo el progreso</button></div>' +
      '<p class="suave pequeno-texto">Más información sobre el contenido en <a href="#/fuentes">Fuentes</a>.</p></article></section>';
  }

  /* ───────────── Fuentes ───────────── */
  function vistaFuentes() {
    const fecha = fuentes.consulta.split('-').reverse().join('/');
    return '<section><h1>Fuentes y verificación</h1>' +
      '<p><strong>Comunidad:</strong> ' + esc(fuentes.comunidad) + ' · <strong>Convocatoria:</strong> ' + esc(fuentes.convocatoria) + ' · <strong>Consulta:</strong> ' + esc(fecha) + '</p>' +
      '<div class="rejilla dos">' +
      '<article class="panel"><h2>Comprobado en fuentes oficiales</h2><ul>' + fuentes.verificado.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></article>' +
      '<article class="panel aviso-panel"><h2>Pendiente de verificar</h2><ul>' + fuentes.pendiente.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></article>' +
      '</div>' +
      '<article class="panel separado"><h2>Qué es oficial y qué no</h2><ul>' +
      '<li><strong>Oficial (traducción resumida):</strong> la estructura de bloques y temas, el recuadro «Temario oficial» de cada tema y la lista de lo no evaluable.</li>' +
      '<li><strong>Original de práctica:</strong> las explicaciones, definiciones, ejemplos resueltos, errores frecuentes, tarjetas y todas las preguntas. No son preguntas de exámenes reales.</li>' +
      '<li>Para practicar con preguntas reales, usa los exámenes oficiales y sus criterios de corrección (enlaces de abajo).</li></ul></article>' +
      '<h2 class="separado">Documentos consultados</h2><ul class="lista-fuentes">' + fuentes.lista.map(function (f) {
        return '<li><a href="' + esc(f.url) + '" target="_blank" rel="noopener">' + esc(f.titulo) + '</a><br><span class="suave">' + esc(f.entidad) + ' · ' + esc(f.uso) + '</span></li>';
      }).join('') + '</ul>' +
      '<h2 class="separado">Fechas (no oficiales)</h2><ul class="lista-fuentes">' + fuentes.calendario.map(function (f) {
        return '<li><a href="' + esc(f.url) + '" target="_blank" rel="noopener">' + esc(f.titulo) + '</a></li>';
      }).join('') + '</ul></section>';
  }

  /* ───────────── Eventos ───────────── */
  document.addEventListener('click', function (ev) {
    const el = ev.target.closest('[data-accion]');
    if (!el || el.tagName === 'INPUT' || el.tagName === 'SELECT') return;
    const acc = el.getAttribute('data-accion');

    if (acc === 'marcar-hoy') { store.marcarDia(store.state.ajustes.minutosDia); aviso('Sesión registrada. ¡Bien hecho!', 'ok'); render(); }
    else if (acc === 'girar') { repaso.girada = true; render(); }
    else if (acc === 'valorar') { valorarTarjeta(el.getAttribute('data-v')); }
    else if (acc === 'quiz-tema') {
      const id = el.getAttribute('data-tema');
      crearQuiz(barajar((plan.preguntasPorTema[id] || []).map(function (p) { return p.id; })).slice(0, 10), { titulo: plan.temaPorId[id].tema.nombre });
    }
    else if (acc === 'quiz-ids') {
      const ids = el.getAttribute('data-ids').split(',').filter(function (id) { return plan.preguntaPorId[id]; });
      crearQuiz(barajar(ids).slice(0, 20), { titulo: 'Repaso de errores' });
    }
    else if (acc === 'saltar') { responderActual(document.getElementById('form-respuesta'), true); }
    else if (acc === 'siguiente') {
      if (quiz.i < quiz.ids.length - 1) { quiz.i++; render(); } else terminarQuiz();
    }
    else if (acc === 'anterior') { if (quiz.i > 0) { quiz.i--; render(); } }
    else if (acc === 'terminar') {
      confirmar('¿Terminar el simulacro?', 'Las preguntas sin responder contarán como no respondidas.', 'Terminar y corregir').then(function (ok) { if (ok) terminarQuiz(); });
    }
    else if (acc === 'auto') { autoevaluar(el.getAttribute('data-id'), +el.getAttribute('data-p')); }
    else if (acc === 'ejercicio') {
      const ej = PAU.ejercicios.find(function (x) { return x.id === el.getAttribute('data-id'); });
      if (ej) { ej.apartados.forEach(function (ap) { tocarTema(ap.tema); }); crearQuiz(ej.ids.slice(), { titulo: 'Ejercicio: ' + ej.titulo }); }
    }
    else if (acc === 'quiz-inteligente') {
      crearQuiz(plan.sesionInteligente(10).ids, { titulo: 'Sesión inteligente' });
    }
    else if (acc === 'auto-crit') {
      const id = el.getAttribute('data-id');
      const p = plan.preguntaPorId[id];
      const marcados = document.querySelectorAll('input[name="crit-' + id + '"]:checked').length;
      autoevaluar(id, p.criterios && p.criterios.length ? Math.round(marcados / p.criterios.length * 100) / 100 : 0);
    }
    else if (acc === 'cronometro') {
      const min = +document.querySelector('#form-simulacro [name="min"]').value || store.state.ajustes.duracionSimulacro;
      cronometro = { fin: Date.now() + min * 60000, pausa: false, resta: 0, avisado: false };
      location.hash = '#/reloj';
    }
    else if (acc === 'cron-pausa') {
      if (cronometro.pausa) { cronometro.fin = Date.now() + cronometro.resta; cronometro.pausa = false; }
      else { cronometro.resta = Math.max(0, cronometro.fin - Date.now()); cronometro.pausa = true; }
      render();
    }
    else if (acc === 'cron-fin') { cronometro = null; store.marcarDia(30); location.hash = '#/practica'; }
    else if (acc === 'exportar') {
      try { store.exportar(); aviso('Copia descargada. Guárdala en un lugar seguro.', 'ok'); }
      catch (e) { aviso('No se ha podido generar la copia en este navegador.', 'error'); }
    }
    else if (acc === 'borrar') {
      confirmar('¿Borrar todo el progreso?', 'Se eliminarán los estados de los temas, las tarjetas, las respuestas y los ajustes de este navegador. No se puede deshacer. Si quieres conservarlo, cancela y exporta antes una copia.', 'Sí, borrar todo')
        .then(function (ok) { if (ok) { store.borrarTodo(); quiz = null; repaso = null; aviso('Progreso borrado.'); render(); } });
    }
  });

  // Búsqueda del glosario: filtra las filas sin re-renderizar (así no se pierde el foco).
  document.addEventListener('input', function (ev) {
    if (ev.target.id !== 'buscar-glosario') return;
    const q = normalizar(ev.target.value);
    let n = 0;
    app.querySelectorAll('.glosario tbody tr').forEach(function (tr) {
      const ok = !q || tr.getAttribute('data-buscar').indexOf(q) !== -1;
      tr.hidden = !ok;
      if (ok) n++;
    });
    app.querySelectorAll('.grupo-glosario').forEach(function (g) {
      g.hidden = !g.querySelector('tbody tr:not([hidden])');
    });
    document.getElementById('glosario-cuenta').textContent = n + (n === 1 ? ' término.' : ' términos.');
    document.getElementById('glosario-vacio').hidden = n > 0;
  });

  document.addEventListener('change', function (ev) {
    const el = ev.target;
    const acc = el.getAttribute('data-accion');
    if (acc === 'estado') {
      store.setTema(el.getAttribute('data-tema'), { estado: el.value });
      aviso('Estado actualizado: ' + NOMBRE_ESTADO[el.value] + '.', 'ok');
      if (ruta().vista === 'plan') render();
    } else if (acc === 'prioridad') {
      store.setTema(el.getAttribute('data-tema'), { prioridad: el.checked });
      aviso(el.checked ? 'Tema marcado como prioritario.' : 'Prioridad quitada.', 'ok');
      if (ruta().vista === 'plan') render();
    } else if (acc === 'importar') {
      const file = el.files && el.files[0];
      store.importar(file).then(function (res) {
        aviso(res.mensaje, res.ok ? 'ok' : 'error');
        el.value = '';
        if (res.ok) { quiz = null; repaso = null; render(); }
      });
    } else if (el.form && el.form.id === 'form-quiz' && el.name === 'asig') {
      // Filtra los temas por la asignatura elegida.
      const sel = el.form.elements.tema;
      Array.prototype.forEach.call(sel.querySelectorAll('optgroup'), function (g, i) {
        const visible = !el.value || PAU.asignaturas[i].id === el.value;
        g.hidden = !visible; g.disabled = !visible;
      });
      const elegida = sel.selectedOptions[0];
      if (elegida && elegida.parentNode.disabled) sel.value = '';
    }
  });

  document.addEventListener('submit', function (ev) {
    const f = ev.target;
    if (f.id === 'form-ajustes') {
      ev.preventDefault();
      const err = document.getElementById('error-ajustes');
      const fecha = f.elements.fechaExamen.value;
      const min = parseInt(f.elements.minutosDia.value, 10);
      const sim = parseInt(f.elements.duracionSimulacro.value, 10);
      const dias = Array.prototype.filter.call(f.querySelectorAll('input[name="dia"]'), function (c) { return c.checked; }).map(function (c) { return +c.value; });
      if (!plan.parseFecha(fecha)) { err.textContent = 'Introduce una fecha de examen válida.'; f.elements.fechaExamen.focus(); return; }
      if (!(min >= 10 && min <= 480)) { err.textContent = 'Los minutos al día deben estar entre 10 y 480.'; f.elements.minutosDia.focus(); return; }
      if (!dias.length) { err.textContent = 'Elige al menos un día de estudio.'; return; }
      Object.assign(store.state.ajustes, { fechaExamen: fecha, minutosDia: min, diasSemana: dias, duracionSimulacro: sim >= 5 && sim <= 240 ? sim : 90 });
      aviso(store.guardar() ? 'Plan actualizado.' : 'No se ha podido guardar (almacenamiento no disponible).', store.disponible ? 'ok' : 'error');
      render();
    } else if (f.id === 'form-quiz') {
      ev.preventDefault();
      const filtro = { asig: f.elements.asig.value, tema: f.elements.tema.value, dif: f.elements.dif.value, tipo: f.elements.tipo.value };
      const lista = filtrarPreguntas(filtro);
      if (!lista.length) { document.getElementById('error-quiz').textContent = 'No hay preguntas con esa combinación de filtros. Prueba con «Todas» en dificultad o tipo.'; return; }
      // Prioriza las no respondidas y las falladas.
      const ordenadas = barajar(lista).sort(function (a, b) {
        const ra = store.state.respuestas[a.id], rb = store.state.respuestas[b.id];
        return (ra ? ra.ultima : -1) - (rb ? rb.ultima : -1);
      });
      crearQuiz(barajar(ordenadas.slice(0, +f.elements.n.value).map(function (p) { return p.id; })), { titulo: 'Práctica' });
    } else if (f.id === 'form-simulacro') {
      ev.preventDefault();
      const asig = f.elements.asig.value;
      const min = Math.min(240, Math.max(5, parseInt(f.elements.min.value, 10) || 90));
      const ids = elegirSimulacro(asig, 10);
      crearQuiz(ids, { modo: 'simulacro', titulo: 'Simulacro de ' + plan.asignaturaPorId[asig].nombre, limite: Date.now() + min * 60000 });
    } else if (f.id === 'form-respuesta') {
      ev.preventDefault();
      responderActual(f, false);
    }
  });

  function valorarTarjeta(v) {
    const c = repaso.cola.shift();
    store.valorarTarjeta(c.id, v);
    tocarTema(c.temaId);
    if (v === 'otra') repaso.cola.push(c);
    repaso.hechas++;
    repaso.girada = false;
    if (repaso.hechas === 1) store.marcarDia(0);
    render();
  }

  // Atajos de teclado en el repaso de tarjetas.
  document.addEventListener('keydown', function (ev) {
    if (ruta().vista !== 'repaso' || !repaso || !repaso.cola.length) return;
    if (/INPUT|TEXTAREA|SELECT|BUTTON/.test(document.activeElement.tagName) && ev.key === ' ') return;
    if (!repaso.girada && (ev.key === ' ' || ev.key === 'Enter') && document.activeElement.tagName !== 'A') { ev.preventDefault(); repaso.girada = true; render(); }
    else if (repaso.girada && ['1', '2', '3'].indexOf(ev.key) !== -1) { ev.preventDefault(); valorarTarjeta({ 1: 'otra', 2: 'dificil', 3: 'facil' }[ev.key]); }
  });

  window.addEventListener('beforeunload', function (ev) {
    if (quiz && !quiz.terminado && Object.keys(quiz.resp).length && quiz.modo === 'simulacro') { ev.preventDefault(); ev.returnValue = ''; }
  });

  window.addEventListener('hashchange', render);
  render();

  // Sin conexión cuando la app está publicada (los service workers no funcionan en file://).
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    navigator.serviceWorker.register('sw.js').catch(function () { /* sin caché: la app sigue funcionando con conexión */ });
  }
})();
