// Cart item data
import productData from "./data/product-data.json";
// console.log(productData.productData);

const itemData = productData.productData;

// ELEMENT SELECTIONS
const shoppingPage = document.getElementById('shopping-page');
const shoppingCart = document.getElementById('products-container');
const checkoutInfo = document.getElementById('checkout-section');


// GLOBAL VARIABLES
let tax = 0.0725;

window.addEventListener('DOMContentLoaded', function() {
    displayShoppingItems(itemData);
    initializeCheckout();
});

// Populate shopping page with productData
function displayShoppingItems(shoppingItems) {
    let displayItems = shoppingItems
    .map(function(item) {
        return `<div class="col-lg-4 col-md-6 mb-3 d-flex aligh-items-stretch">
        <div class="card" style="width: 18rem;">
            <img src=${item.image} class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              <p class="card-text">${item.text}</p>
              <p class="price-text fw-bold">Price: <span class="price">${currencyFormatter.format(item.price)}</span></p>
              <button class="btn btn-primary cart-btn d-flex" type="submit" id="productBtn-${item.id}" data-id="${item.id}">Add to Cart</button>
            </div>
          </div>
    </div>`
    })
    .join('');

    shoppingPage.innerHTML = displayItems;
}
const currencyFormatter = new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD'
});
function initializeCheckout() {
    checkoutInfo.innerHTML = `<div class="container mt-4">
    <p>Subtotal: <span class="subtotal position-absolute start-50">$0</span></p>
    <p class="border-bottom pb-1">Tax: <span class="tax position-absolute start-50">$0</span></p>
    <p class="fw-bold">Total: <span class="total position-absolute start-50">$0</span></p>
  </div>`
}

// When 'add to cart' button is pressed
    // create new cart object
    const cartObject = {
        cartItems: [
        ],
        subtotal: 0,
        total: 0,
};
// console.log(cartObject.cartItems.find(x => x.id === 1));
shoppingPage.addEventListener('click', function(e) {
    const productID = e.target.dataset["id"];
    const productBtn = e.target;
    // console.log(productID);
    // console.log(cartObject["id"] == productID);
    
    // Checks if the "Add to Cart" btn is being pressed
    if (productID) {
        const newCartItem = {
            id: 0,
            title: "",
            price: 0.00
        }
        /* 
        If the id already exists in the cart, don't want to duplicate its data. If the id isn't already in the cart, add its data to the cart.

        This could later be changed, if the id does already exist, just increase its quantity in the cart.
        */

        if (cartObject.cartItems.find(x => x.id == productID) === undefined){ // add new cartItem
            // post data to shopping cart
            newCartItem.id = productID;
            newCartItem.title = itemData.find(x => x.id == productID)["title"];
            newCartItem.price = itemData.find(x => x.id == productID)["price"];
            cartObject.cartItems.push(newCartItem);
            
            // add item price to subtotal
            cartObject.subtotal += newCartItem.price;
            
            // change "Add to Cart" text to "Added to Cart"
            productBtn.innerHTML = "Added to Cart";
            // disable add to cart button button
            productBtn.classList.add('disabled');

            // create html template of item, fill title and price with associated data
            updateShoppingCart();
        //   update local storage
            
            console.log("added to cart");
            console.log(cartObject.cartItems);
            console.log("subtotal: " + cartObject.subtotal);
            
        } else {
            console.log("item already in cart");
        }
    }
});

// removing an item from the cart
shoppingCart.addEventListener('click', function(e){
    const cartItemID = e.target.dataset["id"];
    const productBtn = document.getElementById(`productBtn-${cartItemID}`);
    
    if (cartItemID) {
        // subtract item price from subtotal
        cartObject.subtotal -= cartObject.cartItems.find(x => x.id ==cartItemID)["price"];
        // remove item from cart
        const cartItemIndex = cartObject.cartItems.indexOf(cartObject.cartItems.find(x => x.id == cartItemID));
        cartObject.cartItems.splice(cartItemIndex, 1);

        // change card button from "Added to Cart" to "Add to Cart"
        productBtn.innerHTML = "Add to Cart"
        // enable add to cart button
        productBtn.classList.remove('disabled');

        updateShoppingCart();
        // update local storage

        console.log("removed from cart");
        console.log(cartObject.cartItems);
    }
})

function updateShoppingCart() {
    shoppingCart.innerHTML = cartObject.cartItems
    .map(function(item){
        return `<!-- start product -->
        <div class="row product">
          <div class="col-12">
            <p class="product-title">${item.title} 
            <span class="product-price position-absolute start-50">
              ${currencyFormatter.format(item.price)}
            </span>
            <button class="cart-item-delete position-absolute end-0 me-4" data-id="${item.id}">
              <i class="fas fa-xmark" data-id="${item.id}"></i>
            </button>
            </p>
          </div>
        </div>
        <!-- end product -->`
    })
    .join('');
    // update checkout info (subtotal, tax, total)
    checkoutInfo.innerHTML = `<div class="container mt-4">
    <p>Subtotal: <span class="subtotal position-absolute start-50">${currencyFormatter.format(cartObject.subtotal)}</span></p>
    <p class="border-bottom pb-1">Tax: <span class="tax position-absolute start-50">${currencyFormatter.format(cartObject.subtotal * tax)}</span></p>
    <p class="fw-bold">Total: <span class="total position-absolute start-50">${currencyFormatter.format(cartObject.subtotal + cartObject.subtotal * tax)}</span></p>
  </div>
  <button class="checkout-button btn btn-secondary">Checkout</button>`;
}  

// Set up Local Storage

    // add to storage

    // update storage

    // remove from storage