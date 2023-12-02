/* INDEX SLIDESHOW  */
var slideIndex = 1;     // keep track of slides
var timer = null;       // control speed of the slides
let currentSlideIndex = 1;

showSlides(slideIndex); // show first slide

function plusSlides(n) {
  clearTimeout(timer);        // clears the timer when user wants to stop the slideshow
  showSlides(slideIndex += n); // display next and previous slides through increment
}

function currentSlide(n) {
  clearTimeout(timer);
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n==undefined){n = ++slideIndex}           // if n not defined move on to the next slide
  if (n > slides.length) {slideIndex = 1}       // restart to first slide when n larger than no. of slides
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {         // hiding all the slides for smooth transition
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {           // removing the active class from dots
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block"; // displays current slide
  dots[slideIndex-1].className += " active";    // adds active class to corresponding dot 
  timer = setTimeout(showSlides, 2000);         // timer that refreshes the slides every 2000ms
} 

/* FOR RESPONSIVENESS*/
function toggleMobileNavigation() {
  var x = document.getElementsByClassName("row")[0];
  if (x.style.display === "block" || x.style.display === "") {
    x.style.display = "none";   // if menu is visible hide it
  } else {
    x.style.display = "block";  // if menu hidden show it 
  }
}


/* MOBILE SEARCH BAR */
function myFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("mySearch");
  filter = input.value.toUpperCase();
  ul = document.getElementById("myMenu");
  li = ul.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    if (a.innerHTML.toUpperCase().indexOf(filter) > -1) { // compare input with my header contents that has [a] tag
      li[i].style.display = ""; // if input contains things from the list, show
    } else {
      li[i].style.display = "none"; // dont show if it doesnt contain
    }
  }
}

/* SEARCH BUTTON - INDEX PAGE */
var searchContainer = document.getElementById("search-container");
var toggleButton = document.getElementById("toggleButton");

function toggleSearchBar() {
    if (searchContainer) {
        searchContainer.style.display = "block";     // If the search container exists, set its display property to "block"
    }

    if (toggleButton) {
        toggleButton.classList.add("hidden");       // If the toggle button exists, add the "hidden" class to hide it
    }
}


function search() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("mySearch");
  filter = input.value.toUpperCase();
  ul = document.getElementById("myMenu");
  li = ul.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

document.addEventListener("click", function (event) {
    if (searchContainer && toggleButton) {
        var isClickInsideSearchContainer = searchContainer.contains(event.target); // 'event.target' refers to the element where the click event occurred
        var isClickInsideToggleButton = toggleButton.contains(event.target);

        if (!isClickInsideSearchContainer && !isClickInsideToggleButton) { // if click occur outside
            searchContainer.style.display = "none";   // hide the search container
            toggleButton.classList.remove("hidden");  // show the button
        }
    }
});

/* BOLD BUTTON UPON CLICKING - PRODUCT PAGE */
function boldButton(element) {
  // Remove border from all buttons
  let buttons = document.querySelectorAll('.color-button span');
  buttons.forEach(button => {
    button.style.border = 'none';
  });

  // Add border to the clicked button
  element.style.border = '2px solid black';
}
/* PRODUCT SLIDESHOW*/

showSlide(currentSlideIndex);

function changeSlide(n) {
  console.log(currentSlideIndex)
  showSlide(currentSlideIndex += n);
}

function currentSlide(n) {
  showSlide(currentSlideIndex = n);
}

function showSlide(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");

  let dots = document.getElementsByClassName("row");

  if (n > slides.length) { currentSlideIndex = 1; }
  if (n < 1) { currentSlideIndex = slides.length; }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[currentSlideIndex - 1].style.display = "block";
  dots[currentSlideIndex - 1].className += " active";
}

/* CART PAGE */
let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

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
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
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
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;

        if (value != null) {
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
            listCard.appendChild(newDiv);
        }
    });

    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}

function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}