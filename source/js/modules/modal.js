'use strict';

const buttonOrder = document.querySelectorAll('.js-button-order');
const modalOverlay = document.querySelector('.modal-overlay');
const btnModal = document.querySelector('.btn-modal');

const openModal = () => modalOverlay.classList.remove('modal-overlay--hidden');

const closeModal = () => modalOverlay.classList.add('modal-overlay--hidden');

buttonOrder.forEach(item => item.addEventListener('click', openModal));

modalOverlay.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    closeModal();
  }
});

btnModal.addEventListener('click', () => closeModal());
