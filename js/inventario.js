function validarFormulario() {
    const inputs = document.querySelectorAll('#modal input');
    const codigos = Array.from(document.querySelectorAll('td:first-child')).map(td => td.textContent.trim().toUpperCase());
    const nuevoCodigo = document.getElementById('campoCodigo').value.trim().toUpperCase();
  
    for (let input of inputs) {
      if (!input.value.trim()) {
        alert('Por favor completa todos los campos.');
        return false;
      }
    }
  
    if (codigos.includes(nuevoCodigo)) {
      alert('⚠️ El código ya existe. Usa uno diferente.');
      return false;
    }
  
    alert('✅ Registro guardado correctamente (mockup).');
    cerrarModal();
    return true;
  }
  
  function abrirModal(titulo, codigo = '', nombre = '', categoria = '', precio = '', stock = '') {
    document.getElementById('modal-title').innerText = titulo;
    document.getElementById('campoCodigo').value = codigo;
    document.getElementById('campoNombre').value = nombre;
    document.getElementById('campoCategoria').value = categoria;
    document.getElementById('campoPrecio').value = precio;
    document.getElementById('campoStock').value = stock;
    document.getElementById('modal').style.display = 'block';
  }
  
  function cerrarModal() {
    document.getElementById('modal').style.display = 'none';
  }
  
  function mostrarSeccion(id) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    event.target.classList.add('active');
  }
  
  function confirmarEliminacion() {
    if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
      alert('🗑️ Registro eliminado correctamente (mockup).');
    }
  }
  