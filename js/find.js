const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
console.log(params.search);
function renderProductList() {
  fetch(
    `https://project-8832973235870561588-default-rtdb.asia-southeast1.firebasedatabase.app/products.json`
  )
    .then((res) => res.json())
    .then((data) => {
      const searchCount = document.querySelector(".searchValue");
      const productList = convertToArray(data);
      const newList = productList.filter((product) => {
        return product.name.toLowerCase().includes(params.search);
      });
      searchCount.innerHTML = `Có ${newList.length} sản phẩm ứng với nội dung tìm kiếm`;
      renderProducts(".product-list", newList);
    });
}

function renderProducts(select, productList) {
  const section = document.querySelector(select);
  let html = "";
  productList.forEach((product) => {
    html += `
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
  });

  section.innerHTML = html;
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
renderProductList();
