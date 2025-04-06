// js/inicializarUsuarios.js
document.addEventListener('DOMContentLoaded', () => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  
    const adminExiste = usuarios.some(user => user.rol === 'Administrador' && user.correo === 'admin@colfactec.com');
  
    if (!adminExiste) {
      usuarios.push({
        nombre: 'Administrador',
        correo: 'admin@colfactec.com',
        password: 'admin123',
        rol: 'Administrador'
      });
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
  });
  