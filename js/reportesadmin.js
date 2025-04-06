// Cambia entre pestañas: Facturas / Notas
function mostrarSeccion(id) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    event.target.classList.add('active');
  }
  
  // Muestra el modal con detalle de la factura o nota
  function mostrarDetalle(consecutivo, cliente, fecha, valor, usuario, estado) {
    document.getElementById('modalDetalle').style.display = 'block';
    document.getElementById('dConsecutivo').innerText = consecutivo;
    document.getElementById('dCliente').innerText = cliente;
    document.getElementById('dFecha').innerText = fecha;
    document.getElementById('dValor').innerText = valor;
    document.getElementById('dUsuario').innerText = usuario;
    document.getElementById('dEstado').innerText = estado;
  }
  
  // Exporta la tabla seleccionada a Excel
  function exportarExcel(idTabla) {
    let tabla = document.getElementById(idTabla).outerHTML;
    let blob = new Blob(['\uFEFF' + tabla], { type: 'application/vnd.ms-excel' });
    let url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = idTabla + '.xls';
    a.click();
  }
  