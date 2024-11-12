let total = document.querySelector('.cart-details .top #total-price');
let products = document.querySelector('.cart-details .products');
let ProductInCartNum = document.querySelector('.cart-details .products span[id = "cart-num"]');
let totalPrice = 0;

let num;
let productData ;
let arrayOfProducts;
let productPrice;


let dataID;
let newQTY;

//get products from cookie and display them in the cart
let xhr = new XMLHttpRequest();
xhr.onload = function (){
  if (this.status >= 200 && this.status < 300) {
    productData = JSON.parse(this.responseText);
    let arrayOfProductsFromCookie = document.cookie.split('id='); //array of products id from cookie

    //delete repeated product
    arrayOfProducts = arrayOfProductsFromCookie.filter((element, index) => { 
      return arrayOfProductsFromCookie.indexOf(element) === index;
    })
    
    //display number of products in the cart
    num = arrayOfProducts.length-1;
    ProductInCartNum.innerHTML = num;

    //loop to add items
    for (let i = 1; i < arrayOfProducts.length; i++) { //start from i=1 cuz the first element is ''

      let item = `
        <div class="product" id="${productData[arrayOfProducts[i]-1].id}">
          <div class="imag">
            <img src="${productData[arrayOfProducts[i]-1].image}">
          </div>
          <div class="info">
            <h3 class="title">${productData[arrayOfProducts[i]-1].title}</h3>
            <div class="price-and-count">
              <p class="price">${productData[arrayOfProducts[i]-1].price} $</p>
              <span class="qty">QTY:</span>
              <select id="select${productData[arrayOfProducts[i] - 1].id}" dataID="${productData[arrayOfProducts[i] - 1].id}">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <p class="shipping"><i class="fa-solid fa-check" style="color: #379a39;"></i> Free Shipping</p>
              <a href="more.html?id = ${productData[arrayOfProducts[i] - 1].id}'">See more details</a>
            </div>
          </div>
          <div class="buttons">
            <hr>
            <button class="save-btn">Save for latter</buton>
            <button class="delete-btn" onclick="
              removeFromCart(${productData[arrayOfProducts[i]-1].id});
            ">Delete</buton>
          </div>
        </div>
      `;
      
      //display the product price (1 item per product)
      productPrice = (productData[arrayOfProducts[i]-1].price);
      totalPrice += ((productData[arrayOfProducts[i]-1].price))
      total.innerHTML = `${totalPrice}$`; //add total price
      products.innerHTML += item; ///add product card 
    }
    
    //update qty and price when user change it
    let selector = document.querySelectorAll('select');
    for (let i = 0; i < selector.length; i++) { //loop for all selectors to update qty
      selector[i].addEventListener('change', function(event){ //add event change for all selector
        newQTY = event.target.value; //get qty
        dataID = event.target.getAttribute('dataID'); //get product id
      
        productPrice = (((productData[dataID-1].price)) * (newQTY-1)); //update product price as qty {(newQTY-1)  عشان لما أغير الكمية بيعتبر الاضافة الأولى خارج الكمية المحددة}
        totalPrice += productPrice;  //add total price to the cart total price
        total.innerHTML = `${totalPrice}$`; //update total price
      })
    }
  }  
};

xhr.open('GET', 'https://fakestoreapi.com/products/');
xhr.send();



function removeFromCart(productId) {
  //get the product with specific id (product i'll deleted from the cart) 
  let product = document.querySelector(`.products .product[id = "${productId}"]`);
  console.log(newQTY)

  if(product){ //if the product exists
    let areYouSure = confirm("Are you sure you want to delete?");

    if(areYouSure){
      let ProductInCartNum = document.querySelector('.cart-details .products span[id = "cart-num"]');
      
      let n = ProductInCartNum.innerHTML;
      ProductInCartNum.innerHTML = n--; //decrease the number of products
      console.log(ProductInCartNum.innerHTML, n)

      //update price of the product    
      productPrice = (productData[productId-1].price);
      totalPrice -= (productPrice);
      total.innerHTML = `${totalPrice}$`; //update total price
      console.log(productPrice, totalPrice)
  

      product.remove(); //delete product from the cart

      //remove the product from the cart api
      let xhr = new XMLHttpRequest();
      xhr.open('DELETE', 'https://fakestoreapi.com/products/'+ productId);
      xhr.onload = function() {
      if (xhr.status >= 200 & this.status < 300) {
        alert("Deleted successfully.");
      } else {
        alert.error("Failed to delete product ");
      }
      };
      xhr.send();
    }
  }
  else{
    console.log("product not found");
  }
}


let a = document.querySelectorAll('.product a')
console.log(a)