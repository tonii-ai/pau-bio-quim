/*
 * Fuentes oficiales y estado de verificación.
 * Si actualizas el temario con una fuente nueva, añádela aquí con su fecha de consulta.
 */
window.PAU = window.PAU || {};

PAU.fuentes = {
  consulta: '2026-10-31',
  comunidad: 'Cataluña',
  convocatoria: 'PAU 2027, convocatoria ordinaria (junio)',

  lista: [
    {
      id: 'qui-orient-2026',
      titulo: 'Orientacions per a l’examen de la matèria Química de les PAU-2026',
      entidad: 'Generalitat de Catalunya · Canal Universitats (grupo de coordinación de Química)',
      url: 'https://universitats.gencat.cat/web/.content/01_acces_i_admissio/proves-acces-PAU-PAP/ambits/quimica/02_PAU26_Quimica_Orientacions.pdf',
      uso: 'Saberes evaluables y no evaluables de Química, precisiones y trabajos prácticos.'
    },
    {
      id: 'bio-orient-2026',
      titulo: 'Orientacions al currículum de Biologia (documento «Orientacions 2026»)',
      entidad: 'Universitat de Barcelona · Coordinación PAU de Biología',
      url: 'https://web.ub.edu/documents/32640430/38640741/Orientacions+2026.pdf/65df2eb5-2fc4-6ec8-32a6-9276cf840c25?t=1761055071895',
      uso: 'Bloques y saberes de Biología evaluables en la PAU y su grado de profundidad.'
    },
    {
      id: 'bio-examen-2025',
      titulo: 'Examen de Biología PAU 2025, convocatoria ordinaria (enunciado en castellano)',
      entidad: 'Generalitat de Catalunya · Canal Universitats',
      url: 'https://universitats.gencat.cat/web/.content/06_pau/models-examen-anys-anteriors/examens-2025/biologia/ord/pau_biol25jl_es.pdf',
      uso: 'Estructura del examen observada en 2025.'
    },
    {
      id: 'bio-criterios-2025',
      titulo: 'Criterios de corrección de Biología PAU 2025, convocatoria ordinaria',
      entidad: 'Generalitat de Catalunya · Canal Universitats',
      url: 'https://universitats.gencat.cat/web/.content/06_pau/models-examen-anys-anteriors/examens-2025/biologia/ord/pau_biol25jp_tei.pdf',
      uso: 'Cómo se puntúan los apartados.'
    },
    {
      id: 'qui-examen-2025',
      titulo: 'Examen de Química PAU 2025, convocatoria ordinaria (enunciado en castellano)',
      entidad: 'Generalitat de Catalunya · Canal Universitats',
      url: 'https://universitats.gencat.cat/web/.content/06_pau/models-examen-anys-anteriors/examens-2025/quimica/ord/pau_quim25jl_es.pdf',
      uso: 'Estructura del examen observada en 2025.'
    },
    {
      id: 'qui-criterios-2025',
      titulo: 'Criterios de corrección de Química PAU 2025, convocatoria ordinaria',
      entidad: 'Generalitat de Catalunya · Canal Universitats',
      url: 'https://universitats.gencat.cat/web/.content/06_pau/models-examen-anys-anteriors/examens-2025/quimica/ord/pau_quim25jp_tei.pdf',
      uso: 'Reparto de puntos y penalización por errores de formulación.'
    },
    {
      id: 'modelos',
      titulo: 'Models d’exàmens d’anys anteriors',
      entidad: 'Generalitat de Catalunya · Canal Universitats',
      url: 'https://universitats.gencat.cat/ca/pau/models-examen-anys-anteriors/',
      uso: 'Exámenes oficiales reales con sus criterios de corrección, para practicar.'
    },
    {
      id: 'ub-bio',
      titulo: 'Web de la PAU de Biología',
      entidad: 'Universitat de Barcelona',
      url: 'https://web.ub.edu/ca/web/pau-biologia/',
      uso: 'Orientaciones, exámenes, preguntas por temas y esquema general del metabolismo.'
    },
    {
      id: 'pau-gencat',
      titulo: 'PAU · Canal Universitats',
      entidad: 'Generalitat de Catalunya',
      url: 'https://universitats.gencat.cat/ca/pau/index.html',
      uso: 'Información general, calendario y matrícula.'
    },
    {
      id: 'decret',
      titulo: 'Decret 171/2022, de 20 de setembre, d’ordenació dels ensenyaments de batxillerat',
      entidad: 'Portal Jurídic de Catalunya',
      url: 'https://portaljuridic.gencat.cat/ca/document-del-pjur/?documentId=938056',
      uso: 'Currículo oficial de Biología y Química en el que se basan las orientaciones.'
    }
  ],

  // Lo comprobado y lo que sigue pendiente. Se muestra en la pantalla «Fuentes».
  verificado: [
    'Temario de Química: saberes evaluables y no evaluables de la PAU 2026, según las orientaciones oficiales.',
    'Temario de Biología: bloques y saberes de las orientaciones de la coordinación de Biología, publicadas como «Orientacions 2026».',
    'Formato de Química en la convocatoria ordinaria de 2025: 4 ejercicios obligatorios de 2,5 puntos. Los ejercicios 1 a 3 tienen dos apartados de 1,25 puntos y en el 4 se responden 2 de las 4 cuestiones. Se permite calculadora no programable. Un error de formulación resta 0,5 puntos en ese apartado.',
    'Formato de Biología en la convocatoria ordinaria de 2025: 4 ejercicios obligatorios de 2,5 puntos, divididos en apartados.',
    'Hay versión del examen en castellano (los enunciados de 2025 se publican también en castellano).'
  ],
  pendiente: [
    'Las orientaciones específicas para la PAU 2027 no estaban publicadas el 31-10-2026. Cuando salgan, hay que compararlas con este temario.',
    'La fecha oficial de la PAU 2027 no estaba confirmada. Algunos calendarios universitarios dan el 1-3 de junio de 2027 y otros el 2-4 de junio. La extraordinaria pasa a julio (6-8 de julio de 2027, según los mismos calendarios provisionales).',
    'La duración exacta de cada examen no figura en los documentos consultados. El simulacro usa 90 minutos por defecto y se puede cambiar.',
    'Qué día de la PAU cae cada asignatura en 2027.',
    'El formato de 2027 podría cambiar respecto al de 2025 (por ejemplo, en 2023 Biología dejaba elegir ejercicios).'
  ],

  calendario: [
    {
      titulo: 'Calendario académico 2026-2027 de la UAB (fechas previstas de la PAU, no oficial)',
      url: 'https://www.uab.cat/doc/DOC_Calendari_Academic_2026-2027'
    },
    {
      titulo: 'Ara: desde 2027 la extraordinaria se hará en julio',
      url: 'https://es.ara.cat/sociedad/educacion/adios-selectividad-septiembre-partir-2027-repesca-realizara-julio_1_5597453.amp.html'
    }
  ]
};
