/*
 * Tarjetas de repaso (ampliación). Material original. Se AÑADEN al final de las tarjetas de cada tema:
 * el progreso de cada tarjeta se guarda por su posición, así que añade siempre al final y no reordenes.
 * Se carga después de temario-biologia.js y temario-quimica.js.
 */
window.PAU = window.PAU || {};
(function () {
  const extra = {
    /* Biología */
    b1t1: [
      ['¿Qué enlace une los monosacáridos?', 'El enlace O-glucosídico.'],
      ['¿Qué es un fosfolípido y por qué forma bicapas?', 'Un lípido anfipático (cabeza polar con fosfato y dos colas apolares): en agua las colas se esconden y forman la bicapa de las membranas.'],
      ['¿Qué elemento llevan siempre los ácidos nucleicos y no los glúcidos ni los triglicéridos?', 'Fósforo (P), en los grupos fosfato. Las proteínas llevan N y a menudo S.'],
      ['Funciones generales de las biomoléculas', 'Energética (glúcidos, lípidos), estructural (proteínas, fosfolípidos, celulosa), reguladora (hormonas, enzimas) e informativa (ácidos nucleicos).']
    ],
    b1t2: [
      ['¿Cuántos enlaces peptídicos tiene una cadena de n aminoácidos?', 'n − 1.'],
      ['Estructura secundaria: ejemplos y qué la estabiliza', 'α-hélice y lámina β, estabilizadas por puentes de hidrógeno entre grupos del enlace peptídico.'],
      ['Inhibidor competitivo frente a no competitivo', 'Competitivo: se une al centro activo y se revierte con exceso de sustrato. No competitivo: se une a otro sitio y no se revierte con más sustrato.'],
      ['¿Qué es una coenzima?', 'Molécula orgánica no proteica que necesitan algunas enzimas (NAD⁺, FAD, coenzima A); muchas derivan de vitaminas del grupo B.'],
      ['Especificidad enzimática', 'Cada enzima actúa sobre un sustrato (o un grupo) concreto, porque el centro activo encaja con él por su forma y sus cargas.']
    ],
    b1t3: [
      ['Glucólisis: lugar, inicio, final y balance', 'Citosol. Glucosa → 2 piruvatos. Balance neto: 2 ATP y 2 NADH.'],
      ['Descarboxilación oxidativa del piruvato', 'Matriz mitocondrial: piruvato → acetil-CoA + CO₂, y se forma NADH.'],
      ['Balance de una vuelta del ciclo de Krebs', '3 NADH, 1 FADH₂, 1 GTP (ATP) y 2 CO₂.'],
      ['β-oxidación', 'Degrada los ácidos grasos a acetil-CoA en la matriz mitocondrial, produciendo NADH y FADH₂.'],
      ['Fermentación láctica frente a alcohólica', 'Láctica: piruvato → lactato (músculo, bacterias lácticas). Alcohólica: piruvato → etanol + CO₂ (levaduras). Ambas regeneran NAD⁺ y solo dan 2 ATP.']
    ],
    b1t4: [
      ['Fase luminosa: lugar y productos', 'Membrana de los tilacoides. Fotólisis del agua (libera O₂), y se forman ATP y NADPH.'],
      ['Ciclo de Calvin: lugar y enzima clave', 'Estroma del cloroplasto. La RuBisCO fija el CO₂ a la ribulosa-1,5-bisfosfato; consume ATP y NADPH.'],
      ['Fotosíntesis oxigénica frente a anoxigénica', 'Oxigénica (plantas, algas, cianobacterias): el dador de electrones es el H₂O y se libera O₂. Anoxigénica (sulfobacterias): usan H₂S y no liberan O₂.'],
      ['Quimiosíntesis', 'Fijación de CO₂ con la energía de oxidar compuestos inorgánicos (NH₃, NO₂⁻, H₂S, Fe²⁺). Ejemplo: bacterias nitrificantes.']
    ],
    b2t1: [
      ['Reglas de Chargaff (ADN de doble cadena)', 'A = T y G = C, así que A + G = T + C (purinas = pirimidinas).'],
      ['¿Qué es un nucleosoma?', 'ADN enrollado alrededor de un octámero de histonas: primer nivel de compactación de la cromatina.'],
      ['Diferencias entre ADN y ARN', 'ADN: desoxirribosa, timina, doble cadena. ARN: ribosa, uracilo, normalmente cadena sencilla.'],
      ['Funciones de ARNm, ARNt y ARNr', 'ARNm: lleva la información del gen al ribosoma. ARNt: lleva los aminoácidos y tiene el anticodón. ARNr: forma los ribosomas.'],
      ['Otros ARN', 'Los microARN y los ARN de interferencia regulan la expresión: se unen al ARNm y bloquean su traducción o provocan su degradación.']
    ],
    b2t2: [
      ['Enzimas de la replicación y su función', 'Helicasa: abre la doble hélice. Topoisomerasa: alivia la tensión. Primasa: hace el cebador de ARN. ADN polimerasa III: alarga. ADN polimerasa I: quita los cebadores. Ligasa: une fragmentos.'],
      ['¿Por qué la replicación es semiconservativa?', 'Cada molécula hija conserva una cadena de la molécula original y tiene una nueva. Lo demostraron Meselson y Stahl con ¹⁵N y ¹⁴N.'],
      ['Tipos de mutaciones puntuales según su efecto', 'Silenciosa (mismo aminoácido), de cambio de sentido (otro aminoácido), sin sentido (codón de parada) y de cambio de pauta (inserción o deleción).'],
      ['Replicación eucariota frente a procariota', 'Eucariotas: cromosomas lineales, muchos orígenes de replicación, telómeros e histonas. Procariotas: cromosoma circular y un solo origen.']
    ],
    b2t3: [
      ['Características del código genético', 'Universal (casi), degenerado, sin solapamiento, sin comas, leído en tripletes desde un codón de inicio (AUG).'],
      ['Partes de un operón', 'Promotor, operador y genes estructurales. El gen regulador (aparte) fabrica el represor.'],
      ['Operón inducible frente a represible', 'Inducible (lac): está apagado y el sustrato (lactosa) lo activa. Represible (trp): está encendido y el producto (triptófano) lo apaga.'],
      ['Regulación en eucariotas', 'Promotores, potenciadores y silenciadores, factores de transcripción (activadores y represores) y marcas epigenéticas (metilación del ADN, modificación de histonas).'],
      ['Maduración del ARNm en eucariotas', 'En el núcleo: caperuza en 5′, cola de poli-A en 3′ y eliminación de intrones (splicing).']
    ],
    b2t4: [
      ['Fases del ciclo celular', 'Interfase (G1, S y G2) y fase M (mitosis y citocinesis). En S se replica el ADN.'],
      ['Regulación del ciclo', 'Ciclinas y quinasas dependientes de ciclinas (CDK), con puntos de control en G1, G2 y la metafase.'],
      ['Ligamiento', 'Los genes cercanos en el mismo cromosoma tienden a heredarse juntos. Solo se separan si hay sobrecruzamiento entre ellos (recombinación).'],
      ['Meiosis y leyes de Mendel', 'La separación de los homólogos (anafase I) explica la segregación de alelos (1.ª ley); la orientación al azar de los pares explica la transmisión independiente (3.ª ley).'],
      ['Reproducción de los procariotas', 'Por fisión binaria: el cromosoma se replica y la célula se divide en dos idénticas.']
    ],
    b2t5: [
      ['Proporciones de Aa × Aa', 'Genotipos 1 AA : 2 Aa : 1 aa. Fenotipos 3 dominante : 1 recesivo.'],
      ['Proporciones de AaBb × AaBb (genes independientes)', 'Fenotipos 9 : 3 : 3 : 1.'],
      ['Cruzamiento prueba', 'Se cruza con un homocigoto recesivo (aa). Si sale algún descendiente recesivo, el progenitor era heterocigoto.'],
      ['Dominancia intermedia frente a codominancia', 'Intermedia: el heterocigoto tiene un fenotipo intermedio (rosa). Codominancia: se expresan los dos (grupo AB).'],
      ['Herencia ligada al X recesiva', 'Más frecuente en hombres (hemicigotos). Un hombre afectado la transmite a todas sus hijas (portadoras) y a ningún hijo.'],
      ['Hardy-Weinberg', 'p + q = 1 y p² + 2pq + q² = 1. q² = frecuencia del fenotipo recesivo; 2pq = portadores.']
    ],
    b2t6: [
      ['¿Por qué el cáncer se relaciona con el ciclo celular?', 'Las mutaciones en genes que controlan el ciclo (protooncogenes y supresores) hacen que la célula se divida sin control.'],
      ['Apoptosis y cáncer', 'La apoptosis elimina células dañadas; si falla (por ejemplo, por p53 mutado), las células con mutaciones sobreviven.'],
      ['Tumor benigno frente a maligno', 'Benigno: crece localmente y no invade. Maligno (cáncer): invade tejidos y puede hacer metástasis.']
    ],
    b3t1: [
      ['Conversión de unidades de longitud', '1 m = 10³ mm = 10⁶ µm = 10⁹ nm = 10¹⁰ Å.'],
      ['Fórmula de los aumentos', 'Tamaño real = tamaño aparente / aumentos (en las mismas unidades).'],
      ['Tamaños típicos', 'Bacteria: 1-10 µm. Virus: 20-300 nm. Célula eucariota: 10-100 µm.'],
      ['Especie frente a cepa', 'Especie: grupo de microorganismos con características comunes. Cepa: variante genética dentro de una especie.']
    ],
    b3t2: [
      ['Tipos de metabolismo según la fuente de energía y de carbono', 'Foto- o quimio- (luz o compuestos químicos) y auto- o heterótrofo (CO₂ o materia orgánica). Ej.: cianobacterias fotoautótrofas; E. coli quimioheterótrofa.'],
      ['Bacterias del ciclo del nitrógeno', 'Fijadoras (Rhizobium): N₂ → NH₃. Nitrificantes: NH₃ → NO₂⁻ → NO₃⁻. Desnitrificantes: NO₃⁻ → N₂.'],
      ['Usos industriales de microorganismos', 'Alimentación (yogur, pan, vino, queso), farmacia (antibióticos, insulina), agricultura (biofertilizantes, Bt) y medio ambiente (biorremediación, depuración).'],
      ['Microbiota', 'Microorganismos que viven en nuestro cuerpo: ayudan a digerir, sintetizan vitaminas (K) y compiten con los patógenos.']
    ],
    b3t3: [
      ['Esterilización frente a desinfección', 'Esterilizar elimina todos los microorganismos y esporas (autoclave, calor seco, filtración, óxido de etileno). Desinfectar reduce los patógenos (lejía, alcohol).'],
      ['Pasos de la tinción de Gram', 'Cristal violeta → lugol → alcohol (decolora) → safranina. Gram + violeta (pared gruesa); Gram − rosa (pared fina y membrana externa).'],
      ['Endemia, epidemia y pandemia', 'Endemia: presente siempre en una zona. Epidemia: muchos casos en poco tiempo en una zona. Pandemia: epidemia mundial.'],
      ['Cultivo puro', 'Contiene un solo tipo de microorganismo; se obtiene sembrando por agotamiento y tomando una colonia aislada.']
    ],
    b3t4: [
      ['Mecanismos de transferencia horizontal', 'Transformación: ADN libre del medio. Conjugación: plásmido a través de un pili. Transducción: ADN llevado por un bacteriófago.'],
      ['Mecanismos de acción de los antibióticos', 'Inhiben la síntesis de la pared (penicilina), la síntesis de proteínas en ribosomas 70S (tetraciclina), la replicación o la membrana.'],
      ['Por qué no se usan antibióticos contra virus', 'Los virus no tienen pared, ribosomas ni metabolismo propios: los antibióticos no tienen dónde actuar.']
    ],
    b3t5: [
      ['Estructura de un virus', 'Ácido nucleico (ADN o ARN) dentro de una cápsida de proteína (capsómeros); algunos tienen envoltura lipídica.'],
      ['Virus, viroide y prion', 'Virus: ácido nucleico + cápsida. Viroide: solo ARN circular sin cápsida (plantas). Prion: solo proteína mal plegada.'],
      ['Fases del ciclo lítico', 'Fijación, penetración, síntesis de componentes, ensamblaje y liberación (lisis).'],
      ['Retrovirus', 'Virus de ARN que lo copian a ADN con la transcriptasa inversa; el ADN se integra en el genoma de la célula (VIH).']
    ],
    b4t1: [
      ['Barreras externas', 'Físicas (piel, mucosas, cilios), químicas (lisozima, ácido gástrico, sudor) y biológicas (microbiota).'],
      ['Órganos linfoides primarios y secundarios', 'Primarios: médula ósea y timo (maduran los linfocitos). Secundarios: ganglios, bazo, amígdalas (se activa la respuesta).'],
      ['Sistema del complemento: funciones', 'Lisis de microorganismos (complejo de ataque a la membrana), opsonización (favorece la fagocitosis) e inflamación.'],
      ['Vías del complemento', 'Clásica: complejos antígeno-anticuerpo. Alternativa: superficie microbiana directa. De las lectinas: lectinas unidas a azúcares microbianos.'],
      ['Células de la inmunidad innata', 'Neutrófilos, macrófagos (de monocitos), células dendríticas, eosinófilos, basófilos, mastocitos y NK.']
    ],
    b4t2: [
      ['MHC de clase I frente a clase II', 'Clase I: en casi todas las células nucleadas; lo reconocen los T citotóxicos (CD8). Clase II: en las presentadoras de antígeno; lo reconocen los T colaboradores (CD4).'],
      ['Estructura de un anticuerpo', 'Forma de Y: 2 cadenas pesadas y 2 ligeras unidas por puentes disulfuro; las regiones variables reconocen el antígeno.'],
      ['Respuesta primaria frente a secundaria', 'Primaria: lenta, menos intensa, predomina IgM. Secundaria: rápida, intensa y duradera, predomina IgG, gracias a las células de memoria.'],
      ['Inmunidad humoral frente a celular', 'Humoral: anticuerpos de las células plasmáticas (linfocitos B). Celular: linfocitos T citotóxicos que destruyen células infectadas o tumorales.']
    ],
    b4t3: [
      ['Cuatro tipos de inmunidad adquirida', 'Activa natural (infección), activa artificial (vacuna), pasiva natural (placenta, leche), pasiva artificial (suero).'],
      ['Inmunidad de grupo', 'Si una proporción alta de la población es inmune, el patógeno circula poco y protege a quien no puede vacunarse.'],
      ['Fases de una enfermedad infecciosa', 'Incubación (sin síntomas), manifestación clínica (síntomas) y convalecencia (recuperación).'],
      ['Inmunoterapia', 'Tratamientos que estimulan o refuerzan el sistema inmunitario (por ejemplo, contra el cáncer) o aportan anticuerpos (sueroterapia).']
    ],
    b4t4: [
      ['Compatibilidad AB0 en transfusiones de glóbulos rojos', 'O: donante universal (sin antígenos A ni B). AB: receptor universal (sin anticuerpos anti-A ni anti-B).'],
      ['Defensa contra células tumorales', 'Linfocitos NK, linfocitos T citotóxicos y anticuerpos reconocen y destruyen células tumorales.'],
      ['Inmunodeficiencia innata frente a adquirida', 'Innata (congénita): de origen genético, como la inmunodeficiencia combinada grave. Adquirida: por una causa externa, como el sida (VIH destruye los T CD4).'],
      ['Rechazo de trasplantes', 'Las moléculas MHC del donante se reconocen como extrañas; se reduce buscando donantes compatibles y con inmunosupresores.']
    ],
    b5t1: [
      ['Etapas de un ciclo de PCR', 'Desnaturalización (~95 °C), hibridación de cebadores (~50-65 °C) y extensión por la Taq polimerasa (~72 °C). Nº de copias = N₀ · 2ⁿ.'],
      ['Clonación molecular de un gen', 'Cortar gen y plásmido con la misma enzima de restricción, unirlos con ligasa (ADN recombinante), transformar bacterias y seleccionar las que lo llevan.'],
      ['CRISPR-Cas9', 'Un ARN guía lleva la nucleasa Cas9 a una secuencia concreta del ADN, donde corta; al repararse, el gen se inactiva o se edita.'],
      ['Métodos para introducir genes', 'Microinyección (cigotos animales), Agrobacterium tumefaciens con el plásmido Ti (plantas) y vectores (plásmidos, virus).'],
      ['OMG frente a transgénico', 'OMG: cualquier organismo con el genoma modificado por ingeniería genética. Transgénico: el que lleva un gen de otra especie.']
    ],
    b5t2: [
      ['Aplicaciones de los transgénicos', 'Fármacos (insulina, hormona del crecimiento), agricultura (Bt, arroz dorado), ganadería e investigación (ratones knockout como modelos de enfermedad).'],
      ['Terapia génica somática frente a germinal', 'Somática: modifica células del paciente y no se hereda. Germinal: modificaría gametos o embriones y pasaría a la descendencia.'],
      ['Biotecnología en medio ambiente', 'Biorremediación de suelos y aguas contaminadas, depuración de aguas y producción de biocombustibles y bioplásticos.']
    ],
    b6t1: [
      ['Órganos homólogos frente a análogos', 'Homólogos: mismo origen, distinta función (brazo y ala de murciélago). Análogos: distinto origen, misma función (ala de insecto y de ave), por convergencia.'],
      ['Tipos de pruebas de la evolución', 'Paleontológicas, anatómicas (homólogos, vestigiales), embriológicas, moleculares (ADN, proteínas) y biogeográficas.'],
      ['Anagénesis frente a cladogénesis', 'Anagénesis: un linaje cambia con el tiempo. Cladogénesis: un linaje se divide en varios.'],
      ['Aciertos y errores de Lamarck', 'Acierto: las especies cambian y se adaptan. Error: la herencia de los caracteres adquiridos por el uso y el desuso.']
    ],
    b6t2: [
      ['Factores que cambian las frecuencias alélicas', 'Mutación, flujo génico (migración), deriva genética (cuello de botella, efecto fundador) y selección natural (y sexual).'],
      ['Fuentes de variabilidad', 'Mutaciones (nuevos alelos) y recombinación (sobrecruzamiento, segregación al azar y fecundación).'],
      ['Tipos de mutaciones por su extensión', 'Puntuales (genes), cromosómicas estructurales (deleción, duplicación, inversión, translocación) y genómicas o cariotípicas (aneuploidías, poliploidías).'],
      ['Causas de las mutaciones', 'Errores de replicación y de meiosis, virus y transposones, y mutágenos externos (radiaciones, sustancias químicas).'],
      ['Evolución observada directamente', 'Picos de los pinzones de Galápagos tras sequías y aparición de bacterias resistentes a antibióticos.']
    ],
    b6t3: [
      ['Aislamiento reproductivo', 'Precigótico (geográfico, temporal, etológico, mecánico) y poscigótico (híbridos inviables o estériles, como la mula).'],
      ['Especiación alopátrica frente a simpátrica', 'Alopátrica: con barrera geográfica. Simpátrica: en la misma zona (por ejemplo, por poliploidía en plantas).'],
      ['Gradualismo frente a equilibrio puntuado', 'Gradualismo: cambio lento y continuo. Equilibrio puntuado: largos periodos estables y cambios rápidos.'],
      ['Genes ortólogos frente a parálogos', 'Ortólogos: en especies distintas, del mismo gen ancestral (por especiación). Parálogos: en la misma especie, por duplicación.'],
      ['Evo-devo: caja de herramientas genética', 'Genes reguladores del desarrollo (como los Hox) muy conservados; cambios en su expresión generan formas distintas.']
    ],
    b7t1: [
      ['Variable independiente, dependiente y controladas', 'Independiente: la que cambia el investigador. Dependiente: la que se mide. Controladas: las que se mantienen constantes.'],
      ['Control positivo frente a negativo', 'Negativo: sin el factor estudiado (no debe haber efecto). Positivo: con un factor que se sabe que produce efecto (comprueba que el método funciona).'],
      ['Para qué sirven las réplicas', 'Para comprobar que el resultado se repite y reducir el efecto del azar; se trabaja con la media.'],
      ['Características de una buena hipótesis', 'Relaciona variables medibles, se puede comprobar con un experimento y puede resultar falsa.']
    ],

    /* Química */
    q1t1: [
      ['Relaciones entre energía, frecuencia y longitud de onda', 'E = h·ν; c = λ·ν; número de onda = 1/λ.'],
      ['Qué mide cada técnica espectroscópica', 'IR: vibraciones de enlace (grupos funcionales). RMN: entorno de los H (señales y multiplicidad). Masas: masa molecular (ion molecular) y fragmentos.'],
      ['Bandas de IR más útiles', 'O–H ancha 3 200-3 600 cm⁻¹; N–H ~3 300-3 500; C=O ~1 700; C–H ~2 850-3 000.'],
      ['Regla n + 1 en RMN', 'Una señal se divide en n + 1 picos, siendo n el número de H en los carbonos vecinos.']
    ],
    q1t2: [
      ['Valores de los números cuánticos', 'n = 1, 2, 3… ; l = 0 … n − 1 ; mₗ = −l … +l ; mₛ = ±½.'],
      ['Principio de exclusión de Pauli', 'Dos electrones de un átomo no pueden tener los cuatro números cuánticos iguales: máximo 2 electrones por orbital, con espín opuesto.'],
      ['Orden de llenado (Moeller)', '1s 2s 2p 3s 3p 4s 3d 4p 5s 4d 5p 6s 4f 5d 6p…'],
      ['Orbitales por nivel', 'n² orbitales y 2n² electrones como máximo en el nivel n.']
    ],
    q1t3: [
      ['Situar un elemento con su configuración', 'Periodo = n más alto. Grupo según los electrones de valencia: s¹ → 1, s² → 2, s²p¹ → 13 … s²p⁶ → 18.'],
      ['Tendencias del radio atómico', 'Aumenta hacia abajo en un grupo (más capas) y hacia la izquierda en un periodo (menos carga nuclear efectiva).'],
      ['Tendencias de la energía de ionización y la electronegatividad', 'Aumentan hacia arriba y hacia la derecha.'],
      ['Radio de los iones', 'Un catión es menor que su átomo; un anión es mayor que su átomo.']
    ],
    q1t4: [
      ['Geometrías RPECV evaluables', 'AB₂ lineal; AB₃ plana trigonal; AB₄ tetraédrica; AB₃E piramidal trigonal; AB₂E₂ angular.'],
      ['Tipos de sustancia y propiedades', 'Iónica: dura, frágil, conduce fundida o disuelta. Covalente molecular: puntos de fusión bajos. Sólido covalente: muy dura, punto de fusión muy alto. Metálica: conduce en sólido.'],
      ['Ciclo de Born-Haber', 'ΔH°f = ΔH_sub + ½ D + EI + AE + U, donde U es la energía de red.'],
      ['Fuerzas intermoleculares de menor a mayor', 'Dispersión (London) < dipolo-dipolo < enlace de hidrógeno (H unido a F, O o N).']
    ],
    q2t1: [
      ['Relación entre ΔH y ΔU', 'ΔH = ΔU + Δn(gas)·R·T. Qp = ΔH y Qv = ΔU.'],
      ['Entalpía de reacción con entalpías de formación', 'ΔH° = Σ n·ΔH°f(productos) − Σ n·ΔH°f(reactivos). La de los elementos en estado estándar es 0.'],
      ['Entalpía con energías de enlace', 'ΔH ≈ Σ enlaces rotos − Σ enlaces formados.'],
      ['Espontaneidad según el signo de ΔH y ΔS', 'ΔH < 0 y ΔS > 0: siempre. ΔH > 0 y ΔS < 0: nunca. ΔH < 0 y ΔS < 0: a T baja. ΔH > 0 y ΔS > 0: a T alta (T > ΔH/ΔS).']
    ],
    q2t2: [
      ['Ley de velocidad', 'v = k·[A]ᵐ·[B]ⁿ; los órdenes m y n se obtienen experimentalmente, no de los coeficientes.'],
      ['Calcular un orden con dos experimentos', 'Si al multiplicar [A] por 2 la velocidad se multiplica por 2ᵐ: ×1 → orden 0, ×2 → orden 1, ×4 → orden 2.'],
      ['Factores que aumentan la velocidad', 'Concentración, temperatura, superficie de contacto (estado de división) y catalizador.'],
      ['Energía de activación de la reacción inversa', 'Ea(inversa) = Ea(directa) − ΔH.']
    ],
    q2t3: [
      ['Kp y Kc', 'Kp = Kc·(RT)^Δn, con R = 0,082 y Δn = moles de gas de productos − de reactivos. Sin unidades; Kp en atm.'],
      ['Cociente de reacción', 'Q < K: avanza hacia productos. Q > K: hacia reactivos. Q = K: equilibrio.'],
      ['Solubilidad y Kps', 'AB: Kps = s². AB₂: Kps = 4s³. Un ion común disminuye la solubilidad.'],
      ['Efecto de la temperatura en K', 'Solo la temperatura cambia K: en una endotérmica, K aumenta al calentar; en una exotérmica, disminuye.'],
      ['Equilibrios heterogéneos', 'Los sólidos y los líquidos puros no aparecen en la expresión de K.']
    ],
    q2t4: [
      ['pH y pOH', 'pH = −log[H₃O⁺]; pOH = −log[OH⁻]; pH + pOH = 14 a 25 °C.'],
      ['pH de un ácido débil', 'Ka = x²/(c − x); si x es menor del 5 % de c, x ≈ √(Ka·c).'],
      ['Grado de disociación', 'α = cantidad disociada / cantidad inicial = x/c (se puede dar en %).'],
      ['Relación entre Ka y Kb de un par conjugado', 'Ka·Kb = Kw = 1,0·10⁻¹⁴ a 25 °C.'],
      ['Carácter de las sales (cualitativo)', 'Ácido fuerte + base débil (NH₄Cl): ácida. Ácido débil + base fuerte (CH₃COONa): básica. Ácido fuerte + base fuerte (NaCl): neutra.']
    ],
    q2t5: [
      ['Pila: ánodo y cátodo', 'Ánodo: oxidación (polo −). Cátodo: reducción (polo +). E° pila = E°cátodo − E°ánodo.'],
      ['Leyes de Faraday', 'Q = I·t; n(e⁻) = Q/F; n(sustancia) = n(e⁻)/electrones por ion; m = n·M.'],
      ['Cuba electrolítica frente a pila', 'Cuba: necesita corriente externa, proceso no espontáneo; cátodo (−) y ánodo (+). Pila: produce corriente, proceso espontáneo; cátodo (+) y ánodo (−).'],
      ['Prevención de la corrosión', 'Pintar o recubrir, galvanizar (capa de Zn) y usar ánodos de sacrificio (metal más reductor, como Zn o Mg).'],
      ['Reglas para el número de oxidación', 'Elemento libre: 0. O: −2 (salvo peróxidos). H: +1 (salvo hidruros). La suma es la carga de la especie.']
    ],
    q3t1: [
      ['Isomería constitucional', 'De cadena (distinto esqueleto), de posición (el grupo en otro carbono) y de función (otro grupo funcional).'],
      ['Isómeros de función típicos', 'Alcohol / éter; aldehído / cetona; ácido carboxílico / éster.'],
      ['Condición para la isomería cis/trans', 'Doble enlace C=C con dos grupos distintos en cada carbono del doble enlace.'],
      ['Carbono asimétrico (quiral)', 'Carbono unido a cuatro grupos distintos. Sus dos enantiómeros desvían la luz polarizada en sentidos opuestos.']
    ],
    q3t2: [
      ['Cómo reconocer cada tipo de reacción orgánica', 'Adición: se rompe un enlace múltiple y se suman átomos. Eliminación: sale una molécula pequeña y se forma un enlace múltiple. Sustitución: un átomo o grupo cambia por otro.'],
      ['Condensación frente a hidrólisis', 'Condensación: se unen dos moléculas y se libera agua (ésteres, amidas). Hidrólisis: el agua rompe la molécula (al revés).'],
      ['Reacción ácido-base orgánica', 'Un ácido carboxílico (o un fenol) cede H⁺ a una base; una amina capta H⁺. Ej.: CH₃COOH + NaOH → CH₃COONa + H₂O.']
    ],
    q3t3: [
      ['Polímeros de adición frente a condensación', 'Adición: monómeros con doble enlace, sin pérdida de átomos (PE, PP, PVC, PS). Condensación: monómeros con dos grupos funcionales y se libera agua (PET, poliamidas).'],
      ['Monómeros de los códigos de reciclaje', 'PET: diácido + diol. HDPE y LDPE: eteno. PVC: cloroeteno. PP: propeno. PS: estireno.'],
      ['Termoplásticos, termoestables y elastómeros', 'Termoplásticos: cadenas sin unir, funden y se reciclan. Termoestables: muy reticulados, no funden. Elastómeros: poco reticulados, elásticos.'],
      ['Homopolímero frente a copolímero', 'Homopolímero: un solo tipo de monómero. Copolímero: dos o más tipos de monómero.']
    ],
    q4t1: [
      ['Material de una valoración ácido-base', 'Bureta (valorante), pipeta aforada (muestra), Erlenmeyer, indicador y soporte. Se añade gota a gota hasta el viraje.'],
      ['Preparar una disolución', 'Calcular la masa o el volumen, pesar o medir, disolver en un vaso, pasar a un matraz aforado y enrasar con agua destilada.'],
      ['Elección del indicador', 'Debe virar dentro del salto de pH del punto de equivalencia. Ácido fuerte con base fuerte: sirven fenolftaleína o azul de bromotimol.'],
      ['Los 9 pictogramas de peligro', 'Explosivo, inflamable, comburente, gas a presión, corrosivo, toxicidad aguda, nocivo o irritante (exclamación), peligro grave para la salud y peligro para el medio ambiente.'],
      ['Medir la fuerza electromotriz de una pila', 'Dos semiceldas (metal en disolución de su ion), puente salino y un voltímetro conectado a los electrodos.']
    ]
  };

  (PAU.asignaturas || []).forEach(function (a) {
    a.bloques.forEach(function (b) {
      b.temas.forEach(function (t) {
        if (extra[t.id]) t.tarjetas = (t.tarjetas || []).concat(extra[t.id]);
      });
    });
  });
})();
