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

// Get the container where we should put our testimonials item
const testiContainer = document.querySelector('.testi-item-cont');

//Get the file form json
const testimonials = new XMLHttpRequest();
testimonials.open("GET", "testimonials.json", true);
testimonials.send();

// check if we succesfully get the file and if it in readystate
testimonials.onreadystatechange = function() {
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
  let collectItem = eachItems.map((eachItem) => {

    // we collected all the data in the json then put it on html format so that we can put our page
    return `<article class="testi-item">
        <div class="item-img">
        <img src="${eachItem.img}" alt="${eachItem.name}" />
        </div>
        <h3>${eachItem.name}</h3>
        <p>${eachItem.desc}</p>
      </article>`
  }).join("");

  return collectItem;
}