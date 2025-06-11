document.addEventListener('DOMContentLoaded', function () {
    // Configuración global de Highcharts
    Highcharts.setOptions({
        lang: {
            decimalPoint: '.',
            thousandsSep: ',',
            loading: 'Cargando...',
            months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            rangeSelectorFrom: 'Desde',
            rangeSelectorTo: 'Hasta',
            rangeSelectorZoom: 'Período',
            downloadPNG: 'Descargar PNG',
            downloadJPEG: 'Descargar JPEG',
            downloadPDF: 'Descargar PDF',
            downloadSVG: 'Descargar SVG',
            printChart: 'Imprimir gráfica',
            resetZoom: 'Reiniciar zoom',
            resetZoomTitle: 'Reiniciar zoom a 1:1'
        },
        chart: {
            style: {
                fontFamily: 'Poppins, sans-serif'
            }
        }
    });

    // Función para calcular el total acumulado pagado
    function calcularTotalPagado(monto, tasaAnual, plazoMeses) {
        const tasaMensual = tasaAnual / 12 / 100;
        const cuota = monto * tasaMensual / (1 - Math.pow(1 + tasaMensual, -plazoMeses));
        let totalAcumulado = [];
        let total = 0;

        for (let mes = 1; mes <= plazoMeses; mes++) {
            total += cuota;
            totalAcumulado.push([mes, total]);
        }
        return totalAcumulado;
    }

    // Datos para los préstamos
    const monto = 10000;
    const plazo = 12;
    const prestamoBajo = calcularTotalPagado(monto, 20, plazo);
    const prestamoAlto = calcularTotalPagado(monto, 60, plazo);

    // Crear la gráfica
    const chart = Highcharts.chart('grafica-comparativa', {
        chart: {
            type: 'line',
            backgroundColor: '#ffffff',
            animation: false,
            style: {
                fontFamily: 'Poppins, sans-serif'
            }
        },
        title: {
            text: 'Comparación de Créditos: 20% vs 60% de Interés Anual',
            style: { 
                color: '#2c3e50',
                fontSize: '2rem',
                fontWeight: '600',
                fontFamily: 'Montserrat, sans-serif'
            }
        },
        xAxis: {
            title: { 
                text: 'Mes', 
                style: { 
                    color: '#666666',
                    fontSize: '1.4rem',
                    fontWeight: '500'
                } 
            },
            labels: { 
                style: { 
                    color: '#666666',
                    fontSize: '1.2rem'
                } 
            },
            tickInterval: 1,
            gridLineWidth: 1,
            gridLineColor: '#f0f0f0'
        },
        yAxis: {
            title: { 
                text: 'Total Pagado (MXN)', 
                style: { 
                    color: '#666666',
                    fontSize: '1.4rem',
                    fontWeight: '500'
                } 
            },
            labels: { 
                style: { 
                    color: '#666666',
                    fontSize: '1.2rem'
                },
                formatter: function () {
                    return '$' + Highcharts.numberFormat(this.value, 0);
                }
            },
            gridLineWidth: 1,
            gridLineColor: '#f0f0f0'
        },
        tooltip: {
            headerFormat: '<b>Mes {point.x}</b><br>',
            pointFormat: '{series.name}: <b>${point.y:,.2f} MXN</b>',
            backgroundColor: '#ffffff',
            borderColor: '#dddddd',
            style: { 
                color: '#333333',
                fontSize: '1.4rem'
            },
            useHTML: true
        },
        plotOptions: {
            line: {
                marker: { 
                    enabled: false,
                    symbol: 'circle',
                    radius: 4,
                    lineWidth: 2
                },
                lineWidth: 3,
                states: {
                    hover: {
                        lineWidth: 4
                    }
                }
            }
        },
        series: [{
            name: 'Crédito al 20% anual',
            data: [],
            color: '#3498db',
            dashStyle: 'Solid'
        }, {
            name: 'Crédito al 60% anual',
            data: [],
            color: '#e74c3c',
            dashStyle: 'Solid'
        }],
        credits: { 
            enabled: false 
        },
        legend: {
            itemStyle: {
                fontSize: '1.4rem',
                color: '#333333',
                fontWeight: '500'
            },
            itemHoverStyle: {
                color: '#ff6b35'
            }
        },
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 600
                },
                chartOptions: {
                    title: {
                        style: {
                            fontSize: '1.6rem'
                        }
                    },
                    xAxis: {
                        title: {
                            style: {
                                fontSize: '1.2rem'
                            }
                        },
                        labels: {
                            style: {
                                fontSize: '1rem'
                            }
                        }
                    },
                    yAxis: {
                        title: {
                            style: {
                                fontSize: '1.2rem'
                            }
                        },
                        labels: {
                            style: {
                                fontSize: '1rem'
                            }
                        }
                    }
                }
            }]
        }
    });

    // Función para animar las series
    function animarGrafica() {
        const boton = document.getElementById('boton-simular');
        boton.disabled = true;
        boton.innerHTML = '<i class="bx bx-loader-circle bx-spin"></i> Simulando...';
        
        let mesActual = 0;
        const intervalo = setInterval(() => {
            if (mesActual < plazo) {
                chart.series[0].addPoint(prestamoBajo[mesActual], true, false, { 
                    duration: 400,
                    easing: 'easeOutBounce'
                });
                chart.series[1].addPoint(prestamoAlto[mesActual], true, false, { 
                    duration: 400,
                    easing: 'easeOutBounce'
                });
                mesActual++;
            } else {
                clearInterval(intervalo);
                boton.innerHTML = '<i class="bx bx-check-circle"></i> Simulación Completa';
                setTimeout(() => {
                    boton.disabled = false;
                    boton.innerHTML = '<i class="bx bx-line-chart"></i> Simular Nuevamente';
                }, 2000);
            }
        }, 500);
    }

    // Asignar la animación al botón
    document.getElementById('boton-simular').addEventListener('click', animarGrafica);
});