
let totalBudgetUp =
    JSON.parse(localStorage.getItem("budget")) || 0;


let totalExpense = 0;
const total_budget_html = document.getElementById("total_budget")
const total_expense_html = document.getElementById("total_expense")
total_budget_html.innerText = totalBudgetUp

function editBgt() {
    totalBudgetUp = prompt("Enter Your Budget")
    total_budget_html.innerText = totalBudgetUp
    localStorage.setItem("budget",
        JSON.stringify(totalBudgetUp));
    renderExpenses()
    chart()
}

function addBgt() {
    let temp = totalBudgetUp;
    let input = prompt("Enter Your Budget")
    totalBudgetUp = parseInt(parseInt(temp) + parseInt(input));
    total_budget_html.innerText = totalBudgetUp
    localStorage.setItem("budget",
        JSON.stringify(totalBudgetUp));
    renderExpenses()
    chart()
}

const expenseForm =
    document.getElementById("expense-form");
const expenseList =
    document.getElementById("expense-list");
const totalAmountElement =
    document.getElementById("total_expense");

const leftOutBudget =
    document.getElementById("total_expense");

let expenses =
    JSON.parse(localStorage.getItem("expenses")) || [];

var totAmt2 = 0;

function renderExpenses() {

    expenseList.innerHTML = "";

    let totalAmount = 0;

    for (let i = 0; i < expenses.length; i++) {
        const expense = expenses[i];
        const expenseRow = document.createElement("tr");
        expenseRow.innerHTML = ` 
      <td>${expense.name}</td> 
      <td>${expense.amount}</td> 
      <td class="delete-btn" data-id="${i}">Delete</td> 
    `;
        expenseList.appendChild(expenseRow);

        totalAmount += expense.amount;
    }

    totalAmountElement.textContent =
        totalAmount.toFixed(2);
    left_budget.innerText = totalBudgetUp - totalAmount;

    localStorage.setItem("expenses",
        JSON.stringify(expenses));
    totAmt2 = totalAmount
    chart()
}

function addExpense(event) {
    event.preventDefault();

    const expenseNameInput =
        document.getElementById("expense-name");
    const expenseAmountInput =
        document.getElementById("expense-amount");
    const expenseName =
        expenseNameInput.value;
    const expenseAmount =
        parseFloat(expenseAmountInput.value);

    expenseNameInput.value = "";
    expenseAmountInput.value = "";

    if (expenseName === "" || isNaN(expenseAmount)) {
        alert("Please enter valid expense details.");
        return;
    }
    const expense = {
        name: expenseName,
        amount: expenseAmount,
    };
    expenses.push(expense);
    renderExpenses();
    chart()
}

let expenseNames = [];
function deleteExpense(event) {
    if (event.target.classList.contains("delete-btn")) {

        const expenseIndex =
            parseInt(event.target.getAttribute("data-id"));
        expenses.splice(expenseIndex, 1);

        renderExpenses();
        chart()
    }
}

expenseForm.addEventListener("submit", addExpense);
expenseList.addEventListener("click", deleteExpense);

renderExpenses();
chart()

function chart() {
    const xValues = ["total Expense", "Left Budget"];
    const yValues = [totalAmountElement.textContent, totalBudgetUp - totAmt2];
    const barColors = [
        "red",
        "green",
    ];

    new Chart("myChart", {
        type: "pie",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: {
            title: {
                display: true,
                text: "Personal Finance"
            }
        }
    });
}