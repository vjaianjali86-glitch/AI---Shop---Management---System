function login() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  if(user && pass) {
    document.getElementById("loginMsg").innerText = "✅ Logged in successfully!";
    // Hide login section and show Add Sale section
    showSection('sale');
  } else {
    document.getElementById("loginMsg").innerText = "❌ Please enter username and password.";
  }
}

function logout() {
  alert("You have logged out.");
  showSection('loginSection');
}

function showSection(id) {
  document.querySelectorAll(".section").forEach(sec => sec.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

// Expenses
function addExpense() {
  let date = document.getElementById("expDate").value;
  let cat = document.getElementById("expCategory").value;
  let amt = document.getElementById("expAmount").value;
  if(date && cat && amt > 0) {
    let table = document.getElementById("expenseTable");
    table.innerHTML += `<tr><td>${date}</td><td>${cat}</td><td>${amt}</td></tr>`;
  }
}

// Inventory
function addItem() {
  let item = document.getElementById("invItem").value;
  let stock = document.getElementById("invStock").value;
  let cost = document.getElementById("invCost").value;
  if(item && stock >= 0 && cost >= 0) {
    let table = document.getElementById("invTable");
    table.innerHTML += `<tr><td>${item}</td><td>${stock}</td><td>${cost}</td></tr>`;
  }
}

// Add Sale
function addSale() {
  let date = document.getElementById("saleDate").value;
  let item = document.getElementById("saleItem").value;
  let qty = parseInt(document.getElementById("saleQty").value) || 1;
  let price = parseFloat(document.getElementById("salePrice").value);
  let cost = parseFloat(document.getElementById("saleCost").value);
  let custName = document.getElementById("custName").value;
  let custPhone = document.getElementById("custPhone").value;

  if(date && item && price > 0 && cost >= 0) {
    let profit = (price - cost) * qty;

    // Update Reports table
    let reportTable = document.getElementById("reportTable");
    reportTable.innerHTML += `<tr>
      <td>${date}</td>
      <td>${item}</td>
      <td>${qty}</td>
      <td>${price}</td>
      <td>${cost}</td>
      <td>${profit}</td>
    </tr>`;

    // Update Customers table
    let custTable = document.getElementById("custTable");
    custTable.innerHTML += `<tr>
      <td>${custName}</td>
      <td>${custPhone}</td>
      <td>${item}</td>
      <td>${price}</td>
    </tr>`;

    // Update summary totals
    updateReportSummary();
    alert("✅ Sale added successfully!");
  } else {
    alert("⚠️ Please fill all sale details correctly.");
  }
}

function updateReportSummary() {
  let rows = document.querySelectorAll("#reportTable tr");
  let totalSales = 0, totalProfit = 0;

  rows.forEach((row, idx) => {
    if(idx === 0) return; // skip header
    let cells = row.querySelectorAll("td");
    totalSales += (parseFloat(cells[3].innerText) || 0) * (parseInt(cells[2].innerText) || 1);
    totalProfit += parseFloat(cells[5].innerText) || 0;
  });

  document.getElementById("reportSummary").innerText =
    `Total Sales: ₹${totalSales.toFixed(2)} | Total Profit: ₹${totalProfit.toFixed(2
