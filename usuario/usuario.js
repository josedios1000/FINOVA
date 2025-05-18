class SimuladorFinanciero {
    constructor() {
        this.secciones = document.querySelectorAll('.seccion');
        this.btnAnterior = document.getElementById('btnAnterior');
        this.btnSiguiente = document.getElementById('btnSiguiente');
        this.btnEnviar = document.getElementById('btnEnviar');
        this.btnReiniciar = document.getElementById('btnReiniciar');
        this.btnDescargar = document.getElementById('btnDescargar');
        this.formulario = document.getElementById('formularioFinanciero');
        this.resultado = document.getElementById('resultado');
        this.barraProgreso = document.getElementById('barra-progreso');
        this.textoProgreso = document.getElementById('texto-progreso');
        this.seccionActual = 0;
        
        this.inicializarEventos();
        this.mostrarSeccion(0);
        this.actualizarProgreso();
    }
    
    inicializarEventos() {
        this.btnSiguiente.addEventListener('click', () => this.siguienteSeccion());
        this.btnAnterior.addEventListener('click', () => this.anteriorSeccion());
        this.btnEnviar.addEventListener('click', (e) => this.enviarFormulario(e));
        this.btnReiniciar.addEventListener('click', () => this.reiniciarSimulador());
        this.btnDescargar.addEventListener('click', () => this.descargarInforme());
    }
    
    mostrarSeccion(indice) {
        this.secciones.forEach((seccion, i) => {
            seccion.classList.toggle('activa', i === indice);
        });
        
        this.btnAnterior.style.display = indice === 0 ? 'none' : 'flex';
        this.btnSiguiente.style.display = indice === this.secciones.length - 1 ? 'none' : 'flex';
        this.btnEnviar.style.display = indice === this.secciones.length - 1 ? 'flex' : 'none';
        
        this.seccionActual = indice;
        this.actualizarProgreso();
    }
    
    actualizarProgreso() {
        const porcentaje = ((this.seccionActual + 1) / this.secciones.length) * 100;
        this.barraProgreso.style.width = `${porcentaje}%`;
        this.textoProgreso.textContent = `Paso ${this.seccionActual + 1} de ${this.secciones.length}`;
    }
    
    siguienteSeccion() {
        if (this.validarSeccionActual()) {
            this.seccionActual++;
            this.mostrarSeccion(this.seccionActual);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
    
    anteriorSeccion() {
        this.seccionActual--;
        this.mostrarSeccion(this.seccionActual);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    validarSeccionActual() {
        const inputs = this.secciones[this.seccionActual].querySelectorAll('input[required], select[required]');
        let valido = true;
        
        inputs.forEach(input => {
            if (!input.value) {
                input.style.borderColor = 'var(--color-peligro)';
                valido = false;
                
                // Agregar animación de shake
                input.style.animation = 'shake 0.5s';
                setTimeout(() => {
                    input.style.animation = '';
                }, 500);
            } else {
                input.style.borderColor = 'var(--color-borde)';
            }
        });
        
        if (!valido) {
            // Mostrar notificación elegante
            const notificacion = document.createElement('div');
            notificacion.className = 'notificacion-error';
            notificacion.innerHTML = '<i class="fas fa-exclamation-circle"></i> Por favor completa todos los campos requeridos';
            document.body.appendChild(notificacion);
            
            setTimeout(() => {
                notificacion.classList.add('mostrar');
            }, 10);
            
            setTimeout(() => {
                notificacion.classList.remove('mostrar');
                setTimeout(() => {
                    document.body.removeChild(notificacion);
                }, 300);
            }, 3000);
        }
        
        return valido;
    }
    
    enviarFormulario(e) {
        e.preventDefault();
        
        if (this.validarFormularioCompleto()) {
            const datosUsuario = this.obtenerDatosUsuario();
            this.mostrarResultados(datosUsuario);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
    
    validarFormularioCompleto() {
        let valido = true;
        const inputsRequeridos = document.querySelectorAll('input[required], select[required]');
        
        inputsRequeridos.forEach(input => {
            if (!input.value) {
                input.style.borderColor = 'var(--color-peligro)';
                valido = false;
            } else {
                input.style.borderColor = 'var(--color-borde)';
            }
        });
        
        if (!valido) {
            // Ir a la primera sección con error
            for (let i = 0; i < this.secciones.length; i++) {
                const inputs = this.secciones[i].querySelectorAll('input[required], select[required]');
                for (const input of inputs) {
                    if (!input.value) {
                        this.seccionActual = i;
                        this.mostrarSeccion(i);
                        
                        // Mostrar notificación
                        const notificacion = document.createElement('div');
                        notificacion.className = 'notificacion-error';
                        notificacion.innerHTML = '<i class="fas fa-exclamation-circle"></i> Por favor completa todos los campos requeridos';
                        document.body.appendChild(notificacion);
                        
                        setTimeout(() => {
                            notificacion.classList.add('mostrar');
                        }, 10);
                        
                        setTimeout(() => {
                            notificacion.classList.remove('mostrar');
                            setTimeout(() => {
                                document.body.removeChild(notificacion);
                            }, 300);
                        }, 3000);
                        
                        return false;
                    }
                }
            }
        }
        
        return valido;
    }
    
    obtenerDatosUsuario() {
        return {
            nombre: document.getElementById('nombre').value,
            edad: parseInt(document.getElementById('edad').value),
            ocupacion: document.getElementById('ocupacion').value,
            ingresos: parseFloat(document.getElementById('ingresos-mensuales').value),
            gastos: parseFloat(document.getElementById('gastos-mensuales').value),
            ahorros: parseFloat(document.getElementById('ahorros').value),
            deudas: parseFloat(document.getElementById('deudas').value),
            presupuesto: document.querySelector('input[name="presupuesto"]:checked').value,
            inversion: document.querySelector('input[name="inversion"]:checked').value,
            conocimiento: document.getElementById('nivel-conocimiento').value,
            objetivo: document.getElementById('objetivo-principal').value,
            tiempoObjetivo: parseInt(document.getElementById('tiempo-objetivo').value),
            compromiso: document.querySelector('input[name="compromiso"]:checked')?.value || '3'
        };
    }
    
    mostrarResultados(datos) {
        this.formulario.style.display = 'none';
        this.resultado.style.display = 'block';
        
        // Mostrar datos del usuario
        document.getElementById('nombre-usuario').textContent = datos.nombre;
        document.getElementById('edad-usuario').textContent = datos.edad;
        document.getElementById('ocupacion-usuario').textContent = datos.ocupacion;
        
        // Calcular métricas
        const capacidadAhorro = datos.ingresos - datos.gastos;
        const porcentajeAhorro = (capacidadAhorro / datos.ingresos) * 100;
        const ratioDeuda = (datos.deudas / datos.ingresos) * 100;
        const mesesProteccion = datos.ahorros / datos.gastos;
        
        // Actualizar indicadores circulares
        this.animarIndicador('indicador-ahorro', porcentajeAhorro);
        this.animarIndicador('indicador-deuda', ratioDeuda);
        this.animarIndicador('indicador-proteccion', (mesesProteccion / 12) * 100); // Convertir a porcentaje de un año
        
        document.getElementById('valor-ahorro').textContent = `${porcentajeAhorro.toFixed(1)}%`;
        document.getElementById('valor-deuda').textContent = `${ratioDeuda.toFixed(1)}%`;
        document.getElementById('valor-proteccion').textContent = `${mesesProteccion.toFixed(1)}`;
        
        // Análisis financiero
        let analisisHTML = '';
        
        analisisHTML += `<p><strong>Capacidad de ahorro mensual:</strong> $${capacidadAhorro.toFixed(2)} (${porcentajeAhorro.toFixed(1)}% de tus ingresos)</p>`;
        
        if (capacidadAhorro > 0) {
            analisisHTML += `<div class="tarjeta-consejo positivo">
                <i class="fas fa-thumbs-up"></i>
                <div>
                    <h4>¡Buen trabajo!</h4>
                    <p>Tienes un superávit mensual de $${capacidadAhorro.toFixed(2)}. Puedes destinar este dinero a tus objetivos financieros.</p>
                </div>
            </div>`;
        } else if (capacidadAhorro < 0) {
            analisisHTML += `<div class="tarjeta-consejo negativo">
                <i class="fas fa-exclamation-triangle"></i>
                <div>
                    <h4>Atención</h4>
                    <p>Tienes un déficit mensual de $${Math.abs(capacidadAhorro).toFixed(2)}. Necesitas reducir gastos o aumentar ingresos para alcanzar estabilidad financiera.</p>
                </div>
            </div>`;
        } else {
            analisisHTML += `<div class="tarjeta-consejo neutral">
                <i class="fas fa-info-circle"></i>
                <div>
                    <h4>Punto de equilibrio</h4>
                    <p>Tus ingresos igualan tus gastos. Cualquier imprevisto podría afectar tu estabilidad financiera.</p>
                </div>
            </div>`;
        }
        
        analisisHTML += `<p><strong>Meses de protección:</strong> ${mesesProteccion.toFixed(1)} meses (con tus ahorros actuales)</p>`;
        
        if (mesesProteccion >= 6) {
            analisisHTML += `<p class="texto-positivo"><i class="fas fa-check-circle"></i> Cuentas con un fondo de emergencia adecuado (recomendado: 6 meses de gastos).</p>`;
        } else {
            analisisHTML += `<p class="texto-negativo"><i class="fas fa-exclamation-circle"></i> Tu fondo de emergencia es insuficiente. Se recomienda ahorrar al menos 6 meses de gastos ($${(datos.gastos * 6).toFixed(2)}).</p>`;
        }
        
        analisisHTML += `<p><strong>Ratio de deuda/ingresos:</strong> ${ratioDeuda.toFixed(1)}%</p>`;
        
        if (ratioDeuda > 40) {
            analisisHTML += `<p class="texto-negativo"><i class="fas fa-exclamation-circle"></i> Tus deudas son altas en relación a tus ingresos (más del 40%). Prioriza pagar deudas.</p>`;
        } else if (ratioDeuda > 0) {
            analisisHTML += `<p class="texto-positivo"><i class="fas fa-check-circle"></i> Tus deudas están en un nivel manejable (menos del 40% de tus ingresos).</p>`;
        } else {
            analisisHTML += `<p class="texto-positivo"><i class="fas fa-check-circle"></i> No tienes deudas reportadas. ¡Buen trabajo!</p>`;
        }
        
        document.getElementById('analisis-financiero').innerHTML = analisisHTML;
        
        // Recomendaciones personalizadas
        let recomendacionesHTML = '<ul>';
        
        // Recomendaciones generales
        if (datos.presupuesto === 'no') {
            recomendacionesHTML += `<li><strong>Crea un presupuesto:</strong> El 80% del éxito financiero viene de seguir un presupuesto. Te recomendamos la regla 50/30/20: 50% necesidades, 30% deseos, 20% ahorros/deudas.</li>`;
        } else {
            recomendacionesHTML += `<li><strong>Optimiza tu presupuesto:</strong> Revisa periódicamente tus categorías de gasto para identificar áreas de mejora.</li>`;
        }
        
        if (datos.inversion === 'no' && capacidadAhorro > 0) {
            recomendacionesHTML += `<li><strong>Comienza a invertir:</strong> Con tu capacidad de ahorro actual, podrías empezar con fondos indexados (bajo riesgo) o robo-advisors (gestión automatizada).</li>`;
        } else if (datos.inversion === 'si') {
            recomendacionesHTML += `<li><strong>Diversifica tus inversiones:</strong> Considera añadir diferentes clases de activos a tu portafolio para reducir riesgo.</li>`;
        }
        
        if (mesesProteccion < 6 && capacidadAhorro > 0) {
            const ahorroMensualRecomendado = ((datos.gastos * 6) - datos.ahorros) / 12;
            recomendacionesHTML += `<li><strong>Construye tu fondo de emergencia:</strong> Destina $${ahorroMensualRecomendado.toFixed(2)} mensuales para alcanzar 6 meses de protección en 1 año.</li>`;
        }
        
        if (ratioDeuda > 40) {
            recomendacionesHTML += `<li><strong>Estrategia para deudas:</strong> Prioriza pagar las deudas con mayor interés primero (método avalancha) o las más pequeñas para motivación (método bola de nieve).</li>`;
        }
        
        // Recomendaciones según objetivo
        switch(datos.objetivo) {
            case 'ahorro':
                recomendacionesHTML += `<li><strong>Automatiza tus ahorros:</strong> Configura transferencias automáticas del 20% de tus ingresos a una cuenta separada el día que recibes tu salario.</li>`;
                break;
            case 'inversion':
                recomendacionesHTML += `<li><strong>Estrategia de inversión:</strong> Considera fondos indexados (como S&P 500) con un horizonte de largo plazo (mínimo 5 años).</li>`;
                break;
            case 'deudas':
                recomendacionesHTML += `<li><strong>Plan de pago de deudas:</strong> Destina el 30% de tus ingresos a pagar deudas hasta eliminarlas completamente.</li>`;
                break;
            case 'jubilacion':
                const ahorroRequerido = datos.gastos * 12 * 25; // Regla del 4%
                const ahorroMensual = (ahorroRequerido - datos.ahorros) / (datos.tiempoObjetivo * 12);
                recomendacionesHTML += `<li><strong>Plan de jubilación:</strong> Para jubilarte en ${datos.tiempoObjetivo} años con $${ahorroRequerido.toFixed(2)}, necesitas ahorrar $${ahorroMensual.toFixed(2)} mensuales (considerando 7% rendimiento anual).</li>`;
                break;
            case 'negocio':
                recomendacionesHTML += `<li><strong>Validación de negocio:</strong> Antes de invertir, valida tu idea con un MVP (Producto Mínimo Viable) y clientes potenciales.</li>`;
                break;
            case 'libertad':
                const ingresosPasivosRequeridos = datos.gastos * 12;
                const capitalRequerido = ingresosPasivosRequeridos / 0.04; // Regla del 4%
                recomendacionesHTML += `<li><strong>Camino a la libertad:</strong> Necesitas acumular $${capitalRequerido.toFixed(2)} que generen $${ingresosPasivosRequeridos.toFixed(2)} anuales (4% retiro seguro).</li>`;
                break;
        }
        
        // Recomendaciones según conocimiento
        if (datos.conocimiento === 'bajo') {
            recomendacionesHTML += `<li><strong>Educación financiera:</strong> Comienza con libros como "Padre Rico, Padre Pobre" o "El Hombre más Rico de Babilonia".</li>`;
        } else if (datos.conocimiento === 'medio') {
            recomendacionesHTML += `<li><strong>Profundiza tu conocimiento:</strong> Explora temas como asignación de activos, diversificación y estrategias fiscales.</li>`;
        } else {
            recomendacionesHTML += `<li><strong>Estrategias avanzadas:</strong> Considera inversiones alternativas (bienes raíces, negocios) y optimización fiscal.</li>`;
        }
        
        // Recomendación según nivel de compromiso
        const compromiso = parseInt(datos.compromiso);
        if (compromiso < 3) {
            recomendacionesHTML += `<li><strong>Aumenta tu compromiso:</strong> Define metas específicas y visualiza los beneficios de alcanzar tu objetivo para mantener la motivación.</li>`;
        }
        
        recomendacionesHTML += '</ul>';
        document.getElementById('recomendaciones').innerHTML = recomendacionesHTML;
        
        // Plan de acción
        let planHTML = '<ul>';
        
        if (capacidadAhorro <= 0) {
            planHTML += `<li><strong>Mes 1-3:</strong> Enfócate en reducir gastos. Identifica 3 categorías donde puedas recortar al menos 15%.</li>`;
            planHTML += `<li><strong>Mes 4-6:</strong> Crea múltiples fuentes de ingreso (freelance, trabajos temporales).</li>`;
        } else {
            planHTML += `<li><strong>Mes 1:</strong> Automatiza tus ahorros (20% de ingresos) y pagos de deudas (si aplica).</li>`;
            planHTML += `<li><strong>Mes 2-3:</strong> Educate sobre ${datos.conocimiento === 'bajo' ? 'conceptos básicos' : 'estrategias avanzadas'} de ${datos.objetivo === 'inversion' ? 'inversión' : datos.objetivo}.</li>`;
        }
        
        if (datos.objetivo === 'deudas' && datos.deudas > 0) {
            planHTML += `<li><strong>Mes 1-6:</strong> Destina el 30% de tus ingresos a pagar deudas usando el método que prefieras.</li>`;
        }
        
        if (datos.objetivo === 'jubilacion' || datos.objetivo === 'libertad') {
            planHTML += `<li><strong>Mes 4-12:</strong> Abre una cuenta de inversión y comienza con aportes mensuales automáticos.</li>`;
        }
        
        planHTML += `<li><strong>Cada 3 meses:</strong> Revisa tu progreso y ajusta tu estrategia según resultados.</li>`;
        planHTML += '</ul>';
        
        document.getElementById('plan-accion').innerHTML = planHTML;
    }
    
    animarIndicador(id, valor) {
        const circulo = document.querySelector(`#${id} .circulo-progreso path:nth-child(2)`);
        const porcentaje = Math.min(valor, 100);
        const circunferencia = 2 * Math.PI * 15.9155;
        const offset = circunferencia - (porcentaje / 100) * circunferencia;
        
        circulo.style.strokeDasharray = `${circunferencia} ${circunferencia}`;
        circulo.style.strokeDashoffset = circunferencia;
        
        setTimeout(() => {
            circulo.style.strokeDashoffset = offset;
        }, 100);
    }
    
    reiniciarSimulador() {
        this.formulario.reset();
        this.formulario.style.display = 'block';
        this.resultado.style.display = 'none';
        this.seccionActual = 0;
        this.mostrarSeccion(0);
        
        // Resetear estilos de validación
        document.querySelectorAll('input, select').forEach(input => {
            input.style.borderColor = 'var(--color-borde)';
        });
    }
    
    descargarInforme() {
        // En una implementación real, aquí se generaría un PDF con las recomendaciones
        alert("En una implementación completa, aquí se generaría y descargaría un PDF con tu plan financiero personalizado.");
    }
}

// Inicializar el simulador cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new SimuladorFinanciero();
    
    // Agregar estilo para la notificación de error
    const estiloNotificacion = document.createElement('style');
    estiloNotificacion.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .notificacion-error {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background-color: var(--color-peligro);
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(247, 37, 133, 0.3);
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 1000;
            opacity: 0;
            transition: all 0.3s ease;
        }
        
        .notificacion-error.mostrar {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        
        .notificacion-error i {
            font-size: 20px;
        }
        
        .tarjeta-consejo {
            display: flex;
            gap: 15px;
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
            align-items: flex-start;
        }
        
        .tarjeta-consejo i {
            font-size: 24px;
            margin-top: 3px;
        }
        
        .tarjeta-consejo.positivo {
            background-color: rgba(76, 201, 240, 0.1);
            border-left: 4px solid var(--color-exito);
        }
        
        .tarjeta-consejo.negativo {
            background-color: rgba(247, 37, 133, 0.1);
            border-left: 4px solid var(--color-peligro);
        }
        
        .tarjeta-consejo.neutral {
            background-color: rgba(87, 117, 144, 0.1);
            border-left: 4px solid var(--color-info);
        }
        
        .tarjeta-consejo h4 {
            margin-bottom: 5px;
            color: var(--color-texto);
        }
        
        .texto-positivo {
            color: var(--color-exito);
            display: flex;
            align-items: center;
            gap: 5px;
            margin: 10px 0;
        }
        
        .texto-negativo {
            color: var(--color-peligro);
            display: flex;
            align-items: center;
            gap: 5px;
            margin: 10px 0;
        }
    `;
    document.head.appendChild(estiloNotificacion);
});