// get elements

const set_limit = document.getElementById('limit');
const start_date = document.getElementById('start_date');
const end_date = document.getElementById('end_date');
const error1 = document.getElementById('limit_warning')
const graph_limit = document.getElementById('limit_amount');
const limit_meter = document.getElementById('limit_meter');
const graph_spent = document.getElementById('spent_amount');
const expense_meter = document.getElementById('expense_meter');
const graph_remaining = document.getElementById('remaining_amount');
const remaining_meter = document.getElementById('remaining_meter');
const expense_cat = document.getElementById('add_expense');
const expense_amount = document.getElementById('add_exp_amount');
const revenue_cat = document.getElementById('add_revenue');
const revenue_amount = document.getElementById('add_rev_amount');
const error2 = document.getElementById('expense_warning');
const error3 = document.getElementById('revenue_warning');
const overspent_warning = document.getElementById('overspent');
const btn2 = document.getElementById('add_exp_btn');
const btn4 = document.getElementById('add_rev_btn');
const graph_revenue = document.getElementById('total_revenue');
const category_container = document.getElementById('category_container');
const rev_card_section = document.getElementById('display_revenue_container')

// function to validate limit form
function validateLimitForm() {
    const startDate = new Date(start_date.value);
    const endDate = new Date(end_date.value)

    if (set_limit.value === "" || start_date.value === "" || end_date.value === "") {
        error1.style.color = 'red'
        error1.innerHTML = 'Please fill all fields!'

        return false;
    }

    if (set_limit.value < 0) {
        //amount cannot be negative
        error1.style.color = 'red'
        error1.textContent = 'Amount cannot be negative!'

        return false;
    }

    
    if (startDate > endDate) {
        //end date cannot precede start date
        error1.style.color = 'red'
        error1.textContent = 'End date cannot come before the start date';
        return false;
    }
    error1.innerHTML = ''//error message to empty string if validated
    return true;
}

// function to validate add expense form
function validateExpenseForm() {
    if (expense_amount.value === "") {
        error2.style.color = 'red'
        error2.textContent = 'Please fill all fields!'

        return false;
    }
    if (expense_amount.value <= 0) {
        error2.style.color = 'red'
        error2.textContent = 'Please enter the right amount!'

        return false;
    }
    if (limit_meter.value <= 0) {
        error2.style.color = 'red'
        error2.textContent = 'Please set budget limit before spending!'

        return false;
    }
    error2.innerHTML = ''//error message to empty string if validated
    return true;
}

//function to validate revenue form
function validateRevenueForm() {
    if (revenue_amount.value === "") {
        error3.style.color = 'red'
        error3.textContent = 'Please fill all fields!'

        return false;
    }
    if (revenue_amount.value <= 0) {
        error3.style.color = 'red'
        error3.textContent = 'Please enter the right amount!'

        return false;
    }
    if (limit_meter.value <= 0) {
        error3.style.color = 'red'
        error3.textContent = 'Please set up budget'

        return false;
    }
    error3.innerHTML = ''//error message to empty string if validated
    return true;
}

//reset the limit form after submit
function resetLimit() {
    set_limit.value = '';
    start_date.value = '';
    end_date.value = '';
}

//reset the expense form after submit
function resetExpense() {
    expense_amount.value = "";
}

//reset the revenue form after submission
function resetRevenue() {
    revenue_amount.value = "";
}

//function to update all limit areas and reset summary
function limitUpdate(budget_data_array) {
    const budget_limit = budget_data_array[0]['budget']['limit_data'];
    graph_limit.textContent = budget_limit;
    limit_meter.setAttribute('max', budget_limit);
    limit_meter.setAttribute('value', budget_limit);
    graph_spent.value = 0;
    graph_spent.textContent = '';
    expense_meter.setAttribute('max', budget_limit);
    expense_meter.setAttribute('value', graph_spent.value)
    remaining_meter.setAttribute('max', budget_limit);
    remaining_meter.setAttribute('value', 0);
    graph_remaining.textContent = '';
    category_container.innerHTML = '';
    overspent_warning.textContent = '';
    rev_card_section.innerHTML = '';
    graph_revenue.value = 0;
    graph_revenue.textContent = '';
}


// function to add all expenses and update spent graph fields
function expenseUpdate (budget_data_array) {
    let total_amount = 0;
    for (let i = 1; i < budget_data_array.length; i++) {
        let amount = budget_data_array[i]['expense']['amount'];
        total_amount += parseInt(amount, 10);
        graph_spent.value = total_amount;
        graph_spent.textContent = graph_spent.value;
    }
    expense_meter.setAttribute('value', graph_spent.value)

}

// function to add all revenues
function revenueUpdate (revenue_data_array) {
    let total_amount = 0;
    for (let i = 0; i < revenue_data_array.length; i++) {
        let amount = revenue_data_array[i]['revenue']['amount'];
        total_amount += parseInt(amount, 10);
        graph_revenue.value = total_amount;
        graph_revenue.textContent = graph_revenue.value;
    }
}

// function to update remaining amount
function remainUpdate() {
    const difference = limit_meter.value - graph_spent.value;
    graph_remaining.value = difference;
    graph_remaining.textContent = graph_remaining.value
    remaining_meter.setAttribute('value', difference);

    if (difference < 0) {
        const overspent = -difference
        overspent_warning.style.color = 'red';
        overspent_warning.value = overspent;
        overspent_warning.textContent = "You have overspent budget limit by " + overspent;
        graph_remaining.textContent = 0;
        graph_remaining.value = 0;
        graph_spent.style.color = 'red';
    }
    else {
        overspent_warning.textContent = ''
        graph_spent.style.color = 'rgb(48, 52, 129)';
        overspent_warning.value = 0;
    }
}

//function that retrieves data from the limit input fields
function limitData() {
    const limit_data = set_limit.value;
    const start_budget_date = start_date.value;
    const end_budget_date = end_date.value
    const budget = { 'budget': { limit_data, start_budget_date, end_budget_date } };
    return budget;
}

//function to retrieve data from expense added
function expenseData() {
    const expense_category = expense_cat.value;
    const amount = expense_amount.value;
    const expense = { 'expense': { expense_category, amount } };

    return expense;
}

//function to retrieve data from revenue form
function revenueData() {
    const revenue_category = revenue_cat.value;
    const amount = revenue_amount.value;
    const revenue = { 'revenue': { revenue_category, amount } };

    return revenue;
}

//function to repopulate expense field to edit
function populateExpenseField (card) {
    expense_cat.value = card['expense_category'];
    expense_amount.value = card['amount'];
    btn2.textContent = 'Edit expense';
}

//function to repopulate revenue field to edit
function populateRevenueField (card) {
    revenue_cat.value = card['revenue_category'];
    revenue_amount.value = card['amount'];
    btn4.textContent = 'Edit revenue';
}

// export functions
export {
    validateLimitForm,
    resetLimit,
    resetExpense,
    limitUpdate,
    validateExpenseForm,
    expenseUpdate,
    remainUpdate,
    limitData,
    expenseData,
    populateExpenseField,
    populateRevenueField,
    validateRevenueForm,
    resetRevenue,
    revenueData,
    revenueUpdate
}
