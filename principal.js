// Clase para manejar la funcionalidad del menú móvil
class MenuMovil {
    constructor() {
        this.menuBtn = document.getElementById('menuMovil');
        this.navegacion = document.querySelector('.navegacion');
        this.enlaces = document.querySelectorAll('.navegacion a');
        
        this.iniciarEventos();
    }
    
    iniciarEventos() {
        this.menuBtn.addEventListener('click', () => this.toggleMenu());
        
        // Cerrar menú al hacer clic en un enlace
        this.enlaces.forEach(enlace => {
            enlace.addEventListener('click', () => {
                if(this.navegacion.classList.contains('mostrar')) {
                    this.navegacion.classList.remove('mostrar');
                }
            });
        });
    }
    
    toggleMenu() {
        this.navegacion.classList.toggle('mostrar');
    }
}

// Clase para manejar el formulario del boletín
class FormularioBoletin {
    constructor() {
        this.formulario = document.getElementById('formularioBoletin');
        
        if(this.formulario) {
            this.iniciarEventos();
        }
    }
    
    iniciarEventos() {
        this.formulario.addEventListener('submit', (e) => this.enviarFormulario(e));
    }
    
    enviarFormulario(e) {
        e.preventDefault();
        const email = this.formulario.querySelector('input[type="email"]').value;
        
        // Aquí iría la lógica para enviar el email a tu backend
        console.log(`Email suscrito: ${email}`);
        
        // Mostrar mensaje de éxito
        alert('¡Gracias por suscribirte a nuestro boletín!');
        this.formulario.reset();
    }
}

// Clase para el slider de testimonios
class TestimonioSlider {
    constructor() {
        this.testimonios = document.querySelectorAll('.testimonio');
        this.indiceActual = 0;
        
        if(this.testimonios.length > 0) {
            this.iniciarSlider();
        }
    }
    
    iniciarSlider() {
        // Mostrar primer testimonio
        this.mostrarTestimonio(this.indiceActual);
        
        // Cambiar testimonio cada 5 segundos
        setInterval(() => this.siguienteTestimonio(), 5000);
    }
    
    mostrarTestimonio(indice) {
        // Ocultar todos los testimonios
        this.testimonios.forEach(testimonio => {
            testimonio.style.display = 'none';
        });
        
        // Mostrar testimonio actual
        this.testimonios[indice].style.display = 'block';
    }
    
    siguienteTestimonio() {
        this.indiceActual = (this.indiceActual + 1) % this.testimonios.length;
        this.mostrarTestimonio(this.indiceActual);
    }
}

// Clase principal que inicializa todas las funcionalidades
class Aplicacion {
    constructor() {
        this.menuMovil = new MenuMovil();
        this.formularioBoletin = new FormularioBoletin();
        this.testimonioSlider = new TestimonioSlider();
        
        this.iniciarEventosGlobales();
    }
    
    iniciarEventosGlobales() {
        // Smooth scrolling para enlaces internos
        document.querySelectorAll('a[href^="#"]').forEach(enlace => {
            enlace.addEventListener('click', (e) => {
                e.preventDefault();
                
                const objetivo = document.querySelector(enlace.getAttribute('href'));
                if(objetivo) {
                    window.scrollTo({
                        top: objetivo.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Efecto de scroll para la cabecera
        window.addEventListener('scroll', () => {
            const cabecera = document.querySelector('.cabecera');
            if(window.scrollY > 100) {
                cabecera.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            } else {
                cabecera.style.boxShadow = 'none';
            }
        });
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new Aplicacion();
});