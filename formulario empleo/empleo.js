document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    const formulario = document.getElementById('formularioAplicacion');
    const pasosFormulario = document.querySelectorAll('.paso-formulario');
    const pasos = document.querySelectorAll('.paso');
    const botonesSiguiente = document.querySelectorAll('.boton-siguiente');
    const botonesAnterior = document.querySelectorAll('.boton-anterior');
    const selectorIdioma = document.getElementById('idioma');
    let pasoActual = 0;

    // Cargar datos guardados
    function cargarDatosFormulario() {
        const datosGuardados = localStorage.getItem('datosAplicacionEmpleo');
        const pasoGuardado = localStorage.getItem('pasoActual');
        
        if (datosGuardados) {
            const datos = JSON.parse(datosGuardados);
            
            for (const clave in datos) {
                const entrada = formulario.querySelector(`[name="${clave}"]`);
                if (entrada) {
                    if (entrada.type === 'radio') {
                        if (entrada.value === datos[clave]) {
                            entrada.checked = true;
                            entrada.setAttribute('aria-checked', 'true');
                        }
                    } else {
                        entrada.value = datos[clave];
                    }
                }
            }
            
            // Cargar habilidades
            if (datos.habilidades) {
                datos.habilidades.forEach(habilidad => {
                    if (habilidad) agregarEtiquetaHabilidad(habilidad);
                });
            }
        }
        
        if (pasoGuardado) {
            mostrarPaso(parseInt(pasoGuardado));
        }
        
        // Cargar preferencia de idioma
        const idiomaGuardado = localStorage.getItem('idiomaPreferido');
        if (idiomaGuardado) {
            selectorIdioma.value = idiomaGuardado;
        }
    }

    // Guardar datos del formulario
    function guardarDatosFormulario() {
        const datosFormulario = new FormData(formulario);
        const datos = {};
        
        // Guardar campos normales
        datosFormulario.forEach((valor, clave) => {
            datos[clave] = valor;
        });
        
        // Guardar habilidades
        const habilidades = Array.from(document.querySelectorAll('.etiqueta-habilidad input')).map(input => input.value);
        if (habilidades.length) datos.habilidades = habilidades;
        
        localStorage.setItem('datosAplicacionEmpleo', JSON.stringify(datos));
        localStorage.setItem('pasoActual', pasoActual);
    }

    // Mostrar paso específico
    function mostrarPaso(indicePaso) {
        // Validar rango de pasos
        if (indicePaso < 0 || indicePaso >= pasosFormulario.length) return;
        
        // Ocultar todos los pasos
        pasosFormulario.forEach(paso => {
            paso.classList.remove('activo');
        });
        
        // Mostrar el paso actual
        pasosFormulario[indicePaso].classList.add('activo');
        
        // Actualizar indicador de progreso
        pasos.forEach((paso, indice) => {
            paso.setAttribute('aria-valuenow', indice <= indicePaso ? indice : 0);
            if (indice <= indicePaso) {
                paso.classList.add('activo');
            } else {
                paso.classList.remove('activo');
            }
        });
        
        pasoActual = indicePaso;
        guardarDatosFormulario();
    }

    // Validar paso actual
    function validarPaso(indicePaso) {
        let esValido = true;
        const pasoActualForm = pasosFormulario[indicePaso];
        const camposRequeridos = pasoActualForm.querySelectorAll('[required]');
        
        // Validar campos requeridos
        camposRequeridos.forEach(campo => {
            if (!campo.value.trim()) {
                mostrarError(campo, 'Este campo es requerido');
                esValido = false;
            } else {
                limpiarError(campo);
            }
        });
        
        // Validaciones específicas por paso
        if (indicePaso === 0) {
            // Validar email
            const email = pasoActualForm.querySelector('#email');
            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                mostrarError(email, 'Por favor ingresa un email válido');
                esValido = false;
            }
            
            // Validar teléfono si tiene valor
            const telefono = pasoActualForm.querySelector('#telefono');
            if (telefono && telefono.value && !/^[\d\s+-]+$/.test(telefono.value)) {
                mostrarError(telefono, 'Por favor ingresa un número de teléfono válido');
                esValido = false;
            }
        }
        
        if (indicePaso === 1) {
            // Validar al menos una experiencia
            if (document.querySelectorAll('.item-experiencia').length === 0) {
                mostrarNotificacion('Por favor añade al menos una experiencia profesional', 'error');
                esValido = false;
            }
        }
        
        if (!esValido) {
            mostrarNotificacion('Por favor completa todos los campos requeridos', 'error');
        }
        
        return esValido;
    }

    // Mostrar error en campo
    function mostrarError(campo, mensaje) {
        campo.style.borderColor = 'var(--color-advertencia)';
        
        if (!campo.nextElementSibling || !campo.nextElementSibling.classList.contains('mensaje-error')) {
            const mensajeError = document.createElement('div');
            mensajeError.className = 'mensaje-error';
            mensajeError.textContent = mensaje;
            campo.parentNode.insertBefore(mensajeError, campo.nextSibling);
        } else {
            campo.nextElementSibling.textContent = mensaje;
        }
        
        // Enfocar el primer campo con error
        if (esPrimerError) {
            campo.focus();
            esPrimerError = false;
        }
    }

    // Limpiar error de campo
    function limpiarError(campo) {
        campo.style.borderColor = 'var(--color-borde)';
        const mensajeError = campo.nextElementSibling;
        if (mensajeError && mensajeError.classList.contains('mensaje-error')) {
            mensajeError.remove();
        }
    }

    // Mostrar notificación
    function mostrarNotificacion(mensaje, tipo = 'exito') {
        const toast = document.createElement('div');
        toast.className = `toast ${tipo}`;
        toast.setAttribute('role', 'alert');
        toast.innerHTML = `
            <i class="fas ${tipo === 'exito' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${mensaje}</span>
        `;
        
        // Eliminar notificaciones anteriores
        document.querySelectorAll('.toast').forEach(el => el.remove());
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('mostrar');
        }, 10);
        
        setTimeout(() => {
            toast.classList.remove('mostrar');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 5000);
    }

    // Event listeners para navegación
    botonesSiguiente.forEach(boton => {
        boton.addEventListener('click', function() {
            if (validarPaso(pasoActual)) {
                mostrarPaso(pasoActual + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    botonesAnterior.forEach(boton => {
        boton.addEventListener('click', function() {
            mostrarPaso(pasoActual - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Gestión de experiencia laboral
    const botonAgregarExperiencia = document.getElementById('agregarExperiencia');
    const contenedorExperiencias = document.getElementById('itemsExperiencia');
    
    botonAgregarExperiencia.addEventListener('click', function() {
        const cantidadExperiencias = contenedorExperiencias.children.length;
        if (cantidadExperiencias >= 5) {
            mostrarNotificacion('Máximo 5 experiencias profesionales', 'error');
            return;
        }
        
        const itemExperiencia = document.createElement('div');
        itemExperiencia.className = 'item-experiencia';
        itemExperiencia.innerHTML = `
            <button type="button" class="eliminar-experiencia" aria-label="Eliminar experiencia"><i class="fas fa-times"></i></button>
            <div class="cuadricula-formulario">
                <div class="grupo-entrada">
                    <label class="requerido">Puesto</label>
                    <input type="text" name="experiencia[${cantidadExperiencias}][puesto]" required>
                </div>
                <div class="grupo-entrada">
                    <label class="requerido">Empresa</label>
                    <input type="text" name="experiencia[${cantidadExperiencias}][empresa]" required>
                </div>
                <div class="grupo-entrada">
                    <label class="requerido">Fecha de inicio</label>
                    <input type="date" name="experiencia[${cantidadExperiencias}][fecha_inicio]" required>
                </div>
                <div class="grupo-entrada">
                    <label>Fecha de fin</label>
                    <input type="date" name="experiencia[${cantidadExperiencias}][fecha_fin]">
                    <small class="texto-ayuda">Dejar vacío si es el trabajo actual</small>
                </div>
                <div class="grupo-entrada ancho-completo">
                    <label>Descripción</label>
                    <textarea name="experiencia[${cantidadExperiencias}][descripcion]" rows="3"></textarea>
                </div>
            </div>
        `;
        
        contenedorExperiencias.appendChild(itemExperiencia);
        
        // Validar fechas
        const fechaInicio = itemExperiencia.querySelector('input[name$="[fecha_inicio]"]');
        const fechaFin = itemExperiencia.querySelector('input[name$="[fecha_fin]"]');
        
        fechaInicio.addEventListener('change', function() {
            if (fechaFin.value && new Date(this.value) > new Date(fechaFin.value)) {
                mostrarError(fechaFin, 'La fecha de fin no puede ser anterior a la fecha de inicio');
            } else {
                limpiarError(fechaFin);
            }
        });
        
        fechaFin.addEventListener('change', function() {
            if (fechaInicio.value && new Date(this.value) < new Date(fechaInicio.value)) {
                mostrarError(this, 'La fecha de fin no puede ser anterior a la fecha de inicio');
            } else {
                limpiarError(this);
            }
        });
        
        // Configurar botón de eliminar
        itemExperiencia.querySelector('.eliminar-experiencia').addEventListener('click', function() {
            if (confirm('¿Estás seguro de que deseas eliminar esta experiencia?')) {
                itemExperiencia.remove();
                guardarDatosFormulario();
            }
        });
        
        guardarDatosFormulario();
    });

    // Gestión de habilidades (etiquetas)
    const contenedorHabilidades = document.getElementById('etiquetasHabilidades');
    const entradaHabilidad = document.getElementById('entradaHabilidad');
    
    entradaHabilidad.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && this.value.trim()) {
            agregarEtiquetaHabilidad(this.value.trim());
            this.value = '';
            e.preventDefault();
        }
    });
    
    function agregarEtiquetaHabilidad(habilidad) {
        // Limitar número de habilidades
        if (document.querySelectorAll('.etiqueta-habilidad').length >= 10) {
            mostrarNotificacion('Máximo 10 habilidades', 'error');
            return;
        }
        
        // Evitar duplicados
        const habilidadesExistentes = Array.from(document.querySelectorAll('.etiqueta-habilidad')).map(etiqueta => 
            etiqueta.textContent.trim().replace('×', '').trim()
        );
        
        if (habilidadesExistentes.includes(habilidad)) {
            mostrarNotificacion('Esta habilidad ya fue agregada', 'error');
            return;
        }
        
        const etiqueta = document.createElement('div');
        etiqueta.className = 'etiqueta-habilidad';
        etiqueta.innerHTML = `
            ${habilidad}
            <button type="button" class="eliminar-etiqueta" aria-label="Eliminar habilidad"><i class="fas fa-times"></i></button>
            <input type="hidden" name="habilidades[]" value="${habilidad}">
        `;
        
        contenedorHabilidades.insertBefore(etiqueta, entradaHabilidad.parentNode.nextSibling);
        
        // Configurar botón de eliminar
        etiqueta.querySelector('.eliminar-etiqueta').addEventListener('click', function() {
            if (confirm('¿Estás seguro de que deseas eliminar esta habilidad?')) {
                etiqueta.remove();
                guardarDatosFormulario();
            }
        });
        
        guardarDatosFormulario();
    }

    // Gestión de carga de archivos
    const tarjetasCarga = document.querySelectorAll('.tarjeta-carga');
    
    tarjetasCarga.forEach(tarjeta => {
        const entradaArchivo = tarjeta.querySelector('input[type="file"]');
        const botonCarga = tarjeta.querySelector('.boton-carga');
        const infoArchivo = tarjeta.querySelector('.info-archivo');
        
        entradaArchivo.addEventListener('change', function() {
            if (this.files.length) {
                const archivo = this.files[0];
                
                // Validar tamaño máximo (5MB)
                if (archivo.size > 5 * 1024 * 1024) {
                    mostrarNotificacion('El archivo excede el tamaño máximo de 5MB', 'error');
                    this.value = '';
                    return;
                }
                
                infoArchivo.textContent = `${archivo.name} (${(archivo.size / 1024 / 1024).toFixed(2)} MB)`;
                botonCarga.textContent = 'Cambiar Archivo';
                mostrarNotificacion('Archivo seleccionado correctamente', 'exito');
                guardarDatosFormulario();
            }
        });
    });

    // Modal de confirmación
    const modal = document.getElementById('modalConfirmacion');
    const botonCerrarModal = document.getElementById('botonCerrarModal');
    const cerrarModal = document.querySelector('.cerrar-modal');
    
    function mostrarModal() {
        modal.classList.add('activo');
        document.body.style.overflow = 'hidden';
    }
    
    function ocultarModal() {
        modal.classList.remove('activo');
        document.body.style.overflow = 'auto';
    }
    
    botonCerrarModal.addEventListener('click', ocultarModal);
    cerrarModal.addEventListener('click', ocultarModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            ocultarModal();
        }
    });

    // Envío del formulario
    formulario.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (validarPaso(pasoActual)) {
            const botonEnviar = formulario.querySelector('.boton-enviar');
            const textoOriginal = botonEnviar.innerHTML;
            botonEnviar.innerHTML = '<div class="spinner"></div> Enviando...';
            botonEnviar.disabled = true;
            
            try {
                // Simular envío a servidor
                const datosFormulario = new FormData(formulario);
                
                // Aquí iría la llamada real al servidor
                // const respuesta = await fetch('https://ejemplo.com/api/aplicaciones', {
                //     method: 'POST',
                //     body: datosFormulario
                // });
                
                // Simular retardo de red
                await new Promise(resolver => setTimeout(resolver, 1500));
                
                // Simular respuesta exitosa
                // if (!respuesta.ok) throw new Error('Error en el servidor');
                
                mostrarModal();
                formulario.reset();
                localStorage.removeItem('datosAplicacionEmpleo');
                localStorage.removeItem('pasoActual');
                contenedorExperiencias.innerHTML = '';
                document.querySelectorAll('.etiqueta-habilidad').forEach(etiqueta => etiqueta.remove());
                mostrarPaso(0);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } catch (error) {
                mostrarNotificacion('Error al enviar el formulario. Por favor intenta nuevamente.', 'error');
                console.error('Error:', error);
            } finally {
                botonEnviar.innerHTML = textoOriginal;
                botonEnviar.disabled = false;
            }
        }
    });

    // Cambio de idioma
    selectorIdioma.addEventListener('change', function() {
        localStorage.setItem('idiomaPreferido', this.value);
        // Aquí podrías implementar la lógica para cambiar los textos
        mostrarNotificacion('Idioma cambiado', 'exito');
    });

    // Inicialización
    cargarDatosFormulario();
    mostrarPaso(parseInt(localStorage.getItem('pasoActual')) || 0);
});
