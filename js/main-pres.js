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
                <td>${formatearMoneda(pago.saldo)}</td>
            `;
            
            tbody.appendChild(row);
        });
    }
    
    // Función para actualizar el resumen
    function actualizarResumen(simulador, resumen) {
        document.getElementById('res-monto').textContent = formatearMoneda(simulador.monto);
        document.getElementById('res-plazo').textContent = `${simulador.plazo} ${simulador.frecuenciaPago === 'mensual' ? 'meses' : simulador.frecuenciaPago === 'quincenal' ? 'quincenas' : 'semanas'}`;
        document.getElementById('res-tasa').textContent = `${(simulador.tasaInteresAnual * 100).toFixed(2)}%`;
        document.getElementById('res-tipo-tasa').textContent = simulador.tipoTasa === 'fija' ? 'Fija' : 'Variable';
        document.getElementById('res-frecuencia').textContent = simulador.frecuenciaPago === 'mensual' ? 'Mensual' : simulador.frecuenciaPago === 'quincenal' ? 'Quincenal' : 'Semanal';
        
        document.getElementById('res-pago').textContent = formatearMoneda(resumen.pagoPeriodico);
        document.getElementById('res-total').textContent = formatearMoneda(resumen.totalPagado);
        document.getElementById('res-intereses').textContent = formatearMoneda(resumen.totalIntereses);
        document.getElementById('res-cat').textContent = `${resumen.cat.toFixed(2)}%`;
    }
    
    // Función para actualizar el calendario
    function actualizarCalendario(year) {
        const pagosAno = simulador.obtenerCalendarioPagos(year);
        const calendarGrid = document.getElementById('calendar-grid');
        calendarGrid.innerHTML = '';
        
        if (pagosAno.length === 0) {
            calendarGrid.innerHTML = '<p>No hay pagos programados para este año</p>';
            return;
        }
        
        // Agrupar pagos por mes
        const pagosPorMes = {};
        pagosAno.forEach(pago => {
            const mes = pago.fecha.getMonth();
            if (!pagosPorMes[mes]) {
                pagosPorMes[mes] = [];
            }
            pagosPorMes[mes].push(pago.fecha.getDate());
        });
        
        // Generar calendario
        const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        
        Object.keys(pagosPorMes).forEach(mes => {
            const mesNum = parseInt(mes);
            const mesCard = document.createElement('div');
            mesCard.className = 'month-card';
            
            // Título del mes
            const mesTitle = document.createElement('div');
            mesTitle.className = 'month-title';
            mesTitle.textContent = meses[mesNum];
            mesCard.appendChild(mesTitle);
            
            // Días de la semana
            const dayNames = document.createElement('div');
            dayNames.className = 'day-names';
            dayNames.innerHTML = 'L<span>M</span><span>M</span><span>J</span><span>V</span><span>S</span><span>D</span>';
            mesCard.appendChild(dayNames);
            
            // Días del mes
            const daysGrid = document.createElement('div');
            daysGrid.className = 'days-grid';
            
            // Obtener primer día del mes y desplazamiento
            const primerDia = new Date(year, mesNum, 1).getDay();
            const diasEnMes = new Date(year, mesNum + 1, 0).getDate();
            
            // Días vacíos al inicio
            for (let i = 0; i < primerDia; i++) {
                const emptyDay = document.createElement('div');
                emptyDay.className = 'day';
                daysGrid.appendChild(emptyDay);
            }
            
            // Días del mes
            for (let dia = 1; dia <= diasEnMes; dia++) {
                const dayEl = document.createElement('div');
                dayEl.className = 'day';
                dayEl.textContent = dia;
                
                // Marcar días de pago
                if (pagosPorMes[mesNum].includes(dia)) {
                    dayEl.classList.add('payment-day');
                }
                
                daysGrid.appendChild(dayEl);
            }
            
            mesCard.appendChild(daysGrid);
            calendarGrid.appendChild(mesCard);
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
    
    // Función para formatear fecha
    function formatearFecha(fecha) {
        return fecha.toLocaleDateString('es-MX', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }
});