document.addEventListener('DOMContentLoaded', function() {
    // Inicializar componentes
    const simulador = new SimuladorAhorros();
    const grafico = new GraficoProyeccion('proyeccionChart');
    grafico.inicializar();
    
    // Elementos del DOM
    const simularBtn = document.getElementById('simular-btn');
    const reiniciarBtn = document.getElementById('reiniciar-btn');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Manejar clicks en pestañas
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remover clase active de todos los botones y contenidos
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Agregar clase active al botón y contenido seleccionado
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Manejar simulación
    simularBtn.addEventListener('click', function() {
        // Obtener valores de los inputs
        const ahorroInicial = document.getElementById('ahorro-inicial').value;
        const aporteMensual = document.getElementById('aporte-mensual').value;
        const rendimientoAnual = document.getElementById('rendimiento').value;
        const periodoAnos = document.getElementById('periodo').value;
        const inflacionAnual = document.getElementById('inflacion').value;
        
        // Configurar y ejecutar simulación
        simulador.configurar(ahorroInicial, aporteMensual, rendimientoAnual, periodoAnos, inflacionAnual);
        const resultados = simulador.simular();
        const resumen = simulador.obtenerResumen();
        
        // Actualizar gráfico
        grafico.actualizar(simulador.obtenerDatosGrafico());
        
        // Actualizar KPIs
        document.getElementById('total-acumulado').textContent = formatearMoneda(resumen.totalAcumulado);
        document.getElementById('total-aportes').textContent = formatearMoneda(resumen.totalAportes);
        document.getElementById('ganancia-inversion').textContent = formatearMoneda(resumen.gananciaInversion);
        
        // Actualizar tabla
        actualizarTablaResultados(resultados);
    });
    
    // Manejar reinicio
    reiniciarBtn.addEventListener('click', function() {
        // Restablecer valores por defecto
        document.getElementById('ahorro-inicial').value = '10000';
        document.getElementById('aporte-mensual').value = '500';
        document.getElementById('rendimiento').value = '8';
        document.getElementById('periodo').value = '5';
        document.getElementById('inflacion').value = '3';
        
        // Limpiar resultados
        grafico.inicializar();
        document.getElementById('total-acumulado').textContent = '$0';
        document.getElementById('total-aportes').textContent = '$0';
        document.getElementById('ganancia-inversion').textContent = '$0';
        document.querySelector('#resultados-table tbody').innerHTML = '';
    });
    
    // Función para actualizar la tabla de resultados
    function actualizarTablaResultados(resultados) {
        const tbody = document.querySelector('#resultados-table tbody');
        tbody.innerHTML = '';
        
        resultados.forEach(item => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${item.ano}</td>
                <td>${formatearMoneda(item.aportes)}</td>
                <td>${formatearMoneda(item.intereses)}</td>
                <td>${formatearMoneda(item.balance)}</td>
                <td>${formatearMoneda(item.balanceAjustado)}</td>
            `;
            
            tbody.appendChild(row);
        });
    }
    
    // Función para formatear moneda
    function formatearMoneda(valor) {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(valor);
    }
});