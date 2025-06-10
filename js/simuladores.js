document.addEventListener('DOMContentLoaded', function() {
    // Menú móvil
    const botonMenu = document.getElementById('menuMovil');
    const navegacion = document.querySelector('.navegacion');
    
    botonMenu.addEventListener('click', function() {
        navegacion.classList.toggle('mostrar');
    });
    
    // Filtros de simuladores
    const botonesFiltro = document.querySelectorAll('.boton-filtro');
    
    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', function() {
            // Remover clase activa de todos los botones
            botonesFiltro.forEach(btn => btn.classList.remove('activo'));
            
            // Agregar clase activa al botón clickeado
            this.classList.add('activo');
            
            // Aquí iría la lógica para filtrar los simuladores
            // Por simplicidad, no implementada en este ejemplo
        });
    });
    
    // Efecto hover en tarjetas de simuladores
    const tarjetasSimulador = document.querySelectorAll('.tarjeta-simulador');
    
    tarjetasSimulador.forEach(tarjeta => {
        tarjeta.addEventListener('mouseenter', function() {
            const icono = this.querySelector('.icono-simulador');
            icono.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        tarjeta.addEventListener('mouseleave', function() {
            const icono = this.querySelector('.icono-simulador');
            icono.style.transform = 'scale(1) rotate(0)';
        });
    });
    
    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});