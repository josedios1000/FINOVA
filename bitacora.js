// Esperamos a que todo el contenido del DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
    // Obtenemos el formulario y los campos del formulario
    const formulario = document.getElementById("formulario-cambio"); // Selecciona el formulario por su ID para poder manejar el evento de envío
    const fechaInput = document.getElementById("fecha"); // Selecciona el campo de fecha por su ID (aunque no se usa en el código, lo puedes usar si necesitas que el usuario ingrese una fecha)
    const tituloInput = document.getElementById("titulo"); // Selecciona el campo de título por su ID
    const descripcionInput = document.getElementById("descripcion"); // Selecciona el campo de descripción por su ID
    const contenedorBitacora = document.getElementById("bitacora"); // Selecciona el contenedor de la bitácora por su ID para poder insertar nuevas entradas

    // Cargamos las entradas guardadas en el localStorage al cargar la página
    mostrarEntradasGuardadas();

    // Agregamos un evento al formulario para manejar el envío
    formulario.addEventListener("submit", function(evento) {
        evento.preventDefault(); // Prevenimos el recargo de la página al enviar el formulario

        // Obtenemos los valores ingresados en los campos de título y descripción
        const titulo = tituloInput.value.trim(); // Usamos trim() para eliminar espacios en blanco al inicio y al final
        const descripcion = descripcionInput.value.trim(); // Usamos trim() para eliminar espacios en blanco al inicio y al final

        // Validamos que los campos no estén vacíos
        if (titulo === "" || descripcion === "") {
            alert("Por favor completa ambos campos.");
            return;
        }

        // Creamos el nuevo recuadro de cambio
        const nuevaEntrada = document.createElement("div"); // Creamos un nuevo elemento div para la entrada de la bitácora
        nuevaEntrada.classList.add("reg-entrada"); // Agregamos la clase reg-entrada al nuevo div para darle estilo

        // Obtenemos la fecha actual
        const fecha = new Date(); // Creamos un objeto de fecha con la fecha y hora actuales
        const opcionesFecha = { month: "long", year: "numeric" }; // Definimos las opciones para formatear la fecha (mes y año)
        const fechaFormateada = fecha.toLocaleDateString("es-ES", opcionesFecha); // Formateamos la fecha a español (España) con el mes y año

        // Asignamos el contenido HTML al nuevo div
        nuevaEntrada.innerHTML = `
            <div class="reg-fecha">${fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1)}</div>
            <div class="reg-titulo">${titulo}</div>
            <p class="reg-descripcion">${descripcion}</p>
        `;

        // Insertamos la nueva entrada antes del formulario
        contenedorBitacora.insertBefore(nuevaEntrada, formulario.parentElement);

        //===== A PARTIR DE AQUI HECHO CON AYUDA DE CHATGPT =====

        // Guardamos la nueva entrada en el localStorage
        guardarEntradaEnLocalStorage(titulo, descripcion, fechaFormateada);

        // Limpiamos los campos del formulario
        tituloInput.value = ""; // Limpiamos el campo de título
        descripcionInput.value = ""; // Limpiamos el campo de descripción
    });

    // Función para guardar la nueva entrada en el localStorage
    function guardarEntradaEnLocalStorage(titulo, descripcion, fecha) {
        const entrada = { titulo, descripcion, fecha }; // Creamos un objeto con la entrada

        // Obtenemos lo que ya está guardado en el localStorage (si hay algo), o un arreglo vacío si no hay nada guardado
        const entradasGuardadas = JSON.parse(localStorage.getItem("bitacora")) || [];

        // Agregamos la nueva entrada al inicio del arreglo
        entradasGuardadas.unshift(entrada);

        // Guardamos el arreglo actualizado en el localStorage
        localStorage.setItem("bitacora", JSON.stringify(entradasGuardadas));
    }

    // Función para mostrar las entradas guardadas en el localStorage
    function mostrarEntradasGuardadas() {
        // Obtenemos las entradas guardadas desde el localStorage
        const entradasGuardadas = JSON.parse(localStorage.getItem("bitacora")) || [];

        // Recorremos todas las entradas guardadas y las insertamos en la página
        entradasGuardadas.forEach((entrada) => {
            const nuevaEntrada = document.createElement("div"); // Creamos un nuevo div para cada entrada
            nuevaEntrada.classList.add("reg-entrada"); // Le agregamos la clase para estilo

            // Asignamos el contenido HTML al div de la entrada
            nuevaEntrada.innerHTML = `
                <div class="reg-fecha">${entrada.fecha}</div>
                <div class="reg-titulo">${entrada.titulo}</div>
                <p class="reg-descripcion">${entrada.descripcion}</p>
            `;

            // Insertamos la entrada en el contenedor de la bitácora
            contenedorBitacora.insertBefore(nuevaEntrada, formulario.parentElement);
        });
    }
});
