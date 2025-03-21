const printDateInFooter = function () {
  const footerSpan = document.getElementById("year");
  footerSpan.innerText = new Date().getFullYear();
};

printDateInFooter();

const URLparameters = new URLSearchParams(location.search);
const weaponId = URLparameters.get("id");
const eventsURL = "https://striveschool-api.herokuapp.com/api/product/";
const getWeaponDetails = function () {
  fetch(eventsURL + "/" + weaponId, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMWViMTM4MzRiZjAwMTUwMDA2ZmIiLCJpYXQiOjE3NDI1NDQ1NjEsImV4cCI6MTc0Mzc1NDE2MX0.7UcSxPjkr8flf6Hi2Ryw39w0BpJh3l8PDHPPVXYdG00",
    },
  })
    .then((response) => {
      console.log("response", response);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nel recupero dei dettagli");
      }
    })
    .then((data) => {
      console.log("DETTAGLI DEL ARMA", data);

      const nameInput = document.getElementById("name");
      const descriptionInput = document.getElementById("description");
      const brandInput = document.getElementById("brand");
      const imageUrlInput = document.getElementById("imageUrl");
      const priceInput = document.getElementById("price");

      nameInput.innerText = data.name;
      descriptionInput.innerText = data.description;
      brandInput.innerText = data.brand;
      imageUrlInput.innerText = data.imageUrl;
      priceInput.innerText = data.price;
    })
    .catch((err) => {
      console.log("ERRORE NEL RECUPERO DATI del arama", err);
    });
};

const editWeapon = function () {
  location.assign("./backoffice.html?id=" + weaponId);
};

const deleteWeapon = function () {
  fetch(eventsURL + "/" + weaponId, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        alert("Arma eliminata non ti troveranno!");

        location.assign("./shop.html");
      } else {
        throw new Error("eliminazione NON andata a buon fine!");
      }
    })
    .catch((err) => {
      console.log("ERRORE NELLA CANCELLAZIONE", err);
    });
};

getWeaponDetails();
