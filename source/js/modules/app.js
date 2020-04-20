'use strict';

const mainNav = document.querySelector('.main-nav');
const mainToggle = document.querySelector('.main-nav__toggle');

mainNav.classList.remove('main-nav--no-js');

mainToggle.addEventListener('click', function() {
  if (mainNav.classList.contains('main-nav--closed')) {
    mainNav.classList.remove('main-nav--closed');
    mainNav.classList.add('main-nav--opened');
  } else {
    mainNav.classList.remove('main-nav--opened');
    mainNav.classList.add('main-nav--closed');
  }
});
