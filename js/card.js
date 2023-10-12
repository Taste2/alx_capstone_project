// function to create athe category card

function categoryCard() {

    const card_container = document.getElementById('category_container');
    const expense_cat_list = document.getElementById('add_revenue');
    const expense_amount = document.getElementById('add_rev_amount');

    const card_display = document.createElement('div');
    card_container.classList.add = 'category_items_display';
    card_container.appendChild(card_display);

    const card_image = document.createElement('div');
    card_image.setAttribute('class', 'cat_img');
    card_display.appendChild(card_image);

    const category_icon = document.createElement('img');
    category_icon.setAttribute('src', 'assets/icons/limit.png');
    category_icon.setAttribute('height', '40px')
    card_image.appendChild(category_icon);

    // const category_name = document.createElement('h4');
    // category_name.innerHTML = expense_cat_list.value;
    // card_display.appendChild(category_name);

    // const category_amount = document.createElement('p');
    // category_amount.value = expense_amount.value;
    // category_amount.innerHTML = category_amount.value;
    // card_display.appendChild(category_amount);

}

export {
    categoryCard
}