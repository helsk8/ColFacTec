// Asigna un número de consecutivo inicial para la nota crédito
let consecutivo = 1001;
document.getElementById("consecutivoNota").value = `NC-${consecutivo}`;

/**
 * Agrega una nueva fila a la tabla de productos afectados
 */
function agregarFila(codigo = '', nombre = '', cantidad = '', precio = '') {
  const tbody = document.querySelector("#tabla-nota tbody");
  const fila = document.createElement("tr");

  const subtotal = parseFloat(cantidad) * parseFloat(precio) || 0;

  // Estructura HTML de la fila
  fila.innerHTML = `
    <td><input type="text" value="${codigo}"></td>
    <td><input type="text" value="${nombre}"></td>
    <td><input type="number" class="cantidad" value="${cantidad}" oninput="calcularTotalNota()"></td>
    <td><input type="number" class="precio" value="${precio}" oninput="calcularTotalNota()"></td>
    <td><input type="text" class="subtotal" value="${subtotal.toFixed(2)}" readonly></td>
    <td><button type="button" onclick="eliminarFila(this)">❌</button></td>
  `;

  tbody.appendChild(fila);
  calcularTotalNota();
}

/**
 * Elimina una fila de la tabla de productos
 */
function eliminarFila(btn) {
  btn.closest("tr").remove();
  calcularTotalNota();
}

/**
 * Calcula el total de la nota y lo convierte a texto
 */
function calcularTotalNota() {
  let total = 0;

  document.querySelectorAll("#tabla-nota tbody tr").forEach(row => {
    const cantidad = parseFloat(row.querySelector(".cantidad")?.value || 0);
    const precio = parseFloat(row.querySelector(".precio")?.value || 0);
    const subtotal = cantidad * precio;

    row.querySelector(".subtotal").value = subtotal.toFixed(2);
    total += subtotal;
  });

  const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  });

  // Mostrar el total en letras
  document.getElementById("valorLetras").value = `VALOR: ${formatter.format(total).replace('$','').trim()} PESOS COLOMBIANOS`;
}

/**
 * Carga una factura simulada si el ID coincide
 */
function cargarFactura() {
  const id = document.getElementById("facturaId").value;

  if (id === 'FV-123456') {
    document.getElementById("clienteNombre").value = 'Ana Martínez';
    document.getElementById("clienteEmail").value = 'ana@example.com';

    // Simulación de productos relacionados con la factura
    const productos = [
      { codigo: 'P010', nombre: 'Ultrasonido', cantidad: 1, precio: 200000 },
      { codigo: 'P015', nombre: 'Consulta Ginecológica', cantidad: 2, precio: 120000 }
    ];

    const tbody = document.querySelector("#tabla-nota tbody");
    tbody.innerHTML = ''; // Limpiar contenido previo

    productos.forEach(p => agregarFila(p.codigo, p.nombre, p.cantidad, p.precio));
  }
}
