let cart = JSON.parse(localStorage.getItem("cart"));
if (!cart) {
  cart = [];
}
console.log(cart);
const table = document.querySelector(".table-body");
const total = document.querySelector(".total-cost--bf");
const totalAfter = document.querySelector(".total-cost--at");
const totalFinal = document.querySelector(".total-cost--fn");
const saleInput = document.querySelector(".sale-input");
const saleBtn = document.querySelector(".sale-btn");
const submit = document.querySelector(".submit");

let saleValue = 0;
fetch(
  "https://project-8832973235870561588-default-rtdb.asia-southeast1.firebasedatabase.app/sale.json"
)
  .then((res) => res.json())
  .then((data) => {
    renderCart(data);
    updateTotalFinal();
    totalAfter.innerHTML = saleValue + " đ";
    saleBtn.addEventListener("click", () => {
      updateSale(data);
    });
  });
function updateSale(data) {
  for (const id in data) {
    if (data[id].code === saleInput.value) {
      totalAfter.innerHTML = updateTotal() * (data[id].sale / 100) + " đ";
      saleValue = updateTotal() * (data[id].sale / 100);
      updateTotalFinal();
      showPopup(true);
      saleInput.value = "";
      break;
    } else {
      saleInput.value = "";
    }
  }
}
function updateTotalFinal() {
  totalFinal.innerHTML = updateTotal() - saleValue + " đ";
  return updateTotal() - saleValue;
}
submit.addEventListener("click", () => {
  const total = updateTotalFinal();
  localStorage.setItem("total", JSON.stringify(total));
  window.location.replace("./payment.html");
});
function updateTotal() {
  const cost = cart.reduce((total, product) => {
    return total + parseInt(product.price) * product.quantity;
  }, 0);
  total.innerHTML = cost + " đ";
  return cost;
}
function renderCart(data) {
  let value = "";
  if (cart) {
    cart.forEach((product, index) => {
      value += ` 
  <div class="table-row row align-items-center">
    <div class="product-img col-3 d-flex align-items-center">
      <img src="${product.img}" alt="${product.name}" />
      <div class="product-name">${product.name}</div>
    </div>
    <div class="product-quantity col-3">
      <div
        class="d-flex align-items-center justify-content-center add-cart"
      >
        <div class="add-cart__btn plus">
          <i class="ph-plus-circle"></i>
        </div>
        <div class="add-cart-input">
          <input class="quantity" type="number" required value="${
            product.quantity
          }" data-id="${product.id}"/>
        </div>
        <div class="add-cart__btn minus">
          <i class="ph-minus-circle"></i>
        </div>
      </div>
    </div>
    <div class="col-1 col-lg-0"></div>
    <div class="product-price col-2 text-center">${
      product.price * product.quantity
    } đ</div>
    <div class="col-2 col-lg-0"></div>
    <div class="product-delete col-1">
      <i class="ph-trash"></i>
    </div>
  </div>`;
    });
  }
  table.innerHTML = value;
  handleAddCart();
  addDeleteEvent(data);
}
function addDeleteEvent(data) {
  const deleteOj = document.querySelectorAll(".product-delete");
  if (cart) {
    cart.forEach((product, index) => {
      deleteOj[index].addEventListener("click", () => {
        console.log(product);
        cart.splice(index, 1);
        console.log(cart);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
        updateTotalFinal();
        updateSale(data);
      });
    });
  }
}
function showPopup(value) {
  const popup = document.querySelector(".pop-up");
  console.log(value);
  if (value === true) {
    popup.innerHTML = "Nhập mã giảm giá thành công";
  } else if (value === false) {
    popup.innerHTML = "Sai mã giảm giá";
  }
  popup.style.display = "block";
  setTimeout(() => {
    popup.style.display = "none";
  }, 1000);
}
function handleAddCart() {
  const plus = document.querySelectorAll(".plus");
  const minus = document.querySelectorAll(".minus");
  const quantity = document.querySelectorAll(".quantity");
  const price = document.querySelectorAll(".product-price");

  plus.forEach((el, index) => {
    el.addEventListener("click", () => {
      quantity[index].value = parseInt(quantity[index].value) + 1;
      price[index].innerHTML = quantity[index].value * cart[index].price + " đ";
      cart[index].quantity = cart[index].quantity + 1;
      updateTotalFinal();
      localStorage.setItem("cart", JSON.stringify(cart));
    });
    minus[index].addEventListener("click", (e) => {
      if (parseInt(quantity[index].value) === 1) {
        e.preventdefault;
      } else {
        quantity[index].value = parseInt(quantity[index].value) - 1;
        price[index].innerHTML =
          quantity[index].value * cart[index].price + " đ";
        cart[index].quantity = cart[index].quantity - 1;
        updateTotalFinal();
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    });

    quantity[index].onkeydown = function (e) {
      if (
        !(
          (e.keyCode > 95 && e.keyCode < 106) ||
          (e.keyCode > 47 && e.keyCode < 58) ||
          e.keyCode == 8
        )
      ) {
        return false;
      }
    };
  });
}
