const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
function filterByPrice(data) {
  const radioList = document.querySelectorAll('input[name="price"]');
  radioList.forEach((radio) => {
    radio.addEventListener("click", (e) => {
      const list = data.filter((product) => {
        return product.price <= e.target.value;
      });
      console.log(list);
      renderProducts(".product-list", list);
    });
  });
}
function renderProductList() {
  if (params.category) {
    fetch(
      `https://project-8832973235870561588-default-rtdb.asia-southeast1.firebasedatabase.app/products.json?orderBy="category"&equalTo="${params.category}"`
    )
      .then((res) => res.json())
      .then((data) => {
        const productList = convertToArray(data);
        console.log(productList);
        filterByPrice(productList);
        selectFilter(productList);
        renderProducts(".product-list", productList);
      });
  } else {
    fetch(
      `https://project-8832973235870561588-default-rtdb.asia-southeast1.firebasedatabase.app/products.json`
    )
      .then((res) => res.json())
      .then((data) => {
        const productList = convertToArray(data);
        console.log(productList);
        filterByPrice(productList);
        selectFilter(productList);
        renderProducts(".product-list", productList);
      });
  }
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
function selectFilter(data) {
  const selectFilter = document.querySelector(".form-select");
  selectFilter.addEventListener("change", () => {
    if (selectFilter.value === "quantitySold") {
      const newList = data.sort((a, b) =>
        new Date(a.quantitySold) < new Date(b.quantitySold)
          ? 1
          : new Date(b.quantitySold) < new Date(a.quantitySold)
          ? -1
          : 0
      );
      renderProducts(".product-list", newList);
    } else if (selectFilter.value === "date") {
      const newList = data.sort((a, b) =>
        a.date < b.date ? 1 : b.date < a.date ? -1 : 0
      );
      renderProducts(".product-list", newList);
    } else if (selectFilter.value === "az") {
      const newList = data.sort((a, b) =>
        a.name.charAt(0) > b.name.charAt(0)
          ? 1
          : b.name.charAt(0) > a.name.charAt(0)
          ? -1
          : 0
      );
      console.log(newList);
      renderProducts(".product-list", newList);
    } else if (selectFilter.value === "za") {
      const newList = data.sort((a, b) =>
        a.name.charAt(0) < b.name.charAt(0)
          ? 1
          : b.name.charAt(0) < a.name.charAt(0)
          ? -1
          : 0
      );
      console.log(newList);
      renderProducts(".product-list", newList);
    }
  });
}

renderProductList();
