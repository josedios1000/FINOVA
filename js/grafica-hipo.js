class GraficoHipoteca {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.chart = null;
    }

    inicializar() {
        if (this.chart) {
            this.chart.destroy();
        }
        
        this.chart = new Chart(this.ctx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: []
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: '#f5f6fa',
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.y.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}`;
                            }
                        }
                    }
                },
                scales: {
                    x: { stacked: true },
                    y: { stacked: true }
                }
            }
        });
    }

    actualizar(datos) {
        if (!this.chart) this.inicializar();
        this.chart.data.labels = datos.labels;
        this.chart.data.datasets = datos.datasets;
        this.chart.update();
    }
}