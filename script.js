function applyThemeBasedOnTime() {
    const currentHour = new Date().getHours();
    const body = document.body;

    console.log(`Hora actual: ${currentHour}`); // Depuración: Muestra la hora actual

    // Si la hora está entre las 6:00 PM y las 6:00 AM, aplicar modo oscuro
    if (currentHour >= 18 || currentHour < 6) {
        console.log("Aplicando modo oscuro"); // Depuración: Confirma que se aplica el modo oscuro
        body.classList.add('dark-mode');
    } else {
        console.log("Aplicando modo claro"); // Depuración: Confirma que se aplica el modo claro
        body.classList.remove('dark-mode');
    }
}

// Aplicar el tema al cargar la página
applyThemeBasedOnTime();

// Opcional: Actualizar el tema cada minuto
setInterval(applyThemeBasedOnTime, 60000);