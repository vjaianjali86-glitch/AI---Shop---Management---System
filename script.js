function login() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  fetch("http://127.0.0.1:5000/login", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({username:user, password:pass})
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("loginMsg").innerText = data.message;
    if(data.status === "success") {
      showSection('sale');
    }
  });
}

function addSale() {
  let sale = {
    date: document.getElementById("saleDate").value,
    item: document.getElementById("saleItem").value,
    qty: parseInt(document.getElementById("saleQty").value) || 1,
    price: parseFloat(document.getElementById("salePrice").value),
    cost: parseFloat(document.getElementById("saleCost").value),
    customer_name: document.getElementById("custName").value,
    customer_phone: document.getElementById("custPhone").value
  };

  fetch("http://127.0.0.1:5000/add_sale", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(sale)
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
    if(data.status === "success") {
      fetch("http://127.0.0.1:5000/sales")
        .then(res => res.json())
        .then(rows => {
          let reportTable = document.getElementById("reportTable");
          reportTable.innerHTML = "<tr><th>Date</th><th>Item</th><th>Qty</th><th>Price</th><th>Cost</th><th>Profit</th></tr>";
          rows.forEach(r => {
            let profit = (r[4] - r[5]) * r[3];
            reportTable.innerHTML += `<tr>
              <td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td>
              <td>${r[4]}</td><td>${r[5]}</td><td>${profit}</td>
            </tr>`;
          });
        });
    }
  });
}

function addExpense() {
  let expense = {
    date: document.getElementById("expDate").value,
    category: document.getElementById("expCategory").value,
    amount: parseFloat(document.getElementById("expAmount").value)
  };

  fetch("http://127.0.0.1:5000/add_expense", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(expense)
  })
  .then(res => res.json())
  .then(data => alert(data.message));
}

function addItem() {
  let item = {
    item: document.getElementById("invItem").value,
    stock: parseInt(document.getElementById("invStock").value),
    cost: parseFloat(document.getElementById("invCost").value)
  };

  fetch("http://127.0.0.1:5000/add_item", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(item)
  })
  .then(res => res.json())
  .then(data => alert(data.message));
}

function showSection(id) {
  document.querySelectorAll(".section").forEach(sec => sec.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}
