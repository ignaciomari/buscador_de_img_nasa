// Espera a que el contenido HTML se cargue completamente
document.addEventListener("DOMContentLoaded", function () {
    // Obtén referencias a elementos HTML importantes
    const buscar = document.getElementById("inputBuscar"); // Campo de búsqueda
    const btnBuscar = document.getElementById("btnBuscar"); // Botón de búsqueda
    const contenedor = document.getElementById("contenedor"); // Contenedor de resultados
  
    // Agrega un evento al botón de búsqueda cuando se hace clic
    btnBuscar.addEventListener("click", function () {
      // Obtén el texto ingresado por el usuario y elimina espacios en blanco al principio y al final
      const buscarTexto = buscar.value.trim();
      if (buscarTexto === "") {
        // Si el campo de búsqueda está vacío, muestra una alerta y detén la ejecución
        alert("Por favor, ingresa un término de búsqueda.");
        return;
      }
  
      // Hacer la solicitud a la API de la NASA usando fetch
      fetch(`https://images-api.nasa.gov/search?q=${buscarTexto}`)
        .then((response) => response.json()) // Convierte la respuesta a JSON
        .then((data) => {
          // Limpiar el contenedor de resultados anteriores
          contenedor.innerHTML = "";
  
          // Comprueba si hay resultados en la colección de imágenes
          if (data.collection && data.collection.items && data.collection.items.length > 0) {
            // Itera a través de los resultados y muestra cada uno
            data.collection.items.forEach((item) => {
              // Obtén la URL de la imagen, el título, la descripción y la fecha de creación
              let imageUrl = "";
                if (item.links && item.links[0] && item.links[0].href) {
                 imageUrl = item.links[0].href;
                }

                let title = "Sin título";
                if (item.data && item.data[0] && item.data[0].title) {
                 title = item.data[0].title;
                }

                let description = "Sin descripción";
                if (item.data && item.data[0] && item.data[0].description) {
                  description = item.data[0].description;
                }

                let dateCreated = "Fecha desconocida";
                if (item.data && item.data[0] && item.data[0].date_created) {
                 dateCreated = item.data[0].date_created;
                }
  
              // Crear elementos HTML para mostrar la imagen y la información
              const Imagen = document.createElement("img");
              Imagen.src = imageUrl;
  
              const titulo = document.createElement("h2");
              titulo.textContent = title;
  
              const descripcion = document.createElement("p");
              descripcion.textContent = description;
  
              const fecha = document.createElement("p");
              fecha.textContent = `Fecha de creación: ${dateCreated}`;
  
              // Crear un contenedor para cada resultado
              const resultadoElement = document.createElement("div");
              resultadoElement.appendChild(Imagen);
              resultadoElement.appendChild(titulo);
              resultadoElement.appendChild(descripcion);
              resultadoElement.appendChild(fecha);
  
              // Agregar el contenedor del resultado al contenedor principal
              contenedor.appendChild(resultadoElement);
            });
          } else {
            // Si no se encontraron resultados, muestra un mensaje
            contenedor.innerHTML = "<p>No se encontraron resultados.</p>";
          }
        })
        .catch((error) => {
          // Maneja errores de la solicitud
          console.error("Error al buscar imágenes:", error);
          contenedor.innerHTML = "<p>Ocurrió un error al buscar imágenes.</p>";
        });
    });
  });
  