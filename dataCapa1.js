/**
 * dataCapa1.js - Capa Académico-Administrativa
 * Estructura de datos para la visualización de la Capa 1 del MOFJ
 * Versión corregida para solucionar problemas de compatibilidad con Cytoscape
 */

// Convierte los datos existentes en dataTodo en un formato estructurado para visualización
const dataCapa1 = (function() {
    // Datos de actividades procesados para visualización
    const actividades = [
        {
            id: "PFJYA2025-FJ-ESP-001",
            tipo: "Programa de Formación Continua",
            nombre: "PROGRAMA DE FORMACIÓN CONTINUA A JUECES Y JUEZAS DE PAZ QUE INTEGRAN EL SERVICIO NACIONAL DE FACILITADORES JUDICIALES",
            objetivo: "Fortalecer en las y los jueces de paz integrantes del Servicio Nacional de Facilitadores Judiciales, competencias en liderazgo, planificación, dirección estratégica y comunicación efectiva para una gestión eficiente de proyectos sociales judiciales de base comunitaria.",
            eje_formativo: "Funcionarios Judiciales",
            area_organizativa: "Especialización Judicial",
            modalidad: "Virtual sincrónica",
            duracion_horas: 20,
            nivel_dificultad: "Intermedio",
            estado: "Activo",
            bimestre: "Primer al Quinto Bimestre",
            requisitos: ["Ser Juez o Jueza de Paz integrante del Servicio Nacional de Facilitadores Judiciales"],
            evaluacion: {
                instrumentos: [
                    "Participación activa",
                    "Productos de planificación social",
                    "Autoevaluación de competencias"
                ],
                indicadores: [
                    "Aplicación de herramientas de planificación",
                    "Diseño de una propuesta de intervención comunitaria judicial",
                    "Mejora en habilidades de comunicación efectiva"
                ]
            }
        },
        {
            id: "PFJYA2025-AJ-MCI-005",
            tipo: "Seminario",
            nombre: "SEMINARIO APLICACIÓN E IMPLEMENTACIÓN DE LA LEY DE INSOLVENCIA",
            objetivo: "Establecer el funcionamiento y las acciones a realizar para la implementación de los procesos, judiciales y extrajudiciales, regulados en la Ley de Insolvencia.",
            eje_formativo: "Auxiliares Judiciales",
            area_organizativa: "Materia Civil",
            modalidad: "Virtual sincrónica",
            duracion_horas: 6,
            nivel_dificultad: "No especificado",
            estado: "Activo",
            bimestre: "Segundo bimestre",
            requisitos: ["Ser Auxiliar Judicial en materia Civil de la entidad designada."],
            evaluacion: {
                instrumentos: [
                    "Análisis de la Ley de Insolvencia",
                    "Discusión sobre casos prácticos y comparados"
                ],
                indicadores: [
                    "Conocimiento de la Ley de Insolvencia.",
                    "Capacidad para gestionar expedientes relacionados."
                ]
            }
        },
        {
            id: "PFJYA2025-AJ-MCI-006",
            tipo: "Conferencia",
            nombre: "CONFERENCIA JUICIO SUMARIO DE DESAHUCIO Y COBRO DE RENTAS ATRASADAS",
            objetivo: "Analizar de forma detallada el proceso del juicio sumario de desahucio y sus incidencias para la eficaz recuperación de propiedades alquiladas y cobro de rentas atrasadas.",
            eje_formativo: "Auxiliares Judiciales",
            area_organizativa: "Materia Civil",
            modalidad: "Virtual sincrónica",
            duracion_horas: 2,
            nivel_dificultad: "No especificado",
            estado: "Activo",
            bimestre: "Segundo bimestre",
            requisitos: ["Ser Auxiliar Judicial en materia Civil de las entidades designadas."],
            evaluacion: {
                instrumentos: [
                    "Análisis de casos de desahucio",
                    "Preguntas sobre el procedimiento sumario"
                ],
                indicadores: [
                    "Comprensión clara de las etapas del juicio sumario.",
                    "Manejo adecuado del proceso de desahucio."
                ]
            }
        },
        {
            id: "PFJYA2025-GEN-PTEC-003",
            tipo: "Curso",
            nombre: "CURSO VIOLENCIA ECONÓMICA CONTRA LA MUJER: CONCEPTOS, IMPACTO Y ESTRATEGIAS DE INTERVENCIÓN",
            objetivo: "Proporcionar a las y los técnicos del Organismo Judicial los conceptos clave de la violencia económica contra la mujer, identificar sus manifestaciones y consecuencias, y diseñar intervenciones prácticas para prevenirla y erradicarla, promoviendo la autonomía y la equidad de género.",
            eje_formativo: "Área de Género",
            area_organizativa: "Personal Técnico",
            modalidad: "Virtual sincrónica",
            duracion_horas: 8,
            nivel_dificultad: "Intermedio",
            estado: "Activo",
            bimestre: "Primer bimestre",
            requisitos: ["Ser personal técnico del Organismo Judicial"],
            evaluacion: {
                instrumentos: [
                    "Diseño de un plan de intervención contra la violencia económica",
                    "Presentación de estudio de caso en foro",
                    "Evaluación de aprendizaje mediante quiz"
                ],
                indicadores: [
                    "Porcentaje de planes de intervención aprobados",
                    "Nivel de precisión en la identificación de manifestaciones de violencia económica",
                    "Participación activa en simulaciones"
                ]
            }
        },
        {
            id: "PFJYA2025-GEN-PTEC-004",
            tipo: "Curso",
            nombre: "CURSO INTERVENCIÓN DEL TRABAJADOR SOCIAL EN LA PROTECCIÓN Y PROMOCIÓN DE LOS DERECHOS DE LAS MUJERES",
            objetivo: "Capacitar a trabajadores sociales en la intervención efectiva para proteger y promover los derechos de las mujeres, abordando tanto las violaciones de derechos como las formas de apoyar su autonomía y empoderamiento en diversos contextos.",
            eje_formativo: "Área de Género",
            area_organizativa: "Personal Técnico",
            modalidad: "Virtual sincrónica",
            duracion_horas: 8,
            nivel_dificultad: "No especificado",
            estado: "Activo",
            bimestre: "Segundo bimestre",
            requisitos: ["Ser personal del Organismo Judicial, preferentemente con funciones de trabajo social."],
            evaluacion: {
                instrumentos: ["No especificados"],
                indicadores: ["No especificados"]
            }
        }
    ];

    // Estadísticas por eje formativo
    const estadisticasEje = [
        { eje: "Funcionarios Judiciales", cantidad: 1, porcentaje: 20 },
        { eje: "Auxiliares Judiciales", cantidad: 2, porcentaje: 40 },
        { eje: "Área de Género", cantidad: 2, porcentaje: 40 }
    ];

    // Estadísticas por tipo de actividad
    const estadisticasTipo = [
        { tipo: "Programa de Formación Continua", cantidad: 1, porcentaje: 20 },
        { tipo: "Seminario", cantidad: 1, porcentaje: 20 },
        { tipo: "Conferencia", cantidad: 1, porcentaje: 20 },
        { tipo: "Curso", cantidad: 2, porcentaje: 40 }
    ];

    // Estadísticas por modalidad
    const estadisticasModalidad = [
        { modalidad: "Virtual sincrónica", cantidad: 5, porcentaje: 100 }
    ];

    // Relaciones entre actividades (por ejemplo, prerrequisitos)
    const relaciones = [
        {
            origen: "PFJYA2025-GEN-PTEC-003",
            destino: "PFJYA2025-GEN-PTEC-004",
            tipo: "Complementaria",
            descripcion: "El curso de violencia económica complementa los conocimientos para la intervención del trabajador social"
        }
    ];

    // Estructura de grafo optimizada para visualización
    const grafo = {
        nodes: actividades.map(a => ({
            data: {
                id: a.id,
                label: a.nombre.length > 30 ? a.nombre.substring(0, 27) + '...' : a.nombre,
                title: a.nombre,
                group: a.eje_formativo === "Funcionarios Judiciales" ? 1 : 
                       a.eje_formativo === "Auxiliares Judiciales" ? 2 : 3,
                value: a.duracion_horas, // El tamaño puede representar la duración
                data: a // Datos completos para mostrar al hacer clic
            }
        })),
        edges: relaciones.map(r => ({
            data: {
                id: `${r.origen}-${r.destino}`,
                source: r.origen,
                target: r.destino,
                label: r.tipo,
                weight: 1,
                title: r.descripcion
            }
        }))
    };

    return {
        actividades,
        estadisticasEje,
        estadisticasTipo,
        estadisticasModalidad,
        relaciones,
        grafo,
        meta: {
            totalActividades: actividades.length,
            totalRelaciones: relaciones.length,
            descripcion: "La Capa 1 (Académico-Administrativa) refleja la estructura organizativa de la formación: tipo de programa, población objetivo, nivel, etc."
        }
    };
})();