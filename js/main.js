import {
    validateLimitForm, resetLimit, resetExpense, limitUpdate, validateExpenseForm,
    expenseUpdate, remainUpdate, limitData, expenseData
} from "./utility.js";

import { categoryCard } from "./card.js";

//retrieve button elements
const btn1 = document.getElementById('add_btn');
const btn2 = document.getElementById('add_exp_btn');

//array to store objects when buttons are clicked
const budget_data_array = [];

btn1.addEventListener('click', () => {
    const isValidate = validateLimitForm();

    if (!isValidate) {
        return;
    }

    const limit_fields_data = limitData();//budget limit and date object
    budget_data_array.push(limit_fields_data); //store in the array
    console.log(budget_data_array);

    limitUpdate(budget_data_array);// update the limit meter and label
    resetLimit(); //reset the limitset form to default
})

btn2.addEventListener('click', () => {
    const isValidate = validateExpenseForm();

    if (!isValidate) {
        return;
    }

    const expense_fields_data = expenseData();//expense info object
    budget_data_array.push(expense_fields_data);// add objet to the array
    console.log(budget_data_array);

    createCard(budget_data_array)
    expenseUpdate(budget_data_array);
    remainUpdate();
    resetExpense();
})


//loop through budget data array to create cards
function createCard (budget_data_array) {
    const card_section = document.getElementById('category_container');
    card_section.innerHTML = '';// clear previous cards
    for (let i = 1; i < budget_data_array.length; i++) {
        const card = budget_data_array[i]['expense'];
        categoryCard(card); //recreate cards with current data
    }
}