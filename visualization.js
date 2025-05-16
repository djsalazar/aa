/**
 * visualization.js - Funciones de visualización para el MOFJ
 * Este archivo contiene las funciones para visualizar todas las capas del modelo ontológico
 */

// Objeto principal para gestionar las visualizaciones
const MOFJVisualization = (function() {
    // Estado global
    const state = {
        currentLayer: 'all', // 'all', '1', '2', '3', '4', '5', '6'
        currentView: 'graph', // 'graph', 'sunburst', 'sankey'
        selectedNode: null,
        zoomLevel: 1,
        loadedData: {
            capa1: null,
            capa2: null,
            capa3: null,
            capa4: null,
            capa5: null,
            capa6: null
        },
        instances: {
            // Almacenará instancias de las visualizaciones
            graph: null,
            sunburst: null,
            sankey: null,
            heatmap: null,
            star: null,
            view3D: null
        },
        controllers: {}
    };

    /**
     * Inicialización general del módulo de visualización
     */
    function init() {
        console.log("Inicializando visualizaciones MOFJ...");
        loadData();
        setupEventListeners();
    }

    /**
     * Carga los datos de todas las capas
     */
    function loadData() {
        try {
            state.loadedData.capa1 = dataCapa1;
            state.loadedData.capa2 = dataCapa2;
            state.loadedData.capa3 = dataCapa3;
            state.loadedData.capa4 = dataCapa4;
            state.loadedData.capa5 = dataCapa5;
            state.loadedData.capa6 = dataCapa6;
            console.log("Datos cargados correctamente");
        } catch (e) {
            console.error("Error al cargar datos:", e);
        }
    }

    /**
     * Configura los listeners de eventos para la interacción
     */
    function setupEventListeners() {
        // Navegación entre capas
        document.querySelectorAll('#layers-nav li').forEach(item => {
            item.addEventListener('click', function() {
                const layer = this.getAttribute('data-layer');
                changeLayer(layer);
            });
        });

        // Botones de control de visualización
        document.querySelectorAll('.view-selector button').forEach(button => {
            button.addEventListener('click', function() {
                const view = this.getAttribute('data-view');
                changeView(view, this.closest('.view-selector'));
            });
        });

        // Controles de zoom
        document.getElementById('zoom-in').addEventListener('click', zoomIn);
        document.getElementById('zoom-out').addEventListener('click', zoomOut);
        document.getElementById('zoom-reset').addEventListener('click', zoomReset);

        // Panel de detalle
        document.getElementById('close-detail').addEventListener('click', closeDetailPanel);
        
        // Buscar
        document.getElementById('search-button').addEventListener('click', searchEntity);
        document.getElementById('search-input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchEntity();
            }
        });

        // Filtros
        document.getElementById('filter-type').addEventListener('change', updateFilterValues);
        document.getElementById('filter-value').addEventListener('change', applyFilter);
        
        // Exportar
        document.getElementById('export-detail').addEventListener('click', exportDetail);
        
        // Pantalla completa
        document.getElementById('fullscreen').addEventListener('click', toggleFullscreen);
        
        // Modal
        document.getElementById('close-modal').addEventListener('click', closeModal);
    }

    /**
     * Cambia entre capas
     */
    function changeLayer(layer) {
        // Actualizar estado
        state.currentLayer = layer;
        
        // Actualizar UI
        document.querySelectorAll('#layers-nav li').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-layer') === layer) {
                item.classList.add('active');
            }
        });
        
        // Mostrar/ocultar secciones
        const multicapaSection = document.getElementById('multicapa-section');
        const capaSection = document.getElementById('capa-section');
        const capa6Section = document.getElementById('capa6-section');
        
        multicapaSection.classList.remove('active');
        capaSection.classList.add('hidden');
        capa6Section.classList.add('hidden');
        
        if (layer === 'all') {
            multicapaSection.classList.add('active');
            renderMulticapaView();
        } else if (layer === '6') {
            capa6Section.classList.remove('hidden');
            renderCapa6View();
        } else {
            capaSection.classList.remove('hidden');
            updateCapaInfo(layer);
            renderCapaView(layer);
        }
    }

    /**
     * Cambia entre vistas dentro de una capa
     */
    function changeView(view, container) {
        // Actualizar botones
        container.querySelectorAll('button').forEach(btn => {
            btn.classList.remove('active');
        });
        container.querySelector(`button[data-view="${view}"]`).classList.add('active');
        
        // Actualizar vista en el container
        const viewContainer = container.closest('div').querySelector('.view-container');
        viewContainer.querySelectorAll('> div').forEach(div => {
            div.classList.remove('active');
        });
        viewContainer.querySelector(`#${view}-view`).classList.add('active');
        
        // Actualizar estado según el contexto
        if (container.closest('#multicapa-section')) {
            state.currentView = view;
            renderMulticapaView();
        } else if (container.closest('#capa6-section')) {
            renderCapa6View(view);
        }
    }

    /**
     * Actualiza la información de la capa actual
     */
    function updateCapaInfo(layer) {
        const capaTitle = document.getElementById('capa-title');
        const capaDescription = document.getElementById('capa-description');
        const entityCount = document.getElementById('entity-count');
        const relationCount = document.getElementById('relation-count');
        
        let title, description, entities, relations;
        
        switch (layer) {
            case '1':
                title = "Capa 1: Académico-Administrativa";
                description = state.loadedData.capa1.meta.descripcion;
                entities = state.loadedData.capa1.meta.totalActividades;
                relations = state.loadedData.capa1.meta.totalRelaciones;
                break;
            case '2':
                title = "Capa 2: Temático-Taxonómica";
                description = state.loadedData.capa2.meta.descripcion;
                entities = state.loadedData.capa2.meta.totalAreas + state.loadedData.capa2.meta.totalSubareas;
                relations = state.loadedData.capa2.actividadAreaMapping.length;
                break;
            case '3':
                title = "Capa 3: Taxonomía Global Enriquecida";
                description = state.loadedData.capa3.meta.descripcion;
                entities = state.loadedData.capa3.meta.totalCompetencias + state.loadedData.capa3.meta.totalConceptos + state.loadedData.capa3.meta.totalNormativas;
                relations = state.loadedData.capa3.meta.totalRelaciones;
                break;
            case '4':
                title = "Capa 4: Marco Formal de Competencias";
                description = state.loadedData.capa4.meta.descripcion;
                entities = state.loadedData.capa4.meta.totalDominios + state.loadedData.capa4.meta.totalCompetencias + state.loadedData.capa4.meta.totalRoles;
                relations = state.loadedData.capa4.relacionesJerarquicas.length + state.loadedData.capa4.matrizNivelesDominio.length;
                break;
            case '5':
                title = "Capa 5: Sistema de Evaluación por Niveles";
                description = state.loadedData.capa5.meta.descripcion;
                entities = state.loadedData.capa5.meta.totalNiveles + state.loadedData.capa5.meta.totalInstrumentos;
                relations = state.loadedData.capa5.meta.totalIndicadores;
                break;
            case '6':
                title = "Capa 6: Validación Colectiva";
                description = state.loadedData.capa6.meta.descripcion;
                entities = state.loadedData.capa6.meta.totalElementosValidados;
                relations = state.loadedData.capa6.meta.totalValidaciones;
                break;
        }
        
        capaTitle.textContent = title;
        capaDescription.textContent = description;
        entityCount.textContent = entities;
        relationCount.textContent = relations;
    }

    /**
     * Abre el panel de detalles con la información de una entidad
     */
    function openDetailPanel(entity, type) {
        const detailPanel = document.getElementById('detail-panel');
        const detailTitle = document.getElementById('detail-title');
        const entityDetails = document.getElementById('entity-details');
        const relatedEntities = document.getElementById('related-entities');
        const validationMetrics = document.getElementById('validation-metrics');
        
        // Establecer título y mostrar panel
        detailTitle.textContent = entity.nombre || entity.label || entity.id;
        detailPanel.classList.remove('hidden');
        
        // Limpiar contenido previo
        entityDetails.innerHTML = '';
        relatedEntities.innerHTML = '';
        
        // Generar contenido de detalles según tipo
        const detailHTML = generateEntityDetailHTML(entity, type);
        entityDetails.innerHTML = detailHTML;
        
        // Generar contenido de entidades relacionadas
        const relatedHTML = generateRelatedEntitiesHTML(entity, type);
        if (relatedHTML) {
            relatedEntities.innerHTML = relatedHTML;
        }
        
        // Si es un concepto o competencia y existe validación, mostrar métricas
        if ((type === 'concepto' || type === 'competencia') && state.loadedData.capa6) {
            let validacion = null;
            
            if (type === 'concepto') {
                validacion = state.loadedData.capa6.validacionesConceptos.find(v => v.concepto_id === entity.id);
            } else if (type === 'competencia') {
                validacion = state.loadedData.capa6.validacionesCompetencias.find(v => v.competencia_id === entity.id);
            }
            
            if (validacion) {
                validationMetrics.classList.remove('hidden');
                renderValidationMetrics(entity.id, type);
            } else {
                validationMetrics.classList.add('hidden');
            }
        } else {
            validationMetrics.classList.add('hidden');
        }
        
        // Guardar nodo seleccionado
        state.selectedNode = {
            entity: entity,
            type: type
        };
    }

    /**
     * Cierra el panel de detalles
     */
    function closeDetailPanel() {
        document.getElementById('detail-panel').classList.add('hidden');
        state.selectedNode = null;
    }

    /**
     * Genera el HTML de detalles según el tipo de entidad
     */
    function generateEntityDetailHTML(entity, type) {
        let html = '';
        
        switch (type) {
            case 'actividad':
                html += `
                    <div class="detail-item">
                        <span class="detail-label">Código</span>
                        <div class="detail-value">${entity.id}</div>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Tipo</span>
                        <div class="detail-value">${entity.tipo}</div>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Eje Formativo</span>
                        <div class="detail-value">${entity.eje_formativo}</div>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Área Organizativa</span>
                        <div class="detail-value">${entity.area_organizativa}</div>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Modalidad</span>
                        <div class="detail-value">${entity.modalidad} (${entity.duracion_horas} horas)</div>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Objetivo</span>
                        <div class="detail-value">${entity.objetivo}</div>
                    </div>
                `;
                break;
                
            case 'area':
                html += `
                    <div class="detail-item">
                        <span class="detail-label">ID</span>
                        <div class="detail-value">${entity.id}</div>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Nombre</span>
                        <div class="detail-value">${entity.nombre}</div>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Descripción</span>
                        <div class="detail-value">${entity.descripcion}</div>
                    </div>
                `;
                break;
                
            case 'subarea':
                html += `
                    <div class="detail-item">
                        <span class="detail-label">ID</span>
                        <div class="detail-value">${entity.id}</div>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Nombre</span>
                        <div class="detail-value">${entity.nombre}</div>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Área Principal</span>
                        <div class="detail-value">${findAreaName(entity.area_principal_id)}</div>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Descripción</span>
                        <div class="detail-value">${entity.descripcion}</div>
                    </div>
                `;
                break;
                
            case 'concepto':
                html += `
                    <div class="detail-item">
                        <span class="detail-label">ID</span>
                        <div class="detail-value">${entity.id}</div>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Nombre</span>
                        <div class="detail-value">${entity.nombre}</div>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Tema General</span>
                        <div class="detail-value">${entity.tema_general}</div>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Descripción</span>
                        <div class="detail-value">${entity.descripcion}</div>
                    </div>
                `;
                break;
                
            case 'competencia':
                html += `
                    <div class="detail-item">
                        <span class="detail-label">ID</span>
                        <div class="detail-value">${entity.id}</div>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Nombre</span>
                        <div class="detail-value">${entity.nombre}</div>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Tipo</span>
                        <div class="detail-value">${entity.tipo}</div>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Descripción</span>
                        <div class="detail-value">${entity.descripcion}</div>
                    </div>
                `;
                break;
                
            case 'normativa':
                html += `
                    <div class="detail-item">
                        <span class="detail-label">ID</span>
                        <div class="detail-value">${entity.id}</div>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Nombre</span>
                        <div class="detail-value">${entity.nombre}</div>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Artículos</span>
                        <div class="detail-value">${entity.articulos}</div>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Descripción</span>
                        <div class="detail-value">${entity.descripcion}</div>
                    </div>
                `;
                break;
                
            case 'dominio':
                html += `
                    <div class="detail-item">
                        <span class="detail-label">ID</span>
                        <div class="detail-value">${entity.id}</div>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Nombre</span>
                        <div class="detail-value">${entity.nombre}</div>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Descripción</span>
                        <div class="detail-value">${entity.descripcion}</div>
                    </div>
                `;
                break;
                
            case 'competencia_formal':
                html += `
                    <div class="detail-item">
                        <span class="detail-label">ID</span>
                        <div class="detail-value">${entity.id}</div>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Nombre</span>
                        <div class="detail-value">${entity.nombre}</div>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Dominio</span>
                        <div class="detail-value">${findDominioName(entity.dominio_id)}</div>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Descripción</span>
                        <div class="detail-value">${entity.descripcion}</div>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Indicadores</span>
                        <div class="detail-value">
                            <ul>
                                ${entity.indicadores.map(i => `<li>${i}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                `;
                break;
                
            case 'nivel_dominio':
                html += `
                    <div class="detail-item">
                        <span class="detail-label">ID</span>
                        <div class="detail-value">${entity.id}</div>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Nivel</span>
                        <div class="detail-value">${entity.nivel} - ${entity.nombre}</div>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Descripción</span>
                        <div class="detail-value">${entity.descripcion}</div>
                    </div>
                `;
                break;
                
            case 'instrumento':
                html += `
                    <div class="detail-item">
                        <span class="detail-label">ID</span>
                        <div class="detail-value">${entity.id}</div>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Nombre</span>
                        <div class="detail-value">${entity.nombre}</div>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Descripción</span>
                        <div class="detail-value">${entity.descripcion}</div>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Aplicabilidad</span>
                        <div class="detail-value">${entity.aplicabilidad}</div>
                    </div>
                `;
                break;
                
            case 'validador':
                html += `
                    <div class="detail-item">
                        <span class="detail-label">ID</span>
                        <div class="detail-value">${entity.id}</div>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Tipo</span>
                        <div class="detail-value">${entity.tipo}</div>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Especialidad</span>
                        <div class="detail-value">${entity.especialidad}</div>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Experiencia</span>
                        <div class="detail-value">${entity.experiencia_anios} años</div>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Género</span>
                        <div class="detail-value">${entity.genero === 'M' ? 'Masculino' : 'Femenino'}</div>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Región</span>
                        <div class="detail-value">${entity.region}</div>
                    </div>
                `;
                break;
                
            default:
                html = `<div class="detail-item">No hay detalles disponibles para este tipo de entidad.</div>`;
        }
        
        return html;
    }

    /**
     * Genera el HTML de entidades relacionadas
     */
    function generateRelatedEntitiesHTML(entity, type) {
        let html = '<h3 class="related-title">Entidades Relacionadas</h3><div class="related-list">';
        let hasRelated = false;
        
        switch (type) {
            case 'actividad':
                // Buscar áreas relacionadas
                const areas = state.loadedData.capa2.actividadAreaMapping.filter(m => m.actividad_id === entity.id);
                if (areas.length > 0) {
                    hasRelated = true;
                    html += '<h4>Áreas Temáticas</h4>';
                    areas.forEach(area => {
                        const areaObj = state.loadedData.capa2.areasPrincipales.find(a => a.id === area.area_principal_id);
                        if (areaObj) {
                            html += `<div class="related-item" data-id="${areaObj.id}" data-type="area">${areaObj.nombre}</div>`;
                        }
                    });
                }
                
                // Buscar competencias relacionadas
                const competencias = state.loadedData.capa3.actividadCompetenciaMapping.filter(m => m.actividad_id === entity.id);
                if (competencias.length > 0) {
                    hasRelated = true;
                    html += '<h4>Competencias</h4>';
                    competencias[0].competencias_ids.forEach(compId => {
                        const compObj = state.loadedData.capa3.competencias.find(c => c.id === compId);
                        if (compObj) {
                            html += `<div class="related-item" data-id="${compObj.id}" data-type="competencia">${compObj.nombre}</div>`;
                        }
                    });
                }
                
                // Buscar conceptos relacionados
                const conceptos = state.loadedData.capa3.actividadConceptoMapping.filter(m => m.actividad_id === entity.id);
                if (conceptos.length > 0) {
                    hasRelated = true;
                    html += '<h4>Conceptos Clave</h4>';
                    conceptos[0].conceptos_ids.forEach(concId => {
                        const concObj = state.loadedData.capa3.conceptos.find(c => c.id === concId);
                        if (concObj) {
                            html += `<div class="related-item" data-id="${concObj.id}" data-type="concepto">${concObj.nombre}</div>`;
                        }
                    });
                }
                break;
                
            case 'area':
                // Buscar actividades relacionadas
                const actividadesArea = state.loadedData.capa2.actividadAreaMapping.filter(m => m.area_principal_id === entity.id);
                if (actividadesArea.length > 0) {
                    hasRelated = true;
                    html += '<h4>Actividades Formativas</h4>';
                    actividadesArea.forEach(act => {
                        const actObj = state.loadedData.capa1.actividades.find(a => a.id === act.actividad_id);
                        if (actObj) {
                            html += `<div class="related-item" data-id="${actObj.id}" data-type="actividad">${actObj.nombre}</div>`;
                        }
                    });
                }
                
                // Buscar subareas relacionadas
                const subareas = state.loadedData.capa2.subAreas.filter(s => s.area_principal_id === entity.id);
                if (subareas.length > 0) {
                    hasRelated = true;
                    html += '<h4>Subareas</h4>';
                    subareas.forEach(sub => {
                        html += `<div class="related-item" data-id="${sub.id}" data-type="subarea">${sub.nombre}</div>`;
                    });
                }
                break;
                
            case 'concepto':
                // Buscar actividades relacionadas
                const actividadesConcepto = state.loadedData.capa3.actividadConceptoMapping.filter(m => m.conceptos_ids.includes(entity.id));
                if (actividadesConcepto.length > 0) {
                    hasRelated = true;
                    html += '<h4>Actividades Formativas</h4>';
                    actividadesConcepto.forEach(act => {
                        const actObj = state.loadedData.capa1.actividades.find(a => a.id === act.actividad_id);
                        if (actObj) {
                            html += `<div class="related-item" data-id="${actObj.id}" data-type="actividad">${actObj.nombre}</div>`;
                        }
                    });
                }
                
                // Buscar competencias relacionadas
                const competenciasConcepto = state.loadedData.capa3.relacionesSemanticas.filter(r => 
                    r.origen_id === entity.id && r.tipo === 'desarrolla'
                );
                if (competenciasConcepto.length > 0) {
                    hasRelated = true;
                    html += '<h4>Competencias que desarrolla</h4>';
                    competenciasConcepto.forEach(rel => {
                        const compObj = state.loadedData.capa3.competencias.find(c => c.id === rel.destino_id);
                        if (compObj) {
                            html += `<div class="related-item" data-id="${compObj.id}" data-type="competencia">${compObj.nombre}</div>`;
                        }
                    });
                }
                
                // Buscar normativas relacionadas
                const normativasConcepto = state.loadedData.capa3.relacionesSemanticas.filter(r => 
                    r.destino_id === entity.id && r.tipo === 'fundamenta'
                );
                if (normativasConcepto.length > 0) {
                    hasRelated = true;
                    html += '<h4>Normativas Fundamentantes</h4>';
                    normativasConcepto.forEach(rel => {
                        const normObj = state.loadedData.capa3.referenciasNormativas.find(n => n.id === rel.origen_id);
                        if (normObj) {
                            html += `<div class="related-item" data-id="${normObj.id}" data-type="normativa">${normObj.nombre}</div>`;
                        }
                    });
                }
                
                // Si existe validación, mostrar enlace
                if (state.loadedData.capa6) {
                    const validacion = state.loadedData.capa6.validacionesConceptos.find(v => v.concepto_id === entity.id);
                    if (validacion) {
                        hasRelated = true;
                        html += '<h4>Validación Colectiva</h4>';
                        html += `<div class="related-item" data-id="${entity.id}" data-type="validacion_concepto">
                            Ver validación colectiva (${validacion.validadores.length} validadores)
                        </div>`;
                    }
                }
                break;
                
            case 'competencia':
                // Buscar actividades relacionadas
                const actividadesCompetencia = state.loadedData.capa3.actividadCompetenciaMapping.filter(m => m.competencias_ids.includes(entity.id));
                if (actividadesCompetencia.length > 0) {
                    hasRelated = true;
                    html += '<h4>Actividades Formativas</h4>';
                    actividadesCompetencia.forEach(act => {
                        const actObj = state.loadedData.capa1.actividades.find(a => a.id === act.actividad_id);
                        if (actObj) {
                            html += `<div class="related-item" data-id="${actObj.id}" data-type="actividad">${actObj.nombre}</div>`;
                        }
                    });
                }
                
                // Buscar conceptos relacionados
                const conceptosCompetencia = state.loadedData.capa3.relacionesSemanticas.filter(r => 
                    r.destino_id === entity.id && r.tipo === 'desarrolla'
                );
                if (conceptosCompetencia.length > 0) {
                    hasRelated = true;
                    html += '<h4>Conceptos que la desarrollan</h4>';
                    conceptosCompetencia.forEach(rel => {
                        const concObj = state.loadedData.capa3.conceptos.find(c => c.id === rel.origen_id);
                        if (concObj) {
                            html += `<div class="related-item" data-id="${concObj.id}" data-type="concepto">${concObj.nombre}</div>`;
                        }
                    });
                }
                
                // Buscar formalización en capa 4
                if (state.loadedData.capa4) {
                    const competenciaFormal = state.loadedData.capa4.competenciasFormalizadas.find(c => 
                        c.competencias_originales && c.competencias_originales.includes(entity.id)
                    );
                    if (competenciaFormal) {
                        hasRelated = true;
                        html += '<h4>Formalización en Marco de Competencias</h4>';
                        html += `<div class="related-item" data-id="${competenciaFormal.id}" data-type="competencia_formal">
                            ${competenciaFormal.nombre}
                        </div>`;
                    }
                }
                
                // Si existe validación, mostrar enlace
                if (state.loadedData.capa6) {
                    const validacion = state.loadedData.capa6.validacionesCompetencias.find(v => v.competencia_id === entity.id);
                    if (validacion) {
                        hasRelated = true;
                        html += '<h4>Validación Colectiva</h4>';
                        html += `<div class="related-item" data-id="${entity.id}" data-type="validacion_competencia">
                            Ver validación colectiva (${validacion.validadores.length} validadores)
                        </div>`;
                    }
                }
                break;
                
            case 'competencia_formal':
                // Buscar competencias originales
                if (entity.competencias_originales && entity.competencias_originales.length > 0) {
                    hasRelated = true;
                    html += '<h4>Competencias Originales</h4>';
                    entity.competencias_originales.forEach(compId => {
                        const compObj = state.loadedData.capa3.competencias.find(c => c.id === compId);
                        if (compObj) {
                            html += `<div class="related-item" data-id="${compObj.id}" data-type="competencia">${compObj.nombre}</div>`;
                        }
                    });
                }
                
                // Buscar dominio relacionado
                const dominio = state.loadedData.capa4.dominios.find(d => d.id === entity.dominio_id);
                if (dominio) {
                    hasRelated = true;
                    html += '<h4>Dominio</h4>';
                    html += `<div class="related-item" data-id="${dominio.id}" data-type="dominio">${dominio.nombre}</div>`;
                }
                
                // Buscar niveles de dominio relacionados
                const nivelesDominio = state.loadedData.capa5.indicadoresLogro.filter(i => i.competencia_id === entity.id);
                if (nivelesDominio.length > 0) {
                    hasRelated = true;
                    html += '<h4>Niveles de Dominio</h4>';
                    nivelesDominio.forEach(nivel => {
                        const nivelObj = state.loadedData.capa5.nivelesDominio.find(n => n.id === nivel.nivel_id);
                        if (nivelObj) {
                            html += `<div class="related-item" data-id="${nivelObj.id}" data-type="nivel_dominio">${nivelObj.nombre} (Nivel ${nivelObj.nivel})</div>`;
                        }
                    });
                }
                break;
                
            case 'nivel_dominio':
                // Buscar competencias evaluadas a este nivel
                const competenciasNivel = state.loadedData.capa5.indicadoresLogro.filter(i => i.nivel_id === entity.id);
                if (competenciasNivel.length > 0) {
                    hasRelated = true;
                    html += '<h4>Competencias Evaluadas</h4>';
                    competenciasNivel.forEach(ind => {
                        const compObj = state.loadedData.capa4.competenciasFormalizadas.find(c => c.id === ind.competencia_id);
                        if (compObj) {
                            html += `<div class="related-item" data-id="${compObj.id}" data-type="competencia_formal">${compObj.nombre}</div>`;
                        }
                    });
                }
                
                // Buscar instrumentos de evaluación
                const instrumentosNivel = state.loadedData.capa5.mapeoInstrumentosCompetencias.filter(m => m.nivel_id === entity.id);
                if (instrumentosNivel.length > 0) {
                    const instrumentosIds = new Set();
                    instrumentosNivel.forEach(m => m.instrumentos_ids.forEach(id => instrumentosIds.add(id)));
                    
                    if (instrumentosIds.size > 0) {
                        hasRelated = true;
                        html += '<h4>Instrumentos de Evaluación</h4>';
                        instrumentosIds.forEach(id => {
                            const instObj = state.loadedData.capa5.instrumentosEvaluacion.find(i => i.id === id);
                            if (instObj) {
                                html += `<div class="related-item" data-id="${instObj.id}" data-type="instrumento">${instObj.nombre}</div>`;
                            }
                        });
                    }
                }
                break;
                
            case 'validador':
                // Buscar conceptos validados
                let conceptosValidados = [];
                state.loadedData.capa6.validacionesConceptos.forEach(val => {
                    if (val.validadores.includes(entity.id)) {
                        const concObj = state.loadedData.capa3.conceptos.find(c => c.id === val.concepto_id);
                        if (concObj) conceptosValidados.push(concObj);
                    }
                });
                
                if (conceptosValidados.length > 0) {
                    hasRelated = true;
                    html += '<h4>Conceptos Validados</h4>';
                    conceptosValidados.forEach(conc => {
                        html += `<div class="related-item" data-id="${conc.id}" data-type="concepto">${conc.nombre}</div>`;
                    });
                }
                
                // Buscar competencias validadas
                let competenciasValidadas = [];
                state.loadedData.capa6.validacionesCompetencias.forEach(val => {
                    if (val.validadores.includes(entity.id)) {
                        const compObj = state.loadedData.capa3.competencias.find(c => c.id === val.competencia_id);
                        if (compObj) competenciasValidadas.push(compObj);
                    }
                });
                
                if (competenciasValidadas.length > 0) {
                    hasRelated = true;
                    html += '<h4>Competencias Validadas</h4>';
                    competenciasValidadas.forEach(comp => {
                        html += `<div class="related-item" data-id="${comp.id}" data-type="competencia">${comp.nombre}</div>`;
                    });
                }
                break;
        }
        
        html += '</div>';
        return hasRelated ? html : '';
    }

    /**
     * Función auxiliar para encontrar nombre de área por ID
     */
    function findAreaName(areaId) {
        const area = state.loadedData.capa2.areasPrincipales.find(a => a.id === areaId);
        return area ? area.nombre : 'No encontrada';
    }

    /**
     * Función auxiliar para encontrar nombre de dominio por ID
     */
    function findDominioName(dominioId) {
        const dominio = state.loadedData.capa4.dominios.find(d => d.id === dominioId);
        return dominio ? dominio.nombre : 'No encontrado';
    }

    /**
     * Renderiza las métricas de validación en el panel de detalle
     */
    function renderValidationMetrics(entityId, type) {
        const heatmapContainer = document.getElementById('heatmap-validation');
        const starContainer = document.getElementById('star-validation');
        
        // Limpiar contenedores
        heatmapContainer.innerHTML = '';
        starContainer.innerHTML = '';
        
        // Obtener datos de validación
        let validacion = null;
        let datos = null;
        
        if (type === 'concepto') {
            validacion = state.loadedData.capa6.validacionesConceptos.find(v => v.concepto_id === entityId);
            datos = state.loadedData.capa6.datosEstrella.find(d => d.id === entityId);
        } else if (type === 'competencia') {
            validacion = state.loadedData.capa6.validacionesCompetencias.find(v => v.competencia_id === entityId);
            datos = state.loadedData.capa6.datosEstrella.find(d => d.id === entityId);
        }
        
        if (!validacion || !datos) return;
        
        // Renderizar mapa de calor
        renderValidationHeatmap(heatmapContainer, validacion);
        
        // Renderizar diagrama de estrella
        renderValidationStar(starContainer, datos);
    }

    /**
     * Renderiza el mapa de calor de validación
     */
    function renderValidationHeatmap(container, validacion) {
        // Definir dimensiones
        const dimensions = state.loadedData.capa6.dimensionesValidacion.map(d => d.nombre);
        
        // Obtener datos de matriz
        const data = [];
        validacion.valoraciones.forEach(val => {
            const row = {
                validador: val.validador_id,
                general: val.validacion_general
            };
            
            val.valoraciones_dimensiones.forEach(vd => {
                const dimension = state.loadedData.capa6.dimensionesValidacion.find(d => d.id === vd.dimension_id);
                if (dimension) {
                    row[dimension.nombre] = vd.valor;
                }
            });
            
            data.push(row);
        });
        
        // Crear visualización con D3
        const margin = { top: 30, right: 30, bottom: 30, left: 100 };
        const width = container.clientWidth - margin.left - margin.right;
        const height = 200 - margin.top - margin.bottom;
        
        // Crear SVG
        const svg = d3.select(container)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);
        
        // Escalas
        const x = d3.scaleBand()
            .range([0, width])
            .domain(dimensions)
            .padding(0.01);
        
        const y = d3.scaleBand()
            .range([height, 0])
            .domain(data.map(d => d.validador))
            .padding(0.01);
        
        const color = d3.scaleLinear()
            .domain([1, 3, 5])
            .range(["#e74c3c", "#f39c12", "#2ecc71"]);
        
        // Añadir ejes
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x).tickSize(0))
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)");
        
        svg.append("g")
            .call(d3.axisLeft(y).tickSize(0))
            .selectAll("text")
            .text((d, i) => `Validador ${i+1}`);
        
        // Añadir celdas
        dimensions.forEach(dimension => {
            data.forEach(d => {
                svg.append("rect")
                    .attr("x", x(dimension))
                    .attr("y", y(d.validador))
                    .attr("width", x.bandwidth())
                    .attr("height", y.bandwidth())
                    .style("fill", color(d[dimension] || 0));
                
                svg.append("text")
                    .attr("x", x(dimension) + x.bandwidth() / 2)
                    .attr("y", y(d.validador) + y.bandwidth() / 2)
                    .attr("text-anchor", "middle")
                    .attr("dominant-baseline", "middle")
                    .text(d[dimension] || "")
                    .style("font-size", "9px")
                    .style("fill", d[dimension] > 3 ? "white" : "black");
            });
        });
        
        // Título
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", -10)
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .text("Valoraciones por dimensión");
    }

    /**
     * Renderiza el diagrama de estrella de validación
     */
    function renderValidationStar(container, datos) {
        // Crear elemento canvas para Chart.js
        const canvas = document.createElement('canvas');
        container.appendChild(canvas);
        
        // Configurar gráfico radar
        const ctx = canvas.getContext('2d');
        const chart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: datos.categorias,
                datasets: [{
                    label: 'Valoración',
                    data: datos.valores,
                    backgroundColor: 'rgba(52, 152, 219, 0.2)',
                    borderColor: 'rgba(52, 152, 219, 1)',
                    pointBackgroundColor: 'rgba(52, 152, 219, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(52, 152, 219, 1)'
                }]
            },
            options: {
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        min: 0,
                        max: 5,
                        ticks: {
                            stepSize: 1
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: `Valoración promedio (Consenso: ${Math.round(datos.consenso * 100)}%)`,
                        font: {
                            size: 12
                        }
                    }
                }
            }
        });
    }

    /**
     * Renderiza la vista de una capa específica
     */
    function renderCapaView(layer) {
        const container = document.getElementById('main-visualization');
        
        // Limpiar contenedor
        container.innerHTML = '';
        
        switch (layer) {
            case '1':
                renderCapa1View(container);
                break;
            case '2':
                renderCapa2View(container);
                break;
            case '3':
                renderCapa3View(container);
                break;
            case '4':
                renderCapa4View(container);
                break;
            case '5':
                renderCapa5View(container);
                break;
            case '6':
                // No renderizamos aquí, sino en la función específica renderCapa6View()
                break;
        }
    }

    /**
     * Renderiza la vista de la Capa 1 (Académico-Administrativa)
     */
    function renderCapa1View(container) {
        // Inicializar Cytoscape para la visualización de grafo
        const cy = cytoscape({
            container: container,
            elements: {
                nodes: state.loadedData.capa1.grafo.nodes,
                edges: state.loadedData.capa1.grafo.edges
            },
            style: [
                {
                    selector: 'node',
                    style: {
                        'background-color': '#fff',
                        'border-color': '#2196f3',
                        'border-width': 2,
                        'label': 'data(label)',
                        'color': '#333',
                        'text-valign': 'center',
                        'text-halign': 'center',
                        'font-size': '10px',
                        'width': '30px',
                        'height': '30px',
                        'text-wrap': 'wrap',
                        'text-max-width': '80px'
                    }
                },
                {
                    selector: 'node[group = 1]',
                    style: {
                        'background-color': '#c8e6c9',
                        'border-color': '#4caf50'
                    }
                },
                {
                    selector: 'node[group = 2]',
                    style: {
                        'background-color': '#bbdefb',
                        'border-color': '#2196f3'
                    }
                },
                {
                    selector: 'node[group = 3]',
                    style: {
                        'background-color': '#f8bbd0',
                        'border-color': '#e91e63'
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'width': 1,
                        'line-color': '#999',
                        'target-arrow-color': '#999',
                        'target-arrow-shape': 'triangle',
                        'curve-style': 'bezier',
                        'label': 'data(label)',
                        'font-size': '8px',
                        'text-background-opacity': 1,
                        'text-background-color': '#fff',
                        'text-background-padding': '2px'
                    }
                }
            ],
            layout: {
                name: 'cose',
                padding: 50,
                componentSpacing: 40,
                nodeOverlap: 20,
                nodeRepulsion: 400000,
                idealEdgeLength: 100,
                edgeElasticity: 100,
                nestingFactor: 5,
                gravity: 80,
                numIter: 1000,
                initialTemp: 200,
                coolingFactor: 0.95,
                minTemp: 1.0
            }
        });
        
        // Añadir evento de clic en nodos
        cy.on('tap', 'node', function(evt) {
            const node = evt.target;
            const data = node.data('data');
            if (data) {
                openDetailPanel(data, 'actividad');
            }
        });
        
        // Guardar instancia
        state.instances.graph = cy;
    }

    /**
     * Renderiza la vista de la Capa 2 (Temático-Taxonómica)
     */
    function renderCapa2View(container) {
        // Crear contenedor para el árbol
        const treeContainer = document.createElement('div');
        treeContainer.style.width = '100%';
        treeContainer.style.height = '100%';
        container.appendChild(treeContainer);
        
        // Inicializar visualización de árbol jerárquico
        const chart = echarts.init(treeContainer);
        
        // Configuración del gráfico
        const option = {
            tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove'
            },
            series: [
                {
                    type: 'tree',
                    data: [state.loadedData.capa2.arbolTematico],
                    top: '1%',
                    left: '7%',
                    bottom: '1%',
                    right: '20%',
                    symbolSize: 7,
                    label: {
                        position: 'left',
                        verticalAlign: 'middle',
                        align: 'right',
                        fontSize: 12
                    },
                    leaves: {
                        label: {
                            position: 'right',
                            verticalAlign: 'middle',
                            align: 'left'
                        }
                    },
                    emphasis: {
                        focus: 'descendant'
                    },
                    expandAndCollapse: true,
                    animationDuration: 550,
                    animationDurationUpdate: 750
                }
            ]
        };
        
        // Aplicar configuración
        chart.setOption(option);
        
        // Añadir evento de clic
        chart.on('click', function(params) {
            if (params.data && params.data.id) {
                // Determinar tipo
                let type = '';
                if (state.loadedData.capa2.areasPrincipales.find(a => a.id === params.data.id)) {
                    type = 'area';
                } else if (state.loadedData.capa2.subAreas.find(s => s.id === params.data.id)) {
                    type = 'subarea';
                } else {
                    type = 'tema';
                }
                
                // Buscar entidad completa
                let entity = null;
                if (type === 'area') {
                    entity = state.loadedData.capa2.areasPrincipales.find(a => a.id === params.data.id);
                } else if (type === 'subarea') {
                    entity = state.loadedData.capa2.subAreas.find(s => s.id === params.data.id);
                } else if (type === 'tema') {
                    entity = state.loadedData.capa2.temasEspecificos.find(t => t.id === params.data.id);
                }
                
                if (entity) {
                    openDetailPanel(entity, type);
                }
            }
        });
        
        // Redimensionar al cambiar tamaño de ventana
        window.addEventListener('resize', function() {
            chart.resize();
        });
        
        // Guardar instancia
        state.instances.sunburst = chart;
    }

    /**
     * Renderiza la vista de la Capa 3 (Taxonomía Global Enriquecida)
     */
    function renderCapa3View(container) {
        // Inicializar Cytoscape para la visualización de grafo de conocimiento
        const cy = cytoscape({
            container: container,
            elements: {
                nodes: state.loadedData.capa3.grafoConocimiento.nodes,
                edges: state.loadedData.capa3.grafoConocimiento.edges
            },
            style: [
                {
                    selector: 'node',
                    style: {
                        'background-color': '#fff',
                        'border-color': '#2196f3',
                        'border-width': 2,
                        'label': 'data(label)',
                        'color': '#333',
                        'text-valign': 'center',
                        'text-halign': 'center',
                        'font-size': '10px',
                        'width': '35px',
                        'height': '35px',
                        'text-wrap': 'wrap',
                        'text-max-width': '80px'
                    }
                },
                {
                    selector: 'node[group = "conceptos"]',
                    style: {
                        'background-color': '#d1c4e9',
                        'border-color': '#673ab7'
                    }
                },
                {
                    selector: 'node[group = "competencias"]',
                    style: {
                        'background-color': '#ffecb3',
                        'border-color': '#ffc107'
                    }
                },
                {
                    selector: 'node[group = "normativas"]',
                    style: {
                        'background-color': '#ffccbc',
                        'border-color': '#ff5722'
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'width': 1,
                        'line-color': '#999',
                        'target-arrow-color': '#999',
                        'target-arrow-shape': 'triangle',
                        'curve-style': 'bezier',
                        'label': 'data(label)',
                        'font-size': '8px',
                        'text-background-opacity': 1,
                        'text-background-color': '#fff',
                        'text-background-padding': '2px'
                    }
                }
            ],
            layout: {
                name: 'cose',
                padding: 50,
                componentSpacing: 40,
                nodeOverlap: 20,
                nodeRepulsion: 400000,
                idealEdgeLength: 100,
                edgeElasticity: 100,
                nestingFactor: 5,
                gravity: 80,
                numIter: 1000,
                initialTemp: 200,
                coolingFactor: 0.95,
                minTemp: 1.0
            }
        });
        
        // Añadir evento de clic en nodos
        cy.on('tap', 'node', function(evt) {
            const node = evt.target;
            const nodeId = node.id();
            const nodeGroup = node.data('group');
            
            let entity = null;
            let type = '';
            
            if (nodeGroup === 'conceptos') {
                entity = state.loadedData.capa3.conceptos.find(c => c.id === nodeId);
                type = 'concepto';
            } else if (nodeGroup === 'competencias') {
                entity = state.loadedData.capa3.competencias.find(c => c.id === nodeId);
                type = 'competencia';
            } else if (nodeGroup === 'normativas') {
                entity = state.loadedData.capa3.referenciasNormativas.find(n => n.id === nodeId);
                type = 'normativa';
            }
            
            if (entity) {
                openDetailPanel(entity, type);
            }
        });
        
        // Guardar instancia
        state.instances.graph = cy;
    }

    /**
     * Renderiza la vista de la Capa 4 (Marco Formal de Competencias)
     */
    function renderCapa4View(container) {
        // Inicializar Cytoscape para la visualización de grafo de competencias
        const cy = cytoscape({
            container: container,
            elements: {
                nodes: state.loadedData.capa4.estructuraGrafoCompetencias.nodes,
                edges: state.loadedData.capa4.estructuraGrafoCompetencias.edges
            },
            style: [
                {
                    selector: 'node',
                    style: {
                        'background-color': '#fff',
                        'border-color': '#2196f3',
                        'border-width': 2,
                        'label': 'data(label)',
                        'color': '#333',
                        'text-valign': 'center',
                        'text-halign': 'center',
                        'font-size': '10px',
                        'width': '35px',
                        'height': '35px',
                        'text-wrap': 'wrap',
                        'text-max-width': '80px'
                    }
                },
                {
                    selector: 'node[group = "dominios"]',
                    style: {
                        'background-color': '#d1c4e9',
                        'border-color': '#673ab7',
                        'shape': 'hexagon',
                        'width': '45px',
                        'height': '45px'
                    }
                },
                {
                    selector: 'node[group = "competencias"]',
                    style: {
                        'background-color': '#ffecb3',
                        'border-color': '#ffc107',
                        'shape': 'ellipse'
                    }
                },
                {
                    selector: 'node[group = "roles"]',
                    style: {
                        'background-color': '#c8e6c9',
                        'border-color': '#4caf50',
                        'shape': 'triangle'
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'width': 1,
                        'line-color': '#999',
                        'target-arrow-color': '#999',
                        'target-arrow-shape': 'triangle',
                        'curve-style': 'bezier',
                        'label': 'data(label)',
                        'font-size': '8px',
                        'text-background-opacity': 1,
                        'text-background-color': '#fff',
                        'text-background-padding': '2px'
                    }
                },
                {
                    selector: 'edge[color = "#2196F3"]',
                    style: {
                        'line-color': '#2196F3',
                        'target-arrow-color': '#2196F3'
                    }
                },
                {
                    selector: 'edge[color = "#4CAF50"]',
                    style: {
                        'line-color': '#4CAF50',
                        'target-arrow-color': '#4CAF50'
                    }
                },
                {
                    selector: 'edge[color = "#FFC107"]',
                    style: {
                        'line-color': '#FFC107',
                        'target-arrow-color': '#FFC107',
                        'width': 2
                    }
                }
            ],
            layout: {
                name: 'cose',
                padding: 50,
                componentSpacing: 40,
                nodeOverlap: 20,
                nodeRepulsion: 400000,
                idealEdgeLength: 100,
                edgeElasticity: 100,
                nestingFactor: 5,
                gravity: 80,
                numIter: 1000,
                initialTemp: 200,
                coolingFactor: 0.95,
                minTemp: 1.0
            }
        });
        
        // Añadir evento de clic en nodos
        cy.on('tap', 'node', function(evt) {
            const node = evt.target;
            const nodeId = node.id();
            const nodeGroup = node.data('group');
            
            let entity = null;
            let type = '';
            
            if (nodeGroup === 'dominios') {
                entity = state.loadedData.capa4.dominios.find(d => d.id === nodeId);
                type = 'dominio';
            } else if (nodeGroup === 'competencias') {
                entity = state.loadedData.capa4.competenciasFormalizadas.find(c => c.id === nodeId);
                type = 'competencia_formal';
            } else if (nodeGroup === 'roles') {
                entity = state.loadedData.capa4.rolesJudiciales.find(r => r.id === nodeId);
                type = 'rol';
            }
            
            if (entity) {
                openDetailPanel(entity, type);
            }
        });
        
        // Guardar instancia
        state.instances.graph = cy;
    }

    /**
     * Renderiza la vista de la Capa 5 (Sistema de Evaluación por Niveles)
     */
    function renderCapa5View(container) {
        // Crear contenedor para el grafo de progresión
        const graphContainer = document.createElement('div');
        graphContainer.style.width = '100%';
        graphContainer.style.height = '100%';
        container.appendChild(graphContainer);
        
        // Inicializar Cytoscape para la visualización del grafo de progresión
        const cy = cytoscape({
            container: graphContainer,
            elements: {
                nodes: state.loadedData.capa5.grafoProgresion.nodes,
                edges: state.loadedData.capa5.grafoProgresion.edges
            },
            style: [
                {
                    selector: 'node',
                    style: {
                        'background-color': '#fff',
                        'border-color': '#2196f3',
                        'border-width': 2,
                        'label': 'data(label)',
                        'color': '#333',
                        'text-valign': 'center',
                        'text-halign': 'center',
                        'font-size': '10px',
                        'width': '35px',
                        'height': '35px',
                        'text-wrap': 'wrap',
                        'text-max-width': '80px'
                    }
                },
                {
                    selector: 'node[group = "curso"]',
                    style: {
                        'background-color': '#c8e6c9',
                        'border-color': '#4caf50',
                        'shape': 'rectangle'
                    }
                },
                {
                    selector: 'node[group = "nivel1"]',
                    style: {
                        'background-color': '#bbdefb',
                        'border-color': '#2196f3'
                    }
                },
                {
                    selector: 'node[group = "nivel2"]',
                    style: {
                        'background-color': '#c5cae9',
                        'border-color': '#3f51b5'
                    }
                },
                {
                    selector: 'node[group = "nivel3"]',
                    style: {
                        'background-color': '#d1c4e9',
                        'border-color': '#673ab7'
                    }
                },
                {
                    selector: 'node[group = "nivel4"]',
                    style: {
                        'background-color': '#e1bee7',
                        'border-color': '#9c27b0'
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'width': 1,
                        'line-color': '#999',
                        'target-arrow-color': '#999',
                        'target-arrow-shape': 'triangle',
                        'curve-style': 'bezier'
                    }
                },
                {
                    selector: 'edge[dashes]',
                    style: {
                        'line-style': 'dashed'
                    }
                }
            ],
            layout: {
                name: 'cose',
                padding: 50,
                componentSpacing: 40,
                nodeOverlap: 20,
                nodeRepulsion: 400000,
                idealEdgeLength: 100,
                edgeElasticity: 100,
                nestingFactor: 5,
                gravity: 80,
                numIter: 1000,
                initialTemp: 200,
                coolingFactor: 0.95,
                minTemp: 1.0
            }
        });
        
        // Añadir evento de clic en nodos
        cy.on('tap', 'node', function(evt) {
            const node = evt.target;
            const nodeId = node.id();
            const nodeGroup = node.data('group');
            
            // Por simplicidad, solo manejaremos clics en cursos y niveles
            if (nodeGroup === 'curso') {
                const entity = state.loadedData.capa1.actividades.find(a => a.id === nodeId);
                if (entity) {
                    openDetailPanel(entity, 'actividad');
                }
            } else if (nodeGroup.startsWith('nivel')) {
                // Extraer ID de competencia y nivel del nodeId (formato: "COMP001-ND001")
                const parts = nodeId.split('-');
                if (parts.length === 2) {
                    const compId = parts[0];
                    const nivelId = parts[1];
                    
                    // Buscar nivel
                    const nivel = state.loadedData.capa5.nivelesDominio.find(n => n.id === nivelId);
                    if (nivel) {
                        openDetailPanel(nivel, 'nivel_dominio');
                    }
                }
            }
        });
        
        // Guardar instancia
        state.instances.graph = cy;
    }

    /**
     * Renderiza la vista de la Capa 6 (Validación Colectiva)
     */
    function renderCapa6View(view = 'heatmap') {
        const container = document.getElementById(`${view}-view`);
        
        // Limpiar contenedor
        container.innerHTML = '';
        
        switch (view) {
            case 'heatmap':
                renderValidationHeatmapView(container);
                break;
            case 'star':
                renderValidationStarView(container);
                break;
            case '3d':
                renderValidation3DView(container);
                break;
        }
    }

    /**
     * Renderiza la vista de mapa de calor de la Capa 6
     */
    function renderValidationHeatmapView(container) {
        // Crear contenedor para la visualización
        const heatmapContainer = document.createElement('div');
        heatmapContainer.style.width = '100%';
        heatmapContainer.style.height = '100%';
        container.appendChild(heatmapContainer);
        
        // Inicializar ECharts
        const chart = echarts.init(heatmapContainer);
        
        // Datos para el mapa de calor
        const data = [];
        state.loadedData.capa6.mapaCalorGeneral.forEach((item, rowIndex) => {
            item.valores.forEach((val, colIndex) => {
                data.push([colIndex, rowIndex, val]);
            });
        });
        
        // Etiquetas de filas (conceptos/competencias)
        const rowLabels = state.loadedData.capa6.mapaCalorGeneral.map(item => item.nombre);
        
        // Etiquetas de columnas (dimensiones)
        const colLabels = ["Claridad", "Relevancia", "Fundamentación", "Consistencia", "Actualidad"];
        
        // Configuración del mapa de calor
        const option = {
            tooltip: {
                position: 'top',
                formatter: function(params) {
                    const dimensionName = colLabels[params.data[0]];
                    const entityName = rowLabels[params.data[1]];
                    const value = params.data[2].toFixed(1);
                    return `${entityName}<br>${dimensionName}: ${value}`;
                }
            },
            grid: {
                top: '10%',
                left: '15%',
                right: '10%',
                bottom: '15%'
            },
            xAxis: {
                type: 'category',
                data: colLabels,
                splitArea: {
                    show: true
                }
            },
            yAxis: {
                type: 'category',
                data: rowLabels,
                splitArea: {
                    show: true
                }
            },
            visualMap: {
                min: 1,
                max: 5,
                calculable: true,
                orient: 'horizontal',
                left: 'center',
                bottom: '0%',
                color: ['#2ecc71', '#f39c12', '#e74c3c']
            },
            series: [{
                name: 'Valoración',
                type: 'heatmap',
                data: data,
                label: {
                    show: true,
                    formatter: function(params) {
                        return params.data[2].toFixed(1);
                    }
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };
        
        // Aplicar configuración
        chart.setOption(option);
        
        // Redimensionar al cambiar tamaño de ventana
        window.addEventListener('resize', function() {
            chart.resize();
        });
        
        // Añadir evento de clic
        chart.on('click', function(params) {
            if (params.componentType === 'series' && params.seriesType === 'heatmap') {
                const entityIndex = params.data[1];
                const entity = state.loadedData.capa6.mapaCalorGeneral[entityIndex];
                
                if (entity) {
                    let foundEntity = null;
                    let type = '';
                    
                    if (entity.tipo === 'concepto') {
                        foundEntity = state.loadedData.capa3.conceptos.find(c => c.id === entity.id);
                        type = 'concepto';
                    } else if (entity.tipo === 'competencia') {
                        foundEntity = state.loadedData.capa3.competencias.find(c => c.id === entity.id);
                        type = 'competencia';
                    }
                    
                    if (foundEntity) {
                        openDetailPanel(foundEntity, type);
                    }
                }
            }
        });
        
        // Guardar instancia
        state.instances.heatmap = chart;
    }

    /**
     * Renderiza la vista de diagrama de estrella de la Capa 6
     */
    function renderValidationStarView(container) {
        // Crear contenedor para la visualización
        const starContainer = document.createElement('div');
        starContainer.style.width = '100%';
        starContainer.style.height = '100%';
        container.appendChild(starContainer);
        
        // Inicializar ECharts
        const chart = echarts.init(starContainer);
        
        // Preparar datos de series
        const series = state.loadedData.capa6.datosEstrella.map(item => {
            return {
                name: item.nombre,
                value: item.valores,
                areaStyle: {
                    opacity: 0.3
                },
                type: item.tipo,
                consenso: item.consenso
            };
        });
        
        // Seleccionar 3 elementos para mostrar inicialmente
        const initialSeries = series.slice(0, 3);
        
        // Configuración del diagrama de radar
        const option = {
            title: {
                text: 'Diagrama de Validación por Dimensiones'
            },
            tooltip: {
                trigger: 'item',
                formatter: function(params) {
                    let result = `${params.name}<br>`;
                    params.value.forEach((val, idx) => {
                        result += `${state.loadedData.capa6.datosEstrella[0].categorias[idx]}: ${val.toFixed(1)}<br>`;
                    });
                    result += `Consenso: ${Math.round(params.data.consenso * 100)}%`;
                    return result;
                }
            },
            legend: {
                data: initialSeries.map(s => s.name),
                right: '0%',
                orient: 'vertical'
            },
            radar: {
                indicator: state.loadedData.capa6.datosEstrella[0].categorias.map(cat => {
                    return { name: cat, max: 5 };
                }),
                splitArea: {
                    show: true
                }
            },
            series: [{
                type: 'radar',
                data: initialSeries.map(s => {
                    return {
                        value: s.value,
                        name: s.name,
                        consenso: s.consenso,
                        type: s.type,
                        id: state.loadedData.capa6.datosEstrella.find(ds => ds.nombre === s.name).id
                    };
                })
            }]
        };
        
        // Aplicar configuración
        chart.setOption(option);
        
        // Redimensionar al cambiar tamaño de ventana
        window.addEventListener('resize', function() {
            chart.resize();
        });
        
        // Añadir evento de clic
        chart.on('click', function(params) {
            if (params.componentType === 'series') {
                const entityName = params.name;
                const entity = state.loadedData.capa6.datosEstrella.find(ds => ds.nombre === entityName);
                
                if (entity) {
                    let foundEntity = null;
                    let type = '';
                    
                    if (entity.tipo === 'concepto') {
                        foundEntity = state.loadedData.capa3.conceptos.find(c => c.id === entity.id);
                        type = 'concepto';
                    } else if (entity.tipo === 'competencia') {
                        foundEntity = state.loadedData.capa3.competencias.find(c => c.id === entity.id);
                        type = 'competencia';
                    }
                    
                    if (foundEntity) {
                        openDetailPanel(foundEntity, type);
                    }
                }
            }
        });
        
        // Guardar instancia
        state.instances.star = chart;
    }

    /**
     * Renderiza la vista 3D de la Capa 6
     */
    function renderValidation3DView(container) {
        // En un entorno real, esto sería implementado con Three.js
        // Para esta muestra, mostraremos una visualización simplificada con canvas
        
        const canvas = document.createElement('canvas');
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        container.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        
        // Fondo
        ctx.fillStyle = '#f5f5f5';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Centrar textos
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        // Título
        ctx.fillStyle = '#333';
        ctx.font = '18px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Visualización 3D de Validación (Concepto)', centerX, 50);
        
        // Nota explicativa
        ctx.font = '14px Arial';
        ctx.fillText('Esta visualización requiere WebGL para mostrar un mapa 3D interactivo', centerX, 80);
        ctx.fillText('donde la altura representa el nivel de consenso y el color la valoración.', centerX, 100);
        
        // Dibujar representación simple de nodos y aristas
        const nodes = state.loadedData.capa6.mapa3DConocimiento.nodos;
        const edges = state.loadedData.capa6.mapa3DConocimiento.aristas;
        
        // Escalar coordenadas
        const scaleFactor = 300;
        const offsetX = centerX - 150;
        const offsetY = centerY;
        
        // Dibujar aristas
        ctx.strokeStyle = '#90A4AE';
        ctx.lineWidth = 2;
        
        edges.forEach(edge => {
            const source = nodes.find(n => n.id === edge.origen);
            const target = nodes.find(n => n.id === edge.destino);
            
            if (source && target) {
                ctx.beginPath();
                ctx.moveTo(
                    offsetX + source.x * scaleFactor,
                    offsetY + source.y * scaleFactor
                );
                ctx.lineTo(
                    offsetX + target.x * scaleFactor,
                    offsetY + target.y * scaleFactor
                );
                ctx.stroke();
            }
        });
        
        // Dibujar nodos
        nodes.forEach(node => {
            const validacionInfo = state.loadedData.capa6.mapa3DConocimiento.validacionNodos.find(v => v.id === node.id);
            
            // Color basado en tipo y consenso
            let fillColor = node.color;
            if (validacionInfo) {
                // Oscurecer el color si el consenso es bajo
                const consensoFactor = validacionInfo.consenso;
                fillColor = adjustColorBrightness(node.color, consensoFactor);
            }
            
            // Dibujar círculo
            ctx.fillStyle = fillColor;
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(
                offsetX + node.x * scaleFactor,
                offsetY + node.y * scaleFactor,
                node.radio * 50,
                0,
                Math.PI * 2
            );
            ctx.fill();
            ctx.stroke();
            
            // Textura (patrón)
            if (validacionInfo) {
                if (validacionInfo.textura === 'rugosa') {
                    drawTexturePattern(
                        ctx, 
                        offsetX + node.x * scaleFactor,
                        offsetY + node.y * scaleFactor,
                        node.radio * 50,
                        'rugosa'
                    );
                } else if (validacionInfo.textura === 'media') {
                    drawTexturePattern(
                        ctx, 
                        offsetX + node.x * scaleFactor,
                        offsetY + node.y * scaleFactor,
                        node.radio * 50,
                        'media'
                    );
                }
            }
            
            // Etiqueta
            ctx.fillStyle = '#333';
            ctx.font = '10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(
                node.id.substring(0, 8) + '...',
                offsetX + node.x * scaleFactor,
                offsetY + node.y * scaleFactor + node.radio * 50 + 15
            );
            
            // Valor de validación si existe
            if (validacionInfo) {
                ctx.font = '12px Arial';
                ctx.fillText(
                    validacionInfo.valor_promedio.toFixed(1),
                    offsetX + node.x * scaleFactor,
                    offsetY + node.y * scaleFactor + 4
                );
            }
        });
        
        // Leyenda
        drawLegend(ctx, canvas.width - 120, 150);
        
        // Guardar instancia (aunque en este caso no es necesario)
        state.instances.view3D = {
            canvas: canvas,
            context: ctx
        };
    }
    
    /**
     * Dibuja un patrón de textura en un nodo
     */
    function drawTexturePattern(ctx, x, y, radius, textureType) {
        ctx.save();
        ctx.globalAlpha = 0.3;
        
        if (textureType === 'rugosa') {
            // Patrón de puntos aleatorios para textura rugosa
            for (let i = 0; i < 20; i++) {
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * radius * 0.8;
                const dotX = x + Math.cos(angle) * distance;
                const dotY = y + Math.sin(angle) * distance;
                
                ctx.fillStyle = '#fff';
                ctx.beginPath();
                ctx.arc(dotX, dotY, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        } else if (textureType === 'media') {
            // Patrón de líneas concéntricas para textura media
            for (let i = 1; i <= 3; i++) {
                ctx.strokeStyle = '#fff';
                ctx.beginPath();
                ctx.arc(x, y, radius * 0.3 * i, 0, Math.PI * 2);
                ctx.stroke();
            }
        }
        
        ctx.restore();
    }
    
    /**
     * Dibuja la leyenda para la visualización 3D
     */
    function drawLegend(ctx, x, y) {
        const legendItems = [
            { color: '#4CAF50', label: 'Alto Consenso' },
            { color: '#FFC107', label: 'Consenso Medio' },
            { color: '#F44336', label: 'Bajo Consenso' },
            { label: 'Textura Lisa', texture: 'lisa' },
            { label: 'Textura Media', texture: 'media' },
            { label: 'Textura Rugosa', texture: 'rugosa' }
        ];
        
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;
        ctx.fillRect(x - 10, y - 10, 130, 160);
        ctx.strokeRect(x - 10, y - 10, 130, 160);
        
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('Leyenda', x, y + 6);
        
        let offsetY = y + 30;
        legendItems.forEach(item => {
            if (item.color) {
                // Círculo de color
                ctx.fillStyle = item.color;
                ctx.beginPath();
                ctx.arc(x + 10, offsetY, 8, 0, Math.PI * 2);
                ctx.fill();
            } else if (item.texture) {
                // Círculo con textura
                ctx.fillStyle = '#aaa';
                ctx.beginPath();
                ctx.arc(x + 10, offsetY, 8, 0, Math.PI * 2);
                ctx.fill();
                
                if (item.texture !== 'lisa') {
                    drawTexturePattern(ctx, x + 10, offsetY, 8, item.texture);
                }
            }
            
            // Etiqueta
            ctx.fillStyle = '#333';
            ctx.fillText(item.label, x + 25, offsetY + 4);
            
            offsetY += 20;
        });
    }
    
    /**
     * Ajusta el brillo de un color con un factor (0-1)
     */
    function adjustColorBrightness(color, factor) {
        // Convertir color hexadecimal a RGB
        let r = parseInt(color.substring(1, 3), 16);
        let g = parseInt(color.substring(3, 5), 16);
        let b = parseInt(color.substring(5, 7), 16);
        
        // Ajustar brillo
        r = Math.floor(r * factor);
        g = Math.floor(g * factor);
        b = Math.floor(b * factor);
        
        // Convertir de nuevo a hexadecimal
        return `rgb(${r}, ${g}, ${b})`;
    }

    /**
     * Renderiza la vista multicapa
     */
    function renderMulticapaView() {
        // Se renderiza según la vista seleccionada
        const view = state.currentView;
        const container = document.getElementById(`${view}-view`);
        
        // Limpiar contenedor
        container.innerHTML = '';
        
        switch (view) {
            case 'graph':
                renderMulticapaGraphView(container);
                break;
            case 'sunburst':
                renderMulticapaSunburstView(container);
                break;
            case 'sankey':
                renderMulticapaSankeyView(container);
                break;
        }
    }

    /**
     * Renderiza la vista de grafo multicapa
     */
    /**
 * Corrección para el error de Cytoscape
 * 
 * El problema es que Cytoscape espera un formato específico para los elementos.
 * Necesitamos modificar cómo construimos los nodos y aristas.
 */

// Reemplazar la inicialización del grafo en renderMulticapaGraphView

function renderMulticapaGraphView(container) {
    // Crear datos combinados de las capas para el grafo
    const nodes = [];
    const edges = [];
    
    try {
        console.log("Iniciando renderización de grafo multicapa");
        
        // Verificar que los datos estén disponibles
        if (!state.loadedData.capa1 || !state.loadedData.capa1.actividades) {
            console.error("Datos de capa1 no disponibles");
            showErrorMessage(container, "Datos no disponibles. Verifique que los archivos de datos estén cargados correctamente.");
            return;
        }
        
        // Recopilar nodos y aristas relevantes de cada capa
        
        // Capa 1 - Actividades (selectivas)
        const actividades = state.loadedData.capa1.actividades || [];
        console.log("Actividades disponibles:", actividades.length);
        
        actividades.slice(0, 5).forEach(act => {
            nodes.push({
                data: {
                    id: act.id,
                    label: act.nombre.length > 20 ? act.nombre.substring(0, 17) + '...' : act.nombre,
                    title: act.nombre,
                    group: 'capa1',
                    value: 20,
                    data: act
                }
            });
        });
        
        // Inicializar con elementos básicos si no hay datos
        if (nodes.length === 0) {
            nodes.push({
                data: {
                    id: 'demo1',
                    label: 'Ejemplo Capa 1',
                    group: 'capa1',
                    value: 20
                }
            });
            
            nodes.push({
                data: {
                    id: 'demo2',
                    label: 'Ejemplo Capa 2',
                    group: 'capa2',
                    value: 15
                }
            });
            
            edges.push({
                data: {
                    id: 'edge1',
                    source: 'demo1',
                    target: 'demo2',
                    label: 'conecta con'
                }
            });
        }
        
        // Log para depuración
        console.log("Nodos preparados:", nodes.length);
        console.log("Aristas preparadas:", edges.length);
        
        // Inicializar Cytoscape con el formato correcto
        const cy = cytoscape({
            container: container,
            elements: [...nodes, ...edges], // Formato correcto para Cytoscape
            style: [
                {
                    selector: 'node',
                    style: {
                        'background-color': '#fff',
                        'border-color': '#2196f3',
                        'border-width': 2,
                        'label': 'data(label)',
                        'color': '#333',
                        'text-valign': 'center',
                        'text-halign': 'center',
                        'font-size': '10px',
                        'width': function(ele) { return ele.data('value') + 'px'; },
                        'height': function(ele) { return ele.data('value') + 'px'; },
                        'text-wrap': 'wrap',
                        'text-max-width': '80px'
                    }
                },
                {
                    selector: 'node[group = "capa1"]',
                    style: {
                        'background-color': '#c8e6c9',
                        'border-color': '#4caf50'
                    }
                },
                {
                    selector: 'node[group = "capa2"]',
                    style: {
                        'background-color': '#bbdefb',
                        'border-color': '#2196f3'
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'width': 1,
                        'line-color': '#999',
                        'target-arrow-color': '#999',
                        'target-arrow-shape': 'triangle',
                        'curve-style': 'bezier',
                        'label': 'data(label)',
                        'font-size': '8px',
                        'text-background-opacity': 1,
                        'text-background-color': '#fff',
                        'text-background-padding': '2px'
                    }
                }
            ],
            layout: {
                name: 'cose',
                padding: 50,
                componentSpacing: 40,
                nodeOverlap: 20,
                nodeRepulsion: 400000,
                idealEdgeLength: 100,
                edgeElasticity: 100,
                nestingFactor: 5,
                gravity: 80,
                numIter: 1000,
                initialTemp: 200,
                coolingFactor: 0.95,
                minTemp: 1.0
            }
        });
        
        // Guardar instancia
        state.instances.graph = cy;
        
        console.log("Grafo multicapa inicializado con éxito");
    } catch (error) {
        console.error("Error al renderizar grafo multicapa:", error);
        showErrorMessage(container, "Error al inicializar la visualización: " + error.message);
    }
}

// Función auxiliar para mostrar mensajes de error
function showErrorMessage(container, message) {
    // Limpiar el contenedor
    container.innerHTML = '';
    
    // Crear y mostrar mensaje de error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <div class="error-icon">⚠️</div>
        <div class="error-text">${message}</div>
        <div class="error-help">Verifique la consola del navegador para más detalles.</div>
    `;
    
    container.appendChild(errorDiv);
}

// Estructura básica de datos para dataCapa1.js como fallback
const dataCapa1Fallback = {
    actividades: [
        {
            id: "DEMO-001",
            nombre: "Curso de Demostración 1",
            tipo: "Curso",
            eje_formativo: "Funcionarios Judiciales",
            area_organizativa: "Especialización Judicial",
            modalidad: "Virtual",
            duracion_horas: 20,
            objetivo: "Este es un curso de ejemplo para la visualización"
        },
        {
            id: "DEMO-002",
            nombre: "Curso de Demostración 2",
            tipo: "Taller",
            eje_formativo: "Auxiliares Judiciales",
            area_organizativa: "Materia Civil",
            modalidad: "Virtual",
            duracion_horas: 10,
            objetivo: "Este es otro curso de ejemplo para la visualización"
        }
    ],
    grafo: {
        nodes: [],
        edges: []
    },
    meta: {
        totalActividades: 2,
        totalRelaciones: 0,
        descripcion: "Datos de demostración para la Capa 1"
    }
};

// Verificar y establecer datos de fallback si es necesario
if (!window.dataCapa1) {
    console.warn("Datos de capa1 no encontrados, utilizando fallback");
    window.dataCapa1 = dataCapa1Fallback;
}

    /**
     * Renderiza la vista radial multicapa
     */
    function renderMulticapaSunburstView(container) {
        // Crear visualización Sunburst multicapa
        const sunburstContainer = document.createElement('div');
        sunburstContainer.style.width = '100%';
        sunburstContainer.style.height = '100%';
        container.appendChild(sunburstContainer);
        
        // Inicializar ECharts
        const chart = echarts.init(sunburstContainer);
        
        // Preparar datos para estructura Sunburst
        const data = {
            name: 'MOFJ',
            itemStyle: {
                color: '#3498db'
            },
            children: [
                // Capa 1: Académico-Administrativa
                {
                    name: 'Capa 1: Académico-Administrativa',
                    itemStyle: {
                        color: '#4caf50'
                    },
                    children: state.loadedData.capa1.actividades.map(act => ({
                        name: act.nombre.length > 25 ? act.nombre.substring(0, 22) + '...' : act.nombre,
                        value: act.duracion_horas,
                        id: act.id,
                        tipo: 'actividad',
                        itemStyle: {
                            color: act.eje_formativo === 'Funcionarios Judiciales' ? '#a5d6a7' : 
                                   act.eje_formativo === 'Auxiliares Judiciales' ? '#c8e6c9' : '#e8f5e9'
                        }
                    }))
                },
                // Capa 2: Temático-Taxonómica
                {
                    name: 'Capa 2: Temático-Taxonómica',
                    itemStyle: {
                        color: '#2196f3'
                    },
                    children: state.loadedData.capa2.areasPrincipales.map(area => ({
                        name: area.nombre.length > 25 ? area.nombre.substring(0, 22) + '...' : area.nombre,
                        id: area.id,
                        tipo: 'area',
                        value: state.loadedData.capa2.actividadAreaMapping.filter(m => m.area_principal_id === area.id).length,
                        itemStyle: {
                            color: '#90caf9'
                        }
                    }))
                },
                // Capa 3: Taxonomía Global Enriquecida
                {
                    name: 'Capa 3: Taxonomía Global Enriquecida',
                    itemStyle: {
                        color: '#673ab7'
                    },
                    children: [
                        {
                            name: 'Competencias',
                            value: state.loadedData.capa3.competencias.length,
                            itemStyle: {
                                color: '#ffc107'
                            },
                            children: state.loadedData.capa3.competencias.slice(0, 10).map(comp => ({
                                name: comp.nombre.length > 20 ? comp.nombre.substring(0, 17) + '...' : comp.nombre,
                                value: 1,
                                id: comp.id,
                                tipo: 'competencia',
                                itemStyle: {
                                    color: '#ffe082'
                                }
                            }))
                        },
                        {
                            name: 'Conceptos',
                            value: state.loadedData.capa3.conceptos.length,
                            itemStyle: {
                                color: '#673ab7'
                            },
                            children: state.loadedData.capa3.conceptos.slice(0, 10).map(conc => ({
                                name: conc.nombre.length > 20 ? conc.nombre.substring(0, 17) + '...' : conc.nombre,
                                value: 1,
                                id: conc.id,
                                tipo: 'concepto',
                                itemStyle: {
                                    color: '#d1c4e9'
                                }
                            }))
                        }
                    ]
                }
            ]
        };
        
        // Añadir Capa 4 si está disponible
        if (state.loadedData.capa4) {
            data.children.push({
                name: 'Capa 4: Marco Formal de Competencias',
                itemStyle: {
                    color: '#9c27b0'
                },
                children: state.loadedData.capa4.dominios.map(dom => ({
                    name: dom.nombre.length > 20 ? dom.nombre.substring(0, 17) + '...' : dom.nombre,
                    id: dom.id,
                    tipo: 'dominio',
                    value: state.loadedData.capa4.competenciasFormalizadas.filter(c => c.dominio_id === dom.id).length || 1,
                    itemStyle: {
                        color: '#e1bee7'
                    }
                }))
            });
        }
        
        // Añadir Capa 5 si está disponible
        if (state.loadedData.capa5) {
            data.children.push({
                name: 'Capa 5: Sistema de Evaluación',
                itemStyle: {
                    color: '#ff5722'
                },
                children: state.loadedData.capa5.nivelesDominio.map(nivel => ({
                    name: `${nivel.nombre} (Nivel ${nivel.nivel})`,
                    id: nivel.id,
                    tipo: 'nivel_dominio',
                    value: 1,
                    itemStyle: {
                        color: '#ffccbc'
                    }
                }))
            });
        }
        
        // Añadir Capa 6 si está disponible
        if (state.loadedData.capa6) {
            data.children.push({
                name: 'Capa 6: Validación Colectiva',
                itemStyle: {
                    color: '#009688'
                },
                children: [
                    {
                        name: 'Validaciones',
                        value: state.loadedData.capa6.validacionesConceptos.length + state.loadedData.capa6.validacionesCompetencias.length,
                        itemStyle: {
                            color: '#80cbc4'
                        }
                    },
                    {
                        name: 'Validadores',
                        value: state.loadedData.capa6.perfilesValidadores.length,
                        itemStyle: {
                            color: '#b2dfdb'
                        },
                        children: state.loadedData.capa6.perfilesValidadores.map(val => ({
                            name: `${val.tipo} (${val.especialidad})`,
                            id: val.id,
                            tipo: 'validador',
                            value: 1,
                            itemStyle: {
                                color: '#e0f2f1'
                            }
                        }))
                    }
                ]
            });
        }
        
        // Opciones para visualización Sunburst
        const option = {
            title: {
                text: 'Visualización Jerárquica Multicapa',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: function(params) {
                    const item = params.data;
                    let result = `${item.name}<br>`;
                    
                    if (item.id) {
                        result += `ID: ${item.id}<br>`;
                    }
                    
                    if (item.value) {
                        if (item.tipo === 'actividad') {
                            result += `Duración: ${item.value} horas`;
                        } else {
                            result += `Elementos: ${item.value}`;
                        }
                    }
                    
                    return result;
                }
            },
            series: {
                type: 'sunburst',
                data: [data],
                radius: ['10%', '90%'],
                label: {
                    rotate: 'radial',
                    minAngle: 10
                },
                levels: [
                    {}, // Nivel raíz
                    {
                        r0: '10%',
                        r: '25%',
                        itemStyle: {
                            borderWidth: 2
                        },
                        label: {
                            rotate: 'tangential'
                        }
                    },
                    {
                        r0: '25%',
                        r: '50%',
                        label: {
                            align: 'right'
                        }
                    },
                    {
                        r0: '50%',
                        r: '65%',
                        label: {
                            position: 'outside',
                            padding: 3,
                            silent: false
                        },
                        itemStyle: {
                            borderWidth: 1
                        }
                    },
                    {
                        r0: '65%',
                        r: '70%',
                        label: {
                            position: 'outside',
                            padding: 3,
                            silent: false
                        },
                        itemStyle: {
                            borderWidth: 1
                        }
                    }
                ]
            }
        };
        
        // Aplicar opciones
        chart.setOption(option);
        
        // Eventos
        chart.on('click', function(params) {
            if (params.data && params.data.id && params.data.tipo) {
                let entity = null;
                const id = params.data.id;
                const tipo = params.data.tipo;
                
                switch (tipo) {
                    case 'actividad':
                        entity = state.loadedData.capa1.actividades.find(a => a.id === id);
                        break;
                    case 'area':
                        entity = state.loadedData.capa2.areasPrincipales.find(a => a.id === id);
                        break;
                    case 'competencia':
                        entity = state.loadedData.capa3.competencias.find(c => c.id === id);
                        break;
                    case 'concepto':
                        entity = state.loadedData.capa3.conceptos.find(c => c.id === id);
                        break;
                    case 'dominio':
                        entity = state.loadedData.capa4.dominios.find(d => d.id === id);
                        break;
                    case 'nivel_dominio':
                        entity = state.loadedData.capa5.nivelesDominio.find(n => n.id === id);
                        break;
                    case 'validador':
                        entity = state.loadedData.capa6.perfilesValidadores.find(v => v.id === id);
                        tipo = 'validador';
                        break;
                }
                
                if (entity) {
                    openDetailPanel(entity, tipo);
                }
            }
        });
        
        // Ajustar al cambiar tamaño de ventana
        window.addEventListener('resize', function() {
            chart.resize();
        });
        
        // Guardar instancia
        state.instances.sunburst = chart;
    }

    /**
     * Renderiza la vista de flujo Sankey multicapa
     */
    function renderMulticapaSankeyView(container) {
        // Crear visualización Sankey multicapa
        const sankeyContainer = document.createElement('div');
        sankeyContainer.style.width = '100%';
        sankeyContainer.style.height = '100%';
        container.appendChild(sankeyContainer);
        
        // Inicializar ECharts
        const chart = echarts.init(sankeyContainer);
        
        // Preparar datos para diagrama Sankey
        const data = {
            nodes: [],
            links: []
        };
        
        // Capa 1: Actividades (limitadas)
        const actividadesSeleccionadas = state.loadedData.capa1.actividades.slice(0, 3);
        actividadesSeleccionadas.forEach((act, index) => {
            data.nodes.push({
                name: `1-${index}: ${act.nombre.substring(0, 15)}...`,
                id: act.id,
                capa: 1,
                tipo: 'actividad',
                itemStyle: { color: '#4caf50' }
            });
        });
        
        // Capa 2: Áreas
        const areasSeleccionadas = state.loadedData.capa2.areasPrincipales.slice(0, 4);
        areasSeleccionadas.forEach((area, index) => {
            data.nodes.push({
                name: `2-${index}: ${area.nombre.substring(0, 15)}...`,
                id: area.id,
                capa: 2,
                tipo: 'area',
                itemStyle: { color: '#2196f3' }
            });
            
            // Enlaces Capa 1 -> Capa 2
            state.loadedData.capa2.actividadAreaMapping.forEach(mapping => {
                if (mapping.area_principal_id === area.id && 
                    actividadesSeleccionadas.some(a => a.id === mapping.actividad_id)) {
                    
                    const sourceNode = data.nodes.find(n => n.id === mapping.actividad_id);
                    const targetNode = data.nodes.find(n => n.id === area.id);
                    
                    if (sourceNode && targetNode) {
                        data.links.push({
                            source: sourceNode.name,
                            target: targetNode.name,
                            value: 1
                        });
                    }
                }
            });
        });
        
        // Capa 3: Conceptos y competencias
        const conceptosSeleccionados = state.loadedData.capa3.conceptos.slice(0, 3);
        conceptosSeleccionados.forEach((concepto, index) => {
            data.nodes.push({
                name: `3C-${index}: ${concepto.nombre.substring(0, 15)}...`,
                id: concepto.id,
                capa: 3,
                tipo: 'concepto',
                itemStyle: { color: '#673ab7' }
            });
            
            // Enlaces Capa 2 -> Capa 3 (conceptos)
            // Simplificamos suponiendo que los conceptos están relacionados con áreas por tema
            const areaRelacionada = areasSeleccionadas.find(area => 
                area.nombre.toLowerCase().includes(concepto.tema_general.toLowerCase()) ||
                concepto.tema_general.toLowerCase().includes(area.nombre.toLowerCase())
            );
            
            if (areaRelacionada) {
                const sourceNode = data.nodes.find(n => n.id === areaRelacionada.id);
                const targetNode = data.nodes.find(n => n.id === concepto.id);
                
                if (sourceNode && targetNode) {
                    data.links.push({
                        source: sourceNode.name,
                        target: targetNode.name,
                        value: 1
                    });
                }
            }
        });
        
        const competenciasSeleccionadas = state.loadedData.capa3.competencias.slice(0, 3);
        competenciasSeleccionadas.forEach((comp, index) => {
            data.nodes.push({
                name: `3P-${index}: ${comp.nombre.substring(0, 15)}...`,
                id: comp.id,
                capa: 3,
                tipo: 'competencia',
                itemStyle: { color: '#ffc107' }
            });
            
            // Enlaces Capa 1 -> Capa 3 (competencias)
            state.loadedData.capa3.actividadCompetenciaMapping.forEach(mapping => {
                if (mapping.competencias_ids.includes(comp.id) && 
                    actividadesSeleccionadas.some(a => a.id === mapping.actividad_id)) {
                    
                    const sourceNode = data.nodes.find(n => n.id === mapping.actividad_id);
                    const targetNode = data.nodes.find(n => n.id === comp.id);
                    
                    if (sourceNode && targetNode) {
                        data.links.push({
                            source: sourceNode.name,
                            target: targetNode.name,
                            value: 1
                        });
                    }
                }
            });
        });
        
        // Capa 4: Competencias formalizadas
        if (state.loadedData.capa4) {
            const competenciasFormalesSeleccionadas = state.loadedData.capa4.competenciasFormalizadas.slice(0, 3);
            competenciasFormalesSeleccionadas.forEach((compFormal, index) => {
                data.nodes.push({
                    name: `4-${index}: ${compFormal.nombre.substring(0, 15)}...`,
                    id: compFormal.id,
                    capa: 4,
                    tipo: 'competencia_formal',
                    itemStyle: { color: '#9c27b0' }
                });
                
                // Enlaces Capa 3 -> Capa 4
                if (compFormal.competencias_originales) {
                    compFormal.competencias_originales.forEach(origCompId => {
                        const compOriginal = competenciasSeleccionadas.find(c => c.id === origCompId);
                        
                        if (compOriginal) {
                            const sourceNode = data.nodes.find(n => n.id === compOriginal.id);
                            const targetNode = data.nodes.find(n => n.id === compFormal.id);
                            
                            if (sourceNode && targetNode) {
                                data.links.push({
                                    source: sourceNode.name,
                                    target: targetNode.name,
                                    value: 1
                                });
                            }
                        }
                    });
                }
            });
        }
        
        // Capa 5: Niveles de dominio
        if (state.loadedData.capa5 && state.loadedData.capa4) {
            const nivelesSeleccionados = state.loadedData.capa5.nivelesDominio.slice(0, 3);
            nivelesSeleccionados.forEach((nivel, index) => {
                data.nodes.push({
                    name: `5-${index}: ${nivel.nombre} (${nivel.nivel})`,
                    id: nivel.id,
                    capa: 5,
                    tipo: 'nivel_dominio',
                    itemStyle: { color: '#ff5722' }
                });
                
                // Conexión con competencias formales (simplificada)
                if (state.loadedData.capa4) {
                    const indicadores = state.loadedData.capa5.indicadoresLogro
                        .filter(ind => ind.nivel_id === nivel.id);
                    
                    indicadores.forEach(ind => {
                        const compFormal = data.nodes.find(n => n.id === ind.competencia_id && n.capa === 4);
                        if (compFormal) {
                            data.links.push({
                                source: compFormal.name,
                                target: data.nodes.find(n => n.id === nivel.id).name,
                                value: 1
                            });
                        }
                    });
                }
            });
        }
        
        // Capa 6: Validación (simplificada)
        if (state.loadedData.capa6) {
            // Añadir un solo nodo representativo
            data.nodes.push({
                name: '6: Validación Colectiva',
                id: 'validacion',
                capa: 6,
                tipo: 'validacion',
                itemStyle: { color: '#009688' }
            });
            
            // Conexiones con conceptos y competencias
            [...conceptosSeleccionados, ...competenciasSeleccionadas].forEach(item => {
                let validacion = null;
                
                if (item.id.startsWith('PFJYA') || item.id.startsWith('CONC')) {
                    validacion = state.loadedData.capa6.validacionesConceptos.find(v => v.concepto_id === item.id);
                } else {
                    validacion = state.loadedData.capa6.validacionesCompetencias.find(v => v.competencia_id === item.id);
                }
                
                if (validacion) {
                    const sourceNode = data.nodes.find(n => n.id === item.id);
                    if (sourceNode) {
                        data.links.push({
                            source: sourceNode.name,
                            target: '6: Validación Colectiva',
                            value: validacion.validadores.length
                        });
                    }
                }
            });
        }
        
        // Opciones para visualización Sankey
        const option = {
            title: {
                text: 'Flujo de Conocimiento Multicapa',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: function(params) {
                    if (params.dataType === 'node') {
                        const item = data.nodes.find(n => n.name === params.name);
                        return `${params.name}<br>Capa ${item.capa}: ${item.tipo}`;
                    } else {
                        return `${params.data.source} → ${params.data.target}<br>Valor: ${params.data.value}`;
                    }
                }
            },
            series: [{
                type: 'sankey',
                data: data.nodes,
                links: data.links,
                emphasis: {
                    focus: 'adjacency'
                },
                levels: [
                    {
                        depth: 0,
                        itemStyle: {
                            color: '#4caf50'
                        },
                        lineStyle: {
                            color: 'source',
                            opacity: 0.6
                        }
                    },
                    {
                        depth: 1,
                        itemStyle: {
                            color: '#2196f3'
                        },
                        lineStyle: {
                            color: 'source',
                            opacity: 0.6
                        }
                    },
                    {
                        depth: 2,
                        itemStyle: {
                            color: '#673ab7'
                        },
                        lineStyle: {
                            color: 'source',
                            opacity: 0.6
                        }
                    },
                    {
                        depth: 3,
                        itemStyle: {
                            color: '#9c27b0'
                        },
                        lineStyle: {
                            color: 'source',
                            opacity: 0.6
                        }
                    },
                    {
                        depth: 4,
                        itemStyle: {
                            color: '#ff5722'
                        },
                        lineStyle: {
                            color: 'source',
                            opacity: 0.6
                        }
                    },
                    {
                        depth: 5,
                        itemStyle: {
                            color: '#009688'
                        },
                        lineStyle: {
                            color: 'source',
                            opacity: 0.6
                        }
                    }
                ],
                lineStyle: {
                    curveness: 0.5
                }
            }]
        };
        
        // Aplicar opciones
        chart.setOption(option);
        
        // Eventos
        chart.on('click', function(params) {
            if (params.dataType === 'node') {
                const item = data.nodes.find(n => n.name === params.name);
                if (item && item.id !== 'validacion') {
                    let entity = null;
                    
                    switch (item.tipo) {
                        case 'actividad':
                            entity = state.loadedData.capa1.actividades.find(a => a.id === item.id);
                            break;
                        case 'area':
                            entity = state.loadedData.capa2.areasPrincipales.find(a => a.id === item.id);
                            break;
                        case 'concepto':
                            entity = state.loadedData.capa3.conceptos.find(c => c.id === item.id);
                            break;
                        case 'competencia':
                            entity = state.loadedData.capa3.competencias.find(c => c.id === item.id);
                            break;
                        case 'competencia_formal':
                            entity = state.loadedData.capa4.competenciasFormalizadas.find(c => c.id === item.id);
                            break;
                        case 'nivel_dominio':
                            entity = state.loadedData.capa5.nivelesDominio.find(n => n.id === item.id);
                            break;
                    }
                    
                    if (entity) {
                        openDetailPanel(entity, item.tipo);
                    }
                }
            }
        });
        
        // Ajustar al cambiar tamaño de ventana
        window.addEventListener('resize', function() {
            chart.resize();
        });
        
        // Guardar instancia
        state.instances.sankey = chart;
    }

    /**
     * Función de búsqueda
     */
    function searchEntity() {
        const searchInput = document.getElementById('search-input');
        const query = searchInput.value.trim().toLowerCase();
        
        if (query.length < 3) {
            showModal('Búsqueda', 'Por favor, ingrese al menos 3 caracteres para buscar.');
            return;
        }
        
        // Buscar en todas las capas
        const results = [];
        
        // Capa 1: Actividades
        state.loadedData.capa1.actividades.forEach(act => {
            if (act.nombre.toLowerCase().includes(query) || 
                act.id.toLowerCase().includes(query) ||
                (act.objetivo && act.objetivo.toLowerCase().includes(query))) {
                results.push({
                    id: act.id,
                    nombre: act.nombre,
                    tipo: 'actividad',
                    capa: 1,
                    entity: act
                });
            }
        });
        
        // Capa 2: Áreas
        state.loadedData.capa2.areasPrincipales.forEach(area => {
            if (area.nombre.toLowerCase().includes(query) || 
                area.id.toLowerCase().includes(query) ||
                (area.descripcion && area.descripcion.toLowerCase().includes(query))) {
                results.push({
                    id: area.id,
                    nombre: area.nombre,
                    tipo: 'area',
                    capa: 2,
                    entity: area
                });
            }
        });
        
        // Capa 3: Conceptos y competencias
        state.loadedData.capa3.conceptos.forEach(concepto => {
            if (concepto.nombre.toLowerCase().includes(query) || 
                concepto.id.toLowerCase().includes(query) ||
                (concepto.descripcion && concepto.descripcion.toLowerCase().includes(query))) {
                results.push({
                    id: concepto.id,
                    nombre: concepto.nombre,
                    tipo: 'concepto',
                    capa: 3,
                    entity: concepto
                });
            }
        });
        
        state.loadedData.capa3.competencias.forEach(comp => {
            if (comp.nombre.toLowerCase().includes(query) || 
                comp.id.toLowerCase().includes(query) ||
                (comp.descripcion && comp.descripcion.toLowerCase().includes(query))) {
                results.push({
                    id: comp.id,
                    nombre: comp.nombre,
                    tipo: 'competencia',
                    capa: 3,
                    entity: comp
                });
            }
        });
        
        // Capa 4: Competencias formalizadas
        if (state.loadedData.capa4) {
            state.loadedData.capa4.competenciasFormalizadas.forEach(compFormal => {
                if (compFormal.nombre.toLowerCase().includes(query) || 
                    compFormal.id.toLowerCase().includes(query) ||
                    (compFormal.descripcion && compFormal.descripcion.toLowerCase().includes(query))) {
                    results.push({
                        id: compFormal.id,
                        nombre: compFormal.nombre,
                        tipo: 'competencia_formal',
                        capa: 4,
                        entity: compFormal
                    });
                }
            });
        }
        
        // Mostrar resultados
        if (results.length === 0) {
            showModal('Búsqueda', 'No se encontraron resultados para la consulta.');
        } else if (results.length === 1) {
            // Si hay un solo resultado, mostrar directamente
            openDetailPanel(results[0].entity, results[0].tipo);
        } else {
            // Mostrar modal con lista de resultados
            showSearchResults(results);
        }
    }

    /**
     * Muestra los resultados de búsqueda en un modal
     */
    function showSearchResults(results) {
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');
        
        modalTitle.textContent = `Resultados de búsqueda (${results.length})`;
        
        let bodyHTML = '<div class="search-results">';
        
        // Agrupar por capa
        for (let capa = 1; capa <= 6; capa++) {
            const capaResults = results.filter(r => r.capa === capa);
            
            if (capaResults.length > 0) {
                bodyHTML += `<h4>Capa ${capa}</h4><ul>`;
                
                capaResults.forEach(result => {
                    bodyHTML += `<li class="search-result-item" data-id="${result.id}" data-type="${result.tipo}">
                        <span class="result-title">${result.nombre}</span>
                        <span class="result-type">${result.tipo}</span>
                    </li>`;
                });
                
                bodyHTML += '</ul>';
            }
        }
        
        bodyHTML += '</div>';
        modalBody.innerHTML = bodyHTML;
        
        // Añadir evento de clic a los resultados
        modalBody.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                const tipo = this.getAttribute('data-type');
                const result = results.find(r => r.id === id && r.tipo === tipo);
                
                if (result) {
                    openDetailPanel(result.entity, result.tipo);
                    closeModal();
                }
            });
        });
        
        // Mostrar modal
        modal.classList.remove('hidden');
    }

    /**
     * Función para mostrar un modal con mensaje
     */
    function showModal(title, message) {
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');
        
        modalTitle.textContent = title;
        modalBody.innerHTML = `<p>${message}</p>`;
        
        modal.classList.remove('hidden');
    }

    /**
     * Función para cerrar el modal
     */
    function closeModal() {
        document.getElementById('modal').classList.add('hidden');
    }

    /**
     * Actualiza los valores del filtro según el tipo seleccionado
     */
    function updateFilterValues() {
        const filterType = document.getElementById('filter-type');
        const filterValue = document.getElementById('filter-value');
        
        const type = filterType.value;
        
        // Limpiar opciones actuales
        filterValue.innerHTML = '<option value="">Seleccione un valor</option>';
        
        // Generar nuevas opciones según el tipo
        switch (type) {
            case 'eje':
                // Agregar ejes formativos
                const ejes = new Set(state.loadedData.capa1.actividades.map(a => a.eje_formativo));
                ejes.forEach(eje => {
                    const option = document.createElement('option');
                    option.value = eje;
                    option.textContent = eje;
                    filterValue.appendChild(option);
                });
                break;
                
            case 'area':
                // Agregar áreas temáticas
                state.loadedData.capa2.areasPrincipales.forEach(area => {
                    const option = document.createElement('option');
                    option.value = area.id;
                    option.textContent = area.nombre;
                    filterValue.appendChild(option);
                });
                break;
                
            case 'competencia':
                // Agregar competencias (limitadas)
                state.loadedData.capa3.competencias.slice(0, 10).forEach(comp => {
                    const option = document.createElement('option');
                    option.value = comp.id;
                    option.textContent = comp.nombre;
                    filterValue.appendChild(option);
                });
                break;
                
            case 'all':
                // No agregar opciones
                filterValue.disabled = true;
                return;
        }
        
        filterValue.disabled = false;
    }

    /**
     * Aplica el filtro seleccionado a la visualización actual
     */
    function applyFilter() {
        const filterType = document.getElementById('filter-type');
        const filterValue = document.getElementById('filter-value');
        
        const type = filterType.value;
        const value = filterValue.value;
        
        if (type === 'all' || !value) {
            // Reset filter
            if (state.instances.graph) {
                state.instances.graph.elements().removeClass('filtered');
                state.instances.graph.elements().style('opacity', 1);
            }
            return;
        }
        
        // Aplicar filtro según tipo y vista actual
        if (state.instances.graph) {
            // Para vista de grafo
            const cy = state.instances.graph;
            
            // Reset previous filter
            cy.elements().removeClass('filtered');
            cy.elements().style('opacity', 0.2);
            
            switch (type) {
                case 'eje':
                    // Filtrar por eje formativo
                    const nodesEje = cy.nodes().filter(node => {
                        const data = node.data('data');
                        return data && data.eje_formativo === value;
                    });
                    nodesEje.style('opacity', 1);
                    nodesEje.connectedEdges().style('opacity', 1);
                    break;
                    
                case 'area':
                    // Filtrar por área
                    const nodesArea = cy.nodes().filter(node => {
                        return node.id() === value;
                    });
                    nodesArea.style('opacity', 1);
                    nodesArea.connectedEdges().style('opacity', 1);
                    nodesArea.neighborhood().style('opacity', 1);
                    break;
                    
                case 'competencia':
                    // Filtrar por competencia
                    const nodesComp = cy.nodes().filter(node => {
                        return node.id() === value;
                    });
                    nodesComp.style('opacity', 1);
                    nodesComp.connectedEdges().style('opacity', 1);
                    nodesComp.neighborhood().style('opacity', 1);
                    break;
            }
        }
    }

    /**
     * Función para aumentar el zoom
     */
    function zoomIn() {
        if (state.instances.graph) {
            // Para grafo
            const cy = state.instances.graph;
            cy.zoom({
                level: cy.zoom() * 1.2,
                renderedPosition: { x: cy.width() / 2, y: cy.height() / 2 }
            });
        } else if (state.currentView === 'sunburst' && state.instances.sunburst) {
            // No hay zoom específico para sunburst
        }
    }

    /**
     * Función para disminuir el zoom
     */
    function zoomOut() {
        if (state.instances.graph) {
            // Para grafo
            const cy = state.instances.graph;
            cy.zoom({
                level: cy.zoom() / 1.2,
                renderedPosition: { x: cy.width() / 2, y: cy.height() / 2 }
            });
        } else if (state.currentView === 'sunburst' && state.instances.sunburst) {
            // No hay zoom específico para sunburst
        }
    }

    /**
     * Función para resetear el zoom
     */
    function zoomReset() {
        if (state.instances.graph) {
            // Para grafo
            const cy = state.instances.graph;
            cy.fit();
        } else if (state.currentView === 'sunburst' && state.instances.sunburst) {
            // No hay zoom específico para sunburst
        }
    }

    /**
     * Función para exportar detalle de una entidad
     */
    function exportDetail() {
        if (!state.selectedNode) {
            return;
        }
        
        const entity = state.selectedNode.entity;
        const type = state.selectedNode.type;
        
        // Generar texto plano con los detalles
        let content = `MOFJ - Detalles de ${type}\n\n`;
        
        if (entity.id) {
            content += `ID: ${entity.id}\n`;
        }
        
        if (entity.nombre) {
            content += `Nombre: ${entity.nombre}\n`;
        }
        
        if (entity.descripcion) {
            content += `Descripción: ${entity.descripcion}\n`;
        }
        
        // Agregar propiedades específicas según tipo
        switch (type) {
            case 'actividad':
                content += `Tipo: ${entity.tipo}\n`;
                content += `Eje Formativo: ${entity.eje_formativo}\n`;
                content += `Área Organizativa: ${entity.area_organizativa}\n`;
                content += `Modalidad: ${entity.modalidad}\n`;
                content += `Duración: ${entity.duracion_horas} horas\n`;
                content += `Objetivo: ${entity.objetivo}\n`;
                break;
                
            case 'competencia':
                content += `Tipo: ${entity.tipo}\n`;
                break;
        }
        
        // Crear un elemento para descargar
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `${type}_${entity.id}.txt`;
        a.click();
        
        URL.revokeObjectURL(url);
    }

    /**
     * Función para alternar pantalla completa
     */
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Error al intentar entrar en modo pantalla completa: ${err.message}`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }

    /**
     * Muestra el overlay de carga
     */
    function showLoading() {
        document.getElementById('loading-overlay').style.display = 'flex';
    }

    /**
     * Oculta el overlay de carga
     */
    function hideLoading() {
        document.getElementById('loading-overlay').style.display = 'none';
    }

    // API pública
    return {
        init,
        state,
        showLoading,
        hideLoading
    };
})();