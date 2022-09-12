function renderProductByQuantitySold() {
  fetch(
    `https://project-8832973235870561588-default-rtdb.asia-southeast1.firebasedatabase.app/products.json`
  )
    .then((res) => res.json())
    .then((data) => {
      const productList = convertToArray(data);

      const newList = productList.sort((a, b) =>
        new Date(a.quantitySold) < new Date(b.quantitySold)
          ? 1
          : new Date(b.quantitySold) < new Date(a.quantitySold)
          ? -1
          : 0
      );

      renderHomeProducts("#best-selling .product-list", newList);
    });
}
function renderProductByNew() {
  fetch(
    `https://project-8832973235870561588-default-rtdb.asia-southeast1.firebasedatabase.app/products.json`
  )
    .then((res) => res.json())
    .then((data) => {
      const productList = convertToArray(data);

      const newList = productList.sort((a, b) =>
        a.date < b.date ? 1 : b.date < a.date ? -1 : 0
      );
      console.log(newList);
      renderHomeProducts("#new-product .product-list", newList);
    });
}

function renderHomeProducts(select, productList) {
  const section = document.querySelector(select);

  let i = 0;
  productList.forEach((product) => {
    if (i < 4) {
      section.innerHTML += `
      <div class="col-6 col-md-3 d-flex">
      <div class="product-card ">
      <a href='./productDetail.html?id=${product.id}'>
      <div class="product-card__image">
        <img
          src="${product.img}"
          alt="${product.name}"
        />
      </div>
      <div class="product-card__name">${product.name}</div>
      <div class="product-card__price">${product.price} đ</div>
      </a>
      </div>
      </div>
      `;
      i += 1;
    }
  });
}
function convertToArray(object) {
  const productList = [];
  for (const id in object) {
    productList.push({
      id,
      ...object[id],
    });
  }
  return productList;
}
renderProductByQuantitySold();
renderProductByNew();
