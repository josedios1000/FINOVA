document.addEventListener('DOMContentLoaded', function() {
    // Inicializar componentes
    const simulador = new SimuladorPrestamo();
    const grafico = new GraficoAmortizacion('amortizacionChart');
    grafico.inicializar();
    
    // Establecer fecha de inicio por defecto (hoy)
    const hoy = new Date();
    document.getElementById('fecha-inicio').valueAsDate = hoy;
    
    // Elementos del DOM
    const simularBtn = document.getElementById('simular-btn');
    const compararBtn = document.getElementById('comparar-btn');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const prevYearBtn = document.getElementById('prev-year');
    const nextYearBtn = document.getElementById('next-year');
    const currentYearEl = document.getElementById('current-year');
    
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
        const monto = document.getElementById('monto-prestamo').value;
        const plazo = document.getElementById('plazo').value;
        const tasaInteres = document.getElementById('tasa-interes').value;
        const tipoTasa = document.getElementById('tipo-tasa').value;
        const frecuenciaPago = document.getElementById('frecuencia-pago').value;
        const fechaInicio = document.getElementById('fecha-inicio').value;
        
        // Configurar y ejecutar simulación
        simulador.configurar(monto, plazo, tasaInteres, tipoTasa, frecuenciaPago, fechaInicio);
        const amortizacion = simulador.calcularAmortizacion();
        const resumen = simulador.obtenerResumen();
        
        // Actualizar gráfico
        grafico.actualizar(simulador.obtenerDatosGrafico());
        
        // Actualizar KPIs
        document.getElementById('pago-periodico').textContent = formatearMoneda(resumen.pagoPeriodico);
        document.getElementById('total-intereses').textContent = formatearMoneda(resumen.totalIntereses);
        document.getElementById('costo-total').textContent = formatearMoneda(resumen.totalPagado);
        
        // Actualizar tabla de amortización
        actualizarTablaAmortizacion(amortizacion);
        
        // Actualizar resumen
        actualizarResumen(simulador, resumen);
        
        // Actualizar calendario
        actualizarCalendario(hoy.getFullYear());
        currentYearEl.textContent = hoy.getFullYear();
    });
    
    // Manejar navegación del calendario
    let currentYear = hoy.getFullYear();
    
    prevYearBtn.addEventListener('click', function() {
        currentYear--;
        currentYearEl.textContent = currentYear;
        actualizarCalendario(currentYear);
    });
    
    nextYearBtn.addEventListener('click', function() {
        currentYear++;
        currentYearEl.textContent = currentYear;
        actualizarCalendario(currentYear);
    });
    
    // Función para actualizar la tabla de amortización
    function actualizarTablaAmortizacion(amortizacion) {
        const tbody = document.querySelector('#amortizacion-table tbody');
        tbody.innerHTML = '';
        
        amortizacion.forEach(pago => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${pago.numeroPago}</td>
                <td>${formatearFecha(pago.fecha)}</td>
                <td>${formatearMoneda(pago.pago)}</td>
                <td>${formatearMoneda(pago.capital)}</td>
                <td>${formatearMoneda(pago.intereses)}</td>
                <td>${formate