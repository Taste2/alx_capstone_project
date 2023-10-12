// get elements
const error1 = document.getElementById('limit_warning')
const set_limit = document.getElementById('limit');
const start_date = document.getElementById('start_date');
const graph_limit = document.getElementById('limit_amount');
const graph_spent = document.getElementById('spent_amount');
const pie_limit = document.getElementById('limit_dig_para');
const limit_meter = document.getElementById('limit_meter');
const expense_meter = document.getElementById('expense_meter');
const expense_cat = document.getElementById('add_expense');
const expense_amount = document.getElementById('add_exp_amount');
const error2 = document.getElementById('expense_warning')

// function to validate limit form
function validateLimitForm() {

    if (set_limit.value === "" || start_date.value === "") {
        error1.style.color = 'red'
        error1.innerHTML = 'Please fill all fields!'

        return false;
    }
    if (set_limit.value < 0) {
        error1.style.color = 'red'
        error1.innerHTML = 'Amount cannot be negative!'

        return false;
    }
    error1.innerHTML = ''//error message to empty string if validated
    return true;
}

// function to validate add expense form
function validateExpenseForm() {
    if (expense_amount.value === "") {
        error2.style.color = 'red'
        error2.innerHTML = 'Please fill all fields!'

        return false;
    }
    if (expense_amount.value <= 0) {
        error2.style.color = 'red'
        error2.innerHTML = 'Please enter the right amount!'

        return false;
    }
    error2.innerHTML = ''//error message to empty string if validated
    return true;
}


//reset the limit form after submit
function resetLimit() {
    set_limit.value = '';
    start_date.value = '';
}

//reset the limit form after submit
function resetExpense() {
    expense_amount.value = "";
}

//function to update all limit fields
function limitUpdate() {
    graph_limit.innerHTML = parseInt(set_limit.value, 10);
    pie_limit.innerHTML = parseInt(set_limit.value, 10);
    limit_meter.setAttribute('max', set_limit.value);
    limit_meter.setAttribute('value', set_limit.value);
    expense_meter.setAttribute('max', set_limit.value)

}

// function to update spent money
function expenseUpdate() {
    if (!graph_spent.value) {
        graph_spent.value = parseInt(expense_amount.value, 10);
        graph_spent.innerHTML = graph_spent.value;
    } else {
        graph_spent.value += parseInt(expense_amount.value, 10);
        graph_spent.innerHTML = graph_spent.value;
    }
    expense_meter.setAttribute('value', graph_spent.value)
    
}

// export functions
export {
    validateLimitForm,
    resetLimit,
    resetExpense,
    limitUpdate,
    validateExpenseForm,
    expenseUpdate
}