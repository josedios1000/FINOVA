// Simulador de datos de mercado en tiempo real
class MarketDataSimulator {
    constructor() {
        this.assets = [
            { symbol: "SPX", name: "S&P 500", price: 5210.32, change: -0.42, icon: "fas fa-chart-line" },
            { symbol: "NDX", name: "NASDAQ", price: 16345.21, change: -0.85, icon: "fas fa-microchip" },
            { symbol: "DJI", name: "DOW JONES", price: 39245.67, change: 0.18, icon: "fas fa-industry" },
            { symbol: "BTC", name: "Bitcoin", price: 63450, change: 3.21, icon: "fab fa-bitcoin" },
            { symbol: "ETH", name: "Ethereum", price: 3520.45, change: 5.12, icon: "fab fa-ethereum" },
            { symbol: "GOLD", name: "Oro", price: 2345.67, change: 0.72, icon: "fas fa-coins" },
            { symbol: "OIL", name: "Petróleo", price: 78.45, change: -1.23, icon: "fas fa-gas-pump" },
            { symbol: "USD/ARS", name: "Dólar Blue", price: 1245, change: 1.85, icon: "fas fa-dollar-sign" }
        ];
        
        this.tickerAssets = [
            { symbol: "DOLAR", name: "Dólar Blue", price: 1245, change: 1.85 },
            { symbol: "SPX", name: "S&P 500", price: 5210.32, change: -0.42 },
            { symbol: "BTC", name: "Bitcoin", price: 63450, change: 3.21 },
            { symbol: "GOLD", name: "Oro", price: 2345.67, change: 0.72 },
            { symbol: "OIL", name: "Petróleo", price: 78.45, change: -1.23 }
        ];
        
        this.init();
    }
    
    init() {
        this.updateTicker();
        this.updateMarketData();
        
        // Actualizar cada 30 segundos
        setInterval(() => {
            this.updateMarketData();
        }, 30000);
        
        // Actualizar ticker cada 5 segundos
        setInterval(() => {
            this.updateTicker();
        }, 5000);
    }
    
    updateMarketData() {
        this.assets.forEach(asset => {
            const randomChange = (Math.random() * 2 - 1) * 0.5;
            asset.change = randomChange;
            asset.price = asset.price * (1 + randomChange / 100);
        });
        
        if (typeof renderMarketData === 'function') {
            renderMarketData();
        }
    }
    
    updateTicker() {
        this.tickerAssets.forEach(asset => {
            const randomChange = (Math.random() * 2 - 1) * 0.3;
            asset.change = randomChange;
            asset.price = asset.price * (1 + randomChange / 100);
        });
        
        const tickerContainer = document.getElementById('ticker-container');
        if (tickerContainer) {
            tickerContainer.innerHTML = this.tickerAssets.map(asset => `
                <div class="ticker-item">
                    <span class="ticker-symbol">${asset.symbol}</span>
                    <span class="ticker-price">${asset.price.toFixed(asset.symbol === "OIL" ? 2 : 0)}</span>
                    <span class="ticker-change ${asset.change >= 0 ? 'positive' : 'negative'}">
                        ${asset.change >= 0 ? '+' : ''}${asset.change.toFixed(2)}%
                    </span>
                </div>
            `).join('');
        }
    }
}

// Iniciar simulador
const marketSimulator = new MarketDataSimulator();