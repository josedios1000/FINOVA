document.addEventListener('DOMContentLoaded', function () {
  // Configuración global de Highcharts
  Highcharts.setOptions({
    lang: {
      decimalPoint: '.',
      thousandsSep: ','
    }
  });

  // Función para calcular el total acumulado pagado
  function calcularTotalPagado(monto, tasaAnual, plazoMeses) {
    const tasaMensual = tasaAnual / 12 / 100;                                           // Convertir a tasa mensual
    const tasaMensualConComision = tasaMensual + 0.01;                                  // Agregar 1% de comisión
    const cuota = monto * tasaMensual / (1 - Math.pow(1 + tasaMensual, -plazoMeses));   // Calcular cuota mensual
    let totalAcumulado = [];                                                            // Inicializar arreglo para almacenar el total acumulado
    let total = 0;                                                                      // Inicializar total acumulado

    // Calcular el total acumulado mes a mes
    for (let mes = 1; mes <= plazoMeses; mes++) {
      total += cuota;                                // Sumar la cuota mensual al total acumulado
      totalAcumulado.push([mes, total]);             // Agregar el mes y el total acumulado al arreglo
    }
    return totalAcumulado;                           // Retornar el arreglo con el total acumulado
  }

  // Datos para los préstamos
  const monto = 10000;                                      // Monto del préstamo
  const plazo = 12;                                         // Plazo en meses
  const prestamo5 = calcularTotalPagado(monto, 20, plazo);  // Crédito al 20%
  const prestamo11 = calcularTotalPagado(monto, 60, plazo); // Crédito al 60%

  // Crear la gráfica con series vacías
  const chart = Highcharts.chart('container', {
    chart: {
      type: 'line',
      backgroundColor: '#fff',
      animation: false
    },
    title: {
      text: 'Comparación de Créditos: 20% vs 60% de Interés Anual',
      style: { color: '#333', fontSize: '20px' }
    },
    xAxis: {
      title: { text: 'Mes', style: { color: '#333' } },
      labels: { style: { color: '#666' } },
      tickInterval: 1
    },
    yAxis: {
      title: { text: 'Total Pagado (MXN)', style: { color: '#333' } },
      labels: { 
        style: { color: '#666' },
        formatter: function () {
          return '$' + this.value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
      }
    },
    tooltip: {
      headerFormat: '<b>Mes {point.x}</b><br>',
      pointFormat: '{series.name}: <b>${point.y:,.2f} MXN</b>',
      backgroundColor: '#fff',
      borderColor: '#ddd',
      style: { color: '#333' }
    },
    plotOptions: {
      line: {
        marker: { enabled: false },
        lineWidth: 3
      }
    },
    series: [{  // Serie 1: Vacía inicialmente
      name: 'Crédito al 20% anual',
      data: [],
      color: '#3498db'
    }, {  // Serie 2: Vacía inicialmente
      name: 'Crédito al 60% anual',
      data: [],
      color: '#e74c3c'
    }],
    credits: { enabled: false }
  });

  // Función para animar las series
  function animarGrafica() {
    let mesActual = 0;
    const intervalo = setInterval(() => {
      if (mesActual < plazo) {
        // Agregar punto a ambas series
        chart.series[0].addPoint(prestamo5[mesActual], true, false, { duration: 400 });
        chart.series[1].addPoint(prestamo11[mesActual], true, false, { duration: 400 });
        mesActual++;
      } else {
        clearInterval(intervalo);
      }
    }, 500); // Velocidad de animación (500ms por mes)
  }

  // Asignar la animación al botón
  document.getElementById('play-btn').addEventListener('click', animarGrafica);
});