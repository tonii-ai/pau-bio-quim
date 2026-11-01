/*
 * Ejercicios con apartados. TODOS son originales: no proceden de exámenes oficiales.
 * Cada ejercicio tiene un contexto (datos, experimento o situación) y varios apartados encadenados,
 * casi todos de dificultad media o alta. Cada apartado se guarda como una pregunta normal
 * (id = id del ejercicio + letra) con su tema, para que cuente en las estadísticas del tema.
 */
window.PAU = window.PAU || {};
PAU.preguntas = PAU.preguntas || [];
PAU.ejercicios = [
  /* ───── Biología ───── */
  { id: 'eb1', asig: 'bio', titulo: 'La catalasa y el pH',
    contexto: 'Para estudiar la catalasa (2 H₂O₂ → 2 H₂O + O₂), se pone el mismo volumen de extracto de patata en cinco tubos con tampones de distinto pH, se añaden 5 mL de H₂O₂ al 3 % a 25 °C y se mide el O₂ desprendido en 2 minutos. Un sexto tubo lleva extracto hervido a pH 7.\nResultados (mL de O₂ en 2 min): pH 3 → 2; pH 5 → 8; pH 7 → 15; pH 9 → 9; pH 11 → 1; extracto hervido → 0.',
    apartados: [
      { tema: 'b7t1', tipo: 'test', dificultad: 1, enunciado: '¿Cuál es la variable independiente del experimento?',
        opciones: ['El volumen de O₂', 'El pH', 'La temperatura', 'El volumen de H₂O₂'], correcta: 1,
        modelo: 'El pH: es lo que el investigador cambia. El volumen de O₂ es la variable dependiente; la temperatura, el volumen de extracto y el de H₂O₂ son variables controladas.', pasos: [] },
      { tema: 'b1t2', tipo: 'numerica', dificultad: 2, enunciado: 'Calcula la velocidad media de la reacción a pH 7, en mL de O₂ por minuto.',
        valor: 7.5, tolerancia: 0.05, unidad: 'mL/min', modelo: '7,5 mL/min.', pasos: ['v = 15 mL / 2 min = 7,5 mL/min.'] },
      { tema: 'b1t2', tipo: 'test', dificultad: 2, enunciado: '¿Por qué a pH 11 casi no se desprende O₂?',
        opciones: ['Porque se acaba el H₂O₂', 'Porque un pH tan alejado del óptimo altera la estructura de la enzima y su centro activo', 'Porque el O₂ se disuelve en el tampón', 'Porque la enzima se vuelve más específica'], correcta: 1,
        modelo: 'El pH extremo cambia la carga de los aminoácidos, rompe interacciones que mantienen la estructura terciaria y deforma el centro activo: la enzima pierde actividad (se desnaturaliza).', pasos: [] },
      { tema: 'b7t1', tipo: 'test', dificultad: 2, enunciado: '¿Qué función tiene el tubo con extracto hervido?',
        opciones: ['Es una réplica', 'Es un control negativo: demuestra que el O₂ se debe a la enzima activa y no a otra causa', 'Es un control positivo', 'Sirve para medir la temperatura'], correcta: 1,
        modelo: 'Es un control negativo: al hervir el extracto la catalasa se desnaturaliza; como no se desprende O₂, el O₂ de los otros tubos se debe a la actividad de la enzima.', pasos: [] },
      { tema: 'b7t1', tipo: 'desarrollo', dificultad: 3, enunciado: 'Propón dos mejoras para que las conclusiones del experimento sean más fiables.',
        criterios: ['Hacer réplicas (al menos 3 por pH) y trabajar con la media.', 'Probar más valores de pH cerca del óptimo (6, 7, 8) para localizarlo mejor.', 'Controlar y mantener constantes la temperatura, la cantidad de extracto y el tiempo.', 'Medir el O₂ con un método preciso (probeta invertida o jeringa) y no a ojo.'],
        modelo: 'Haría al menos tres réplicas de cada pH y calcularía la media, para reducir el efecto del azar. Además, añadiría valores de pH entre 6 y 8 para localizar mejor el óptimo, y mediría el O₂ con un método preciso, como una jeringa o una probeta invertida, manteniendo constantes la temperatura y la cantidad de extracto.', pasos: [] }
    ] },

  { id: 'eb2', asig: 'bio', titulo: 'Una enfermedad recesiva en una familia',
    contexto: 'La fibrosis quística es una enfermedad autosómica recesiva (alelo a). En una población en equilibrio de Hardy-Weinberg, 1 de cada 2 500 recién nacidos la padece.\nUna pareja sana tiene un hijo con fibrosis quística y una hija sana.',
    apartados: [
      { tema: 'b2t5', tipo: 'test', dificultad: 1, enunciado: '¿Cuál es el genotipo de los padres?',
        opciones: ['AA y AA', 'Aa y Aa', 'AA y Aa', 'aa y Aa'], correcta: 1,
        modelo: 'Los dos son Aa: están sanos, pero cada uno ha transmitido un alelo a al hijo afectado (aa).', pasos: [] },
      { tema: 'b2t5', tipo: 'numerica', dificultad: 3, enunciado: '¿Qué probabilidad hay de que la hija sana sea portadora? Responde en tanto por uno (con 3 decimales) o como fracción.',
        valor: 0.667, tolerancia: 0.005, unidad: '',
        modelo: '2/3 ≈ 0,667.', pasos: ['Aa × Aa → 1 AA : 2 Aa : 1 aa.', 'Sabemos que la hija está sana: se descarta aa y quedan 3 casos (1 AA y 2 Aa).', 'P(Aa | sana) = 2/3.'] },
      { tema: 'b6t2', tipo: 'numerica', dificultad: 2, enunciado: '¿Qué porcentaje de la población es portadora (Aa)? Redondea a dos decimales.',
        valor: 3.92, tolerancia: 0.02, unidad: '%',
        modelo: '≈ 3,92 %.', pasos: ['q² = 1/2 500 = 0,0004, así que q = 0,02.', 'p = 0,98.', '2pq = 2 · 0,98 · 0,02 = 0,0392 = 3,92 %.'] },
      { tema: 'b2t5', tipo: 'numerica', dificultad: 3, enunciado: 'La hija sana tiene descendencia con un hombre sano de la población, sin antecedentes. ¿Qué probabilidad hay de que su primer hijo padezca la enfermedad? Responde en % con dos decimales.',
        valor: 0.65, tolerancia: 0.02, unidad: '%',
        modelo: '≈ 0,65 %.', pasos: ['P(ella portadora) = 2/3.', 'P(él portador) = 2pq = 0,0392.', 'Si los dos son portadores, P(aa) = 1/4.', 'P = 2/3 · 0,0392 · 1/4 = 0,00653 ≈ 0,65 %.'] }
    ] },

  { id: 'eb3', asig: 'bio', titulo: 'Una bacteria resistente',
    contexto: 'Se aísla una bacteria de un paciente. En la tinción de Gram queda de color rosa. En una micrografía a 20 000 aumentos mide 40 mm de largo.\nSe hace un antibiograma: en una placa con la bacteria se colocan tres discos. Disco con penicilina: sin halo de inhibición. Disco con tetraciclina: halo de 22 mm. Disco solo con el disolvente: sin halo.',
    apartados: [
      { tema: 'b3t1', tipo: 'numerica', dificultad: 2, enunciado: '¿Cuál es la longitud real de la bacteria en µm?',
        valor: 2, tolerancia: 0.01, unidad: 'µm', modelo: '2 µm.', pasos: ['Real = aparente / aumentos = 40 mm / 20 000 = 0,002 mm.', '0,002 mm = 2 µm.'] },
      { tema: 'b3t3', tipo: 'test', dificultad: 2, enunciado: '¿Qué indica el color rosa en la tinción de Gram?',
        opciones: ['Que es Gram positiva, con pared gruesa', 'Que es Gram negativa: pared fina de peptidoglucano y membrana externa', 'Que no tiene pared', 'Que es una arquea'], correcta: 1,
        modelo: 'Es Gram negativa: su fina capa de peptidoglucano no retiene el cristal violeta tras el alcohol y se tiñe con la safranina.', pasos: [] },
      { tema: 'b3t4', tipo: 'test', dificultad: 2, enunciado: '¿Cómo se interpreta el antibiograma?',
        opciones: ['Es sensible a los dos antibióticos', 'Es resistente a la penicilina y sensible a la tetraciclina', 'Es resistente a la tetraciclina', 'El disolvente es un antibiótico'], correcta: 1,
        modelo: 'Sin halo con penicilina: resistente. Halo con tetraciclina: sensible. El disco con disolvente (control) confirma que el halo se debe al antibiótico.', pasos: [] },
      { tema: 'b3t4', tipo: 'test', dificultad: 3, enunciado: 'Las bacterias de esa cepa eran sensibles a la penicilina hace años. Sin que haya habido ninguna mutación en ellas, ¿cómo han podido adquirir la resistencia?',
        opciones: ['Por la herencia de caracteres adquiridos', 'Por transferencia horizontal: por ejemplo, recibiendo por conjugación un plásmido con genes de resistencia', 'Porque el antibiótico las ha vuelto resistentes', 'Por mitosis'], correcta: 1,
        modelo: 'Por transferencia genética horizontal (conjugación, transformación o transducción), muy a menudo de plásmidos con genes de resistencia. El uso del antibiótico selecciona después a las resistentes.', pasos: [] },
      { tema: 'b3t4', tipo: 'test', dificultad: 2, enunciado: '¿Por qué la penicilina no daña las células del paciente?',
        opciones: ['Porque actúa sobre la pared de peptidoglucano, que las células humanas no tienen', 'Porque solo actúa de noche', 'Porque las células humanas tienen ribosomas 70S', 'Porque destruye los virus'], correcta: 0,
        modelo: 'Inhibe la síntesis del peptidoglucano de la pared bacteriana, una estructura que no existe en las células humanas.', pasos: [] }
    ] },

  { id: 'eb4', asig: 'bio', titulo: 'Dos dosis de una vacuna',
    contexto: 'Se mide la concentración de anticuerpos específicos en la sangre de una persona vacunada.\nPrimera dosis (día 0): los anticuerpos aparecen hacia el día 7, alcanzan un máximo bajo hacia el día 14 (sobre todo IgM) y luego disminuyen.\nSegunda dosis (día 60): los anticuerpos suben en 2-3 días, alcanzan un máximo unas 10 veces mayor que el primero (sobre todo IgG) y se mantienen altos mucho más tiempo.',
    apartados: [
      { tema: 'b4t3', tipo: 'test', dificultad: 1, enunciado: '¿Qué tipo de inmunidad produce la vacuna?',
        opciones: ['Activa natural', 'Activa artificial', 'Pasiva natural', 'Pasiva artificial'], correcta: 1,
        modelo: 'Activa artificial: el propio organismo fabrica anticuerpos y memoria frente a antígenos introducidos a propósito.', pasos: [] },
      { tema: 'b4t2', tipo: 'test', dificultad: 2, enunciado: '¿Por qué la respuesta a la segunda dosis es más rápida e intensa?',
        opciones: ['Porque la segunda dosis tiene más antígeno', 'Porque en la primera se formaron linfocitos B y T de memoria que se activan enseguida', 'Porque quedan anticuerpos de la madre', 'Porque actúa el complemento'], correcta: 1,
        modelo: 'Por las células de memoria generadas en la respuesta primaria: reconocen el antígeno y se activan rápidamente (respuesta secundaria).', pasos: [] },
      { tema: 'b4t2', tipo: 'corta', dificultad: 2, enunciado: '¿Qué células producen los anticuerpos que se miden?',
        aceptadas: ['plasmatica', 'plasmocito'], modelo: 'Las células plasmáticas, que proceden de linfocitos B activados.', pasos: [] },
      { tema: 'b4t3', tipo: 'desarrollo', dificultad: 3, enunciado: 'Explica por qué conviene vacunar a la mayor parte de la población aunque algunas personas no puedan vacunarse.',
        criterios: ['Las personas vacunadas no enferman o transmiten menos el patógeno.', 'Si la proporción de inmunes es alta, el patógeno circula poco (inmunidad de grupo).', 'Así se protege a quien no puede vacunarse (bebés, personas inmunodeprimidas).', 'Puede llegar a eliminarse una enfermedad (ejemplo: la viruela).'],
        modelo: 'Las personas vacunadas desarrollan memoria inmunitaria, así que no enferman o transmiten mucho menos el patógeno. Si una proporción alta de la población está inmunizada, el patógeno apenas encuentra personas a las que infectar y deja de circular: es la inmunidad de grupo. De esta forma se protege también a quien no puede vacunarse, como los bebés o las personas inmunodeprimidas, e incluso se puede erradicar una enfermedad, como ocurrió con la viruela.', pasos: [] }
    ] },

  { id: 'eb5', asig: 'bio', titulo: 'De un gen a una proteína',
    contexto: 'Fragmento de la cadena molde de un gen bacteriano: 3′-TAC GGA CTT ATT-5′.\nCódigo genético necesario: AUG = Met (inicio); CCU y CCC = Pro; GAA = Glu; UAA = parada.',
    apartados: [
      { tema: 'b2t3', tipo: 'corta', dificultad: 2, enunciado: 'Escribe el ARNm de 5′ a 3′, sin espacios.',
        aceptadas: ['augccugaauaa'], modelo: '5′-AUG CCU GAA UAA-3′.', pasos: ['Complementario: T → A, A → U, C → G, G → C.', 'Antiparalelo: la molde va 3′→5′ y el ARNm 5′→3′.'] },
      { tema: 'b2t3', tipo: 'numerica', dificultad: 1, enunciado: '¿Cuántos aminoácidos tiene el péptido que se forma?',
        valor: 3, tolerancia: 0, unidad: 'aminoácidos', modelo: '3: Met-Pro-Glu.', pasos: ['AUG = Met, CCU = Pro, GAA = Glu y UAA es de parada (no codifica aminoácido).'] },
      { tema: 'b2t2', tipo: 'test', dificultad: 3, enunciado: 'Si en la cadena molde el triplete CTT cambia a ATT, ¿qué tipo de mutación es?',
        opciones: ['Silenciosa', 'De cambio de sentido', 'Sin sentido: aparece un codón de parada antes de tiempo', 'De cambio de pauta'], correcta: 2,
        modelo: 'Sin sentido: ATT se transcribe como UAA (parada), así que el péptido queda en 2 aminoácidos (Met-Pro).', pasos: [] },
      { tema: 'b2t2', tipo: 'test', dificultad: 3, enunciado: 'Si en la cadena molde el triplete GGA cambia a GGG, ¿qué efecto tiene?',
        opciones: ['Ninguno en la proteína: el codón pasa a CCC, que también codifica Pro (mutación silenciosa)', 'Se para la traducción', 'Cambia la Pro por Glu', 'Se desplaza la pauta de lectura'], correcta: 0,
        modelo: 'Es silenciosa: CCU pasa a CCC y los dos codifican prolina, gracias a la degeneración del código.', pasos: [] },
      { tema: 'b2t3', tipo: 'test', dificultad: 2, enunciado: 'Si este gen fuera eucariota, ¿qué paso adicional sufriría el ARN antes de traducirse?',
        opciones: ['Ninguno', 'Maduración en el núcleo: caperuza, cola de poli-A y eliminación de intrones', 'Retrotranscripción', 'Replicación'], correcta: 1,
        modelo: 'Maduración en el núcleo (caperuza en 5′, cola de poli-A y splicing de los intrones) y salida al citoplasma.', pasos: [] }
    ] },

  /* ───── Química ───── */
  { id: 'eq1', asig: 'qui', titulo: 'La acidez de un vinagre',
    contexto: 'Se valoran 10,00 mL de un vinagre con NaOH 0,500 M usando fenolftaleína y se gastan 16,0 mL hasta el punto final. Considera que toda la acidez se debe al ácido acético (CH₃COOH, M = 60,0 g/mol, Ka = 1,8·10⁻⁵).',
    apartados: [
      { tema: 'q2t4', tipo: 'numerica', dificultad: 2, enunciado: 'Calcula la concentración de ácido acético del vinagre en mol/L.',
        valor: 0.8, tolerancia: 0.005, unidad: 'mol/L', modelo: '0,800 M.', pasos: ['CH₃COOH + NaOH → CH₃COONa + H₂O (1:1).', 'n(NaOH) = 0,500 · 0,0160 = 8,00·10⁻³ mol = n(ácido).', 'c = 8,00·10⁻³ / 0,01000 L = 0,800 mol/L.'] },
      { tema: 'q2t4', tipo: 'numerica', dificultad: 2, enunciado: 'Expresa esa concentración en g/L.',
        valor: 48, tolerancia: 0.3, unidad: 'g/L', modelo: '48,0 g/L.', pasos: ['0,800 mol/L · 60,0 g/mol = 48,0 g/L.'] },
      { tema: 'q2t4', tipo: 'numerica', dificultad: 3, enunciado: 'Calcula el pH del vinagre antes de la valoración.',
        valor: 2.42, tolerancia: 0.02, unidad: '', modelo: 'pH ≈ 2,42.', pasos: ['x = √(Ka·c) = √(1,8·10⁻⁵ · 0,800) = √(1,44·10⁻⁵) = 3,79·10⁻³ M.', 'x/c = 0,47 % < 5 %: la aproximación es válida.', 'pH = −log(3,79·10⁻³) = 2,42.'] },
      { tema: 'q4t1', tipo: 'test', dificultad: 2, enunciado: '¿Por qué se usa fenolftaleína y no un indicador que vire a pH ácido?',
        opciones: ['Porque es más barata', 'Porque en el punto de equivalencia hay acetato, que es básico, y el pH es mayor que 7', 'Porque el vinagre es neutro', 'Porque reacciona con el ácido'], correcta: 1,
        modelo: 'Al valorar un ácido débil con una base fuerte, en el punto de equivalencia hay CH₃COO⁻, que hidroliza y da un pH básico (≈ 8-9). La fenolftaleína vira en esa zona (8,2-10).', pasos: [] },
      { tema: 'q4t1', tipo: 'test', dificultad: 1, enunciado: '¿Con qué material se miden los 10,00 mL de vinagre?',
        opciones: ['Probeta', 'Pipeta aforada', 'Vaso de precipitados', 'Bureta de 50 mL de forma aproximada'], correcta: 1,
        modelo: 'Con una pipeta aforada de 10 mL, que mide con precisión (dos decimales).', pasos: [] }
    ] },

  { id: 'eq2', asig: 'qui', titulo: 'El equilibrio N₂O₄ ⇌ 2 NO₂',
    contexto: 'En un recipiente de 1,00 L a 298 K se introducen 0,100 mol de N₂O₄ (incoloro). Se establece el equilibrio N₂O₄(g) ⇌ 2 NO₂(g) (NO₂ de color pardo), con ΔH > 0. En el equilibrio quedan 0,080 mol de N₂O₄. (R = 0,082 atm·L/(mol·K))',
    apartados: [
      { tema: 'q2t3', tipo: 'numerica', dificultad: 2, enunciado: 'Calcula Kc.',
        valor: 0.02, tolerancia: 0.0005, unidad: '', modelo: 'Kc = 0,020.', pasos: ['Se disocian 0,100 − 0,080 = 0,020 mol de N₂O₄ y se forman 0,040 mol de NO₂.', 'Kc = [NO₂]² / [N₂O₄] = 0,040² / 0,080 = 0,020.'] },
      { tema: 'q2t3', tipo: 'numerica', dificultad: 2, enunciado: 'Calcula el grado de disociación del N₂O₄, en %.',
        valor: 20, tolerancia: 0.1, unidad: '%', modelo: 'α = 20 %.', pasos: ['α = 0,020 / 0,100 = 0,20 = 20 %.'] },
      { tema: 'q2t3', tipo: 'numerica', dificultad: 3, enunciado: 'Calcula Kp a 298 K.',
        valor: 0.489, tolerancia: 0.005, unidad: '', modelo: 'Kp ≈ 0,49.', pasos: ['Δn = 2 − 1 = 1.', 'Kp = Kc·(RT) = 0,020 · 0,082 · 298 = 0,489.'] },
      { tema: 'q2t3', tipo: 'test', dificultad: 2, enunciado: '¿Qué se observa si se calienta el recipiente?',
        opciones: ['Se aclara: hay menos NO₂', 'Se oscurece: el equilibrio se desplaza hacia el NO₂, en el sentido endotérmico', 'No cambia', 'Kc disminuye'], correcta: 1,
        modelo: 'Al ser endotérmica, al calentar el equilibrio se desplaza hacia los productos: más NO₂ (más pardo) y Kc aumenta.', pasos: [] },
      { tema: 'q2t3', tipo: 'test', dificultad: 3, enunciado: 'A temperatura constante, se reduce el volumen del recipiente a la mitad. ¿Qué ocurre?',
        opciones: ['El equilibrio se desplaza hacia el N₂O₄ (menos moles de gas)', 'Se desplaza hacia el NO₂', 'Kc cambia', 'No ocurre nada'], correcta: 0,
        modelo: 'Al aumentar la presión, el equilibrio se desplaza hacia donde hay menos moles de gas: hacia el N₂O₄. Kc no cambia porque la temperatura es la misma.', pasos: [] }
    ] },

  { id: 'eq3', asig: 'qui', titulo: 'Una pila de magnesio y cobre',
    contexto: 'Se construye una pila con un electrodo de magnesio en una disolución de Mg²⁺ 1 M y un electrodo de cobre en una disolución de Cu²⁺ 1 M, unidos por un puente salino.\nE°(Mg²⁺/Mg) = −2,37 V; E°(Cu²⁺/Cu) = +0,34 V. M(Cu) = 63,55 g/mol; F = 96 485 C/mol.',
    apartados: [
      { tema: 'q2t5', tipo: 'numerica', dificultad: 1, enunciado: 'Calcula la fuerza electromotriz estándar de la pila.',
        valor: 2.71, tolerancia: 0.005, unidad: 'V', modelo: 'E° = 2,71 V.', pasos: ['El cátodo es el de mayor potencial (Cu).', 'E° = 0,34 − (−2,37) = 2,71 V.'] },
      { tema: 'q2t5', tipo: 'test', dificultad: 2, enunciado: '¿Qué ocurre en el ánodo?',
        opciones: ['Cu²⁺ + 2 e⁻ → Cu', 'Mg → Mg²⁺ + 2 e⁻ (oxidación, polo negativo)', 'Mg²⁺ + 2 e⁻ → Mg', 'Cu → Cu²⁺ + 2 e⁻'], correcta: 1,
        modelo: 'En el ánodo se oxida el Mg: Mg → Mg²⁺ + 2 e⁻. Es el polo negativo de la pila.', pasos: [] },
      { tema: 'q2t5', tipo: 'test', dificultad: 1, enunciado: '¿Cuál es la reacción global de la pila?',
        opciones: ['Mg + Cu²⁺ → Mg²⁺ + Cu', 'Mg²⁺ + Cu → Mg + Cu²⁺', '2 Mg + Cu²⁺ → 2 Mg²⁺ + Cu', 'Mg + Cu → Mg²⁺ + Cu²⁺'], correcta: 0,
        modelo: 'Mg + Cu²⁺ → Mg²⁺ + Cu: los dos procesos intercambian 2 electrones.', pasos: [] },
      { tema: 'q2t5', tipo: 'numerica', dificultad: 3, enunciado: 'Si la pila da una corriente constante de 0,500 A durante 2,00 h, ¿qué masa de cobre (g) se deposita en el cátodo?',
        valor: 1.19, tolerancia: 0.01, unidad: 'g', modelo: '≈ 1,19 g.', pasos: ['Q = 0,500 · 7 200 = 3 600 C.', 'n(e⁻) = 3 600 / 96 485 = 3,73·10⁻² mol.', 'n(Cu) = n(e⁻)/2 = 1,87·10⁻² mol.', 'm = 1,87·10⁻² · 63,55 = 1,19 g.'] },
      { tema: 'q2t5', tipo: 'test', dificultad: 2, enunciado: '¿Para qué sirve el puente salino?',
        opciones: ['Para aportar electrones', 'Para cerrar el circuito y mantener la neutralidad eléctrica de las disoluciones', 'Para medir el potencial', 'Para evitar que se oxide el Mg'], correcta: 1,
        modelo: 'Permite el paso de iones entre las semiceldas: cierra el circuito y compensa las cargas que se van acumulando.', pasos: [] }
    ] },

  { id: 'eq4', asig: 'qui', titulo: 'La combustión del etanol',
    contexto: 'C₂H₅OH(l) + 3 O₂(g) → 2 CO₂(g) + 3 H₂O(l).\nΔH°f (kJ/mol): C₂H₅OH(l) = −277,7; CO₂(g) = −393,5; H₂O(l) = −285,8. M(C₂H₅OH) = 46,0 g/mol; c(agua) = 4,18 J g⁻¹ K⁻¹.',
    apartados: [
      { tema: 'q2t1', tipo: 'numerica', dificultad: 2, enunciado: 'Calcula la entalpía de combustión del etanol (kJ/mol).',
        valor: -1366.7, tolerancia: 0.5, unidad: 'kJ/mol', modelo: 'ΔH°c = −1 366,7 kJ/mol.', pasos: ['Productos: 2 · (−393,5) + 3 · (−285,8) = −1 644,4 kJ.', 'Reactivos: −277,7 kJ (el O₂ vale 0).', 'ΔH° = −1 644,4 − (−277,7) = −1 366,7 kJ/mol.'] },
      { tema: 'q2t1', tipo: 'numerica', dificultad: 2, enunciado: '¿Cuánta energía (kJ) se desprende al quemar 10,0 g de etanol? Escribe el valor sin signo.',
        valor: 297.1, tolerancia: 1, unidad: 'kJ', modelo: '≈ 297 kJ.', pasos: ['n = 10,0 / 46,0 = 0,2174 mol.', 'Q = 0,2174 · 1 366,7 = 297,1 kJ desprendidos.'] },
      { tema: 'q2t1', tipo: 'numerica', dificultad: 3, enunciado: 'Si toda esa energía se aprovechara, ¿qué masa de agua (g) se podría calentar de 20 °C a 80 °C?',
        valor: 1185, tolerancia: 6, unidad: 'g', modelo: '≈ 1 185 g (1,18 kg).', pasos: ['Q = m·c·ΔT, así que m = Q/(c·ΔT).', 'm = 297 100 J / (4,18 · 60) = 1 185 g.'] },
      { tema: 'q2t1', tipo: 'test', dificultad: 2, enunciado: '¿Qué signo tiene ΔS de esta reacción?',
        opciones: ['Positivo: se forman gases', 'Negativo: se pasa de 3 moles de gas a 2 y se forma agua líquida', 'Cero', 'No se puede saber'], correcta: 1,
        modelo: 'Negativo: disminuye el número de moles de gas (de 3 a 2) y se forma un líquido.', pasos: [] },
      { tema: 'q2t1', tipo: 'test', dificultad: 3, enunciado: 'Con ΔH < 0 y ΔS < 0, ¿cuándo es espontánea la combustión?',
        opciones: ['A cualquier temperatura', 'A temperaturas bajas, que en la práctica incluyen todas las habituales porque |ΔH| es muy grande', 'Solo a temperaturas muy altas', 'Nunca'], correcta: 1,
        modelo: 'ΔG = ΔH − TΔS es negativo mientras T < ΔH/ΔS; como ΔH es muy negativo, esa temperatura límite es altísima y la reacción es espontánea a cualquier temperatura habitual.', pasos: [] }
    ] },

  { id: 'eq5', asig: 'qui', titulo: 'Identificar un compuesto C₃H₆O',
    contexto: 'Un compuesto A tiene fórmula C₃H₆O. Su espectro IR muestra una banda intensa a 1 715 cm⁻¹ y ninguna banda ancha entre 3 200 y 3 600 cm⁻¹. Su espectro de RMN de ¹H tiene una sola señal (singlete). (C = 12, H = 1, O = 16)',
    apartados: [
      { tema: 'q1t1', tipo: 'test', dificultad: 2, enunciado: '¿Qué compuesto es A?',
        opciones: ['Propanal', 'Propanona', 'Prop-2-en-1-ol', 'Metoxieteno'], correcta: 1,
        modelo: 'Propanona (CH₃–CO–CH₃): tiene C=O (1 715 cm⁻¹), no tiene O–H, y sus 6 H son equivalentes (un singlete).', pasos: [] },
      { tema: 'q1t1', tipo: 'numerica', dificultad: 1, enunciado: '¿A qué m/z aparecerá el pico del ion molecular en el espectro de masas?',
        valor: 58, tolerancia: 0, unidad: '', modelo: 'm/z = 58.', pasos: ['3 · 12 + 6 · 1 + 16 = 58.'] },
      { tema: 'q3t1', tipo: 'test', dificultad: 2, enunciado: 'El propanal (CH₃–CH₂–CHO) también es C₃H₆O. ¿Qué tipo de isómero es respecto a A?',
        opciones: ['De cadena', 'De posición', 'De función', 'Óptico'], correcta: 2,
        modelo: 'De función: aldehído frente a cetona.', pasos: [] },
      { tema: 'q1t1', tipo: 'test', dificultad: 3, enunciado: '¿Cuántas señales daría el propanal (CH₃–CH₂–CHO) en RMN de ¹H?',
        opciones: ['Una', 'Dos', 'Tres', 'Seis'], correcta: 2,
        modelo: 'Tres: hay tres tipos de H no equivalentes (CH₃, CH₂ y CHO).', pasos: [] },
      { tema: 'q1t1', tipo: 'test', dificultad: 2, enunciado: 'Otro isómero, el prop-2-en-1-ol (CH₂=CH–CH₂OH), ¿qué banda de IR tendría que A no tiene?',
        opciones: ['Una banda ancha de O–H entre 3 200 y 3 600 cm⁻¹', 'Una banda de C=O a 1 715 cm⁻¹', 'Ninguna', 'Una banda de N–H'], correcta: 0,
        modelo: 'La banda ancha de O–H (3 200-3 600 cm⁻¹), propia de los alcoholes. Además no tendría la del C=O.', pasos: [] }
    ] }
];

// Cada apartado se convierte en una pregunta normal con el contexto del ejercicio.
PAU.ejercicios.forEach(function (ej) {
  ej.ids = ej.apartados.map(function (ap, i) {
    const letra = 'abcdefgh'[i];
    PAU.preguntas.push(Object.assign({}, ap, {
      id: ej.id + letra,
      enunciado: letra + ') ' + ap.enunciado,
      ejercicio: ej.id,
      contexto: ej.contexto,
      tituloEjercicio: ej.titulo
    }));
    return ej.id + letra;
  });
});
