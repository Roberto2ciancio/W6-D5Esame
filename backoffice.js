const printDateInFooter = function () {
  const footerSpan = document.getElementById("year");
  footerSpan.innerText = new Date().getFullYear();
};
printDateInFooter();

class Weapon {
  constructor(_name, _description, _brand, _imageUrl, _price) {
    this.name = _name;
    this.description = _description;
    this.brand = _brand;
    this.imageUrl = _imageUrl;
    this.price = _price;
  }
}

const URLparameters = new URLSearchParams(location.search);
const eventId = URLparameters.get("id");

const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const brandInput = document.getElementById("brand");
const imageUrlInput = document.getElementById("imageUrl");
const priceInput = document.getElementById("price");

const eventsUrl = "https://striveschool-api.herokuapp.com/api/product/";

if (eventId) {
  fetch(eventsUrl + eventId, {})
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nella fetch");
      }
    })
    .then((data) => {
      nameInput.value = data.name;
      descriptionInput.value = data.description;
      brandInput.value = data.brand;
      imageUrlInput.value = data.imageUrl;
      priceInput.value = data.price;
    })
    .catch((err) => console.log("ERRORE DEL RIPOPOLAMENTO DEL FORM", err));
}

const form = document.getElementById("event-form");
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const weapon = new Weapon(
    nameInput.value,
    descriptionInput.value,
    brandInput.value,
    imageUrlInput.value,
    priceInput.value
  );

  console.log("Weapon", weapon);

  let methodToUse;
  let URLtoUse;

  if (eventId) {
    methodToUse = "PUT";
    URLtoUse = eventsUrl + "/" + eventId;
  } else {
    methodToUse = "POST";
    URLtoUse = eventsUrl;
  }

  fetch(URLtoUse, {
    method: methodToUse,
    body: JSON.stringify(weapon),
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMWViMTM4MzRiZjAwMTUwMDA2ZmIiLCJpYXQiOjE3NDI1NDQ1NjEsImV4cCI6MTc0Mzc1NDE2MX0.7UcSxPjkr8flf6Hi2Ryw39w0BpJh3l8PDHPPVXYdG00",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("SALVATAGGIO COMPLETATO!");
        form.reset();
      } else {
        throw new Error("Ricevuta response non ok dal backend");
      }
    })
    .catch((err) => {
      console.log("Errore nel salvataggio!", err);
    });
});
