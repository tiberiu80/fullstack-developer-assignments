let cartInfo = [];
const PRICE = 10;
let currentUser = sessionStorage.getItem("user");

if (!currentUser) {
  alert("Please login ");
  window.location.href = "login.html";
}

let h1 = document.createElement("p");
let h1TagValue = document.createTextNode("Current user: " + currentUser);
h1.appendChild(h1TagValue);
document.getElementById("user").appendChild(h1);

function loadData() {
  let searchItem = document.getElementById("searchItem").value;

  fetch("https://dummyjson.com/recipes/search?q=" + searchItem)
    .then((res) => res.json())
    .then((result) => renderItems(result.recipes))
    .catch((error) => alert(error));
}
function showCartData() {
  //console.log(cartInfo.length)
  document.getElementById("menu-item").style.display = "none";
  document.getElementById("cart-item").style.display = "flex";
  let list = document.getElementById("cart-item");
  list.innerHTML = "";
  let total = 0;

  cartInfo.forEach((item, i) => {
    total = total + item.qty * item.price;

    list.innerHTML += `
            <div class="">
                <span>${item.name}</span>
                <div class="">
                    <button onclick="updateQty(${i},-1)">-</button>
            ${item.qty}
                    <button onclick="updateQty(${i},1)">+</button>
                    <span>${total}</span>
                </div>
            </div>
        `;
  });
}

function updateQty(index, change) {
  console.log("event called.");
  cartInfo[index].qty += change;
  console.log(cartInfo);
  showCartData();
}

function renderItems(items) {
  hideCart();
  document.getElementById("menu-item").style.display = "flex";
  document.getElementById("menu-item").innerHTML = "";
  items.forEach((menu) => {
    let div = document.createElement("div");

    div.className =
      "flex flex-col p-2 m-4 shadow-xl rounded-lg w-full sm:w-1/3 md:w-1/4";

    let img = document.createElement("img");
    img.src = menu.image;
    img.className = "m-4";

    let p = document.createElement("p");
    p.className = "text-center";
    p.innerText = menu.name;

    let price = document.createElement("p");
    price.className = "text-center mb-2";
    price.innerText = "Price: " + PRICE;

    let addToCart = document.createElement("button");
    addToCart.className =
      "w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition";
    addToCart.innerText = "Add to cart";

    div.appendChild(img);
    div.appendChild(p);
    div.appendChild(price);
    div.appendChild(addToCart);

    addToCart.addEventListener("click", () => {
      let result = cartInfo.find((cartItem) => cartItem.name == menu.name);
      if (result == undefined) {
        cartInfo.push({ name: menu.name, qty: 1, price: PRICE });
        let cartBadge = document.getElementById("cartBadge");
        cartBadge.innerHTML = cartInfo.length;

        alert("Item Added in cart");
      } else {
        alert("Item already present in cart");
      }
    });
    document.getElementById("menu-item").appendChild(div);
  });
}

function hideCart() {
  document.getElementById("cart-item").style.display = "none";
}

function logout() {
  sessionStorage.removeItem("user");
  window.location.href = "login.html";
}
