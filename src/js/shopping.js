// Cart item data
import productData from "./data/product-data.json";
console.log(productData.productData);

const itemData = productData.productData;

// Populate shopping page with productData
const shoppingPage = document.getElementById('shopping-page');

window.addEventListener('DOMContentLoaded', function() {
    displayShoppingItems(itemData);
});

function displayShoppingItems(shoppingItems) {
    let displayItems = shoppingItems
    .map(function(item) {
        return `<div class="col-sm-6 col-12">
        <div class="card" style="width: 18rem;">
            <img src=${item.image} class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              <p class="card-text">${item.text}</p>
              <p class="price-text fw-bold">Price: <span class="price">\$${item.price}</span></p>
              <button class="btn btn-primary" type="submit">Add to Cart</button>
            </div>
          </div>
    </div>`
    })
    .join('');

    shoppingPage.innerHTML = displayItems;
}


/* 
{
    name: get item name from product card
    price: get price from target product's price dataset
}

*/

// When 'add to cart' button is pressed
    // create new cart object
    // create html template of item, fill title and price with associated data

    // add item price to subtotal

    // change "Add to Cart" text to "Added to Cart"
    // disable add to cart button button

// Adding an item to cart
    // get data from target product card {title, price}
    // post data to shopping cart
    // add item price to subotal

// Removing an item from the cart
    // subtract item price from subtotal
    // change card button from "Added to Cart" to "Add to Cart"
    // enable add to cart button
    // destroy cart item data

// Calculating and displaying subtotal, tax, total
    // every new cart item adds its price to the subtotal
    // when an item is deleted, it is deconstructed and its price is subtracted from total

    // tax = subtotal * 0.725
    // total = subtotal + tax
    

// Set up Local Storage

    // add to storage

    // update storage

    // remove from storage