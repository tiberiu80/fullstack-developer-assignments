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
  document.getElementById("menu-item").style.display = "none";
  document.getElementById("cart").style.display = "block";
  let cart = document.getElementById("cart");
  cart.innerHTML = "";

  if (cartInfo.length === 0) {
    cart.innerHTML = `
        <p class="text-3xl text-center">Cart is empty. You need to add items!</p>
    `;
    return;
  }

  let itemsList = document.createElement("div");
  itemsList.innerHTML = "";
  let cartTotal = 0;

  cartInfo.forEach((item, i) => {
    let itemTotal = 0;
    itemTotal = itemTotal + item.qty * item.price;
    cartTotal += itemTotal;

    itemsList.innerHTML += `
            <div class="flex justify-between bg-white mb-6">
                <div class="flex items-center">
                    <div class="w-30 h-30 mr-2">
                        <img class="w-30 mr-4" src="${item.image}">
                    </div>
                    <div>
                        <div>${item.name}</div>
                        <div class="italic text-blue-300">${item.cuisine}</div>
                        <div>Rating: ${item.rating}</div>
                    </div>
                </div>
                <div class="p-2 flex flex-col justify-center">
                    <div class="text-end">${itemTotal}$</div>
                    <div class="flex flex-nowrap items-center">
                        <button class="text-xl rounded-full px-2 mr-2 bg-gray-100 inline-block" onclick="updateQty(${i},-1)">-</button>
                        <span>${item.qty}</span>
                        <button class="text-xl rounded-full px-2 ml-2 bg-gray-100 inline-block" onclick="updateQty(${i},1)">+</button>
                    </div>
                </div>
            </div>
        `;
  });

  let cartFooter = document.createElement("div");
  cartFooter.className = "flex justify-between items-center";

  let cartTotalElement = document.createElement("span");
  cartTotalElement.className = "text-3xl font-bold";
  cartTotalElement.innerText = "Total: " + cartTotal + "$";

  let cartPayButton = document.createElement("button");
  cartPayButton.className =
    "bg-blue-600 text-white py-2 px-10 rounded-lg hover:bg-blue-700 transition";
  cartPayButton.innerText = "Pay";

  cartPayButton.addEventListener("click", () => {
    alert("Order successfully created!");
  });
  cartFooter.appendChild(cartTotalElement);
  cartFooter.appendChild(cartPayButton);

  cart.appendChild(itemsList);
  cart.appendChild(cartFooter);
}

function updateQty(index, change) {
  if (change === -1 && cartInfo[index].qty === 0) {
    return;
  }
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
      "flex flex-col p-2 m-4 shadow-xl rounded-lg w-full sm:w-1/3 md:w-1/4 relative";

    let img = document.createElement("img");
    img.src = menu.image;
    img.className = "m-4";

    let p = document.createElement("p");
    p.className = "text-center";
    p.innerText = menu.name;

    let price = document.createElement("p");
    price.className = "text-center mb-2";
    price.innerText = "Price: " + PRICE + "$";

    let cuisine = document.createElement("p");
    cuisine.className = "italic text-center text-blue-300";
    cuisine.innerText = menu.cuisine;

    let rating = document.createElement("div");
    rating.className =
      "absolute top-10 left-10 rounded-lg bg-black text-white px-2 flex items-center";
    let ratingImage = document.createElement("img");
    ratingImage.src = "assets/star.png";
    ratingImage.className = "w-7";
    let ratingText = document.createElement("span");
    ratingText.innerText = menu.rating;
    rating.appendChild(ratingImage);
    rating.appendChild(ratingText);

    let addToCart = document.createElement("button");
    addToCart.className =
      "w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition";
    addToCart.innerText = "Add to cart";

    div.appendChild(img);
    div.appendChild(p);
    div.appendChild(cuisine);
    div.appendChild(price);
    div.appendChild(addToCart);
    div.appendChild(rating);

    addToCart.addEventListener("click", () => {
      let result = cartInfo.find((cartItem) => cartItem.name == menu.name);
      if (result == undefined) {
        cartInfo.push({
          name: menu.name,
          qty: 1,
          price: PRICE,
          image: menu.image,
          rating: menu.rating,
          cuisine: menu.cuisine,
        });
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
  document.getElementById("cart").style.display = "none";
}

function logout() {
  sessionStorage.removeItem("user");
  window.location.href = "login.html";
}
