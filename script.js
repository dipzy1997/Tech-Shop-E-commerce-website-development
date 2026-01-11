import productsData from "./data/productsData.js";
import reviewData from "./data/reviewsData.js";
import {sortMenu, brandsMenu, categoryMenu} from "./data/filterBarData.js";



//search 

const searchIcon = document.querySelector(".search-icon");
const searchContainer = document.querySelector(".search-container");
const clearbtn = document.querySelector(".clear-search-btn");
const overlay = document.querySelector(".search-overlay");

searchIcon.addEventListener("click", () => {
   searchContainer.classList.toggle("active");
    overlay.classList.toggle("active");
});
clearbtn.addEventListener("click", () => {
  searchContainer.classList.remove("active");
   overlay.classList.remove("active");
});

// user

const userICon = document.querySelector(".user-icon a");
const userPrimaryBox = document.querySelector(".user-primary-box");
const userPrimaryBoxBtn = document.querySelector(".user-primary-box button");
const loginClearBtn = document.querySelector(".login-clear-btn");
const loginBox = document.querySelector(".login-box");
const logoverlay = document.querySelector(".log-overlay");
const createAccount = document.querySelector(".createAccount");
const signupBox = document.querySelector(".signup-box");
const signClearBtn = document.querySelector(".sign-clear-btn");
const signupLogin = document.querySelector(".signup-login");


userICon.addEventListener("click", ()=>{
    userPrimaryBox.classList.toggle("active");
});
userPrimaryBoxBtn.addEventListener("click", ()=>{
    loginBox.classList.toggle("active")
    logoverlay.classList.toggle("active")
});
loginClearBtn.addEventListener("click", ()=>{
    loginBox.classList.remove("active")
    logoverlay.classList.remove("active")
    userPrimaryBox.classList.remove("active")
});
createAccount.addEventListener("click", ()=>{
    loginBox.classList.remove("active")
    signupBox.classList.toggle("active")
    logoverlay.classList.add("active")
    userPrimaryBox.classList.remove("active")
})
signClearBtn.addEventListener("click", ()=>{
    signupBox.classList.remove("active")
    logoverlay.classList.remove("active")
    userPrimaryBox.classList.remove("active")
});
signupLogin.addEventListener("click", ()=>{
    loginBox.classList.toggle("active")
    logoverlay.classList.add("active")
    signupBox.classList.remove("active")
})

// back to top button

let backToTop = document.querySelector("#backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    backToTop.classList.add("active");
  } 
  else {
    backToTop.classList.remove("active");
  }
});


// banner carousel
$(document).ready(function (){
  $('.banner-carousel').owlCarousel({
    loop:true,
    margin:10,
    dots:true,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
})
});

// clicking on shop now button in banner carousel go to that particular product details page

const bannerShopBtns = document.querySelectorAll(".banner-shop-btn");

bannerShopBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.id;
    if (id) {
      window.location.href = `product-details.html?id=${id}`;
    }
  });
});


//sticky navbar
let technavbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    technavbar.classList.add("fixed");
  } 
  else {
    technavbar.classList.remove("fixed");
  }
});

// product carousel

 $(document).ready(function(){
$('.pcarousel').slick({
       centerMode: true,
        centerPadding: '0px',
        variableWidth: true,
        // slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        dots: true,
        pauseOnHover: false,
        pauseOnFocus: false,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '0px',
        slidesToShow: 3
      }
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '0px',
        slidesToShow: 1
      }
    }
  ]
})
});


//rendering product dynamically from productData.js

const topProductsRow = document.getElementById("topProductsRow");

//function to create star

function getStarRating(count){
  let star = "";

  for(let i = 0; i < count; i++){
    star+= `<span><i class="fa-solid fa-star"></i></span>`
  }
  return star;
}

function displayTopProducts(productArray){
  if (!topProductsRow) return;

  topProductsRow.innerHTML = "";

  productArray.slice(0,11).forEach((product)=>{
    const productCard = document.createElement("div");
    productCard.classList.add("col-lg-3","col-md-4");
    productCard.innerHTML = `
        <div class="top-product-content-box" data-id="${product.id}">
            <div class="top-product-img">
                <img src="${product.images[0]}" alt="${product.title}">
            </div>
            <div class="top-product-details">
                <div class="rating-star d-flex align-items-center">
                    ${getStarRating(product.rateCount)}
                </div>
                <div class="top-product-heading">
                    <h5>${product.title}</h5>
                    <p>${product.info}</p>
                </div>
                <div class="top-product-price">
                    <p><i class="fa-solid fa-indian-rupee-sign"></i>${product.finalPrice}<span><i class="fa-solid fa-indian-rupee-sign"></i>${product.originalPrice}</span></p>
                </div>
                <button class="addcartbtn red-btn" data-id="${product.id}">add to cart</button>
            </div>
        </div>
    `;

    topProductsRow.appendChild(productCard);
  });

  // browse more
  topProductsRow.innerHTML += `
     <div class="col-lg-3 col-md-4">
      <a href="./all-product.html">
          <div class="browse-box">
              <p>browse all products <span><i class="fa-solid fa-arrow-right"></i></span></p>
          </div>
      </a>
    </div>
  `;
}
displayTopProducts(productsData)

if (topProductsRow) {
  topProductsRow.addEventListener("click", (e) => {
      if (e.target.classList.contains("addcartbtn")) return;

      const card = e.target.closest(".top-product-content-box");
      if (!card) return;

      const id = card.dataset.id;
      window.location.href = `product-details.html?id=${id}`;
  });
}

//filter data based on category

const categorybtns = document.querySelectorAll(".category-btns button");

categorybtns.forEach((button)=>{
  button.addEventListener("click", ()=>{

    //handling active class
      document.querySelector(".redbtn-active")?.classList.remove("redbtn-active");
      button.classList.add("redbtn-active");

      let category = button.textContent.toLowerCase();

      if(category === "all"){
        displayTopProducts(productsData);
      }else{
        let filteredCategory = productsData.filter((product)=> product.category.toLowerCase() === category)
        displayTopProducts(filteredCategory);
      }


  })
  
})


//add to cart button logic...(store item on local storage)

// Add to cart button (works anywhere)
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("addcartbtn")) {
        const id = Number(e.target.dataset.id);
        const product = productsData.find(p => p.id === id);
        if (!product) return;

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existProduct = cart.find(p => p.id === product.id);
        if (existProduct) {
            if (existProduct.quantity < 5) {
                existProduct.quantity++;
            } else {
                alert("Maximum quantity reached!");
            }
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();

        e.target.textContent = "Added";
        e.target.style.backgroundColor = "green";
    }
});

// Update cart count in navbar
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCountSpan = document.querySelector(".cart-icon span");

    if (!cartCountSpan) return;

    if (cart.length === 0) {
        cartCountSpan.style.opacity = 0;
    } else {
        cartCountSpan.style.opacity = 1;
        const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountSpan.textContent = totalQty;
    }
}
updateCartCount();

// Show cart on cart page
function showCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const prodAddedtoCartSec = document.querySelector(".prod-added-to-cart");
    const emptyCartSec = document.querySelector(".empty-cart-sec");
    const addedPrdBox = document.querySelector(".added-prod-box");

    if (!prodAddedtoCartSec || !emptyCartSec || !addedPrdBox) return;

    if (cart.length === 0) {
        emptyCartSec.style.display = "flex";
        prodAddedtoCartSec.classList.remove("active");
        document.querySelector(".order-summary-sec h6").textContent = "order summary (0 items)";
        return;
    }

    emptyCartSec.style.display = "none";
    prodAddedtoCartSec.classList.add("active");

    addedPrdBox.innerHTML = "";
    cart.forEach(item => {
        addedPrdBox.innerHTML += `
            <div class="added-prod-details" data-id="${item.id}">
                <div class="row">
                    <div class="col-md-4">
                        <div class="cart-prod-img">
                            <img src="${item.images[0]}" alt="${item.title}">
                        </div>
                    </div>
                    <div class="col-md-7">
                        <div class="prod-name">
                            <h6>${item.title} ${item.info || ""} </h6>
                            <p><i class="fa-solid fa-indian-rupee-sign"></i>${item.finalPrice}<span><i class="fa-solid fa-indian-rupee-sign"></i>${item.originalPrice}</span></p>
                        </div>
                        <div class="inc-dec-btn d-flex align-items-center">
                            <button class="decrease"><i class="fa-solid fa-minus"></i></button>
                            <h6>${item.quantity}</h6>
                            <button class="increase"><i class="fa-solid fa-plus"></i></button>
                        </div>
                    </div>
                    <div class="col-md-1">
                        <button class="delete-btn"><i class="fa-solid fa-trash-can"></i></button> 
                    </div>
                </div>
            </div>
        `;
    });

    updateCartProductCalculation();
}

// Increase / Decrease / Delete buttons in cart
document.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const prodRow = btn.closest(".added-prod-details");
    if (!prodRow) return;

    const id = Number(prodRow.dataset.id);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let item = cart.find(p => p.id === id);
    if (!item) return;

    if (btn.classList.contains("increase")) {
        if (item.quantity < 5) item.quantity++;
        else alert("Maximum quantity reached!");
    }

    if (btn.classList.contains("decrease")) {
        if (item.quantity > 1) item.quantity--;
        else cart = cart.filter(p => p.id !== id); // remove if 1
    }

    if (btn.classList.contains("delete-btn")) {
        cart = cart.filter(p => p.id !== id);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    showCart();
    updateCartCount();
    updateCartProductCalculation();
});


// Update total / discount / original price
function updateCartProductCalculation() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let originalTotal = 0;
    let finalTotal = 0;

    cart.forEach(item => {
        originalTotal += item.originalPrice * item.quantity;
        finalTotal += item.finalPrice * item.quantity;
    });

    const discount = originalTotal - finalTotal;

    const originalPriceEl = document.querySelector(".original-price span");
    const discountEl = document.querySelector(".discount span");
    const totalPriceEl = document.querySelector(".total-price span");
    const orderSummaryEl = document.querySelector(".order-summary-sec h6");

    if (originalPriceEl) originalPriceEl.innerHTML = `<i class="fa-solid fa-indian-rupee-sign"></i>${originalTotal}`;
    if (discountEl) discountEl.innerHTML = `-<i class="fa-solid fa-indian-rupee-sign"></i>${discount}`;
    if (totalPriceEl) totalPriceEl.innerHTML = `<i class="fa-solid fa-indian-rupee-sign"></i>${finalTotal}`;
    if (orderSummaryEl) orderSummaryEl.textContent = `order summary (${cart.length} items)`;
}

// Initialize cart on page load
showCart();
updateCartCount();
updateCartProductCalculation();



// product searching on search bar

const searchInput = document.querySelector("#navSearch");
const suggestionBox = document.querySelector(".suggestions");
let selectedProductId = null;

searchInput.addEventListener("input", ()=>{
  const searchInputValue = searchInput.value.toLowerCase();
  suggestionBox.innerHTML = "";
  if(searchInputValue === "") {
    suggestionBox.classList.remove("active");
    return;
  }

  let matchFound = false; // ✅ to track if any result exists

  productsData.forEach((product)=>{

    //updating product id while typing
    if(product.title.toLowerCase() === searchInput.value.toLowerCase()){
      selectedProductId = product.id
    }

    if(product.title.toLowerCase().includes(searchInputValue)){
        matchFound = true;
        const li = document.createElement("li");
        li.textContent = product.title;
        suggestionBox.classList.add("active");

        li.addEventListener("click", ()=>{
          searchInput.value = product.title;
          selectedProductId = product.id;
          suggestionBox.innerHTML = "";
          suggestionBox.classList.remove("active");
        })
        suggestionBox.appendChild(li)
    }  
  });
    if(!matchFound){
      suggestionBox.classList.remove("active");
    }
});


// go to product details page if click on particular product name from suggestion box or enter

searchInput.addEventListener("keydown", (e)=>{
  if(e.key === "Enter"){
    if(selectedProductId){
      window.location.href = `product-details.html?id=${selectedProductId}`
    }
  }
});

//finding the product with their id and rendering into product details page

const productId = new URLSearchParams(window.location.search).get("id");

const productFoundById = productsData.find(p => p.id == productId);

const productDetailsRow = document.querySelector("#product-details-row");
 
if(productFoundById && productDetailsRow){
  productDetailsRow.innerHTML += `
    <div class="col-md-7">
            <div class="row">
                <div class="col-md-2">
                    <div class="thumb-img">
                        ${productFoundById.images.map((img, index) =>`<img src="${img}" alt="${productFoundById.title}" class="thumb" data-index="${index}">`).join("")}
                    </div>
                </div>
                <div class="col-lg-10">
                    <div class="hero-img">
                        <img id="main-img" src="${productFoundById.images[0]}" alt="${productFoundById.title}">
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-5">

            <div class="product-details-desc">
                <h4>${productFoundById.title}</h4>
                <h6>${productFoundById.info}</h6>
                <div class="prod-details-rating d-flex align-items-center ">
                    ${getStarRating(productFoundById.rateCount)}
                    <p>${productFoundById.ratings}</p>
                </div>
            </div>

            <div class="product-details-price-sec row justify-content-between align-items-center">
                <div class="col-md-8">
                    <div class="product-details-price">
                        <p><i class="fa-solid fa-indian-rupee-sign"></i>${productFoundById.finalPrice}<span><i class="fa-solid fa-indian-rupee-sign"></i>${productFoundById.originalPrice}</span></p>
                    </div>
                    <p class="prod-details-save">you save: <span><i class="fa-solid fa-indian-rupee-sign"></i>₹${productFoundById.originalPrice - productFoundById.finalPrice}</span><span>(33%)</span></p>
                    <p class="prod-tax">(inclusive all taxes)</p>
                </div>

                <div class="col-md-4">
                    <p class="prod-details-stock"><i class="fa-solid fa-check"></i> in stock</p>
                </div>
                
            </div>

            <div class="product-details-offer">
                <h6>offers & discounts</h6>
                <div class="payment-btn">
                    <button>no cost EMI on credit cards</button>
                    <button>pay later & avail cashbacks</button>
                </div>
            </div>

            <button class="addcartbtn red-btn mt-md-5 mt-sm-3" data-id="${productFoundById.id}">add to cart</button>

        </div>
  `
  const mainImg = document.getElementById("main-img");
  const thumbnails = document.querySelectorAll(".thumb");

  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      thumbnails.forEach(t => t.classList.remove("active"))
      thumb.classList.toggle("active");
      mainImg.src = thumb.src; 
    });
  });
  if (thumbnails.length > 0) {
  thumbnails[0].classList.add("active");
  }


};

// dynamically rendering reviewdata from reviewData.js

const reviewTabContainer = document.querySelector("#review-tab-container");

function renderReviews(){
  if(!reviewTabContainer) return;

reviewTabContainer.innerHTML = "";

reviewData.forEach((review)=>{
  reviewTabContainer.innerHTML += `
    <div class="review-tab-details">
                <div class="row review-tab-row align-items-center">
                <div class="col-md-1">
                    <div class="review-user">
                        <i class="fa-solid fa-user"></i>
                    </div>
                </div>
                <div class="col-md-11">
                    <div class="reviewer-details">
                        <h6>${review.name}</h6>
                        <p class="reviewer-rating">${getStarRating(review.rateCount)} <span>${review.date}</span></p>
                    </div>
                </div>
                </div>
                <div class="reviewer-msg">
                    <p>${review.review}</p>
                </div>
            </div>
  `
})

};
renderReviews();

// dynamically rendering overview section from product details page

// const productId = new URLSearchParams(window.location.search).get("id");

// const productFoundById = productsData.find(p => p.id === Number(productId));

// [declared them before in the line number : 299,301...so reusing this code]

if (productFoundById) {
    const overviewTitleElm = document.querySelectorAll(".overview-title");
    const overviewPara = document.querySelector(".overview-para");

    overviewTitleElm.forEach((elm)=>{
      elm.textContent = productFoundById.title + " ";
    })

    if(overviewPara) {
        overviewPara.textContent = productFoundById.info + " ";
    }
}


// dynamically rendering specification tab

const specificationContainer = document.querySelector(".specification-container");

function renderspecs(){
  if(!specificationContainer || !productFoundById) return;

  specificationContainer.innerHTML = "";

  specificationContainer.innerHTML += `
        <p>brand <span>${productFoundById.brand}</span></p>
        <p>model <span>${productFoundById.title}</span></p>
        <p>generic name <span>${productFoundById.category}</span></p>
        <p>headphone type <span>${productFoundById.type}</span></p>
        <p>connectivity <span>${productFoundById.connectivity}</span></p>
        <p>microphone <span>yes</span></p>
    `

}
renderspecs();


//dynamically rendering related product in the product details page

// const productId = new URLSearchParams(window.location.search).get("id");

// const productFoundById = productsData.find(p => p.id === Number(productId));
let relatedProducts = [];

if(productFoundById){
  const relatedProducts = productsData.filter((p)=> p.category === productFoundById.category && p.id !== productFoundById.id);
}

const relatedProductRow = document.querySelector(".related-prod-row");

function relatedProduct(){
  if(!relatedProductRow) return;

  relatedProductRow.innerHTML = "";

  relatedProducts.forEach((p)=>{
    relatedProductRow.innerHTML += `
      <div class="col-lg-3 col-md-4">
                <div class="top-product-content-box">
                    <div class="top-product-img">
                        <img src="${p.images[0]}">
                    </div>
                    <div class="top-product-details">
                    <div class="rating-star d-flex align-items-center">
                         ${getStarRating(p.rateCount)}
                    </div>
                    <div class="top-product-heading">
                        <h5>${p.title}</h5>
                        <p>${p.info}</p>
                    </div>
                    <div class="top-product-price">
                        <p><i class="fa-solid fa-indian-rupee-sign"></i>${p.finalPrice}<span><i class="fa-solid fa-indian-rupee-sign"></i>${p.originalPrice}</span></p>
                    </div>
                    <button class="addcartbtn red-btn data-id=${p.id}">add to cart</button>
                    </div>
                        
                </div>
            </div>
    `
  })

}
relatedProduct();

// all-products html page showing all the product

const allProductContainer = document.querySelector("#all-products-container")
function renderAllProducts(products){
    if(!allProductContainer) return;

    allProductContainer.innerHTML = "";

    products.forEach((product)=>{
        const img = product.images && product.images[0] ? product.images[0] : "./images/default.png";
        const info = product.info || "";
        const title = product.title || "No title";
        const finalPrice = product.finalPrice || 0;
        const originalPrice = product.originalPrice || 0;
        const rateCount = product.rateCount || 0;

        // Use a wrapper div with a data-id attribute
        const productCard = document.createElement("div");
        productCard.classList.add("col-md-4", "col-sm-12");
        productCard.innerHTML = `
            <div class="top-product-content-box" data-id="${product.id}">
                <div class="top-product-img">
                    <img src="${img}" alt="${title}">
                </div>
                <div class="top-product-details">
                    <div class="rating-star d-flex align-items-center">
                        ${getStarRating(rateCount)}
                    </div>
                    <div class="top-product-heading">
                        <h5>${title}</h5>
                        <p>${info}</p>
                    </div>
                    <div class="top-product-price">
                        <p><i class="fa-solid fa-indian-rupee-sign"></i>${finalPrice}<span><i
                          class="fa-solid fa-indian-rupee-sign"></i>${originalPrice}</span></p>
                    </div>
                    <button class="addcartbtn red-btn" data-id="${product.id}">add to cart</button>
                </div>
            </div>
        `;

        allProductContainer.appendChild(productCard);

        // Add click listener on the card except the add to cart button
        productCard.addEventListener("click", (e) => {
            if (!e.target.classList.contains("addcartbtn")) {
                window.location.href = `product-details.html?id=${product.id}`;
            }
        });
    });
}
renderAllProducts(productsData);

// all product page functionalities with sort, filter, brandc category

const sortList = document.querySelector(".all-sort-sec ul");
const brandsList = document.querySelector(".all-filter-sec ul:nth-of-type(1)");
const categoryList = document.querySelector(".all-filter-sec ul:nth-of-type(2)");

// Render "Sort By" dynamically
sortMenu.forEach(sort => {
    const li = document.createElement("li");
    li.textContent = sort.title;
    li.dataset.id = sort.id;
    sortList.appendChild(li);
});

// Render "Brands" dynamically
brandsMenu.forEach(brand => {
    const li = document.createElement("li");
    li.innerHTML = `<label><input type="checkbox" value="${brand.label}"> ${brand.label}</label>`;
    brandsList.appendChild(li);
});

// Render "Category" dynamically
categoryMenu.forEach(cat => {
    const li = document.createElement("li");
    li.innerHTML = `<label><input type="checkbox" value="${cat.label}"> ${cat.label}</label>`;
    categoryList.appendChild(li);
});

// adding price range , filter,sort functionalities

const filterClearBtn = document.querySelector(".filter-clear-btn");
const priceRange = document.querySelector("#price-range");
const priceValue = document.getElementById("price-value");

  // Filter by price range
    const prices = productsData.map(p => p.finalPrice);
    priceRange.min = Math.min(...prices);
    priceRange.max = Math.max(...prices);
    priceRange.value = priceRange.max;
    priceValue.textContent = priceRange.value;

    priceRange.addEventListener("input", () => {
    priceValue.textContent = priceRange.value;
    applyFiltersAndSort(); // re-render filtered products
});

// Function to apply filters & sorting
function applyFiltersAndSort() {
    let filteredProducts = [...productsData];

    // Filter by brand
    const selectedBrands = Array.from(brandsList.querySelectorAll("input:checked")).map(input => input.value);
    if (selectedBrands.length) {
        filteredProducts = filteredProducts.filter(p => selectedBrands.includes(p.brand));
    }

    // Filter by category
    const selectedCategories = Array.from(categoryList.querySelectorAll("input:checked")).map(input => input.value);
    if (selectedCategories.length) {
        filteredProducts = filteredProducts.filter(p => selectedCategories.includes(p.category));
    }

    //filter by price range
    const maxPrice = Number(priceRange.value);
    filteredProducts = filteredProducts.filter(p => p.finalPrice <= maxPrice);


    // Sort
    const selectedSortLi = sortList.querySelector("li.selected");
    if (selectedSortLi) {
        const sortId = Number(selectedSortLi.dataset.id);
        switch(sortId) {
            case 1: // Latest
                filteredProducts.sort((a,b) => b.id - a.id);
                break;
            case 2: // Top Rated
                filteredProducts.sort((a,b) => b.rateCount - a.rateCount);
                break;
            case 3: // Price Low
                filteredProducts.sort((a,b) => a.finalPrice - b.finalPrice);
                break;
            case 4: // Price High
                filteredProducts.sort((a,b) => b.finalPrice - a.finalPrice);
                break;
        }
    }

     // Show clear button if any filter/sort is applied
    if (selectedBrands.length || selectedCategories.length || maxPrice < Number(priceRange.max) || selectedSortLi) {
        filterClearBtn.style.display = "block";
    } else {
        filterClearBtn.style.display = "none";
    }

    renderAllProducts(filteredProducts);
    toggleClearBtn() 
}

// Event listeners
brandsList.addEventListener("change", applyFiltersAndSort);
categoryList.addEventListener("change", applyFiltersAndSort);
priceRange.addEventListener("input", applyFiltersAndSort);

// Sort click
sortList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        sortList.querySelectorAll("li").forEach(li => li.classList.remove("selected"));
        e.target.classList.add("selected");
        applyFiltersAndSort();
    }
});

// Clear filters
filterClearBtn.addEventListener("click", () => {
    // Reset filters
    brandsList.querySelectorAll("input").forEach(i => i.checked = false);
    categoryList.querySelectorAll("input").forEach(i => i.checked = false);
    
    const prices = productsData.map(p => p.finalPrice);
    const maximumPrice = Math.max(...prices);
    priceRange.value = maximumPrice;
    priceValue.textContent = maximumPrice;

    sortList.querySelectorAll("li").forEach(li => li.classList.remove("selected"));

    filterClearBtn.style.display = "none";

    // Re-render products and hide button
    applyFiltersAndSort();
});

//toggling clear filter buttoon
function toggleClearBtn() {
    const selectedBrands = Array.from(brandsList.querySelectorAll("input:checked")).map(i => i.value);
    const selectedCategories = Array.from(categoryList.querySelectorAll("input:checked")).map(i => i.value);
    const selectedSortLi = sortList.querySelector("li.selected");
    const maxPriceValue = Number(priceRange.value);

    if (selectedBrands.length || selectedCategories.length || maxPriceValue < Number(priceRange.max) || selectedSortLi) {
        filterClearBtn.style.display = "block";
    } else {
        filterClearBtn.style.display = "none";
    }
}