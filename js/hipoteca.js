class SimuladorHipoteca {
    constructor() {
        this.valorPropiedad = 0;
        this.enganchePorcentaje = 0;
        this.montoPrestamo = 0;
        this.plazoAnos = 0;
        this.tasaInteresAnual = 0;
        this.tipoInteres = "fijo";
        this.seguroHogarAnual = 0;
        this.amortizacion = [];
    }

    configurar(valorPropiedad, enganchePorcentaje, plazoAnos, tasaInteresAnual, tipoInteres, seguroHogarAnual) {
        this.valorPropiedad = parseFloat(valorPropiedad);
        this.enganchePorcentaje = parseFloat(enganchePorcentaje) / 100;
        this.plazoAnos = parseInt(plazoAnos);
        this.tasaInteresAnual = parseFloat(tasaInteresAnual) / 100;
        this.tipoInteres = tipoInteres;
        this.seguroHogarAnual = parseFloat(seguroHogarAnual);
        
        // Calcular monto del préstamo
        this.montoPrestamo = this.valorPropiedad * (1 - this.enganchePorcentaje);
    }

    calcularAmortizacion() {
        this.amortizacion = [];
        const meses = this.plazoAnos * 12;
        const tasaMensual = this.tasaInteresAnual / 12;
        const seguroMensual = this.seguroHogarAnual / 12;
        
        // Calcular pago mensual (fórmula de amortización)
        let pagoMensual = (this.montoPrestamo * tasaMensual) / 
                          (1 - Math.pow(1 + tasaMensual, -meses));
        
        let saldo = this.montoPrestamo;
        let totalIntereses = 0;
        
        for (let i = 1; i <= meses; i++) {
            const interesMensual = saldo * tasaMensual;
            const capitalMensual = pagoMensual - interesMensual;
            
            saldo -= capitalMensual;
            totalIntereses += interesMensual;
            
            // Guardar datos anuales (resumen por año)
            if (i % 12 === 0 || i === meses) {
                this.amortizacion.push({
                    año: Math.ceil(i / 12),
                    pagoAnual: pagoMensual * (i % 12 === 0 ? 12 : meses % 12),
                    capital: this.montoPrestamo - saldo,
                    interes: totalIntereses,
                    saldo: saldo > 0 ? saldo : 0
                });
                totalIntereses = 0;
            }
        }
        
        return {
            pagoMensual: pagoMensual + seguroMensual,
            totalIntereses: this.amortizacion.reduce((sum, item) => sum + item.interes, 0),
            costoTotal: this.montoPrestamo + this.amortizacion.reduce((sum, item) => sum + item.interes, 0)
        };
    }

    obtenerDatosGrafico() {
        const labels = this.amortizacion.map(item => `Año ${item.año}`);
        const capital = this.amortizacion.map(item => item.capital);
        const intereses = this.amortizacion.map(item => item.interes);
        
        return {
            labels,
            datasets: [
                {
                    label: 'Capital pagado',
                    data: capital,
                    backgroundColor: '#2e86de',
                    stack: 'Stack 0'
                },
                {
                    label: 'Intereses pagados',
                    data: intereses,
                    backgroundColor: '#00d2d3',
                    stack: 'Stack 0'
                }
            ]
        };
    }
}