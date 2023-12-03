// window.addEventListener("load", init);

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

function init() {
  let listaDugmica = document.querySelectorAll(".shop-item-button");
  listaDugmica.forEach((elem) => {
    elem.addEventListener("click", dodajUKorpu);
  });
}

function dodajUKorpu() {
  //   console.log(this.parentElement.parentElement);
  let roditelj = this.parentElement.parentElement;
  let naslov = roditelj.querySelector(".shop-item-title").textContent;
  let slika = roditelj.querySelector(".shop-item-image").src;
  let cena = roditelj.querySelector(".shop-item-price").textContent;
  renderCard(slika, cena, naslov);
  azurirajTotal();
}

function renderCard(slika, cena, naslov) {
  let kontejner = document.querySelector(".cart-items");
  let row = document.createElement("div");
  row.classList.add("cart-row");

  let naslovKon = kontejner.querySelectorAll(".cart-item-title");
  for (let i = 0; i < naslovKon.length; i++) {
    if (naslovKon[i].textContent == naslov) {
      let roditelj = naslovKon[i].parentElement.parentElement;
      //   console.log(parseInt(roditelj.querySelector(".cart-quantity-input").value));
      roditelj.querySelector(".cart-quantity-input").value =
        parseInt(roditelj.querySelector(".cart-quantity-input").value) + 1;
      return;
    }
  }

  let ispis = `<div class="cart-item cart-column">
  <img src="${slika}" class="cart-item-image" alt="${naslov}" />
  <span class="cart-item-title">${naslov}</span>
</div>
<div class="cart-price cart-column"><span>${cena}</span></div>
<div class="cart-quantity cart-column">
  <input type="number" min="1" max="10" value= "1" class="cart-quantity-input" />
  <button class="btn btn-danger">Delete</button>
</div>`;
  row.innerHTML = ispis;
  kontejner.appendChild(row);
  row.querySelector(".btn-danger").addEventListener("click", brisi);
  document.querySelector(".cart-quantity-input").addEventListener(() => {

  })
}

function brisi() {
  let element = this.parentElement.parentElement;
  element.remove();
  azurirajTotal();
}

function azurirajTotal() {
  let total = document.querySelector(".cart-total-price");
  let suma = 0;
  let cartItems = document.querySelector(".cart-items");
  let rows = cartItems.querySelectorAll(".cart-row");
  rows.forEach((elem) => {
    let cena = elem.querySelector(".cart-price").textContent.substring(1);
    let kolicina = elem.querySelector(".cart-quantity-input").value;
    suma = suma + kolicina * cena;
    total.textContent = "€" + suma.toFixed(2);
  });
}
