// window.addEventListener("load", initialize);

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", initialize);
} else {
  initialize();
}

function initialize() {
  let buttonList = document.querySelectorAll(".shop-item-button");
  buttonList.forEach((elem) => {
    elem.addEventListener("click", addToCart);
  });
}

function addToCart() {
  let parent = this.parentElement.parentElement;
  let title = parent.querySelector(".shop-item-title").textContent;
  let image = parent.querySelector(".shop-item-image").src;
  let price = parent.querySelector(".shop-item-price").textContent;

  renderCard(image, price, title);
  updateTotal(); // Ažurirajte total odmah nakon dodavanja
}

function renderCard(image, price, title) {
  let container = document.querySelector(".cart-items");
  let row = document.createElement("div");
  row.classList.add("cart-row");

  let titleContainer = container.querySelectorAll(".cart-item-title");
  for (let i = 0; i < titleContainer.length; i++) {
    if (titleContainer[i].textContent == title) {
      let parent = titleContainer[i].parentElement.parentElement;
      parent.querySelector(".cart-quantity-input").value =
        parseInt(parent.querySelector(".cart-quantity-input").value) + 1;
      updateTotal(); // Ažurirajte total ovde kad se poveća količina
      return;
    }
  }

  let output = `<div class="cart-item cart-column">
    <img src="${image}" class="cart-item-image" alt="${title}" />
    <span class="cart-item-title">${title}</span>
  </div>
  <div class="cart-price cart-column"><span>${price}</span></div>
  <div class="cart-quantity cart-column">
    <input type="number" min="1" max="10" value="1" class="cart-quantity-input" />
    <button class="btn btn-danger">Delete</button>
  </div>`;

  row.innerHTML = output;
  container.appendChild(row);

  // Dodajte događaj za praćenje promene količine
  row.querySelector(".btn-danger").addEventListener("click", deleteItem);
  row.querySelector(".cart-quantity-input").addEventListener("input", updateTotal);
}

function deleteItem() {
  let element = this.parentElement.parentElement;
  element.remove();
  updateTotal(); // Ažurirajte total nakon brisanja
}

function updateTotal() {
  let total = document.querySelector(".cart-total-price");
  let sum = 0;
  let cartItems = document.querySelector(".cart-items");
  let rows = cartItems.querySelectorAll(".cart-row");
  rows.forEach((elem) => {
    let price = elem.querySelector(".cart-price").textContent.substring(1);
    let quantity = elem.querySelector(".cart-quantity-input").value;
    sum += quantity * price;
  });
  total.textContent = "€" + sum.toFixed(2); // Ažurirajte ukupnu cenu
}
