import { dataSeries } from './data.js';
var DetalleTbody = document.getElementById('detalle');
var seriesTbody = document.getElementById('series');
var promedioTemporadas = document.getElementById("promedio-temporadas");
renderSeriesInTable(dataSeries);
promedioTemporadas.innerHTML = "".concat(getPromedioTemporadas(dataSeries));
function renderSeriesInTable(series) {
    console.log('Desplegando series');
    seriesTbody.innerHTML = ''; // Limpiar contenido previo
    series.forEach(function (serie) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "\n      <td>".concat(serie.numero, "</td>\n      <td><a href=\"#\" class=\"serie-link\" data-id=\"").concat(serie.numero, "\">").concat(serie.nombre, "</a></td>\n      <td>").concat(serie.plataforma, "</td>\n      <td>").concat(serie.temporadas, "</td>");
        seriesTbody.appendChild(trElement);
    });
    // Ahora que la tabla está completamente generada, añadimos los eventos
    addEventosEnlaces();
}
function renderDetallesInCard(serieSeleccionada) {
    console.log('Desplegando detalles de la serie');
    DetalleTbody.innerHTML = " \n      <div class=\"col-md-6\"> \n        <div class=\"card w-100\">\n          <img class=\"card-img-top\" src=".concat(serieSeleccionada.imagen, " alt=\"Card image cap\">\n          <div class=\"card-body\">\n            <h5 class=\"card-title\">").concat(serieSeleccionada.nombre, "</h5>\n            <p class=\"card-text\">").concat(serieSeleccionada.descripcion, "</p>\n            <button id=\"trailer-btn\" class=\"btn btn-primary\" data-url=\"").concat(serieSeleccionada.trailer, "\">\n              Ver trailer\n            </button>\n          </div>\n        </div>\n      </div>");
    var trailerBtn = document.getElementById('trailer-btn');
    trailerBtn === null || trailerBtn === void 0 ? void 0 : trailerBtn.addEventListener('click', function () {
        var url = trailerBtn.getAttribute('data-url');
        if (url) {
            window.open(url, '_blank'); // Abrir el enlace en una nueva pestaña
        }
    });
}
function getPromedioTemporadas(series) {
    var totalTemporadas = 0;
    series.forEach(function (serie) { return totalTemporadas = totalTemporadas + serie.temporadas; });
    return parseFloat((totalTemporadas / series.length).toFixed(2));
}
function addEventosEnlaces() {
    var serieLinks = document.querySelectorAll('.serie-link'); // Capturamos los enlaces después de que se han renderizado
    serieLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            console.log('Se ha hecho click en un enlace de serie');
            event.preventDefault();
            var serieId = parseInt(event.target.getAttribute('data-id'));
            var selectedSerie = findSerieById(serieId);
            if (selectedSerie) {
                renderDetallesInCard(selectedSerie);
            }
        });
    });
}
function findSerieById(id) {
    for (var i = 0; i < dataSeries.length; i++) {
        if (dataSeries[i].numero === id) {
            return dataSeries[i];
        }
    }
    return undefined;
}
