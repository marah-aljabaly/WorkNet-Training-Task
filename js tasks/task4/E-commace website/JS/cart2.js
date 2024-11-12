let total = document.querySelector('.cart-details .top #total-price');
let products = document.querySelector('.cart-details .products');
let ProductInCartNum = document.querySelector('.cart-details .products span[id = "cart-num"]');
let totalPrice = 0;

let num;
let productData ;
let arrayOfProducts;
let productPrice;


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
              <p class="price">${productData[arrayOfProducts[i]-1].price}$</p>
              <span class="qty">QTY:</span>
              <input type="number" value="1" id="input${productData[arrayOfProducts[i] -1]}" dataID="${productData[arrayOfProducts[i] -1].id}">
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
    let inputsArray = document.querySelectorAll('input');
    for (let i = 0; i < inputsArray.length; i++) { //loop for all inputs to update qty
      inputsArray[i].addEventListener('blur', function(){ //add event change for all selector
        let newQTY = inputsArray[i].value; //get qty
        let dataID = inputsArray[i].getAttribute('dataID'); //get product id
        
        if(newQTY < productData[i].rating.count && newQTY >0){ //check if product quantity(newQTY) is available
          productPrice = (((productData[dataID-1].price)) * (newQTY-1)); //update product price as qty {(newQTY-1)  عشان لما أغير الكمية بيعتبر الاضافة الأولى خارج الكمية المحددة}
          totalPrice += productPrice;  //add total price to the cart total price
          total.innerHTML = `${totalPrice}$`; //update total price
        }
        else{
          alert("This quantity is not available!")
        }
        
      })
    }
  }  
};

xhr.open('GET', 'https://fakestoreapi.com/products/');
xhr.send();



function removeFromCart(productId) {
  //get the product with specific id (product i'll deleted from the cart) 
  let product = document.querySelector(`.products .product[id = "${productId}"]`);

  if(product){ //if the product exists
    let areYouSure = confirm("Are you sure you want to delete?");

    if(areYouSure){
      let ProductInCartNum = document.querySelector('.cart-details .products span[id = "cart-num"]');
      
      let n = ProductInCartNum.innerHTML;
      ProductInCartNum.innerHTML = --n; //decrease the number of products


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






      //update price of the product    
      // let inputPrice = document.querySelector(`.product .info input[id="input${productId}"]`);
      // console.log(inputPrice)
      // productPrice = (productData[productId-1].price)*(inputPrice.value -1);
      // totalPrice -= (productPrice);
      // total.innerHTML = `${totalPrice}$`; //update total price
      // console.log(productPrice, totalPrice)