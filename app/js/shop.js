
// SECTION THAT WILL DISPLAY THE ARTS IN THE SHOP MODULE THE FETCHED IN JSON

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
    displayArts(arts);
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
              <button class="button">Place order</button>
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