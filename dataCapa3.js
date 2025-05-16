/**
 * dataCapa3.js - Capa de Taxonomía Global Enriquecida
 * Estructura de datos para la visualización de la Capa 3 del MOFJ
 */

const dataCapa3 = (function() {
    // Competencias identificadas
    const competencias = [
        {
            id: "COMP001",
            nombre: "Diseña y lidera proyectos de impacto social desde el ámbito judicial",
            descripcion: "Capacidad para conceptualizar, planificar y ejecutar proyectos sociales vinculados al ámbito judicial, con enfoque participativo y comunicación efectiva.",
            tipo: "Gestión y Liderazgo"
        },
        {
            id: "COMP002",
            nombre: "Aplica estrategias de facilitación judicial",
            descripcion: "Habilidad para implementar mecanismos de facilitación judicial que promueven el acceso a justicia en comunidades rurales o vulnerables.",
            tipo: "Técnica-Jurídica"
        },
        {
            id: "COMP003",
            nombre: "Promueve relaciones interinstitucionales y comunitarias",
            descripcion: "Capacidad para establecer y mantener relaciones de colaboración entre instituciones y comunidades, con liderazgo ético y enfoque en derechos humanos.",
            tipo: "Relacional"
        },
        {
            id: "COMP004",
            nombre: "Conoce la Ley de Insolvencia para la efectiva gestión del expediente",
            descripcion: "Dominio del marco normativo de la Ley de Insolvencia y capacidad para aplicarlo en la gestión de expedientes relacionados.",
            tipo: "Técnica-Jurídica"
        },
        {
            id: "COMP005",
            nombre: "Comprende las etapas del juicio sumario",
            descripcion: "Conocimiento de las distintas etapas del juicio sumario, incluyendo la presentación de demandas, audiencias, notificaciones y sentencias, para asegurar un manejo adecuado del proceso.",
            tipo: "Técnica-Jurídica"
        },
        {
            id: "COMP006",
            nombre: "Identifica y contrarresta la violencia económica contra la mujer",
            descripcion: "Capacidad para reconocer situaciones de violencia económica y proponer estrategias de prevención, intervención y empoderamiento económico, alineadas con estándares nacionales e internacionales.",
            tipo: "Técnica-Especializada"
        },
        {
            id: "COMP007",
            nombre: "Interviene en la protección y promoción de los derechos de las mujeres",
            descripcion: "Habilidad para intervenir de manera integral y efectiva en la protección, promoción y defensa de los derechos de las mujeres, aplicando enfoques de género, interseccionalidad y empoderamiento.",
            tipo: "Técnica-Especializada"
        }
    ];

    // Conceptos clave identificados
    const conceptos = [
        {
            id: "PFJYA2025-FJ-ESP-001-C001",
            nombre: "Introducción a la Gestión de Proyectos Sociales Judiciales",
            descripcion: "Conceptualización de la gestión de proyectos sociales, con énfasis en su aplicación para la mejora del acceso a la justicia y la resolución de conflictos a nivel comunitario.",
            tema_general: "Gestión Judicial Aplicada"
        },
        {
            id: "PFJYA2025-FJ-ESP-001-C001-SC001",
            nombre: "Conceptos Básicos de la Gestión Social Aplicada a Proyectos Judiciales",
            descripcion: "Estudio de los conceptos fundamentales de la gestión social, tales como diagnóstico participativo, ciclo de proyecto, marco lógico, stakeholders, indicadores sociales y sostenibilidad.",
            tema_general: "Gestión Judicial Aplicada"
        },
        {
            id: "CONC003",
            nombre: "Ley de Insolvencia",
            descripcion: "Marco legal que regula los procesos de insolvencia, tanto judiciales como extrajudiciales.",
            tema_general: "Derecho Concursal"
        },
        {
            id: "CONC004",
            nombre: "Juicio Sumario de Desahucio",
            descripcion: "Procedimiento judicial sumario para la recuperación de inmuebles en casos de arrendamiento.",
            tema_general: "Derecho Procesal Civil"
        },
        {
            id: "CONC005",
            nombre: "Violencia Económica contra la Mujer",
            descripcion: "Forma de violencia de género que implica control, limitación o privación de recursos económicos a la mujer.",
            tema_general: "Violencia de Género"
        },
        {
            id: "CONC006",
            nombre: "Intervención del Trabajador Social",
            descripcion: "Metodologías y enfoques para la intervención profesional del trabajador social en situaciones que afectan los derechos de las mujeres.",
            tema_general: "Trabajo Social Jurídico"
        }
    ];

    // Referencias normativas
    const referenciasNormativas = [
        {
            id: "NORM001",
            nombre: "Ley del Organismo Judicial",
            articulos: "Artículos 54, 74-76, 95, 98, 100",
            descripcion: "Base para la implementación de programas que mejoren el servicio de justicia.",
            actividades_relacionadas: ["PFJYA2025-FJ-ESP-001"]
        },
        {
            id: "NORM002",
            nombre: "Acuerdo 51-2014 CSJ",
            articulos: "Artículos 1 y 3",
            descripcion: "Creación y objetivos del Servicio Nacional de Facilitadores Judiciales.",
            actividades_relacionadas: ["PFJYA2025-FJ-ESP-001"]
        },
        {
            id: "NORM003",
            nombre: "Ley de Insolvencia",
            articulos: "Completa",
            descripcion: "Marco regulatorio de los procesos de insolvencia.",
            actividades_relacionadas: ["PFJYA2025-AJ-MCI-005"]
        },
        {
            id: "NORM004",
            nombre: "Código Procesal Civil y Mercantil",
            articulos: "Artículos sobre Juicio Sumario y Desahucio",
            descripcion: "Regula el procedimiento del juicio sumario y desahucio.",
            actividades_relacionadas: ["PFJYA2025-AJ-MCI-006"]
        },
        {
            id: "NORM005",
            nombre: "Ley contra el Femicidio y Otras Formas de Violencia contra la Mujer",
            articulos: "Decreto 22-2008",
            descripcion: "Tipifica la violencia económica como forma de violencia contra la mujer.",
            actividades_relacionadas: ["PFJYA2025-GEN-PTEC-003"]
        },
        {
            id: "NORM006",
            nombre: "Convención sobre la Eliminación de Todas las Formas de Discriminación contra la Mujer (CEDAW)",
            articulos: "Completa",
            descripcion: "Marco internacional para eliminar discriminación contra la mujer.",
            actividades_relacionadas: ["PFJYA2025-GEN-PTEC-003", "PFJYA2025-GEN-PTEC-004"]
        }
    ];

    // Relaciones entre conceptos y otras entidades
    const relacionesSemanticas = [
        {
            origen_id: "PFJYA2025-FJ-ESP-001-C001",
            destino_id: "PFJYA2025-FJ-ESP-001-C001-SC001",
            tipo: "contiene",
            descripcion: "El concepto general contiene conceptos más específicos"
        },
        {
            origen_id: "PFJYA2025-FJ-ESP-001-C001",
            destino_id: "COMP001",
            tipo: "desarrolla",
            descripcion: "El concepto contribuye al desarrollo de la competencia"
        },
        {
            origen_id: "CONC003",
            destino_id: "COMP004",
            tipo: "desarrolla",
            descripcion: "El concepto contribuye al desarrollo de la competencia"
        },
        {
            origen_id: "CONC004",
            destino_id: "COMP005",
            tipo: "desarrolla",
            descripcion: "El concepto contribuye al desarrollo de la competencia"
        },
        {
            origen_id: "CONC005",
            destino_id: "COMP006",
            tipo: "desarrolla",
            descripcion: "El concepto contribuye al desarrollo de la competencia"
        },
        {
            origen_id: "CONC006",
            destino_id: "COMP007",
            tipo: "desarrolla",
            descripcion: "El concepto contribuye al desarrollo de la competencia"
        },
        {
            origen_id: "NORM001",
            destino_id: "PFJYA2025-FJ-ESP-001-C001",
            tipo: "fundamenta",
            descripcion: "La normativa fundamenta el concepto"
        },
        {
            origen_id: "NORM003",
            destino_id: "CONC003",
            tipo: "fundamenta",
            descripcion: "La normativa fundamenta el concepto"
        },
        {
            origen_id: "NORM004",
            destino_id: "CONC004",
            tipo: "fundamenta",
            descripcion: "La normativa fundamenta el concepto"
        },
        {
            origen_id: "NORM005",
            destino_id: "CONC005",
            tipo: "fundamenta",
            descripcion: "La normativa fundamenta el concepto"
        }
    ];

    // Mapeo de actividades a competencias
    const actividadCompetenciaMapping = [
        {
            actividad_id: "PFJYA2025-FJ-ESP-001",
            competencias_ids: ["COMP001", "COMP002", "COMP003"]
        },
        {
            actividad_id: "PFJYA2025-AJ-MCI-005",
            competencias_ids: ["COMP004"]
        },
        {
            actividad_id: "PFJYA2025-AJ-MCI-006",
            competencias_ids: ["COMP005"]
        },
        {
            actividad_id: "PFJYA2025-GEN-PTEC-003",
            competencias_ids: ["COMP006"]
        },
        {
            actividad_id: "PFJYA2025-GEN-PTEC-004",
            competencias_ids: ["COMP007"]
        }
    ];

    // Mapeo de actividades a conceptos clave
    const actividadConceptoMapping = [
        {
            actividad_id: "PFJYA2025-FJ-ESP-001",
            conceptos_ids: ["PFJYA2025-FJ-ESP-001-C001", "PFJYA2025-FJ-ESP-001-C001-SC001"]
        },
        {
            actividad_id: "PFJYA2025-AJ-MCI-005",
            conceptos_ids: ["CONC003"]
        },
        {
            actividad_id: "PFJYA2025-AJ-MCI-006",
            conceptos_ids: ["CONC004"]
        },
        {
            actividad_id: "PFJYA2025-GEN-PTEC-003",
            conceptos_ids: ["CONC005"]
        },
        {
            actividad_id: "PFJYA2025-GEN-PTEC-004",
            conceptos_ids: ["CONC006"]
        }
    ];

    // Documentación complementaria referenciada
    const documentacionReferenciada = [
        {
            id: "DOC001",
            tipo: "Manual",
            titulo: "Manual de Planificación, Seguimiento y Evaluación de Proyectos Sociales",
            autor: "ILPES/CEPAL",
            conceptos_relacionados: ["PFJYA2025-FJ-ESP-001-C001"]
        },
        {
            id: "DOC002",
            tipo: "Guía",
            titulo: "Guía de los Fundamentos para la Dirección de Proyectos (Guía del PMBOK)",
            autor: "Project Management Institute (PMI)",
            conceptos_relacionados: ["PFJYA2025-FJ-ESP-001-C001"]
        },
        {
            id: "DOC003",
            tipo: "Libro",
            titulo: "Introducción al Derecho Procesal Penal",
            autor: "Binder, Alberto M.",
            conceptos_relacionados: ["PFJYA2025-FJ-ESP-001-C001"]
        },
        {
            id: "DOC004",
            tipo: "Libro",
            titulo: "Evaluación de Proyectos Sociales",
            autor: "Cohen, Ernesto y Franco, Rolando",
            conceptos_relacionados: ["PFJYA2025-FJ-ESP-001-C001-SC001"]
        }
    ];

    // Estructura de grafo para visualización de la red de conocimiento
    const grafoConocimiento = {
        nodes: [
            // Nodos de conceptos
            ...conceptos.map(c => ({
                id: c.id,
                label: c.nombre.length > 25 ? c.nombre.substring(0, 22) + '...' : c.nombre,
                title: c.nombre,
                group: 'conceptos',
                value: 2
            })),
            
            // Nodos de competencias
            ...competencias.map(c => ({
                id: c.id,
                label: c.nombre.length > 25 ? c.nombre.substring(0, 22) + '...' : c.nombre,
                title: c.nombre,
                group: 'competencias',
                value: 3
            })),
            
            // Nodos de normativas
            ...referenciasNormativas.map(n => ({
                id: n.id,
                label: n.nombre.length > 25 ? n.nombre.substring(0, 22) + '...' : n.nombre,
                title: n.nombre,
                group: 'normativas',
                value: 1.5
            }))
        ],
        
        edges: [
            // Relaciones entre entidades
            ...relacionesSemanticas.map(r => ({
                from: r.origen_id,
                to: r.destino_id,
                label: r.tipo,
                title: r.descripcion,
                arrows: 'to'
            }))
        ]
    };

    return {
        competencias,
        conceptos,
        referenciasNormativas,
        relacionesSemanticas,
        actividadCompetenciaMapping,
        actividadConceptoMapping,
        documentacionReferenciada,
        grafoConocimiento,
        meta: {
            totalCompetencias: competencias.length,
            totalConceptos: conceptos.length,
            totalNormativas: referenciasNormativas.length,
            totalRelaciones: relacionesSemanticas.length,
            totalDocumentos: documentacionReferenciada.length,
            descripcion: "La Capa 3 (Taxonomía Global Enriquecida) integra el nivel semántico más fino: competencias, conceptos clave, referencias normativas y otros recursos."
        }
    };
})();