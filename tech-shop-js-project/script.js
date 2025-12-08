import productsData from "./data/productsData.js";



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
    // autoplay:true,
    // autoplayTimeout:4000,
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

  topProductsRow.innerHTML = "";

  productArray.slice(0,11).forEach((product)=>{
      const productHtmlStructure = `
           <div class="col-lg-3 col-md-4">
                        <div class="top-product-content-box">
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
                            <button class="addcartbtn red-btn">add to cart</button>
                            </div>
                            
                        </div>
                    </div>
      `
      topProductsRow.innerHTML += productHtmlStructure;
  })

  topProductsRow.innerHTML += `
     <div class="col-lg-3 col-md-4">
      <a href="./all-product.html">
          <div class="browse-box">
              <p>browse all products <span><i class="fa-solid fa-arrow-right"></i></span></p>
          </div>
      </a>
    </div>
  `
}

displayTopProducts(productsData);


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

// product searching on search bar

const searchInput = document.querySelector("#navSearch");
const suggestionBox = document.querySelector(".suggestions")

searchInput.addEventListener("input", ()=>{
  const searchInputValue = searchInput.value.toLowerCase();
  suggestionBox.innerHTML = "";
  if(searchInputValue === "") {
    suggestionBox.classList.remove("active");
    return;
  }

  let matchFound = false; // ✅ to track if any result exists

  productsData.forEach((product)=>{
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


// go to product details page if click on particular product

searchInput.addEventListener("keydown", (e)=>{
  if(e.key === "Enter"){
    if(selectedProductId){
      window.location.href = `product-details.html?id={selectedProductId}`
    }
  }
})