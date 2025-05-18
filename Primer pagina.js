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

    // Actualizar idioma de la página
    function actualizarIdioma(idioma) {
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

        // Reiniciar animación de texto con el nuevo idioma
        reiniciarAnimacionTexto(temasFinancieros[idioma]);
    }
    
    // Cambiar idioma
    function cambiarIdioma() {
        let idiomaActual = localStorage.getItem("idioma") || "es";
        let nuevoIdioma = idiomaActual === "es" ? "en" : "es";
        
        // Aplicar transición de fade
        document.querySelectorAll("[data-es], [data-es-ph], [data-es-value]").forEach(elemento => {
            elemento.classList.add("fade");
            setTimeout(() => {
                elemento.classList.remove("fade");
            }, 500);
        });

        // Actualizar todo el contenido
        actualizarIdioma(nuevoIdioma);
        localStorage.setItem("idioma", nuevoIdioma);
        
        mostrarNotificacion("Idioma cambiado a " + (nuevoIdioma === "es" ? "Español" : "Inglés"));
    }
    
    // Event listeners
    botonIdioma.addEventListener("click", cambiarIdioma);
    
    // Cargar idioma guardado al inicio
    let idiomaGuardado = localStorage.getItem("idioma") || "es";
    actualizarIdioma(idiomaGuardado);

    // Pantalla de carga
    setTimeout(() => {
        document.getElementById('pantalla-carga').style.display = 'none';
        document.getElementById('contenido-principal').classList.remove('oculto'); // Añade esta línea
    }, 5000);

    // Actualizar año del copyright
    document.getElementById('ano').textContent = new Date().getFullYear();

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

    // Modal de suscripción
    const modalSuscripcion = document.getElementById('modal-suscripcion');
    const cerrarModal = document.querySelector('.cerrar-modal');
    const formSuscripcion = document.getElementById('form-suscripcion');
    
    let suscripcionMostrada = false;
    
    function mostrarModalSuscripcion() {
        if (!suscripcionMostrada && !localStorage.getItem('suscripcionRechazada')) {
            modalSuscripcion.style.display = 'block';
            document.body.style.overflow = 'hidden';
            suscripcionMostrada = true;
        }
    }
    
    setTimeout(mostrarModalSuscripcion, 30000);
    
    window.addEventListener('scroll', function() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
            mostrarModalSuscripcion();
        }
    });
    
    cerrarModal.addEventListener('click', function() {
        modalSuscripcion.style.display = 'none';
        document.body.style.overflow = 'auto';
        localStorage.setItem('suscripcionRechazada', 'true');
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modalSuscripcion) {
            modalSuscripcion.style.display = 'none';
            document.body.style.overflow = 'auto';
            localStorage.setItem('suscripcionRechazada', 'true');
        }
    });
    
    formSuscripcion.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email-suscripcion').value;
        
        console.log('Email para suscripción:', email);
        
        mostrarNotificacion(
            localStorage.getItem('idioma') === 'es' 
            ? '¡Gracias por suscribirte!' 
            : 'Thank you for subscribing!'
        );
        
        modalSuscripcion.style.display = 'none';
        document.body.style.overflow = 'auto';
        localStorage.setItem('suscripcionAceptada', 'true');
    });
});
