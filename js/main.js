import { validateLimitForm, resetLimit, resetExpense, limitUpdate, validateExpenseForm,
expenseUpdate } from "./utility.js";

const btn1 = document.getElementById('add_btn');
const btn2 = document.getElementById('add_exp_btn')

btn1.addEventListener('click', () => {
    const isValidate = validateLimitForm();

    if (!isValidate) {
        return;
    }

    limitUpdate();
    resetLimit();
})

btn2.addEventListener('click', () => {
    const isValidate = validateExpenseForm();

    if (!isValidate) {
        return;
    }

    expenseUpdate();
    resetExpense();
})