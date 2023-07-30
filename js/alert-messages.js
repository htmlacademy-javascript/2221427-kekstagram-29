import {isEscapeKey} from './tools.js';

const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const successButton = successMessage.querySelector('.success__button');
const errorButton = errorMessage.querySelector('.error__button');


let typeMessage;


const onErrorSussessPopupEscKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorSuccessPopup();
  }
};

const onErrorSuccessPopupClose = (evt) => {
  if (evt.target === typeMessage) {
    closeErrorSuccessPopup();
  }
};

function closeErrorSuccessPopup() {
  typeMessage.remove();
  document.removeEventListener('keydown', onErrorSussessPopupEscKeydown);
  document.removeEventListener('click',onErrorSuccessPopupClose);
}

const showSuccessMessagePopup = () => {
  typeMessage = successMessage;
  document.body.append(successMessage);
  successButton.addEventListener('click', closeErrorSuccessPopup);
  document.addEventListener('keydown', onErrorSussessPopupEscKeydown);
  document.addEventListener('click', onErrorSuccessPopupClose);
};

const showErrorMessagePopup = () => {
  typeMessage = errorMessage;
  document.body.append(errorMessage);
  errorButton.addEventListener('click', closeErrorSuccessPopup);
  document.addEventListener('keydown', onErrorSussessPopupEscKeydown);
  document.addEventListener('click', onErrorSuccessPopupClose);
};

export {showSuccessMessagePopup, showErrorMessagePopup};
