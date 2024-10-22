import { dataSeries } from './data.js';
import { Serie } from './serie.js';

let DetalleTbody: HTMLElement = document.getElementById('detalle')!;
let seriesTbody: HTMLElement = document.getElementById('series')!;
const promedioTemporadas: HTMLElement = document.getElementById("promedio-temporadas")!;

renderSeriesInTable(dataSeries);
promedioTemporadas.innerHTML = `${getPromedioTemporadas(dataSeries)}`;


function renderSeriesInTable(series: Serie[]): void {
  console.log('Desplegando series');
  seriesTbody.innerHTML = ''; // Limpiar contenido previo
  series.forEach((serie) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `
      <td>${serie.numero}</td>
      <td><a href="#" class="serie-link" data-id="${serie.numero}">${serie.nombre}</a></td>
      <td>${serie.plataforma}</td>
      <td>${serie.temporadas}</td>`;
    seriesTbody.appendChild(trElement);
  });

  // Ahora que la tabla está completamente generada, añadimos los eventos
  addEventosEnlaces();
}

function renderDetallesInCard(serieSeleccionada: Serie): void {
  console.log('Desplegando detalles de la serie');
  
  DetalleTbody.innerHTML = ` 
      <div class="col-md-6"> 
        <div class="card w-100">
          <img class="card-img-top" src=${serieSeleccionada.imagen} alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${serieSeleccionada.nombre}</h5>
            <p class="card-text">${serieSeleccionada.descripcion}</p>
            <button id="trailer-btn" class="btn btn-primary" data-url="${serieSeleccionada.trailer}">
              Ver trailer
            </button>
          </div>
        </div>
      </div>`;
    const trailerBtn = document.getElementById('trailer-btn');
  trailerBtn?.addEventListener('click', function() {
    const url = trailerBtn.getAttribute('data-url');
    if (url) {
      window.open(url, '_blank'); // Abrir el enlace en una nueva pestaña
    }
  });
}

function getPromedioTemporadas(series: Serie[]): number {
  let totalTemporadas: number = 0;
  series.forEach((serie) => totalTemporadas = totalTemporadas + serie.temporadas);
  return parseFloat((totalTemporadas / series.length).toFixed(2));
}

function addEventosEnlaces(){
  const serieLinks = document.querySelectorAll('.serie-link'); // Capturamos los enlaces después de que se han renderizado
  serieLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      console.log('Se ha hecho click en un enlace de serie');
      event.preventDefault();
      const serieId = parseInt((event.target as HTMLElement).getAttribute('data-id')!);
      const selectedSerie = findSerieById(serieId);
      if (selectedSerie) {
        renderDetallesInCard(selectedSerie);
      }
    });
  });
}

function findSerieById(id: number): Serie | undefined {
  for (let i = 0; i < dataSeries.length; i++) {
    if (dataSeries[i].numero === id) {
      return dataSeries[i];
    }
  }
  return undefined;
}

