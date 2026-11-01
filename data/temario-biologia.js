/*
 * Temario de Biología · PAU Cataluña.
 * Bloques y «oficial» siguen las orientaciones de la coordinación de Biología (fuente: bio-orient-2026).
 * «oficial» es una traducción propia y resumida al castellano; el resto (explicaciones, tarjetas,
 * ejemplos) es material original de estudio.
 *
 * Campos de cada tema:
 *   id, nombre, oficial, noEvaluable[], puntos[], definiciones[[término, definición]],
 *   formulas[[fórmula, explicación]], ejemplo {enunciado, pasos[], resultado}, errores[],
 *   tarjetas[[anverso, reverso]], pendiente (texto opcional si falta contenido fiable)
 */
window.PAU = window.PAU || {};
PAU.asignaturas = PAU.asignaturas || [];

PAU.asignaturas.push({
  id: 'bio',
  nombre: 'Biología',
  fuente: 'bio-orient-2026',
  examen: {
    resumen: '4 ejercicios obligatorios de 2,5 puntos cada uno, divididos en apartados (convocatoria ordinaria de 2025).',
    fuente: 'bio-examen-2025',
    notas: [
      'Las preguntas parten de un caso o contexto (una enfermedad, un experimento, un esquema) y piden aplicar lo aprendido.',
      'Las orientaciones insisten en que las preguntas son competenciales: hay que razonar y justificar, no solo memorizar.',
      'Los criterios de 2025 puntúan cada idea correcta por separado (por ejemplo, 0,1 puntos por cada nombre o justificación).'
    ]
  },
  bloques: [
    /* ───────────────────────── BIOMOLÉCULAS Y METABOLISMO ───────────────────────── */
    {
      id: 'b1',
      nombre: 'Biomoléculas y metabolismo',
      temas: [
        {
          id: 'b1t1',
          nombre: 'Biomoléculas: identificación y funciones',
          oficial: 'Distinguir por su estructura química si una molécula es un glúcido, un lípido, una proteína o un ácido nucleico (no hace falta identificar un glúcido o lípido concreto). Relacionar los cuatro grupos con sus funciones generales: energética, estructural, reguladora y portadora de información genética.',
          noEvaluable: ['Identificar un glúcido o un lípido concreto a partir de su estructura.'],
          puntos: [
            'Glúcidos: C, H y O, muchos grupos –OH y un grupo carbonilo (aldehído o cetona). Monosacáridos como la glucosa; polisacáridos como el almidón, el glucógeno o la celulosa.',
            'Lípidos: insolubles en agua y con largas cadenas hidrocarbonadas. Triglicéridos (glicerina + 3 ácidos grasos unidos por enlaces éster), fosfolípidos y esteroides.',
            'Proteínas: polímeros de aminoácidos unidos por enlaces peptídicos. Siempre contienen N; la pista es el esqueleto –NH–CH(R)–CO–.',
            'Ácidos nucleicos: polímeros de nucleótidos (fosfato + pentosa + base nitrogenada) unidos por enlaces fosfodiéster.',
            'Funciones: energética (glúcidos y lípidos), estructural (celulosa, fosfolípidos, colágeno), reguladora (hormonas proteicas y esteroideas, enzimas) e información genética (ácidos nucleicos).'
          ],
          definiciones: [
            ['Monómero', 'Unidad pequeña que se repite para formar un polímero: monosacárido, aminoácido o nucleótido.'],
            ['Enlace O-glucosídico', 'Une dos monosacáridos con pérdida de una molécula de agua.'],
            ['Enlace éster', 'Une un ácido graso a la glicerina en los triglicéridos.'],
            ['Enlace fosfodiéster', 'Une nucleótidos entre sí a través del grupo fosfato.']
          ],
          errores: [
            'Pensar que todos los lípidos son energéticos: los fosfolípidos son estructurales y los esteroides pueden ser reguladores.',
            'Confundir un nucleótido con una base nitrogenada: el nucleótido lleva además la pentosa y el fosfato.'
          ],
          tarjetas: [
            ['¿Qué elemento químico tienen siempre las proteínas y no los glúcidos ni los triglicéridos?', 'Nitrógeno (en el grupo amino y en el enlace peptídico).'],
            ['¿Qué tres componentes forman un nucleótido?', 'Un grupo fosfato, una pentosa (ribosa o desoxirribosa) y una base nitrogenada.'],
            ['Cita un ejemplo de lípido con función reguladora.', 'Las hormonas esteroideas (por ejemplo, testosterona o estrógenos).'],
            ['¿Qué tipo de enlace une los ácidos grasos a la glicerina?', 'Enlace éster.']
          ]
        },
        {
          id: 'b1t2',
          nombre: 'Proteínas y enzimas',
          oficial: 'Composición química de las proteínas (aminoácidos y péptidos), enlace peptídico y estructuras primaria, secundaria, terciaria y cuaternaria. Relación entre estructura y función. Enzimas como reguladoras del metabolismo; factores que afectan a su actividad (concentración de sustrato, temperatura, pH e inhibidores) y especificidad.',
          puntos: [
            'Aminoácido: carbono central unido a un grupo amino (–NH₂), un grupo carboxilo (–COOH), un H y una cadena lateral R que lo diferencia.',
            'Enlace peptídico: se forma entre el –COOH de un aminoácido y el –NH₂ del siguiente, liberando una molécula de agua. Es un enlace amida.',
            'Estructura primaria: secuencia de aminoácidos. Determina todas las demás estructuras y, por tanto, la función.',
            'Secundaria: plegamiento local en hélice α o lámina β, estabilizado por puentes de hidrógeno entre grupos del esqueleto.',
            'Terciaria: forma tridimensional completa, mantenida por interacciones entre cadenas R (puentes disulfuro, puentes de hidrógeno, iónicas e hidrofóbicas).',
            'Cuaternaria: unión de varias cadenas polipeptídicas, como en la hemoglobina (4 cadenas).',
            'Desnaturalización: pérdida de la forma (y de la función) por calor, pH extremo, etc., sin romper los enlaces peptídicos.',
            'Enzimas: catalizadores biológicos que bajan la energía de activación sin consumirse. El sustrato se une al centro activo, lo que explica la especificidad.',
            'Factores: con más sustrato la velocidad aumenta hasta saturarse (velocidad máxima). Cada enzima tiene una temperatura y un pH óptimos; fuera de ellos pierde actividad y puede desnaturalizarse.',
            'Inhibición competitiva: el inhibidor se parece al sustrato y ocupa el centro activo; se contrarresta aumentando el sustrato. No competitiva: el inhibidor se une a otro sitio y cambia la forma de la enzima.',
            'Cofactor: parte no proteica necesaria para la actividad (iones metálicos o coenzimas; muchas coenzimas derivan de vitaminas).'
          ],
          definiciones: [
            ['Centro activo', 'Zona de la enzima donde se une el sustrato y ocurre la reacción.'],
            ['Especificidad', 'Capacidad de la enzima de actuar solo sobre un sustrato (o un grupo de sustratos parecidos) por la forma complementaria del centro activo.'],
            ['Regulación alostérica', 'Una molécula se une a un sitio distinto del centro activo y activa o inhibe la enzima.']
          ],
          errores: [
            'Decir que la desnaturalización rompe la estructura primaria: los enlaces peptídicos se mantienen.',
            'Decir que una enzima «se gasta» en la reacción o que cambia el equilibrio: solo acelera la llegada a él.',
            'Confundir los efectos: a temperatura baja la enzima va lenta pero no se desnaturaliza.'
          ],
          tarjetas: [
            ['¿Entre qué grupos se forma el enlace peptídico?', 'Entre el grupo carboxilo de un aminoácido y el grupo amino del siguiente, con liberación de H₂O.'],
            ['¿Qué estructura se mantiene en una proteína desnaturalizada?', 'La primaria (la secuencia de aminoácidos).'],
            ['¿Cómo se contrarresta un inhibidor competitivo?', 'Aumentando la concentración de sustrato.'],
            ['¿Qué estabiliza la estructura secundaria?', 'Puentes de hidrógeno entre los grupos C=O y N–H del esqueleto peptídico.'],
            ['¿Qué ocurre con la velocidad de una enzima si aumentamos mucho el sustrato?', 'Aumenta hasta llegar a una velocidad máxima, cuando todas las enzimas están ocupadas (saturación).']
          ]
        },
        {
          id: 'b1t3',
          nombre: 'Catabolismo: respiración celular y fermentaciones',
          oficial: 'Concepto de metabolismo, anabolismo y catabolismo; diferencia entre vía metabólica y reacción. Para cada vía principal: nombre, localización, sustrato inicial y producto final, balance energético y coenzimas. ATP como transportador de energía; NADH, NADPH y FADH₂ como transportadores de poder reductor. Respiración aeróbica (glucólisis, descarboxilación del piruvato o β-oxidación, ciclo de Krebs, cadena respiratoria y fosforilación oxidativa) relacionada con la mitocondria; fermentaciones láctica y alcohólica y comparación de rendimientos.',
          puntos: [
            'Catabolismo: degradación de moléculas complejas en otras más sencillas; libera energía (ATP) y poder reductor (NADH, FADH₂). Anabolismo: síntesis que consume ATP y poder reductor.',
            'Glucólisis (citosol): glucosa → 2 piruvato. Balance neto: 2 ATP y 2 NADH. No necesita O₂.',
            'Descarboxilación oxidativa (matriz mitocondrial): piruvato → acetil-CoA + CO₂, y se forma 1 NADH por cada piruvato.',
            'β-oxidación (matriz mitocondrial): los ácidos grasos se cortan de dos en dos carbonos en forma de acetil-CoA. En cada vuelta se forman 1 FADH₂ y 1 NADH.',
            'Ciclo de Krebs (matriz): por cada acetil-CoA salen 2 CO₂, 3 NADH, 1 FADH₂ y 1 GTP (equivalente a 1 ATP).',
            'Cadena de transporte de electrones (membrana mitocondrial interna, en las crestas): NADH y FADH₂ ceden electrones; el O₂ es el aceptor final y forma H₂O. Se bombean protones y la ATP sintasa fabrica ATP (fosforilación oxidativa, teoría quimiosmótica).',
            'Rendimiento de la respiración aeróbica de una glucosa: unos 30-32 ATP con los valores actuales (los libros más antiguos dan 36-38). Usa el criterio de tu profesor y explica de dónde sale.',
            'Fermentación (citosol, sin O₂): degradación parcial. Su función es regenerar el NAD⁺ para que la glucólisis siga. Solo rinde los 2 ATP de la glucólisis.',
            'Fermentación láctica: piruvato → lactato (músculo con falta de O₂, bacterias del yogur). Alcohólica: piruvato → etanol + CO₂ (levaduras: pan, vino, cerveza).'
          ],
          definiciones: [
            ['Vía metabólica', 'Secuencia de reacciones encadenadas, cada una catalizada por una enzima, en la que el producto de una es el sustrato de la siguiente.'],
            ['Poder reductor', 'Electrones de alta energía transportados por coenzimas reducidas (NADH, FADH₂, NADPH).'],
            ['Fosforilación oxidativa', 'Síntesis de ATP gracias al gradiente de protones creado por la cadena respiratoria.'],
            ['Fosforilación a nivel de sustrato', 'Síntesis de ATP directa en una reacción química (por ejemplo, en la glucólisis).']
          ],
          ejemplo: {
            enunciado: 'Compara el ATP obtenido de una glucosa por respiración aeróbica y por fermentación láctica. ¿Por qué la fermentación es menos eficiente?',
            pasos: [
              'Fermentación: solo hay glucólisis, que da 2 ATP netos. El NADH se usa para reducir el piruvato a lactato y regenerar NAD⁺, así que no produce ATP.',
              'Respiración: la glucólisis, el ciclo de Krebs y sobre todo la fosforilación oxidativa dan unos 30-32 ATP.',
              'La fermentación es una oxidación parcial: el lactato todavía contiene mucha energía química que no se aprovecha.'
            ],
            resultado: 'Respiración ≈ 30-32 ATP frente a 2 ATP en la fermentación, unas 15 veces más. La diferencia está en la oxidación completa a CO₂ con el O₂ como aceptor final.'
          },
          errores: [
            'Situar la glucólisis en la mitocondria: ocurre en el citosol.',
            'Pensar que la fermentación produce ATP extra al formar lactato o etanol: solo regenera el NAD⁺.',
            'Decir que el O₂ se convierte en CO₂: el O₂ acaba formando H₂O; el CO₂ sale de la descarboxilación y del ciclo de Krebs.'
          ],
          tarjetas: [
            ['¿Dónde ocurre la glucólisis y qué balance neto tiene?', 'En el citosol. Glucosa → 2 piruvato + 2 ATP + 2 NADH.'],
            ['¿Cuál es el aceptor final de electrones en la respiración aeróbica?', 'El O₂, que se reduce a H₂O.'],
            ['¿Qué se obtiene por cada vuelta del ciclo de Krebs?', '2 CO₂, 3 NADH, 1 FADH₂ y 1 GTP (≈ ATP).'],
            ['¿Para qué sirve la fermentación si no da más ATP?', 'Para regenerar el NAD⁺ y que la glucólisis pueda continuar sin O₂.'],
            ['Productos de la fermentación alcohólica', 'Etanol y CO₂ (además de los 2 ATP de la glucólisis).'],
            ['¿Dónde se localiza la cadena de transporte de electrones en eucariotas?', 'En la membrana mitocondrial interna (crestas).']
          ]
        },
        {
          id: 'b1t4',
          nombre: 'Anabolismo: fotosíntesis y quimiosíntesis',
          oficial: 'Anabolismo autótrofo: concepto, reacción global y balance de la fotosíntesis; localización y relación con el cloroplasto. Fase luminosa (fotólisis del agua, formación de NADPH y ATP) y fase oscura (fijación del carbono, ciclo de Calvin). Importancia biológica; comparación con la respiración. Fotosíntesis bacteriana y quimiosíntesis. Síntesis de aminoácidos y de ácidos grasos: solo saber en qué consisten y situarlas en el esquema general del metabolismo.',
          puntos: [
            'Reacción global: 6 CO₂ + 6 H₂O + luz → C₆H₁₂O₆ + 6 O₂.',
            'Fase luminosa (membrana de los tilacoides): la luz excita la clorofila; la fotólisis del agua (H₂O → ½ O₂ + 2 H⁺ + 2 e⁻) aporta electrones y libera O₂. Se forman ATP (fotofosforilación) y NADPH.',
            'Fase oscura o ciclo de Calvin (estroma): la enzima RuBisCO fija el CO₂ a la ribulosa-1,5-bisfosfato. Con el ATP y el NADPH de la fase luminosa se forman glúcidos. No necesita luz directamente, pero depende de los productos de la fase luminosa.',
            'Importancia: produce materia orgánica que entra en las cadenas tróficas, libera O₂ y retira CO₂ de la atmósfera.',
            'Relación con la respiración: los productos de una son los reactivos de la otra. La fotosíntesis es anabólica y reductora; la respiración, catabólica y oxidativa.',
            'Fotosíntesis bacteriana anoxigénica: usa otros donadores de electrones (por ejemplo, H₂S) en lugar del agua y no libera O₂.',
            'Quimiosíntesis: algunas bacterias obtienen energía oxidando compuestos inorgánicos (NH₃, NO₂⁻, H₂S, Fe²⁺) y la usan para fijar CO₂. Ejemplo: bacterias nitrificantes.',
            'La síntesis de aminoácidos y de ácidos grasos (lipogénesis) parte de intermediarios como el acetil-CoA: solo hay que saber en qué consisten y dónde van en el esquema general.'
          ],
          definiciones: [
            ['Autótrofo', 'Organismo que fabrica materia orgánica a partir de CO₂ usando luz (fotoautótrofo) o energía química (quimioautótrofo).'],
            ['Fotólisis del agua', 'Ruptura del agua por la luz en la fase luminosa: libera O₂, protones y electrones.'],
            ['RuBisCO', 'Enzima que fija el CO₂ en el ciclo de Calvin.']
          ],
          errores: [
            'Creer que el O₂ liberado procede del CO₂: procede del agua.',
            'Decir que la fase oscura ocurre de noche: ocurre de día, a la vez que la luminosa.',
            'Confundir NADPH (fotosíntesis, anabolismo) con NADH (respiración, catabolismo).'
          ],
          tarjetas: [
            ['¿De qué molécula procede el O₂ que se libera en la fotosíntesis?', 'Del agua (fotólisis del agua).'],
            ['¿Dónde ocurre el ciclo de Calvin?', 'En el estroma del cloroplasto.'],
            ['¿Qué productos de la fase luminosa usa el ciclo de Calvin?', 'ATP y NADPH.'],
            ['¿En qué se diferencia la quimiosíntesis de la fotosíntesis?', 'La energía no viene de la luz sino de la oxidación de compuestos inorgánicos.'],
            ['¿Por qué la fotosíntesis bacteriana anoxigénica no libera O₂?', 'Porque no usa agua como donador de electrones, sino otras sustancias como el H₂S.']
          ]
        }
      ]
    },

    /* ───────────────────────── GENÉTICA Y CICLO CELULAR ───────────────────────── */
    {
      id: 'b2',
      nombre: 'Genética y ciclo celular',
      temas: [
        {
          id: 'b2t1',
          nombre: 'Ácidos nucleicos y genoma',
          oficial: 'Composición química de los ácidos nucleicos. ADN: función, estructura (secuencia, doble hélice, niveles de compactación) y localización en procariotas y eucariotas. Diferencias entre genomas (tipo de cromosomas, plásmidos, secuencias codificantes y no codificantes). Tipos de ARN (ARNm, ARNt, ARNr): función, estructura y localización. Otros tipos de ARN y su papel.',
          puntos: [
            'ADN: desoxirribosa; bases A, G, C y T. Doble hélice de dos cadenas antiparalelas (5′→3′ y 3′→5′) unidas por puentes de hidrógeno entre bases complementarias: A=T (2 puentes) y G≡C (3 puentes).',
            'ARN: ribosa; bases A, G, C y U (uracilo en lugar de timina). Normalmente es de una sola cadena.',
            'Compactación en eucariotas: el ADN se enrolla en histonas formando nucleosomas (fibra de cromatina), que se pliegan más hasta formar el cromosoma en la división.',
            'Procariotas: un cromosoma circular en el citoplasma (nucleoide) y, a menudo, plásmidos. Casi todo el ADN es codificante y los genes no tienen intrones.',
            'Eucariotas: varios cromosomas lineales en el núcleo (también hay ADN en mitocondrias y cloroplastos). Mucho ADN no codificante; los genes tienen intrones.',
            'ARNm: copia el mensaje del gen y lo lleva al ribosoma. ARNt: transporta aminoácidos y tiene el anticodón. ARNr: forma parte de los ribosomas y cataliza el enlace peptídico.',
            'Otros ARN: los microARN y los ARN de interferencia regulan genes al bloquear o degradar ARNm; los ARN pequeños nucleares participan en el corte y empalme (splicing).'
          ],
          definiciones: [
            ['Antiparalelas', 'Las dos cadenas del ADN van en sentidos opuestos (una 5′→3′ y la otra 3′→5′).'],
            ['Nucleosoma', 'Unidad de compactación: ADN enrollado alrededor de un octámero de histonas.'],
            ['Plásmido', 'Molécula pequeña de ADN circular, extracromosómico, frecuente en bacterias. Puede llevar genes de resistencia a antibióticos.'],
            ['Intrón / exón', 'Fragmentos de un gen eucariota que se eliminan (intrones) o se mantienen (exones) en el ARNm maduro.']
          ],
          formulas: [
            ['%A = %T y %G = %C (en ADN de doble cadena)', 'Regla de complementariedad de bases (Chargaff). Por tanto, %A + %G = 50 %.']
          ],
          errores: [
            'Escribir T en una secuencia de ARN: en el ARN va U.',
            'Aplicar la regla A = T a un ARN o a un ADN de cadena sencilla: solo vale para el ADN de doble cadena.'
          ],
          tarjetas: [
            ['Si un ADN de doble cadena tiene un 30 % de adenina, ¿cuánta guanina tiene?', '20 %. A = T = 30 % y queda un 40 % para G + C, es decir, un 20 % cada una.'],
            ['¿Cuántos puentes de hidrógeno unen G y C?', 'Tres (A y T se unen por dos).'],
            ['Función del ARNt', 'Transportar el aminoácido al ribosoma y reconocer el codón con su anticodón.'],
            ['Cita dos diferencias entre el genoma procariota y el eucariota.', 'Procariota: cromosoma circular, sin núcleo, plásmidos y genes sin intrones. Eucariota: cromosomas lineales con histonas, en el núcleo, con intrones y mucho ADN no codificante.']
          ]
        },
        {
          id: 'b2t2',
          nombre: 'Replicación del ADN y mutaciones',
          oficial: 'Mecanismo de replicación del ADN con el modelo procariota y enzimas implicadas; comparación con eucariotas. Errores de replicación como causa de mutaciones; efectos de las mutaciones y su papel como fuente de diversidad genética y material de la evolución.',
          puntos: [
            'La replicación es semiconservativa: cada molécula hija tiene una cadena antigua y una nueva (experimento de Meselson y Stahl).',
            'Helicasa: separa las cadenas rompiendo puentes de hidrógeno. Topoisomerasa: elimina las tensiones del superenrollamiento. Proteínas SSB: mantienen las cadenas separadas.',
            'Primasa: sintetiza un cebador de ARN, necesario porque la ADN polimerasa no puede empezar de cero.',
            'ADN polimerasa III: alarga en sentido 5′→3′. Cadena conductora: continua. Cadena retardada: a trozos (fragmentos de Okazaki).',
            'ADN polimerasa I: elimina los cebadores y rellena con ADN. Ligasa: une los fragmentos.',
            'Eucariotas: muchos orígenes de replicación (los cromosomas son largos), ADN asociado a histonas y problema de los extremos, que se resuelve con la telomerasa en algunas células.',
            'Las polimerasas corrigen errores, pero algunos se escapan y producen mutaciones. Las mutaciones pueden ser neutras, perjudiciales o, raras veces, beneficiosas: son la fuente última de variabilidad sobre la que actúa la selección natural.'
          ],
          definiciones: [
            ['Semiconservativa', 'Cada nueva doble hélice conserva una de las cadenas originales.'],
            ['Fragmentos de Okazaki', 'Trozos cortos de ADN que se sintetizan en la cadena retardada.'],
            ['Horquilla de replicación', 'Zona en forma de Y donde se están separando y copiando las cadenas.']
          ],
          errores: [
            'Decir que la polimerasa sintetiza en sentido 3′→5′: siempre alarga en 5′→3′.',
            'Olvidar el cebador de ARN o la ligasa al describir la cadena retardada.'
          ],
          tarjetas: [
            ['¿Qué enzima separa las dos cadenas del ADN?', 'La helicasa.'],
            ['¿Por qué hace falta un cebador en la replicación?', 'Porque la ADN polimerasa solo puede añadir nucleótidos a un extremo 3′ ya existente.'],
            ['¿Qué enzima une los fragmentos de Okazaki?', 'La ADN ligasa.'],
            ['¿Por qué los eucariotas tienen muchos orígenes de replicación?', 'Porque su ADN es muy largo: con un solo origen la replicación tardaría demasiado.']
          ]
        },
        {
          id: 'b2t3',
          nombre: 'Expresión génica y su regulación',
          oficial: 'Etapas de la expresión génica (modelo procariota) y características del código genético; resolución de problemas. Comparación de la transcripción y la traducción en procariotas y eucariotas. Regulación en procariotas (operones) y en eucariotas (promotores, potenciadores, factores de transcripción, activadores y represores). Marcas epigenéticas. Mecanismos genéticos y epigenéticos de la diferenciación celular.',
          puntos: [
            'Transcripción: la ARN polimerasa se une al promotor y sintetiza ARN complementario a la cadena molde, en sentido 5′→3′.',
            'En eucariotas el ARNm se madura en el núcleo: caperuza en 5′, cola de poli-A en 3′ y corte y empalme (se eliminan los intrones). En procariotas no hay maduración y la traducción empieza mientras se transcribe.',
            'Traducción (ribosomas): iniciación en el codón AUG (metionina), elongación (el ARNt con su anticodón aporta cada aminoácido) y terminación en un codón de parada (UAA, UAG o UGA).',
            'Código genético: tripletes (codones), degenerado (varios codones para un aminoácido), sin solapamiento, sin comas y casi universal.',
            'Operón lac (inducible): sin lactosa, el represor se une al operador y bloquea la transcripción. Con lactosa, esta se une al represor, lo inactiva y se transcriben los genes para degradarla.',
            'Eucariotas: los factores de transcripción se unen al promotor; los potenciadores (enhancers) aumentan la transcripción aunque estén lejos; activadores y represores la regulan.',
            'Epigenética: la metilación del ADN y las modificaciones de las histonas cambian el grado de compactación y la expresión sin cambiar la secuencia. Pueden heredarse entre células.',
            'Diferenciación celular: todas las células de un organismo tienen el mismo ADN, pero cada tipo expresa genes distintos.'
          ],
          definiciones: [
            ['Codón', 'Triplete de nucleótidos del ARNm que codifica un aminoácido o una señal de parada.'],
            ['Anticodón', 'Triplete del ARNt complementario al codón.'],
            ['Promotor', 'Secuencia de ADN donde se une la ARN polimerasa para iniciar la transcripción.'],
            ['Operón', 'Grupo de genes bacterianos regulados juntos por un mismo promotor y operador.']
          ],
          ejemplo: {
            enunciado: 'Una cadena molde de ADN tiene la secuencia 3′-TAC GGA TTT ACT-5′. Escribe el ARNm y el péptido resultante (AUG = Met, CCU = Pro, AAA = Lys, UGA = parada).',
            pasos: [
              'El ARNm es complementario y antiparalelo a la cadena molde, con U en lugar de T: 5′-AUG CCU AAA UGA-3′.',
              'Se lee de 5′ a 3′ por codones: AUG → Met, CCU → Pro, AAA → Lys, UGA → parada.'
            ],
            resultado: 'ARNm 5′-AUGCCUAAAUGA-3′ → péptido Met–Pro–Lys.'
          },
          errores: [
            'Leer el ARNm en sentido 3′→5′.',
            'Contar el codón de parada como un aminoácido.',
            'Pensar que las células diferenciadas han perdido genes.'
          ],
          tarjetas: [
            ['¿Qué significa que el código genético es degenerado?', 'Que un mismo aminoácido puede estar codificado por varios codones.'],
            ['¿Qué ocurre en el operón lac cuando hay lactosa?', 'La lactosa inactiva al represor, que se suelta del operador, y se transcriben los genes.'],
            ['Tres procesos de maduración del ARNm eucariota', 'Caperuza en 5′, cola de poli-A en 3′ y corte y empalme (eliminación de intrones).'],
            ['¿Qué es una marca epigenética?', 'Un cambio químico (metilación del ADN o modificación de histonas) que altera la expresión de un gen sin cambiar su secuencia.']
          ]
        },
        {
          id: 'b2t4',
          nombre: 'Ciclo celular, mitosis y meiosis',
          oficial: 'Fases del ciclo celular y su regulación. Fases de la mitosis y la meiosis; comparación y funciones biológicas. Ligamiento y recombinación. Relación entre la meiosis y las leyes de Mendel. Reproducción en procariotas.',
          puntos: [
            'Ciclo celular: interfase (G1: crecimiento; S: replicación del ADN; G2: preparación) y fase M (mitosis + citocinesis).',
            'Regulación: puntos de control (en G1, G2 y M) en los que proteínas como las ciclinas y las CDK deciden si se avanza. Si hay daño en el ADN, proteínas como p53 detienen el ciclo o activan la apoptosis.',
            'Mitosis: profase (se condensan los cromosomas), metafase (se alinean en el ecuador), anafase (se separan las cromátidas hermanas) y telofase. Da 2 células idénticas a la madre (2n → 2n). Sirve para el crecimiento, la reparación y la reproducción asexual.',
            'Meiosis: dos divisiones seguidas y una sola replicación. Da 4 células haploides (2n → n) y genéticamente distintas. Sirve para formar gametos.',
            'En la profase I los homólogos se aparean y se produce el sobrecruzamiento (recombinación). En la anafase I se separan los cromosomas homólogos y en la anafase II, las cromátidas.',
            'Relación con Mendel: la separación de homólogos en la anafase I explica la 1.ª ley (segregación); su orientación al azar en la metafase I explica la 3.ª (transmisión independiente).',
            'Ligamiento: genes en el mismo cromosoma tienden a heredarse juntos, salvo que el sobrecruzamiento los separe.',
            'Procariotas: se reproducen por fisión binaria (replican el cromosoma y la célula se divide en dos).'
          ],
          definiciones: [
            ['Cromosomas homólogos', 'Pareja de cromosomas, uno de cada progenitor, con los mismos genes (no necesariamente los mismos alelos).'],
            ['Cromátidas hermanas', 'Las dos copias idénticas de un cromosoma tras la fase S, unidas por el centrómero.'],
            ['Quiasma', 'Punto donde se ha producido el sobrecruzamiento entre cromátidas de homólogos.']
          ],
          errores: [
            'Confundir la anafase I (se separan homólogos) con la anafase II o la mitótica (se separan cromátidas).',
            'Decir que la replicación ocurre durante la mitosis: ocurre en la fase S de la interfase.'
          ],
          tarjetas: [
            ['¿En qué fase del ciclo se replica el ADN?', 'En la fase S de la interfase.'],
            ['¿Qué se separa en la anafase I de la meiosis?', 'Los cromosomas homólogos.'],
            ['¿En qué fase ocurre el sobrecruzamiento?', 'En la profase I de la meiosis.'],
            ['Resultado de la mitosis y de la meiosis', 'Mitosis: 2 células diploides idénticas. Meiosis: 4 células haploides diferentes.'],
            ['¿Cómo se reproducen las bacterias?', 'Por fisión binaria.']
          ]
        },
        {
          id: 'b2t5',
          nombre: 'Genética mendeliana y de poblaciones',
          oficial: 'Genotipo, fenotipo, alelos dominante y recesivo, homocigoto, heterocigoto, hemicigoto, ligado al sexo, caracteres cuantitativos y herencia poligénica. Problemas de monohibridismo (autosómico y ligado al sexo), codominancia, dominancia intermedia y dihibridismo. Probabilidad de riesgo de enfermedad genética a partir de frecuencias poblacionales. La evolución como cambio en las frecuencias alélicas; cálculo de frecuencias alélicas y fenotípicas.',
          puntos: [
            'Usa una letra para el gen: mayúscula para el alelo dominante (A) y minúscula para el recesivo (a). Escribe siempre la leyenda.',
            'Monohibridismo: Aa × Aa → 1 AA : 2 Aa : 1 aa, es decir, 3 dominantes : 1 recesivo.',
            'Retrocruzamiento: cruzar con un homocigoto recesivo (aa) para saber si un individuo dominante es AA o Aa.',
            'Codominancia: los dos alelos se expresan a la vez (grupo sanguíneo AB). Dominancia intermedia: el heterocigoto tiene un fenotipo intermedio (flores rojas × blancas → rosas).',
            'Herencia ligada al X: los varones (XY) son hemicigotos; con un solo alelo recesivo ya manifiestan el carácter (hemofilia, daltonismo).',
            'Dihibridismo (genes independientes): AaBb × AaBb → 9 : 3 : 3 : 1.',
            'En un árbol genealógico, si dos padres sanos tienen un hijo afectado, el carácter es recesivo.',
            'Caracteres cuantitativos o poligénicos (altura, color de piel): dependen de varios genes y del ambiente y varían de forma continua.',
            'Hardy-Weinberg: en una población en equilibrio, p + q = 1 y p² + 2pq + q² = 1.'
          ],
          definiciones: [
            ['Hemicigoto', 'Individuo con una sola copia de un gen, como los varones para los genes del cromosoma X.'],
            ['Portador', 'Heterocigoto que no manifiesta un carácter recesivo pero puede transmitirlo.'],
            ['Frecuencia alélica', 'Proporción de un alelo respecto al total de alelos de ese gen en la población.']
          ],
          formulas: [
            ['p + q = 1', 'p = frecuencia del alelo dominante; q = frecuencia del recesivo.'],
            ['p² + 2pq + q² = 1', 'Frecuencias de los genotipos AA, Aa y aa en equilibrio.'],
            ['P(A y B) = P(A) · P(B)', 'Regla del producto para sucesos independientes (dos hijos, dos genes…).']
          ],
          ejemplo: {
            enunciado: 'Una enfermedad autosómica recesiva afecta a 1 de cada 2 500 personas. ¿Qué porcentaje de la población es portadora?',
            pasos: [
              'Los afectados son aa: q² = 1/2 500 = 0,0004.',
              'q = √0,0004 = 0,02, así que p = 1 − 0,02 = 0,98.',
              'Portadores (Aa) = 2pq = 2 · 0,98 · 0,02 = 0,0392.'
            ],
            resultado: 'Aproximadamente un 3,9 % de la población es portadora.'
          },
          errores: [
            'Calcular q como la proporción de afectados: los afectados son q², así que hay que hacer la raíz cuadrada.',
            'En la herencia ligada al X, olvidar que la madre es quien transmite el X a los hijos varones.',
            'No justificar el tipo de herencia a partir del árbol genealógico.'
          ],
          tarjetas: [
            ['Proporción fenotípica de Aa × Aa', '3 : 1 (3/4 dominante, 1/4 recesivo).'],
            ['¿Cómo averiguas si un individuo de fenotipo dominante es AA o Aa?', 'Con un cruzamiento prueba (retrocruzamiento) con un homocigoto recesivo aa.'],
            ['Una madre portadora de hemofilia y un padre sano: ¿qué probabilidad tiene un hijo varón de ser hemofílico?', '1/2.'],
            ['Proporción de AaBb × AaBb (genes independientes)', '9 : 3 : 3 : 1.'],
            ['Diferencia entre codominancia y dominancia intermedia', 'En la codominancia se expresan los dos alelos (AB); en la intermedia el heterocigoto muestra un fenotipo mezcla (rosa).']
          ]
        },
        {
          id: 'b2t6',
          nombre: 'Cáncer, mutaciones y ciclo celular',
          oficial: 'Relación del cáncer con las mutaciones (oncogenes y genes supresores de tumores) y con las alteraciones del ciclo celular.',
          puntos: [
            'El cáncer aparece cuando una célula acumula mutaciones que le hacen dividirse sin control, evitar la apoptosis y, a veces, invadir otros tejidos (metástasis).',
            'Protooncogenes: genes normales que estimulan la división. Al mutar se convierten en oncogenes, hiperactivos, que funcionan como un «acelerador bloqueado». Basta una copia mutada.',
            'Genes supresores de tumores (como p53 o RB): frenan el ciclo o reparan el ADN. Su mutación quita el «freno». Normalmente deben fallar las dos copias.',
            'Factores de riesgo: mutágenos físicos (radiación UV, rayos X), químicos (tabaco) y biológicos (algunos virus, como el del papiloma humano), además de la predisposición hereditaria.'
          ],
          definiciones: [
            ['Oncogén', 'Forma mutada y hiperactiva de un protooncogén que impulsa la división celular.'],
            ['Apoptosis', 'Muerte celular programada; elimina células dañadas.'],
            ['Metástasis', 'Propagación de células tumorales a otros órganos a través de la sangre o la linfa.']
          ],
          errores: ['Decir que el cáncer se debe a una única mutación: suele requerir la acumulación de varias.'],
          tarjetas: [
            ['¿Qué es un protooncogén?', 'Un gen normal que estimula la división celular; si muta puede convertirse en oncogén.'],
            ['Función normal de p53', 'Detener el ciclo celular si el ADN está dañado y activar la reparación o la apoptosis.'],
            ['¿Por qué se dice que los oncogenes son «dominantes» a nivel celular?', 'Porque basta con que una copia esté mutada para estimular la división.']
          ]
        }
      ]
    },

    /* ───────────────────────── MICROORGANISMOS Y FORMAS ACELULARES ───────────────────────── */
    {
      id: 'b3',
      nombre: 'Microorganismos y formas acelulares',
      temas: [
        {
          id: 'b3t1',
          nombre: 'Bacterias y arqueas; tamaño de los microorganismos',
          oficial: 'Diferenciar bacterias y arqueas: posición filogenética, composición, estructura celular y ecología. Conceptos de especie y cepa. Tamaño de los microorganismos: relación entre tamaño aparente, tamaño real y aumentos al microscopio; conversión de unidades de longitud (m, mm, µm, nm y Å).',
          puntos: [
            'Bacterias y arqueas son procariotas: sin núcleo, con ribosomas 70S y ADN circular. Son dos dominios distintos; las arqueas están filogenéticamente más cerca de los eucariotas.',
            'Diferencias: la pared bacteriana tiene peptidoglucano y la de las arqueas no. Los lípidos de membrana de las arqueas tienen enlaces éter (los de bacterias y eucariotas, éster). Muchas arqueas son extremófilas (temperatura, salinidad o acidez extremas).',
            'Estructura bacteriana: pared, membrana plasmática, citoplasma con ribosomas, nucleoide y, a veces, plásmidos, cápsula, flagelos y pili (fimbrias).',
            'Especie: conjunto de microorganismos con características comunes. Cepa: población descendiente de una sola célula, con rasgos particulares dentro de la especie (por ejemplo, una cepa resistente).',
            'Tamaño real = tamaño aparente (de la imagen) ÷ aumentos. Las bacterias suelen medir de 1 a 10 µm; los virus, de 20 a 300 nm.'
          ],
          formulas: [
            ['Tamaño real = tamaño de la imagen ÷ aumentos', 'Pasa antes las dos medidas a la misma unidad.'],
            ['1 mm = 10³ µm = 10⁶ nm = 10⁷ Å', 'Equivalencias: 1 µm = 10⁻⁶ m, 1 nm = 10⁻⁹ m, 1 Å = 10⁻¹⁰ m.']
          ],
          ejemplo: {
            enunciado: 'En una micrografía a 4 000 aumentos, una bacteria mide 12 mm. ¿Cuál es su tamaño real en µm?',
            pasos: [
              'Tamaño real = 12 mm ÷ 4 000 = 0,003 mm.',
              'Se convierte a µm: 0,003 mm · 1 000 µm/mm = 3 µm.'
            ],
            resultado: '3 µm, un tamaño típico de bacteria.'
          },
          errores: [
            'Multiplicar por los aumentos en lugar de dividir.',
            'Equivocarse en las potencias de 10 al pasar de mm a nm (son 10⁶).'
          ],
          tarjetas: [
            ['¿Qué componente tiene la pared bacteriana y no la de las arqueas?', 'Peptidoglucano (mureína).'],
            ['Diferencia entre especie y cepa', 'La cepa es una población dentro de una especie que desciende de una sola célula y tiene rasgos propios.'],
            ['¿Cuántos nanómetros hay en 1 µm?', '1 000 nm.'],
            ['Fórmula del tamaño real al microscopio', 'Tamaño real = tamaño de la imagen ÷ aumentos.']
          ]
        },
        {
          id: 'b3t2',
          nombre: 'Metabolismo bacteriano y aplicaciones',
          oficial: 'Principales tipos de metabolismo bacteriano y su importancia ecológica en simbiosis y ciclos biogeoquímicos. Las bacterias en la microbiota, la vida cotidiana y sus aplicaciones. Uso industrial de microorganismos: agricultura, farmacia, alimentación y biorremediación.',
          puntos: [
            'Según la fuente de energía y de carbono: fotoautótrofos (luz + CO₂, como las cianobacterias), quimioautótrofos (compuestos inorgánicos + CO₂, como las nitrificantes), fotoheterótrofos y quimioheterótrofos (materia orgánica; la mayoría, incluidas las patógenas).',
            'Ciclo del nitrógeno: fijación de N₂ (Rhizobium en simbiosis con leguminosas, cianobacterias), amonificación (descomponedores), nitrificación (NH₄⁺ → NO₂⁻ → NO₃⁻) y desnitrificación (NO₃⁻ → N₂).',
            'Simbiosis: Rhizobium en los nódulos de las leguminosas y la microbiota intestinal (vitamina K, digestión, protección frente a patógenos).',
            'Alimentación: yogur y queso (bacterias lácticas), pan, vino y cerveza (levaduras), vinagre (Acetobacter).',
            'Farmacia: antibióticos (Penicillium, Streptomyces), insulina y vacunas recombinantes.',
            'Agricultura: biofertilizantes y bioinsecticidas (Bacillus thuringiensis). Biorremediación: microorganismos que degradan contaminantes, como el petróleo.'
          ],
          definiciones: [
            ['Microbiota', 'Conjunto de microorganismos que viven de forma habitual en un lugar del cuerpo, como el intestino o la piel.'],
            ['Biorremediación', 'Uso de seres vivos, sobre todo microorganismos, para eliminar contaminantes del medio.']
          ],
          errores: ['Pensar que todas las bacterias son patógenas: la mayoría son inofensivas o beneficiosas.'],
          tarjetas: [
            ['¿Qué bacteria fija nitrógeno en simbiosis con las leguminosas?', 'Rhizobium.'],
            ['¿Qué es la nitrificación?', 'La oxidación de amonio a nitrito y de nitrito a nitrato, hecha por bacterias quimioautótrofas.'],
            ['Un ejemplo de biorremediación', 'Bacterias que degradan los hidrocarburos de un vertido de petróleo.'],
            ['¿Qué tipo metabólico son las cianobacterias?', 'Fotoautótrofas (fotosíntesis oxigénica).']
          ]
        },
        {
          id: 'b3t3',
          nombre: 'Enfermedades infecciosas, esterilización y cultivo',
          oficial: 'Microorganismos como agentes de enfermedades infecciosas, zoonosis y epidemias. Principales técnicas de esterilización (físicas y químicas), aislamiento, identificación por tinción de Gram y cultivo de microorganismos.',
          puntos: [
            'Patógeno: microorganismo capaz de causar enfermedad. Zoonosis: enfermedad que se transmite de animales a personas (rabia, gripe aviar).',
            'Endemia (casos constantes en una zona), epidemia (aumento brusco de casos en una zona) y pandemia (epidemia a escala mundial).',
            'Esterilizar es eliminar todas las formas de vida, incluidas las esporas. Desinfectar es reducir los microorganismos patógenos.',
            'Métodos físicos: autoclave (vapor a 121 °C y presión, unos 15-20 min), calor seco (horno), filtración (líquidos que no toleran el calor) y radiaciones (UV en superficies, gamma en material médico). Métodos químicos: óxido de etileno, alcohol, lejía (estos dos desinfectan).',
            'Cultivo: medios líquidos o sólidos (con agar). Para aislar se siembra en estría y se obtienen colonias, cada una procedente de una célula. Siempre en condiciones de asepsia.',
            'Tinción de Gram: cristal violeta → lugol → alcohol → safranina. Las Gram+ (pared gruesa de peptidoglucano) quedan moradas; las Gram− (pared fina y membrana externa) se decoloran y quedan rosas.'
          ],
          definiciones: [
            ['Asepsia', 'Conjunto de técnicas para evitar la contaminación por microorganismos.'],
            ['Colonia', 'Grupo visible de microorganismos procedentes de una sola célula en un medio sólido.'],
            ['Zoonosis', 'Enfermedad infecciosa transmitida de animales a personas.']
          ],
          errores: [
            'Confundir desinfección con esterilización.',
            'Explicar mal la tinción de Gram: las Gram− pierden el cristal violeta con el alcohol porque su capa de peptidoglucano es fina.'
          ],
          tarjetas: [
            ['¿De qué color quedan las bacterias Gram+ y por qué?', 'Moradas: su gruesa capa de peptidoglucano retiene el cristal violeta tras el alcohol.'],
            ['¿Qué es una zoonosis?', 'Una enfermedad infecciosa que pasa de los animales a las personas.'],
            ['Condiciones típicas del autoclave', 'Vapor a 121 °C con sobrepresión durante unos 15-20 minutos.'],
            ['Diferencia entre epidemia y pandemia', 'La epidemia afecta a una zona; la pandemia se extiende por varios continentes.']
          ]
        },
        {
          id: 'b3t4',
          nombre: 'Transferencia genética horizontal y antibióticos',
          oficial: 'Mecanismos de transferencia genética horizontal en bacterias (conjugación, transformación y transducción) y su relación con la resistencia a antibióticos. Mecanismos generales de acción de los antibióticos y justificación de su uso.',
          noEvaluable: ['No se acepta el término «parasexualidad».'],
          puntos: [
            'Transferencia horizontal: paso de genes entre bacterias que no es de progenitor a descendiente.',
            'Conjugación: una bacteria donadora pasa ADN (a menudo un plásmido) a otra a través de un pilus sexual.',
            'Transformación: una bacteria capta ADN libre del medio, procedente de bacterias muertas.',
            'Transducción: un bacteriófago transporta por error ADN de una bacteria a otra.',
            'Resistencia: los genes de resistencia (a menudo en plásmidos) se extienden por transferencia horizontal. El uso excesivo o incorrecto de antibióticos selecciona a las bacterias resistentes.',
            'Mecanismos de acción: inhiben la síntesis de la pared (penicilinas), de las proteínas (actúan sobre el ribosoma 70S, como las tetraciclinas), de los ácidos nucleicos o dañan la membrana. Actúan sobre estructuras propias de bacterias, por eso afectan poco a nuestras células.',
            'Los antibióticos no sirven contra los virus.'
          ],
          errores: [
            'Decir que el antibiótico «provoca» la mutación de resistencia: la selecciona, porque ya existía.',
            'Usar el término «parasexualidad» (los criterios ya no lo aceptan).'
          ],
          tarjetas: [
            ['Tres mecanismos de transferencia genética horizontal', 'Conjugación, transformación y transducción.'],
            ['¿Qué es la transducción?', 'El paso de ADN bacteriano de una bacteria a otra transportado por un bacteriófago.'],
            ['¿Por qué los antibióticos no sirven contra la gripe?', 'Porque la gripe la causa un virus, y los antibióticos actúan sobre estructuras bacterianas.'],
            ['¿Cómo aparece una población de bacterias resistentes?', 'El antibiótico mata a las sensibles y las resistentes que ya existían sobreviven y se multiplican (selección).']
          ]
        },
        {
          id: 'b3t5',
          nombre: 'Virus, viroides y priones',
          oficial: 'Composición, morfología y estructura de los virus como formas acelulares; comparación con viroides y priones. Tipos de virus según su material hereditario (ADN o ARN). Ciclos víricos lítico y lisogénico. Retrotranscripción y su relación con la transcripción, la traducción y la replicación.',
          puntos: [
            'Virus: ácido nucleico (ADN o ARN, nunca ambos) rodeado de una cápside proteica formada por capsómeros; algunos tienen además una envoltura lipídica. Son parásitos obligados: solo se reproducen dentro de una célula.',
            'Ciclo lítico: fijación, penetración, síntesis de componentes víricos, ensamblaje y liberación con lisis (muerte) de la célula.',
            'Ciclo lisogénico: el ADN vírico se integra en el cromosoma (profago) y se replica con la célula sin destruirla. Un estímulo puede activar después el ciclo lítico.',
            'Retrovirus (como el VIH): tienen ARN y la enzima transcriptasa inversa, que fabrica ADN a partir de ARN (retrotranscripción). Ese ADN se integra en el genoma de la célula.',
            'Viroides: solo una pequeña molécula de ARN circular, sin cápside. Infectan plantas.',
            'Priones: proteínas mal plegadas que hacen que las proteínas normales se plieguen mal. No tienen ácido nucleico. Causan encefalopatías como la enfermedad de Creutzfeldt-Jakob.'
          ],
          definiciones: [
            ['Cápside', 'Cubierta proteica que protege el ácido nucleico del virus.'],
            ['Profago', 'ADN de un fago integrado en el cromosoma bacteriano.'],
            ['Transcriptasa inversa', 'Enzima que sintetiza ADN usando ARN como molde.']
          ],
          errores: [
            'Decir que los virus son células o que tienen metabolismo propio.',
            'Pensar que los priones contienen ácido nucleico.'
          ],
          tarjetas: [
            ['¿Qué tiene un viroide?', 'Solo una molécula de ARN circular, sin cápside.'],
            ['¿Qué enzima caracteriza a los retrovirus?', 'La transcriptasa inversa (ARN → ADN).'],
            ['Diferencia entre ciclo lítico y lisogénico', 'El lítico destruye la célula al liberar los virus; en el lisogénico el ADN vírico se integra y la célula sobrevive.'],
            ['¿De qué están formados los priones?', 'Solo de proteína mal plegada.']
          ]
        }
      ]
    },

    /* ───────────────────────── INMUNOLOGÍA ───────────────────────── */
    {
      id: 'b4',
      nombre: 'Inmunología',
      temas: [
        {
          id: 'b4t1',
          nombre: 'Sistema inmunitario e inmunidad innata',
          oficial: 'Concepto de inmunidad. Órganos (timo, bazo), tejidos (médula ósea, tejido linfoide) y células del sistema inmunitario (neutrófilos, eosinófilos, basófilos, monocitos, macrófagos, células dendríticas, linfocitos T, B y NK). Barreras externas: anatómicas o físicas (piel y mucosas), fisiológicas o químicas (secreciones) y biológicas (microbiota). Defensas celulares: respuesta fagocítica, inflamatoria y citolítica. Sistema del complemento y sus vías clásica, alternativa y de las lectinas.',
          puntos: [
            'Inmunidad: capacidad del organismo de reconocer y eliminar lo extraño (patógenos, células tumorales) y tolerar lo propio.',
            'Órganos primarios (donde maduran los linfocitos): médula ósea (linfocitos B) y timo (linfocitos T). Secundarios (donde se activan): bazo, ganglios linfáticos y tejido linfoide asociado a mucosas.',
            'Barreras externas: físicas (piel, mucosas, cilios), químicas (lisozima de las lágrimas, acidez del estómago, sudor) y biológicas (la microbiota compite con los patógenos).',
            'Respuesta fagocítica: neutrófilos, monocitos y macrófagos engloban y digieren los patógenos.',
            'Respuesta inflamatoria: basófilos y mastocitos liberan histamina, que produce vasodilatación y aumenta la permeabilidad; llegan más fagocitos. Signos: rojez, calor, hinchazón y dolor.',
            'Respuesta citolítica: las células NK destruyen células infectadas o tumorales; los eosinófilos atacan parásitos grandes.',
            'Complemento: proteínas plasmáticas que se activan en cascada por tres vías: clásica (la inician los anticuerpos), alternativa (directamente por la superficie del microbio) y de las lectinas (lectinas que reconocen azúcares microbianos). Efectos: opsonización, inflamación y lisis por el complejo de ataque a la membrana.'
          ],
          definiciones: [
            ['Inmunidad innata', 'Defensa inespecífica, presente desde el nacimiento, rápida y sin memoria.'],
            ['Opsonización', 'Recubrimiento del patógeno con moléculas (complemento o anticuerpos) que facilitan su fagocitosis.'],
            ['Histamina', 'Sustancia liberada por mastocitos y basófilos que causa vasodilatación y aumento de la permeabilidad capilar.']
          ],
          errores: ['Confundir órganos primarios y secundarios: el bazo es secundario y el timo, primario.'],
          tarjetas: [
            ['¿Dónde maduran los linfocitos T?', 'En el timo.'],
            ['Tres tipos de barreras externas', 'Físicas (piel, mucosas), químicas (secreciones como la lisozima o el ácido gástrico) y biológicas (microbiota).'],
            ['¿Qué células liberan histamina en la inflamación?', 'Los mastocitos y los basófilos.'],
            ['Tres vías del complemento', 'Clásica, alternativa y de las lectinas.'],
            ['¿Qué hacen las células NK?', 'Destruyen células infectadas por virus y células tumorales (respuesta citolítica).']
          ]
        },
        {
          id: 'b4t2',
          nombre: 'Inmunidad específica: humoral y celular',
          oficial: 'Inmunidad específica (adaptativa o adquirida). Concepto de antígeno: propio y extraño. Células y moléculas: células presentadoras de antígenos (macrófagos, dendríticas y linfocitos B), linfocitos T citotóxicos, T colaboradores, linfocitos B, células plasmáticas, células de memoria, anticuerpos y moléculas de histocompatibilidad de clase I y II. Respuesta primaria y secundaria. Comparación entre inmunidad humoral y celular.',
          puntos: [
            'Antígeno: molécula que el sistema inmunitario reconoce como extraña y que provoca una respuesta específica.',
            'Las células presentadoras de antígenos (dendríticas, macrófagos, linfocitos B) muestran fragmentos del antígeno en moléculas MHC de clase II a los linfocitos T colaboradores (CD4).',
            'Los T colaboradores activados liberan citocinas que activan a los linfocitos B y a los T citotóxicos. Son el «director de orquesta».',
            'Respuesta humoral: los linfocitos B activados se convierten en células plasmáticas, que secretan anticuerpos, y en células B de memoria. Actúa sobre patógenos y toxinas extracelulares.',
            'Respuesta celular: los T citotóxicos (CD8) reconocen el antígeno presentado en MHC de clase I por células infectadas o tumorales y las destruyen.',
            'Anticuerpo (inmunoglobulina): proteína en forma de Y con dos cadenas pesadas y dos ligeras; las regiones variables reconocen el antígeno. Acciones: neutralización, aglutinación, precipitación, opsonización y activación del complemento.',
            'Respuesta primaria (primer contacto): lenta y menos intensa. Secundaria (contactos posteriores): más rápida, intensa y duradera gracias a las células de memoria. Es la base de las vacunas.'
          ],
          definiciones: [
            ['MHC de clase I', 'Moléculas presentes en casi todas las células nucleadas; presentan antígenos a los T citotóxicos.'],
            ['MHC de clase II', 'Moléculas de las células presentadoras; presentan antígenos a los T colaboradores.'],
            ['Célula plasmática', 'Linfocito B diferenciado que produce anticuerpos en gran cantidad.']
          ],
          errores: [
            'Decir que los linfocitos B destruyen células infectadas: eso lo hacen los T citotóxicos.',
            'Mezclar MHC I (todas las células, para T citotóxicos) con MHC II (presentadoras, para T colaboradores).'
          ],
          tarjetas: [
            ['¿Qué células producen los anticuerpos?', 'Las células plasmáticas (linfocitos B diferenciados).'],
            ['¿A qué células presentan antígenos las moléculas MHC II?', 'A los linfocitos T colaboradores (CD4).'],
            ['¿Por qué la respuesta secundaria es más rápida?', 'Porque existen células de memoria específicas del antígeno.'],
            ['¿Qué tipo de respuesta elimina células infectadas por virus?', 'La celular, mediante los linfocitos T citotóxicos.'],
            ['Estructura de un anticuerpo', 'Proteína en forma de Y con 2 cadenas pesadas y 2 ligeras; tiene regiones variables que se unen al antígeno.']
          ]
        },
        {
          id: 'b4t3',
          nombre: 'Tipos de inmunidad, vacunas y enfermedades infecciosas',
          oficial: 'Comparar inmunidad activa y pasiva, natural y artificial. Inmunización madre-feto. Inmunoterapia y sueroterapia. Acción de las vacunas, efectos en la población e inmunidad de grupo. Fases de las enfermedades infecciosas: incubación, manifestación clínica y convalecencia.',
          puntos: [
            'Activa natural: tras pasar una infección. Activa artificial: con una vacuna. En ambos casos el propio cuerpo fabrica anticuerpos y células de memoria, y la protección es duradera.',
            'Pasiva natural: anticuerpos de la madre al feto por la placenta (IgG) o al bebé por la leche materna (IgA). Pasiva artificial: sueroterapia (inyección de anticuerpos ya formados). Es inmediata pero temporal, porque no genera memoria.',
            'Vacuna: contiene antígenos (patógeno muerto o atenuado, fragmentos, toxoides o ARNm que hace fabricar un antígeno) para provocar una respuesta primaria sin enfermedad y generar memoria.',
            'Inmunidad de grupo: si un porcentaje alto de la población está vacunado, el patógeno circula poco y se protege también a quienes no pueden vacunarse.',
            'Sueroterapia: aporta anticuerpos (contra venenos o el tétanos en una herida). Es curativa e inmediata. La vacuna es preventiva y tarda en hacer efecto.',
            'Fases de una enfermedad infecciosa: incubación (desde el contagio hasta los síntomas; el patógeno se multiplica), manifestación clínica (síntomas) y convalecencia (recuperación progresiva).'
          ],
          errores: [
            'Decir que la sueroterapia genera memoria: los anticuerpos se degradan y no hay memoria.',
            'Confundir la incubación con un periodo sin infección: el patógeno ya se está multiplicando.'
          ],
          tarjetas: [
            ['¿Qué tipo de inmunidad da una vacuna?', 'Activa artificial.'],
            ['¿Qué tipo de inmunidad recibe un bebé con la lactancia?', 'Pasiva natural (anticuerpos IgA de la leche).'],
            ['Ventaja e inconveniente de la sueroterapia', 'Ventaja: protección inmediata. Inconveniente: es temporal y no genera memoria.'],
            ['¿Qué es la inmunidad de grupo?', 'La protección indirecta de las personas no inmunes cuando gran parte de la población es inmune.'],
            ['Tres fases de una enfermedad infecciosa', 'Incubación, manifestación clínica y convalecencia.']
          ]
        },
        {
          id: 'b4t4',
          nombre: 'Patologías del sistema inmunitario',
          oficial: 'Principales trastornos: cáncer (defensa contra células tumorales: linfocitos NK, linfocitos T y anticuerpos), rechazo de trasplantes y de transfusiones, hipersensibilidad y alergias, enfermedades autoinmunes, leucemias e inmunodeficiencias innatas y adquiridas (sida). Mecanismos básicos que los causan.',
          puntos: [
            'Alergia (hipersensibilidad inmediata): respuesta exagerada a un antígeno inofensivo (alérgeno). En el primer contacto se producen IgE, que se fijan a los mastocitos. En el siguiente, el alérgeno une las IgE y los mastocitos liberan histamina. Puede llegar a un choque anafiláctico.',
            'Autoinmunidad: el sistema inmunitario ataca moléculas propias por fallo de la tolerancia. Ejemplos: diabetes tipo 1, artritis reumatoide, lupus, esclerosis múltiple.',
            'Inmunodeficiencias: congénitas (inmunodeficiencia combinada grave) o adquiridas, como el sida. En el sida, el VIH infecta y destruye los linfocitos T CD4, la inmunidad se hunde y aparecen infecciones oportunistas.',
            'Rechazo de trasplantes: el receptor reconoce como extrañas las moléculas MHC (HLA) del donante; los T citotóxicos atacan el órgano. Se reduce con compatibilidad HLA e inmunosupresores.',
            'Transfusiones (sistema ABO): una persona del grupo A tiene anticuerpos anti-B, una del B anti-A, una del O ambos y una del AB ninguno. Si los anticuerpos del receptor reconocen los glóbulos rojos donados, estos se aglutinan. O es donante universal de glóbulos rojos y AB, receptor universal. También cuenta el factor Rh.',
            'Cáncer: las células NK, los T citotóxicos y los anticuerpos pueden eliminar células tumorales; los tumores aparecen cuando escapan a esta vigilancia. Leucemia: cáncer de las células formadoras de leucocitos.'
          ],
          errores: [
            'Decir que el VIH destruye los linfocitos B: ataca a los T colaboradores (CD4).',
            'Razonar las transfusiones al revés: importan los anticuerpos del receptor frente a los antígenos del donante.'
          ],
          tarjetas: [
            ['¿Qué anticuerpo y qué célula intervienen en la alergia?', 'La IgE y los mastocitos (liberan histamina).'],
            ['¿Qué células destruye el VIH?', 'Los linfocitos T colaboradores (CD4).'],
            ['¿Por qué el grupo O es donante universal de glóbulos rojos?', 'Porque sus glóbulos rojos no tienen antígenos A ni B, así que no los aglutinan los anticuerpos del receptor.'],
            ['Una enfermedad autoinmune', 'Diabetes tipo 1, artritis reumatoide, lupus o esclerosis múltiple.'],
            ['¿Por qué se rechaza un trasplante?', 'Porque el receptor reconoce como extrañas las moléculas HLA (MHC) del donante.']
          ]
        }
      ]
    },

    /* ───────────────────────── BIOTECNOLOGÍA ───────────────────────── */
    {
      id: 'b5',
      nombre: 'Biotecnología',
      temas: [
        {
          id: 'b5t1',
          nombre: 'Técnicas de ingeniería genética',
          oficial: 'Metodologías de ingeniería genética: PCR, clonación molecular y CRISPR-Cas9. ADN recombinante y enzimas de restricción. Diferencia entre organismos modificados genéticamente y transgénicos. Fases para obtener un transgénico (transferencia del gen exógeno, selección y reproducción de los transgénicos). Mecanismos de introducción de genes: microinyección, Agrobacterium y vectores (plásmidos, virus).',
          puntos: [
            'Enzimas de restricción: cortan el ADN en secuencias concretas, normalmente palindrómicas, y muchas dejan extremos cohesivos.',
            'ADN recombinante: ADN que combina fragmentos de orígenes distintos. Se corta el gen y el vector con la misma enzima de restricción y se unen con la ADN ligasa.',
            'Clonación molecular: se introduce el vector recombinante (por ejemplo, un plásmido) en una bacteria, que al multiplicarse genera muchas copias del gen. Se seleccionan las bacterias que lo han incorporado, por ejemplo con un gen de resistencia a un antibiótico.',
            'PCR: amplifica in vitro un fragmento de ADN mediante ciclos de desnaturalización (≈ 95 °C), unión de los cebadores (≈ 50-65 °C) y extensión (≈ 72 °C) con una ADN polimerasa resistente al calor (Taq). El número de copias se duplica en cada ciclo (2ⁿ).',
            'CRISPR-Cas9: un ARN guía lleva a la nucleasa Cas9 hasta una secuencia complementaria del ADN, donde corta las dos cadenas. La reparación celular puede inactivar el gen o, si se aporta un molde, corregirlo.',
            'Transgénico: lleva un gen de otra especie. Organismo modificado genéticamente (OMG): concepto más amplio, cuyo genoma se ha alterado de cualquier forma artificial. Todo transgénico es un OMG, pero no al revés.',
            'Introducción de genes: microinyección en el núcleo de un cigoto (animales), Agrobacterium tumefaciens con su plásmido Ti (plantas) y vectores víricos o plásmidos.'
          ],
          formulas: [['N.º de copias = copias iniciales · 2ⁿ', 'n = número de ciclos de PCR (en condiciones ideales).']],
          errores: [
            'Decir que la Taq polimerasa se usa porque es más rápida: se usa porque resiste las altas temperaturas de la desnaturalización.',
            'Confundir transgénico y OMG.'
          ],
          tarjetas: [
            ['¿Por qué se usa la Taq polimerasa en la PCR?', 'Porque es termoestable y no se desnaturaliza a 95 °C.'],
            ['Tres etapas de un ciclo de PCR', 'Desnaturalización, unión de cebadores (hibridación) y extensión.'],
            ['¿Qué dirige la Cas9 hasta su diana?', 'Un ARN guía complementario a la secuencia diana.'],
            ['¿Cómo se introducen genes en plantas?', 'Con Agrobacterium tumefaciens y su plásmido Ti, entre otros métodos.'],
            ['¿Cuántas copias se obtienen tras 10 ciclos de PCR a partir de una molécula?', '2¹⁰ = 1 024 copias.']
          ]
        },
        {
          id: 'b5t2',
          nombre: 'Aplicaciones de la biotecnología',
          oficial: 'Importancia de la biotecnología y sus aplicaciones (salud, agricultura, medio ambiente, nuevos materiales, industria alimentaria), con el papel de los microorganismos. Organismos transgénicos en agricultura, ganadería, producción de fármacos, investigación biomédica (modelos de enfermedades, estudio de la función de genes). Terapia génica.',
          puntos: [
            'Salud: insulina humana y hormona del crecimiento producidas por bacterias transgénicas, vacunas recombinantes y anticuerpos monoclonales.',
            'Agricultura: plantas resistentes a plagas (maíz Bt, con un gen de Bacillus thuringiensis), a herbicidas o más nutritivas (arroz dorado, con provitamina A).',
            'Ganadería e investigación: animales transgénicos que producen fármacos en la leche y ratones modelo para estudiar enfermedades o la función de un gen (por ejemplo, inactivándolo).',
            'Medio ambiente: biorremediación con microorganismos.',
            'Terapia génica: introducir un gen funcional en las células de un paciente para corregir una enfermedad genética. Puede ser ex vivo (se modifican células extraídas y se reintroducen) o in vivo (con un vector directamente en el cuerpo).',
            'Argumentar: valora ventajas (producción barata y sostenible de fármacos, más rendimiento) y riesgos o cuestiones éticas (biodiversidad, seguridad, acceso).'
          ],
          errores: ['Dar solo opiniones sin argumentos científicos en las preguntas de valoración.'],
          tarjetas: [
            ['¿Cómo se produce hoy la insulina humana?', 'Con microorganismos transgénicos (bacterias o levaduras) que llevan el gen humano.'],
            ['¿Qué es la terapia génica?', 'Introducir genes funcionales en las células de un paciente para tratar una enfermedad.'],
            ['Diferencia entre terapia génica ex vivo e in vivo', 'Ex vivo: se modifican células fuera del cuerpo y se reintroducen. In vivo: el vector se administra directamente al paciente.'],
            ['¿Qué aporta el maíz Bt?', 'Resistencia a insectos plaga gracias a una toxina de Bacillus thuringiensis.']
          ]
        }
      ]
    },

    /* ───────────────────────── EVOLUCIÓN ───────────────────────── */
    {
      id: 'b6',
      nombre: 'Evolución',
      temas: [
        {
          id: 'b6t1',
          nombre: 'Pruebas de la evolución y teorías evolutivas',
          oficial: 'Justificar la evolución como hecho: anagénesis y cladogénesis. Pruebas embriológicas, moleculares y genéticas, órganos homólogos, vestigiales y análogos, pruebas paleontológicas y biogeográficas (convergencia evolutiva, radiación adaptativa). Lamarckismo (aciertos y errores), darwinismo y teoría sintética. Contrastar con pruebas las explicaciones que niegan la evolución (creacionismo, diseño inteligente).',
          puntos: [
            'Anagénesis: una especie cambia a lo largo del tiempo (evolución filética). Cladogénesis: una especie se divide en dos o más (especiación).',
            'Órganos homólogos: mismo origen embrionario y estructura, distinta función (brazo humano y ala de murciélago). Indican antepasado común y evolución divergente.',
            'Órganos análogos: misma función, distinto origen (ala de insecto y de ave). Son fruto de la convergencia evolutiva.',
            'Órganos vestigiales: restos sin función aparente (apéndice, muelas del juicio, coxis).',
            'Pruebas paleontológicas (fósiles y formas de transición), embriológicas (embriones de vertebrados parecidos), moleculares (secuencias de ADN y proteínas más parecidas cuanto más emparentadas) y biogeográficas (radiación adaptativa de los pinzones de Galápagos).',
            'Lamarck: uso y desuso de órganos y herencia de los caracteres adquiridos (error). Acertó al proponer que las especies cambian y se adaptan al medio.',
            'Darwin y Wallace: hay variabilidad heredable; nacen más individuos de los que sobreviven; los mejor adaptados dejan más descendencia (selección natural). Darwin no conocía el origen de la variabilidad.',
            'Teoría sintética (neodarwinismo): une la selección natural con la genética. La variabilidad procede de mutaciones y recombinación, y la evolución es un cambio en las frecuencias alélicas de las poblaciones.',
            'El creacionismo y el diseño inteligente no son teorías científicas porque no se pueden contrastar; las pruebas citadas apoyan la evolución.'
          ],
          errores: [
            'Explicar con Lamarck en una pregunta de Darwin (por ejemplo, «la jirafa estiró el cuello y lo heredaron sus hijos»).',
            'Decir que los individuos evolucionan: evolucionan las poblaciones.'
          ],
          tarjetas: [
            ['Diferencia entre órganos homólogos y análogos', 'Homólogos: mismo origen y distinta función (divergencia). Análogos: misma función y distinto origen (convergencia).'],
            ['Error principal de Lamarck', 'La herencia de los caracteres adquiridos.'],
            ['¿Qué añade la teoría sintética al darwinismo?', 'La genética: mutación y recombinación como fuentes de variabilidad y la evolución como cambio de frecuencias alélicas.'],
            ['Ejemplo de radiación adaptativa', 'Los pinzones de Darwin en las Galápagos.'],
            ['¿Qué es la cladogénesis?', 'La división de un linaje en varias especies (especiación).']
          ]
        },
        {
          id: 'b6t2',
          nombre: 'Mecanismos evolutivos y variabilidad genética',
          oficial: 'Equilibrio de Hardy-Weinberg y cálculo de frecuencias. Factores que alteran las frecuencias: flujo génico, mutaciones, selección natural y deriva genética; selección sexual. Fuentes de variabilidad: mutaciones y recombinación. Tipos de mutaciones (puntuales, estructurales, cromosómicas y cariotípicas), causas (errores de replicación y de meiosis, virus y transposones, mutágenos externos), mutación somática y germinal, carácter aleatorio e importancia evolutiva. Evolución observada directamente (pinzones de Galápagos, resistencia a antibióticos).',
          puntos: [
            'Hardy-Weinberg: las frecuencias se mantienen si la población es grande, hay apareamiento al azar y no hay mutación, migración ni selección. Si cambian, hay evolución.',
            'Factores de cambio: mutación (nuevos alelos), flujo génico (migraciones), selección natural (favorece a los mejor adaptados), deriva genética (cambios al azar, importantes en poblaciones pequeñas: efecto fundador y cuello de botella) y selección sexual.',
            'Mutaciones génicas o puntuales: sustitución, inserción o deleción de nucleótidos. Las inserciones y deleciones pueden desplazar el marco de lectura.',
            'Mutaciones cromosómicas estructurales: deleción, duplicación, inversión y translocación de fragmentos.',
            'Mutaciones genómicas o cariotípicas: cambio en el número de cromosomas. Aneuploidías (trisomía 21) y poliploidías (frecuentes en plantas).',
            'Causas: errores espontáneos de replicación o de meiosis (no disyunción), transposones y virus, y mutágenos externos (radiación UV, rayos X, sustancias químicas).',
            'Somática: afecta a células del cuerpo y no se hereda (puede causar cáncer). Germinal: afecta a los gametos y pasa a la descendencia; es la que importa en la evolución.',
            'Las mutaciones son aleatorias: no aparecen porque el organismo las necesite. El ambiente selecciona después las que resultan ventajosas.'
          ],
          formulas: [
            ['p + q = 1', 'Frecuencias alélicas.'],
            ['p² + 2pq + q² = 1', 'Frecuencias genotípicas en equilibrio.']
          ],
          errores: [
            'Decir que las bacterias mutan «para» resistir al antibiótico.',
            'Confundir la deriva genética (azar) con la selección natural (adaptación).'
          ],
          tarjetas: [
            ['¿Qué es la deriva genética?', 'Un cambio aleatorio de las frecuencias alélicas, con más efecto en poblaciones pequeñas.'],
            ['¿Se hereda una mutación somática?', 'No, solo las germinales pasan a la descendencia.'],
            ['Ejemplo de mutación cariotípica', 'La trisomía 21 (síndrome de Down).'],
            ['Condiciones del equilibrio de Hardy-Weinberg', 'Población grande, apareamiento aleatorio, sin mutación, migración ni selección.'],
            ['¿Qué es el efecto fundador?', 'La deriva que ocurre cuando unos pocos individuos fundan una población nueva con frecuencias alélicas distintas a la original.']
          ]
        },
        {
          id: 'b6t3',
          nombre: 'Especiación y perspectivas actuales (evo-devo)',
          oficial: 'Concepto biológico de especie y mecanismos de aislamiento reproductivo; especiación alopátrica y simpátrica. Gradualismo frente a equilibrio puntuado; endosimbiosis. Evo-devo: analogía morfológica y homología genética, genes ortólogos y parálogos (duplicación génica), conservación de la «caja de herramientas genética», papel de la expresión génica en la diferenciación y mecanismos de generación de diversidad y complejidad (duplicación génica, splicing alternativo, regulación de la expresión).',
          puntos: [
            'Especie biológica: poblaciones que pueden cruzarse entre sí y tener descendencia fértil, y están aisladas reproductivamente de otras.',
            'Aislamiento precigótico (impide la fecundación: distinto hábitat, época de reproducción, cortejo o incompatibilidad de órganos) y poscigótico (híbridos inviables o estériles, como la mula).',
            'Especiación alopátrica: una barrera geográfica separa poblaciones que divergen. Simpátrica: sin separación geográfica, por ejemplo por poliploidía en plantas.',
            'Gradualismo: cambios pequeños y continuos. Equilibrio puntuado: largos periodos estables interrumpidos por cambios rápidos.',
            'Teoría endosimbiótica (Lynn Margulis): mitocondrias y cloroplastos proceden de procariotas englobados por otra célula. Pruebas: tienen ADN circular propio, ribosomas 70S, doble membrana y se dividen por fisión.',
            'Evo-devo: genes reguladores del desarrollo, como los Hox, están muy conservados entre animales muy distintos (la «caja de herramientas genética»). La diversidad surge sobre todo de cambios en cuándo y dónde se expresan.',
            'Genes ortólogos: en especies distintas, proceden de un gen ancestral común separado por especiación. Parálogos: en la misma especie, proceden de una duplicación génica.',
            'Fuentes de complejidad: duplicación génica (una copia puede adquirir una función nueva), splicing alternativo (un gen da varias proteínas) y regulación de la expresión.'
          ],
          errores: ['Confundir ortólogos (especiación) con parálogos (duplicación).'],
          tarjetas: [
            ['Diferencia entre especiación alopátrica y simpátrica', 'Alopátrica: con barrera geográfica. Simpátrica: sin separación geográfica (por ejemplo, poliploidía).'],
            ['Dos pruebas de la teoría endosimbiótica', 'Mitocondrias y cloroplastos tienen ADN circular propio y ribosomas 70S (además de doble membrana).'],
            ['¿Qué son los genes parálogos?', 'Genes de una misma especie originados por duplicación de un gen ancestral.'],
            ['¿Qué es el splicing alternativo?', 'Un mismo gen se procesa combinando exones de formas distintas y da varias proteínas.'],
            ['¿Por qué la mula no es una especie?', 'Porque es estéril: es un híbrido con aislamiento poscigótico.']
          ]
        }
      ]
    },

    /* ───────────────────────── DISEÑO EXPERIMENTAL ───────────────────────── */
    {
      id: 'b7',
      nombre: 'Diseño experimental',
      temas: [
        {
          id: 'b7t1',
          nombre: 'Diseño experimental',
          oficial: 'Diseñar proyectos de investigación en biología y analizar críticamente resultados. Hipótesis y variables: formular el problema y la hipótesis, distinguir variable independiente y dependiente, identificar y controlar variables. Controles y réplicas. Diseños experimentales básicos, análisis de resultados y conclusiones.',
          puntos: [
            'Problema: pregunta concreta que se quiere responder. Hipótesis: respuesta provisional que se puede comprobar, a menudo con el formato «si… entonces…».',
            'Variable independiente: la que el investigador cambia a propósito. Variable dependiente: la que se mide como resultado. Variables controladas: las que se mantienen iguales en todos los grupos.',
            'Control negativo: grupo en el que no se aplica el factor estudiado (o se da un placebo); sirve de referencia. Control positivo: grupo en el que se sabe que debe haber efecto; comprueba que el método funciona.',
            'Réplicas: repetir el experimento o usar varios individuos por grupo para reducir el efecto del azar y dar fiabilidad.',
            'Conclusión: di si los resultados apoyan o refutan la hipótesis. No generalices más allá de lo que muestran los datos.'
          ],
          ejemplo: {
            enunciado: 'Se quiere saber si la temperatura afecta a la actividad de la amilasa. Identifica las variables y propón un control.',
            pasos: [
              'Variable independiente: la temperatura (por ejemplo, 10, 20, 37, 60 y 80 °C).',
              'Variable dependiente: la actividad de la enzima, medida como el tiempo que tarda en desaparecer el almidón (prueba del lugol).',
              'Variables controladas: concentración de enzima y de almidón, pH, volumen y tiempo.',
              'Control: un tubo con almidón y sin enzima a cada temperatura, para comprobar que el almidón no desaparece solo. Se hacen 3 réplicas de cada condición.'
            ],
            resultado: 'Un diseño así permite atribuir los cambios de actividad solo a la temperatura.'
          },
          errores: [
            'Confundir variable independiente y dependiente.',
            'Olvidar el grupo control o las réplicas.',
            'Formular una hipótesis que no se puede comprobar.'
          ],
          tarjetas: [
            ['¿Qué es la variable independiente?', 'La que el investigador modifica deliberadamente.'],
            ['¿Para qué sirven las réplicas?', 'Para reducir el efecto del azar y hacer los resultados más fiables.'],
            ['¿Qué es un control negativo?', 'Un grupo sin el factor estudiado, que sirve de referencia.'],
            ['¿Qué son las variables controladas?', 'Las que se mantienen constantes para que no influyan en el resultado.']
          ]
        }
      ]
    }
  ]
});
