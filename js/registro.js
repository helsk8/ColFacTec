// Esperamos a que todo el contenido HTML esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  
  // Seleccionamos el formulario de registro
  const form = document.querySelector('form');

  // Cuando el usuario intenta enviar el formulario...
  form.addEventListener('submit', e => {
    e.preventDefault(); // Evitamos que se recargue la página por defecto

    // Capturamos los valores ingresados por el usuario
    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim().toLowerCase(); // Siempre en minúsculas para evitar duplicados por mayúsculas
    const password = document.getElementById('password').value;
    const confirmar = document.getElementById('confirmar').value;

    // Validamos que todos los campos estén llenos
    if (!nombre || !correo || !password || !confirmar) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    // Verificamos que la contraseña tenga al menos 6 caracteres
    if (password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    // Confirmamos que las contraseñas coincidan
    if (password !== confirmar) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    // Obtenemos la lista de usuarios desde el localStorage (si existe)
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Comprobamos si ya existe un usuario con el mismo correo
    const existe = usuarios.some(u => u.correo === correo);
    if (existe) {
      alert('Ya existe un usuario registrado con ese correo.');
      return;
    }

    // Si todo está bien, guardamos el nuevo usuario con el rol de 'Cliente'
    usuarios.push({ nombre, correo, password, rol: 'Cliente' });

    // Actualizamos la lista de usuarios en localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Avisamos que se registró correctamente y redirigimos al login
    alert('Usuario registrado exitosamente.');
    window.location.href = 'login.html';
  });
});
