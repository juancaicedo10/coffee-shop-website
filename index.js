
const menuItems = document.querySelectorAll(".menu li");


//cart shopping 

const cart = document.querySelector(".cartBtn");
const shoppingCar = document.querySelector(".shoppingCar");
const headerShopping = document.querySelector(".shoppingCar header")
const buys = document.getElementById("buys");
const totalPay = document.querySelector(".total");
let cartStatus = false



cart.addEventListener("click", function () {
    cartStatus = !cartStatus
    if(cartStatus) {
        shoppingCar.style.display = "flex";
        headerShopping.style.display = "flex";
        totalPay.style.display = "flex"
        const home = document.querySelector(".home");
        home.scrollIntoView({behavior: "smooth"})
    }else {
          shoppingCar.classList.remove("show");
          headerShopping.classList.remove("show");

          setTimeout(() => {
            shoppingCar.style.display = "none";
            headerShopping.style.display = "none";
            totalPay.style.display = "none"
          }, 300); // 300ms (el mismo tiempo que la duración de la animación en CSS)
        }
      })

    



menuItems.forEach(item => {
  item.addEventListener("click", () => {
    const targetSectionId = item.getAttribute("data-target");

    const targetSection = document.querySelector("." + targetSectionId);

    targetSection.scrollIntoView({ behavior: "smooth" });
  });
});


function iniciarMap(){
    var coord = {lat:6.1533333333333 ,lng: -75.374166666667};
    var map = new google.maps.Map(document.querySelector(".gps"),{
      zoom: 10,
      center: coord
    });
    var marker = new google.maps.Marker({
      position: coord,
      map: map
    });
}


const addCoffeBtn = document.querySelectorAll(".add");
const addProduct = document.querySelectorAll(".product");

addCoffeBtn.forEach(coffeBtn => {
  coffeBtn.addEventListener("click", addToCart);
});

addProduct.forEach(product => {
product.addEventListener("click", addToCart)
})

function addToCart(event) {
  const button = event.target;

  if (button.classList.contains("disabled")) {
    return;
  }

  const isCoffee = button.classList.contains("add");
  const isIcon = button.classList.contains("cartIcon");
  const cartIcon = event.currentTarget.querySelector(".cartIcon");
  
  if (isCoffee) {
    button.innerHTML = "IN " + `<i class="fas fa-shopping-cart"></i>`;

    button.classList.add("disabled")
  } else if (isIcon){
    console.log(cartIcon);

    cartIcon.classList.replace("fa-shopping-cart", "fa-check");
    cartIcon.classList.add("disabled")
  }




  const container = event.target.closest(isCoffee ? ".coffee" : ".product");
  const image = container.querySelector("img").getAttribute("src");
  const name = container.querySelector(".name").textContent;
  const price = container.querySelector(".price").textContent;

  let newElement = document.createElement("div");
  newElement.classList.add("buy");
  newElement.innerHTML = `
    <img src="${image}" alt="img" style="width: 30%; height: 90%; margin-top: 5px;">
    <div class="name-price">
        <h1 class="productName">${name}</h1>
        <h2 class="price">${price}</h2>
    </div>
    <button class="delete"></button>
    <div class="moreLessButtons">
      <button class="less">-</button>
      <h1 class="number">1</h1>
      <button class="more">+</button>
    </div>
  `;

  buys.appendChild(newElement);

  const moreButton = newElement.querySelector(".more");
  const lessButton = newElement.querySelector(".less");
  const number = newElement.querySelector(".number");
  const removeButton = newElement.querySelector(".delete");

  removeButton.addEventListener("click", () => {
    newElement.remove();
    if(isCoffee) {
      button.innerHTML = "Add to cart";
      button.classList.remove("disabled")
    }else if (isIcon) {
      cartIcon.classList.replace("fa-check", "fa-shopping-cart");
      cartIcon.classList.remove("disabled")
    }

    
    const buysHeight = parseInt(window.getComputedStyle(buys).height);

    if (buysHeight <= 0) {
      shoppingCar.style.display = "none";
      headerShopping.style.display = "none";
    } else {
      shoppingCar.style.display = "flex";
      headerShopping.style.display = "flex";
    }

    updateTotalPay();
  });

  moreButton.addEventListener("click", () => {
    let toNumber = parseInt(number.innerText);
    number.innerText = toNumber + 1;

    let productPrice = parseFloat(price.replace("$", ""));
    let productNumber = productPrice * (toNumber + 1);
    newElement.querySelector(".price").textContent = `$${productNumber}`;

    updateTotalPay();
  });

  lessButton.addEventListener("click", () => {
    let toNumber = parseInt(number.innerText);
    if (toNumber > 1) {
      number.innerText = toNumber - 1;

      let productPrice = parseFloat(price.replace("$", ""))
      let productNumber = productPrice * (toNumber - 1);
    newElement.querySelector(".price").textContent = `$${productNumber}`;

    updateTotalPay();
    }
  });


  updateTotalPay()

}
function updateTotalPay() {
  const totalPay = document.querySelector("#totalPay");
  let total = 0;
  const prices = buys.querySelectorAll(".price");
  
  prices.forEach(priceElement => {
    const priceValue = parseFloat(priceElement.textContent.replace("$", ""));
    total += priceValue;
  });
  
  totalPay.textContent = `$${total.toFixed(2)}`;
}

const icon = document.querySelectorAll(".fas.fa-check");

icon.forEach(i => {
  i.addEventListener("click", event => {
    event.stopPropagation();
  })
})

const contactName = document.querySelector(".contact .name input");
const contactEmail = document.querySelector(".contact .email input");
const contactPhone = document.querySelector(".contact .phone input");


contactName.addEventListener("input", () => {
  contactName.value = contactName.value.replace(/[^a-zA-Z\s]+/g, "");
});

contactEmail.addEventListener("input", () => {
  contactEmail.value = contactEmail.value.replace(/\s/,"")
})

contactPhone.addEventListener("input", () => {

  contactPhone.value = contactPhone.value.replace(/[^0-9]/g,"")
})








