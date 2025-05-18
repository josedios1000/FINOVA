// DOM Elements
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const searchSuggestions = document.getElementById('search-suggestions');
const sectorList = document.getElementById('sector-list');
const marketGrid = document.getElementById('market-grid');
const newsGrid = document.getElementById('news-grid');
const analysisCards = document.getElementById('analysis-cards');
const newsFilter = document.getElementById('news-filter');

// Datos de ejemplo (en una app real vendrían de una API)
const sectors = [
    { name: "Todos", icon: "fas fa-globe" },
    { name: "Acciones", icon: "fas fa-chart-line" },
    { name: "Cripto", icon: "fab fa-bitcoin" },
    { name: "Forex", icon: "fas fa-dollar-sign" },
    { name: "Materias Primas", icon: "fas fa-gas-pump" },
    { name: "Bonos", icon: "fas fa-hand-holding-usd" },
    { name: "ETFs", icon: "fas fa-boxes" },
    { name: "Macroeconomía", icon: "fas fa-landmark" }
];

const marketData = [
    { symbol: "SPX", name: "S&P 500", price: 5210.32, change: -0.42, icon: "fas fa-chart-line" },
    { symbol: "NDX", name: "NASDAQ", price: 16345.21, change: -0.85, icon: "fas fa-microchip" },
    { symbol: "DJI", name: "DOW JONES", price: 39245.67, change: 0.18, icon: "fas fa-industry" },
    { symbol: "BTC", name: "Bitcoin", price: 63450, change: 3.21, icon: "fab fa-bitcoin" },
    { symbol: "ETH", name: "Ethereum", price: 3520.45, change: 5.12, icon: "fab fa-ethereum" },
    { symbol: "GOLD", name: "Oro", price: 2345.67, change: 0.72, icon: "fas fa-coins" },
    { symbol: "OIL", name: "Petróleo", price: 78.45, change: -1.23, icon: "fas fa-gas-pump" },
    { symbol: "USD/ARS", name: "Dólar Blue", price: 1245, change: 1.85, icon: "fas fa-dollar-sign" }
];

const newsData = [
    { 
        id: 1,
        title: "La Fed mantiene tasas pero advierte sobre posibles nuevos aumentos",
        excerpt: "Jerome Powell señaló que la inflación sigue siendo persistente y no descartan más ajustes este año.",
        category: "Macroeconomía",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        author: "María Rodríguez",
        time: "Hace 2 horas",
        saved: false
    },
    { 
        id: 2,
        title: "Bitcoin supera los $63,000 tras aprobación de ETFs de Ethereum",
        excerpt: "El mercado cripto celebra la decisión de la SEC mientras el ETH alcanza máximos de 2 meses.",
        category: "Criptomonedas",
        image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
        author: "Carlos Méndez",
        time: "Hace 4 horas",
        saved: false
    },
    { 
        id: 3,
        title: "Acciones de Tesla caen 12% tras resultados trimestrales",
        excerpt: "Los ingresos no alcanzaron las expectativas de Wall Street, generando ventas masivas.",
        category: "Acciones",
        image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        author: "Luis Fernández",
        time: "Ayer",
        saved: false
    },
    { 
        id: 4,
        title: "BCRA anuncia nuevas medidas cambiarias para contener el dólar",
        excerpt: "El organismo implementará un nuevo sistema de liquidación para exportadores.",
        category: "Economía",
        image: "https://images.unsplash.com/photo-1604594849809-dfedbc827105?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        author: "Ana López",
        time: "Hace 5 horas",
        saved: false
    },
    { 
        id: 5,
        title: "Cómo la IA está revolucionando el análisis de mercados",
        excerpt: "Los fondos de inversión adoptan algoritmos predictivos con resultados sorprendentes.",
        category: "Tecnología",
        image: "https://images.unsplash.com/photo-1642790552871-6e28d6e5a7cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
        author: "Diego Ramírez",
        time: "Ayer",
        saved: false
    },
    { 
        id: 6,
        title: "Guía para invertir en bienes raíces con poco capital",
        excerpt: "Estrategias innovadoras que están democratizando el acceso al mercado inmobiliario.",
        category: "Inversiones",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        author: "Sofía Gutiérrez",
        time: "Hace 2 días",
        saved: false
    }
];

const analysisData = [
    {
        title: "Análisis Técnico: S&P 500 en zona crítica",
        excerpt: "El índice se acerca a niveles clave de soporte que podrían definir la tendencia para el resto del año.",
        type: "TÉCNICO",
        image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        author: "Juan Pérez",
        time: "Hace 1 día"
    },
    {
        title: "Perspectivas del dólar en América Latina",
        excerpt: "Cómo afectarán las decisiones de la Fed a las monedas de la región en el segundo semestre.",
        type: "MACRO",
        image: "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        author: "Laura Gómez",
        time: "Hace 2 días"
    },
    {
        title: "Bitcoin: ¿Corrección sana o inicio de bear market?",
        excerpt: "Analizamos los factores clave que determinarán el movimiento del BTC en las próximas semanas.",
        type: "CRIPTO",
        image: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        author: "Carlos Méndez",
        time: "Hace 3 días"
    }
];

// Renderizar sectores
function renderSectors() {
    sectorList.innerHTML = sectors.map(sector => `
        <li class="sector-item">
            <a href="#" class="sector-link ${sector.name === "Todos" ? "active" : ""}">
                <i class="${sector.icon}"></i> ${sector.name}
            </a>
        </li>
    `).join('');
}

// Renderizar datos de mercado
function renderMarketData() {
    marketGrid.innerHTML = marketData.map(item => `
        <div class="market-card">
            <div class="market-header">
                <span class="market-name">${item.symbol}</span>
                <div class="market-icon">
                    <i class="${item.icon}"></i>
                </div>
            </div>
            <div class="market-price">${formatNumber(item.price)}</div>
            <div class="market-change ${item.change >= 0 ? "positive" : "negative"}">
                <i class="fas fa-arrow-${item.change >= 0 ? "up" : "down"}"></i> ${Math.abs(item.change)}%
            </div>
        </div>
    `).join('');
}

// Renderizar noticias
function renderNews(filter = "all") {
    let filteredNews = newsData;
    
    if (filter !== "all") {
        filteredNews = newsData.filter(news => 
            news.category.toLowerCase().includes(filter.toLowerCase())
        );
    }
    
    newsGrid.innerHTML = filteredNews.map(news => `
        <article class="news-card" data-id="${news.id}">
            <img src="${news.image}" alt="${news.title}" class="news-image">
            <div class="news-content">
                <span class="news-category">${news.category}</span>
                <h4 class="news-title">${news.title}</h4>
                <p class="news-excerpt">${news.excerpt}</p>
                <div class="news-meta">
                    <span><i class="far fa-clock"></i> ${news.time}</span>
                    <div class="news-actions">
                        <button class="news-action-btn save-btn" data-id="${news.id}">
                            <i class="${news.saved ? "fas" : "far"} fa-bookmark"></i>
                        </button>
                        <button class="news-action-btn"><i class="fas fa-share-alt"></i></button>
                    </div>
                </div>
            </div>
        </article>
    `).join('');
}

// Renderizar análisis
function renderAnalysis() {
    analysisCards.innerHTML = analysisData.map(item => `
        <div class="analysis-card">
            <img src="${item.image}" alt="${item.title}" class="analysis-image">
            <div class="analysis-content">
                <span class="analysis-type">${item.type}</span>
                <h4 class="analysis-title">${item.title}</h4>
                <p class="analysis-excerpt">${item.excerpt}</p>
                <div class="analysis-meta">
                    <span><i class="far fa-user"></i> ${item.author}</span>
                    <span><i class="far fa-clock"></i> ${item.time}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Formatear números
function formatNumber(num) {
    if (num >= 1000) {
        return num.toLocaleString('en-US');
    }
    return num.toString();
}

// Manejar búsqueda
searchInput.addEventListener('input', function() {
    if (this.value.length > 2) {
        // Simular sugerencias (en una app real sería una API)
        const suggestions = [
            "Bitcoin",
            "S&P 500",
            "Tesla acciones",
            "Dólar blue hoy",
            "Fed tasa de interés"
        ].filter(item => 
            item.toLowerCase().includes(this.value.toLowerCase())
        );
        
        if (suggestions.length > 0) {
            searchSuggestions.innerHTML = suggestions.map(item => `
                <div class="suggestion-item">
                    <i class="suggestion-icon fas fa-search"></i>
                    <span class="suggestion-text">${item}</span>
                </div>
            `).join('');
            searchSuggestions.classList.add('show');
        } else {
            searchSuggestions.classList.remove('show');
        }
    } else {
        searchSuggestions.classList.remove('show');
    }
});

// Cerrar sugerencias al hacer clic fuera
document.addEventListener('click', function(e) {
    if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
        searchSuggestions.classList.remove('show');
    }
});

// Manejar filtro de noticias
newsFilter.addEventListener('change', function() {
    renderNews(this.value);
});

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    renderSectors();
    renderMarketData();
    renderNews();
    renderAnalysis();
    
    // Simular actualización de datos cada 30 segundos
    setInterval(() => {
        // Rotar datos de mercado (simulación)
        marketData.forEach(item => {
            const randomChange = (Math.random() * 2 - 1) * 0.5;
            item.change = randomChange;
            item.price = item.price * (1 + randomChange / 100);
        });
        renderMarketData();
    }, 30000);
});

// Manejar guardado de noticias (event delegation)
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('save-btn')) {
        const btn = e.target.closest('.save-btn');
        const newsId = parseInt(btn.dataset.id);
        const newsItem = newsData.find(item => item.id === newsId);
        
        if (newsItem) {
            newsItem.saved = !newsItem.saved;
            btn.innerHTML = `<i class="${newsItem.saved ? "fas" : "far"} fa-bookmark"></i>`;
            
            if (newsItem.saved) {
                // Animación de confirmación
                btn.style.color = "#64ffda";
                setTimeout(() => {
                    btn.style.color = "";
                }, 1000);
            }
        }
    }
});