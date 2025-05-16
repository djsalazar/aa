/**
 * dataCapa4.js - Capa de Marco Formal de Competencias Judiciales
 * Estructura de datos conceptualizada para la visualización de la Capa 4 del MOFJ
 */

const dataCapa4 = (function() {
    // Dominios de competencias (categorías principales)
    const dominios = [
        {
            id: "DOM001",
            nombre: "Competencias Jurídicas Sustantivas",
            descripcion: "Conocimientos técnicos específicos en las distintas ramas del derecho necesarios para ejercer la función jurisdiccional."
        },
        {
            id: "DOM002",
            nombre: "Competencias Procesales y Procedimentales",
            descripcion: "Capacidades relacionadas con los procedimientos y la aplicación de normativas procesales en el ámbito jurisdiccional."
        },
        {
            id: "DOM003",
            nombre: "Competencias Gerenciales y Organizacionales",
            descripcion: "Habilidades para la administración, gestión y dirección de recursos humanos, materiales y procesos en el ámbito judicial."
        },
        {
            id: "DOM004",
            nombre: "Competencias Relacionales y Comunicativas",
            descripcion: "Capacidades para establecer relaciones efectivas, comunicarse asertivamente y desarrollar empatía con diversos actores."
        },
        {
            id: "DOM005",
            nombre: "Competencias Éticas y Actitudinales",
            descripcion: "Valores, principios y comportamientos que orientan la conducta profesional del juez o funcionario judicial."
        },
        {
            id: "DOM006",
            nombre: "Competencias Tecnológicas",
            descripcion: "Habilidades para el uso y aprovechamiento de herramientas tecnológicas en el contexto judicial."
        }
    ];

    // Competencias formalizadas (agrupadas por dominios)
    const competenciasFormalizadas = [
        // Competencias Jurídicas Sustantivas
        {
            id: "CF001",
            dominio_id: "DOM001",
            nombre: "Aplica el marco normativo y jurisprudencial en materia de insolvencia",
            descripcion: "Conoce y aplica los conceptos, principios y procedimientos establecidos en la Ley de Insolvencia y jurisprudencia relacionada para la correcta gestión y resolución de casos.",
            indicadores: [
                "Identifica correctamente los supuestos de procedencia del concurso de acreedores",
                "Aplica adecuadamente las disposiciones sobre administración concursal",
                "Determina con precisión las clases de créditos y su prelación",
                "Resuelve conforme a derecho los medios de impugnación en materia concursal"
            ],
            competencias_originales: ["COMP004"]
        },
        {
            id: "CF002",
            dominio_id: "DOM001",
            nombre: "Aplica el marco normativo y jurisprudencial en materia de juicios sumarios",
            descripcion: "Conoce y aplica con precisión los conceptos, principios y procedimientos establecidos para los juicios sumarios, particularmente en casos de desahucio y cobro de rentas atrasadas.",
            indicadores: [
                "Identifica correctamente los supuestos de procedencia del juicio sumario de desahucio",
                "Aplica adecuadamente las normas procesales sobre notificaciones, audiencias y plazos",
                "Resuelve conforme a derecho los incidentes que surgen durante el proceso",
                "Dicta resoluciones debidamente fundamentadas en la normativa aplicable"
            ],
            competencias_originales: ["COMP005"]
        },
        {
            id: "CF003",
            dominio_id: "DOM001",
            nombre: "Aplica el marco normativo nacional e internacional en materia de derechos de las mujeres",
            descripcion: "Conoce y aplica los estándares, principios y normativas nacionales e internacionales para la protección y promoción de los derechos de las mujeres, con enfoque de género e interseccionalidad.",
            indicadores: [
                "Identifica y aplica adecuadamente los instrumentos internacionales sobre derechos de las mujeres",
                "Interpreta la normativa nacional en materia de violencia contra la mujer con perspectiva de género",
                "Incorpora en sus decisiones los estándares internacionales sobre igualdad y no discriminación",
                "Reconoce e identifica las diversas formas de violencia económica contra la mujer"
            ],
            competencias_originales: ["COMP006", "COMP007"]
        },
        
        // Competencias Procesales y Procedimentales
        {
            id: "CF004",
            dominio_id: "DOM002",
            nombre: "Gestiona eficazmente procesos concursales y de insolvencia",
            descripcion: "Aplica los procedimientos específicos para la tramitación de procesos concursales, garantizando el equilibrio entre los derechos de deudores y acreedores.",
            indicadores: [
                "Tramita correctamente las fases del proceso concursal",
                "Supervisa adecuadamente la actuación de la administración concursal",
                "Controla los plazos y términos procesales",
                "Garantiza el derecho de audiencia y defensa de las partes"
            ],
            competencias_originales: ["COMP004"]
        },
        {
            id: "CF005",
            dominio_id: "DOM002",
            nombre: "Conduce procesos judiciales sumarios con efectividad",
            descripcion: "Dirige y resuelve procesos sumarios con celeridad y respeto a las garantías procesales, particularmente en materias de arrendamiento y desahucio.",
            indicadores: [
                "Controla eficazmente los tiempos procesales conforme a la naturaleza sumaria",
                "Conduce audiencias con orden y eficiencia",
                "Gestiona adecuadamente la práctica de pruebas",
                "Ejecuta diligentemente las resoluciones dictadas"
            ],
            competencias_originales: ["COMP005"]
        },
        
        // Competencias Gerenciales y Organizacionales
        {
            id: "CF006",
            dominio_id: "DOM003",
            nombre: "Diseña y gestiona proyectos judiciales de impacto social",
            descripcion: "Aplica metodologías de gestión de proyectos para diseñar, implementar y evaluar iniciativas que mejoren el acceso a la justicia y la resolución de conflictos a nivel comunitario.",
            indicadores: [
                "Realiza diagnósticos participativos para identificar necesidades judiciales comunitarias",
                "Formula proyectos con objetivos claros, indicadores medibles y cronogramas viables",
                "Gestiona recursos humanos, materiales y financieros para la implementación de proyectos",
                "Evalúa resultados e impacto de los proyectos implementados",
                "Implementa mejoras continuas basadas en lecciones aprendidas"
            ],
            competencias_originales: ["COMP001"]
        },
        {
            id: "CF007",
            dominio_id: "DOM003",
            nombre: "Lidera equipos de facilitadores judiciales",
            descripcion: "Coordina y dirige equipos de facilitadores judiciales para promover el acceso a la justicia en comunidades rurales o vulnerables.",
            indicadores: [
                "Selecciona y capacita adecuadamente a facilitadores judiciales",
                "Establece mecanismos de comunicación y supervisión efectivos",
                "Motiva y reconoce el trabajo de los facilitadores",
                "Resuelve conflictos y promueve un clima de colaboración"
            ],
            competencias_originales: ["COMP002"]
        },
        
        // Competencias Relacionales y Comunicativas
        {
            id: "CF008",
            dominio_id: "DOM004",
            nombre: "Desarrolla alianzas interinstitucionales para mejorar el acceso a la justicia",
            descripcion: "Establece y mantiene relaciones de colaboración con instituciones públicas, privadas y organizaciones comunitarias para potenciar el acceso a la justicia.",
            indicadores: [
                "Identifica actores clave para establecer alianzas estratégicas",
                "Negocia acuerdos de colaboración beneficiosos para todas las partes",
                "Mantiene comunicación fluida con contrapartes institucionales",
                "Evalúa y fortalece continuamente las alianzas establecidas"
            ],
            competencias_originales: ["COMP003"]
        },
        {
            id: "CF009",
            dominio_id: "DOM004",
            nombre: "Comunica eficazmente en entornos judiciales diversos",
            descripcion: "Utiliza técnicas y estrategias de comunicación adaptadas a diferentes públicos y contextos en el ámbito judicial.",
            indicadores: [
                "Adapta su lenguaje según el interlocutor, simplificando términos técnicos cuando es necesario",
                "Escucha activamente a las partes procesales y otros actores",
                "Redacta documentos claros y comprensibles",
                "Utiliza canales de comunicación apropiados según el contexto"
            ],
            competencias_originales: ["COMP001", "COMP003"]
        },
        
        // Competencias Éticas y Actitudinales
        {
            id: "CF010",
            dominio_id: "DOM005",
            nombre: "Actúa con perspectiva de género en la función judicial",
            descripcion: "Incorpora la perspectiva de género en todas las actuaciones judiciales, reconociendo y abordando las desigualdades estructurales entre hombres y mujeres.",
            indicadores: [
                "Identifica y cuestiona estereotipos de género en casos judiciales",
                "Aplica protocolos de actuación con perspectiva de género",
                "Garantiza igualdad de trato y oportunidades procesales",
                "Utiliza lenguaje inclusivo en documentos y comunicaciones"
            ],
            competencias_originales: ["COMP006", "COMP007"]
        },
        {
            id: "CF011",
            dominio_id: "DOM005",
            nombre: "Promueve la protección de personas en situación de vulnerabilidad",
            descripcion: "Implementa acciones para garantizar el acceso a la justicia y la protección de los derechos de personas en condición de vulnerabilidad.",
            indicadores: [
                "Identifica factores de vulnerabilidad en las partes procesales",
                "Aplica ajustes razonables en procedimientos según necesidades específicas",
                "Prioriza la atención de casos con personas en situación de vulnerabilidad",
                "Deriva oportunamente a servicios especializados cuando es necesario"
            ],
            competencias_originales: ["COMP002", "COMP007"]
        },
        
        // Competencias Tecnológicas
        {
            id: "CF012",
            dominio_id: "DOM006",
            nombre: "Utiliza herramientas tecnológicas para la gestión judicial",
            descripcion: "Aprovecha recursos tecnológicos para mejorar la eficiencia y calidad en la gestión de procesos judiciales.",
            indicadores: [
                "Maneja sistemas de gestión de expedientes electrónicos",
                "Utiliza plataformas de videoconferencia para audiencias virtuales",
                "Gestiona bases de datos jurídicas para consulta de normativa y jurisprudencia",
                "Implementa herramientas de programación y seguimiento de actividades"
            ],
            competencias_originales: []
        }
    ];

    // Roles judiciales definidos
    const rolesJudiciales = [
        {
            id: "ROL001",
            nombre: "Juez/a de Paz",
            descripcion: "Imparte justicia en el nivel jurisdiccional más cercano a la comunidad, resolviendo asuntos de menor cuantía y conflictos comunitarios."
        },
        {
            id: "ROL002",
            nombre: "Juez/a de Primera Instancia",
            descripcion: "Conoce y resuelve en primera instancia los asuntos judiciales de su competencia específica (civil, penal, familia, etc.)."
        },
        {
            id: "ROL003",
            nombre: "Magistrado/a de Sala de Apelaciones",
            descripcion: "Conoce y resuelve recursos de apelación y otros medios de impugnación contra resoluciones de jueces de primera instancia."
        },
        {
            id: "ROL004",
            nombre: "Auxiliar Judicial",
            descripcion: "Apoya técnica y administrativamente la función jurisdiccional, realizando tareas procesales bajo la dirección del juez."
        },
        {
            id: "ROL005",
            nombre: "Trabajador/a Social Judicial",
            descripcion: "Realiza estudios socioeconómicos, visitas domiciliarias y acompañamiento a personas vulnerables en procesos judiciales."
        }
    ];

    // Matriz de niveles de dominio requeridos por rol y competencia
    // Niveles: 1 (Básico), 2 (Intermedio), 3 (Avanzado), 4 (Experto), null (No Aplica)
    const matrizNivelesDominio = [
        // Competencias Jurídicas Sustantivas
        { competencia_id: "CF001", rol_id: "ROL001", nivel_requerido: 1 },
        { competencia_id: "CF001", rol_id: "ROL002", nivel_requerido: 3 },
        { competencia_id: "CF001", rol_id: "ROL003", nivel_requerido: 4 },
        { competencia_id: "CF001", rol_id: "ROL004", nivel_requerido: 2 },
        { competencia_id: "CF001", rol_id: "ROL005", nivel_requerido: null },
        
        { competencia_id: "CF002", rol_id: "ROL001", nivel_requerido: 2 },
        { competencia_id: "CF002", rol_id: "ROL002", nivel_requerido: 3 },
        { competencia_id: "CF002", rol_id: "ROL003", nivel_requerido: 4 },
        { competencia_id: "CF002", rol_id: "ROL004", nivel_requerido: 2 },
        { competencia_id: "CF002", rol_id: "ROL005", nivel_requerido: null },
        
        { competencia_id: "CF003", rol_id: "ROL001", nivel_requerido: 2 },
        { competencia_id: "CF003", rol_id: "ROL002", nivel_requerido: 3 },
        { competencia_id: "CF003", rol_id: "ROL003", nivel_requerido: 4 },
        { competencia_id: "CF003", rol_id: "ROL004", nivel_requerido: 1 },
        { competencia_id: "CF003", rol_id: "ROL005", nivel_requerido: 3 },
        
        // Competencias Procesales y Procedimentales
        { competencia_id: "CF004", rol_id: "ROL001", nivel_requerido: null },
        { competencia_id: "CF004", rol_id: "ROL002", nivel_requerido: 3 },
        { competencia_id: "CF004", rol_id: "ROL003", nivel_requerido: 3 },
        { competencia_id: "CF004", rol_id: "ROL004", nivel_requerido: 2 },
        { competencia_id: "CF004", rol_id: "ROL005", nivel_requerido: null },
        
        { competencia_id: "CF005", rol_id: "ROL001", nivel_requerido: 3 },
        { competencia_id: "CF005", rol_id: "ROL002", nivel_requerido: 3 },
        { competencia_id: "CF005", rol_id: "ROL003", nivel_requerido: 3 },
        { competencia_id: "CF005", rol_id: "ROL004", nivel_requerido: 2 },
        { competencia_id: "CF005", rol_id: "ROL005", nivel_requerido: null },
        
        // Competencias Gerenciales y Organizacionales
        { competencia_id: "CF006", rol_id: "ROL001", nivel_requerido: 3 },
        { competencia_id: "CF006", rol_id: "ROL002", nivel_requerido: 2 },
        { competencia_id: "CF006", rol_id: "ROL003", nivel_requerido: 2 },
        { competencia_id: "CF006", rol_id: "ROL004", nivel_requerido: 1 },
        { competencia_id: "CF006", rol_id: "ROL005", nivel_requerido: 2 },
        
        { competencia_id: "CF007", rol_id: "ROL001", nivel_requerido: 4 },
        { competencia_id: "CF007", rol_id: "ROL002", nivel_requerido: 2 },
        { competencia_id: "CF007", rol_id: "ROL003", nivel_requerido: 1 },
        { competencia_id: "CF007", rol_id: "ROL004", nivel_requerido: 1 },
        { competencia_id: "CF007", rol_id: "ROL005", nivel_requerido: 2 },
        
        // Competencias Relacionales y Comunicativas
        { competencia_id: "CF008", rol_id: "ROL001", nivel_requerido: 3 },
        { competencia_id: "CF008", rol_id: "ROL002", nivel_requerido: 3 },
        { competencia_id: "CF008", rol_id: "ROL003", nivel_requerido: 3 },
        { competencia_id: "CF008", rol_id: "ROL004", nivel_requerido: 1 },
        { competencia_id: "CF008", rol_id: "ROL005", nivel_requerido: 3 },
        
        { competencia_id: "CF009", rol_id: "ROL001", nivel_requerido: 3 },
        { competencia_id: "CF009", rol_id: "ROL002", nivel_requerido: 3 },
        { competencia_id: "CF009", rol_id: "ROL003", nivel_requerido: 4 },
        { competencia_id: "CF009", rol_id: "ROL004", nivel_requerido: 2 },
        { competencia_id: "CF009", rol_id: "ROL005", nivel_requerido: 3 },
        
        // Competencias Éticas y Actitudinales
        { competencia_id: "CF010", rol_id: "ROL001", nivel_requerido: 3 },
        { competencia_id: "CF010", rol_id: "ROL002", nivel_requerido: 3 },
        { competencia_id: "CF010", rol_id: "ROL003", nivel_requerido: 4 },
        { competencia_id: "CF010", rol_id: "ROL004", nivel_requerido: 2 },
        { competencia_id: "CF010", rol_id: "ROL005", nivel_requerido: 4 },
        
        { competencia_id: "CF011", rol_id: "ROL001", nivel_requerido: 3 },
        { competencia_id: "CF011", rol_id: "ROL002", nivel_requerido: 3 },
        { competencia_id: "CF011", rol_id: "ROL003", nivel_requerido: 3 },
        { competencia_id: "CF011", rol_id: "ROL004", nivel_requerido: 2 },
        { competencia_id: "CF011", rol_id: "ROL005", nivel_requerido: 4 },
        
        // Competencias Tecnológicas
        { competencia_id: "CF012", rol_id: "ROL001", nivel_requerido: 2 },
        { competencia_id: "CF012", rol_id: "ROL002", nivel_requerido: 3 },
        { competencia_id: "CF012", rol_id: "ROL003", nivel_requerido: 3 },
        { competencia_id: "CF012", rol_id: "ROL004", nivel_requerido: 3 },
        { competencia_id: "CF012", rol_id: "ROL005", nivel_requerido: 2 }
    ];

    // Relaciones jerárquicas entre competencias (superCompetencia-subCompetencia)
    const relacionesJerarquicas = [
        {
            supercompetencia_id: "CF003",
            subcompetencia_id: "CF010",
            tipo: "incluye",
            descripcion: "La aplicación del marco normativo de derechos de las mujeres incluye actuar con perspectiva de género"
        },
        {
            supercompetencia_id: "CF006",
            subcompetencia_id: "CF007",
            tipo: "incluye",
            descripcion: "El diseño y gestión de proyectos judiciales incluye el liderazgo de equipos de facilitadores"
        },
        {
            supercompetencia_id: "CF008",
            subcompetencia_id: "CF009",
            tipo: "requiere",
            descripcion: "El desarrollo de alianzas requiere comunicación eficaz"
        }
    ];

    // Datos para representación gráfica del marco de competencias
    const estructuraGrafoCompetencias = {
        nodes: [
            // Nodos de dominios
            ...dominios.map(d => ({
                id: d.id,
                label: d.nombre,
                title: d.descripcion,
                group: 'dominios',
                value: 5,
                shape: 'hexagon'
            })),
            
            // Nodos de competencias
            ...competenciasFormalizadas.map(c => ({
                id: c.id,
                label: c.nombre.length > 25 ? c.nombre.substring(0, 22) + '...' : c.nombre,
                title: c.nombre,
                group: 'competencias',
                value: 3,
                shape: 'dot'
            })),
            
            // Nodos de roles
            ...rolesJudiciales.map(r => ({
                id: r.id,
                label: r.nombre,
                title: r.descripcion,
                group: 'roles',
                value: 4,
                shape: 'triangle'
            }))
        ],
        
        edges: [
            // Relaciones de competencias a dominios
            ...competenciasFormalizadas.map(c => ({
                from: c.id,
                to: c.dominio_id,
                label: 'pertenece',
                dashes: false,
                arrows: 'to',
                color: {color: '#2196F3'}
            })),
            
            // Relaciones jerárquicas entre competencias
            ...relacionesJerarquicas.map(r => ({
                from: r.supercompetencia_id,
                to: r.subcompetencia_id,
                label: r.tipo,
                dashes: true,
                arrows: 'to',
                color: {color: '#4CAF50'}
            })),
            
            // Relaciones de nivel de dominio (sólo las que tienen nivel 4 - Experto)
            ...matrizNivelesDominio
                .filter(m => m.nivel_requerido === 4)
                .map(m => ({
                    from: m.competencia_id,
                    to: m.rol_id,
                    label: 'dominio experto',
                    dashes: false,
                    width: 2,
                    arrows: 'to',
                    color: {color: '#FFC107'}
                }))
        ]
    };

    // Estructura para visualización de matriz de calor (roles vs competencias)
    const matrizCalorCompetencias = {
        roles: rolesJudiciales.map(r => r.nombre),
        competencias: competenciasFormalizadas.map(c => c.nombre),
        datos: rolesJudiciales.map(rol => 
            competenciasFormalizadas.map(comp => {
                const nivelItem = matrizNivelesDominio.find(m => 
                    m.rol_id === rol.id && m.competencia_id === comp.id
                );
                return nivelItem ? nivelItem.nivel_requerido : 0;
            })
        )
    };

    return {
        dominios,
        competenciasFormalizadas,
        rolesJudiciales,
        matrizNivelesDominio,
        relacionesJerarquicas,
        estructuraGrafoCompetencias,
        matrizCalorCompetencias,
        meta: {
            totalDominios: dominios.length,
            totalCompetencias: competenciasFormalizadas.length,
            totalRoles: rolesJudiciales.length,
            descripcion: "La Capa 4 (Marco Formal de Competencias Judiciales) establece un catálogo unificado de competencias organizadas por dominios y niveles según los roles judiciales."
        }
    };
})();