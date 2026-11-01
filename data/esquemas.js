/*
 * Esquemas visuales (material original) que se muestran en la explicación de algunos temas.
 * SVG con currentColor y variables CSS para que se vean bien en modo claro y oscuro.
 * Formato: temaId → [{ titulo, descripcion (texto alternativo), svg }]
 */
window.PAU = window.PAU || {};
PAU.esquemas = {
  q2t2: [{
    titulo: 'Diagrama de energía de una reacción exotérmica, con y sin catalizador',
    descripcion: 'Los reactivos están más arriba que los productos (ΔH negativa). La curva sin catalizador sube hasta un máximo alto (estado de transición); con catalizador, el máximo es más bajo. ΔH no cambia.',
    svg: '<svg viewBox="0 0 400 240"><g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M40 15V210H385"/></g>' +
      '<g stroke="currentColor" stroke-width="3" fill="none"><path d="M50 140H110M290 180H370"/></g>' +
      '<path d="M110 140C160 140 170 40 200 40S240 180 290 180" fill="none" stroke="var(--qui)" stroke-width="2.5"/>' +
      '<path d="M110 140C160 140 170 95 200 95S240 180 290 180" fill="none" stroke="var(--primary)" stroke-width="2.5" stroke-dasharray="6 4"/>' +
      '<g fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3"><path d="M110 140H360"/></g>' +
      '<g fill="none" stroke="currentColor" stroke-width="1.5" marker-end="url(#fl1)" fill="none"><path d="M200 138V46"/><path d="M350 142V174"/></g>' +
      '<defs><marker id="fl1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="currentColor"/></marker></defs>' +
      '<g fill="currentColor" font-size="12"><text x="52" y="132">Reactivos</text><text x="296" y="198">Productos</text>' +
      '<text x="206" y="90">Ea</text><text x="210" y="34" fill="var(--qui)">Sin catalizador</text><text x="232" y="108" fill="var(--primary)">Con catalizador</text>' +
      '<text x="356" y="162">ΔH &lt; 0</text><text x="150" y="228">Avance de la reacción</text>' +
      '<text x="14" y="150" transform="rotate(-90 14 150)">Energía</text></g></svg>'
  }],

  q2t4: [{
    titulo: 'Curva de valoración de un ácido fuerte con una base fuerte',
    descripcion: 'El pH empieza hacia 1, sube poco a poco, da un salto brusco alrededor del punto de equivalencia (pH 7) y después se estabiliza hacia 12-13. La zona de viraje de la fenolftaleína (8,2-10) cae dentro del salto.',
    svg: '<svg viewBox="0 0 400 245"><rect x="50" y="74" width="325" height="25" fill="var(--primary)" opacity=".15"/>' +
      '<g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M50 15V210H385"/></g>' +
      '<g fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3"><path d="M50 115H210V210"/></g>' +
      '<path d="M50 196C150 193 192 187 204 168L216 64C226 48 262 44 375 40" fill="none" stroke="var(--qui)" stroke-width="2.5"/>' +
      '<circle cx="210" cy="115" r="4.5" fill="var(--qui)"/>' +
      '<g fill="currentColor" font-size="12"><text x="36" y="119" text-anchor="end">7</text><text x="36" y="24" text-anchor="end">14</text><text x="36" y="200" text-anchor="end">1</text>' +
      '<text x="210" y="226" text-anchor="middle">V eq.</text><text x="220" y="130">Punto de equivalencia (pH 7)</text>' +
      '<text x="60" y="90" fill="var(--primary)">Viraje de la fenolftaleína (8,2-10)</text>' +
      '<text x="290" y="226">Volumen de base</text><text x="14" y="120" transform="rotate(-90 14 120)">pH</text></g></svg>'
  }],

  b1t3: [{
    titulo: 'Esquema de la respiración celular aerobia (por glucosa)',
    descripcion: 'Glucosa → glucólisis en el citosol (2 ATP, 2 NADH) → 2 piruvatos. Sin O₂, fermentación. Con O₂, en la matriz: descarboxilación (2 acetil-CoA, 2 NADH, 2 CO₂) y ciclo de Krebs (6 NADH, 2 FADH₂, 2 ATP, 4 CO₂). En las crestas, la cadena respiratoria usa el NADH y el FADH₂, reduce el O₂ a agua y produce la mayor parte del ATP.',
    svg: '<svg viewBox="0 0 400 330"><defs><marker id="fl2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="currentColor"/></marker></defs>' +
      '<g fill="none" stroke="currentColor" stroke-width="1.5"><rect x="130" y="8" width="140" height="28" rx="6"/><rect x="130" y="88" width="140" height="28" rx="6"/><rect x="130" y="168" width="140" height="28" rx="6"/>' +
      '<rect x="20" y="232" width="360" height="40" rx="6" stroke="var(--bio)"/><rect x="20" y="284" width="360" height="40" rx="6" stroke="var(--bio)"/><rect x="292" y="88" width="100" height="44" rx="6" stroke-dasharray="4 3"/></g>' +
      '<g fill="none" stroke="currentColor" stroke-width="1.5" marker-end="url(#fl2)"><path d="M200 36V86"/><path d="M200 116V166"/><path d="M200 196V230"/><path d="M200 272V282"/><path d="M270 102H290"/></g>' +
      '<g fill="currentColor" font-size="12" text-anchor="middle"><text x="200" y="27" font-weight="700">Glucosa</text><text x="200" y="107" font-weight="700">2 piruvato</text><text x="200" y="187" font-weight="700">2 acetil-CoA</text>' +
      '<text x="208" y="58" text-anchor="start">Glucólisis · citosol</text><text x="208" y="73" text-anchor="start" font-size="11">+2 ATP, +2 NADH</text>' +
      '<text x="208" y="146" text-anchor="start">Descarboxilación · matriz</text><text x="208" y="160" text-anchor="start" font-size="11">+2 NADH, 2 CO₂</text>' +
      '<text x="342" y="106">Sin O₂:</text><text x="342" y="122" font-size="11">fermentación</text>' +
      '<text x="200" y="250">Ciclo de Krebs · matriz mitocondrial</text><text x="200" y="265" font-size="11">+6 NADH, +2 FADH₂, +2 ATP, 4 CO₂</text>' +
      '<text x="200" y="302">Cadena respiratoria y ATP sintasa · crestas</text><text x="200" y="317" font-size="11">NADH y FADH₂ ceden e⁻ · O₂ → H₂O · la mayor parte del ATP</text></g></svg>'
  }],

  b4t2: [{
    titulo: 'Respuesta inmunitaria primaria y secundaria',
    descripcion: 'Tras la primera exposición, los anticuerpos tardan unos días en aparecer y alcanzan un nivel bajo (sobre todo IgM). Tras la segunda exposición al mismo antígeno, suben antes, mucho más y duran más (sobre todo IgG), gracias a las células de memoria.',
    svg: '<svg viewBox="0 0 400 230"><defs><marker id="fl3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="currentColor"/></marker></defs>' +
      '<g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M40 15V200H385"/></g>' +
      '<path d="M60 200C90 200 100 150 125 150S160 196 225 197C240 197 245 60 275 45S330 90 380 110" fill="none" stroke="var(--bio)" stroke-width="2.5"/>' +
      '<g fill="none" stroke="currentColor" stroke-width="1.5" marker-end="url(#fl3)"><path d="M60 218V204"/><path d="M228 218V204"/></g>' +
      '<g fill="currentColor" font-size="12"><text x="45" y="228">1.ª exposición</text><text x="215" y="228">2.ª exposición</text>' +
      '<text x="100" y="124">Primaria</text><text x="92" y="139" font-size="11">lenta, baja, IgM</text>' +
      '<text x="285" y="40">Secundaria</text><text x="285" y="55" font-size="11">rápida, alta, IgG</text>' +
      '<text x="14" y="160" transform="rotate(-90 14 160)">Anticuerpos</text></g></svg>'
  }],

  b2t3: [{
    titulo: 'Flujo de la información genética',
    descripcion: 'El ADN se copia por replicación. Por transcripción se forma ARN, que por traducción (en los ribosomas) da lugar a una proteína. Los retrovirus copian su ARN a ADN por retrotranscripción.',
    svg: '<svg viewBox="0 0 400 170"><defs><marker id="fl4" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="currentColor"/></marker></defs>' +
      '<g fill="none" stroke="currentColor" stroke-width="1.5"><rect x="15" y="70" width="80" height="34" rx="6" stroke="var(--bio)"/><rect x="160" y="70" width="80" height="34" rx="6" stroke="var(--bio)"/><rect x="305" y="70" width="85" height="34" rx="6" stroke="var(--bio)"/></g>' +
      '<g stroke="currentColor" stroke-width="1.5" fill="none" marker-end="url(#fl4)"><path d="M97 82H158"/><path d="M242 87H303"/><path d="M158 96H97" stroke-dasharray="4 3"/><path d="M40 70C25 30 85 30 70 68"/></g>' +
      '<g fill="currentColor" font-size="12" text-anchor="middle"><text x="55" y="92" font-weight="700">ADN</text><text x="200" y="92" font-weight="700">ARN</text><text x="347" y="92" font-weight="700">Proteína</text>' +
      '<text x="55" y="22">Replicación</text><text x="128" y="74">Transcripción</text><text x="272" y="78">Traducción</text>' +
      '<text x="128" y="122" font-size="11">Retrotranscripción</text><text x="128" y="136" font-size="11">(retrovirus)</text>' +
      '<text x="272" y="122" font-size="11">en los ribosomas</text><text x="200" y="160" font-size="11">En eucariotas: el ARN madura en el núcleo y se traduce en el citoplasma</text></g></svg>'
  }],

  b1t2: [{
    titulo: 'Factores que afectan a la actividad enzimática',
    descripcion: 'Izquierda: al aumentar la concentración de sustrato, la velocidad sube y se estabiliza en un máximo (saturación). Derecha: la actividad aumenta con la temperatura hasta un óptimo y después cae bruscamente por desnaturalización.',
    svg: '<svg viewBox="0 0 400 200"><g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M30 15V160H185"/><path d="M225 15V160H385"/></g>' +
      '<g fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3"><path d="M30 45H185"/></g>' +
      '<path d="M30 160C60 80 100 52 180 48" fill="none" stroke="var(--bio)" stroke-width="2.5"/>' +
      '<path d="M225 150C275 140 310 70 330 40C340 30 348 60 365 155" fill="none" stroke="var(--bio)" stroke-width="2.5"/>' +
      '<g fill="currentColor" font-size="12"><text x="95" y="40">V máx. (saturación)</text><text x="60" y="180">[Sustrato]</text>' +
      '<text x="290" y="28">T óptima</text><text x="350" y="100" font-size="11" text-anchor="end">desnaturalización</text><text x="270" y="180">Temperatura</text>' +
      '<text x="14" y="120" transform="rotate(-90 14 120)">Velocidad</text></g></svg>'
  }]
};
