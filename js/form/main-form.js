const VALIDATE_MAX_HASHTAG_COUNT = 5;
const VALIDATE_DESCRIPTION_TEXT_MAX_LENGTH = 140;
const FILE_TYPES = ['.apng', '.avif', '.gif', '.jpg', '.jpeg', '.jfif', '.pjpeg', '.pjp', '.png', '.svg', '.webp',];

import {isEscapeKey} from '../tools.js';
import {resetPictureScale} from './edit-scale.js';
import {resetEffects} from './edit-effects.js';
import {showErrorMessagePopup, showSuccessMessagePopup} from '../alert-messages.js';
import {sendData} from '../api.js';


const uploaFormElement = document.querySelector('.img-upload__form');
const uploadInputElement = uploaFormElement.querySelector('.img-upload__input');
const uploadFileElement = uploaFormElement.querySelector('#upload-file');
const imageUploadOverlayElement = uploaFormElement.querySelector('.img-upload__overlay');
const cancelButtonElement = imageUploadOverlayElement.querySelector('#upload-cancel');
const hashtagsTextFieldElement = imageUploadOverlayElement.querySelector('.text__hashtags');
const commentTextFieldElement = imageUploadOverlayElement.querySelector('.text__description');
const submitButtonElement = uploaFormElement.querySelector('.img-upload__submit');
const userPhotoPreviewElement = imageUploadOverlayElement.querySelector('.img-upload__preview img');


const displayUserPhoto = () => {
  const file = uploadInputElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    userPhotoPreviewElement.src = URL.createObjectURL(file);
  }
};

const pristine = new Pristine(uploaFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error',
}, false);

const isValidImageCommentLength = (value) =>
  value.length <= VALIDATE_DESCRIPTION_TEXT_MAX_LENGTH;

const isValidHastag = (data) => /^#[a-zа-яё0-9]{1,19}$/i.test(data);

const normalizeHashtags = (tags) => tags.trim().toLowerCase().split(' ');

const checkNormalizedHashtags = (value) => {
  if (value.length === 0) {
    return true;
  }
  return normalizeHashtags(value).every((tag) => isValidHastag(tag));
};

const validateHashtagsAmount = (value) => normalizeHashtags(value).length <= VALIDATE_MAX_HASHTAG_COUNT;

const checkHashtagsReapitings = (value) => {
  const tagArray = normalizeHashtags(value);
  return tagArray.length === new Set(tagArray).size;
};

const addPristineValidation = () => {
  uploaFormElement.addEventListener('submit', setUserFormSubmit);
  pristine.addValidator(hashtagsTextFieldElement, validateHashtagsAmount, `хештегов должно быть не более ${VALIDATE_MAX_HASHTAG_COUNT}`);
  pristine.addValidator(hashtagsTextFieldElement, checkNormalizedHashtags, 'хештег неправильный, либо содержит более 20 символов');
  pristine.addValidator(hashtagsTextFieldElement, checkHashtagsReapitings, 'повторять хештеги запрещено');
  pristine.addValidator(commentTextFieldElement, isValidImageCommentLength, `допустимая длина комментария не больше ${VALIDATE_DESCRIPTION_TEXT_MAX_LENGTH} символов`);
};

const onDocumentEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    if (!(hashtagsTextFieldElement === document.activeElement || commentTextFieldElement === document.activeElement)) {
      if (document.querySelector('.error') === null) {
        evt.preventDefault();
        closeModalWindow();
      }
    }
  }
};

const openModalWindow = () => {
  imageUploadOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentEscKeydown);
  cancelButtonElement.addEventListener('click', onCloseButtonClick);
  displayUserPhoto();
};

function closeModalWindow() {
  resetEffects();
  pristine.reset();
  resetPictureScale();
  uploaFormElement.reset();
  imageUploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentEscKeydown);
  cancelButtonElement.removeEventListener('click', onCloseButtonClick);
}

function onCloseButtonClick() {
  closeModalWindow();
}

const onUploadFileFieldChange = () => {
  openModalWindow();
};

uploadFileElement.addEventListener('change', onUploadFileFieldChange);
cancelButtonElement.addEventListener('click', onCloseButtonClick);


const addValidationAndListeners = () => {
  uploadFileElement.addEventListener('submit', openModalWindow);
  addPristineValidation();
};


const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Публикую...';
};

const unBlockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
};

function setUserFormSubmit(evt) {

  const isValid = pristine.validate();
  evt.preventDefault();
  if (isValid) {
    blockSubmitButton();
    sendData(
      () => {
        showSuccessMessagePopup();
        unBlockSubmitButton();
        closeModalWindow();
      },
      () => {
        showErrorMessagePopup();
        unBlockSubmitButton();
      },
      new FormData(evt.target)
    );
  }
}


export {addValidationAndListeners};
