// Inicializar el gráfico de barras para mostrar las ventas por mes
const ctx = document.getElementById('graficoVentas').getContext('2d');
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril'],
    datasets: [{
      label: 'Total Ventas',
      data: [500000, 300000, 750000, 200000],
      backgroundColor: '#418dcc'
    }]
  },
  options: {
    scales: {
      y: { beginAtZero: true }
    }
  }
});

// Abrir el modal con detalle de la factura o nota crédito
function verDetalle(consecutivo) {
  const modal = document.getElementById('modalDetalle');
  const contenido = document.getElementById('contenidoDetalle');

  // Datos de ejemplo (simulados)
  const datos = {
    'FV-123456': {
      tipo: 'Factura',
      cliente: 'Ana Martínez',
      nit: '900123456',
      fecha: '2025-04-03',
      valor: '$440.000',
      estado: 'Procesado',
      productos: [
        { nombre: 'Producto A', cantidad: 2, precio: '$100.000' },
        { nombre: 'Producto B', cantidad: 1, precio: '$240.000' }
      ]
    },
    'NC-1001': {
      tipo: 'Nota Crédito',
      cliente: 'Ana Martínez',
      nit: '900123456',
      fecha: '2025-04-04',
      valor: '$120.000',
      estado: 'Aprobada',
      productos: [
        { nombre: 'Producto B', cantidad: 1, precio: '$120.000' }
      ]
    }
  };

  const doc = datos[consecutivo];

  if (!doc) {
    contenido.innerHTML = 'No se encontraron datos del documento.';
  } else {
    let html = `
      <strong>Documento:</strong> ${consecutivo}<br>
      <strong>Tipo:</strong> ${doc.tipo}<br>
      <strong>Cliente:</strong> ${doc.cliente}<br>
      <strong>NIT:</strong> ${doc.nit}<br>
      <strong>Fecha:</strong> ${doc.fecha}<br>
      <strong>Valor:</strong> ${doc.valor}<br>
      <strong>Estado:</strong> ${doc.estado}<br>
      <strong>Productos:</strong><ul>
    `;

    doc.productos.forEach(p => {
      html += `<li>${p.nombre} - ${p.cantidad} x ${p.precio}</li>`;
    });

    html += '</ul>';
    contenido.innerHTML = html;
  }

  modal.style.display = 'block';
}

// Cierra el modal
function cerrarModal() {
  document.getElementById('modalDetalle').style.display = 'none';
}

// Exporta la tabla HTML como PDF utilizando jsPDF
function exportarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text('Reporte de Facturas y Notas Crédito', 10, 10);
  doc.autoTable({ html: '#tabla-reportes' });
  doc.save('reporte.pdf');
}

// Exporta la tabla HTML como archivo Excel
function exportarExcel() {
  const table = document.getElementById('tabla-reportes');
  const wb = XLSX.utils.table_to_book(table, { sheet: 'Reporte' });
  XLSX.writeFile(wb, 'reporte.xlsx');
}
