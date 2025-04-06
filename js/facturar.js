window.onload = function () {
    const usuario = JSON.parse(localStorage.getItem("usuario_activo"));
    if (!usuario) {
      alert("Debes iniciar sesión primero.");
      window.location.href = "login.html";
      return;
    }
  
    if (document.querySelectorAll("#tabla-productos tbody tr").length === 0) {
      agregarFila();
    }
  };
  
  function agregarFila() {
    const tabla = document.getElementById("tabla-productos").querySelector("tbody");
    const nuevaFila = tabla.insertRow();
    nuevaFila.innerHTML = `
      <td><input type="text" name="codigo[]"></td>
      <td><input type="text" name="nombre[]"></td>
      <td><input type="number" name="cantidad[]" oninput="calcularSubtotal(this)"></td>
      <td><input type="number" name="precio[]" oninput="calcularSubtotal(this)"></td>
      <td><input type="number" name="descuento[]" oninput="calcularSubtotal(this)"></td>
      <td><input type="text" name="iva[]" value="19%"></td>
      <td><input type="number" name="subtotal[]" readonly></td>
      <td><button type="button" onclick="eliminarFila(this)">❌</button></td>
    `;
  }
  
  function eliminarFila(boton) {
    boton.closest("tr").remove();
    calcularTotales();
  }
  
  function calcularSubtotal(input) {
    const fila = input.closest("tr");
    const cantidad = parseFloat(fila.querySelector('input[name="cantidad[]"]').value) || 0;
    const precio = parseFloat(fila.querySelector('input[name="precio[]"]').value) || 0;
    const descuento = parseFloat(fila.querySelector('input[name="descuento[]"]').value) || 0;
    const subtotal = (cantidad * precio) - descuento;
    fila.querySelector('input[name="subtotal[]"]').value = subtotal.toFixed(2);
    calcularTotales();
  }
  
  function calcularTotales() {
    let subtotalGlobal = 0;
    document.querySelectorAll('input[name="subtotal[]"]').forEach(input => {
      subtotalGlobal += parseFloat(input.value) || 0;
    });
    const iva = subtotalGlobal * 0.19;
    const total = subtotalGlobal + iva;
  
    document.getElementById("subtotalGlobal").value = subtotalGlobal.toFixed(2);
    document.getElementById("ivaGlobal").value = iva.toFixed(2);
    document.getElementById("totalGlobal").value = total.toFixed(2);
    document.getElementById("valorEnLetras").value = numeroALetras(total);
  }
  
  function numeroALetras(num) {
    const formatter = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    });
    const partes = formatter.format(num).replace('$', '').trim();
    return `VALOR TOTAL: ${partes} PESOS COLOMBIANOS`;
  }
  
  document.getElementById("form-factura").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const usuario = JSON.parse(localStorage.getItem("usuario_activo"));
    const facturas = JSON.parse(localStorage.getItem("facturas") || "[]");
  
    const datosFactura = {
      fecha: document.getElementById("fechaEmision").value,
      forma_pago: document.getElementById("formaPago").value,
      vencimiento: document.getElementById("fechaVencimiento").value,
      tipo_doc: document.getElementById("tipoDocumento").value,
      id_cliente: document.getElementById("identificacion").value,
      razon_social: document.getElementById("razonSocial").value,
      direccion: document.getElementById("direccion").value,
      email: document.getElementById("email").value,
      telefono: document.getElementById("telefono").value,
      observaciones: document.getElementById("observaciones").value,
      productos: [],
      subtotal: document.getElementById("subtotalGlobal").value,
      iva: document.getElementById("ivaGlobal").value,
      total: document.getElementById("totalGlobal").value,
      valor_letras: document.getElementById("valorEnLetras").value,
      usuario_email: usuario.correo,
      consecutivo: generarConsecutivo(facturas.length + 1),
    };
  
    // Validar datos básicos
    if (
      !datosFactura.fecha ||
      !datosFactura.razon_social ||
      !datosFactura.total ||
      isNaN(parseFloat(datosFactura.total))
    ) {
      alert("Completa todos los campos antes de generar la factura.");
      return;
    }
  
    // Guardar productos
    document.querySelectorAll("#tabla-productos tbody tr").forEach(fila => {
      const nombre = fila.querySelector('input[name="nombre[]"]').value;
      const cantidad = fila.querySelector('input[name="cantidad[]"]').value;
      const precio = fila.querySelector('input[name="precio[]"]').value;
  
      if (nombre && cantidad && precio) {
        datosFactura.productos.push({
          codigo: fila.querySelector('input[name="codigo[]"]').value,
          nombre,
          cantidad,
          precio,
          descuento: fila.querySelector('input[name="descuento[]"]').value,
          iva: fila.querySelector('input[name="iva[]"]').value,
          subtotal: fila.querySelector('input[name="subtotal[]"]').value,
        });
      }
    });
  
    if (datosFactura.productos.length === 0) {
      alert("Debe agregar al menos un producto válido.");
      return;
    }
  
    // Guardar y generar PDF
    facturas.push(datosFactura);
    localStorage.setItem("facturas", JSON.stringify(facturas));
    console.log("Factura guardada:", datosFactura);
    document.querySelector("form button[type='submit']").disabled = true;
    generarPDF(datosFactura);
  });
  
  function generarConsecutivo(numero) {
    return `FV-${String(numero).padStart(6, '0')}`;
  }
  
  function generarPDF(factura) {
    const element = document.createElement("div");
    element.style.padding = "20px";
    element.innerHTML = `
      <h2 style="color:#1e76bc;">Factura Electrónica</h2>
      <p><strong>Consecutivo:</strong> ${factura.consecutivo}</p>
      <p><strong>Cliente:</strong> ${factura.razon_social} - ${factura.id_cliente}</p>
      <p><strong>Dirección:</strong> ${factura.direccion}</p>
      <p><strong>Correo:</strong> ${factura.email}</p>
      <p><strong>Teléfono:</strong> ${factura.telefono}</p>
      <p><strong>Fecha:</strong> ${factura.fecha}</p>
      <h3>Productos:</h3>
      <ul>
        ${factura.productos.map(p => `
          <li>${p.nombre} x ${p.cantidad} - $${p.precio} = $${p.subtotal}</li>
        `).join('')}
      </ul>
      <p><strong>Subtotal:</strong> $${factura.subtotal}</p>
      <p><strong>IVA:</strong> $${factura.iva}</p>
      <p><strong>Total:</strong> $${factura.total}</p>
      <p><strong>Valor en letras:</strong> ${factura.valor_letras}</p>
    `;
  
    html2pdf().set({
      margin: 10,
      filename: `${factura.consecutivo}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }).from(element).save().then(() => {
      alert("Factura descargada con éxito.");
      window.location.href = "dashboard_usuario.html";
    });
  }
  