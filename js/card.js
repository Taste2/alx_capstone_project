// function to create athe category card

function categoryCard() {

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
    category_icon.setAttribute('src', 'assets/icons/limit.png');
    category_icon.setAttribute('height', '40px')
    card_label.appendChild(category_icon);

    const category_name = document.createElement('h4');
    category_name.innerHTML = expense_cat_list.value;
    card_label.appendChild(category_name);

    const category_amount = document.createElement('p');
    category_amount.innerHTML = expense_amount.value;
    card_label.appendChild(category_amount);

}

export {
    categoryCard
}