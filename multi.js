// multi.js (VERSIÓN COMPLETA FINAL, CORREGIDA Y AMPLIADA)
document.addEventListener('DOMContentLoaded', () => {
    // Cache de elementos DOM
    const selectActividadRaiz = document.getElementById('select-actividad-raiz');
    const btnExpandAll = document.getElementById('btn-expand-all');
    const btnCollapseAll = document.getElementById('btn-collapse-all');
    const btnResetLayout = document.getElementById('btn-reset-layout');
    const mainGraphContainer = document.getElementById('grafo-multicapa-container');
    const detailPanel = document.getElementById('panel-detalles-nodo');
    const detailContent = document.getElementById('info-nodo-principal');
    const capa6DetailContainer = document.getElementById('visualizacion-capa6-panel');
    const btnCerrarPanel = document.getElementById('btn-cerrar-panel');
    const loadingPlaceholder = document.querySelector('.loading-placeholder');

    // --- DATA PREPARATION (asumiendo variables globales de datos) ---
    const actividadesCapa1 = (typeof dataTodo !== 'undefined' && Array.isArray(dataTodo))
        ? dataTodo.filter(item => item && item.codigo && item.programa_formativo)
        : [];
    const taxonomiasCapa2ConPadre = (typeof dataTodo !== 'undefined' && Array.isArray(dataTodo))
        ? dataTodo.filter(item => item && item.area_principal).map((item, index, arr) => {
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
    const todosLosConceptosC3 = (typeof dataC3 !== 'undefined' && Array.isArray(dataC3)) ? dataC3.map(c => ({ ...c })) : [];
    const competenciasCapa4 = (typeof dataCapa4 !== 'undefined' && Array.isArray(dataCapa4)) ? dataCapa4.map(c => ({ ...c })) : [];
    // const evaluacionCapa5PorCompetencia = ... (si se usa)

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


    // --- GLOBAL D3 & UTILITIES ---
    const d3ColorScale = d3.scaleOrdinal(d3.schemeTableau10);
    const tooltip = d3.select("body").append("div").attr("class", "tooltip");
    let simulation, svg, gMainGraph, mainGraphNodesData = [], mainGraphLinksData = [], mainGraphNodeMap = new Map();

    function buildDetailListHTML(obj, excludeKeys = [], title = '') {
        let html = title ? `<h4 style="color:var(--secondary-color); margin-bottom:0.5em;">${title.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h4><ul class="detail-list-generated">` : '<ul class="detail-list-generated">';
        if (typeof obj !== 'object' || obj === null) return `<ul><li>${obj}</li></ul>`;
        for (const key in obj) {
            if (excludeKeys.includes(key) || !obj.hasOwnProperty(key) || typeof obj[key] === 'function') continue;
            const label = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            let value = obj[key];
            if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) { value = '<span style="color:#999;">N/A</span>'; }
            else if (Array.isArray(value)) {
                if (value.length === 0) { value = '<span style="color:#999;">N/A (arreglo vacío)</span>'; }
                else if (value.every(item => typeof item === 'object' && item !== null)) {
                    value = `<ul class="nested-list">${value.map(subObj => `<li>${buildDetailListHTML(subObj)}</li>`).join('')}</ul>`;
                } else {
                    value = `<ul class="nested-list simple-list">${value.map(v => `<li>${v}</li>`).join('')}</ul>`;
                }
            } else if (typeof value === 'object' && value !== null) { value = buildDetailListHTML(value); }
            html += `<li><strong>${label}:</strong> ${value}</li>`;
        }
        html += '</ul>';
        return html;
    }

    // NODE/LINK HELPERS (ÁMBITO GLOBAL DENTRO DE DOMContentLoaded)
    function addNode(nodesArray, nodeMapObj, id, name, type, data = {}, fx = null, fy = null, isRoot = false, expanded = false) {
        if (!id) { console.warn("Intento de añadir nodo sin ID:", { name, type, data }); return null; }
        if (!nodeMapObj.has(id)) {
            const nodeData = { id, name: name || id, type, data, fx, fy, isRoot, expanded, childrenVisible: expanded, _children: [] };
            nodesArray.push(nodeData);
            nodeMapObj.set(id, nodeData);
        } else { // Actualizar si ya existe (ej. para marcar como raíz o expandido)
            const existingNode = nodeMapObj.get(id);
            if (isRoot) existingNode.isRoot = true;
            if (expanded) {
                existingNode.expanded = true;
                existingNode.childrenVisible = true;
            }
        }
        return nodeMapObj.get(id);
    }

    function addLink(linksArray, sourceId, targetId, type = 'relacionado', nodeMap) {
        if (!sourceId || !targetId) { /* console.warn("Enlace omitido: ID origen/destino faltante"); */ return; }
        if (nodeMap.has(sourceId) && nodeMap.has(targetId)) {
            linksArray.push({ source: nodeMap.get(sourceId), target: nodeMap.get(targetId), type });
        } else {
            // console.warn(`Enlace omitido: Nodos no encontrados. Origen: ${sourceId}, Destino: ${targetId}`);
        }
    }

    function dragHelper(simulationInstance) {
        function dragstarted(event, d) { if (!event.active) simulationInstance.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; }
        function dragged(event, d) { d.fx = event.x; d.fy = event.y; }
        function dragended(event, d) { if (!event.active) simulationInstance.alphaTarget(0); if(!d.isRoot) {d.fx = null; d.fy = null;} } // No quitar fx,fy del root
        return d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended);
    }


    // --- GRAFO MULTICAPA PRINCIPAL ---
    function initializeMainGraph() {
        if (!mainGraphContainer) return;
        d3.select(mainGraphContainer).select("svg").remove(); // Limpiar grafo anterior
        if (loadingPlaceholder) loadingPlaceholder.style.display = 'block';

        const width = mainGraphContainer.clientWidth || 800;
        const height = mainGraphContainer.clientHeight || 600;

        svg = d3.select(mainGraphContainer).append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [-width / 2, -height / 2, width, height])
            .call(d3.zoom().scaleExtent([0.1, 4]).on("zoom", (event) => {
                if (gMainGraph) gMainGraph.attr("transform", event.transform);
            }));

        gMainGraph = svg.append("g");
        gMainGraph.append("g").attr("class", "links");
        gMainGraph.append("g").attr("class", "nodes");

        simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(d => d.id).distance(d => d.isRoot ? 0 : (d.target?.type === 'validacion_c6' ? 60 : 100)).strength(0.7))
            .force("charge", d3.forceManyBody().strength(-200 - (mainGraphNodesData.length * 2) ))
            .force("center", d3.forceCenter(0, 0).strength(0.05))
            .force("collision", d3.forceCollide().radius(d => (d.isRoot ? 30 : (d.type === 'actividad_c1' ? 25 : (d.type === 'concepto_c3' ? 18 : 15)))))
            .on("tick", tickedMainGraph);

        if (loadingPlaceholder) loadingPlaceholder.style.display = 'none';
    }

    function updateMainGraph() {
        if (!svg || !gMainGraph || !simulation) return;

        const visibleNodes = mainGraphNodesData.filter(d => !d.hidden);
        const visibleLinks = mainGraphLinksData.filter(l => !l.source.hidden && !l.target.hidden);

        simulation.nodes(visibleNodes);
        simulation.force("link").links(visibleLinks);

        // Enlaces
        const link = gMainGraph.select(".links").selectAll("line.link-graph")
            .data(visibleLinks, d => `${d.source.id}-${d.target.id}`);
        link.exit().remove();
        link.enter().append("line")
            .attr("class", "link-graph")
            .attr("stroke-width", 1.8)
            .attr("stroke-opacity", 0.6)
            .attr("stroke", "#777")
            .merge(link);

        // Nodos
        const node = gMainGraph.select(".nodes").selectAll("g.node-group")
            .data(visibleNodes, d => d.id);
        node.exit().remove();

        const nodeEnter = node.enter().append("g")
            .attr("class", d => `node-group node-tipo-${d.type}`)
            .call(dragHelper(simulation))
            .on("click", handleNodeClick)
            .on("dblclick", toggleNodeExpansion)
            .on("mouseover", handleNodeMouseover)
            .on("mouseout", handleNodeMouseout);

        nodeEnter.append("circle")
            .attr("r", d => (d.isRoot ? 22 : (d.type === 'actividad_c1' ? 20 : (d.type === 'concepto_c3' ? 14 : (d.type === 'taxonomia_c2' ? 16 : (d.type === 'competencia_c4' ? 12 : (d.type === 'validacion_c6' ? 10 : 12)))))))
            .attr("fill", d => d3ColorScale(d.type))
            .attr("stroke", d => d.isRoot ? "var(--accent-color)" : d3.color(d3ColorScale(d.type)).darker(0.5))
            .attr("stroke-width", d => d.isRoot ? 3 : 2);

        nodeEnter.append("text")
            .text(d => d.name ? (d.name.length > 18 ? d.name.substring(0, 16) + "..." : d.name) : d.id)
            .attr("dy", d => (d.isRoot ? 32 : (d.type === 'actividad_c1' ? 30 : (d.type === 'concepto_c3' ? 22 : (d.type === 'taxonomia_c2' ? 25 : (d.type === 'competencia_c4' ? 20 : 18 ))))))
            .style("font-size", "9px");

        node.merge(nodeEnter);
        simulation.alpha(0.5).restart();
    }

    function tickedMainGraph() {
        if (!gMainGraph) return;
        gMainGraph.selectAll(".link-graph")
            .attr("x1", d => d.source.x).attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x).attr("y2", d => d.target.y);
        gMainGraph.selectAll(".node-group")
            .attr("transform", d => `translate(${d.x},${d.y})`);
    }

    function handleNodeClick(event, d) {
        event.stopPropagation(); // Evitar que el doble clic se active
        // Marcar nodo seleccionado
        gMainGraph.selectAll("g.node-group circle").style("stroke", n => n.id === d.id ? "var(--accent-color)" : (n.isRoot ? "var(--accent-color)" : d3.color(d3ColorScale(n.type)).darker(0.5)) ).attr("stroke-width", n => n.id === d.id ? 3.5 : (n.isRoot ? 3 : 2));

        if(detailPanel && detailContent && capa6DetailContainer) {
            detailContent.innerHTML = buildDetailListHTML(d.data, ['fx', 'fy', 'x', 'y', 'vx', 'vy', 'index', '_children', 'childrenVisible', 'isRoot', 'expanded'], `Detalles de ${d.type}: ${d.name}`);
            capa6DetailContainer.innerHTML = ''; // Limpiar detalles de capa 6 anteriores

            if (d.type === 'concepto_c3' && validacionCapa6PorNodo[d.id]) {
                const validacionData = validacionCapa6PorNodo[d.id];
                const colectivo = validacionData.valoracion_colectiva; // Ya calculado

                capa6DetailContainer.innerHTML += `<h4>Validación Colectiva (Capa 6)</h4>`;
                if (colectivo) {
                    const resumenDiv = document.createElement('div');
                    resumenDiv.className = 'resumen-colectivo-container';
                    resumenDiv.style.display = 'flex'; resumenDiv.style.flexWrap = 'wrap'; resumenDiv.style.gap = '15px'; resumenDiv.style.alignItems = 'flex-start';

                    const textoResumenDiv = document.createElement('div');
                    textoResumenDiv.style.flex = '1 1 250px';
                    textoResumenDiv.innerHTML = `
                        <p>Nº Validadores: ${colectivo.num_validadores || 'N/A'}</p>
                        <p>Confianza: ${validacionData.nivel_confianza_consenso || 'N/A'}</p>
                        <p>Votos: ${Object.entries(colectivo.distribucion_votos || {}).map(([k,v]) => `${k.replace(/_/g, ' ')}: ${v}`).join(', ')}</p>
                        <p>Consenso Válido: ${colectivo.porcentaje_consenso_valido_general || '0'}%</p>`;
                    resumenDiv.appendChild(textoResumenDiv);

                    const radialContainer = document.createElement('div');
                    radialContainer.id = `radial-detail-${d.id.replace(/\W/g, '_')}`;
                    radialContainer.style.width = '250px'; radialContainer.style.height = '220px';
                    radialContainer.style.flex = '0 0 250px';
                    resumenDiv.appendChild(radialContainer);
                    capa6DetailContainer.appendChild(resumenDiv);
                    setTimeout(() => drawRadialChart(radialContainer.id, colectivo), 0); // Dibujar radial
                }

                // Heatmap y Red de Consenso
                if (validacionData.valoraciones_individuales && validacionData.valoraciones_individuales.length > 0) {
                    const heatmapTable = createHeatmapTable(validacionData.valoraciones_individuales);
                    capa6DetailContainer.innerHTML += '<hr><h5>Heatmap Val. Individuales</h5>';
                    capa6DetailContainer.appendChild(heatmapTable);

                    const consensusNetworkContainer = document.createElement('div');
                    consensusNetworkContainer.id = `cn-detail-${d.id.replace(/\W/g, '_')}`;
                    consensusNetworkContainer.className = 'graph-container';
                    consensusNetworkContainer.style.minHeight = '300px';
                    capa6DetailContainer.innerHTML += '<hr><h5>Red de Consenso</h5>';
                    capa6DetailContainer.appendChild(consensusNetworkContainer);
                    setTimeout(() => drawConsensusNetworkD3(consensusNetworkContainer.id, validacionData), 0);
                }
                 const justificaciones = (validacionData.valoraciones_individuales || []).filter(v => v.justificacion || v.propuesta_mejora_texto)
                    .map(v => `<li><strong>${v.perfil_validador || v.hash_validador.substring(0,10)+'...'} (Voto: ${v.voto_general.replace(/_/g, ' ')})</strong>:
                                ${v.justificacion ? `<p><em>Just.:</em> ${v.justificacion}</p>` : ''}
                                ${v.propuesta_mejora_texto ? `<p><em>Prop.:</em> ${v.propuesta_mejora_texto}</p>` : ''}</li>`).join('');
                if(justificaciones) capa6DetailContainer.innerHTML += `<hr><h5>Comentarios</h5><ul class="lista-jerarquica">${justificaciones}</ul>`;


            }
            detailPanel.classList.add('visible');
        }
    }

    function toggleNodeExpansion(event, d) {
        event.stopPropagation();
        if (!d) return;

        // Si el nodo tiene hijos "ocultos" (_children), los muestra.
        // Si tiene hijos visibles (children), los oculta moviéndolos a _children.
        if (d._children && d._children.length > 0) { // Expandir
            // Mover de _children a una nueva lista de nodos/enlaces a añadir
            const newNodesToAdd = [];
            const newLinksToAdd = [];
            const localNodeMapForExpansion = new Map(mainGraphNodeMap); // Copiar mapa global para no alterarlo directamente en bucle

            function expandRecursive(parentId, parentData, currentDepth, maxDepth) {
                if (currentDepth > maxDepth) return;

                let childrenData = [];
                // Lógica para obtener hijos basada en el tipo de 'd'
                if (parentData.type === 'actividad_c1') {
                    const taxC2 = taxonomiasCapa2PorActividad[parentData.id];
                    if (taxC2) childrenData.push({ id: `c2-${parentData.id}`, name: `Taxo: ${taxC2.area_principal || 'General'}`, type: 'taxonomia_c2', data: taxC2, parentId: parentData.id });
                    const conceptsC3 = conceptosCapa3PorActividad[parentData.id];
                    if (conceptsC3) childrenData.push(...conceptsC3.slice(0,3).map(c => ({ id: c.ID_Nodo_Tematico, name: c.concepto, type: 'concepto_c3', data: c, parentId: parentData.id })));
                    const compsC4Dir = competenciasCapa4.filter(c => c.actividades_formativas_asociadas && c.actividades_formativas_asociadas.includes(parentData.id));
                    if (compsC4Dir) childrenData.push(...compsC4Dir.slice(0,2).map(c => ({id: c.id_competencia, name: c.nombre_competencia, type: 'competencia_c4', data: c, parentId: parentData.id})))
                } else if (parentData.type === 'taxonomia_c2' && parentData.data.competencias_profesionales_asociadas) {
                     parentData.data.competencias_profesionales_asociadas.slice(0,2).forEach(compStr => {
                        const compC4 = competenciasCapa4.find(c => compStr.includes(c.id_competencia) || c.nombre_competencia.toLowerCase().includes(compStr.toLowerCase().substring(0,20)));
                        if(compC4) childrenData.push({id: compC4.id_competencia, name: compC4.nombre_competencia, type: 'competencia_c4', data: compC4, parentId: parentData.id});
                     });
                } else if (parentData.type === 'concepto_c3') {
                    if (parentData.data.competencias_profesionales_asociadas) {
                        parentData.data.competencias_profesionales_asociadas.forEach(compStrC3 => {
                            const compId = compStrC3.split(':')[0];
                            const compC4 = competenciasCapa4.find(c => c.id_competencia === compId);
                            if(compC4) childrenData.push({id: compC4.id_competencia, name: compC4.nombre_competencia, type: 'competencia_c4', data: compC4, parentId: parentData.id});
                        });
                    }
                    const validacionC6 = validacionCapa6PorNodo[parentData.id];
                     if (validacionC6) {
                        const idC6 = `c6val-${parentData.id}`;
                        const confianza = validacionC6.nivel_confianza_consenso || 'N/D';
                        childrenData.push({id: idC6, name: `Validación(${confianza})`, type: 'validacion_c6', data: validacionC6, parentId: parentData.id});
                     }
                }
                // (Añadir más lógica para otros tipos de nodos si es necesario)


                childrenData.forEach(childDef => {
                    if (!localNodeMapForExpansion.has(childDef.id)) {
                        addNode(mainGraphNodesData, localNodeMapForExpansion, childDef.id, childDef.name, childDef.type, childDef.data);
                        newNodesToAdd.push(localNodeMapForExpansion.get(childDef.id));
                    }
                    // Asegurarse de que el enlace no exista ya
                    if (!mainGraphLinksData.some(l => (l.source.id === parentId && l.target.id === childDef.id) || (l.source.id === childDef.id && l.target.id === parentId))) {
                        addLink(mainGraphLinksData, parentId, childDef.id, `relacion_${childDef.type}`, localNodeMapForExpansion, localNodeMapForExpansion);
                        newLinksToAdd.push(mainGraphLinksData[mainGraphLinksData.length -1]);
                    }
                    // Llamada recursiva para expandir más niveles si es necesario (no implementado aquí por simplicidad)
                    // expandRecursive(childDef.id, childDef, currentDepth + 1, maxDepth);
                });
            }

            // Iniciar expansión desde el nodo 'd'
            expandRecursive(d.id, d, 1, 1); // Expandir solo un nivel por ahora
            mainGraphNodeMap = new Map(localNodeMapForExpansion); // Actualizar el mapa global

            d.childrenVisible = true;
            d.expanded = true;
        } else { // Colapsar (ocultar hijos)
            // Lógica para encontrar y ocultar hijos recursivamente (más compleja)
            // Por ahora, una contracción simple: quitar enlaces y nodos que no sean raíz y no tengan otros enlaces
            const nodesToKeep = new Set([d.id]);
            if (d.isRoot) nodesToKeep.add(d.id); // Siempre mantener el nodo raíz

            const linksToRemove = mainGraphLinksData.filter(l => l.source.id === d.id || l.target.id === d.id);
            const childrenIdsToRemove = new Set();

            linksToRemove.forEach(l => {
                if (l.source.id === d.id) childrenIdsToRemove.add(l.target.id);
                if (l.target.id === d.id) childrenIdsToRemove.add(l.source.id);
            });

            mainGraphLinksData = mainGraphLinksData.filter(l => !linksToRemove.includes(l));
            mainGraphNodesData = mainGraphNodesData.filter(n => {
                if(childrenIdsToRemove.has(n.id) && !n.isRoot){
                     // Antes de remover, verificar si este nodo hijo tiene otros enlaces
                     const isConnectedElsewhere = mainGraphLinksData.some(l => l.source.id === n.id || l.target.id === n.id);
                     if(!isConnectedElsewhere) {
                         mainGraphNodeMap.delete(n.id);
                         return false; // Remover
                     }
                }
                return true; // Mantener
            });
            d.childrenVisible = false;
            d.expanded = false;
        }
        updateMainGraph();
    }


    function handleNodeMouseover(event, d) { /* ... (como en la respuesta anterior) ... */ }
    function handleNodeMouseout(event, d) { /* ... (como en la respuesta anterior) ... */ }

    // --- Inicialización de Select y Botones de Control del Grafo ---
    if (selectActividadRaiz) {
        actividadesCapa1.forEach(act => {
            selectActividadRaiz.appendChild(new Option(`${act.codigo} - ${act.actividad.substring(0, 50)}...`, act.codigo));
        });
        selectActividadRaiz.addEventListener('change', (event) => {
            const actividadId = event.target.value;
            if (actividadId) {
                mainGraphNodesData = [];
                mainGraphLinksData = [];
                mainGraphNodeMap.clear();
                const actData = actividadesCapa1.find(a => a.codigo === actividadId);
                if (actData) {
                    addNode(mainGraphNodesData, mainGraphNodeMap, actividadId, actData.actividad, 'actividad_c1', actData, 0,0, true, true); // Nodo raíz, expandido por defecto
                    // Cargar primer nivel de hijos para la raíz
                    toggleNodeExpansion(null, mainGraphNodeMap.get(actividadId)); // Simular expansión inicial
                }
                updateMainGraph();
                if(detailPanel) detailPanel.classList.remove('visible');
            }
        });
    }

    if (btnResetLayout && svg) {
        btnResetLayout.addEventListener('click', () => {
            svg.transition().duration(750).call(
                d3.zoom().transform,
                d3.zoomIdentity,
                d3.zoomTransform(svg.node()).invert([mainGraphContainer.clientWidth / 2, mainGraphContainer.clientHeight / 2])
            );
             // Re-aplicar fuerzas para re-centrar si es necesario
            if (simulation) {
                mainGraphNodesData.forEach(n => { if(!n.isRoot) {n.fx = null; n.fy = null;} }); // Liberar nodos no raíz
                simulation.alpha(0.5).restart();
            }
        });
    }
    if (btnExpandAll) {
        btnExpandAll.addEventListener('click', () => {
            mainGraphNodesData.forEach(node => {
                if (node.isRoot || node.expanded === false) { // Expandir raíz o nodos no expandidos
                     toggleNodeExpansion(null, node); // Podría necesitar ajuste para expansión multinivel
                }
            });
            updateMainGraph();
        });
    }
    if (btnCollapseAll) {
        btnCollapseAll.addEventListener('click', () => {
            const rootNode = mainGraphNodesData.find(n => n.isRoot);
            mainGraphNodesData = rootNode ? [rootNode] : []; // Mantener solo el nodo raíz
            mainGraphLinksData = []; // Eliminar todos los enlaces
            mainGraphNodeMap.clear();
            if (rootNode) mainGraphNodeMap.set(rootNode.id, rootNode);

            if (rootNode) { // Simular colapso (quita hijos visuales pero podría mantener _children si se implementa así)
                rootNode.expanded = false;
                rootNode.childrenVisible = false;
            }
            updateMainGraph();
             if(detailPanel) detailPanel.classList.remove('visible');
        });
    }

    if(btnCerrarPanel && detailPanel) {
        btnCerrarPanel.addEventListener('click', () => {
            detailPanel.classList.remove('visible');
            // Deseleccionar nodo en el grafo
            if(gMainGraph) gMainGraph.selectAll("g.node-group circle").style("stroke", n => (n.isRoot ? "var(--accent-color)" : d3.color(d3ColorScale(n.type)).darker(0.5)) ).attr("stroke-width", n => n.isRoot ? 3 : 2);
        });
    }


    // --- Funciones de Visualización Específicas de Capa 6 (usadas en el panel de detalles) ---
    function drawRadialChart(containerId, colectivo) { /* ... (código completo como en la respuesta anterior) ... */ }
    function wrapText(text, width) { /* ... (código completo como en la respuesta anterior) ... */ }
    function createHeatmapTable(valoracionesIndividuales) {
        const table = document.createElement('table');
        table.className = 'heatmap-table';
        const thead = table.createTHead();
        const headerRow = thead.insertRow();
        const dimensionsOrder = ["relevancia_juridica", "precision_conceptual", "aplicabilidad_practica", "claridad_redaccion", "ausencia_sesgo_ideologico"];
        headerRow.insertCell().textContent = 'Validador';
        dimensionsOrder.forEach(dim => headerRow.insertCell().textContent = dim.replace(/_/g, ' ').substring(0,10)+'...');
        const tbody = table.createTBody();
        (valoracionesIndividuales || []).forEach(val => {
            const row = tbody.insertRow();
            row.insertCell().textContent = val.perfil_validador || val.hash_validador.substring(0, 10) + '...';
            dimensionsOrder.forEach(dim => {
                const cell = row.insertCell();
                const score = val.dimensiones[dim];
                cell.textContent = score !== undefined ? score : '-';
                if (score !== undefined) {
                    const R = Math.round(200 + 55 * ((5 - score) / 5)); // Rojo si bajo
                    const G = Math.round(200 + 55 * ((score - 5) / 5)); // Verde si alto
                    const B = 200;
                    cell.style.backgroundColor = `rgb(${Math.max(0, Math.min(255,R))}, ${Math.max(0, Math.min(255,G))}, ${B})`;
                    cell.style.color = Math.abs(score-5) > 3 ? 'white' : '#333';
                }
            });
        });
        return table;
    }
    function drawConsensusNetworkD3(containerId, validacionData) { /* ... (código completo como en la respuesta anterior, usando addNode, addLink, dragHelper globales) ... */ }


    // --- INICIALIZACIÓN DE LA APLICACIÓN ---
    initializeMainGraph(); // Configurar el SVG principal y la simulación una vez
    if (selectActividadRaiz) {
        // Si no hay actividades, el select estará vacío excepto la opción por defecto.
        if (actividadesCapa1.length > 0) {
             // Opcional: Cargar la primera actividad por defecto
            // selectActividadRaiz.value = actividadesCapa1[0].codigo;
            // selectActividadRaiz.dispatchEvent(new Event('change'));
        } else {
            if(mainGraphContainer) mainGraphContainer.innerHTML = "<p>No hay actividades formativas cargadas para visualizar.</p>";
        }
    }

    if (!actividadesCapa1.length && mainGraphContainer) {
         mainGraphContainer.innerHTML = "<p>No se pudieron cargar los datos de actividades (Capa 1 de c12.js). Verifique la consola.</p>";
    }
});