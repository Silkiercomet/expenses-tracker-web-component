// 1. Arreglo en el scope global para almacenar los datos del gráfico.
let chartData = [];

/**
 * Función asíncrona para obtener los datos desde data.json.
 * Utiliza fetch para leer el archivo local, convierte la respuesta a JSON
 * y almacena el resultado en la variable global `chartData`.
 */
async function fetchData() {
  try {
    // Hacemos la petición al archivo local data.json
    const response = await fetch('./data.json');

    // Verificamos si la respuesta es exitosa
    if (!response.ok) {
      throw new Error(`Error HTTP! estado: ${response.status}`);
    }

    // Convertimos la respuesta a JSON y la asignamos a nuestra variable global
    chartData = await response.json();

    console.log('Datos cargados exitosamente en chartData:', chartData);
  } catch (error) {
    console.error('No se pudieron obtener los datos:', error);
  }
}

/**
 * Renderiza los datos de chartData en la tabla y en la lista del gráfico.
 */
function renderData() {
  const tableBody = document.querySelector('.add-body');
  const chartList = document.querySelector('.chart_list');

  // Limpiamos el contenido previo para evitar duplicados si se llama varias veces.
  tableBody.innerHTML = '';
  chartList.innerHTML = '';

  chartData.forEach(item => {
    // 1. Lógica para agregar datos a la tabla (tbody)
    const tableRow = document.createElement('tr');
    tableRow.innerHTML = `
      <td>${item.day}</td>
      <td>${item.amount}</td>
    `;
    tableBody.appendChild(tableRow);

    // 2. Lógica para crear y agregar elementos a la lista del gráfico (ul)
    const listItem = document.createElement('li');
    // El alto de la barra será el monto multiplicado por 3 (para mejor visualización) + 30px
    const barHeight = item.amount * 3 + 30; 
    listItem.innerHTML = `
      <div style="height: ${barHeight}px;"></div>
      <span>${item.day}</span>
    `;
    chartList.appendChild(listItem);
  });
}

// Llamamos a la función para que se ejecute al cargar el script.
fetchData().then(() => {
  // Una vez que los datos se han cargado, los renderizamos.
  renderData();
});
