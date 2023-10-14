// function to create athe category card
function categoryCard(card) {
    const card_container = document.getElementById('category_container');
    const expense_cat_list = document.getElementById('add_expense');
    const expense_amount = document.getElementById('add_exp_amount');

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

    const edit_btn = document.createElement('button');
    edit_btn.setAttribute('type', 'button');
    edit_btn.textContent = 'Edit'
    edit_btn.style.backgroundColor = 'blue';
    edit_delete_btn.appendChild(edit_btn);

    const del_btn = document.createElement('button');
    del_btn.setAttribute('type', 'button');
    del_btn.textContent = 'Delete'
    del_btn.style.backgroundColor = 'red';
    edit_delete_btn.appendChild(del_btn);
    card_display.appendChild(edit_delete_btn)

    del_btn.addEventListener('click', () => {
        console.log(card['expense_category'])
    })
}

export {
    categoryCard
}