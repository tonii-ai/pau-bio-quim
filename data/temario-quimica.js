/*
 * Temario de Química · PAU Cataluña.
 * Apartados, «oficial» y «noEvaluable» siguen las «Orientacions per a l'examen de Química PAU-2026»
 * (fuente: qui-orient-2026). «oficial» es una traducción propia y resumida al castellano.
 * Explicaciones, ejemplos y tarjetas son material original de estudio.
 * Mismos campos que temario-biologia.js.
 */
window.PAU = window.PAU || {};
PAU.asignaturas = PAU.asignaturas || [];

PAU.asignaturas.push({
  id: 'qui',
  nombre: 'Química',
  fuente: 'qui-orient-2026',
  examen: {
    resumen: '4 ejercicios obligatorios de 2,5 puntos. Los ejercicios 1 a 3 tienen dos apartados de 1,25 puntos y en el 4 se responden 2 de 4 cuestiones (convocatoria ordinaria de 2025).',
    fuente: 'qui-examen-2025',
    notas: [
      'Se puede usar calculadora, pero no una que almacene datos o se comunique.',
      'Un error de formulación resta 0,5 puntos en ese apartado (criterios de 2025).',
      'Un error de cálculo no se penaliza dos veces: si arrastras un resultado erróneo, se valora el procedimiento.',
      'La estequiometría, la ley de los gases ideales y el cálculo de concentraciones pueden aparecer dentro de cualquier pregunta.',
      'No hay problemas de fórmula empírica.'
    ]
  },
  bloques: [
    /* ───────────────────────── 1. ENLACE QUÍMICO Y ESTRUCTURA DE LA MATERIA ───────────────────────── */
    {
      id: 'q1',
      nombre: 'Enlace químico y estructura de la materia',
      temas: [
        {
          id: 'q1t1',
          nombre: 'Espectros atómicos y técnicas espectroscópicas',
          oficial: 'Espectros atómicos como prueba experimental que obligó a revisar el modelo atómico. Espectros de emisión y absorción y su relación con la estructura electrónica. Radiación electromagnética; relación entre la energía del fotón y la frecuencia, la longitud de onda y el número de onda; niveles de energía moleculares (electrónicos y vibracionales). Fundamento, aplicación e interpretación de espectros sencillos de IR, RMN (con multiplicidad por acoplamiento espín-espín) y espectrometría de masas.',
          noEvaluable: [
            'La espectroscopia UV-visible.',
            'La relevancia histórica de la espectroscopia en el desarrollo del modelo atómico.'
          ],
          puntos: [
            'Un electrón absorbe energía al subir de nivel y la emite (como un fotón) al bajar. Como los niveles están cuantizados, cada elemento tiene un espectro de líneas característico, como una huella dactilar.',
            'Espectro de emisión: líneas brillantes sobre fondo oscuro. De absorción: líneas oscuras sobre un espectro continuo, en las mismas posiciones. Permiten saber de qué está hecha una estrella.',
            'Infrarrojo (IR): las moléculas absorben radiación IR que hace vibrar sus enlaces. Cada grupo funcional absorbe a un número de onda típico: O–H de alcohol, banda ancha hacia 3 200-3 600 cm⁻¹; O–H de ácido, muy ancha entre 2 500 y 3 300 cm⁻¹; N–H, hacia 3 300-3 500 cm⁻¹; C–H, hacia 2 850-3 000 cm⁻¹; C=O, intensa hacia 1 700 cm⁻¹.',
            'RMN de ¹H: el número de señales indica cuántos tipos de H no equivalentes hay; la integración, cuántos H de cada tipo; y la multiplicidad (regla n + 1), cuántos H tienen los carbonos vecinos.',
            'Espectrometría de masas: la molécula se ioniza y se fragmenta. El pico del ion molecular (M⁺) da la masa molecular; los fragmentos ayudan a deducir la estructura.'
          ],
          formulas: [
            ['E = h · ν', 'h = 6,63 · 10⁻³⁴ J·s; ν = frecuencia (Hz).'],
            ['c = λ · ν  →  E = h · c / λ', 'c = 3,00 · 10⁸ m/s; λ en metros.'],
            ['ν̃ = 1 / λ', 'Número de onda, normalmente en cm⁻¹ (se usa en IR).'],
            ['E (por mol) = E (fotón) · Nₐ', 'Nₐ = 6,02 · 10²³ mol⁻¹, para comparar con energías en kJ/mol.']
          ],
          ejemplo: {
            enunciado: 'Calcula la energía de un fotón de 500 nm y la de un mol de esos fotones.',
            pasos: [
              'Se pasa la longitud de onda a metros: λ = 500 nm = 5,00 · 10⁻⁷ m.',
              'E = h · c / λ = (6,63 · 10⁻³⁴ J·s · 3,00 · 10⁸ m/s) / 5,00 · 10⁻⁷ m = 3,98 · 10⁻¹⁹ J.',
              'Por mol: 3,98 · 10⁻¹⁹ J · 6,02 · 10²³ mol⁻¹ = 2,39 · 10⁵ J/mol.'
            ],
            resultado: 'E = 3,98 · 10⁻¹⁹ J por fotón, que son 239 kJ/mol.'
          },
          errores: [
            'No pasar los nm a m (1 nm = 10⁻⁹ m).',
            'Comparar la energía de un fotón (J) con una energía de ionización en kJ/mol sin multiplicar por Nₐ.',
            'En RMN, contar los H del propio carbono para la multiplicidad: se cuentan los de los carbonos vecinos.'
          ],
          tarjetas: [
            ['¿Por qué los espectros atómicos son de líneas?', 'Porque la energía de los electrones está cuantizada: solo se emiten fotones con la diferencia exacta entre niveles.'],
            ['¿En qué zona aparece la banda del C=O en el IR?', 'Hacia 1 700 cm⁻¹, intensa.'],
            ['¿Qué indica la multiplicidad de una señal de RMN?', 'El número de H vecinos (n), según la regla n + 1.'],
            ['¿Qué información da el ion molecular en espectrometría de masas?', 'La masa molecular del compuesto.'],
            ['Relación entre energía y longitud de onda', 'E = h·c/λ: a menor longitud de onda, mayor energía.']
          ]
        },
        {
          id: 'q1t2',
          nombre: 'Principios cuánticos de la estructura atómica',
          oficial: 'Relación entre los espectros y la cuantización de la energía. Del modelo de Bohr a los modelos mecanocuánticos. Principio de incertidumbre de Heisenberg, dualidad onda-corpúsculo del electrón y carácter probabilístico del orbital. Números cuánticos y principio de exclusión de Pauli. Configuración electrónica con el diagrama de Moeller.',
          puntos: [
            'Bohr: el electrón gira en órbitas de energía fija y solo emite o absorbe energía al saltar entre ellas. Explica el espectro del hidrógeno, pero falla con átomos de más electrones.',
            'De Broglie: el electrón también se comporta como onda (λ = h / m·v). Heisenberg: no se pueden conocer a la vez con precisión total la posición y la velocidad (momento) del electrón. Por eso no hay órbitas definidas.',
            'Orbital: región del espacio donde es muy probable (≈ 90 %) encontrar al electrón. Se describe con números cuánticos.',
            'n (principal: 1, 2, 3…) da el nivel y el tamaño; l (secundario: de 0 a n−1; s = 0, p = 1, d = 2, f = 3) da la forma; mₗ (magnético: de −l a +l) da la orientación; mₛ (espín: +½ o −½).',
            'Pauli: dos electrones de un átomo no pueden tener los cuatro números cuánticos iguales, así que en un orbital caben como máximo 2 electrones, con espín opuesto.',
            'Hund: en orbitales de la misma energía, los electrones se colocan primero desapareados y con el mismo espín.',
            'Moeller (orden de llenado): 1s 2s 2p 3s 3p 4s 3d 4p 5s 4d 5p 6s 4f 5d 6p…'
          ],
          formulas: [['λ = h / (m · v)', 'Longitud de onda asociada a una partícula (De Broglie).']],
          ejemplo: {
            enunciado: 'Escribe la configuración electrónica del hierro (Z = 26) y di si (3, 2, 0, +½) es un conjunto válido de números cuánticos.',
            pasos: [
              'Siguiendo el orden de Moeller: 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶ (2 + 2 + 6 + 2 + 6 + 2 + 6 = 26).',
              'n = 3 permite l = 0, 1 o 2. Con l = 2, mₗ puede valer de −2 a +2, así que 0 es válido, y mₛ = +½ también.'
            ],
            resultado: 'Fe: [Ar] 4s² 3d⁶. El conjunto (3, 2, 0, +½) es válido y corresponde a un electrón 3d.'
          },
          errores: [
            'Permitir l = n (por ejemplo, n = 2, l = 2): l llega como máximo a n − 1.',
            'Llenar el 3d antes que el 4s.'
          ],
          tarjetas: [
            ['¿Qué dice el principio de exclusión de Pauli?', 'Dos electrones de un mismo átomo no pueden tener los cuatro números cuánticos iguales.'],
            ['Valores posibles de l para n = 3', '0, 1 y 2 (orbitales s, p y d).'],
            ['¿Qué es un orbital?', 'La región del espacio donde hay una probabilidad alta de encontrar al electrón.'],
            ['¿Por qué no se puede hablar de órbitas definidas?', 'Por el principio de incertidumbre de Heisenberg: no podemos conocer a la vez la posición y la velocidad exactas.'],
            ['Configuración electrónica del Cl (Z = 17)', '1s² 2s² 2p⁶ 3s² 3p⁵.']
          ]
        },
        {
          id: 'q1t3',
          nombre: 'Tabla periódica y propiedades periódicas',
          oficial: 'Origen experimental de la tabla periódica, ley periódica y agrupación por propiedades. Situar un elemento a partir de su configuración y viceversa. Tendencias periódicas razonadas con datos o con el modelo de cargas del átomo (también con la carga nuclear efectiva). La posición sirve para predecir, pero no para justificar.',
          puntos: [
            'El grupo (columna) lo marca la configuración de la capa de valencia; el periodo (fila), el valor de n más alto. Por ejemplo, ns² np⁵ son los halógenos (grupo 17).',
            'Justificación con el modelo de cargas: la atracción entre el núcleo y un electrón aumenta con la carga nuclear efectiva y disminuye con la distancia.',
            'Radio atómico: en un periodo disminuye hacia la derecha (aumenta la carga nuclear con el mismo número de capas y los electrones se atraen más). En un grupo aumenta hacia abajo (hay más capas y los electrones están más lejos).',
            'Energía de ionización (energía para arrancar un electrón de un átomo gaseoso): sigue la tendencia contraria al radio. Aumenta hacia la derecha y hacia arriba.',
            'Electronegatividad: aumenta hacia la derecha y hacia arriba. El flúor es el elemento más electronegativo.',
            'Radio de iones: un catión es más pequeño que su átomo; un anión, más grande. En iones isoelectrónicos, a más protones, menor radio.'
          ],
          errores: [
            'Justificar una tendencia diciendo «porque está más a la derecha»: los criterios piden razonar con la carga nuclear y la distancia.',
            'Decir que el radio aumenta hacia la derecha porque hay más electrones.'
          ],
          tarjetas: [
            ['¿Por qué disminuye el radio atómico a lo largo de un periodo?', 'Porque aumenta la carga nuclear efectiva con el mismo número de capas, así que los electrones son más atraídos.'],
            ['¿Por qué la energía de ionización del Na es menor que la del Li?', 'Porque el electrón de valencia del Na está en una capa más externa (n = 3), más lejos del núcleo y menos atraído.'],
            ['¿Qué grupo tiene la configuración de valencia ns¹?', 'Los metales alcalinos (grupo 1).'],
            ['Ordena por radio: Na⁺, F⁻, Mg²⁺ (isoelectrónicos)', 'F⁻ > Na⁺ > Mg²⁺: a más protones con los mismos electrones, más atracción y menor radio.']
          ]
        },
        {
          id: 'q1t4',
          nombre: 'Enlace químico y fuerzas intermoleculares',
          oficial: 'Predecir el tipo de enlace a partir de los elementos y relacionarlo con las propiedades. Energía en la formación de moléculas, cristales y macromoléculas. Estructuras de Lewis y teoría RPECV para predecir geometría y polaridad. Ciclo de Born-Haber y energía de red. Modelo de la nube electrónica en los metales. Fuerzas intermoleculares y propiedades macroscópicas.',
          noEvaluable: [
            'Las geometrías bipiramidal trigonal (AB₅) y octaédrica (AB₆).',
            'Las estructuras de Lewis con formas resonantes.',
            'Dibujar diagramas de Born-Haber (sí interpretarlos y calcular con ellos).'
          ],
          puntos: [
            'Iónico: metal + no metal (gran diferencia de electronegatividad). Forma cristales con puntos de fusión altos, frágiles; conducen fundidos o disueltos, no en estado sólido.',
            'Covalente: entre no metales. Sustancias moleculares (puntos de fusión bajos, no conducen) o covalentes reticulares (diamante, SiO₂: durísimas y con puntos de fusión muy altos).',
            'Metálico: modelo de la nube o mar de electrones deslocalizados alrededor de cationes. Explica la conductividad, el brillo, la ductilidad y la maleabilidad.',
            'Lewis: incluye los pares no enlazantes del átomo central y de los átomos vecinos.',
            'RPECV: los pares de electrones del átomo central se repelen y se alejan al máximo. AB₂ lineal (180°); AB₃ plana trigonal (120°); AB₄ tetraédrica (109,5°); AB₃E piramidal trigonal (NH₃); AB₂E₂ angular (H₂O); AB₂E angular (SO₂).',
            'Polaridad: una molécula es polar si tiene enlaces polares y su geometría no anula los momentos dipolares. El CO₂ (lineal) es apolar; el H₂O (angular), polar.',
            'Born-Haber: ΔH°f = ΔH sublimación + ½ D (disociación) + EI + AE + U (energía de red). La energía de red es más negativa cuanto mayores son las cargas y menores los radios de los iones.',
            'Fuerzas intermoleculares, de menor a mayor: dispersión de London (todas las moléculas; aumentan con el tamaño), dipolo-dipolo (moléculas polares) y enlaces de hidrógeno (H unido a F, O o N). Cuanto más intensas, mayores son los puntos de fusión y de ebullición.'
          ],
          formulas: [
            ['U = ΔH°f − (ΔH_sub + ½ D + EI + AE)', 'Energía de red despejada del ciclo de Born-Haber (para un compuesto MX con iones de carga 1).']
          ],
          ejemplo: {
            enunciado: 'Calcula la energía de red del NaCl. Datos (kJ/mol): ΔH°f(NaCl) = −411; sublimación del Na = +107,3; disociación del Cl₂ = +243,4; EI(Na) = +495,8; AE(Cl) = −348,6.',
            pasos: [
              'Solo hace falta medio mol de Cl₂: ½ · 243,4 = 121,7 kJ.',
              'Suma de las etapas sin U: 107,3 + 121,7 + 495,8 − 348,6 = 376,2 kJ.',
              'U = −411 − 376,2 = −787,2 kJ/mol.'
            ],
            resultado: 'U ≈ −787 kJ/mol.'
          },
          errores: [
            'Olvidar el ½ de la energía de disociación del Cl₂.',
            'Decir que el CO₂ es polar porque sus enlaces lo son: la geometría lineal anula los dipolos.',
            'Confundir el enlace de hidrógeno (intermolecular) con un enlace covalente O–H.'
          ],
          tarjetas: [
            ['Geometría del NH₃ según la RPECV', 'Piramidal trigonal (AB₃E): 4 pares, uno de ellos no enlazante.'],
            ['¿Por qué el CO₂ es apolar?', 'Porque es lineal y los dos dipolos C=O se anulan.'],
            ['¿Cuándo hay enlace de hidrógeno?', 'Cuando el H está unido a F, O o N y se atrae con un par libre de otro átomo muy electronegativo.'],
            ['¿Por qué los compuestos iónicos no conducen en estado sólido?', 'Porque los iones están fijos en la red; conducen fundidos o disueltos, cuando pueden moverse.'],
            ['¿De qué depende la energía de red?', 'Es más intensa con mayores cargas iónicas y menores radios.'],
            ['Geometría del H₂O', 'Angular (AB₂E₂), derivada de la tetraédrica.']
          ]
        }
      ]
    },

    /* ───────────────────────── 2. REACCIONES QUÍMICAS ───────────────────────── */
    {
      id: 'q2',
      nombre: 'Reacciones químicas',
      temas: [
        {
          id: 'q2t1',
          nombre: 'Termodinámica química',
          oficial: 'Primer principio: calor y trabajo; relación entre entalpía y energía interna (Q a presión y a volumen constantes). Ecuaciones termoquímicas, entalpía de reacción y diagramas de entalpía. Procesos endotérmicos y exotérmicos. Ley de Hess, entalpías de formación y energías de enlace. Segundo principio y entropía. Energía de Gibbs y espontaneidad según la temperatura (ΔG = trabajo útil a P y T constantes).',
          puntos: [
            'Primer principio: ΔU = Q + W (criterio IUPAC: es positivo lo que recibe el sistema).',
            'A presión constante, Qp = ΔH; a volumen constante, Qv = ΔU. Relación: ΔH = ΔU + Δn(gas) · R · T.',
            'Exotérmica: ΔH < 0, desprende calor. Endotérmica: ΔH > 0, absorbe calor. En un diagrama de entalpía, los productos quedan por debajo o por encima de los reactivos.',
            'Ley de Hess: la entalpía de reacción solo depende de los estados inicial y final, así que se pueden sumar ecuaciones (invirtiendo el signo si se invierten y multiplicando si se multiplican).',
            'Con entalpías de formación: ΔH°r = Σ n·ΔH°f(productos) − Σ n·ΔH°f(reactivos). La de los elementos en su estado estándar es 0.',
            'Con energías de enlace: ΔH ≈ Σ E(enlaces rotos) − Σ E(enlaces formados). Romper cuesta energía.',
            'Entropía (S): medida del desorden. Aumenta al pasar de sólido a líquido a gas y cuando aumentan los moles de gas.',
            'Gibbs: ΔG = ΔH − T·ΔS. Si ΔG < 0, el proceso es espontáneo. Con ΔH < 0 y ΔS < 0 solo es espontáneo a temperatura baja; con ΔH > 0 y ΔS > 0, solo a temperatura alta.',
            'Calorimetría: Q = m · c · ΔT.'
          ],
          formulas: [
            ['ΔU = Q + W', 'Primer principio.'],
            ['ΔH = ΔU + Δn(g) · R · T', 'R = 8,31 J/(mol·K); Δn(g) = moles de gas de los productos − moles de gas de los reactivos.'],
            ['ΔH°r = Σ n ΔH°f(prod) − Σ n ΔH°f(react)', 'Ley de Hess con entalpías de formación.'],
            ['ΔH ≈ Σ E(rotos) − Σ E(formados)', 'Con energías de enlace.'],
            ['ΔG = ΔH − T · ΔS', 'Ojo con las unidades: ΔS suele darse en J/K y ΔH en kJ.'],
            ['T(equilibrio) = ΔH / ΔS', 'Temperatura a la que ΔG = 0.'],
            ['Q = m · c · ΔT', 'Calorimetría; c del agua = 4,18 J/(g·K).']
          ],
          ejemplo: {
            enunciado: 'Para N₂(g) + 3 H₂(g) → 2 NH₃(g), ΔH° = −92,2 kJ y ΔS° = −198,7 J/K. ¿Es espontánea a 25 °C? ¿A partir de qué temperatura deja de serlo?',
            pasos: [
              'Se pasa ΔS a kJ/K: −198,7 J/K = −0,1987 kJ/K. T = 298 K.',
              'ΔG = −92,2 − 298 · (−0,1987) = −92,2 + 59,2 = −33,0 kJ, que es menor que 0: espontánea.',
              'ΔG = 0 cuando T = ΔH/ΔS = (−92,2) / (−0,1987) = 464 K.',
              'Como ΔH < 0 y ΔS < 0, es espontánea por debajo de esa temperatura.'
            ],
            resultado: 'Sí es espontánea a 25 °C (ΔG = −33,0 kJ) y deja de serlo por encima de unos 464 K (191 °C).'
          },
          errores: [
            'Mezclar J y kJ en ΔG = ΔH − TΔS.',
            'Olvidar multiplicar la ΔH°f por los coeficientes estequiométricos.',
            'Con energías de enlace, hacer «formados − rotos» (es al revés).',
            'Usar la temperatura en °C en lugar de en K.'
          ],
          tarjetas: [
            ['Relación entre ΔH y ΔU', 'ΔH = ΔU + Δn(g)·R·T.'],
            ['Condición de espontaneidad', 'ΔG < 0.'],
            ['ΔH < 0 y ΔS > 0: ¿cuándo es espontánea?', 'A cualquier temperatura.'],
            ['Entalpía de formación de un elemento en su estado estándar', 'Cero.'],
            ['Fórmula de la calorimetría', 'Q = m · c · ΔT.']
          ]
        },
        {
          id: 'q2t2',
          nombre: 'Cinética química',
          oficial: 'Explicaciones y predicciones con la teoría de colisiones. Velocidad de reacción y energía de activación. Influencia de las condiciones de reacción en la velocidad. Ley diferencial de velocidad y cálculo de órdenes de reacción (0, 1 o 2) a partir de datos experimentales. Diagramas de energía de reacciones de una sola etapa (reactivos, productos y estado de transición).',
          noEvaluable: [
            'Justificaciones con el modelo del estado de transición (se pide la teoría de colisiones).',
            'La ecuación de Arrhenius.'
          ],
          puntos: [
            'Teoría de colisiones: para que haya reacción, las partículas deben chocar con energía suficiente (igual o mayor que la energía de activación) y con la orientación adecuada (choques eficaces).',
            'Concentración (o presión de gases): más partículas por volumen, más choques y más velocidad.',
            'Temperatura: aumenta la energía cinética, de modo que hay más choques y, sobre todo, una mayor fracción de choques con energía suficiente.',
            'Superficie de contacto: un sólido pulverizado reacciona más rápido.',
            'Catalizador: ofrece un camino con menor energía de activación. No cambia ΔH ni la posición del equilibrio y no se consume.',
            'Ley de velocidad: v = k · [A]ᵐ · [B]ⁿ. Los órdenes m y n se determinan experimentalmente, no a partir de los coeficientes.',
            'Método de las velocidades iniciales: si al duplicar [A] la velocidad se duplica, el orden es 1; si se cuadruplica, 2; si no cambia, 0.',
            'Diagrama de energía: los reactivos, el máximo (estado de transición) y los productos. Ea = energía del máximo − energía de los reactivos.'
          ],
          formulas: [
            ['v = k · [A]ᵐ · [B]ⁿ', 'Orden total = m + n.'],
            ['Unidades de k', 'Orden 1: s⁻¹; orden 2: L·mol⁻¹·s⁻¹; orden 3: L²·mol⁻²·s⁻¹.']
          ],
          ejemplo: {
            enunciado: 'Para A + B → C: con [A] = 0,10 M y [B] = 0,10 M, v = 2,0 · 10⁻³ M/s. Con [A] = 0,20 M y [B] = 0,10 M, v = 8,0 · 10⁻³ M/s. Con [A] = 0,10 M y [B] = 0,20 M, v = 4,0 · 10⁻³ M/s. Halla los órdenes y k.',
            pasos: [
              'Al duplicar [A] con [B] fija, v se multiplica por 4 = 2², así que el orden respecto a A es 2.',
              'Al duplicar [B] con [A] fija, v se multiplica por 2 = 2¹, así que el orden respecto a B es 1.',
              'v = k[A]²[B], de donde k = 2,0 · 10⁻³ / (0,10² · 0,10) = 2,0.'
            ],
            resultado: 'v = k[A]²[B], orden total 3 y k = 2,0 L²·mol⁻²·s⁻¹.'
          },
          errores: [
            'Tomar los coeficientes estequiométricos como órdenes de reacción.',
            'Decir que el catalizador desplaza el equilibrio o cambia ΔH.',
            'Justificar con el estado de transición en lugar de con la teoría de colisiones.'
          ],
          tarjetas: [
            ['¿Qué hace un catalizador?', 'Disminuye la energía de activación (camino alternativo) sin cambiar ΔH ni el equilibrio.'],
            ['Requisitos de un choque eficaz', 'Energía suficiente (≥ Ea) y orientación adecuada.'],
            ['Si al duplicar [A] la velocidad se cuadruplica, ¿qué orden tiene A?', 'Orden 2.'],
            ['¿Por qué la temperatura aumenta la velocidad?', 'Porque aumenta la fracción de choques con energía igual o mayor que la Ea (y la frecuencia de choques).'],
            ['Unidades de k para orden total 2', 'L·mol⁻¹·s⁻¹.']
          ]
        },
        {
          id: 'q2t3',
          nombre: 'Equilibrio químico',
          oficial: 'Equilibrio como proceso dinámico. Constante de equilibrio por la ley de acción de masas, incluidas reacciones con reactivos en distinto estado. Relación entre Kc y Kp. Producto de solubilidad y su relación con la solubilidad. Principio de Le Châtelier y cociente de reacción. Factores que afectan al equilibrio. Las constantes se expresan sin unidades; Kp en atm (no en Pa).',
          noEvaluable: [
            'Calcular las presiones parciales en el equilibrio a partir de Kp y de los datos iniciales.',
            'Predecir si precipita al mezclar dos disoluciones comparando Q y Kps.',
            'Diagramas de fases de una sustancia pura.'
          ],
          puntos: [
            'En el equilibrio las reacciones directa e inversa siguen ocurriendo a la misma velocidad, así que las concentraciones no cambian (equilibrio dinámico).',
            'Para aA + bB ⇌ cC + dD: Kc = [C]ᶜ[D]ᵈ / ([A]ᵃ[B]ᵇ). Los sólidos y los líquidos puros no aparecen en la expresión.',
            'Kp = Kc · (R·T)^Δn, con R = 0,082 atm·L/(mol·K) y Δn = moles de gas de los productos − de los reactivos.',
            'Cociente de reacción Q: si Q < K, la reacción avanza hacia los productos; si Q > K, hacia los reactivos; si Q = K, está en equilibrio.',
            'Le Châtelier: el sistema se desplaza para contrarrestar la perturbación. Si se añade un reactivo, se desplaza hacia los productos. Si aumenta la presión (o disminuye el volumen), hacia donde hay menos moles de gas. Si aumenta la temperatura, en el sentido endotérmico. Un catalizador no lo desplaza.',
            'Solo la temperatura cambia el valor de K.',
            'Solubilidad: para AB(s) ⇌ A⁺ + B⁻, Kps = s². Para AB₂, Kps = 4s³.',
            'Efecto del ion común: añadir uno de los iones disminuye la solubilidad.'
          ],
          formulas: [
            ['Kc = [C]ᶜ[D]ᵈ / ([A]ᵃ[B]ᵇ)', 'Concentraciones en el equilibrio (mol/L). Sin unidades según los criterios.'],
            ['Kp = Kc · (R·T)^Δn', 'R = 0,082 atm·L·mol⁻¹·K⁻¹; T en K.'],
            ['Kps = s² (tipo AB)  ·  Kps = 4s³ (tipo AB₂)', 's = solubilidad en mol/L.']
          ],
          ejemplo: {
            enunciado: 'En un recipiente de 10,0 L se introducen 1,00 mol de H₂ y 1,00 mol de I₂. En el equilibrio H₂ + I₂ ⇌ 2 HI quedan 0,22 mol de I₂. Calcula Kc.',
            pasos: [
              'Han reaccionado x = 1,00 − 0,22 = 0,78 mol de I₂ (y lo mismo de H₂).',
              'En el equilibrio hay 0,22 mol de H₂, 0,22 mol de I₂ y 2 · 0,78 = 1,56 mol de HI.',
              'Concentraciones: [H₂] = [I₂] = 0,022 M y [HI] = 0,156 M.',
              'Kc = 0,156² / (0,022 · 0,022) = 0,02434 / 0,000484 = 50,3.'
            ],
            resultado: 'Kc ≈ 50 (sin unidades).'
          },
          errores: [
            'Incluir sólidos o líquidos puros en la expresión de K.',
            'Usar moles en lugar de concentraciones (aquí da igual porque Δn = 0, pero en general no).',
            'Pensar que aumentar la presión cambia el valor de K.',
            'Usar Pa en Kp: los criterios piden atm.'
          ],
          tarjetas: [
            ['¿Qué factor cambia el valor de K?', 'Solo la temperatura.'],
            ['Si Q < K, ¿hacia dónde evoluciona el sistema?', 'Hacia los productos.'],
            ['Relación entre Kc y Kp', 'Kp = Kc·(RT)^Δn.'],
            ['Kps de una sal tipo AB₂ en función de s', 'Kps = 4s³.'],
            ['Efecto de aumentar la presión en N₂ + 3 H₂ ⇌ 2 NH₃', 'Se desplaza hacia la derecha, donde hay menos moles de gas (2 frente a 4).'],
            ['¿Qué es el efecto del ion común?', 'La disminución de la solubilidad de una sal al añadir uno de sus iones.']
          ]
        },
        {
          id: 'q2t4',
          nombre: 'Reacciones ácido-base',
          oficial: 'Teorías de Arrhenius y de Brønsted-Lowry. Ácidos y bases fuertes y débiles; grado de disociación. Cálculo del pH de disoluciones ácidas y básicas. Ka y Kb; pares conjugados. Carácter ácido o básico por hidrólisis de sales (solo cualitativo). Neutralización y cálculos estequiométricos; volumetrías ácido-base (procedimiento, material, indicadores y curva de valoración de ácido o base fuertes).',
          noEvaluable: [
            'Calcular el pH de disoluciones de sales (sí se pueden pedir explicaciones cualitativas, salvo cuando los dos iones reaccionan con el agua).',
            'Relación entre propiedades y aplicaciones industriales de ácidos y bases.'
          ],
          puntos: [
            'Arrhenius: un ácido libera H⁺ en agua y una base, OH⁻. Brønsted-Lowry: un ácido cede H⁺ y una base lo acepta. Así se forman pares conjugados: HA / A⁻.',
            'Fuertes (HCl, HNO₃, H₂SO₄ en su primera disociación, NaOH, KOH): se disocian totalmente. Débiles (CH₃COOH, NH₃): se disocian parcialmente; Ka o Kb.',
            'Kw = [H₃O⁺]·[OH⁻] = 1,0 · 10⁻¹⁴ a 25 °C, de donde pH + pOH = 14. Para un par conjugado, Ka · Kb = Kw.',
            'Ácido débil HA de concentración c: Ka = c·α² / (1 − α); [H₃O⁺] = c·α. Si α es pequeño, [H₃O⁺] ≈ √(Ka·c).',
            'Hidrólisis (cualitativa): una sal de ácido fuerte y base débil (NH₄Cl) da disolución ácida; una de ácido débil y base fuerte (CH₃COONa), básica; una de ácido fuerte y base fuerte (NaCl), neutra.',
            'Neutralización: en el punto de equivalencia, moles de H⁺ = moles de OH⁻ (teniendo en cuenta la estequiometría).',
            'Volumetría: se mide un volumen exacto con pipeta aforada y se pone en un Erlenmeyer con unas gotas de indicador. Desde la bureta se añade la disolución patrón hasta el viraje del indicador, que debe cambiar de color en un intervalo que incluya el pH de equivalencia.',
            'En la valoración ácido fuerte-base fuerte, el punto de equivalencia está a pH = 7 y la curva tiene un salto brusco; sirven la fenolftaleína o el azul de bromotimol.',
            'Al diluir 10 veces un ácido fuerte, el pH sube 1 unidad; en un ácido débil sube menos, porque aumenta su grado de disociación.'
          ],
          formulas: [
            ['pH = −log [H₃O⁺]', 'pOH = −log [OH⁻]; pH + pOH = 14 (a 25 °C).'],
            ['Ka = [A⁻][H₃O⁺] / [HA] = c·α² / (1 − α)', 'Ácido débil; α = grado de disociación.'],
            ['Ka · Kb = Kw = 1,0 · 10⁻¹⁴', 'Par ácido-base conjugado a 25 °C.'],
            ['n = M · V', 'Moles = molaridad · volumen (L), para la estequiometría de la valoración.']
          ],
          ejemplo: {
            enunciado: 'Calcula el pH y el grado de disociación de una disolución 0,10 M de ácido acético (Ka = 1,8 · 10⁻⁵).',
            pasos: [
              'CH₃COOH + H₂O ⇌ CH₃COO⁻ + H₃O⁺. En el equilibrio hay 0,10 − x, x y x.',
              'Ka = x² / (0,10 − x) = 1,8 · 10⁻⁵. Aproximando 0,10 − x ≈ 0,10: x = √(1,8 · 10⁻⁶) = 1,34 · 10⁻³ M.',
              'Comprobación: x es el 1,3 % de 0,10 (menos del 5 %), así que la aproximación es válida.',
              'pH = −log(1,34 · 10⁻³) = 2,87; α = 1,34 · 10⁻³ / 0,10 = 0,0134.'
            ],
            resultado: 'pH ≈ 2,87 (2,88 resolviendo la ecuación de 2.º grado) y α ≈ 1,3 %.'
          },
          errores: [
            'Calcular el pH de un ácido débil como si fuera fuerte (pH = −log c).',
            'Olvidar el pOH en las bases: primero [OH⁻], después el pOH y luego el pH.',
            'Calcular el pH de una sal (no entra en la PAU 2026; solo el razonamiento cualitativo).'
          ],
          tarjetas: [
            ['Base conjugada del NH₄⁺', 'NH₃.'],
            ['pH de una disolución de NaOH 0,010 M', 'pOH = 2, así que pH = 12.'],
            ['¿Por qué una disolución de CH₃COONa es básica?', 'Porque el CH₃COO⁻ (base conjugada de un ácido débil) capta H⁺ del agua y libera OH⁻.'],
            ['¿Qué indicador elegirías para valorar HCl con NaOH?', 'Uno que vire cerca de pH 7, como el azul de bromotimol (la fenolftaleína también sirve por el salto brusco).'],
            ['Material de una volumetría', 'Bureta, pipeta aforada (con aspirador), Erlenmeyer, soporte con pinzas e indicador.'],
            ['Valor de Kw a 25 °C', '1,0 · 10⁻¹⁴.']
          ]
        },
        {
          id: 'q2t5',
          nombre: 'Reacciones redox y electroquímica',
          oficial: 'Número de oxidación; especies que se oxidan y se reducen. Cálculos estequiométricos. Potencial estándar de un par redox y espontaneidad de procesos con dos pares. Leyes de Faraday y cálculos en cubas electrolíticas. Baterías, cubas electrolíticas, pilas de combustible y prevención de la corrosión. Ajustar semirreacciones con sus electrones y escribir la reacción global (no se ajustará en medio ácido o básico, salvo la electrólisis del agua).',
          noEvaluable: [
            'Ajustar ecuaciones redox completas por el método del ion-electrón como pregunta directa.',
            'Volumetrías redox (trabajo práctico 2.5).'
          ],
          puntos: [
            'Oxidación: pérdida de electrones (sube el número de oxidación). Reducción: ganancia de electrones (baja el número de oxidación).',
            'El oxidante se reduce y el reductor se oxida.',
            'Pila galvánica (espontánea): en el ánodo (−) hay oxidación y en el cátodo (+), reducción. El puente salino cierra el circuito y mantiene la electroneutralidad. Ejemplo, la pila Daniell: Zn | Zn²⁺ || Cu²⁺ | Cu.',
            'E°pila = E°cátodo − E°ánodo. Si es mayor que 0, el proceso es espontáneo (ΔG° = −n·F·E° < 0).',
            'El par con mayor potencial de reducción actúa como cátodo (se reduce); el de menor, como ánodo (se oxida).',
            'Electrólisis (no espontánea): una fuente externa fuerza la reacción. El cátodo (−) sigue siendo donde hay reducción y el ánodo (+), donde hay oxidación.',
            'Leyes de Faraday: la cantidad de sustancia depositada es proporcional a la carga. Q = I·t; moles de e⁻ = Q/F.',
            'Corrosión: oxidación de los metales. Se previene con pintura o recubrimientos, con galvanizado (capa de Zn) o con un ánodo de sacrificio (un metal más reductor, como Zn o Mg, se oxida en lugar del hierro).',
            'Pila de combustible: H₂ + ½ O₂ → H₂O, con producción de energía eléctrica. Baterías recargables: funcionan como pila al descargarse y como cuba electrolítica al cargarse.'
          ],
          formulas: [
            ['E°pila = E°cátodo − E°ánodo', 'Potenciales estándar de reducción.'],
            ['ΔG° = −n · F · E°', 'F = 96 485 C/mol; n = electrones intercambiados.'],
            ['m = (I · t · M) / (n · F)', 'Masa depositada en una electrólisis; t en segundos.']
          ],
          ejemplo: {
            enunciado: 'Se electroliza una disolución de CuSO₄ con 2,00 A durante 30,0 minutos. ¿Qué masa de cobre se deposita? (M(Cu) = 63,55 g/mol; F = 96 485 C/mol)',
            pasos: [
              'Semirreacción en el cátodo: Cu²⁺ + 2 e⁻ → Cu.',
              'Q = I · t = 2,00 A · 1 800 s = 3 600 C.',
              'Moles de e⁻ = 3 600 / 96 485 = 0,0373 mol; moles de Cu = 0,0373 / 2 = 0,01866 mol.',
              'm = 0,01866 mol · 63,55 g/mol = 1,19 g.'
            ],
            resultado: 'Se depositan unos 1,19 g de cobre en el cátodo.'
          },
          errores: [
            'Olvidar pasar los minutos a segundos.',
            'Multiplicar E° por los coeficientes estequiométricos (el potencial no depende de la cantidad).',
            'Confundir el signo de los electrodos: en la pila el ánodo es −; en la electrólisis el ánodo es +. Pero siempre hay oxidación en el ánodo.'
          ],
          tarjetas: [
            ['¿Qué ocurre en el ánodo?', 'La oxidación (tanto en pilas como en electrólisis).'],
            ['E° de la pila Daniell (E°Cu²⁺/Cu = +0,34 V; E°Zn²⁺/Zn = −0,76 V)', '0,34 − (−0,76) = 1,10 V.'],
            ['¿Qué es un ánodo de sacrificio?', 'Un metal más reductor (Zn, Mg) que se oxida en lugar del metal que se quiere proteger.'],
            ['Relación entre carga y moles de electrones', 'n(e⁻) = Q / F, con Q = I·t.'],
            ['Diferencia entre pila y cuba electrolítica', 'La pila produce electricidad con una reacción espontánea; la cuba consume electricidad para forzar una reacción no espontánea.']
          ]
        }
      ]
    },

    /* ───────────────────────── 3. QUÍMICA ORGÁNICA ───────────────────────── */
    {
      id: 'q3',
      nombre: 'Química orgánica',
      temas: [
        {
          id: 'q3t1',
          nombre: 'Isomería',
          oficial: 'Fórmulas moleculares y desarrolladas (con estructuras de Lewis y los pares libres de los heteroátomos en alcoholes, éteres, aldehídos, cetonas, ácidos, ésteres, aminas y amidas). Isomería constitucional (de cadena, de posición y de función): formular y nombrar isómeros a partir de una fórmula molecular. Estereoisomería: geométrica (cis/trans en alquenos, que se deben saber dibujar) y óptica (con un solo centro quiral). Diferencias de propiedades entre isómeros.',
          noEvaluable: [
            'El uso de modelos moleculares o representaciones 3D (recomendado, pero no evaluable).',
            'Dibujar los enantiómeros en perspectiva o asignar la configuración R/S.'
          ],
          puntos: [
            'Isómeros: compuestos con la misma fórmula molecular y distinta estructura.',
            'Constitucionales de cadena (butano y metilpropano), de posición (propan-1-ol y propan-2-ol) y de función (etanol y dimetiléter; propanal y propanona).',
            'Geométrica (cis/trans): en alquenos en los que cada carbono del doble enlace tiene dos sustituyentes distintos. Cis: los grupos iguales al mismo lado; trans: a lados opuestos. Ejemplo: but-2-eno.',
            'Óptica: un carbono asimétrico (quiral) tiene cuatro sustituyentes distintos. Los dos enantiómeros son imágenes especulares no superponibles.',
            'Propiedades: los isómeros de cadena y de posición son parecidos (mismo grupo funcional); los de función son muy diferentes. Los geométricos son diferentes pero parecidos. Los enantiómeros tienen las mismas propiedades físicas salvo la actividad óptica (desvían la luz polarizada en sentidos opuestos) y pueden reaccionar de forma distinta con moléculas quirales, como las enzimas.',
            'Formulación: un error de formulación resta 0,5 puntos en el apartado, así que conviene repasar la nomenclatura.'
          ],
          ejemplo: {
            enunciado: 'Escribe y nombra dos isómeros de función de fórmula C₃H₆O.',
            pasos: [
              'C₃H₆O tiene una insaturación: puede ser un aldehído o una cetona.',
              'Aldehído: CH₃–CH₂–CHO, propanal.',
              'Cetona: CH₃–CO–CH₃, propanona (acetona).'
            ],
            resultado: 'El propanal y la propanona son isómeros de función.'
          },
          errores: [
            'Decir que el but-1-eno tiene isomería cis/trans: uno de sus carbonos del doble enlace tiene dos H.',
            'Buscar un carbono quiral en un C con dos grupos iguales.'
          ],
          tarjetas: [
            ['¿Qué condición debe cumplir un alqueno para tener isomería cis/trans?', 'Cada carbono del doble enlace debe tener dos sustituyentes distintos.'],
            ['¿Qué es un carbono asimétrico?', 'Un carbono unido a cuatro sustituyentes diferentes.'],
            ['¿En qué se diferencian dos enantiómeros?', 'En la actividad óptica y en su interacción con otras moléculas quirales; el resto de propiedades físicas son iguales.'],
            ['Isómero de función del etanol', 'El dimetiléter (CH₃–O–CH₃).'],
            ['Tipo de isomería entre propan-1-ol y propan-2-ol', 'Constitucional de posición.']
          ]
        },
        {
          id: 'q3t2',
          nombre: 'Reactividad orgánica',
          oficial: 'Identificar los principales tipos de reacciones orgánicas: sustitución, adición, eliminación, condensación, hidrólisis y ácido-base. Solo se pide reconocer el tipo dada la reacción; no predecir qué reacción ocurrirá ni sus productos.',
          noEvaluable: [
            'Predecir los productos o el tipo de reacción que experimentarán unos reactivos.',
            'La regla de Markovnikov y la de Saytzeff.',
            'La hidrólisis de éteres y de nitrilos.',
            'Las propiedades químicas de las distintas funciones orgánicas en general.'
          ],
          puntos: [
            'Sustitución: un átomo o grupo se cambia por otro. Ejemplo: CH₄ + Cl₂ → CH₃Cl + HCl (halogenación de alcanos con luz).',
            'Adición: un doble o triple enlace se rompe y se añaden átomos. Ejemplo: CH₂=CH₂ + H₂ → CH₃–CH₃, o la adición de HBr, H₂O o Br₂.',
            'Eliminación: se pierde una molécula pequeña y se forma un doble enlace. Ejemplo: deshidratación del etanol a eteno + H₂O.',
            'Condensación: dos moléculas se unen liberando una pequeña (normalmente H₂O). Ácido + alcohol → éster + H₂O (esterificación). Ácido + amina → amida + H₂O.',
            'Hidrólisis: el agua rompe una molécula, al revés que la condensación. Éster + H₂O → ácido + alcohol; amida + H₂O → ácido + amina.',
            'Ácido-base: los ácidos carboxílicos se desprotonan con bases débiles (NaHCO₃) y fuertes (NaOH). Los fenoles son más débiles y necesitan bases fuertes. Las aminas se protonan con ácidos como el HCl diluido.',
            'Conexión con la biología: los triglicéridos son ésteres (glicerina + ácidos grasos) y las proteínas tienen enlaces amida (peptídicos).'
          ],
          errores: [
            'Confundir adición (desaparece un enlace múltiple) con sustitución (se mantiene el número de enlaces).',
            'Confundir eliminación (aparece un doble enlace) con condensación (se unen dos moléculas).'
          ],
          tarjetas: [
            ['CH₃COOH + CH₃OH → CH₃COOCH₃ + H₂O: ¿qué tipo de reacción es?', 'Condensación (esterificación).'],
            ['CH₂=CH₂ + Br₂ → CH₂Br–CH₂Br', 'Adición.'],
            ['CH₃CH₂OH → CH₂=CH₂ + H₂O', 'Eliminación (deshidratación).'],
            ['¿Qué base hace falta para desprotonar un fenol?', 'Una base fuerte, como el NaOH (el NaHCO₃ no basta).'],
            ['¿Qué es la hidrólisis de un éster?', 'La reacción del éster con agua para dar el ácido carboxílico y el alcohol (lo contrario de la esterificación).']
          ]
        },
        {
          id: 'q3t3',
          nombre: 'Polímeros',
          oficial: 'Concepto de polímero y unidad repetitiva. Polimerización por adición y por condensación según los monómeros. Identificar por su estructura los polímeros de los códigos de reciclaje: HDPE, LDPE, PP, PS, PVC, PET y poliamidas. Termoplásticos, termoestables y elastómeros (reticulación, rigidez, elasticidad y reciclabilidad). Clasificación por naturaleza (natural o sintético), estructura (lineal o ramificado, reticulado o no) y composición (homopolímero o copolímero; poliolefinas, poliésteres, poliamidas, poliéteres).',
          noEvaluable: [
            'Las propiedades y los usos concretos de cada polímero.',
            'Aplicaciones, propiedades y riesgos medioambientales asociados.'
          ],
          puntos: [
            'Polímero: macromolécula formada por la repetición de una unidad (monómero).',
            'Adición: monómeros con un doble enlace C=C que se abre; no se pierde ningún átomo. Polietileno (de eteno), polipropileno (de propeno), poliestireno (de estireno), PVC (de cloruro de vinilo, CH₂=CHCl).',
            'Condensación: monómeros con dos grupos funcionales que reaccionan liberando una molécula pequeña (H₂O). PET, un poliéster (diácido + dialcohol); nailon y otras poliamidas (diácido + diamina).',
            'HDPE: lineal, cadenas muy empaquetadas, más denso y rígido. LDPE: ramificado, menos denso y más flexible.',
            'Termoplásticos (no reticulados): se ablandan con el calor y se pueden remoldear y reciclar (PE, PP, PS, PVC, PET). Termoestables (muy reticulados): rígidos, no se funden y no se reciclan fundiéndolos (baquelita). Elastómeros (poco reticulados): elásticos (caucho).',
            'Naturales: polipéptidos (proteínas), polisacáridos y ácidos nucleicos. Sintéticos: PE, PP, PS…',
            'Homopolímero: un solo tipo de monómero (PP). Copolímero: dos o más (caucho de estireno-butadieno).'
          ],
          errores: [
            'Decir que el PET se forma por adición: es un poliéster de condensación.',
            'Confundir reticulado (termoestable) con ramificado (LDPE).'
          ],
          tarjetas: [
            ['¿De qué monómero se obtiene el PVC y por qué tipo de reacción?', 'Del cloruro de vinilo (CH₂=CHCl), por adición.'],
            ['¿Por qué un termoestable no se puede reciclar fundiéndolo?', 'Porque sus cadenas están muy reticuladas (unidas por enlaces covalentes) y no se funden: se descomponen.'],
            ['Diferencia estructural entre HDPE y LDPE', 'El HDPE es lineal; el LDPE, ramificado.'],
            ['¿Qué monómeros forman una poliamida como el nailon?', 'Un diácido carboxílico y una diamina (por condensación, liberando agua).'],
            ['Tres polímeros naturales', 'Proteínas (polipéptidos), polisacáridos y ácidos nucleicos.']
          ]
        }
      ]
    },

    /* ───────────────────────── TRABAJOS PRÁCTICOS Y SEGURIDAD ───────────────────────── */
    {
      id: 'q4',
      nombre: 'Trabajos prácticos y seguridad',
      temas: [
        {
          id: 'q4t1',
          nombre: 'Prácticas de laboratorio y pictogramas',
          oficial: 'Pueden preguntarse directamente los trabajos experimentales de 2.º de bachillerato: 2.1 calor de reacción; 2.2 cinética; 2.3 desplazamiento del equilibrio; 2.4 volumetrías ácido-base; 2.6 pilas, cubas electrolíticas y corrosión. Solo se pedirá describir el procedimiento con material en 2.4 (valoración, preparación de disoluciones, efecto de la dilución en el pH, elección del indicador, curva de valoración ácido o base fuertes) y en 2.6 (medir la fuerza electromotriz de una pila, hacer una electrólisis). También los 9 pictogramas de peligro y las medidas preventivas.',
          noEvaluable: [
            'Trabajo práctico 2.5 (estequiometría y volumetrías redox) como práctica.',
            'Trabajo práctico 2.7 (modelos moleculares y representación 3D).'
          ],
          puntos: [
            'Preparar una disolución a partir de un sólido: calcular la masa, pesarla en una balanza, disolver en un vaso de precipitados, pasar a un matraz aforado y enrasar con agua destilada.',
            'Diluir: calcular el volumen con c₁·V₁ = c₂·V₂, tomarlo con una pipeta aforada, pasarlo al matraz aforado y enrasar.',
            'Valoración: bureta con la disolución patrón; pipeta aforada para la muestra en el Erlenmeyer, con unas gotas de indicador; añadir gota a gota agitando hasta que cambie de color y anotar el volumen.',
            'Medir la fuerza electromotriz de una pila: dos semiceldas (cada metal en una disolución de su sal), un puente salino (por ejemplo, de KNO₃) y un voltímetro conectado a los electrodos.',
            'Electrólisis: una fuente de corriente continua y dos electrodos en la disolución; se observa qué se deposita o qué gas se desprende en cada electrodo.',
            'Calor de reacción: un calorímetro (vaso aislado con termómetro); Q = m·c·ΔT.',
            'Los 9 pictogramas de peligro (rombos rojos): explosivo, inflamable, comburente, gas a presión, corrosivo, toxicidad aguda, irritante o nocivo (signo de exclamación), peligro grave para la salud (por aspiración, carcinógeno…) y peligroso para el medio ambiente.',
            'Seguridad: bata, gafas y guantes; trabajar en la vitrina con sustancias volátiles; no pipetear con la boca; añadir siempre el ácido sobre el agua.'
          ],
          formulas: [['c₁ · V₁ = c₂ · V₂', 'Dilución: los moles de soluto se conservan.']],
          errores: [
            'Usar una probeta para medir el volumen exacto de una valoración: se usa una pipeta aforada.',
            'Echar agua sobre un ácido concentrado (debe ser el ácido sobre el agua).'
          ],
          tarjetas: [
            ['¿Qué material se usa para medir un volumen exacto de muestra en una valoración?', 'Una pipeta aforada (con aspirador o propipeta).'],
            ['Fórmula para preparar una dilución', 'c₁·V₁ = c₂·V₂.'],
            ['¿Para qué sirve el puente salino?', 'Para cerrar el circuito y mantener la neutralidad eléctrica de las semiceldas.'],
            ['¿Qué indica el pictograma de la llama sobre un círculo?', 'Comburente (oxidante): puede provocar o agravar un incendio.'],
            ['¿Cuántos pictogramas de peligro hay en el sistema actual?', 'Nueve.']
          ]
        }
      ]
    }
  ]
});
