// Clase para manejar la lógica de los consejos financieros
class ConsejosFinancieros {
    constructor() {
        this.consejos = [
            {
                titulo: "Revisa tus gastos mensuales",
                texto: "Dedica 10 minutos hoy a revisar tus gastos del mes pasado. Identifica patrones y áreas donde puedas recortar."
            },
            {
                titulo: "Automatiza tus ahorros",
                texto: "Configura una transferencia automática a tu cuenta de ahorros para el mismo día que recibes tu salario. Empieza con un porcentaje pequeño si es necesario."
            },
            {
                titulo: "Compara antes de comprar",
                texto: "Antes de hacer una compra importante, tómate 24 horas para investigar y comparar precios. Evita las decisiones impulsivas."
            },
            {
                titulo: "Aprende algo nuevo",
                texto: "Dedica 15 minutos hoy a leer un artículo o ver un video sobre educación financiera. El conocimiento es la base de buenas decisiones."
            },
            {
                titulo: "Revisa tus suscripciones",
                texto: "Haz una lista de todas tus suscripciones recurrentes (streaming, gimnasio, apps) y cancela las que no uses regularmente."
            },
            {
                titulo: "Establece una meta financiera",
                texto: "Define una meta financiera específica para los próximos 3 meses (ej: ahorrar X cantidad, reducir deudas en Y). Escríbela y ponla en un lugar visible."
            },
            {
                titulo: "Planifica tus comidas",
                texto: "Dedica tiempo hoy a planificar tus comidas para la semana. Esto te ayudará a ahorrar en comida fuera de casa y reducir desperdicios."
            }
        ];
    }

    obtenerConsejoAleatorio() {
        const indice = Math.floor(Math.random() * this.consejos.length);
        return this.consejos[indice];
    }
}

// Clase para la calculadora financiera
class CalculadoraFinanciera {
    constructor() {
        this.formulario = document.getElementById('formCalculadora');
        this.resultado = document.getElementById('resultado-calculadora');
    }

    inicializar() {
        this.formulario.addEventListener('submit', (e) => {
            e.preventDefault();
            this.calcularInteresCompuesto();
        });
    }

    calcularInteresCompuesto() {
        const inversionInicial = parseFloat(document.getElementById('inversion-inicial').value) || 0;
        const aportacionMensual = parseFloat(document.getElementById('aportacion-mensual').value) || 0;
        const tasaInteresAnual = parseFloat(document.getElementById('tasa-interes').value) || 0;
        const anos = parseInt(document.getElementById('anos').value) || 0;
        
        const tasaInteresMensual = tasaInteresAnual / 100 / 12;
        const meses = anos * 12;
        
        let montoTotal = inversionInicial;
        
        for (let i = 0; i < meses; i++) {
            montoTotal = (montoTotal + aportacionMensual) * (1 + tasaInteresMensual);
        }
        
        const aportacionesTotales = inversionInicial + (aportacionMensual * meses);
        const interesesGanados = montoTotal - aportacionesTotales;
        
        this.mostrarResultado(montoTotal, aportacionesTotales, interesesGanados);
    }

    mostrarResultado(montoTotal, aportacionesTotales, interesesGanados) {
        this.resultado.style.display = 'block';
        this.resultado.innerHTML = `
            <h4>Resultado:</h4>
            <p><strong>Monto Final:</strong> $${montoTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
            <p><strong>Aportaciones Totales:</strong> $${aportacionesTotales.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
            <p><strong>Intereses Ganados:</strong> $${interesesGanados.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
        `;
    }
}

// Clase para manejar el acordeón
class Acordeon {
    constructor() {
        this.items = document.querySelectorAll('.acordeon-item');
    }

    inicializar() {
        this.items.forEach(item => {
            const titulo = item.querySelector('.acordeon-titulo');
            titulo.addEventListener('click', () => this.toggleAcordeon(item));
        });
    }

    toggleAcordeon(item) {
        const estaActivo = item.classList.contains('activo');
        
        // Cerrar todos los acordeones primero
        this.items.forEach(i => {
            i.classList.remove('activo');
            const contenido = i.querySelector('.acordeon-contenido');
            contenido.style.maxHeight = null;
            const titulo = i.querySelector('.acordeon-titulo');
            titulo.classList.remove('activo');
        });
        
        // Abrir el acordeón clickeado si no estaba activo
        if (!estaActivo) {
            item.classList.add('activo');
            const contenido = item.querySelector('.acordeon-contenido');
            contenido.style.maxHeight = contenido.scrollHeight + 'px';
            const titulo = item.querySelector('.acordeon-titulo');
            titulo.classList.add('activo');
        }
    }
}

// Clase para el formulario de contacto
class FormularioContacto {
    constructor() {
        this.formulario = document.getElementById('formularioContacto');
    }

    inicializar() {
        this.formulario.addEventListener('submit', (e) => {
            e.preventDefault();
            this.enviarFormulario();
        });
    }

    enviarFormulario() {
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        
        // Aquí normalmente harías una petición AJAX o conectarías con un backend
        // Para este ejemplo, solo mostraremos un mensaje
        alert(`Gracias ${nombre}, tu mensaje ha sido enviado. Te responderemos a ${email} pronto.`);
        
        this.formulario.reset();
    }
}

// Clase para el menú móvil
class MenuMovil {
    constructor() {
        this.boton = document.getElementById('menuMovil');
        this.navegacion = document.querySelector('.navegacion');
    }

    inicializar() {
        this.boton.addEventListener('click', () => this.toggleMenu());
    }

    toggleMenu() {
        this.navegacion.classList.toggle('activo');
        this.boton.innerHTML = this.navegacion.classList.contains('activo') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    }
}

// Clase para la navegación suave
class NavegacionSuave {
    constructor() {
        this.enlaces = document.querySelectorAll('.navegacion a[href^="#"]');
    }

    inicializar() {
        this.enlaces.forEach(enlace => {
            enlace.addEventListener('click', (e) => {
                e.preventDefault();
                const seccion = document.querySelector(enlace.getAttribute('href'));
                const posicion = seccion.offsetTop - 80; // Ajuste para la cabecera fija
                
                window.scrollTo({
                    top: posicion,
                    behavior: 'smooth'
                });
                
                // Cerrar menú móvil si está abierto
                const menu = document.querySelector('.navegacion');
                if (menu.classList.contains('activo')) {
                    menu.classList.remove('activo');
                    document.getElementById('menuMovil').innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });
    }
}

// Clase principal que inicializa toda la aplicación
class App {
    constructor() {
        this.consejosFinancieros = new ConsejosFinancieros();
        this.calculadoraFinanciera = new CalculadoraFinanciera();
        this.acordeon = new Acordeon();
        this.formularioContacto = new FormularioContacto();
        this.menuMovil = new MenuMovil();
        this.navegacionSuave = new NavegacionSuave();
    }

    inicializar() {
        // Mostrar consejo del día
        this.mostrarConsejoDelDia();
        
        // Mostrar fecha actual
        this.mostrarFechaActual();
        
        // Inicializar componentes
        this.calculadoraFinanciera.inicializar();
        this.acordeon.inicializar();
        this.formularioContacto.inicializar();
        this.menuMovil.inicializar();
        this.navegacionSuave.inicializar();
        
        // Añadir clase activa al hacer scroll
        window.addEventListener('scroll', () => this.resaltarSeccionActiva());
    }

    mostrarConsejoDelDia() {
        const consejo = this.consejosFinancieros.obtenerConsejoAleatorio();
        document.getElementById('consejo-titulo').textContent = consejo.titulo;
        document.getElementById('consejo-texto').textContent = consejo.texto;
    }

    mostrarFechaActual() {
        const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const fecha = new Date().toLocaleDateString('es-ES', opciones);
        document.getElementById('fecha-hoy').textContent = fecha;
    }

    resaltarSeccionActiva() {
        const secciones = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;
        
        secciones.forEach(seccion => {
            const seccionTop = seccion.offsetTop;
            const seccionHeight = seccion.offsetHeight;
            
            if (scrollPos >= seccionTop && scrollPos < (seccionTop + seccionHeight)) {
                const id = seccion.getAttribute('id');
                document.querySelectorAll('.navegacion a').forEach(enlace => {
                    enlace.classList.remove('activo');
                    if (enlace.getAttribute('href') === `#${id}`) {
                        enlace.classList.add('activo');
                    }
                });
            }
        });
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.inicializar();
});