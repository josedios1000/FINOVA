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
    const inputCorreo = document.getElementById('correo');
    
    // Configuración de EmailJS (reemplaza con tus credenciales)
    (function() {
        emailjs.init("TU_USER_ID_DE_EMAILJS"); // Reemplaza con tu User ID de EmailJS
    })();
    
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
    
    // 5. Validación de formulario con EmailJS
    formularioLogin.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const correo = inputCorreo.value.trim();
        const contraseña = inputContraseña.value;
        
        // Validación básica del correo
        if (!validarCorreo(correo)) {
            mostrarError(inputCorreo, 'Por favor ingresa un correo electrónico válido');
            return;
        }
        
        // Mostrar cargador
        textoBoton.textContent = 'Validando...';
        cargador.classList.add('activo');
        botonEnviar.disabled = true;
        
        // Validar correo con EmailJS
        validarCorreoConEmailJS(correo)
            .then(esValido => {
                if (esValido) {
                    // Simular envío (en producción sería una llamada AJAX)
                    setTimeout(() => {
                        // Ocultar cargador y restaurar botón
                        cargador.classList.remove('activo');
                        botonEnviar.disabled = false;
                        textoBoton.innerHTML = '<i class="fas fa-check-circle"></i> Acceso concedido';
                        
                        // Redirigir después de la validación
                        setTimeout(() => {
                            window.location.href = '../paginas/principal.html';
                        }, 1000);
                    }, 2000);
                } else {
                    mostrarError(inputCorreo, 'El correo electrónico no está registrado');
                    cargador.classList.remove('activo');
                    botonEnviar.disabled = false;
                    textoBoton.textContent = 'Acceder';
                }
            })
            .catch(error => {
                console.error('Error al validar el correo:', error);
                mostrarError(inputCorreo, 'Error al validar el correo. Intenta nuevamente.');
                cargador.classList.remove('activo');
                botonEnviar.disabled = false;
                textoBoton.textContent = 'Acceder';
            });
    });
    
    // Función para validar correo con EmailJS
    function validarCorreoConEmailJS(correo) {
        return new Promise((resolve, reject) => {
            // En un caso real, aquí harías una llamada a tu servicio backend
            // que use EmailJS para verificar si el correo existe
            // Esta es una simulación para propósitos de demostración
            
            // Simulamos una respuesta positiva para correos que contengan "@ejemplo.com"
            // En producción, reemplaza esto con la llamada real a EmailJS
            setTimeout(() => {
                resolve(correo.includes('@ejemplo.com'));
            }, 1500);
            
            /*
            // Código real para usar con EmailJS (requiere configuración previa):
            emailjs.send("TU_SERVICE_ID", "TU_TEMPLATE_ID", {
                email: correo
            })
            .then(response => {
                resolve(response.status === 200); // Ajusta según tu implementación
            }, error => {
                reject(error);
            });
            */
        });
    }
    
    // Función para validar formato de correo
    function validarCorreo(correo) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(correo);
    }
    
    // Función para mostrar errores
    function mostrarError(input, mensaje) {
        const grupoInput = input.closest('.grupo-input');
        grupoInput.style.borderColor = 'var(--error)';
        
        // Eliminar mensaje de error previo si existe
        let errorExistente = grupoInput.querySelector('.mensaje-error');
        if (errorExistente) {
            errorExistente.remove();
        }
        
        // Crear y mostrar nuevo mensaje de error
        const errorElemento = document.createElement('p');
        errorElemento.className = 'mensaje-error';
        errorElemento.style.color = 'var(--error)';
        errorElemento.style.fontSize = '0.8rem';
        errorElemento.style.marginTop = '5px';
        errorElemento.textContent = mensaje;
        
        grupoInput.appendChild(errorElemento);
        
        // Eliminar el mensaje después de 3 segundos
        setTimeout(() => {
            errorElemento.remove();
            grupoInput.style.borderColor = '';
        }, 3000);
    }

    // 6. Botón de empleo 
    botonEmpleo.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = '../paginas/fomulario empleo.html';
    });
    
    // 7. Obtener datos del clima (simulado)
    setTimeout(() => {
        document.getElementById('clima').innerHTML = '<i class="fas fa-cloud-sun"></i> 22°C';
    }, 1000);
    
    // 8. Validación en tiempo real para email
    inputCorreo.addEventListener('input', function() {
        const grupoInput = this.closest('.grupo-input');
        const errorExistente = grupoInput.querySelector('.mensaje-error');
        
        if (this.validity.valid) {
            this.style.borderColor = 'var(--secundario)';
            if (errorExistente) errorExistente.remove();
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
            
            menuIdioma.classList.remove('mostrar');
        });
    });

    // Prevenir que el menú se cierre al hacer clic en él
    menuIdioma.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});