/**
 * dataCapa2.js - Capa Temático-Taxonómica
 * Estructura de datos para la visualización de la Capa 2 del MOFJ
 */

const dataCapa2 = (function() {
    // Áreas temáticas principales
    const areasPrincipales = [
        {
            id: "AP001",
            nombre: "Métodos Alternativos de Solución de Conflictos (MASC)",
            descripcion: "Aborda diferentes mecanismos para resolver conflictos fuera de los procesos judiciales tradicionales."
        },
        {
            id: "AP002",
            nombre: "Derecho Concursal / Insolvencia",
            descripcion: "Comprende normas y procedimientos relacionados con situaciones de insolvencia de deudores."
        },
        {
            id: "AP003",
            nombre: "Derecho Procesal Civil (Juicios Específicos)",
            descripcion: "Aborda procedimientos específicos en materia civil, como juicios sumarios."
        },
        {
            id: "AP004",
            nombre: "Violencia de Género y Derechos Económicos",
            descripcion: "Estudia la violencia contra la mujer en el ámbito económico y patrimonial."
        },
        {
            id: "AP005",
            nombre: "Trabajo Social y Derechos de las Mujeres",
            descripcion: "Enfocado en la protección y promoción de los derechos de las mujeres desde el trabajo social."
        }
    ];

    // Subareas o temas específicos
    const subAreas = [
        {
            id: "SA001",
            area_principal_id: "AP001",
            nombre: "Gestión de Proyectos Sociales",
            descripcion: "Metodologías y herramientas para la gestión de proyectos sociales en el ámbito judicial."
        },
        {
            id: "SA002",
            area_principal_id: "AP001",
            nombre: "Dirección y Liderazgo en servicios judiciales",
            descripcion: "Desarrollo de habilidades de liderazgo en el contexto de servicios judiciales."
        },
        {
            id: "SA003",
            area_principal_id: "AP001",
            nombre: "Comunicación Asertiva y Persuasiva",
            descripcion: "Técnicas de comunicación efectiva en entornos judiciales y comunitarios."
        },
        {
            id: "SA004",
            area_principal_id: "AP001",
            nombre: "Planificación Estratégica Comunitaria",
            descripcion: "Enfoques para la planificación de servicios judiciales en comunidades."
        },
        {
            id: "SA005",
            area_principal_id: "AP001",
            nombre: "Facilitadores Judiciales",
            descripcion: "Rol y funciones de facilitadores judiciales en el acceso a la justicia."
        },
        {
            id: "SA006",
            area_principal_id: "AP002",
            nombre: "Ley de Insolvencia",
            descripcion: "Marco legal sobre insolvencia y sus aplicaciones."
        },
        {
            id: "SA007",
            area_principal_id: "AP002",
            nombre: "Administración concursal",
            descripcion: "Gestión de la administración en procesos concursales."
        },
        {
            id: "SA008",
            area_principal_id: "AP002",
            nombre: "Trámite del concurso",
            descripcion: "Procedimientos específicos en el trámite concursal."
        },
        {
            id: "SA009",
            area_principal_id: "AP003",
            nombre: "Juicio Sumario de Desahucio",
            descripcion: "Procedimiento específico para el desahucio."
        },
        {
            id: "SA010",
            area_principal_id: "AP003",
            nombre: "Cobro de Rentas",
            descripcion: "Procedimientos para el cobro de rentas atrasadas."
        },
        {
            id: "SA011",
            area_principal_id: "AP004",
            nombre: "Violencia económica y patrimonial",
            descripcion: "Formas y manifestaciones de violencia económica contra la mujer."
        },
        {
            id: "SA012",
            area_principal_id: "AP004",
            nombre: "Empoderamiento económico de la mujer",
            descripcion: "Estrategias para el empoderamiento económico femenino."
        },
        {
            id: "SA013",
            area_principal_id: "AP004",
            nombre: "Marco legal de protección contra la violencia económica",
            descripcion: "Normativa nacional e internacional sobre protección contra violencia económica."
        },
        {
            id: "SA014",
            area_principal_id: "AP005",
            nombre: "Marco Legal de Protección de Derechos de las Mujeres",
            descripcion: "Legislación nacional e internacional sobre derechos de las mujeres."
        },
        {
            id: "SA015",
            area_principal_id: "AP005",
            nombre: "Intervención en Casos de Violencia de Género",
            descripcion: "Metodologías para intervención en casos de violencia de género."
        }
    ];

    // Mapeo de actividades a áreas temáticas
    const actividadAreaMapping = [
        {
            actividad_id: "PFJYA2025-FJ-ESP-001",
            area_principal_id: "AP001",
            subareas_ids: ["SA001", "SA002", "SA003", "SA004", "SA005"]
        },
        {
            actividad_id: "PFJYA2025-AJ-MCI-005",
            area_principal_id: "AP002",
            subareas_ids: ["SA006", "SA007", "SA008"]
        },
        {
            actividad_id: "PFJYA2025-AJ-MCI-006",
            area_principal_id: "AP003",
            subareas_ids: ["SA009", "SA010"]
        },
        {
            actividad_id: "PFJYA2025-GEN-PTEC-003",
            area_principal_id: "AP004",
            subareas_ids: ["SA011", "SA012", "SA013"]
        },
        {
            actividad_id: "PFJYA2025-GEN-PTEC-004",
            area_principal_id: "AP005",
            subareas_ids: ["SA014", "SA015"]
        }
    ];

    // Algunos temas específicos detallados (muestras)
    const temasEspecificos = [
        {
            id: "TE001",
            subarea_id: "SA001",
            nombre: "Diagnóstico participativo en comunidades",
            descripcion: "Métodos para realizar diagnósticos con participación comunitaria."
        },
        {
            id: "TE002",
            subarea_id: "SA001",
            nombre: "Ciclo de vida de proyectos judiciales sociales",
            descripcion: "Etapas en el ciclo de proyectos sociales en ámbito judicial."
        },
        {
            id: "TE003",
            subarea_id: "SA002",
            nombre: "Liderazgo situacional y dirección judicial",
            descripcion: "Estilos de liderazgo adaptados a contextos judiciales."
        },
        {
            id: "TE004",
            subarea_id: "SA006",
            nombre: "Antecedentes y Disposiciones Generales",
            descripcion: "Introducción, Indicadores económicos, Legislación existente, Conceptos generales, Casos emblemáticos."
        },
        {
            id: "TE005",
            subarea_id: "SA006",
            nombre: "Disposiciones Específicas",
            descripcion: "Supuestos de procedencia, Administración concursal, Trámite del concurso, Medios de impugnación, Clases de créditos, Comité de Acreedores, Planes de reorganización, Liquidación, Disposiciones derogatorias."
        },
        {
            id: "TE006",
            subarea_id: "SA009",
            nombre: "Marco legal aplicable al Juicio Sumario",
            descripcion: "Normativa que regula el procedimiento sumario."
        },
        {
            id: "TE007",
            subarea_id: "SA011",
            nombre: "Concepto de violencia económica en el contexto de género",
            descripcion: "Definición y caracterización de la violencia económica."
        },
        {
            id: "TE008",
            subarea_id: "SA011",
            nombre: "Formas de control financiero y patrimonial",
            descripcion: "Manifestaciones específicas del control financiero."
        }
    ];

    // Normativa legal por área
    const normativaLegal = [
        {
            id: "NL001",
            area_principal_id: "AP001",
            nombre: "Ley del Organismo Judicial",
            articulos: ["Artículos relativos a la administración de justicia y modernización"],
            relevancia: "Base para la implementación de programas que mejoren el servicio de justicia."
        },
        {
            id: "NL002",
            area_principal_id: "AP001",
            nombre: "Acuerdo 51-2014 CSJ",
            articulos: ["Artículo 1", "Artículo 3"],
            relevancia: "Creación y objetivos del Servicio Nacional de Facilitadores Judiciales."
        },
        {
            id: "NL003",
            area_principal_id: "AP002",
            nombre: "Ley de Insolvencia",
            articulos: ["Completa"],
            relevancia: "Marco regulatorio principal para procesos de insolvencia."
        },
        {
            id: "NL004",
            area_principal_id: "AP003",
            nombre: "Código Procesal Civil y Mercantil",
            articulos: ["Artículos sobre Juicio Sumario y Desahucio"],
            relevancia: "Regula el procedimiento del juicio sumario y desahucio."
        },
        {
            id: "NL005",
            area_principal_id: "AP004",
            nombre: "Convención sobre la Eliminación de Todas las Formas de Discriminación contra la Mujer (CEDAW)",
            articulos: ["Completa"],
            relevancia: "Marco internacional para abordar discriminación y violencia contra la mujer."
        }
    ];

    // Estructura de árbol para visualización jerárquica
    const arbolTematico = {
        name: "Áreas Temáticas",
        children: areasPrincipales.map(area => ({
            name: area.nombre,
            id: area.id,
            children: subAreas
                .filter(subarea => subarea.area_principal_id === area.id)
                .map(subarea => ({
                    name: subarea.nombre,
                    id: subarea.id,
                    children: temasEspecificos
                        .filter(tema => tema.subarea_id === subarea.id)
                        .map(tema => ({
                            name: tema.nombre,
                            id: tema.id,
                            size: 1
                        }))
                }))
        }))
    };

    // Datos para visualización de mapa de calor de cobertura temática
    const coberturaTemática = {
        areas: areasPrincipales.map(a => a.nombre),
        actividades: ["PFJYA2025-FJ-ESP-001", "PFJYA2025-AJ-MCI-005", "PFJYA2025-AJ-MCI-006", "PFJYA2025-GEN-PTEC-003", "PFJYA2025-GEN-PTEC-004"],
        matriz: [
            [1, 0, 0, 0, 0], // Actividad 1 cubre Área 1
            [0, 1, 0, 0, 0], // Actividad 2 cubre Área 2
            [0, 0, 1, 0, 0], // Actividad 3 cubre Área 3
            [0, 0, 0, 1, 0], // Actividad 4 cubre Área 4
            [0, 0, 0, 0, 1]  // Actividad 5 cubre Área 5
        ]
    };

    return {
        areasPrincipales,
        subAreas,
        actividadAreaMapping,
        temasEspecificos,
        normativaLegal,
        arbolTematico,
        coberturaTemática,
        meta: {
            totalAreas: areasPrincipales.length,
            totalSubareas: subAreas.length,
            totalTemasEspecificos: temasEspecificos.length,
            descripcion: "La Capa 2 (Temático-Taxonómica) representa la clasificación temática y disciplinar del contenido formativo."
        }
    };
})();