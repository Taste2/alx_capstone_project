import {
    validateLimitForm, resetLimit, resetExpense, limitUpdate, validateExpenseForm,
    expenseUpdate, remainUpdate, limitData, expenseData, populateExpenseField
} from "./utility.js";

//retrieve button elements
const btn1 = document.getElementById('add_btn');
const btn2 = document.getElementById('add_exp_btn');
const btn3 = document.getElementById('save_btn');

//array to store objects when buttons are clicked
const budget_data_array = [];

btn1.addEventListener('click', () => {
    const isValidate = validateLimitForm();

    if (!isValidate) {
        return;
    }

    const limit_fields_data = limitData();//budget limit and date object
    budget_data_array.length = 0;
    budget_data_array.push(limit_fields_data); //store in the new array
    console.log(budget_data_array);

    limitUpdate(budget_data_array);// update the limit meter and label
    resetLimit(); //reset the limitset form to default
})

let current_card_position = -1;
btn2.addEventListener('click', () => {
    const isValidate = validateExpenseForm();

    if (!isValidate) {
        return;
    }

    const expense_fields_data = expenseData();//expense info object
    if (btn2.textContent === 'Edit expense') {
        budget_data_array[current_card_position] = expense_fields_data;
        btn2.textContent = 'Add new expense'
    } else {
        budget_data_array.push(expense_fields_data);// add objet to the array
    }
    
    console.log(budget_data_array);

    createCard(budget_data_array)
    expenseUpdate(budget_data_array);
    remainUpdate();
    resetExpense();
})

btn3.addEventListener('click', () => {
    allBudgetData(budget_data_array);
})


//loop through budget data array to create cards
function createCard(budget_data_array) {
    const card_section = document.getElementById('category_container');
    card_section.innerHTML = '';// clear previous cards
    for (let index = 1; index < budget_data_array.length; index++) {
        const card = budget_data_array[index]['expense'];
        categoryCard(card, budget_data_array, index); //recreate cards with current data
    }
}

// function to create the category card
function categoryCard(card, budget_data_array, index) {
    const graph_spent = document.getElementById('spent_amount');
    const expense_meter = document.getElementById('expense_meter');
    const expense_cat = document.getElementById('add_expense');
    const expense_amount = document.getElementById('add_exp_amount');
    const btn2 = document.getElementById('add_exp_btn');
    const card_container = document.getElementById('category_container');

    const card_display = document.createElement('div');
    card_display.classList.add('category_items_display');
    card_container.appendChild(card_display);

    const card_label = document.createElement('div');
    card_label.classList.add('cat_label');
    card_display.appendChild(card_label);

    const category_icon = document.createElement('img');
    category_icon.setAttribute('src', 'assets/icons/pay.png');
    category_icon.setAttribute('height', '40px')
    card_label.appendChild(category_icon);

    const category_name = document.createElement('h4');
    category_name.innerHTML = card['expense_category'];
    card_label.appendChild(category_name);

    const category_amount = document.createElement('p');
    category_amount.value = card['amount'];
    category_amount.textContent = category_amount.value;
    card_label.appendChild(category_amount);

    const edit_delete_btn = document.createElement('div');
    edit_delete_btn.setAttribute('class', 'edit_del_container');
    card_display.appendChild(edit_delete_btn)


    //edit button
    const edit_btn = document.createElement('button');
    edit_btn.setAttribute('type', 'button');
    edit_btn.textContent = 'Edit'
    edit_btn.style.backgroundColor = 'blue';
    edit_delete_btn.appendChild(edit_btn);
    //event to edit card
    edit_btn.addEventListener('click', () => {
       populateExpenseField(card);
       current_card_position = index; 
    })

    //delete button
    const del_btn = document.createElement('button');
    del_btn.setAttribute('type', 'button');
    del_btn.textContent = 'Delete'
    del_btn.style.backgroundColor = 'red';
    edit_delete_btn.appendChild(del_btn);
    edit_delete_btn.appendChild(del_btn)
    //event to delete a card
    del_btn.addEventListener('click', () => {
        //delete one at this index
        budget_data_array.splice(index, 1);
        //recreate the remaining cards
        createCard(budget_data_array)
        //update the spent area
        graph_spent.value -= card['amount'];
        graph_spent.textContent = graph_spent.value;
        expense_meter.setAttribute('value', graph_spent.value)

        //update the remaining balance area
        remainUpdate();
    })
}

//store all data in array
// function allBudgetData (budget_data_array) {
//     let all_data = {'Budget':budget_data_array[0]['budget']};
//     for (let i = 1; i < budget_data_array.length; i++) {
//         const expense = budget_data_array[i]['expense'];
//         all_data['Expense'] = expense['expense_category'] : expense['amount']
//     }
//     console.log(all_data);
// }