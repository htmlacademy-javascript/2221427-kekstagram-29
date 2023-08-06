import {isEscapeKey} from './tools.js';

const successMessageElement = document.querySelector('#success').content.querySelector('.success');
const errorMessageElement = document.querySelector('#error').content.querySelector('.error');
const successButtonElement = successMessageElement.querySelector('.success__button');
const errorButtonElement = errorMessageElement.querySelector('.error__button');


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
  typeMessage = successMessageElement;
  document.body.append(successMessageElement);
  successButtonElement.addEventListener('click', closeErrorSuccessPopup);
  document.addEventListener('keydown', onErrorSussessPopupEscKeydown);
  document.addEventListener('click', onErrorSuccessPopupClose);
};

const showErrorMessagePopup = () => {
  typeMessage = errorMessageElement;
  document.body.append(errorMessageElement);
  errorButtonElement.addEventListener('click', closeErrorSuccessPopup);
  document.addEventListener('keydown', onErrorSussessPopupEscKeydown);
  document.addEventListener('click', onErrorSuccessPopupClose);
};

export {showSuccessMessagePopup, showErrorMessagePopup};
