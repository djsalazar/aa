/**
 * main.js - Punto de entrada principal para la aplicación MOFJ
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando aplicación MOFJ...');
    
    // Mostrar pantalla de carga
    MOFJVisualization.showLoading();
    
    // Inicializar visualizaciones
    setTimeout(function() {
        try {
            // Inicializar módulo de visualización
            MOFJVisualization.init();
            
            // Simular carga de datos del servidor
            console.log('Datos cargados correctamente');
            
            // Ocultar pantalla de carga
            MOFJVisualization.hideLoading();
            
            // Abrir en la vista multicapa por defecto
            document.querySelector('#layers-nav li[data-layer="all"]').click();
        } catch (error) {
            console.error('Error al inicializar:', error);
            alert('Hubo un error al inicializar la aplicación. Por favor, recargue la página.');
        }
    }, 1500);
    
    // Simular la información procesada específica para algunas entidades
    setupDemoData();
});

/**
 * Configura algunos datos de demostración
 */
function setupDemoData() {
    // Añadir listeners para elementos relacionados
    document.addEventListener('click', function(event) {
        const target = event.target;
        
        // Capturar clics en elementos relacionados
        if (target.closest('.related-item')) {
            const item = target.closest('.related-item');
            const id = item.getAttribute('data-id');
            const type = item.getAttribute('data-type');
            
            if (type === 'validacion_concepto' || type === 'validacion_competencia') {
                // Navegar a la pestaña de Capa 6
                document.querySelector('#layers-nav li[data-layer="6"]').click();
                
                // Resaltar el elemento en el mapa de calor (simulado)
                setTimeout(function() {
                    const heatmapView = document.getElementById('heatmap-view');
                    const dataItem = dataCapa6.mapaCalorGeneral.find(d => d.id === id);
                    
                    if (dataItem) {
                        const index = dataCapa6.mapaCalorGeneral.indexOf(dataItem);
                        
                        // Resaltar visualmente (simulación)
                        const flash = document.createElement('div');
                        flash.style.position = 'absolute';
                        flash.style.top = `${80 + index * 30}px`;
                        flash.style.left = '50%';
                        flash.style.transform = 'translateX(-50%)';
                        flash.style.width = '90%';
                        flash.style.height = '30px';
                        flash.style.backgroundColor = 'rgba(255, 255, 0, 0.3)';
                        flash.style.borderRadius = '5px';
                        flash.style.animation = 'flash 1.5s';
                        
                        heatmapView.style.position = 'relative';
                        heatmapView.appendChild(flash);
                        
                        // Eliminar después de la animación
                        setTimeout(function() {
                            heatmapView.removeChild(flash);
                        }, 1500);
                    }
                }, 500);
            }
        }
    });
    
    // Estilo para la animación de flash
    const style = document.createElement('style');
    style.textContent = `
        @keyframes flash {
            0% { opacity: 0; }
            50% { opacity: 1; }
            100% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Preparar algunos datos para los archivos generados
    // Esta parte es para simular conversiones de datos, en un sistema real
    // estos datos vendrían del backend
    
    // Capa 1: Crear dataCapa1.js si no existe (simulado)
    if (!window.dataCapa1) {
        console.warn('Datos reales no disponibles, usando datos de respaldo');
    }
    
    // Añadir manejadores para los enlaces de ayuda
    document.getElementById('about-link').addEventListener('click', function(e) {
        e.preventDefault();
        showAboutInfo();
    });
    
    document.getElementById('help-link').addEventListener('click', function(e) {
        e.preventDefault();
        showHelpInfo();
    });
}

/**
 * Muestra información sobre la aplicación
 */
function showAboutInfo() {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    modalTitle.textContent = 'Acerca de MOFJ Visualizer';
    
    modalBody.innerHTML = `
        <div class="about-info">
            <p>Esta aplicación visualiza el Modelo Ontológico de Formación Judicial (MOFJ) desarrollado para el Organismo Judicial de Guatemala.</p>
            
            <h4>Estructura de Capas</h4>
            <ul>
                <li><strong>Capa 1:</strong> Académico-Administrativa - Programas, cursos y aspectos organizativos.</li>
                <li><strong>Capa 2:</strong> Temático-Taxonómica - Áreas temáticas y clasificación disciplinar.</li>
                <li><strong>Capa 3:</strong> Taxonomía Global Enriquecida - Competencias, conceptos y normativa.</li>
                <li><strong>Capa 4:</strong> Marco Formal de Competencias - Competencias formalizadas por dominios.</li>
                <li><strong>Capa 5:</strong> Sistema de Evaluación - Niveles de dominio e instrumentos.</li>
                <li><strong>Capa 6:</strong> Validación Colectiva - Consenso epistémico sobre conceptos.</li>
            </ul>
            
            <p>Versión 1.0.0 - Mayo 2025</p>
        </div>
    `;
    
    modal.classList.remove('hidden');
}

/**
 * Muestra ayuda sobre cómo usar la aplicación
 */
function showHelpInfo() {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    modalTitle.textContent = 'Ayuda - Cómo usar la aplicación';
    
    modalBody.innerHTML = `
        <div class="help-info">
            <h4>Navegación</h4>
            <p>Use la barra superior para navegar entre las diferentes capas del modelo.</p>
            
            <h4>Visualizaciones</h4>
            <p>Cada capa ofrece diferentes visualizaciones:</p>
            <ul>
                <li><strong>Grafo:</strong> Muestra las relaciones entre entidades. Puede hacer zoom con la rueda del mouse.</li>
                <li><strong>Radial:</strong> Vista jerárquica expandible desde el centro.</li>
                <li><strong>Flujo:</strong> Diagrama Sankey que muestra la progresión entre capas.</li>
            </ul>
            
            <h4>Interacción</h4>
            <ul>
                <li>Haga clic en cualquier elemento para ver sus detalles.</li>
                <li>Use los filtros para enfocarse en elementos específicos.</li>
                <li>La búsqueda permite encontrar entidades por nombre o ID.</li>
            </ul>
            
            <h4>Exportación</h4>
            <p>Puede exportar los detalles de cualquier entidad usando el botón en el panel de detalles.</p>
        </div>
    `;
    
    modal.classList.remove('hidden');
}