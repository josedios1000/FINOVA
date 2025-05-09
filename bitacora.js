// Esperamos a que todo el contenido del DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
    // Obtenemos el formulario y los campos del formulario
    const formulario = document.getElementById("formulario-cambio"); //Selecciona el formulario por su ID para poder manejar el evento de envío
    const fechaInput = document.getElementById("fecha"); //Selecciona el campo de fecha por su ID
    const tituloInput = document.getElementById("titulo"); //Selecciona el campo de título por su ID
    const descripcionInput = document.getElementById("descripcion"); //Selecciona el campo de descripción por su ID
    const contenedorBitacora = document.getElementById("bitacora"); //Selecciona el contenedor de la bitácora por su ID para poder insertar nuevas entradas
  
    // Agregamos un evento al formulario para manejar el envío
    formulario.addEventListener("submit", function(evento) {
      evento.preventDefault(); // Prevenimos el recargo de página
  
      // Obtenemos los valores ingresados
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
  
      const fecha = new Date(); // Obtenemos la fecha actual
      const opcionesFecha = { month: "long", year: "numeric" }; // Definimos las opciones para formatear la fecha
      const fechaFormateada = fecha.toLocaleDateString("es-ES", opcionesFecha); // Formateamos la fecha a español (España) con el mes y año
  
      // Asignamos el contenido HTML al nuevo div
      nuevaEntrada.innerHTML = `
        <div class="reg-fecha">${fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1)}</div>
        <div class="reg-titulo">${titulo}</div>
        <p class="reg-descripcion">${descripcion}</p>
      `;
  
      // Insertamos la nueva entrada antes del formulario
      contenedorBitacora.insertBefore(nuevaEntrada, formulario.parentElement); 
  
      // Limpiamos los campos
      tituloInput.value = ""; // Limpiamos el campo de título
      descripcionInput.value = ""; // Limpiamos el campo de descripción
    });
  });  