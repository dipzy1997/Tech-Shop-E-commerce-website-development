import productsData from "./data/productsData.js";



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
        <div class="browse-box">
            <p>browse all products <span><i class="fa-solid fa-arrow-right"></i></span></p>
        </div>
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