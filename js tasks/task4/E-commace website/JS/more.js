let url = location.search;
//slice url to get product id
let startIndex = url.lastIndexOf('0') +1;
let lastIndex = url.lastIndexOf('%');
let productID = url.slice(startIndex, lastIndex);

let product = document.querySelector('.product')
let xhr = new XMLHttpRequest();
xhr.onload = function(){
  if(this.status >= 200 && this.status){
    let productData = JSON.parse(this.responseText);
    let item = `
      <div class="imag">
        <img src="${productData.image}">
      </div>
      <div class="product-info">
        <h1>${productData.title}</h1>
        <div class = "rating">
          <i class="fa-solid fa-star" style="color: #f9c815;"></i>
          <i class="fa-solid fa-star" style="color: #f9c815;"></i>
          <i class="fa-solid fa-star" style="color: #f9c815;"></i>
          <i class="fa-solid fa-star" style="color: #f9c815;"></i>
          <i class="fa-regular fa-star" style="color: #f9c815;"></i>
        </div>
        <div class="price">
          <h4>$${productData.price}</h4>
          <p class="pre-price">$300</p>
        </div>
        <div class="buttons">
          <button id="description" onclick="descriptionBtnFun()">Description</button>
          <button id="category" onclick="categoryBtnFun()">Category</button>
          <button id="reviews" onclick="reviewsBtnFun()">Reviews</button>
        </div>
        <div class="description">${productData.description}</div>
        <div class="category"> ${productData.category}</div>
        <div class="reviews"></div>
      </div>
    `;
    product.innerHTML = item;
  }
};
xhr.open('GET', 'https://fakestoreapi.com/products/'+productID);
xhr.send()



function descriptionBtnFun() {
  let descriptionBtn = document.querySelector('#description');
  let descriptionDiv = document.
  querySelector('.description');
  let categoryBtn = document.querySelector('#category');
  let categoryDiv = document.
  querySelector('.category');

  if(descriptionBtn.style.color == 'rgb(136, 136, 136)'){
    descriptionBtn.style.color = 'rgb(0,0,0)';
    descriptionDiv.style.display = "block";
    categoryBtn.style.color = 'rgb(136, 136, 136)';
    categoryDiv.style.display = "none";
  }
  else{
    descriptionBtn.style.color = 'rgb(136, 136, 136)';
    descriptionDiv.style.display = "none";
  }
}


function categoryBtnFun(){
  let categoryBtn = document.querySelector('#category');
  let categoryDiv = document.
  querySelector('.category');
  let descriptionDiv = document.
  querySelector('.description');
  let descriptionBtn = document.querySelector('#description');

  if(categoryBtn.style.color == 'rgb(136, 136, 136)'){
    categoryBtn.style.color = 'rgb(0,0,0)';
    categoryDiv.style.display = "block";
    descriptionDiv.style.display = "none";
    descriptionBtn.style.color = 'rgb(136, 136, 136)';
  }
  else{
    categoryBtn.style.color = 'rgb(136, 136, 136)';
    categoryDiv.style.display = "none";
  }

}
