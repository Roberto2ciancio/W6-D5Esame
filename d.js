const getEvents = function () {
  const eventsURL = "https://striveschool-api.herokuapp.com/api/product/";

  fetch(eventsURL, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMWViMTM4MzRiZjAwMTUwMDA2ZmIiLCJpYXQiOjE3NDI1NDQ1NjEsImV4cCI6MTc0Mzc1NDE2MX0.7UcSxPjkr8flf6Hi2Ryw39w0BpJh3l8PDHPPVXYdG00",
    },
    method: "GET",
  });
  const productsContainer = document.getElementById("products-container");

  fetch(eventsURL, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMWViMTM4MzRiZjAwMTUwMDA2ZmIiLCJpYXQiOjE3NDI1NDQ1NjEsImV4cCI6MTc0Mzc1NDE2MX0.7UcSxPjkr8flf6Hi2Ryw39w0BpJh3l8PDHPPVXYdG00",
    },
    method: "GET",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nel recupero dei dati");
      }
    })
    .then((data) => {
      console.log("DATI RICEVUTI DAL SERVER:", data);
      const row = document.getElementById("Weapon-row");

      data.forEach((weapon) => {
        row.innerHTML =
          row.innerHTML +
          `
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
      console.error("Errore nel caricamento dei dati", error);
    });
};
getEvent();
