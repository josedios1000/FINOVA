class SimuladorPrestamo {
    constructor() {
        this.monto = 0;
        this.plazo = 0;
        this.tasaInteresAnual = 0;
        this.tipoTasa = 'fija';
        this.frecuenciaPago = 'mensual';
        this.fechaInicio = new Date();
        this.amortizacion = [];
    }

    configurar(monto, plazo, tasaInteresAnual, tipoTasa, frecuenciaPago, fechaInicio) {
        this.monto = parseFloat(monto);
        this.plazo = parseInt(plazo);
        this.tasaInteresAnual = parseFloat(tasaInteresAnual) / 100;
        this.tipoTasa = tipoTasa;
        this.frecuenciaPago = frecuenciaPago;
        this.fechaInicio = new Date(fechaInicio);
    }

    calcularAmortizacion() {
        this.amortizacion = [];
        
        // Calcular tasa periódica y pagos según frecuencia
        let pagosPorAno = this.obtenerPagosPorAno();
        let tasaPeriodica = this.tasaInteresAnual / pagosPorAno;
        let numeroPagos = this.plazo;
        
        // Calcular pago periódico usando fórmula de anualidades
        let pagoPeriodico = this.calcularPagoPeriodico(tasaPeriodica, numeroPagos);
        
        let saldo = this.monto;
        let fechaPago = new Date(this.fechaInicio);
        
        for (let i = 1; i <= numeroPagos; i++) {
            // Calcular intereses y capital del pago
            let intereses = saldo * tasaPeriodica;
            let capital = pagoPeriodico - intereses;
            
            // Ajustar último pago para evitar desviaciones
            if (i === numeroPagos) {
                capital = saldo;
                pagoPeriodico = capital + intereses;
            }
            
            // Actualizar saldo
            saldo -= capital;
            
            // Guardar datos del pago
            this.amortizacion.push({
                numeroPago: i,
                fecha: new Date(fechaPago),
                pago: pagoPeriodico,
                capital: capital,
                intereses: intereses,
                saldo: saldo > 0 ? saldo : 0
            });
            
            // Calcular siguiente fecha de pago
            fechaPago = this.calcularSiguienteFecha(fechaPago);
        }
        
        return this.amortizacion;
    }

    calcularPagoPeriodico(tasaPeriodica, numeroPagos) {
        if (tasaPeriodica === 0) {
            return this.monto / numeroPagos;
        }
        
        return this.monto * (tasaPeriodica * Math.pow(1 + tasaPeriodica, numeroPagos)) / 
               (Math.pow(1 + tasaPeriodica, numeroPagos) - 1);
    }

    obtenerPagosPorAno() {
        switch (this.frecuenciaPago) {
            case 'mensual': return 12;
            case 'quincenal': return 24;
            case 'semanal': return 52;
            default: return 12;
        }
    }

    calcularSiguienteFecha(fechaActual) {
        let nuevaFecha = new Date(fechaActual);
        
        switch (this.frecuenciaPago) {
            case 'mensual':
                nuevaFecha.setMonth(nuevaFecha.getMonth() + 1);
                break;
            case 'quincenal':
                nuevaFecha.setDate(nuevaFecha.getDate() + 15);
                break;
            case 'semanal':
                nuevaFecha.setDate(nuevaFecha.getDate() + 7);
                break;
        }
        
        return nuevaFecha;
    }

    obtenerResumen() {
        if (this.amortizacion.length === 0) return null;
        
        const primerPago = this.amortizacion[0];
        const ultimoPago = this.amortizacion[this.amortizacion.length - 1];
        
        // Calcular totales
        let totalIntereses = this.amortizacion.reduce((sum, pago) => sum + pago.intereses, 0);
        let totalPagado = this.monto + totalIntereses;
        
        // Calcular CAT aproximado (fórmula simplificada)
        let cat = this.calcularCAT(totalPagado);
        
        return {
            pagoPeriodico: primerPago.pago,
            totalIntereses: totalIntereses,
            totalPagado: totalPagado,
            cat: cat
        };
    }

    calcularCAT(totalPagado) {
        // Fórmula simplificada del CAT (Costo Anual Total)
        let plazoAnos = this.plazo / this.obtenerPagosPorAno();
        let cat = (Math.pow(totalPagado / this.monto, 1 / plazoAnos) - 1) * 100;
        return cat;
    }

    obtenerDatosGrafico() {
        const labels = this.amortizacion.map((_, index) => `Pago ${index + 1}`);
        const capital = this.amortizacion.map(pago => pago.capital);
        const intereses = this.amortizacion.map(pago => pago.intereses);
        
        return {
            labels,
            datasets: [
                {
                    label: 'Capital',
                    data: capital,
                    backgroundColor: '#0984e3',
                    stack: 'Stack 0'
                },
                {
                    label: 'Intereses',
                    data: intereses,
                    backgroundColor: '#00cec9',
                    stack: 'Stack 0'
                }
            ]
        };
    }

    obtenerCalendarioPagos(ano) {
        return this.amortizacion.filter(pago => pago.fecha.getFullYear() === ano);
    }
}