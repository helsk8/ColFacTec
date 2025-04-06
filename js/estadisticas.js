// Esperar a que el contenido del DOM esté cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", () => {
    // === GRAFICO DONUT: Distribución General de documentos ===
    const ctx = document.getElementById('graficoUsuario').getContext('2d');
  
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Facturas', 'Notas Crédito', 'Canceladas', 'En proceso'],
        datasets: [{
          data: [8, 2, 1, 4], // Valores simulados de ejemplo
          backgroundColor: [
            '#1e76bc', // Azul primario
            '#418dcc', // Azul claro
            '#9aa1a6', // Gris
            '#f4b400'  // Amarillo
          ],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#38444b' // Color oscuro para las etiquetas
            }
          }
        }
      }
    });
  
    // === GRAFICO BARRAS: Evolución mensual de documentos ===
    const ctxMensual = document.getElementById('graficoMensual').getContext('2d');
  
    new Chart(ctxMensual, {
      type: 'bar',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril'],
        datasets: [
          {
            label: 'Facturas',
            data: [2, 1, 3, 2],
            backgroundColor: '#1e76bc' // Azul primario
          },
          {
            label: 'Notas Crédito',
            data: [0, 1, 0, 1],
            backgroundColor: '#418dcc' // Azul claro
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#38444b' // Color oscuro para las leyendas
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#38444b' // Eje X: etiquetas oscuras
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: '#38444b' // Eje Y: etiquetas oscuras
            }
          }
        }
      }
    });
  });
  