// Obtener el modal y los botones de editar
const modal = document.getElementById("modalEditar");
const botonesEditar = document.querySelectorAll(".actions button:first-child");

// Mostrar el modal con la información de la fila seleccionada
botonesEditar.forEach(btn => {
  btn.addEventListener("click", (e) => {
    const fila = e.target.closest("tr");
    const nombre = fila.children[0].innerText;
    const correo = fila.children[1].innerText;
    const rol = fila.children[2].innerText;
    const estado = fila.children[3].innerText;

    // Llenar el formulario del modal con los datos del usuario
    document.getElementById("nombreUsuario").value = nombre;
    document.getElementById("correoUsuario").value = correo;
    document.getElementById("rolUsuario").value = rol;
    document.getElementById("estadoUsuario").value = estado;

    modal.style.display = "block";
  });
});

// Cierra el modal
function cerrarModal() {
  modal.style.display = "none";
}

// Simula guardar cambios y cierra el modal
function guardarCambios(e) {
  e.preventDefault();
  alert('✅ Cambios guardados correctamente (mockup)');
  cerrarModal();
}

// Eliminar usuario con confirmación
const botonesEliminar = document.querySelectorAll(".actions .delete");

botonesEliminar.forEach(btn => {
  btn.addEventListener("click", (e) => {
    const fila = e.target.closest("tr");
    const nombre = fila.children[0].innerText;
    const confirmacion = confirm(`¿Estás seguro de eliminar a ${nombre}?`);
    if (confirmacion) {
      fila.remove();
      alert('🗑️ Usuario eliminado correctamente (mockup)');
    }
  });
});
