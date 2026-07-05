// ELEMENTS========================================================================
const netAmt = document.querySelector("#netAmount");

const amt = document.querySelector("#amount");
const descrip = document.querySelector("#text");

const list = document.querySelector(".transactions");

const earnBtn = document.querySelector("#earnBtn");
const earning = document.querySelector("#earning");

const expBtn = document.querySelector("#expBtn");
const expense = document.querySelector("#expense");

const err = document.querySelector("#errorMessage");

// WORKFLOW========================================================================
const transactions = [];

const newTransaction = function (transactionType) {
  const amount = +amt.value;
  const description = descrip.value;

  if (!description.trim() && amount <= 0)
    return "Enter proper amount and description";

  if (!description.trim()) return "Description cannot be Empty";

  if (amount <= 0) return "Amount must be greater than zero";

  const obj = {
    id: transactions.length + 1,
    type: transactionType,
    amount,
    description,
  };
  transactions.push(obj);
  return true;
};

const displayTransactions = function () {
  list.textContent = "";
  transactions.forEach((transaction) => {
    const markup = `
      <div class="transaction">
        <div class="left">
          <p>${transaction.description}</p>
          <p>रु ${transaction.amount}</p>
        </div>
        <div class="status ${transaction.type === "income" ? "credit" : "debit"}">
        ${transaction.type === "income" ? "C" : "D"}
        </div>
      </div>`;
    list.insertAdjacentHTML("beforeend", markup);
  });
};

function addTransaction(type) {
  const result = newTransaction(type);

  if (result !== true) {
    err.textContent = result;
    return;
  }
  err.textContent = "";

  displayTransactions();
  updateBalance();
  clearInputs();
}

function deleteTransaction(type) {}

const updateBalance = function () {
  const income = transactions
    .filter((item) => item.type === "income")
    .reduce((acc, cur) => acc + cur.amount, 0);

  const spend = transactions
    .filter((item) => item.type === "expense")
    .reduce((acc, cur) => acc + cur.amount, 0);

  const balance = income - spend;

  earning.textContent = `रु ${income}`;
  expense.textContent = `रु ${spend}`;
  netAmt.textContent = `रु ${balance}`;
};

function clearInputs() {
  amt.value = "";
  descrip.value = "";
}

earnBtn.addEventListener("click", function (event) {
  event.preventDefault();
  addTransaction("income");
});

expBtn.addEventListener("click", function (event) {
  event.preventDefault();
  addTransaction("expense");
});
