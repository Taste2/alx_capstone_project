import {
    validateLimitForm, resetLimit, resetExpense, limitUpdate, validateExpenseForm,
    expenseUpdate, remainUpdate, limitData, expenseData, populateExpenseField, validateRevenueForm,
    resetRevenue, revenueData, populateRevenueField, revenueUpdate
} from "./utility.js";


//retrieve button elements
const btn1 = document.getElementById('add_btn');
const btn2 = document.getElementById('add_exp_btn');
const btn3 = document.getElementById('save_btn');
const btn4 = document.getElementById('add_rev_btn');

//array to store objects when buttons are clicked
const budget_data_array = [];
const revenue_data_array = [];

//set up budget button
btn1.addEventListener('click', () => {
    const isValidate = validateLimitForm();

    if (!isValidate) {
        return;
    }

    const limit_fields_data = limitData();//budget limit and date object
    budget_data_array.length = 0;
    revenue_data_array.length = 0;
    budget_data_array.push(limit_fields_data); //store in the new array
    
    limitUpdate(budget_data_array);// update the limit meter and label
    resetLimit(); //reset the limitset form to default
})

let current_card_position = -1;
//add expense button
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

    createCard(budget_data_array)
    expenseUpdate(budget_data_array);
    remainUpdate();
    resetExpense();
})

//generate all budget details for export 
btn3.addEventListener('click', () => {
    const all_data_obj = allBudgetData(budget_data_array, revenue_data_array);
    const csvContent = createCSV(all_data_obj);
    downloadCSV(csvContent);
})

//add revenue button
let current_rev_card_position = -1;
btn4.addEventListener('click', () => {
    const isValidate = validateRevenueForm();

    if (!isValidate) {
        return;
    }

    const revenue_fields_data = revenueData();//revenue info object
    if (btn4.textContent === 'Edit revenue') {
        revenue_data_array[current_rev_card_position] = revenue_fields_data;
        btn4.textContent = 'Add new revenue';
        current_card_position = -1;
    } else {
        revenue_data_array.push(revenue_fields_data);// add objet to the array
    }

    createRevenueCard(revenue_data_array);
    revenueUpdate(revenue_data_array);
    resetRevenue();
})


//loop through budget data array to create expense cards
function createCard(budget_data_array) {
    const card_section = document.getElementById('category_container');
    card_section.innerHTML = '';// clear previous cards
    for (let index = 1; index < budget_data_array.length; index++) {
        const card = budget_data_array[index]['expense'];
        categoryCard(card, budget_data_array, index); //recreate cards with current data
    }
}

//loop through budget data array to create revenue cards
function createRevenueCard(revenue_data_array) {
    const card_section = document.getElementById('display_revenue_container');
    card_section.innerHTML = '';// clear previous cards
    for (let index = 0; index < revenue_data_array.length; index++) {
        const card = revenue_data_array[index]['revenue'];
        revenueCategoryCard(card, revenue_data_array, index); //recreate cards with current data
    }
}

// function to create the expense category card
function categoryCard(card, budget_data_array, index) {
    const graph_spent = document.getElementById('spent_amount');
    const expense_meter = document.getElementById('expense_meter');
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
    edit_btn.style.backgroundColor = 'lightblue';
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
    del_btn.style.backgroundColor = 'pink';
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
        btn2.textContent = 'Add new expense';

        //update the remaining balance area
        remainUpdate();
    })
}

//function to create revenue cards
function revenueCategoryCard(card, revenue_data_array, index) {
    const card_container = document.getElementById('display_revenue_container');

    const card_display = document.createElement('div');
    card_display.classList.add('category_items_display');
    card_container.appendChild(card_display);

    const card_label = document.createElement('div');
    card_label.classList.add('cat_label');
    card_display.appendChild(card_label);

    const category_icon = document.createElement('img');
    category_icon.setAttribute('src', 'assets/icons/revenue.png');
    category_icon.setAttribute('height', '40px')
    card_label.appendChild(category_icon);

    const category_name = document.createElement('h4');
    category_name.innerHTML = card['revenue_category'];
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
    edit_btn.style.backgroundColor = 'lightblue';
    edit_delete_btn.appendChild(edit_btn);
    //event to edit card
    edit_btn.addEventListener('click', () => {
        populateRevenueField(card);
        current_rev_card_position = index;
    })

    //delete button
    const del_btn = document.createElement('button');
    del_btn.setAttribute('type', 'button');
    del_btn.textContent = 'Delete'
    del_btn.style.backgroundColor = 'pink';
    edit_delete_btn.appendChild(del_btn);
    edit_delete_btn.appendChild(del_btn)
    //event to delete a card
    del_btn.addEventListener('click', () => {
        //delete one at this index
        revenue_data_array.splice(index, 1);
        //recreate the remaining cards
        createRevenueCard(revenue_data_array)
        btn4.textContent = 'Add new revenue';

        //update the remaining balance area
        // remainUpdate();
    })
}

//store all data in object
function allBudgetData(budget_data_array, revenue_data_array) {
    const graph_remaining = document.getElementById('remaining_amount');
    const overspent_warning = document.getElementById('overspent');
    let all_data = {
        'Budget': {
            'budget-limit': budget_data_array[0]['budget']['limit_data'],
            'start-date': budget_data_array[0]['budget']['start_budget_date'],
            'end-date': budget_data_array[0]['budget']['end_budget_date'],
        },
        'Expense': {},
        'Remaining': {
            'budget-amount-remains': graph_remaining.value,
            'overspent': overspent_warning.value
        },
        'Revenue': {}
    };
    for (let i = 1; i < budget_data_array.length; i++) {
        const expense = budget_data_array[i]['expense'];
        const category = expense['expense_category'];
        const amount = expense['amount'];
        all_data['Expense'][category] = amount;
    }

    for (let i = 0; i < revenue_data_array.length; i++) {
        const revenue = revenue_data_array[i]['revenue'];
        const category = revenue['revenue_category'];
        const amount = revenue['amount'];
        all_data['Revenue'][category] = amount;
    }
    return all_data;
}

//function to export data into cvs
function createCSV(all_data) {
    let csvContent = "Category,Key,Value\n";//initial values that creates the heading
    for (const category in all_data) {
        for (const key in all_data[category]) {
            const value = all_data[category][key];
            csvContent += `${category},${key},${value}\n`;
        }
    }
    return csvContent;
}

//function to download budget details
function downloadCSV(csvContent) {
    const blob = new Blob([csvContent], { type: 'text/csv' });//new blob object
    const url = URL.createObjectURL(blob);//generate url for download
    //invincible anchor element
    const a = document.createElement('a');
    a.href = url;
    a.download = 'all_data.csv';
    a.textContent = 'Download CSV';
    //trigger download
    a.click();
    //clean up resources
    window.URL.revokeObjectURL(url);
}