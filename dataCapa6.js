/**
 * dataCapa6.js - Capa de Validación Epistémica Colectiva
 * Estructura de datos conceptualizada para la visualización de la Capa 6 del MOFJ
 */

const dataCapa6 = (function() {
    // Perfiles de validadores (anónimos con hash)
    const perfilesValidadores = [
        {
            id: "hash_validador_001",
            tipo: "Juez",
            especialidad: "Civil",
            experiencia_anios: 15,
            genero: "M",
            region: "Metropolitana"
        },
        {
            id: "hash_validador_002",
            tipo: "Juez",
            especialidad: "Penal",
            experiencia_anios: 12,
            genero: "F",
            region: "Nor-Occidente"
        },
        {
            id: "hash_validador_003",
            tipo: "Magistrado",
            especialidad: "Constitucional",
            experiencia_anios: 22,
            genero: "M",
            region: "Oriente"
        },
        {
            id: "hash_validador_004",
            tipo: "Académico",
            especialidad: "Teoría del Derecho",
            experiencia_anios: 18,
            genero: "F",
            region: "Metropolitana"
        },
        {
            id: "hash_validador_005",
            tipo: "Abogado",
            especialidad: "Mercantil",
            experiencia_anios: 14,
            genero: "M",
            region: "Sur-Occidente"
        },
        {
            id: "hash_validador_006",
            tipo: "Juez",
            especialidad: "Familia",
            experiencia_anios: 10,
            genero: "F",
            region: "Nor-Oriente"
        },
        {
            id: "hash_validador_007",
            tipo: "Mediador",
            especialidad: "Comunitario",
            experiencia_anios: 8,
            genero: "M",
            region: "Sur-Oriente"
        },
        {
            id: "hash_validador_008",
            tipo: "Abogado",
            especialidad: "Derechos Humanos",
            experiencia_anios: 20,
            genero: "F",
            region: "Central"
        },
        {
            id: "hash_validador_009",
            tipo: "Académico",
            especialidad: "Género y Derecho",
            experiencia_anios: 16,
            genero: "F",
            region: "Metropolitana"
        },
        {
            id: "hash_validador_010",
            tipo: "Juez",
            especialidad: "Laboral",
            experiencia_anios: 9,
            genero: "M",
            region: "Occidente"
        }
    ];

    // Dimensiones de validación
    const dimensionesValidacion = [
        {
            id: "DV001",
            nombre: "Claridad Conceptual",
            descripcion: "Precisión y comprensibilidad de los términos y definiciones utilizados."
        },
        {
            id: "DV002",
            nombre: "Relevancia Práctica",
            descripcion: "Utilidad y aplicabilidad en contextos reales de la función judicial."
        },
        {
            id: "DV003",
            nombre: "Fundamentación Jurídica",
            descripcion: "Solidez del respaldo normativo, jurisprudencial o doctrinal."
        },
        {
            id: "DV004",
            nombre: "Consistencia Sistémica",
            descripcion: "Coherencia con el sistema jurídico guatemalteco en su conjunto."
        },
        {
            id: "DV005",
            nombre: "Actualidad",
            descripcion: "Vigencia y alineación con desarrollos jurídicos contemporáneos."
        }
    ];

    // Resultados de validación para conceptos
    const validacionesConceptos = [
        // Concepto: Introducción a la Gestión de Proyectos Sociales Judiciales
        {
            concepto_id: "PFJYA2025-FJ-ESP-001-C001",
            validadores: ["hash_validador_001", "hash_validador_002", "hash_validador_004", "hash_validador_005", "hash_validador_007", "hash_validador_009"],
            valoraciones: [
                {
                    validador_id: "hash_validador_001",
                    valoraciones_dimensiones: [
                        { dimension_id: "DV001", valor: 4 }, // 1-5, donde 5 es máxima validación
                        { dimension_id: "DV002", valor: 5 },
                        { dimension_id: "DV003", valor: 3 },
                        { dimension_id: "DV004", valor: 4 },
                        { dimension_id: "DV005", valor: 4 }
                    ],
                    comentario: "Concepto bien definido y aplicable, aunque podría reforzarse su fundamentación normativa.",
                    validacion_general: "válido"
                },
                {
                    validador_id: "hash_validador_002",
                    valoraciones_dimensiones: [
                        { dimension_id: "DV001", valor: 3 },
                        { dimension_id: "DV002", valor: 5 },
                        { dimension_id: "DV003", valor: 3 },
                        { dimension_id: "DV004", valor: 3 },
                        { dimension_id: "DV005", valor: 4 }
                    ],
                    comentario: "Alta aplicabilidad práctica, pero requiere mayor precisión en algunos términos.",
                    validacion_general: "válido"
                },
                {
                    validador_id: "hash_validador_004",
                    valoraciones_dimensiones: [
                        { dimension_id: "DV001", valor: 5 },
                        { dimension_id: "DV002", valor: 4 },
                        { dimension_id: "DV003", valor: 4 },
                        { dimension_id: "DV004", valor: 4 },
                        { dimension_id: "DV005", valor: 5 }
                    ],
                    comentario: "Excelente conceptualización académica y actualizada.",
                    validacion_general: "válido"
                },
                {
                    validador_id: "hash_validador_005",
                    valoraciones_dimensiones: [
                        { dimension_id: "DV001", valor: 4 },
                        { dimension_id: "DV002", valor: 4 },
                        { dimension_id: "DV003", valor: 2 },
                        { dimension_id: "DV004", valor: 3 },
                        { dimension_id: "DV005", valor: 4 }
                    ],
                    comentario: "Buena definición pero insuficiente base normativa para su implementación.",
                    validacion_general: "válido con reservas"
                },
                {
                    validador_id: "hash_validador_007",
                    valoraciones_dimensiones: [
                        { dimension_id: "DV001", valor: 3 },
                        { dimension_id: "DV002", valor: 5 },
                        { dimension_id: "DV003", valor: 3 },
                        { dimension_id: "DV004", valor: 4 },
                        { dimension_id: "DV005", valor: 5 }
                    ],
                    comentario: "Muy relevante para el trabajo comunitario, aunque algunos términos técnicos son ambiguos.",
                    validacion_general: "válido"
                },
                {
                    validador_id: "hash_validador_009",
                    valoraciones_dimensiones: [
                        { dimension_id: "DV001", valor: 4 },
                        { dimension_id: "DV002", valor: 5 },
                        { dimension_id: "DV003", valor: 4 },
                        { dimension_id: "DV004", valor: 4 },
                        { dimension_id: "DV005", valor: 5 }
                    ],
                    comentario: "Concepto robusto y con excelente aplicabilidad. Sugiero incorporar perspectiva de género explícitamente.",
                    validacion_general: "válido"
                }
            ],
            resumen_validacion: {
                promedio_general: 4.0,
                promedios_dimensiones: [
                    { dimension_id: "DV001", promedio: 3.8 },
                    { dimension_id: "DV002", promedio: 4.7 },
                    { dimension_id: "DV003", promedio: 3.2 },
                    { dimension_id: "DV004", promedio: 3.7 },
                    { dimension_id: "DV005", promedio: 4.5 }
                ],
                validadores_totales: 6,
                validadores_favorables: 5,
                validadores_reservas: 1,
                validadores_desfavorables: 0,
                nivel_consenso: "Alto", // Alto, Medio, Bajo
                nivel_controversia: "Bajo" // Alto, Medio, Bajo
            }
        },
        
        // Concepto: Ley de Insolvencia
        {
            concepto_id: "CONC003",
            validadores: ["hash_validador_001", "hash_validador_003", "hash_validador_005", "hash_validador_008"],
            valoraciones: [
                {
                    validador_id: "hash_validador_001",
                    valoraciones_dimensiones: [
                        { dimension_id: "DV001", valor: 5 },
                        { dimension_id: "DV002", valor: 5 },
                        { dimension_id: "DV003", valor: 5 },
                        { dimension_id: "DV004", valor: 4 },
                        { dimension_id: "DV005", valor: 5 }
                    ],
                    comentario: "Definición precisa, fundamental y con sólida base jurídica.",
                    validacion_general: "válido"
                },
                {
                    validador_id: "hash_validador_003",
                    valoraciones_dimensiones: [
                        { dimension_id: "DV001", valor: 5 },
                        { dimension_id: "DV002", valor: 5 },
                        { dimension_id: "DV003", valor: 5 },
                        { dimension_id: "DV004", valor: 5 },
                        { dimension_id: "DV005", valor: 5 }
                    ],
                    comentario: "Concepto jurídico impecable en todos los aspectos.",
                    validacion_general: "válido"
                },
                {
                    validador_id: "hash_validador_005",
                    valoraciones_dimensiones: [
                        { dimension_id: "DV001", valor: 5 },
                        { dimension_id: "DV002", valor: 5 },
                        { dimension_id: "DV003", valor: 5 },
                        { dimension_id: "DV004", valor: 4 },
                        { dimension_id: "DV005", valor: 5 }
                    ],
                    comentario: "Extraordinariamente bien definido y aplicable a la práctica mercantil.",
                    validacion_general: "válido"
                },
                {
                    validador_id: "hash_validador_008",
                    valoraciones_dimensiones: [
                        { dimension_id: "DV001", valor: 5 },
                        { dimension_id: "DV002", valor: 3 },
                        { dimension_id: "DV003", valor: 5 },
                        { dimension_id: "DV004", valor: 3 },
                        { dimension_id: "DV005", valor: 5 }
                    ],
                    comentario: "Bien fundamentado pero debería incluir consideraciones sobre protección a deudores vulnerables.",
                    validacion_general: "válido con reservas"
                }
            ],
            resumen_validacion: {
                promedio_general: 4.7,
                promedios_dimensiones: [
                    { dimension_id: "DV001", promedio: 5.0 },
                    { dimension_id: "DV002", promedio: 4.5 },
                    { dimension_id: "DV003", promedio: 5.0 },
                    { dimension_id: "DV004", promedio: 4.0 },
                    { dimension_id: "DV005", promedio: 5.0 }
                ],
                validadores_totales: 4,
                validadores_favorables: 3,
                validadores_reservas: 1,
                validadores_desfavorables: 0,
                nivel_consenso: "Alto",
                nivel_controversia: "Bajo"
            }
        },
        
        // Concepto: Violencia Económica contra la Mujer
        {
            concepto_id: "CONC005",
            validadores: ["hash_validador_002", "hash_validador_004", "hash_validador_006", "hash_validador_008", "hash_validador_009", "hash_validador_010"],
            valoraciones: [
                {
                    validador_id: "hash_validador_002",
                    valoraciones_dimensiones: [
                        { dimension_id: "DV001", valor: 4 },
                        { dimension_id: "DV002", valor: 5 },
                        { dimension_id: "DV003", valor: 4 },
                        { dimension_id: "DV004", valor: 3 },
                        { dimension_id: "DV005", valor: 5 }
                    ],
                    comentario: "Concepto muy relevante para la práctica judicial en materia penal.",
                    validacion_general: "válido"
                },
                {
                    validador_id: "hash_validador_004",
                    valoraciones_dimensiones: [
                        { dimension_id: "DV001", valor: 5 },
                        { dimension_id: "DV002", valor: 4 },
                        { dimension_id: "DV003", valor: 4 },
                        { dimension_id: "DV004", valor: 4 },
                        { dimension_id: "DV005", valor: 5 }
                    ],
                    comentario: "Excelente conceptualización académica con perspectiva actualizada.",
                    validacion_general: "válido"
                },
                {
                    validador_id: "hash_validador_006",
                    valoraciones_dimensiones: [
                        { dimension_id: "DV001", valor: 5 },
                        { dimension_id: "DV002", valor: 5 },
                        { dimension_id: "DV003", valor: 4 },
                        { dimension_id: "DV004", valor: 4 },
                        { dimension_id: "DV005", valor: 5 }
                    ],
                    comentario: "Fundamental para casos de familia, muy bien desarrollado.",
                    validacion_general: "válido"
                },
                {
                    validador_id: "hash_validador_008",
                    valoraciones_dimensiones: [
                        { dimension_id: "DV001", valor: 5 },
                        { dimension_id: "DV002", valor: 5 },
                        { dimension_id: "DV003", valor: 5 },
                        { dimension_id: "DV004", valor: 5 },
                        { dimension_id: "DV005", valor: 5 }
                    ],
                    comentario: "Concepto imprescindible con excelente alineación a estándares internacionales.",
                    validacion_general: "válido"
                },
                {
                    validador_id: "hash_validador_009",
                    valoraciones_dimensiones: [
                        { dimension_id: "DV001", valor: 5 },
                        { dimension_id: "DV002", valor: 5 },
                        { dimension_id: "DV003", valor: 4 },
                        { dimension_id: "DV004", valor: 5 },
                        { dimension_id: "DV005", valor: 5 }
                    ],
                    comentario: "Conceptualización robusta y alineada con teoría feminista contemporánea.",
                    validacion_general: "válido"
                },
                {
                    validador_id: "hash_validador_010",
                    valoraciones_dimensiones: [
                        { dimension_id: "DV001", valor: 3 },
                        { dimension_id: "DV002", valor: 3 },
                        { dimension_id: "DV003", valor: 2 },
                        { dimension_id: "DV004", valor: 2 },
                        { dimension_id: "DV005", valor: 3 }
                    ],
                    comentario: "Definición excesivamente amplia que podría generar inseguridad jurídica.",
                    validacion_general: "inválido"
                }
            ],
            resumen_validacion: {
                promedio_general: 4.3,
                promedios_dimensiones: [
                    { dimension_id: "DV001", promedio: 4.5 },
                    { dimension_id: "DV002", promedio: 4.5 },
                    { dimension_id: "DV003", promedio: 3.8 },
                    { dimension_id: "DV004", promedio: 3.8 },
                    { dimension_id: "DV005", promedio: 4.7 }
                ],
                validadores_totales: 6,
                validadores_favorables: 5,
                validadores_reservas: 0,
                validadores_desfavorables: 1,
                nivel_consenso: "Medio",
                nivel_controversia: "Medio"
            }
        }
    ];

    // Resultados de validación para competencias
    const validacionesCompetencias = [
        // Competencia: Conoce la Ley de Insolvencia para la efectiva gestión del expediente
        {
            competencia_id: "COMP004",
            validadores: ["hash_validador_001", "hash_validador_003", "hash_validador_005", "hash_validador_010"],
            valoraciones: [
                {
                    validador_id: "hash_validador_001",
                    valoraciones_dimensiones: [
                        { dimension_id: "DV001", valor: 5 },
                        { dimension_id: "DV002", valor: 5 },
                        { dimension_id: "DV003", valor: 5 },
                        { dimension_id: "DV004", valor: 4 },
                        { dimension_id: "DV005", valor: 5 }
                    ],
                    comentario: "Competencia perfectamente definida y esencial.",
                    validacion_general: "válido"
                },
                {
                    validador_id: "hash_validador_003",
                    valoraciones_dimensiones: [
                        { dimension_id: "DV001", valor: 4 },
                        { dimension_id: "DV002", valor: 5 },
                        { dimension_id: "DV003", valor: 5 },
                        { dimension_id: "DV004", valor: 5 },
                        { dimension_id: "DV005", valor: 5 }
                    ],
                    comentario: "Fundamental y bien articulada para la práctica judicial.",
                    validacion_general: "válido"
                },
                {
                    validador_id: "hash_validador_005",
                    valoraciones_dimensiones: [
                        { dimension_id: "DV001", valor: 5 },
                        { dimension_id: "DV002", valor: 5 },
                        { dimension_id: "DV003", valor: 5 },
                        { dimension_id: "DV004", valor: 4 },
                        { dimension_id: "DV005", valor: 5 }
                    ],
                    comentario: "Competencia imprescindible para el correcto manejo de casos mercantiles.",
                    validacion_general: "válido"
                },
                {
                    validador_id: "hash_validador_010",
                    valoraciones_dimensiones: [
                        { dimension_id: "DV001", valor: 4 },
                        { dimension_id: "DV002", valor: 4 },
                        { dimension_id: "DV003", valor: 5 },
                        { dimension_id: "DV004", valor: 4 },
                        { dimension_id: "DV005", valor: 4 }
                    ],
                    comentario: "Competencia técnica claramente definida y necesaria.",
                    validacion_general: "válido"
                }
            ],
            resumen_validacion: {
                promedio_general: 4.7,
                promedios_dimensiones: [
                    { dimension_id: "DV001", promedio: 4.5 },
                    { dimension_id: "DV002", promedio: 4.8 },
                    { dimension_id: "DV003", promedio: 5.0 },
                    { dimension_id: "DV004", promedio: 4.3 },
                    { dimension_id: "DV005", promedio: 4.8 }
                ],
                validadores_totales: 4,
                validadores_favorables: 4,
                validadores_reservas: 0,
                validadores_desfavorables: 0,
                nivel_consenso: "Muy Alto",
                nivel_controversia: "Muy Bajo"
            }
        },
        
        // Competencia: Diseña y lidera proyectos de impacto social desde el ámbito judicial
        {
            competencia_id: "COMP001",
            validadores: ["hash_validador_001", "hash_validador_002", "hash_validador_003", "hash_validador_004", "hash_validador_006", "hash_validador_007", "hash_validador_009"],
            valoraciones: [
                {
                    validador_id: "hash_validador_001",
                    valoraciones_dimensiones: [
                        { dimension_id: "DV001", valor: 3 },
                        { dimension_id: "DV002", valor: 4 },
                        { dimension_id: "DV003", valor: 2 },
                        { dimension_id: "DV004", valor: 3 },
                        { dimension_id: "DV005", valor: 4 }
                    ],
                    comentario: "Concepto útil pero requiere mayor precisión jurídica para su implementación.",
                    validacion_general: "válido con reservas"
                },
                {
                    validador_id: "hash_validador_002",
                    valoraciones_dimensiones: [
                        { dimension_id: "DV001", valor: 3 },
                        { dimension_id: "DV002", valor: 4 },
                        { dimension_id: "DV003", valor: 2 },
                        { dimension_id: "DV004", valor: 2 },
                        { dimension_id: "DV005", valor: 4 }
                    ],
                    comentario: "Interesante pero vaga. Debería concretarse más en el ámbito judicial.",
                    validacion_general: "válido con reservas"
                },
                {
                    validador_id: "hash_validador_003",
                    valoraciones_dimensiones: [
                        { dimension_id: "DV001", valor: 2 },
                        { dimension_id: "DV002", valor: 3 },
                        { dimension_id: "DV003", valor: 1 },
                        { dimension_id: "DV004", valor: 2 },
                        { dimension_id: "DV005", valor: 3 }
                    ],
                    comentario: "Competencia mal definida. Excede funciones judiciales y carece de base normativa clara.",
                    validacion_general: "inválido"
                },
                {
                    validador_id: "hash_validador_004",
                    valoraciones_dimensiones: [
                        { dimension_id: "DV001", valor: 4 },
                        { dimension_id: "DV002", valor: 4 },
                        { dimension_id: "DV003", valor: 3 },
                        { dimension_id: "DV004", valor: 3 },
                        { dimension_id: "DV005", valor: 5 }
                    ],
                    comentario: "Competencia innovadora y necesaria, aunque requiere mayor desarrollo conceptual.",
                    validacion_general: "válido"
                },
                {
                    validador_id: "hash_validador_006",
                    valoraciones_dimensiones: [
                        { dimension_id: "DV001", valor: 3 },
                        { dimension_id: "DV002", valor: 5 },
                        { dimension_id: "DV003", valor: 2 },
                        { dimension_id: "DV004", valor: 3 },
                        { dimension_id: "DV005", valor: 4 }
                    ],
                    comentario: "Alta relevancia práctica pero fundamentación jurídica débil.",
                    validacion_general: "válido con reservas"
                },
                {
                    validador_id: "hash_validador_007",
                    valoraciones_dimensiones: [
                        { dimension_id: "DV001", valor: 4 },
                        { dimension_id: "DV002", valor: 5 },
                        { dimension_id: "DV003", valor: 3 },
                        { dimension_id: "DV004", valor: 4 },
                        { dimension_id: "DV005", valor: 5 }
                    ],
                    comentario: "Esencial para el trabajo comunitario judicial. Bien planteada.",
                    validacion_general: "válido"
                },
                {
                    validador_id: "hash_validador_009",
                    valoraciones_dimensiones: [
                        { dimension_id: "DV001", valor: 4 },
                        { dimension_id: "DV002", valor: 5 },
                        { dimension_id: "DV003", valor: 3 },
                        { dimension_id: "DV004", valor: 3 },
                        { dimension_id: "DV005", valor: 5 }
                    ],
                    comentario: "Competencia transformadora. Sugiero añadir perspectiva interseccional explícita.",
                    validacion_general: "válido"
                }
            ],
            resumen_validacion: {
                promedio_general: 3.4,
                promedios_dimensiones: [
                    { dimension_id: "DV001", promedio: 3.3 },
                    { dimension_id: "DV002", promedio: 4.3 },
                    { dimension_id: "DV003", promedio: 2.3 },
                    { dimension_id: "DV004", promedio: 2.9 },
                    { dimension_id: "DV005", promedio: 4.3 }
                ],
                validadores_totales: 7,
                validadores_favorables: 3,
                validadores_reservas: 3,
                validadores_desfavorables: 1,
                nivel_consenso: "Bajo",
                nivel_controversia: "Alto"
            }
        },
        
        // Competencia: Identifica y contrarresta la violencia económica contra la mujer
        {
            competencia_id: "COMP006",
            validadores: ["hash_validador_002", "hash_validador_004", "hash_validador_006", "hash_validador_008", "hash_validador_009", "hash_validador_010"],
            valoraciones: [
                {
                    validador_id: "hash_validador_002",
                    valoraciones_dimensiones: [
                        { dimension_id: "DV001", valor: 4 },
                        { dimension_id: "DV002", valor: 5 },
                        { dimension_id: "DV003", valor: 4 },
                        { dimension_id: "DV004", valor: 4 },
                        { dimension_id: "DV005", valor: 5 }
                    ],
                    comentario: "Competencia clave para la protección efectiva de mujeres.",
                    validacion_general: "válido"
                },
                {
                    validador_id: "hash_validador_004",
                    valoraciones_dimensiones: [
                        { dimension_id: "DV001", valor: 5 },
                        { dimension_id: "DV002", valor: 5 },
                        { dimension_id: "DV003", valor: 4 },
                        { dimension_id: "DV004", valor: 4 },
                        { dimension_id: "DV005", valor: 5 }
                    ],
                    comentario: "Excelente conceptualización según estándares internacionales actuales.",
                    validacion_general: "válido"
                },
                {
                    validador_id: "hash_validador_006",
                    valoraciones_dimensiones: [
                        { dimension_id: "DV001", valor: 5 },
                        { dimension_id: "DV002", valor: 5 },
                        { dimension_id: "DV003", valor: 5 },
                        { dimension_id: "DV004", valor: 4 },
                        { dimension_id: "DV005", valor: 5 }
                    ],
                    comentario: "Fundamental y perfectamente formulada. Esencial en casos de familia.",
                    validacion_general: "válido"
                },
                {
                    validador_id: "hash_validador_008",
                    valoraciones_dimensiones: [
                        { dimension_id: "DV001", valor: 5 },
                        { dimension_id: "DV002", valor: 5 },
                        { dimension_id: "DV003", valor: 5 },
                        { dimension_id: "DV004", valor: 5 },
                        { dimension_id: "DV005", valor: 5 }
                    ],
                    comentario: "Competencia imprescindible con perspectiva de derechos humanos.",
                    validacion_general: "válido"
                },
                {
                    validador_id: "hash_validador_009",
                    valoraciones_dimensiones: [
                        { dimension_id: "DV001", valor: 5 },
                        { dimension_id: "DV002", valor: 5 },
                        { dimension_id: "DV003", valor: 5 },
                        { dimension_id: "DV004", valor: 5 },
                        { dimension_id: "DV005", valor: 5 }
                    ],
                    comentario: "Competencia crucial y bien desarrollada teóricamente.",
                    validacion_general: "válido"
                },
                {
                    validador_id: "hash_validador_010",
                    valoraciones_dimensiones: [
                        { dimension_id: "DV001", valor: 3 },
                        { dimension_id: "DV002", valor: 4 },
                        { dimension_id: "DV003", valor: 3 },
                        { dimension_id: "DV004", valor: 2 },
                        { dimension_id: "DV005", valor: 4 }
                    ],
                    comentario: "Requiere mayor precisión para evitar interpretaciones subjetivas.",
                    validacion_general: "válido con reservas"
                }
            ],
            resumen_validacion: {
                promedio_general: 4.5,
                promedios_dimensiones: [
                    { dimension_id: "DV001", promedio: 4.5 },
                    { dimension_id: "DV002", promedio: 4.8 },
                    { dimension_id: "DV003", promedio: 4.3 },
                    { dimension_id: "DV004", promedio: 4.0 },
                    { dimension_id: "DV005", promedio: 4.8 }
                ],
                validadores_totales: 6,
                validadores_favorables: 5,
                validadores_reservas: 1,
                validadores_desfavorables: 0,
                nivel_consenso: "Alto",
                nivel_controversia: "Bajo"
            }
        }
    ];

    // Visualización de mapa de calor por dimensiones para todos los conceptos/competencias
    const mapaCalorGeneral = [
        // Filas: Conceptos/Competencias
        // Columnas: Dimensiones (Claridad, Relevancia, Fundamentación, Consistencia, Actualidad)
        { id: "PFJYA2025-FJ-ESP-001-C001", nombre: "Gestión Proyectos Sociales", tipo: "concepto", valores: [3.8, 4.7, 3.2, 3.7, 4.5] },
        { id: "CONC003", nombre: "Ley de Insolvencia", tipo: "concepto", valores: [5.0, 4.5, 5.0, 4.0, 5.0] },
        { id: "CONC005", nombre: "Violencia Económica", tipo: "concepto", valores: [4.5, 4.5, 3.8, 3.8, 4.7] },
        { id: "COMP004", nombre: "Conoce Ley Insolvencia", tipo: "competencia", valores: [4.5, 4.8, 5.0, 4.3, 4.8] },
        { id: "COMP001", nombre: "Diseña Proyectos Sociales", tipo: "competencia", valores: [3.3, 4.3, 2.3, 2.9, 4.3] },
        { id: "COMP006", nombre: "Contrarresta Violencia Económica", tipo: "competencia", valores: [4.5, 4.8, 4.3, 4.0, 4.8] }
    ];

    // Visualización de diagrama de estrella para cada elemento
    const datosEstrella = [
        {
            id: "PFJYA2025-FJ-ESP-001-C001",
            nombre: "Gestión Proyectos Sociales",
            tipo: "concepto",
            categorias: ["Claridad", "Relevancia", "Fundamentación", "Consistencia", "Actualidad"],
            valores: [3.8, 4.7, 3.2, 3.7, 4.5],
            consenso: 0.83 // Porcentaje de validadores favorables
        },
        {
            id: "CONC003",
            nombre: "Ley de Insolvencia",
            tipo: "concepto",
            categorias: ["Claridad", "Relevancia", "Fundamentación", "Consistencia", "Actualidad"],
            valores: [5.0, 4.5, 5.0, 4.0, 5.0],
            consenso: 0.75
        },
        {
            id: "CONC005",
            nombre: "Violencia Económica",
            tipo: "concepto",
            categorias: ["Claridad", "Relevancia", "Fundamentación", "Consistencia", "Actualidad"],
            valores: [4.5, 4.5, 3.8, 3.8, 4.7],
            consenso: 0.83
        },
        {
            id: "COMP004",
            nombre: "Conoce Ley Insolvencia",
            tipo: "competencia",
            categorias: ["Claridad", "Relevancia", "Fundamentación", "Consistencia", "Actualidad"],
            valores: [4.5, 4.8, 5.0, 4.3, 4.8],
            consenso: 1.0
        },
        {
            id: "COMP001",
            nombre: "Diseña Proyectos Sociales",
            tipo: "competencia",
            categorias: ["Claridad", "Relevancia", "Fundamentación", "Consistencia", "Actualidad"],
            valores: [3.3, 4.3, 2.3, 2.9, 4.3],
            consenso: 0.43
        },
        {
            id: "COMP006",
            nombre: "Contrarresta Violencia Económica",
            tipo: "competencia",
            categorias: ["Claridad", "Relevancia", "Fundamentación", "Consistencia", "Actualidad"],
            valores: [4.5, 4.8, 4.3, 4.0, 4.8],
            consenso: 0.83
        }
    ];

    // Análisis demográfico de validadores por elemento evaluado
    const analisisDemografico = [
        {
            id: "PFJYA2025-FJ-ESP-001-C001",
            nombre: "Gestión Proyectos Sociales",
            tipo: "concepto",
            datos: {
                por_genero: { "M": 3, "F": 3 },
                por_tipo: { "Juez": 2, "Académico": 2, "Abogado": 1, "Mediador": 1 },
                por_region: { 
                    "Metropolitana": 3, 
                    "Nor-Occidente": 1, 
                    "Sur-Occidente": 1, 
                    "Sur-Oriente": 1 
                }
            }
        },
        {
            id: "COMP001",
            nombre: "Diseña Proyectos Sociales",
            tipo: "competencia",
            datos: {
                por_genero: { "M": 3, "F": 4 },
                por_tipo: { "Juez": 3, "Académico": 2, "Mediador": 1, "Magistrado": 1 },
                por_region: { 
                    "Metropolitana": 2, 
                    "Nor-Occidente": 1,
                    "Oriente": 1,
                    "Nor-Oriente": 1,
                    "Sur-Oriente": 1,
                    "Central": 1
                }
            }
        }
    ];

    // Estadísticas globales del proceso de validación
    const estadisticasValidacion = {
        elementos_validados: {
            total: 6,
            conceptos: 3,
            competencias: 3
        },
        validadores_totales: perfilesValidadores.length,
        validaciones_realizadas: validacionesConceptos.reduce((acc, val) => acc + val.valoraciones.length, 0) + 
                               validacionesCompetencias.reduce((acc, val) => acc + val.valoraciones.length, 0),
        promedios_globales: {
            claridad: 4.3,
            relevancia: 4.6,
            fundamentacion: 3.9,
            consistencia: 3.8,
            actualidad: 4.7,
            general: 4.3
        },
        nivel_consenso_global: {
            alto: 3,
            medio: 1,
            bajo: 1,
            muy_alto: 1
        }
    };

    // Mapa 3D de conocimiento validado
    const mapa3DConocimiento = {
        nodos: [
            // Solo incluimos algunos nodos representativos para el ejemplo
            { id: "PFJYA2025-FJ-ESP-001-C001", tipo: "concepto", x: 0.2, y: 0.5, z: 0.7, radio: 0.08, color: "#4CAF50" },
            { id: "CONC003", tipo: "concepto", x: 0.7, y: 0.2, z: 0.5, radio: 0.1, color: "#4CAF50" },
            { id: "CONC005", tipo: "concepto", x: 0.5, y: 0.8, z: 0.3, radio: 0.09, color: "#4CAF50" },
            { id: "COMP004", tipo: "competencia", x: 0.7, y: 0.3, z: 0.5, radio: 0.12, color: "#2196F3" },
            { id: "COMP001", tipo: "competencia", x: 0.3, y: 0.6, z: 0.7, radio: 0.07, color: "#F44336" },
            { id: "COMP006", tipo: "competencia", x: 0.5, y: 0.9, z: 0.3, radio: 0.11, color: "#2196F3" }
        ],
        aristas: [
            { origen: "PFJYA2025-FJ-ESP-001-C001", destino: "COMP001", grosor: 0.03, color: "#90A4AE" },
            { origen: "CONC003", destino: "COMP004", grosor: 0.05, color: "#90A4AE" },
            { origen: "CONC005", destino: "COMP006", grosor: 0.04, color: "#90A4AE" }
        ],
        validacionNodos: [
            { id: "PFJYA2025-FJ-ESP-001-C001", consenso: 0.83, valor_promedio: 4.0, textura: "media" },
            { id: "CONC003", consenso: 0.75, valor_promedio: 4.7, textura: "lisa" },
            { id: "CONC005", consenso: 0.83, valor_promedio: 4.3, textura: "media" },
            { id: "COMP004", consenso: 1.0, valor_promedio: 4.7, textura: "lisa" },
            { id: "COMP001", consenso: 0.43, valor_promedio: 3.4, textura: "rugosa" },
            { id: "COMP006", consenso: 0.83, valor_promedio: 4.5, textura: "media" }
        ]
    };

    // Datos para coordenadas epistémicas (plano cartesiano de validación)
    const coordenadasEpistemicas = {
        ejes: {
            x: {
                nombre: "Relevancia Práctica",
                min: 0,
                max: 5
            },
            y: {
                nombre: "Consenso Colectivo",
                min: 0,
                max: 1
            }
        },
        puntos: [
            { id: "PFJYA2025-FJ-ESP-001-C001", x: 4.7, y: 0.83, radio: 4.0, nombre: "Gestión Proyectos Sociales" },
            { id: "CONC003", x: 4.5, y: 0.75, radio: 4.7, nombre: "Ley de Insolvencia" },
            { id: "CONC005", x: 4.5, y: 0.83, radio: 4.3, nombre: "Violencia Económica" },
            { id: "COMP004", x: 4.8, y: 1.0, radio: 4.7, nombre: "Conoce Ley Insolvencia" },
            { id: "COMP001", x: 4.3, y: 0.43, radio: 3.4, nombre: "Diseña Proyectos Sociales" },
            { id: "COMP006", x: 4.8, y: 0.83, radio: 4.5, nombre: "Contrarresta Violencia Económica" }
        ],
        cuadrantes: [
            { 
                id: "C1", 
                x_min: 2.5, 
                x_max: 5, 
                y_min: 0.5, 
                y_max: 1, 
                nombre: "Alto Consenso - Alta Relevancia",
                color: "#4CAF50" 
            },
            { 
                id: "C2", 
                x_min: 0, 
                x_max: 2.5, 
                y_min: 0.5, 
                y_max: 1, 
                nombre: "Alto Consenso - Baja Relevancia",
                color: "#FFC107" 
            },
            { 
                id: "C3", 
                x_min: 2.5, 
                x_max: 5, 
                y_min: 0, 
                y_max: 0.5, 
                nombre: "Bajo Consenso - Alta Relevancia",
                color: "#FF9800" 
            },
            { 
                id: "C4", 
                x_min: 0, 
                x_max: 2.5, 
                y_min: 0, 
                y_max: 0.5, 
                nombre: "Bajo Consenso - Baja Relevancia",
                color: "#F44336" 
            }
        ]
    };

    return {
        perfilesValidadores,
        dimensionesValidacion,
        validacionesConceptos,
        validacionesCompetencias,
        mapaCalorGeneral,
        datosEstrella,
        analisisDemografico,
        estadisticasValidacion,
        mapa3DConocimiento,
        coordenadasEpistemicas,
        meta: {
            totalValidadores: perfilesValidadores.length,
            totalElementosValidados: validacionesConceptos.length + validacionesCompetencias.length,
            totalValidaciones: validacionesConceptos.reduce((acc, val) => acc + val.valoraciones.length, 0) + 
                              validacionesCompetencias.reduce((acc, val) => acc + val.valoraciones.length, 0),
            descripcion: "La Capa 6 (Validación Epistémica Colectiva) registra y modela el proceso de validación humana sobre los nodos de conocimiento generados por la IA, permitiendo visualizar los niveles de consenso y disenso."
        }
    };
})();