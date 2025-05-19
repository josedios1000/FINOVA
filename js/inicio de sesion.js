// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const botonTema = document.getElementById('boton-tema');
    const bannerCookies = document.getElementById('banner-cookies');
    const aceptarCookies = document.getElementById('aceptar-cookies');
    const formularioLogin = document.getElementById('formulario-login');
    const inputContraseña = document.getElementById('contraseña');
    const botonMostrarContraseña = document.getElementById('boton-mostrar-contraseña');
    const botonEnviar = document.getElementById('boton-enviar');
    const textoBoton = document.getElementById('texto-boton');
    const cargador = document.getElementById('cargador');
    const fortalezaContraseña = document.getElementById('fortaleza-contraseña');
    const barraFortaleza = fortalezaContraseña.querySelector('.barra-fortaleza');
    const textoFortaleza = fortalezaContraseña.querySelector('.texto-fortaleza');
    const botonEmpleo = document.getElementById('boton-empleo');
    
    // 1. Tema oscuro/claro
    botonTema.addEventListener('click', () => {
        document.body.classList.toggle('modo-claro');
        const icono = botonTema.querySelector('i');
        if (document.body.classList.contains('modo-claro')) {
            icono.classList.replace('fa-moon', 'fa-sun');
        } else {
            icono.classList.replace('fa-sun', 'fa-moon');
        }
    });
    
    // 2. Banner de cookies
    if (!localStorage.getItem('cookiesAceptadas')) {
        setTimeout(() => {
            bannerCookies.classList.add('mostrar');
        }, 2000);
    }
    
    aceptarCookies.addEventListener('click', () => {
        bannerCookies.classList.remove('mostrar');
        localStorage.setItem('cookiesAceptadas', 'true');
    });
    
    // 3. Mostrar/ocultar contraseña
    botonMostrarContraseña.addEventListener('click', function() {
        const tipo = inputContraseña.getAttribute('type') === 'password' ? 'text' : 'password';
        inputContraseña.setAttribute('type', tipo);
        this.classList.toggle('fa-eye-slash');
    });
    
    // 4. Validación de contraseña en tiempo real
    inputContraseña.addEventListener('input', function() {
        const contraseña = this.value;
        let fortaleza = 0;
        
        // Validar fortaleza
        if (contraseña.length >= 8) fortaleza += 1;
        if (contraseña.match(/[a-z]/)) fortaleza += 1;
        if (contraseña.match(/[A-Z]/)) fortaleza += 1;
        if (contraseña.match(/[0-9]/)) fortaleza += 1;
        if (contraseña.match(/[^a-zA-Z0-9]/)) fortaleza += 1;
        
        // Actualizar barra y texto
        const ancho = (fortaleza / 5) * 100;
        barraFortaleza.style.width = `${ancho}%`;
        
        // Cambiar color según fortaleza
        if (fortaleza <= 2) {
            barraFortaleza.style.backgroundColor = 'var(--error)';
            textoFortaleza.textContent = 'Seguridad: baja';
        } else if (fortaleza <= 4) {
            barraFortaleza.style.backgroundColor = 'orange';
            textoFortaleza.textContent = 'Seguridad: media';
        } else {
            barraFortaleza.style.backgroundColor = 'var(--secundario)';
            textoFortaleza.textContent = 'Seguridad: alta';
        }
    });
    
    // 5. Validación de formulario
    formularioLogin.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Mostrar cargador
        textoBoton.textContent = 'Procesando...';
        cargador.classList.add('activo');
        botonEnviar.disabled = true;
        
        // Simular envío (en producción sería una llamada AJAX)
        setTimeout(() => {
            // Ocultar cargador y restaurar botón
            cargador.classList.remove('activo');
            botonEnviar.disabled = false;
            
            // Redirigir después de la validación
            window.location.href = '../paginas/principal.html'; // Cambia a tu página de destino
        }, 2000);
    });

    // 6. Botón de empleo 
    botonEmpleo.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = '../paginas/fomulario empleo.html'; // Cambia a tu página de destino
    });
    
    // 7. Obtener datos del clima (simulado)
    setTimeout(() => {
        document.getElementById('clima').innerHTML = '<i class="fas fa-cloud-sun"></i> 22°C';
    }, 1000);
    
    // 8. Validación en tiempo real para email
    const inputCorreo = document.getElementById('correo');
    inputCorreo.addEventListener('input', function() {
        if (this.validity.valid) {
            this.style.borderColor = 'var(--secundario)';
        } else {
            this.style.borderColor = 'var(--error)';
        }
    });
    
    // 9. Efecto hover para tarjeta de empleo
    const tarjetaPromocion = document.querySelector('.tarjeta-promocion');
    tarjetaPromocion.addEventListener('mouseenter', () => {
        tarjetaPromocion.style.transform = 'translateY(-5px)';
    });
    tarjetaPromocion.addEventListener('mouseleave', () => {
        tarjetaPromocion.style.transform = 'translateY(0)';
    });
    
    // 10. Accesibilidad - Estilos de enfoque
    document.querySelectorAll('button, input, a').forEach(elemento => {
        elemento.addEventListener('focus', () => {
            elemento.style.outline = '2px solid var(--acento)';
            elemento.style.outlineOffset = '2px';
        });
        elemento.addEventListener('blur', () => {
            elemento.style.outline = 'none';
        });
    });

    // Selectores de idioma
    const botonIdioma = document.getElementById('boton-idioma');
    const menuIdioma = document.getElementById('menu-idioma');

    // Mostrar/ocultar menú de idiomas
    botonIdioma.addEventListener('click', function(e) {
        e.stopPropagation();
        menuIdioma.classList.toggle('mostrar');
        this.querySelector('i:last-child').style.transform = menuIdioma.classList.contains('mostrar') 
            ? 'rotate(180deg)' 
            : 'rotate(0)';
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function() {
        menuIdioma.classList.remove('mostrar');
        botonIdioma.querySelector('i:last-child').style.transform = 'rotate(0)';
    });

    // Cambiar idioma
    document.querySelectorAll('.menu-idioma a').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const idioma = this.getAttribute('data-lang');
            botonIdioma.querySelector('span').textContent = idioma.toUpperCase();
            
            // Aquí iría la lógica para cambiar el idioma
            alert(`Idioma cambiado a ${this.textContent}`);
            // Ejemplo: location.href = `/?lang=${idioma}`;
            
            menuIdioma.classList.remove('mostrar');
        });
    });

    // Prevenir que el menú se cierre al hacer clic en él
    menuIdioma.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});