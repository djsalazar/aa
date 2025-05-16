/**
 * dataCapa5.js - Capa de Sistema de Evaluación por Niveles de Dominio
 * Estructura de datos conceptualizada para la visualización de la Capa 5 del MOFJ
 */

const dataCapa5 = (function() {
    // Definición de niveles de dominio
    const nivelesDominio = [
        {
            id: "ND001",
            nivel: 1,
            nombre: "Básico",
            descripcion: "Conoce los conceptos fundamentales y puede aplicarlos en situaciones sencillas y estructuradas con orientación."
        },
        {
            id: "ND002",
            nivel: 2,
            nombre: "Intermedio",
            descripcion: "Comprende y aplica los conceptos en diversas situaciones con cierta autonomía y puede resolver problemas habituales."
        },
        {
            id: "ND003",
            nivel: 3,
            nombre: "Avanzado",
            descripcion: "Analiza situaciones complejas, toma decisiones fundamentadas y aplica criterios propios en contextos diversos."
        },
        {
            id: "ND004",
            nivel: 4,
            nombre: "Experto",
            descripcion: "Crea soluciones innovadoras, evalúa y sintetiza información compleja, y puede enseñar o transferir conocimiento a otros."
        }
    ];

    // Indicadores de logro por competencia y nivel
    const indicadoresLogro = [
        // Competencia: Aplica el marco normativo en materia de insolvencia (CF001)
        {
            competencia_id: "CF001",
            nivel_id: "ND001",
            indicadores: [
                "Identifica los conceptos básicos de la Ley de Insolvencia",
                "Reconoce las etapas principales de un proceso concursal",
                "Distingue entre procedimientos judiciales y extrajudiciales",
                "Comprende la estructura general de la normativa aplicable"
            ]
        },
        {
            competencia_id: "CF001",
            nivel_id: "ND002",
            indicadores: [
                "Explica con precisión los supuestos de procedencia del concurso",
                "Clasifica correctamente los tipos de créditos según su prelación",
                "Aplica procedimientos básicos en expedientes concursales",
                "Identifica jurisprudencia relevante en casos específicos"
            ]
        },
        {
            competencia_id: "CF001",
            nivel_id: "ND003",
            indicadores: [
                "Analiza planes de reorganización empresarial con criterio jurídico",
                "Resuelve incidencias complejas durante el proceso concursal",
                "Fundamenta decisiones aplicando normativa y jurisprudencia",
                "Diseña estrategias procesales según cada caso particular"
            ]
        },
        {
            competencia_id: "CF001",
            nivel_id: "ND004",
            indicadores: [
                "Evalúa casos complejos de insolvencia con múltiples partes",
                "Crea soluciones jurídicas innovadoras en situaciones atípicas",
                "Interpreta y propone mejoras a la normativa existente",
                "Establece criterios jurisprudenciales sobre temas controvertidos"
            ]
        },
        
        // Competencia: Diseña y gestiona proyectos judiciales de impacto social (CF006)
        {
            competencia_id: "CF006",
            nivel_id: "ND001",
            indicadores: [
                "Identifica elementos básicos de un proyecto social judicial",
                "Reconoce necesidades de acceso a justicia en comunidades",
                "Colabora en la implementación de proyectos diseñados por otros",
                "Aplica herramientas simples de seguimiento y monitoreo"
            ]
        },
        {
            competencia_id: "CF006",
            nivel_id: "ND002",
            indicadores: [
                "Formula objetivos y resultados esperados para proyectos",
                "Elabora cronogramas y distribuye tareas adecuadamente",
                "Aplica técnicas de diagnóstico participativo",
                "Gestiona recursos asignados con transparencia y eficiencia"
            ]
        },
        {
            competencia_id: "CF006",
            nivel_id: "ND003",
            indicadores: [
                "Diseña proyectos completos de impacto judicial comunitario",
                "Implementa sistemas de monitoreo con indicadores verificables",
                "Coordina equipos multidisciplinarios para la ejecución",
                "Analiza resultados y propone mejoras continuas"
            ]
        },
        {
            competencia_id: "CF006",
            nivel_id: "ND004",
            indicadores: [
                "Desarrolla modelos innovadores de proyectos replicables",
                "Evalúa impacto a largo plazo y sostenibilidad de iniciativas",
                "Transfiere metodologías y forma a otros en gestión de proyectos",
                "Articula proyectos con políticas públicas de acceso a justicia"
            ]
        },
        
        // Competencia: Actúa con perspectiva de género (CF010)
        {
            competencia_id: "CF010",
            nivel_id: "ND001",
            indicadores: [
                "Reconoce conceptos básicos sobre género y desigualdad",
                "Identifica estereotipos de género evidentes en el ámbito judicial",
                "Conoce la normativa fundamental sobre igualdad de género",
                "Utiliza lenguaje no sexista en comunicaciones básicas"
            ]
        },
        {
            competencia_id: "CF010",
            nivel_id: "ND002",
            indicadores: [
                "Aplica protocolos establecidos para atención con enfoque de género",
                "Identifica formas de discriminación directa e indirecta",
                "Adapta procedimientos para garantizar participación igualitaria",
                "Fundamenta decisiones con perspectiva de género en casos estándar"
            ]
        },
        {
            competencia_id: "CF010",
            nivel_id: "ND003",
            indicadores: [
                "Analiza casos complejos considerando factores interseccionales",
                "Implementa medidas proactivas para prevenir discriminación",
                "Argumenta jurídicamente con enfoque de género en resoluciones",
                "Aplica estándares internacionales de derechos humanos de las mujeres"
            ]
        },
        {
            competencia_id: "CF010",
            nivel_id: "ND004",
            indicadores: [
                "Desarrolla criterios jurisprudenciales con perspectiva de género",
                "Diseña medidas innovadoras para transformar prácticas institucionales",
                "Transfiere conocimientos y mentoriza a otros operadores de justicia",
                "Evalúa y mejora continuamente las políticas de género institucionales"
            ]
        }
    ];

    // Instrumentos de evaluación 
    const instrumentosEvaluacion = [
        {
            id: "IE001",
            nombre: "Examen de conocimientos teóricos",
            descripcion: "Prueba escrita u oral para evaluar conocimientos conceptuales y normativos.",
            aplicabilidad: "Adecuado para evaluar niveles básicos e intermedios, especialmente en competencias jurídicas sustantivas."
        },
        {
            id: "IE002",
            nombre: "Análisis de casos prácticos",
            descripcion: "Presentación de situaciones reales o simuladas para su análisis y resolución fundamentada.",
            aplicabilidad: "Apropiado para todos los niveles, con complejidad creciente según el nivel evaluado."
        },
        {
            id: "IE003",
            nombre: "Simulación o juego de roles",
            descripcion: "Recreación de situaciones donde la persona debe actuar como lo haría en un contexto real.",
            aplicabilidad: "Ideal para evaluar competencias procesales, comunicativas y relacionales en niveles intermedios y avanzados."
        },
        {
            id: "IE004",
            nombre: "Observación estructurada",
            descripcion: "Observación directa del desempeño con registro en rúbricas o listas de verificación.",
            aplicabilidad: "Aplicable en niveles avanzados y expertos, especialmente para competencias procedimentales y actitudinales."
        },
        {
            id: "IE005",
            nombre: "Evaluación 360°",
            descripcion: "Recopilación de valoraciones de distintas fuentes (pares, superiores, usuarios, colaboradores).",
            aplicabilidad: "Pertinente para evaluar competencias relacionales, éticas y gerenciales en niveles avanzados y expertos."
        },
        {
            id: "IE006",
            nombre: "Portafolio de evidencias",
            descripcion: "Compilación de documentos, productos y testimonios que evidencian el desarrollo de competencias.",
            aplicabilidad: "Útil para evaluar progresión y trayectoria en todos los niveles."
        },
        {
            id: "IE007",
            nombre: "Proyecto aplicado",
            descripcion: "Diseño e implementación de una iniciativa completa para resolver una problemática real.",
            aplicabilidad: "Apropiado para evaluar competencias gerenciales y organizacionales en niveles avanzados y expertos."
        }
    ];

    // Mapeo de instrumentos a competencias y niveles
    const mapeoInstrumentosCompetencias = [
        // Competencia: Aplica el marco normativo en materia de insolvencia (CF001)
        {
            competencia_id: "CF001",
            nivel_id: "ND001",
            instrumentos_ids: ["IE001", "IE002"]
        },
        {
            competencia_id: "CF001",
            nivel_id: "ND002",
            instrumentos_ids: ["IE001", "IE002"]
        },
        {
            competencia_id: "CF001",
            nivel_id: "ND003",
            instrumentos_ids: ["IE002", "IE003", "IE006"]
        },
        {
            competencia_id: "CF001",
            nivel_id: "ND004",
            instrumentos_ids: ["IE002", "IE004", "IE005", "IE006"]
        },
        
        // Competencia: Diseña y gestiona proyectos judiciales (CF006)
        {
            competencia_id: "CF006",
            nivel_id: "ND001",
            instrumentos_ids: ["IE001", "IE002"]
        },
        {
            competencia_id: "CF006",
            nivel_id: "ND002",
            instrumentos_ids: ["IE002", "IE003", "IE006"]
        },
        {
            competencia_id: "CF006",
            nivel_id: "ND003",
            instrumentos_ids: ["IE004", "IE006", "IE007"]
        },
        {
            competencia_id: "CF006",
            nivel_id: "ND004",
            instrumentos_ids: ["IE005", "IE006", "IE007"]
        },
        
        // Competencia: Actúa con perspectiva de género (CF010)
        {
            competencia_id: "CF010",
            nivel_id: "ND001",
            instrumentos_ids: ["IE001", "IE002"]
        },
        {
            competencia_id: "CF010",
            nivel_id: "ND002",
            instrumentos_ids: ["IE002", "IE003", "IE006"]
        },
        {
            competencia_id: "CF010",
            nivel_id: "ND003",
            instrumentos_ids: ["IE002", "IE003", "IE004", "IE006"]
        },
        {
            competencia_id: "CF010",
            nivel_id: "ND004",
            instrumentos_ids: ["IE004", "IE005", "IE006", "IE007"]
        }
    ];

    // Cursos que contribuyen al desarrollo de cada competencia por nivel
    const cursosDesarrolloCompetencias = [
        // Competencia: Aplica el marco normativo en materia de insolvencia (CF001)
        {
            competencia_id: "CF001",
            nivel_id: "ND001",
            cursos_ids: ["PFJYA2025-AJ-MCI-005"]
        },
        {
            competencia_id: "CF001",
            nivel_id: "ND002",
            cursos_ids: ["PFJYA2025-AJ-MCI-005"]
        },
        {
            competencia_id: "CF001",
            nivel_id: "ND003",
            cursos_ids: []
        },
        {
            competencia_id: "CF001",
            nivel_id: "ND004",
            cursos_ids: []
        },
        
        // Competencia: Diseña y gestiona proyectos judiciales (CF006)
        {
            competencia_id: "CF006",
            nivel_id: "ND001",
            cursos_ids: ["PFJYA2025-FJ-ESP-001"]
        },
        {
            competencia_id: "CF006",
            nivel_id: "ND002",
            cursos_ids: ["PFJYA2025-FJ-ESP-001"]
        },
        {
            competencia_id: "CF006",
            nivel_id: "ND003",
            cursos_ids: []
        },
        {
            competencia_id: "CF006",
            nivel_id: "ND004",
            cursos_ids: []
        },
        
        // Competencia: Actúa con perspectiva de género (CF010)
        {
            competencia_id: "CF010",
            nivel_id: "ND001",
            cursos_ids: ["PFJYA2025-GEN-PTEC-003", "PFJYA2025-GEN-PTEC-004"]
        },
        {
            competencia_id: "CF010",
            nivel_id: "ND002",
            cursos_ids: ["PFJYA2025-GEN-PTEC-003", "PFJYA2025-GEN-PTEC-004"]
        },
        {
            competencia_id: "CF010",
            nivel_id: "ND003",
            cursos_ids: []
        },
        {
            competencia_id: "CF010",
            nivel_id: "ND004",
            cursos_ids: []
        }
    ];

    // Datos para simular perfil de desarrollo de competencias de un juez
    const perfilEjemplo = {
        id: "PERFIL001",
        nombre: "Juez Juan Martínez",
        rol: "Juez de Paz",
        competenciasEvaluadas: [
            {
                competencia_id: "CF001",
                nivel_logrado: 1,
                fecha_evaluacion: "2025-02-15",
                instrumento_utilizado: "IE001",
                comentarios: "Conocimientos básicos demostrados. Requiere reforzar clasificación de créditos."
            },
            {
                competencia_id: "CF006",
                nivel_logrado: 3,
                fecha_evaluacion: "2025-03-10",
                instrumento_utilizado: "IE007",
                comentarios: "Excelente capacidad para diseñar proyectos comunitarios. Destacó en el diagnóstico participativo."
            },
            {
                competencia_id: "CF010",
                nivel_logrado: 2,
                fecha_evaluacion: "2025-01-22",
                instrumento_utilizado: "IE003",
                comentarios: "Aplica protocolos correctamente. Se recomienda profundizar en análisis interseccional."
            }
        ]
    };

    // Estructura para visualización de radar por competencias del juez
    const datosRadarJuez = {
        categorías: ["Marco normativo insolvencia", "Gestión de proyectos", "Perspectiva de género"],
        nivelRequerido: [1, 3, 3], // Según el rol (Juez de Paz)
        nivelLogrado: [1, 3, 2], // Según evaluación
        nivelMaximo: [4, 4, 4] // Nivel experto
    };

    // Estructura para visualizar mapa de calor de cobertura de competencias en cursos
    const mapaCalorCompetenciasCursos = {
        competencias: [
            "Aplica marco normativo insolvencia",
            "Diseña proyectos judiciales",
            "Actúa con perspectiva género"
        ],
        niveles: ["Básico", "Intermedio", "Avanzado", "Experto"],
        datos: [
            [1, 1, 0, 0], // CF001: Cursos que cubren cada nivel
            [1, 1, 0, 0], // CF006: Cursos que cubren cada nivel
            [2, 2, 0, 0]  // CF010: Cursos que cubren cada nivel
        ]
    };

    // Grafo de progresión para visualizar ruta de desarrollo de competencias
    const grafoProgresion = {
        nodes: [
            // Nodos de competencia-nivel
            // CF001 - Marco normativo insolvencia
            { id: "CF001-ND001", label: "Insolvencia N1", group: "nivel1", shape: "dot" },
            { id: "CF001-ND002", label: "Insolvencia N2", group: "nivel2", shape: "dot" },
            { id: "CF001-ND003", label: "Insolvencia N3", group: "nivel3", shape: "dot" },
            { id: "CF001-ND004", label: "Insolvencia N4", group: "nivel4", shape: "dot" },
            
            // CF006 - Gestión de proyectos
            { id: "CF006-ND001", label: "Proyectos N1", group: "nivel1", shape: "dot" },
            { id: "CF006-ND002", label: "Proyectos N2", group: "nivel2", shape: "dot" },
            { id: "CF006-ND003", label: "Proyectos N3", group: "nivel3", shape: "dot" },
            { id: "CF006-ND004", label: "Proyectos N4", group: "nivel4", shape: "dot" },
            
            // CF010 - Perspectiva de género
            { id: "CF010-ND001", label: "Género N1", group: "nivel1", shape: "dot" },
            { id: "CF010-ND002", label: "Género N2", group: "nivel2", shape: "dot" },
            { id: "CF010-ND003", label: "Género N3", group: "nivel3", shape: "dot" },
            { id: "CF010-ND004", label: "Género N4", group: "nivel4", shape: "dot" },
            
            // Cursos como nodos
            { id: "PFJYA2025-AJ-MCI-005", label: "Seminario Insolvencia", group: "curso", shape: "box" },
            { id: "PFJYA2025-FJ-ESP-001", label: "Programa Facilitadores", group: "curso", shape: "box" },
            { id: "PFJYA2025-GEN-PTEC-003", label: "Curso Violencia Económica", group: "curso", shape: "box" },
            { id: "PFJYA2025-GEN-PTEC-004", label: "Curso Trabajador Social", group: "curso", shape: "box" }
        ],
        
        edges: [
            // Progresión entre niveles
            { from: "CF001-ND001", to: "CF001-ND002", arrows: "to" },
            { from: "CF001-ND002", to: "CF001-ND003", arrows: "to" },
            { from: "CF001-ND003", to: "CF001-ND004", arrows: "to" },
            
            { from: "CF006-ND001", to: "CF006-ND002", arrows: "to" },
            { from: "CF006-ND002", to: "CF006-ND003", arrows: "to" },
            { from: "CF006-ND003", to: "CF006-ND004", arrows: "to" },
            
            { from: "CF010-ND001", to: "CF010-ND002", arrows: "to" },
            { from: "CF010-ND002", to: "CF010-ND003", arrows: "to" },
            { from: "CF010-ND003", to: "CF010-ND004", arrows: "to" },
            
            // Cursos que desarrollan competencias
            { from: "PFJYA2025-AJ-MCI-005", to: "CF001-ND001", arrows: "to", dashes: true },
            { from: "PFJYA2025-AJ-MCI-005", to: "CF001-ND002", arrows: "to", dashes: true },
            
            { from: "PFJYA2025-FJ-ESP-001", to: "CF006-ND001", arrows: "to", dashes: true },
            { from: "PFJYA2025-FJ-ESP-001", to: "CF006-ND002", arrows: "to", dashes: true },
            
            { from: "PFJYA2025-GEN-PTEC-003", to: "CF010-ND001", arrows: "to", dashes: true },
            { from: "PFJYA2025-GEN-PTEC-003", to: "CF010-ND002", arrows: "to", dashes: true },
            
            { from: "PFJYA2025-GEN-PTEC-004", to: "CF010-ND001", arrows: "to", dashes: true },
            { from: "PFJYA2025-GEN-PTEC-004", to: "CF010-ND002", arrows: "to", dashes: true }
        ]
    };

    return {
        nivelesDominio,
        indicadoresLogro,
        instrumentosEvaluacion,
        mapeoInstrumentosCompetencias,
        cursosDesarrolloCompetencias,
        perfilEjemplo,
        datosRadarJuez,
        mapaCalorCompetenciasCursos,
        grafoProgresion,
        meta: {
            totalNiveles: nivelesDominio.length,
            totalInstrumentos: instrumentosEvaluacion.length,
            totalIndicadores: indicadoresLogro.reduce((sum, item) => sum + item.indicadores.length, 0),
            descripcion: "La Capa 5 (Sistema de Evaluación por Niveles de Dominio) define cómo verificar cada competencia en determinados niveles mediante indicadores e instrumentos específicos."
        }
    };
})();