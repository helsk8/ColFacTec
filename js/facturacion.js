// Referencia al modal
const modalDetalle = document.getElementById("modalDetalle");

// Botones "Ver Detalle"
const botonesDetalle = document.querySelectorAll(".actions button:first-child");

// Muestra los datos del detalle al hacer clic
botonesDetalle.forEach(btn => {
  btn.addEventListener("click", (e) => {
    const fila = e.target.closest("tr");

    const consecutivo = fila.children[0].innerText;
    const cliente = fila.children[1].innerText;
    const fecha = fila.children[2].innerText;
    const valor = fila.children[3].innerText;
    const estado = fila.children[4].innerText;

    const contenido = `
      <p><strong>Consecutivo:</strong> ${consecutivo}</p>
      <p><strong>Cliente:</strong> ${cliente}</p>
      <p><strong>Fecha:</strong> ${fecha}</p>
      <p><strong>Valor:</strong> ${valor}</p>
      <p><strong>Estado DIAN:</strong> ${estado}</p>
    `;

    document.getElementById("contenidoDetalle").innerHTML = contenido;
    modalDetalle.style.display = "block";
  });
});

// Función para cerrar el modal
function cerrarDetalle() {
  modalDetalle.style.display = "none";
}

// Botones "Reenviar"
const botonesReenviar = document.querySelectorAll(".actions button:nth-child(2)");

botonesReenviar.forEach(btn => {
  btn.addEventListener("click", (e) => {
    const fila = e.target.closest("tr");
    const consecutivo = fila.children[0].innerText;

    const confirmacion = confirm(`¿Deseas reenviar la factura ${consecutivo} a la DIAN?`);
    if (confirmacion) {
      alert(`📤 La factura ${consecutivo} ha sido reenviada correctamente`);
    }
  });
});

// Función simulada para botón "+ Facturar"
function facturarMockup() {
  alert("🧾 Aquí se abriría el formulario para crear una nueva factura (simulado).");
}
