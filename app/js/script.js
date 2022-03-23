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