document.addEventListener("DOMContentLoaded", () => {
    // Elementos del DOM
    const botonIdioma = document.getElementById("cambiar-idioma");
    const notificacion = document.createElement("div");
    notificacion.id = "notificacion";
    notificacion.style.display = "none";
    document.body.appendChild(notificacion);
    
    // Variables para la animación de texto
    let animacionTextoTimeout = null;
    const temasFinancieros = {
        es: ['Inversiones', 'Ahorro Inteligente', 'Presupuestos', 'Planificación Financiera', 'Retiro Seguro'],
        en: ['Investments', 'Smart Saving', 'Budgets', 'Financial Planning', 'Secure Retirement']
    };
    
    // Mostrar notificación
    function mostrarNotificacion(mensaje) {
        notificacion.textContent = mensaje;
        notificacion.style.display = "block";
        notificacion.style.opacity = "1";
        setTimeout(() => {
            notificacion.style.opacity = "0";
            setTimeout(() => {
                notificacion.style.display = "none";
            }, 500);
        }, 2000);
    }
    
    // Reiniciar animación de texto
    function reiniciarAnimacionTexto(temas) {
        const textoDinamico = document.querySelector('.texto-dinamico');
        if (!textoDinamico) return;

        // Detener animación actual
        if (animacionTextoTimeout) {
            clearTimeout(animacionTextoTimeout);
        }

        let indiceTema = 0;
        let indiceCaracter = 0;
        let estaBorrando = false;
        
        function escribir() {
            const temaActual = temas[indiceTema];
            
            if (estaBorrando) {
                textoDinamico.textContent = temaActual.substring(0, indiceCaracter - 1);
                indiceCaracter--;
            } else {
                textoDinamico.textContent = temaActual.substring(0, indiceCaracter + 1);
                indiceCaracter++;
            }
            
            if (!estaBorrando && indiceCaracter === temaActual.length) {
                estaBorrando = true;
                animacionTextoTimeout = setTimeout(escribir, 1500);
            } else if (estaBorrando && indiceCaracter === 0) {
                estaBorrando = false;
                indiceTema = (indiceTema + 1) % temas.length;
                animacionTextoTimeout = setTimeout(escribir, 500);
            } else {
                animacionTextoTimeout = setTimeout(escribir, estaBorrando ? 50 : 100);
            }
        }

        // Iniciar nueva animación
        textoDinamico.textContent = '';
        escribir();
    }

    // Actualizar textos de recursos
    function actualizarTextosRecursos(idioma) {
        const textosRecursos = {
            es: {
                verLibro: "Ver libro",
                descargar: "Descargar",
                gratis: "GRATIS",
                recomendado: "Recomendado",
                nuevo: "Nuevo",
                ahorro: "Ahorro",
                inversion: "Inversión",
                presupuesto: "Presupuesto",
                emprendimiento: "Emprendimiento",
                psicologia: "Psicología Financiera",
                jubilacion: "Jubilación",
                economia: "Economía"
            },
            en: {
                verLibro: "View book",
                descargar: "Download",
                gratis: "FREE",
                recomendado: "Recommended",
                nuevo: "New",
                ahorro: "Saving",
                inversion: "Investment",
                presupuesto: "Budget",
                emprendimiento: "Entrepreneurship",
                psicologia: "Financial Psychology",
                jubilacion: "Retirement",
                economia: "Economy"
            }
        };

        // Actualizar botones de acción
        document.querySelectorAll('.recurso-acciones a').forEach(enlace => {
            const esVerLibro = enlace.textContent.includes("Ver libro") || enlace.textContent.includes("View book");
            const esDescargar = enlace.textContent.includes("Descargar") || enlace.textContent.includes("Download");
            
            if (esVerLibro) enlace.textContent = textosRecursos[idioma].verLibro;
            if (esDescargar) enlace.textContent = textosRecursos[idioma].descargar;
        });

        // Actualizar badges
        document.querySelectorAll('.recurso-badge').forEach(badge => {
            const tipo = badge.getAttribute('data-badge');
            if (tipo === 'recomendado') badge.textContent = textosRecursos[idioma].recomendado;
            if (tipo === 'gratis') badge.textContent = textosRecursos[idioma].gratis;
            if (tipo === 'nuevo') badge.textContent = textosRecursos[idioma].nuevo;
        });

        // Actualizar precios gratis
        document.querySelectorAll('.recurso-gratis').forEach(elemento => {
            elemento.textContent = textosRecursos[idioma].gratis;
        });

        // Actualizar categorías
        document.querySelectorAll('.recurso-categoria').forEach(categoria => {
            const textoOriginal = categoria.textContent;
            for (const key in textosRecursos.es) {
                if (textosRecursos.es[key] === textoOriginal || textosRecursos.en[key] === textoOriginal) {
                    categoria.textContent = textosRecursos[idioma][key];
                    break;
                }
            }
        });
    }

    // Actualizar idioma de la página
    function actualizarIdioma(idioma) {
        // Aplicar transición de fade
        document.querySelectorAll("[data-es], [data-es-ph], [data-es-value]").forEach(elemento => {
            elemento.classList.add("fade");
            setTimeout(() => {
                elemento.classList.remove("fade");
            }, 500);
        });

        // Actualizar textos normales
        document.querySelectorAll("[data-es]").forEach(elemento => {
            if (!elemento.classList.contains('texto-dinamico')) {
                elemento.textContent = elemento.getAttribute(`data-${idioma}`);
            }
        });

        // Actualizar placeholders
        document.querySelectorAll("[data-es-ph]").forEach(input => {
            input.placeholder = input.getAttribute(`data-${idioma}-ph`);
        });

        // Actualizar values de inputs
        document.querySelectorAll("[data-es-value]").forEach(input => {
            input.value = input.getAttribute(`data-${idioma}-value`);
        });

        // Actualizar botón de idioma
        botonIdioma.innerHTML = idioma === "es" 
            ? '<img src="Es.webp" alt="ES" class="bandera"> / <img src="En.webp" alt="EN" class="bandera">'
            : '<img src="En.webp" alt="EN" class="bandera"> / <img src="Es.webp" alt="ES" class="bandera">';

        // Actualizar textos en recursos
        actualizarTextosRecursos(idioma);

        // Reiniciar animación de texto con el nuevo idioma
        reiniciarAnimacionTexto(temasFinancieros[idioma]);
    }
    
    // Cambiar idioma
    function cambiarIdioma() {
        let idiomaActual = localStorage.getItem("idioma") || "es";
        let nuevoIdioma = idiomaActual === "es" ? "en" : "es";
        
        // Actualizar todo el contenido
        actualizarIdioma(nuevoIdioma);
        localStorage.setItem("idioma", nuevoIdioma);
        
        mostrarNotificacion(nuevoIdioma === "es" ? "Idioma cambiado a Español" : "Language changed to English");
    }
    
    // Event listeners
    botonIdioma.addEventListener("click", cambiarIdioma);
    
    // Cargar idioma guardado al inicio
    let idiomaGuardado = localStorage.getItem("idioma") || "es";
    actualizarIdioma(idiomaGuardado);

    // Menú móvil
    const botonMenu = document.getElementById('boton-menu');
    const barraLateral = document.getElementById('barra-lateral');

    botonMenu.addEventListener('click', () => {
        barraLateral.classList.toggle('activo');
        botonMenu.innerHTML = barraLateral.classList.contains('activo') ? 
            '<span class="material-symbols-outlined">close</span>' : 
            '<span class="material-symbols-outlined">menu</span>';
    });

    // Pantalla de carga
    setTimeout(() => {
        document.getElementById('pantalla-carga').style.display = 'none';
        document.getElementById('contenido-principal').classList.remove('oculto');
    }, 5000);

    // Actualizar año del copyright
    document.getElementById('ano').textContent = new Date().getFullYear();

    // Scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (barraLateral.classList.contains('activo')) {
                barraLateral.classList.remove('activo');
                botonMenu.innerHTML = '<span class="material-symbols-outlined">menu</span>';
            }
            
            const idObjetivo = this.getAttribute('href');
            if (idObjetivo === '#') return;
            
            const elementoObjetivo = document.querySelector(idObjetivo);
            if (elementoObjetivo) {
                elementoObjetivo.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Efecto de aparición al hacer scroll
    const opcionesObservador = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observador = new IntersectionObserver((entradas, observador) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visible');
                observador.unobserve(entrada.target);
            }
        });
    }, opcionesObservador);

    document.querySelectorAll('.seccion-revelada').forEach(seccion => {
        observador.observe(seccion);
    });

    // Base de datos de recursos
    const recursos = [
        {
            id: 1,
            titulo: "Padre Rico, Padre Pobre",
            autor: "Robert Kiyosaki",
            descripcion: "El libro de finanzas personales más vendido que desafía las creencias tradicionales sobre el dinero.",
            categoria: "inversion",
            tipo: "libro",
            formato: "Físico y eBook",
            precio: 19.99,
            gratis: false,
            enlace: "#",
            imagen: "https://m.media-amazon.com/images/I/51wTLf4JTDL._SY425_.jpg",
            recomendado: true
        },
        // ... (el resto de los recursos permanecen igual)
    ];

    // Cargar recursos destacados
    cargarRecursosDestacados();
    
    // Configurar filtros
    configurarFiltros();
    
    // Configurar buscador
    configurarBuscador();
    
    // Configurar categorías
    configurarCategorias();
    
    // Configurar botones "Ver más"
    configurarVerMas();
});

// Función para cargar recursos destacados
function cargarRecursosDestacados() {
    const destacados = recursos.filter(recurso => recurso.recomendado);
    const recursosGrid = document.querySelector('#destacados .recursos-grid');
    recursosGrid.innerHTML = '';
    
    if (destacados.length === 0) {
        recursosGrid.innerHTML = '<p class="no-resultados">No hay recursos destacados en este momento.</p>';
        return;
    }
    
    // Mostrar solo 4 destacados
    const mostrarDestacados = destacados.slice(0, 4);
    
    mostrarDestacados.forEach(recurso => {
        const recursoCard = crearTarjetaRecurso(recurso);
        recursosGrid.appendChild(recursoCard);
    });
}

// Función para crear una tarjeta de recurso
function crearTarjetaRecurso(recurso) {
    const recursoCard = document.createElement('div');
    recursoCard.className = 'recurso-card';
    
    let badge = '';
    if (recurso.recomendado) {
        badge = `<span class="recurso-badge" data-badge="recomendado">Recomendado</span>`;
    } else if (recurso.gratis) {
        badge = `<span class="recurso-badge" data-badge="gratis">Gratis</span>`;
    }
    
    const idioma = localStorage.getItem("idioma") || "es";
    const textosRecursos = {
        es: {
            verLibro: "Ver libro",
            descargar: "Descargar",
            gratis: "GRATIS"
        },
        en: {
            verLibro: "View book",
            descargar: "Download",
            gratis: "FREE"
        }
    };
    
    let precio = recurso.gratis 
        ? `<span class="recurso-gratis">${textosRecursos[idioma].gratis}</span>` 
        : `<span class="recurso-precio">$${recurso.precio.toFixed(2)}</span>`;
    
    let accion = recurso.tipo === 'libro' ? textosRecursos[idioma].verLibro : textosRecursos[idioma].descargar;
    
    recursoCard.innerHTML = `
        <div class="recurso-img">
            ${badge}
            <img src="${recurso.imagen}" alt="${recurso.titulo}">
        </div>
        <div class="recurso-content">
            <span class="recurso-categoria">${recurso.categoria}</span>
            <h3>${recurso.titulo}</h3>
            <p class="recurso-autor">${recurso.autor}</p>
            <p>${recurso.descripcion}</p>
            <div class="recurso-acciones">
                ${precio}
                <a href="${recurso.enlace}">${accion}</a>
            </div>
        </div>
    `;
    
    return recursoCard;
}

// Función para configurar filtros
function configurarFiltros() {
    const filtros = document.querySelectorAll('.filtro-btn');
    filtros.forEach(filtro => {
        filtro.addEventListener('click', function() {
            // Remover clase active de todos los filtros
            filtros.forEach(f => f.classList.remove('active'));
            // Agregar clase active al filtro seleccionado
            this.classList.add('active');
            
            const categoria = this.dataset.categoria;
            filtrarRecursos(categoria);
        });
    });
}

// Función para filtrar recursos
function filtrarRecursos(categoria) {
    if (categoria === 'todos') {
        cargarRecursosDestacados();
        return;
    }
    
    const recursosFiltrados = recursos.filter(recurso => {
        if (categoria === 'libros') return recurso.tipo === 'libro';
        if (categoria === 'ebooks') return recurso.tipo === 'ebook';
        if (categoria === 'gratis') return recurso.gratis;
        if (categoria === 'recomendados') return recurso.recomendado;
        return recurso.categoria === categoria;
    });
    
    mostrarRecursosFiltrados(recursosFiltrados);
}

// Función para mostrar recursos filtrados
function mostrarRecursosFiltrados(recursosFiltrados) {
    const recursosGrid = document.querySelector('#destacados .recursos-grid');
    recursosGrid.innerHTML = '';
    
    if (recursosFiltrados.length === 0) {
        const idioma = localStorage.getItem("idioma") || "es";
        const mensaje = idioma === "es" 
            ? "No se encontraron recursos. Intenta con otros filtros." 
            : "No resources found. Try other filters.";
        recursosGrid.innerHTML = `<p class="no-resultados">${mensaje}</p>`;
        return;
    }
    
    recursosFiltrados.forEach(recurso => {
        const recursoCard = crearTarjetaRecurso(recurso);
        recursosGrid.appendChild(recursoCard);
    });
    
    // Actualizar título
    const idioma = localStorage.getItem("idioma") || "es";
    if (recursosFiltrados.length > 1) {
        document.querySelector('#destacados h2').textContent = idioma === "es" 
            ? `${recursosFiltrados.length} Recursos Encontrados` 
            : `${recursosFiltrados.length} Resources Found`;
    } else {
        document.querySelector('#destacados h2').textContent = idioma === "es" 
            ? "1 Recurso Encontrado" 
            : "1 Resource Found";
    }
}

// Función para configurar buscador
function configurarBuscador() {
    const searchBtn = document.getElementById('search-btn');
    searchBtn.addEventListener('click', buscarRecursos);
    
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            buscarRecursos();
        }
    });
}

// Función para buscar recursos
function buscarRecursos() {
    const termino = document.getElementById('search-input').value.toLowerCase();
    
    if (!termino) {
        cargarRecursosDestacados();
        // Restablecer título
        const idioma = localStorage.getItem("idioma") || "es";
        document.querySelector('#destacados h2').textContent = idioma === "es" 
            ? "Recursos Destacados" 
            : "Featured Resources";
        return;
    }
    
    const resultados = recursos.filter(recurso => {
        return (
            recurso.titulo.toLowerCase().includes(termino) ||
            recurso.autor.toLowerCase().includes(termino) ||
            recurso.descripcion.toLowerCase().includes(termino) ||
            recurso.categoria.toLowerCase().includes(termino)
        );
    });
    
    mostrarRecursosFiltrados(resultados);
}

// Función para configurar categorías
function configurarCategorias() {
    const categorias = document.querySelectorAll('.categoria-card');
    categorias.forEach(categoria => {
        categoria.addEventListener('click', function() {
            const categoriaSeleccionada = this.dataset.categoria;
            
            // Actualizar filtro activo
            document.querySelectorAll('.filtro-btn').forEach(f => f.classList.remove('active'));
            document.querySelector(`.filtro-btn[data-categoria="todos"]`).classList.add('active');
            
            // Filtrar recursos
            filtrarRecursos(categoriaSeleccionada);
            
            // Scroll a la sección de recursos
            document.getElementById('destacados').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Función para configurar botones "Ver más"
function configurarVerMas() {
    document.querySelectorAll('.ver-mas').forEach(boton => {
        boton.addEventListener('click', function(e) {
            e.preventDefault();
            const categoria = this.dataset.categoria;
            
            // Actualizar filtro activo
            document.querySelectorAll('.filtro-btn').forEach(f => f.classList.remove('active'));
            document.querySelector(`.filtro-btn[data-categoria="todos"]`).classList.add('active');
            
            // Filtrar recursos
            filtrarRecursos(categoria);
            
            // Scroll a la sección de recursos
            document.getElementById('destacados').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}