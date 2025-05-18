document.addEventListener('DOMContentLoaded', function() {
    const cambiarIdiomaBtn = document.getElementById('cambiar-idioma');
    let idiomaActual = 'es';
    
    // Textos en español
    const textosES = {
        // Header
        tituloPrincipal: "Simuladores Financieros",
        textoIntro: "Explora nuestros simuladores financieros y toma el control de tu futuro económico. Cada herramienta está diseñada para ayudarte a comprender y planificar diferentes aspectos de tus finanzas personales.",
        textoIdioma: "English",
        
        // Simuladores
        tituloSimulador1: "Simulador de Ahorros",
        descripcionSimulador1: "Calcula cuánto puedes ahorrar en un período determinado considerando diferentes tasas de interés. Ideal para planificar metas financieras a corto y largo plazo.",
        textoBoton1: "Probar Simulador",
        
        tituloSimulador2: "Simulador de Préstamos",
        descripcionSimulador2: "Compara diferentes opciones de préstamos, calcula cuotas mensuales y el costo total del crédito. Toma decisiones informadas antes de endeudarte.",
        textoBoton2: "Probar Simulador",
        
        tituloSimulador3: "Simulador de Hipotecas",
        descripcionSimulador3: "Planifica la compra de tu vivienda calculando pagos mensuales, plazo del préstamo y costo total. Evalúa diferentes escenarios para tu hipoteca.",
        textoBoton3: "Probar Simulador",
        
        tituloSimulador4: "Simulador de Jubilación",
        descripcionSimulador4: "Proyecta cuánto necesitarás para tu jubilación y si tus ahorros actuales son suficientes. Ajusta contribuciones y rendimientos esperados.",
        textoBoton4: "Probar Simulador",
        
        tituloSimulador5: "Simulador de Educación",
        descripcionSimulador5: "Calcula el costo de la educación universitaria y planifica cómo financiarla. Compara opciones de ahorro y préstamos estudiantiles.",
        textoBoton5: "Probar Simulador",
        
        tituloSimulador6: "Simulador de Inversiones",
        descripcionSimulador6: "Proyecta el crecimiento de tus inversiones bajo diferentes escenarios de riesgo y rendimiento. Entiende el poder del interés compuesto.",
        textoBoton6: "Probar Simulador",
        
        // Footer
        footerLogo: "FINOVA",
        footerDescription: "Plataforma líder en información financiera y análisis de mercados.",
        
        // Mercados
        footerMercados: "Mercados",
        footerAcciones: "Acciones",
        footerBonos: "Bonos",
        footerDivisas: "Divisas",
        footerMateriasPrimas: "Materias Primas",
        footerCriptomonedas: "Criptomonedas",
        
        // Herramientas
        footerHerramientas: "Herramientas",
        footerCalculadoras: "Calculadoras",
        footerGraficos: "Gráficos",
        footerCalendario: "Calendario Económico",
        footerScreener: "Screener",
        footerPortafolio: "Portafolio",
        
        // Empresa
        footerEmpresa: "Empresa",
        footerNosotros: "Sobre Nosotros",
        footerEquipo: "Equipo",
        footerContacto: "Contacto",
        footerTrabajo: "Trabaja con Nosotros",
        footerTransparencia: "Transparencia",
        
        // Legal
        footerTerminos: "Términos de Uso",
        footerPrivacidad: "Política de Privacidad",
        footerCookies: "Cookies",
        footerDescargo: "Descargo de Responsabilidad",
        footerCopyright: `© ${new Date().getFullYear()} FINOVA. Todos los derechos reservados.`
    };

    // Textos en inglés
    const textosEN = {
        // Header
        tituloPrincipal: "Financial Simulators",
        textoIntro: "Explore our financial simulators and take control of your economic future. Each tool is designed to help you understand and plan different aspects of your personal finances.",
        textoIdioma: "Español",
        
        // Simuladores
        tituloSimulador1: "Savings Simulator",
        descripcionSimulador1: "Calculate how much you can save over a given period considering different interest rates. Ideal for planning short and long-term financial goals.",
        textoBoton1: "Try Simulator",
        
        tituloSimulador2: "Loan Simulator",
        descripcionSimulador2: "Compare different loan options, calculate monthly payments and total credit cost. Make informed decisions before getting into debt.",
        textoBoton2: "Try Simulator",
        
        tituloSimulador3: "Mortgage Simulator",
        descripcionSimulador3: "Plan your home purchase by calculating monthly payments, loan term and total cost. Evaluate different scenarios for your mortgage.",
        textoBoton3: "Try Simulator",
        
        tituloSimulador4: "Retirement Simulator",
        descripcionSimulador4: "Project how much you'll need for retirement and whether your current savings are enough. Adjust contributions and expected returns.",
        textoBoton4: "Try Simulator",
        
        tituloSimulador5: "Education Simulator",
        descripcionSimulador5: "Calculate the cost of university education and plan how to finance it. Compare savings options and student loans.",
        textoBoton5: "Try Simulator",
        
        tituloSimulador6: "Investment Simulator",
        descripcionSimulador6: "Project the growth of your investments under different risk and return scenarios. Understand the power of compound interest.",
        textoBoton6: "Try Simulator",
        
        // Footer
        footerLogo: "FINOVA",
        footerDescription: "Leading platform in financial information and market analysis.",
        
        // Mercados
        footerMercados: "Markets",
        footerAcciones: "Stocks",
        footerBonos: "Bonds",
        footerDivisas: "Currencies",
        footerMateriasPrimas: "Commodities",
        footerCriptomonedas: "Cryptocurrencies",
        
        // Herramientas
        footerHerramientas: "Tools",
        footerCalculadoras: "Calculators",
        footerGraficos: "Charts",
        footerCalendario: "Economic Calendar",
        footerScreener: "Screener",
        footerPortafolio: "Portfolio",
        
        // Empresa
        footerEmpresa: "Company",
        footerNosotros: "About Us",
        footerEquipo: "Team",
        footerContacto: "Contact",
        footerTrabajo: "Careers",
        footerTransparencia: "Transparency",
        
        // Legal
        footerTerminos: "Terms of Use",
        footerPrivacidad: "Privacy Policy",
        footerCookies: "Cookies",
        footerDescargo: "Disclaimer",
        footerCopyright: `© ${new Date().getFullYear()} FINOVA. All rights reserved.`
    };

    function cambiarIdioma() {
        const textos = idiomaActual === 'es' ? textosEN : textosES;
        
        // Header
        document.getElementById('titulo-principal').textContent = textos.tituloPrincipal;
        document.getElementById('texto-intro').textContent = textos.textoIntro;
        document.getElementById('texto-idioma').textContent = textos.textoIdioma;
        
        // Simuladores
        for (let i = 1; i <= 6; i++) {
            document.getElementById(`titulo-simulador-${i}`).textContent = textos[`tituloSimulador${i}`];
            document.getElementById(`descripcion-simulador-${i}`).textContent = textos[`descripcionSimulador${i}`];
            document.getElementById(`texto-boton-${i}`).textContent = textos[`textoBoton${i}`];
        }
        
        // Footer
        document.getElementById('footer-logo').textContent = textos.footerLogo;
        document.getElementById('footer-description').textContent = textos.footerDescription;
        
        // Secciones del footer
        document.getElementById('footer-mercados').textContent = textos.footerMercados;
        document.getElementById('footer-herramientas').textContent = textos.footerHerramientas;
        document.getElementById('footer-empresa').textContent = textos.footerEmpresa;
        
        // Enlaces de Mercados
        document.getElementById('footer-acciones').textContent = textos.footerAcciones;
        document.getElementById('footer-bonos').textContent = textos.footerBonos;
        document.getElementById('footer-divisas').textContent = textos.footerDivisas;
        document.getElementById('footer-materias-primas').textContent = textos.footerMateriasPrimas;
        document.getElementById('footer-criptomonedas').textContent = textos.footerCriptomonedas;
        
        // Enlaces de Herramientas
        document.getElementById('footer-calculadoras').textContent = textos.footerCalculadoras;
        document.getElementById('footer-graficos').textContent = textos.footerGraficos;
        document.getElementById('footer-calendario').textContent = textos.footerCalendario;
        document.getElementById('footer-screener').textContent = textos.footerScreener;
        document.getElementById('footer-portafolio').textContent = textos.footerPortafolio;
        
        // Enlaces de Empresa
        document.getElementById('footer-nosotros').textContent = textos.footerNosotros;
        document.getElementById('footer-equipo').textContent = textos.footerEquipo;
        document.getElementById('footer-contacto').textContent = textos.footerContacto;
        document.getElementById('footer-trabajo').textContent = textos.footerTrabajo;
        document.getElementById('footer-transparencia').textContent = textos.footerTransparencia;
        
        // Legal
        document.getElementById('footer-terminos').textContent = textos.footerTerminos;
        document.getElementById('footer-privacidad').textContent = textos.footerPrivacidad;
        document.getElementById('footer-cookies').textContent = textos.footerCookies;
        document.getElementById('footer-descargo').textContent = textos.footerDescargo;
        document.getElementById('footer-copyright').textContent = textos.footerCopyright;
        
        // Cambiar el idioma actual
        idiomaActual = idiomaActual === 'es' ? 'en' : 'es';
        localStorage.setItem('preferenciaIdioma', idiomaActual);
    }

    function cargarIdiomaPorDefecto() {
        const preferenciaGuardada = localStorage.getItem('preferenciaIdioma');
        if (preferenciaGuardada === 'en') {
            cambiarIdioma();
        } else if (!preferenciaGuardada) {
            const idiomaNavegador = navigator.language || navigator.userLanguage;
            if (idiomaNavegador.startsWith('en')) {
                cambiarIdioma();
            }
        }
    }

    cambiarIdiomaBtn.addEventListener('click', cambiarIdioma);
    cambiarIdiomaBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            cambiarIdioma();
        }
    });

    cargarIdiomaPorDefecto();
});