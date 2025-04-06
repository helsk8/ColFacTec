// Se ejecuta cuando la página ha cargado completamente
window.onload = function () {
  // Obtenemos al usuario activo desde el localStorage
  const usuario = JSON.parse(localStorage.getItem("usuario_activo"));

  // Si no hay sesión activa, redirige al login
  if (!usuario) {
    alert("No tienes una sesión activa. Inicia sesión.");
    window.location.href = "login.html";
    return;
  }

  // Mostramos un saludo personalizado con el nombre del usuario
  document.getElementById("bienvenida").innerText = `Bienvenido, ${usuario.nombre}`;

  // Traemos las facturas y notas crédito desde el almacenamiento local
  const facturas = JSON.parse(localStorage.getItem("facturas") || "[]");
  const notasCredito = JSON.parse(localStorage.getItem("notas_credito") || "[]");

  // Filtramos solo las facturas que pertenecen al usuario logueado
  const facturasUsuario = facturas.filter(f => f.usuario_email === usuario.correo);

  // Filtramos las notas crédito también relacionadas con el usuario
  const notasUsuario = notasCredito.filter(nc => nc.usuario_email === usuario.correo);

  // Mostramos cuántas facturas ha generado este usuario
  document.getElementById("cantidadFacturas").innerText = `${facturasUsuario.length} documento(s) generados`;

  // Mostramos cuántas notas crédito están asociadas a esas facturas
  document.getElementById("cantidadNotas").innerText = `${notasUsuario.length} documento(s) registrados`;

  // Mostramos el número y valor de la última factura generada
  if (facturasUsuario.length > 0) {
    const ultima = facturasUsuario[facturasUsuario.length - 1];
    document.getElementById("ultimaFactura").innerText = `${ultima.consecutivo} - $${parseFloat(ultima.total).toLocaleString("es-CO")}`;
  } else {
    document.getElementById("ultimaFactura").innerText = "No hay facturas";
  }

  // Calculamos el estado de cuenta: total de facturas menos total de notas crédito
  const totalFacturas = facturasUsuario.reduce((acc, f) => acc + parseFloat(f.total), 0);
  const totalNotas = notasUsuario.reduce((acc, n) => acc + parseFloat(n.total), 0);
  const saldoPendiente = totalFacturas - totalNotas;

  // Mostramos el saldo pendiente en formato moneda
  document.getElementById("estadoCuenta").innerText = `$${saldoPendiente.toLocaleString("es-CO")} pendiente`;
};

// Cierra la sesión eliminando al usuario activo y redirigiendo al login
function cerrarSesion() {
  localStorage.removeItem("usuario_activo");
  window.location.href = "login.html";
}
