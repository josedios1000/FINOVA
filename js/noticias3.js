// Gestor de Noticias
class NewsManager {
    constructor() {
        this.news = [
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
            // ... (resto de las noticias del array newsData)
        ];
        
        this.currentFilter = "all";
        this.currentPage = 1;
        this.newsPerPage = 6;
        
        this.init();
    }
    
    init() {
        this.renderNews();
        this.setupEventListeners();
    }
    
    renderNews() {
        let filteredNews = this.news;
        
        if (this.currentFilter !== "all") {
            filteredNews = this.news.filter(item => 
                item.category.toLowerCase().includes(this.currentFilter.toLowerCase())
            );
        }
        
        // Paginación
        const startIndex = (this.currentPage - 1) * this.newsPerPage;
        const paginatedNews = filteredNews.slice(startIndex, startIndex + this.newsPerPage);
        
        const newsGrid = document.getElementById('news-grid');
        if (newsGrid) {
            newsGrid.innerHTML = paginatedNews.map(item => this.generateNewsCard(item)).join('');
        }
        
        // Actualizar indicador de página
        const pageIndicator = document.getElementById('current-page');
        if (pageIndicator) {
            pageIndicator.textContent = this.currentPage;
        }
    }
    
    generateNewsCard(newsItem) {
        return `
            <article class="news-card" data-id="${newsItem.id}">
                <img src="${newsItem.image}" alt="${newsItem.title}" class="news-image">
                <div class="news-content">
                    <span class="news-category">${newsItem.category}</span>
                    <h4 class="news-title">${newsItem.title}</h4>
                    <p class="news-excerpt">${newsItem.excerpt}</p>
                    <div class="news-meta">
                        <span><i class="far fa-clock"></i> ${newsItem.time}</span>
                        <div class="news-actions">
                            <button class="news-action-btn save-btn" data-id="${newsItem.id}">
                                <i class="${newsItem.saved ? "fas" : "far"} fa-bookmark"></i>
                            </button>
                            <button class="news-action-btn"><i class="fas fa-share-alt"></i></button>
                        </div>
                    </div>
                </div>
            </article>
        `;
    }
    
    setupEventListeners() {
        // Filtrado
        const newsFilter = document.getElementById('news-filter');
        if (newsFilter) {
            newsFilter.addEventListener('change', (e) => {
                this.currentFilter = e.target.value;
                this.currentPage = 1;
                this.renderNews();
            });
        }
        
        // Paginación
        const btnPrev = document.querySelector('.btn-prev');
        const btnNext = document.querySelector('.btn-next');
        
        if (btnPrev) {
            btnPrev.addEventListener('click', () => {
                if (this.currentPage > 1) {
                    this.currentPage--;
                    this.renderNews();
                }
            });
        }
        
        if (btnNext) {
            btnNext.addEventListener('click', () => {
                const filteredNews = this.currentFilter === "all" 
                    ? this.news 
                    : this.news.filter(item => 
                        item.category.toLowerCase().includes(this.currentFilter.toLowerCase())
                    );
                
                if (this.currentPage < Math.ceil(filteredNews.length / this.newsPerPage)) {
                    this.currentPage++;
                    this.renderNews();
                }
            });
        }
        
        // Guardar noticias (event delegation)
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('save-btn') || e.target.closest('.save-btn')) {
                const btn = e.target.classList.contains('save-btn') 
                    ? e.target 
                    : e.target.closest('.save-btn');
                const newsId = parseInt(btn.dataset.id);
                this.toggleSaveNews(newsId, btn);
            }
        });
    }
    
    toggleSaveNews(newsId, btn) {
        const newsItem = this.news.find(item => item.id === newsId);
        
        if (newsItem) {
            newsItem.saved = !newsItem.saved;
            
            if (btn) {
                const icon = btn.querySelector('i');
                if (icon) {
                    icon.className = newsItem.saved ? "fas fa-bookmark" : "far fa-bookmark";
                }
                
                // Animación de confirmación
                if (newsItem.saved) {
                    btn.style.color = "#64ffda";
                    setTimeout(() => {
                        btn.style.color = "";
                    }, 1000);
                }
            }
        }
    }
    
    // En una app real, estos métodos se conectarían a una API
    fetchNews() {
        // Lógica para obtener noticias de una API
    }
    
    saveNewsToLocal(newsId) {
        // Lógica para guardar en localStorage
    }
}

// Iniciar gestor de noticias
const newsManager = new NewsManager();