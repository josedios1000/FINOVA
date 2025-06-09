class SimuladorAhorros {
    constructor() {
        this.ahorroInicial = 0;
        this.aporteMensual = 0;
        this.rendimientoAnual = 0;
        this.periodoAnos = 0;
        this.inflacionAnual = 0;
        this.resultados = [];
    }

    configurar(ahorroInicial, aporteMensual, rendimientoAnual, periodoAnos, inflacionAnual) {
        this.ahorroInicial = parseFloat(ahorroInicial);
        this.aporteMensual = parseFloat(aporteMensual);
        this.rendimientoAnual = parseFloat(rendimientoAnual) / 100;
        this.periodoAnos = parseInt(periodoAnos);
        this.inflacionAnual = parseFloat(inflacionAnual) / 100;
    }

    simular() {
        this.resultados = [];
        let balance = this.ahorroInicial;
        let totalAportes = this.ahorroInicial;
        let aportesAnuales = this.aporteMensual * 12;
        
        for (let ano = 1; ano <= this.periodoAnos; ano++) {
            // Calcular intereses
            let intereses = balance * this.rendimientoAnual;
            
            // Calcular nuevo balance
            balance += intereses + aportesAnuales;
            totalAportes += aportesAnuales;
            
            // Calcular balance ajustado por inflación
            let factorInflacion = Math.pow(1 + this.inflacionAnual, ano);
            let balanceAjustado = balance / factorInflacion;
            
            this.resultados.push({
                ano,
                aportes: totalAportes,
                intereses: intereses,
                balance: balance,
                balanceAjustado: balanceAjustado
            });
        }
        
        return this.resultados;
    }

    obtenerResumen() {
        if (this.resultados.length === 0) return null;
        
        const ultimoAno = this.resultados[this.resultados.length - 1];
        
        return {
            totalAcumulado: ultimoAno.balance,
            totalAportes: ultimoAno.aportes,
            gananciaInversion: ultimoAno.balance - ultimoAno.aportes,
            balanceAjustado: ultimoAno.balanceAjustado
        };
    }

    obtenerDatosGrafico() {
        const labels = this.resultados.map(item => `Año ${item.ano}`);
        const balance = this.resultados.map(item => item.balance);
        const balanceAjustado = this.resultados.map(item => item.balanceAjustado);
        
        return {
            labels,
            datasets: [
                {
                    label: 'Balance Nominal',
                    data: balance,
                    borderColor: '#6c5ce7',
                    backgroundColor: 'rgba(108, 92, 231, 0.1)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'Balance Ajustado (inflación)',
                    data: balanceAjustado,
                    borderColor: '#00cec9',
                    backgroundColor: 'rgba(0, 206, 201, 0.1)',
                    tension: 0.3,
                    fill: true
                }
            ]
        };
    }
}