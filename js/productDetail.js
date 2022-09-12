const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
const id = params.id;

fetch(
  `https://project-8832973235870561588-default-rtdb.asia-southeast1.firebasedatabase.app/products/${id}.json`
)
  .then((res) => res.json())
  .then((data) => {
    renderProductDetail(data);
    handleAddCart();
    const add = document.querySelector(".add-btn");
    add.addEventListener("click", () => {
      addCart(id, data);
    });
    const buy = document.querySelector(".buy-btn");
    buy.addEventListener("click", () => {
      addCart(id, data);
      window.location.replace("/cart.html");
    });
  });

function renderProductDetail(product) {
  const productDetail = document.querySelector("#product-detail");
  productDetail.innerHTML = `
  <div class="product-detail-img mini col-2 col-md-1 py-2">
  <img src="${product.img}" alt="${product.name}" />
  </div>
  <div class="product-detail-img col-12 col-md-4">
  <img src="${product.img}" alt="${product.name}" />
  </div>
  <div class="col-12 col-md-7">
    <div class="product-detail-name">${product.name}</div>
    <div class="product-detail-quantitySold"> Đã bán ${product.quantitySold} </div>
    <div class="product-detail-price">${product.price} đ</div>
    <div class="add-cart-title">Số lượng</div>
    <div class="d-flex align-items-center add-cart">
        <div id="plus" class="add-cart__btn">
            <i class="ph-plus-circle"></i>
        </div>
        <div class="add-cart-input">
            <input id="quantity" type="number" required value="1"/>
        </div>
        <div id="minus"  class="add-cart__btn">
            <i class="ph-minus-circle" ></i>
        </div>
    </div>
    <div class="d-flex add-box">
    <button class="add-box-btn buy-btn" >Mua sản phẩm</button>
    <button class="add-box-btn add-btn">Thêm sản phẩm</button>
    </div>
    <div class="product-detail-description">
        <div class="product-detail-description__title">Giới thiệu sản phẩm</div>
        <div class="product-detail-description__body">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe nulla perferendis veniam quis odit ipsum velit voluptatem ipsa, iste consectetur.  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe nulla perferendis veniam quis odit ipsum velit voluptatem ipsa, iste consectetur.  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe nulla perferendis veniam quis odit ipsum velit voluptatem ipsa, iste consectetur.</div>
    </div>
    
  </div>
  `;
}
function showPopup() {
  const popup = document.querySelector(".pop-up");
  popup.style.display = "block";
  setTimeout(() => {
    popup.style.display = "none";
  }, 500);
}
function addCart(id, { img, name, price }) {
  const quantity = parseInt(document.querySelector("#quantity").value);
  if (!localStorage.getItem("cart")) {
    showPopup();
    localStorage.setItem(
      "cart",
      JSON.stringify([
        {
          id,
          img,
          name,
          price,
          quantity,
        },
      ])
    );
  } else {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const check = cart.findIndex((product) => {
      return product.id === id;
    });
    if (check === -1) {
      cart.push({
        id,
        img,
        name,
        price,
        quantity,
      });

      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      cart[check].quantity = parseInt(cart[check].quantity) + quantity;
      console.log(cart[check].quantity);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    showPopup();
  }
}
function handleAddCart() {
  const plus = document.querySelector("#plus");
  const minus = document.querySelector("#minus");
  const quantity = document.querySelector("#quantity");
  plus.addEventListener("click", () => {
    quantity.value = parseInt(quantity.value) + 1;
  });
  minus.addEventListener("click", (e) => {
    if (parseInt(quantity.value) === 1) {
      e.preventdefault;
    } else {
      quantity.value = parseInt(quantity.value) - 1;
    }
  });
  quantity.onkeydown = function (e) {
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
}
