// script.js (VERSIÓN MUY COMPLETA, CORREGIDA Y AMPLIADA)

document.addEventListener('DOMContentLoaded', () => {
    // Cache de elementos DOM
    const navButtons = document.querySelectorAll('nav button.nav-btn');
    const capas = document.querySelectorAll('.capa-visualizacion');
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const closeButton = document.querySelector('.close-button');

    // --- DATA PREPARATION ---
    // Asegurar que las variables de datos (dataTodo, dataC3, dataCapa4, etc.) están definidas globalmente
    const actividadesCapa1 = (typeof dataTodo !== 'undefined' && Array.isArray(dataTodo))
        ? dataTodo.filter(item => item && item.codigo && item.programa_formativo)
        : [];

    const taxonomiasCapa2ConPadre = (typeof dataTodo !== 'undefined' && Array.isArray(dataTodo))
        ? dataTodo.filter(item => item && item.area_principal).map((item, index, arr) => {
            // Intento de enlazar Capa 2 a Capa 1 si falta 'codigo_actividad_padre'
            // ESTO ES FRÁGIL. ES MEJOR QUE LOS DATOS DE CAPA 2 TENGAN 'codigo_actividad_padre'.
            if (item && !item.codigo_actividad_padre) {
                let padreEncontrado = null;
                for (let i = index - 1; i >= 0; i--) {
                    if (arr[i] && arr[i].codigo && arr[i].eje_formativo === item.eje_formativo &&
                        JSON.stringify(arr[i].poblacion_objetivo) === JSON.stringify(item.poblacion_objetivo)) {
                        padreEncontrado = arr[i].codigo;
                        break;
                    }
                }
                if (padreEncontrado) return { ...item, codigo_actividad_padre: padreEncontrado };
            }
            return item;
        }).filter(item => item && item.codigo_actividad_padre)
        : [];

    const taxonomiasCapa2PorActividad = taxonomiasCapa2ConPadre.reduce((acc, taxonomia) => {
        if (taxonomia.codigo_actividad_padre) acc[taxonomia.codigo_actividad_padre] = taxonomia;
        return acc;
    }, {});

    const conceptosCapa3PorActividad = (typeof dataC3 !== 'undefined' && Array.isArray(dataC3))
        ? dataC3.reduce((acc, concepto) => {
            if (concepto && concepto.codigo_actividad_padre) {
                if (!acc[concepto.codigo_actividad_padre]) acc[concepto.codigo_actividad_padre] = [];
                acc[concepto.codigo_actividad_padre].push(concepto);
            }
            return acc;
        }, {}) : {};
    const todosLosConceptosC3 = (typeof dataC3 !== 'undefined' && Array.isArray(dataC3))
        ? dataC3.map(c => ({ ...c })) : [];

    const competenciasCapa4 = (typeof dataCapa4 !== 'undefined' && Array.isArray(dataCapa4))
        ? dataCapa4.map(c => ({ ...c })) : [];

    const evaluacionCapa5PorCompetencia = (typeof dataCapa5 !== 'undefined' && Array.isArray(dataCapa5))
        ? dataCapa5.reduce((acc, evalItem) => {
            if (evalItem && evalItem.id_competencia_evaluada) acc[evalItem.id_competencia_evaluada] = { ...evalItem };
            return acc;
        }, {}) : {};

    // Usar el dataCapa6 detallado que te proporcioné
    const validacionCapa6Procesada = (typeof dataCapa6 !== 'undefined' && Array.isArray(dataCapa6))
        ? dataCapa6.map(item => {
            const processedItem = { ...item };
            if (item.valoraciones_individuales && typeof item.valoracion_colectiva_calculada === 'function') {
                processedItem.valoracion_colectiva = item.valoracion_colectiva_calculada();
            }
            if (item.valoraciones_individuales && typeof item.nivel_confianza_calculado === 'function') {
                processedItem.nivel_confianza_consenso = item.nivel_confianza_calculado();
            }
            return processedItem;
        }) : [];
    const validacionCapa6PorNodo = validacionCapa6Procesada.reduce((acc, valItem) => {
        if (valItem && valItem.id_nodo_conceptual_validado) acc[valItem.id_nodo_conceptual_validado] = valItem;
        return acc;
    }, {});


    // --- UTILITIES & D3 SETUP ---
    const d3ColorScale = d3.scaleOrdinal().range(d3.schemeTableau10);
    const tooltip = d3.select("body").append("div").attr("class", "tooltip");

    function openModal(title, contentHtml) {
        if (modal && modalTitle && modalBody) {
            modalTitle.innerHTML = title;
            modalBody.innerHTML = contentHtml;
            modal.style.display = 'block';
        } else { console.error("Modal elements not found"); }
    }
    if (closeButton) { closeButton.addEventListener('click', () => { if (modal) modal.style.display = 'none'; }); }
    window.addEventListener('click', (event) => { if (event.target === modal && modal) modal.style.display = 'none'; });

    function buildDetailListHTML(obj, excludeKeys = [], title = '') {
        let html = title ? `<h4>${title.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h4><ul>` : '<ul>';
        if (typeof obj !== 'object' || obj === null) return `<ul><li>${obj}</li></ul>`;
        for (const key in obj) {
            if (excludeKeys.includes(key) || !obj.hasOwnProperty(key) || typeof obj[key] === 'function') continue;
            const label = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            let value = obj[key];
            if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) { value = 'N/A'; }
            else if (Array.isArray(value)) {
                if (value.length === 0) { value = 'N/A'; }
                else if (value.every(item => typeof item === 'object' && item !== null)) {
                    value = `<ul style="margin-top:5px; padding-left:15px;">${value.map(subObj => `<li>${buildDetailListHTML(subObj)}</li>`).join('')}</ul>`;
                } else {
                    value = `<ul style="margin-top:5px; padding-left:15px;">${value.map(v => `<li>${v}</li>`).join('')}</ul>`;
                }
            } else if (typeof value === 'object' && value !== null) { value = buildDetailListHTML(value); }
            html += `<li><strong>${label}:</strong> ${value}</li>`;
        }
        html += '</ul>';
        return html;
    }

    // --- NAVIGATION ---
    function showCapa(capaIdToShow) {
        capas.forEach(capa => capa.classList.toggle('active', capa.id === capaIdToShow));
        navButtons.forEach(btn => {
            let btnTargetId = btn.id.replace('btn', '');
            btnTargetId = btnTargetId.charAt(0).toLowerCase() + btnTargetId.slice(1);
            btn.classList.toggle('active-nav-btn', btnTargetId === capaIdToShow);
        });
        // Re-render D3 graphs if their containers become visible and have a selection
        // Use setTimeout to ensure the container is visible and has dimensions for D3
        if (capaIdToShow === 'capa3' && document.getElementById('select-actividad-c3')?.value) {
            setTimeout(() => { if(document.getElementById('visCapa3').classList.contains('active')) renderCapa3(); }, 50);
        }
        if (capaIdToShow === 'capa6' && document.getElementById('select-nodo-c6')?.value) {
            setTimeout(() => { if(document.getElementById('visCapa6').classList.contains('active')) renderCapa6(); }, 50);
        }
        if (capaIdToShow === 'multidimensional' && document.getElementById('select-actividad-multi')?.value) {
             setTimeout(() => { if(document.getElementById('visMultidimensional').classList.contains('active')) renderMultidimensional(); }, 50);
        }
    }
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            let capaIdTarget = button.id.replace('btn', '');
            capaIdTarget = capaIdTarget.charAt(0).toLowerCase() + capaIdTarget.slice(1);
            showCapa(capaIdTarget);
        });
    });

    // --- NODE/LINK HELPERS (DEFINED GLOBALLY WITHIN DOMContentLoaded SCOPE) ---
    function addNode(nodesArray, nodeMapObj, id, name, type, data = {}, fx = null, fy = null) {
        if (!id) { console.warn("Intento de añadir nodo sin ID:", {name, type, data}); return null; }
        if (!nodeMapObj.has(id)) {
            const nodeData = { id, name: name || id, type, data };
            if (fx !== null) nodeData.fx = fx;
            if (fy !== null) nodeData.fy = fy;
            nodesArray.push(nodeData);
            nodeMapObj.set(id, nodeData);
        }
        return nodeMapObj.get(id);
    }

    function addLink(linksArray, sourceId, targetId, type = 'relacionado', sourceMap, targetMap) {
        if (!sourceId || !targetId) { console.warn("Intento de añadir enlace con ID de origen/destino faltante:", {sourceId, targetId, type}); return; }
        // Usar los mapas pasados como argumento para la verificación.
        if (sourceMap.has(sourceId) && targetMap.has(targetId)) {
            linksArray.push({ source: sourceMap.get(sourceId), target: targetMap.get(targetId), type });
        } else {
            // console.warn(`Enlace omitido: Nodos no encontrados en mapas proporcionados. Origen: ${sourceId} (encontrado: ${sourceMap.has(sourceId)}), Destino: ${targetId} (encontrado: ${targetMap.has(targetId)})`);
        }
    }


    // --- CAPA 1 ---
    const visCapa1 = document.getElementById('visCapa1');
    const filtroEjeC1 = document.getElementById('filtro-eje-c1');
    const filtroTipoFormacionC1 = document.getElementById('filtro-tipo-formacion-c1');
    function popularFiltrosC1() { /* ... (completo como en la última versión funcional) ... */
        if (!filtroEjeC1 || !filtroTipoFormacionC1) return;
        filtroEjeC1.innerHTML = '<option value="todos">Todos los Ejes</option>';
        filtroTipoFormacionC1.innerHTML = '<option value="todos">Todos los Tipos</option>';
        [...new Set(actividadesCapa1.map(item => item.eje_formativo).filter(Boolean))].sort().forEach(eje => filtroEjeC1.appendChild(new Option(eje, eje)));
        [...new Set(actividadesCapa1.map(item => item.tipo_formacion).filter(Boolean))].sort().forEach(tipo => filtroTipoFormacionC1.appendChild(new Option(tipo, tipo)));
        filtroEjeC1.addEventListener('change', renderCapa1);
        filtroTipoFormacionC1.addEventListener('change', renderCapa1);
    }
    function renderCapa1() { /* ... (completo como en la última versión funcional) ... */
        if (!visCapa1 || !filtroEjeC1 || !filtroTipoFormacionC1) return;
        visCapa1.innerHTML = '';
        const ejeSel = filtroEjeC1.value;
        const tipoSel = filtroTipoFormacionC1.value;
        const filtradas = actividadesCapa1.filter(a => (ejeSel === 'todos' || a.eje_formativo === ejeSel) && (tipoSel === 'todos' || a.tipo_formacion === tipoSel));
        if (filtradas.length === 0) { visCapa1.innerHTML = '<p>No hay actividades que coincidan.</p>'; return; }
        filtradas.forEach(act => {
            const tarjeta = document.createElement('div');
            tarjeta.className = 'tarjeta-actividad';
            tarjeta.innerHTML = `<h4>${act.actividad || 'N/D'} <span class="codigo">(${act.codigo})</span></h4>
                                 <p><strong>Eje:</strong> <span class="eje">${act.eje_formativo || 'N/A'}</span></p>
                                 <p><strong>Tipo:</strong> ${act.tipo_formacion || 'N/A'}</p>
                                 <p><strong>Objetivo:</strong> ${(act.objetivo || 'N/A').substring(0,100)}...</p>`;
            tarjeta.addEventListener('click', () => openModal(`Actividad: ${act.actividad}`, buildDetailListHTML(act)));
            visCapa1.appendChild(tarjeta);
        });
    }

    // --- CAPA 2 ---
    const visCapa2 = document.getElementById('visCapa2');
    const selectActividadC2 = document.getElementById('select-actividad-c2');
    function popularFiltrosC2() { /* ... (completo como en la última versión funcional) ... */
        if (!selectActividadC2) { console.error("Elemento select-actividad-c2 no encontrado"); return; }
        selectActividadC2.innerHTML = '<option value="">Seleccione una actividad...</option>';
        actividadesCapa1.forEach(actividad => {
            selectActividadC2.appendChild(new Option(`${actividad.codigo} - ${actividad.actividad.substring(0, 40)}...`, actividad.codigo));
        });
        selectActividadC2.addEventListener('change', renderCapa2);
    }
    function renderCapa2() { /* ... (completo como en la última versión funcional) ... */
        if (!visCapa2 || !selectActividadC2) return;
        visCapa2.innerHTML = '<p class="placeholder-text">Seleccione una actividad para ver su taxonomía.</p>';
        const actividadId = selectActividadC2.value;
        if (!actividadId) return;
        const taxonomia = taxonomiasCapa2PorActividad[actividadId];
        const actividadInfo = actividadesCapa1.find(a => a.codigo === actividadId);
        if (!taxonomia) {
            visCapa2.innerHTML = `<p>No hay datos taxonómicos para la actividad: ${actividadInfo ? actividadInfo.actividad : actividadId}.<br>Verifique que los objetos de Capa 2 en 'dataTodo' (c12.js) tengan la propiedad 'codigo_actividad_padre' que coincida con un código de Capa 1.</p>`;
            return;
        }
        visCapa2.innerHTML = '';
        const divTax = document.createElement('div');
        divTax.className = 'lista-jerarquica';
        divTax.innerHTML = `<h3>Taxonomía de: ${actividadInfo?.actividad || actividadId}</h3>
                            ${buildDetailListHTML(taxonomia, ['codigo_actividad_padre', 'eje_formativo', 'poblacion_objetivo'])}`;
        divTax.addEventListener('click', () => openModal(`Detalle Taxonómico Completo: ${actividadInfo?.actividad}`, buildDetailListHTML(taxonomia)));
        visCapa2.appendChild(divTax);
    }

    // --- CAPA 3 ---
    const visCapa3 = document.getElementById('visCapa3');
    const selectActividadC3 = document.getElementById('select-actividad-c3');
    function popularFiltrosC3() { /* ... (completo como en la última versión funcional) ... */
        if (!selectActividadC3) return;
        selectActividadC3.innerHTML='<option value="">Seleccione una actividad...</option>';
        actividadesCapa1.forEach(actividad => {
            selectActividadC3.appendChild(new Option(`${actividad.codigo} - ${actividad.actividad.substring(0, 40)}...`, actividad.codigo));
        });
        selectActividadC3.addEventListener('change', renderCapa3);
    }
    function renderCapa3() { /* ... (completo como en la última versión funcional, usa addNode, addLink, drawForceGraph globales) ... */
        if (!visCapa3 || !selectActividadC3) return;
        visCapa3.innerHTML = '<p class="placeholder-text">Seleccione actividad para ver grafo enriquecido.</p>';
        const actividadId = selectActividadC3.value;
        if (!actividadId) return;
        const conceptos = conceptosCapa3PorActividad[actividadId];
        if (!conceptos || conceptos.length === 0) { visCapa3.innerHTML = `<p>No hay conceptos para ${actividadId}.</p>`; return; }
        visCapa3.innerHTML = '';
        const nodes = []; const links = []; const nodeMap = new Map();
        const actC1 = actividadesCapa1.find(a => a.codigo === actividadId);
        addNode(nodes, nodeMap, actividadId, actC1?.actividad || actividadId, 'actividad_c1', actC1, visCapa3.clientWidth / 2, 50);
        conceptos.forEach(c => {
            addNode(nodes, nodeMap, c.ID_Nodo_Tematico, c.concepto, 'concepto_c3', c);
            addLink(links, actividadId, c.ID_Nodo_Tematico, 'contiene', nodeMap, nodeMap);
            (c.referencias_legales || []).forEach((ref, i) => { const id = `legal-${c.ID_Nodo_Tematico}-${i}`; addNode(nodes, nodeMap, id, ref.fuente, 'referencia_legal', ref); addLink(links, c.ID_Nodo_Tematico, id, 'refiere_ley', nodeMap, nodeMap);});
            (c.competencias_profesionales_asociadas || []).forEach((cs,i) => { const n=cs.split(':')[1]?cs.split(':')[1].trim():cs; const id = `compC3-${c.ID_Nodo_Tematico}-${i}`; addNode(nodes,nodeMap,id,n,'competencia_c3',{nombre: n});addLink(links,c.ID_Nodo_Tematico,id,'desarrolla', nodeMap, nodeMap);});
            (c.relaciones_semanticas || []).forEach(rel => { if(rel.concepto_relacionado_ID && rel.concepto_relacionado_ID !== "N/A" && nodeMap.has(rel.concepto_relacionado_ID)) addLink(links, c.ID_Nodo_Tematico, rel.concepto_relacionado_ID, rel.tipo, nodeMap, nodeMap); });
        });
        drawForceGraph(visCapa3, nodes, links, "C3");
    }

    // --- CAPA 4 ---
    const visCapa4 = document.getElementById('visCapa4');
    const filtroCategoriaC4 = document.getElementById('filtro-categoria-c4');
    function popularFiltrosC4() { /* ... (completo como en la última versión funcional) ... */
        if (!filtroCategoriaC4) return;
        filtroCategoriaC4.innerHTML='<option value="todos">Todas</option>';
        [...new Set(competenciasCapa4.map(c => c.categoria).filter(Boolean))].sort().forEach(cat => filtroCategoriaC4.appendChild(new Option(cat, cat)));
        filtroCategoriaC4.addEventListener('change', renderCapa4);
    }
    function renderCapa4() { /* ... (completo como en la última versión funcional) ... */
        if (!visCapa4 || !filtroCategoriaC4) return;
        visCapa4.innerHTML = '';
        const catSel = filtroCategoriaC4.value;
        const filtradas = competenciasCapa4.filter(c => catSel === 'todos' || c.categoria === catSel);
        if (filtradas.length === 0) { visCapa4.innerHTML = '<p>No hay competencias.</p>'; return; }
        const ul = document.createElement('ul'); ul.className = 'lista-jerarquica';
        filtradas.forEach(comp => {
            const li = document.createElement('li');
            li.innerHTML = `<div class="clickable-item"><h4>${comp.nombre_competencia} (${comp.id_competencia})</h4></div>
                            <div class="detalle-item"><p><strong>Categoría:</strong> ${comp.categoria}</p>
                            <p>${(comp.descripcion || '').substring(0,150)}...</p></div>`;
            li.querySelector('.clickable-item').addEventListener('click', () => openModal(comp.nombre_competencia, buildDetailListHTML(comp)));
            ul.appendChild(li);
        });
        visCapa4.appendChild(ul);
    }

    // --- CAPA 5 ---
    const visCapa5 = document.getElementById('visCapa5');
    const selectCompetenciaC5 = document.getElementById('select-competencia-c5');
    function popularFiltrosC5() { /* ... (completo como en la última versión funcional) ... */
        if(!selectCompetenciaC5) return;
        selectCompetenciaC5.innerHTML='<option value="">Seleccione competencia...</option>';
        competenciasCapa4.forEach(comp => selectCompetenciaC5.appendChild(new Option(`${comp.id_competencia} - ${comp.nombre_competencia.substring(0,40)}...`, comp.id_competencia)));
        selectCompetenciaC5.addEventListener('change', renderCapa5);
    }
    function renderCapa5() { /* ... (completo como en la última versión funcional) ... */
        if (!visCapa5 || !selectCompetenciaC5) return;
        visCapa5.innerHTML = '<p class="placeholder-text">Seleccione competencia para ver su evaluación.</p>';
        const compId = selectCompetenciaC5.value;
        if (!compId) return;
        const evaluacion = evaluacionCapa5PorCompetencia[compId];
        const compInfo = competenciasCapa4.find(c => c.id_competencia === compId);
        if (!evaluacion) { visCapa5.innerHTML = `<p>No hay evaluación para ${compInfo?.nombre_competencia || compId}.</p>`; return; }
        visCapa5.innerHTML = '';
        const divEval = document.createElement('div'); divEval.className = 'lista-jerarquica';
        divEval.innerHTML = `<h3>Evaluación para: ${compInfo.nombre_competencia}</h3>`;
        const ulNiveles = document.createElement('ul');
        (evaluacion.niveles_dominio || []).forEach(n => {
            const li = document.createElement('li');
            li.innerHTML = `<div class="clickable-item"><h4>Nivel: ${n.nivel}</h4></div>
                            <div class="detalle-item"><p>${n.descripcion_nivel.substring(0,120)}...</p></div>`;
            li.querySelector('.clickable-item').addEventListener('click', () => openModal(`Nivel ${n.nivel} - ${compInfo.nombre_competencia}`, buildDetailListHTML(n, [], `Detalles del Nivel ${n.nivel}`)));
            ulNiveles.appendChild(li);
        });
        divEval.appendChild(ulNiveles);
        visCapa5.appendChild(divEval);
    }

    // --- CAPA 6 (CON GRÁFICO RADIAL, HEATMAP Y RED DE CONSENSO D3) ---
    const visCapa6 = document.getElementById('visCapa6');
    const selectNodoC6 = document.getElementById('select-nodo-c6');

    function popularFiltrosC6() {
        if (!selectNodoC6) return;
        selectNodoC6.innerHTML = '<option value="">Seleccione nodo conceptual...</option>';
        todosLosConceptosC3.forEach(c => selectNodoC6.appendChild(new Option(`${c.ID_Nodo_Tematico} - ${c.concepto.substring(0, 40)}...`, c.ID_Nodo_Tematico)));
        selectNodoC6.addEventListener('change', renderCapa6);
    }

    function renderCapa6() {
        if (!visCapa6 || !selectNodoC6) return;
        visCapa6.innerHTML = '<p class="placeholder-text">Seleccione nodo para ver su validación detallada.</p>';
        const nodoId = selectNodoC6.value;
        if (!nodoId) return;

        const validacionData = validacionCapa6PorNodo[nodoId];
        if (!validacionData) { visCapa6.innerHTML = `<p>No hay datos de validación para el nodo ${nodoId}.</p>`; return; }
        visCapa6.innerHTML = '';

        const conceptoC3original = todosLosConceptosC3.find(c => c.ID_Nodo_Tematico === nodoId);
        const mainDiv = document.createElement('div');
        mainDiv.className = 'consenso-nodo';
        mainDiv.innerHTML = `
            <h3>Validación Detallada para: ${validacionData.concepto_nombre || 'N/A'}</h3>
            <p><strong>ID Nodo:</strong> ${validacionData.id_nodo_conceptual_validado}</p>
            <p><strong>Descripción Original:</strong> <em>${validacionData.descripcion_original_ia || conceptoC3original?.descripcion_conceptual || 'N/A'}</em></p>
            <hr>`;

        const colectivo = validacionData.valoracion_colectiva;
        if (colectivo) {
            const resumenDiv = document.createElement('div');
            resumenDiv.className = 'resumen-colectivo-container'; // Clase para estilizar
            resumenDiv.style.display = 'flex'; resumenDiv.style.flexWrap = 'wrap'; resumenDiv.style.gap = '20px'; resumenDiv.style.alignItems = 'flex-start';

            const textoResumenDiv = document.createElement('div');
            textoResumenDiv.style.flex = '1 1 300px'; // Permitir que crezca pero con base
            textoResumenDiv.innerHTML = `<h4>Resumen Valoración Colectiva</h4>
                                  <p>Nº Validadores: ${colectivo.num_validadores || 'N/A'}</p>
                                  <p>Confianza Consenso: ${validacionData.nivel_confianza_consenso || 'N/A'}</p>
                                  <p>Votos Generales: ${Object.entries(colectivo.distribucion_votos || {}).map(([k,v]) => `${k.replace(/_/g, ' ')}: ${v}`).join(', ')}</p>
                                  <p>Consenso Válido General: ${colectivo.porcentaje_consenso_valido_general || '0'}%</p>`;
            resumenDiv.appendChild(textoResumenDiv);

            const radialContainer = document.createElement('div');
            radialContainer.id = `radial-chart-${nodoId.replace(/\W/g, '_')}`;
            radialContainer.style.width = '300px'; radialContainer.style.height = '280px';
            radialContainer.style.flex = '0 0 300px';
            resumenDiv.appendChild(radialContainer);
            mainDiv.appendChild(resumenDiv);
            setTimeout(() => drawRadialChart(radialContainer.id, colectivo), 0);
        }

        if (validacionData.valoraciones_individuales && validacionData.valoraciones_individuales.length > 0) {
            const heatmapDiv = document.createElement('div');
            heatmapDiv.innerHTML = '<hr><h4>Heatmap de Valoraciones Individuales (Puntuación 1-10)</h4>';
            const table = document.createElement('table');
            table.className = 'heatmap-table';
            table.style.width = '100%'; table.style.borderCollapse = 'collapse'; table.style.fontSize = '0.85em'; table.style.marginTop = '10px';
            const thead = table.createTHead();
            const headerRow = thead.insertRow();
            const dimensionsOrder = ["relevancia_juridica", "precision_conceptual", "aplicabilidad_practica", "claridad_redaccion", "ausencia_sesgo_ideologico"];
            const thVal = document.createElement('th'); thVal.textContent = 'Validador (Perfil)'; headerRow.appendChild(thVal);
            dimensionsOrder.forEach(dim => {
                const th = document.createElement('th');
                th.textContent = dim.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                th.style.padding = '5px 8px'; th.style.border = '1px solid #ccc'; th.style.backgroundColor = '#f0f0f0'; th.style.textAlign = 'center';
                headerRow.appendChild(th);
            });
            const tbody = table.createTBody();
            validacionData.valoraciones_individuales.forEach(val => {
                const row = tbody.insertRow();
                const cellVal = row.insertCell(); cellVal.textContent = val.perfil_validador || val.hash_validador.substring(0, 10) + '...'; cellVal.style.border = '1px solid #eee'; cellVal.style.padding = '5px';
                dimensionsOrder.forEach(dim => {
                    const cell = row.insertCell();
                    const score = val.dimensiones[dim];
                    cell.textContent = score !== undefined ? score : '-';
                    cell.style.textAlign = 'center'; cell.style.border = '1px solid #eee'; cell.style.padding = '5px';
                    if (score !== undefined) {
                        const R = Math.round(255 * ((10 - score) / 10)); // Más rojo si es bajo
                        const G = Math.round(255 * (score / 10));       // Más verde si es alto
                        cell.style.backgroundColor = `rgb(${R}, ${G}, 120)`; // Un azul suave para el componente B
                        cell.style.color = score < 4 ? 'white' : (score > 7 ? 'white' : '#212121') ; // Contraste de texto
                    }
                });
            });
            heatmapDiv.appendChild(table);
            mainDiv.appendChild(heatmapDiv);
        }

        // --- RED DE CONSENSO 2D ---
        const redConsensoContainer = document.createElement('div');
        redConsensoContainer.innerHTML = '<hr><h4>Red de Consenso de Validadores</h4><p>Enlaces coloreados por voto general.</p>';
        const redSvgContainer = document.createElement('div');
        redSvgContainer.id = `red-consenso-${nodoId.replace(/\W/g, '_')}`;
        redSvgContainer.className = 'graph-container'; redSvgContainer.style.minHeight = '450px';
        redConsensoContainer.appendChild(redSvgContainer);
        mainDiv.appendChild(redConsensoContainer);
        setTimeout(() => drawConsensusNetworkD3(redSvgContainer.id, validacionData), 0);

        const justificacionesDiv = document.createElement('div');
        justificacionesDiv.innerHTML = '<hr><h4>Comentarios y Propuestas Individuales</h4>';
        const ulJust = document.createElement('ul'); ulJust.className = 'lista-jerarquica';
        (validacionData.valoraciones_individuales || []).forEach(val => {
            if (val.justificacion || val.propuesta_mejora_texto) {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${val.perfil_validador || val.hash_validador.substring(0,10)+'...'} (Voto: ${val.voto_general.replace(/_/g, ' ')})</strong>:
                                ${val.justificacion ? `<p><em>Justificación:</em> ${val.justificacion}</p>` : ''}
                                ${val.propuesta_mejora_texto ? `<p><em>Propuesta de Mejora:</em> ${val.propuesta_mejora_texto}</p>` : ''}`;
                ulJust.appendChild(li);
            }
        });
        if (ulJust.hasChildNodes()) justificacionesDiv.appendChild(ulJust);
        else justificacionesDiv.innerHTML += '<p>No hay comentarios detallados.</p>';
        mainDiv.appendChild(justificacionesDiv);
        visCapa6.appendChild(mainDiv);
    }

    function drawRadialChart(containerId, colectivo) { /* ... (código completo como en la respuesta anterior) ... */ }
    function wrapText(text, width) { /* ... (código completo como en la respuesta anterior) ... */ }

    function drawConsensusNetworkD3(containerId, validacionData) { /* ... (código completo como en la respuesta anterior, asegurándose que usa addNode y addLink globales) ... */ }
    function dragHelper(simulationInstance) { /* ... (código completo como en la respuesta anterior) ... */ }


    // --- VISUALIZACIÓN MULTIDIMENSIONAL ---
    const visMultidimensional = document.getElementById('visMultidimensional');
    const selectActividadMulti = document.getElementById('select-actividad-multi');
    const sliderProfundidadMulti = document.getElementById('slider-profundidad-multi');
    const valorProfundidadMulti = document.getElementById('valor-profundidad-multi');

    function popularFiltrosMulti() { /* ... (código completo como en la respuesta anterior) ... */ }
    function renderMultidimensional() { /* ... (código completo como en la respuesta anterior, usa addNode, addLink, drawForceGraph globales) ... */ }
    function drawForceGraph(containerElement, nodes, links, graphTypeSuffix = "") { /* ... (código completo como en la respuesta anterior, usa dragHelper) ... */ }


    // --- INITIALIZATION ---
    try {
        // Popular todos los filtros al inicio
        if (document.getElementById('filtro-eje-c1')) popularFiltrosC1();
        if (document.getElementById('select-actividad-c2')) popularFiltrosC2();
        if (document.getElementById('select-actividad-c3')) popularFiltrosC3();
        if (document.getElementById('filtro-categoria-c4')) popularFiltrosC4();
        if (document.getElementById('select-competencia-c5')) popularFiltrosC5();
        if (document.getElementById('select-nodo-c6')) popularFiltrosC6();
        if (document.getElementById('select-actividad-multi')) popularFiltrosMulti();

        // Renderizar la primera capa por defecto
        if (document.getElementById('filtro-eje-c1')) renderCapa1();

    } catch (e) {
        console.error("Error al inicializar filtros o renderizar capas:", e);
        alert("Ocurrió un error al inicializar la página. Revise la consola (F12).");
    }

    const defaultCapa = document.getElementById('btnCapa1') ? 'capa1' : (document.querySelector('nav button.nav-btn') ? document.querySelector('nav button.nav-btn').id.replace('btn','').toLowerCase() : null);
    if (defaultCapa && document.getElementById(defaultCapa)) { // Asegurarse que el elemento de la capa existe
        showCapa(defaultCapa);
    } else if (capas.length > 0) { // Si no hay btnCapa1, mostrar la primera capa que exista
        showCapa(capas[0].id);
    } else {
        console.error("No se pudo determinar la capa inicial para mostrar o no hay capas.");
    }
});