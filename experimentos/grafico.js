class GraficoAmortizacion {
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
                        backgroundColor: 'rgba(45, 52, 54, 0.9)',
                        titleColor: '#f5f6fa',
                        bodyColor: '#f5f6fa',
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        borderWidth: 1,
                        padding: 12,
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += new Intl.NumberFormat('es-MX', {
                                        style: 'currency',
                                        currency: 'MXN'
                                    }).format(context.parsed.y);
                                }
                                return label;
                            },
                            footer: function(tooltipItems) {
                                let total = tooltipItems.reduce((sum, item) => sum + item.parsed.y, 0);
                                return 'Total: ' + new Intl.NumberFormat('es-MX', {
                                    style: 'currency',
                                    currency: 'MXN'
                                }).format(total);
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        stacked: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#f5f6fa'
                        }
                    },
                    y: {
                        stacked: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#f5f6fa',
                            callback: function(value) {
                                return new Intl.NumberFormat('es-MX', {
                                    style: 'currency',
                                    currency: 'MXN',
                                    maximumFractionDigits: 0
                                }).format(value);
                            }
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }

    actualizar(datos) {
        if (!this.chart) {
            this.inicializar();
        }
        
        this.chart.data.labels = datos.labels.slice(0, 30); // Mostrar solo primeros 30 pagos para mejor visualización
        this.chart.data.datasets = datos.datasets.map(dataset => ({
            ...dataset,
            data: dataset.data.slice(0, 30)
        }));
        this.chart.update();
    }
}