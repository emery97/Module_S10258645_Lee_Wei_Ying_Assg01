 // match the first element that has the specific CSS selector
let openShopping = document.querySelector('.shopping'); 
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

// when click add active class 
openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
// vice versa 
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

// product data 
let products = [
    {
        id: 1,
        name: 'Black Shoulder Bag',
        image: 'images/products/bag_1.png',
        price: 40
    },
    {
        id: 2,
        name: 'Black Snake Skin Baguette Bag',
        image: 'images/products/bag_2.png',
        price: 40
    },
    {
        id: 3,
        name: 'Black Ruffle Bag',
        image: 'images/products/bag_3.png',
        price: 40
    },
    {
        id: 4,
        name: 'Black Box Bag',
        image: 'images/products/bag_4.png',
        price: 35
    },
];

// creates HTML elements for each product
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Cart</button>`;
        list.appendChild(newDiv);
    })
}

initApp();
// when add to cart button is clicked, adds to listCards
// if already in the list increment - reloadCard
function addToCard(key){
    if(listCards[key] == null){
        // listCards array is to keep track of products added to cart
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}

function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;

    listCards.forEach((value, key) => {
        // update total price and quantity 
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;

        // check if product has not been removed
        if (value != null) {
            // create a new list item element in the shopping cart
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            // append the new list item to shopping cart
            listCard.appendChild(newDiv);
        }
    });

    // format the totalPrice to string 
    total.innerText = totalPrice.toLocaleString();

    // sets quantity element to count 
    quantity.innerText = count;
}

// function called when the + / - button is clicked
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}