const search = document.querySelector("#search");
const searchBtn = document.querySelector(".search-btn");
console.log(searchBtn);
searchBtn.addEventListener("click", () => {
  if (search.value) {
    window.location.replace(`./search.html?search=${search.value}`);
  }
});
