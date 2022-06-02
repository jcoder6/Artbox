
// SECTION THAT WILL DISPLAY THE ARTS IN THE SHOP MODULE THE FETCHED IN JSON
const categBtn = document.querySelector('.categ-btn');
const categBody = document.querySelector('.categ-body');
// FETCHED THE DATA USING XMLHttpRequest
const artsContainer = document.querySelector('.arts-container');
const artsData = new XMLHttpRequest();
artsData.open('GET', 'json/arts.json', true);
artsData.send();

artsData.onload = () => {
  if(artsData.readyState === 4) {
    // console.log(artsData);
    const artItems = JSON.parse(artsData.responseText);
    const arts = artItems.arts;
    getUniqueCategories(arts);
    displayArts(arts);
    placeOrderFunction();

    categBtn.addEventListener('click', () => {
      categBody.classList.toggle('categ-body-open');
    })
  }
}

function displayArts(arts){
  let compiledArts = arts.map(art => {
    return `<div class="art">
          <div class="art-detail">
            <h5 class="art-title">${art.name}</h5>
            <div class="art-desc">
              <p class="artist">Artist: <span><em>...</em>${art.artist}</span></p>
              <p class="price">Price: <span><em>...</em>$${art.price}</span></p>
            </div>
            <div class="art-btns">
              <a href="#" class="atc-btn">
                <img src="./images/svgs/add to cart.svg" alt="Add to cart">
                <span class="cart-txt">Add to cart</span>
              </a>
              <a href="./place-order.html">
                <button class="place-order-btn" data-id="${art.id}">Place order</button>
              </a>
            </div>
          </div>
          <div class="art-img">
            <img src="${art.image}" alt="${art.name}">
          </div>
        </div>`
  }).join("");

  artsContainer.innerHTML = compiledArts;
}
// SECTION THAT WILL DISPLAY THE ARTS IN THE SHOP MODULE THE FETCHED IN JSON

function getUniqueCategories(arts){
  let categoriesArray = ['all'];
  arts.map((art) => {
    categoriesArray.push(art.category);
  })

  const uniqueCategory = [... new Set(categoriesArray)];
  // console.log(uniqueCategory);
  displayCategories(uniqueCategory);
  displayArtsCategory(arts);
}


function displayCategories(categories){
  let categoriesBtns = categories.map(categ => {
    return `<li class="categ-btns" data-category="${categ}"><a>${categ}</a></li>`
  }).join("");

  categBody.innerHTML = categoriesBtns;
}

function displayArtsCategory(arts){
  const filters = document.querySelectorAll('.categ-btns');
  filters.forEach(filter => {
    filter.addEventListener('click', (e) => {
      const filterClicked = e.currentTarget.dataset.category;
      let filtered = arts.filter(art => {
        if(art.category === filterClicked){
          return art;
        }
      })

      if(filterClicked === 'all'){
        displayArts(arts);
      } else {
        displayArts(filtered);
      }

      categBody.classList.remove('categ-body-open');
    })
  })
}

function placeOrderFunction() {
  const placeBtns = document.querySelectorAll('.place-order-btn');
  
  placeBtns.forEach(placeBtn => {
    placeBtn.addEventListener('click', (e) => {
      const placeOrderModal = document.querySelector('.place-order-modal');
      const body = document.querySelector('body');
      let order = e.currentTarget.dataset.id;

      placeOrderModal.classList.add('place-order-modal-open');
      body.classList.add('no-scroll');
    })
  })
}