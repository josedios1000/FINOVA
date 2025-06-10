document.addEventListener('DOMContentLoaded', function() {
    const simulador = new SimuladorHipoteca();
    const grafico = new GraficoHipoteca('hipotecaChart');
    grafico.inicializar();
    
    // Elementos del DOM
    const valorPropiedad = document.getElementById('valor-propiedad');
    const enganche = document.getElementById('enganche');
    const montoPrestamo = document.getElementById('monto-prestamo');
    const plazo = document.getElementById('plazo');
    const tasaInteres = document.getElementById('tasa-interes');
    const tipoInteres = document.getElementById('tipo-interes');
    const seguroHogar = document.getElementById('seguro-hogar');
    const simularBtn = document.getElementById('simular-btn');
    const reiniciarBtn = document.getElementById('reiniciar-btn');
    const compararBtn = document.getElementById('comparar-btn');
    
    // Calcular monto del préstamo automáticamente
    function actualizarMontoPrestamo() {
        const valor = parseFloat(valorPropiedad.value) || 0;
        const porcEnganche = parseFloat(enganche.value) / 100 || 0;
        montoPrestamo.value = (valor * (1 - porcEnganche)).toLocaleString('es-MX', {
            style: 'currency',
            currency: 'MXN',
            maximumFractionDigits: 0
        });
    }
    
    valorPropiedad.addEventListener('input', actualizarMontoPrestamo);
    enganche.addEventListener('input', actualizarMontoPrestamo);
    
    // Simular hipoteca
    simularBtn.addEventListener('click', function() {
        simulador.configurar(
            valorPropiedad.value,
            enganche.value,
            plazo.value,
            tasaInteres.value,
            tipoInteres.value,
            seguroHogar.value
        );
        
        const resultado = simulador.calcularAmortizacion();
        
        // Actualizar KPIs
        document.getElementById('pago-mensual').textContent = resultado.pagoMensual.toLocaleString('es-MX', {
            style: 'currency',
            currency: 'MXN'
        });
        
        document.getElementById('total-intereses').textContent = resultado.totalIntereses.toLocaleString('es-MX', {
            style: 'currency',
            currency: 'MXN'
        });
        
        document.getElementById('costo-total').textContent = resultado.costoTotal.toLocaleString('es-MX', {
            style: 'currency',
            currency: 'MXN'
        });
        
        // Actualizar gráfico
        grafico.actualizar(simulador.obtenerDatosGrafico());
        
        // Actualizar tabla de amortización
        actualizarTablaAmortizacion(simulador.amortizacion);
        
        // Actualizar resumen
        actualizarResumen();
    });
    
    function actualizarTablaAmortizacion(amortizacion) {
        const tbody = document.querySelector('#amortizacion-table tbody');
        tbody.innerHTML = '';
        
        amortizacion.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.año}</td>
                <td>${item.pagoAnual.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</td>
                <td>${item.capital.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</td>
                <td>${item.interes.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</td>
                <td>${item.saldo.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</td>
            `;
            tbody.appendChild(row);
        });
    }
    
    function actualizarResumen() {
        document.getElementById('res-valor').textContent = valorPropiedad.value.toLocaleString('es-MX', {
            style: 'currency',
            currency: 'MXN'
        });
        
        document.getElementById('res-enganche').textContent = `${(enganche.value * valorPropiedad.value / 100).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })} (${enganche.value}%)`;
        
        document.getElementById('res-monto').textContent = montoPrestamo.value;
        
        document.getElementById('res-plazo').textContent = `${plazo.value} años`;
        document.getElementById('res-tasa').textContent = `${tasaInteres.value}% (${tipoInteres.value === 'fijo' ? 'Fijo' : 'Variable'})`;
        document.getElementById('res-pago').textContent = document.getElementById('pago-mensual').textContent;
        document.getElementById('res-seguro').textContent = `${seguroHogar.value.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}/año`;
    }
    
    // Reiniciar simulador
    reiniciarBtn.addEventListener('click', function() {
        valorPropiedad.value = 500000;
        enganche.value = 20;
        plazo.value = 20;
        tasaInteres.value = 7.5;
        tipoInteres.value = 'fijo';
        seguroHogar.value = 1200;
        actualizarMontoPrestamo();
        
        document.getElementById('pago-mensual').textContent = '$0';
        document.getElementById('total-intereses').textContent = '$0';
        document.getElementById('costo-total').textContent = '$0';
        
        document.querySelector('#amortizacion-table tbody').innerHTML = '';
        grafico.inicializar();
    });
    
    // Comparar escenarios
    compararBtn.addEventListener('click', function() {
        // Implementar lógica de comparación
    });
});