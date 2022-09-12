const total = JSON.parse(localStorage.getItem("total"));
const products = JSON.parse(localStorage.getItem("cart"));
const confirm = document.querySelector(".confirm-btn");
const name1 = document.querySelector("#name");
const email = document.querySelector("#email");
const number = document.querySelector("#number");
const address = document.querySelector("#address");
const alertDanger = document.querySelector(".danger");
const cost = document.querySelector(".cost.total");
const costTransfer = document.querySelector(".cost.transfer");
const popup = document.querySelector(".pop-up");
const transfer = 20000;
costTransfer.innerHTML = total + transfer + " đ";
if (!total) {
  cost.innerHTML = 0 + "đ";
} else {
  cost.innerHTML = total + " đ";
}

console.log(confirm);
confirm.addEventListener("click", () => {
  if (name1.value && email.value && number.value && address.value) {
    alertDanger.style.display = "none";
    fetch(
      "https://project-8832973235870561588-default-rtdb.asia-southeast1.firebasedatabase.app/order.json",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name1.value,
          email: email.value,
          number: number.value,
          address: address.value,
          date: new Date().toISOString(),
          products,
          total,
        }),
      }
    ).then(() => {
      localStorage.removeItem("total");
      localStorage.removeItem("cart");
      popup.style.display = "block";
      setTimeout(() => {
        window.location.replace("./index.html");
      }, 2000);
    });
  } else {
    alertDanger.style.display = "block";
  }
});
