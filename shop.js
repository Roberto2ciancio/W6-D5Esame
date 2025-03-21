const printDateInFooter = function () {
  const footerSpan = document.getElementById("year");
  if (footerSpan) {
    footerSpan.innerText = new Date().getFullYear();
  }
};

printDateInFooter();

const getEvents = function () {
  const eventsURL = "https://striveschool-api.herokuapp.com/api/product/";

  fetch(eventsURL, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMWViMTM4MzRiZjAwMTUwMDA2ZmIiLCJpYXQiOjE3NDI1NDQ1NjEsImV4cCI6MTc0Mzc1NDE2MX0.7UcSxPjkr8flf6Hi2Ryw39w0BpJh3l8PDHPPVXYdG00",
    },
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Errore HTTP: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("DATI RICEVUTI DAL SERVER:", data);
      const row = document.getElementById("Weapon-row");

      if (!row) {
        console.error("Elemento con ID 'Weapon-row' non trovato.");
        return;
      }

      row.innerHTML = ""; // Svuota il contenitore prima di riempirlo

      data.forEach((weapon) => {
        row.innerHTML += `
            <div class="col col-12 col-lg-3 col-md-4 col-sm-6">
              <div class="card">
                <img src="${weapon.imageUrl}" class="card-img-top" alt="${weapon.name}" />
                <div class="card-body">
                  <h5 class="card-title">${weapon.name}</h5>
                  <p class="card-text">${weapon.description}</p>
                  <p class="card-text">Brand: ${weapon.brand}</p>
                  <p class="card-text">Prezzo: ${weapon.price}€</p>
                </div>
              </div>
            </div>
          `;
      });
    })
    .catch((error) => {
      console.error("Errore nel caricamento dei dati:", error);
    });
};

// Chiama la funzione quando la pagina è caricata
window.addEventListener("DOMContentLoaded", getEvents);
