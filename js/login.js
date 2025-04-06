// Espera a que todo el DOM esté cargado antes de ejecutar el script
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form"); // Referencia al formulario de inicio de sesión

  // Evento que se activa cuando el usuario envía el formulario
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Previene que el formulario recargue la página

    // Obtiene y limpia los datos ingresados por el usuario
    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value.trim();

    // Recupera todos los usuarios registrados desde el localStorage
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Busca un usuario que coincida con el correo y contraseña ingresados
    const usuario = usuarios.find(
      (u) => u.correo === correo && u.password === password
    );

    // Si se encuentra un usuario válido...
    if (usuario) {
      // Guarda los datos del usuario que inició sesión
      localStorage.setItem("usuario_activo", JSON.stringify(usuario));

      // Redirige a la vista adecuada según su rol
      if (usuario.rol === "Administrador") {
        window.location.href = "dashboard_admin.html";
      } else {
        window.location.href = "dashboard_usuario.html";
      }
    } else {
      // Si no hay coincidencia, muestra un mensaje de error
      alert("Correo o contraseña incorrectos");
    }
  });
});
