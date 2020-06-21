
function createOrder(event) {
  event.preventDefault();

  const foodbox = document.querySelector("[name='foodbox']").value;
  const name = document.querySelector("[name='name']").value;
  const email = document.querySelector("[name='email']").value;
  const address = document.querySelector("[name='address']").value;

  const orderList = JSON.parse(window.localStorage.getItem("orderList")) || [];

  const order = {
      foodbox,
      name,
      email,
      address
  }

  orderList.push(order);

  window.localStorage.setItem("orderList", JSON.stringify(orderList));

  event.target.reset();
}

function renderOrderList() {

   const orderListJSON = JSON.parse(window.localStorage.getItem("orderList"));
   const orderList = orderListJSON || [];

   const orderListEl = document.getElementById("orders-list");
   orderListEl.innerHTML = "";

   for(const order of orderList) {
       const orderEl = document.createElement("div");
       orderEl.className = "order-div";
       const orderId = orderList.indexOf(order) + 1000;

       const {foodbox, name, email, address} = order;

       orderEl.innerHTML = 
       `<h3>Order #${orderId}</h3>
        <p><span>Food Box: </span>${foodbox}</p>
        <p><span>Name: </span>${name}</p>
        <p><span>Email: </span>${email}</p>
        <p><span>Adress: </span>${address}</p>
        <button class="btn btn-outline-light" id="${orderId}" onclick="removeFinishedOrder(this.id)">Finished</button>
       `;

       orderListEl.appendChild(orderEl);
   }
}

function removeFinishedOrder(id){
  let index = id - 1000;
  let  orderList = JSON.parse(localStorage.getItem("orderList"));
  orderList.splice(index, 1);
  window.localStorage.setItem("orderList", JSON.stringify(orderList));
  renderOrderList();
}