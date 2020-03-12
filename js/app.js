//show cart

(() => {
  const cartInfo = document.getElementById("cart-info");
  const cart = document.getElementById("cart");

  cartInfo.addEventListener("click", () => {
    cart.classList.toggle("show-cart");
  });
})();

//ad items to cart
(() => {
  const cartBtn = document.querySelectorAll(".store-item-icon");
  cartBtn.forEach(btn => {
    btn.addEventListener("click", event => {
      if (event.target.parentElement.classList.contains("store-item-icon")) {
        let fullPath =
          event.target.parentElement.parentElement.parentElement.parentElement
            .previousElementSibling.children[0].src;
        let partPath = fullPath.slice(fullPath.indexOf("img") + 3);

        //item object and props
        const item = {};
        item.img = `img-cart${partPath}`;
        item.name =
          event.target.parentElement.parentElement.previousElementSibling.textContent;
        item.price = event.target.parentElement.previousElementSibling.textContent
          .slice(1)
          .trim();

        const cartItem = document.createElement("div");
        cartItem.classList.add(
          "cart-item",
          "d-flex",
          "justify-content-between",
          "text-capitalize",
          "my-3"
        );
        cartItem.innerHTML = `
          <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
          <div class="item-text">
            <p class="font-weight-bold mb-0 cart-item-title">
              ${item.name}
            </p>
            <span>$</span>
            <span class="cart-item-price mb-0">${item.price}</span>
            </p>
          </div>
          <span class="cart-item-remove my-auto"><i class="fas fa-trash"></i></span>`;

        const cart = document.getElementById("cart");
        const total = document.querySelector(".cart-total-container");
        cart.insertBefore(cartItem, total);
        //alert(`${item.name} added to the cart!`);

        event.target.parentElement.parentElement.parentElement.parentElement.previousElementSibling.classList.add(
          "img-container-chosen"
        );
      }

      //remove item
      const removeItemBtn = document.querySelectorAll(".cart-item-remove");
      removeItemBtn.forEach(btn => {
        btn.addEventListener("click", event => {
          const beerName = event.target.parentElement.previousElementSibling.children[0].textContent
            .toLowerCase()
            .trim();
          const beer = document.getElementById(beerName); //delete opacity
          beer.children[0].classList.remove("img-container-chosen");

          event.target.parentElement.parentElement.remove();
          showTotals();
        });
      });

      //clear cart
      const clearCartBtn = document.getElementById("clear-cart");
      clearCartBtn.addEventListener("click", e => {
        let items = document.querySelectorAll(".cart-item");
        items.forEach(i => {
          i.remove();
        });
        showTotals();
        let images = document.querySelectorAll(".img-container");
        images.forEach(i => {
          i.classList.remove("img-container-chosen");
        });
      });
      showTotals();
    });
  });

  const showTotals = () => {
    let total = [];
    const items = document.querySelectorAll(".cart-item-price");
    items.forEach(item => {
      total.push(parseFloat(item.textContent));
    });
    const finalPrice = total
      .reduce((total, item) => {
        total += item;
        return total;
      }, 0)
      .toFixed(2);

    document.getElementById("cart-total").textContent = finalPrice;
    document.getElementById("item-count").textContent = total.length;
  };
})();

//Search
(() => {
  const searchBar = document.forms["search"].querySelector("input");
  searchBar.addEventListener("keyup", e => {
    const term = e.target.value.toLowerCase();
    const beers = document.querySelectorAll(".store-item-name");
    Array.from(beers).forEach(beer => {
      const title = beer.textContent;
      beerDiv = beer.parentElement.parentElement.parentElement.parentElement;
      if (title.toLowerCase().indexOf(term) != -1) {
        beerDiv.style.display = "block";
      } else {
        beerDiv.style.display = "none";
      }
    });
  });

  //filter
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", e => {
      const data = e.target.getAttribute("data-filter").toLowerCase();
      const beers = document.querySelectorAll(".store-item");
      Array.from(beers).forEach(beer => {
        beerData = beer.getAttribute("data-item");
        if (data === "all") {
          beer.style.display = "block";
        } else {
          if (beerData === data) {
            beer.style.display = "block";
          } else {
            beer.style.display = "none";
          }
        }
      });
    });
  });
})();

//whiskey
(() => {
  const whiskeyBtns = document.querySelectorAll(".whiskey-btn");
  const whiskeyNotification = document.getElementById("whiskey-order");
  whiskeyBtns.forEach(btn => {
    btn.addEventListener("click", e => {
      whiskeyNotification.classList.add("whiskey-order-active");
    });
  });
  const closeBtn = document.querySelector(".close-order");
  closeBtn.addEventListener("click", e => {
    whiskeyNotification.classList.remove("whiskey-order-active");
  });
})();
