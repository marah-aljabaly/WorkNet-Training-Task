let productsDiv1 = document.querySelector('main .products');
let numOfItem = document.querySelector('main .left span');
let qunatity = document.querySelector('.right-header .cart #qunatity');

let numOfProductAdd = 0; //to sum the product add to the cart


let xhr = new XMLHttpRequest();
xhr.onload = function () {
  if (this.status >= 200 && this.status < 300) {
    let productData = JSON.parse(this.responseText);
    numOfItem.innerHTML = productData.length;  //display the number of products in the website
    for(let i = 0; i < productData.length; i++) {
      let productItem = `
      <div class = "product">
        <div class = "imag">
          <img src="${productData[i].image}">
        </div>
        <div class = "product-info" id="product-info${productData[i].id}">
          <div class ="title">
            <p>${productData[i].title}</p> 
          </div>
          <div class = "price-and-rating">
            <p class="price">${productData[i].price}$</p>
            <div class = "rating">
              <i class="fa-solid fa-star" style="color: #f9c815;"></i>
              <i class="fa-solid fa-star" style="color: #f9c815;"></i>
              <i class="fa-solid fa-star" style="color: #f9c815;"></i>
              <i class="fa-solid fa-star" style="color: #f9c815;"></i>
              <i class="fa-regular fa-star" style="color: #f9c815;"></i>
            </div>
          </div>
          <p class="pre-price">300$</p>
          <p class="shipping">Free Shipping</p>
          <a href="more.html?id = ${productData[i].id}'">See more details</a>
        </div>
        <p class="check-add" id="${productData[i].id}"><i class="fa-solid fa-check" style="color: #379a39;"></i> Product added to cart</p>
        <button class = "add-to-cart-btn" onclick="addToCart(${productData[i].id});">Add to Cart</button>
      </div>
      `;
      
      productsDiv1.innerHTML += productItem;
    }
  } else {
    console.error('Error:', this.status);
  }
};
xhr.open('GET', 'https://fakestoreapi.com/products');
xhr.send();

function addToCart(productId) {
  let checkAdded = document.querySelector(`.product p[id="${productId}"]`);
  let infoDiv = document.querySelector(`#product-info${productId}`); //to css only
  checkAdded.style.display = 'block'; //display the check added to cart icon
  infoDiv.style.marginBottom = '1.8rem'
  document.cookie += `id=${productId}`; //stor the product id in the cookie
  numOfProductAdd++; 
  qunatity.innerHTML = numOfProductAdd; //insert the value to the cart
}

