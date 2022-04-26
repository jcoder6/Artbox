/* =============================
    NAV BAR MENU SCRIPTS
===============================*/
const burger = document.querySelector(".burger");
const menuModal = document.querySelector(".header__menu");
const body = document.querySelector('body');

burger.addEventListener('click', function() {
  burger.classList.toggle("burger-open");
  menuModal.classList.toggle("menu-open");
  body.classList.toggle("scroll-none");
});

const menuLinks = document.querySelectorAll('.menu-links');

menuLinks.forEach((menuLink) => {                        // FUNCTION THAT REMOVE ALL THE CLASS LIST WE ADDED TO HTML DOCUMENT
  menuLink.addEventListener('click', function() {
    burger.classList.remove("burger-open");
    menuModal.classList.remove("menu-open");
    body.classList.remove("scroll-none");
  })
})

/* =============================
    TESTIMONIALS SCRIPTS
===============================*/
// Get the container where we should put our testimonials item
const testiContainer = document.querySelector('.testi-item-cont');

//Get the file form json
const testimonials = new XMLHttpRequest();
testimonials.open("GET", "json/testimonials.json", true);
testimonials.send();

// check if we succesfully get the file and if it in readystate
testimonials.onload = function() {
  if(this.readyState === 4){

    //fetch the item we get and convert it into array
    const testiItems = JSON.parse(testimonials.responseText);
    getEachTesti(testiItems);
  }
}

function getEachTesti(items){
  // console.log(items);
  const eachItems = items.testi;
  // console.log(eachItems[0].name);
  // Compile each testimonials to whole html format
  const htmlTesti = compileItems(eachItems);
  // console.log(htmlTesti);
  testiContainer.innerHTML = htmlTesti;
}

function compileItems(eachItems){
  let collectItem = eachItems.map((eachItem, index) => {

    // we collected all the data in the json then put it on html format so that we can put our page
    return `<article class="testi-item" style="left: ${index * 100}%">
        <div class="person">
          <div class="person-img">
            <img src="${eachItem.img}" alt="mer" />
          </div>
          <h3>${eachItem.name}</h3>
        </div>
        <p class="desc">${eachItem.desc}</p>
      </article>`
  }).join("");

  return collectItem;
}

const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
window.onload = function() {
  const testiSlides = document.querySelectorAll('.testi-item');
  const totalTesti = testiSlides.length - 2;
  let count = 1;

  defaultDisplay(testiSlides);
  nextBtn.addEventListener('click', function() {
    count++
    console.log('next btn');
    slideFunction(testiSlides, count, totalTesti);
  })

  prevBtn.addEventListener('click', () => {
    count--
    console.log('prev btn');
    slideFunction(testiSlides, count, totalTesti);
  })
}

function slideFunction(testiSlides, a, b) {
  console.log(a);
  if(a > b){
    nextBtn.style.opacity = `0.5`
    nextBtn.style.pointerEvents = `none`
  } else {
    nextBtn.style.opacity = `1`
    nextBtn.style.pointerEvents = `auto`
  }

  if(a > 0 ){
    prevBtn.style.opacity = `1`
    prevBtn.style.pointerEvents = `auto`
  } else {
    prevBtn.style.opacity = `0.5`
    prevBtn.style.pointerEvents = `none`
  }
  testiSlides.forEach((testiSlide) => {
    testiSlide.style.transform = `translateX(-${a * 100}%)`
  })
}

function defaultDisplay(testi){
  testi.forEach((tes) => {
    tes.style.transform = `translateX(-100%)`
  })
}