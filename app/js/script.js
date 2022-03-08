const burger = document.querySelector(".burger");
const menuModal = document.querySelector(".header__menu");

burger.addEventListener('click', function() {
  burger.classList.toggle("burger-open");
  menuModal.classList.toggle("menu-open");
})