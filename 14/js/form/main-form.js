import {isEscapeKey} from '../functions.js';
import {resetPictureScale} from './edit-scale.js';
import {resetEffects} from './edit-effects.js';

const VALIDATE_MAX_HASHTAG_COUNT = 5;
const VALIDATE_DESCRIPTION_TEXT_MAX_LENGTH = 140;

const uploaFiledForm = document.querySelector('.img-upload__form');
const uploadFileField = uploaFiledForm.querySelector('#upload-file');
const imageUploadOverlay = uploaFiledForm.querySelector('.img-upload__overlay');
const cancelButtonElement = imageUploadOverlay.querySelector('#upload-cancel');
const hashtagsTextField = imageUploadOverlay.querySelector('.text__hashtags');
const commentTextField = imageUploadOverlay.querySelector('.text__description');

const pristine = new Pristine(uploaFiledForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error',
}, false);

const isValidImageCommentLength = (value) =>
  value.length <= VALIDATE_DESCRIPTION_TEXT_MAX_LENGTH;

function isValidHastag(data) {
  return /^#[a-zа-яё0-9]{1,19}$/i.test(data);
}

function normalizeHashtags(tags) {
  return tags.trim().toLowerCase().split(' ');
}

function checkNormalizedHashtags(value) {
  if (value.length === 0) {
    return true;
  }
  return normalizeHashtags(value).every((tag) => isValidHastag(tag));
}


function validateHashtagsAmount(value) {
  return normalizeHashtags(value).length <= VALIDATE_MAX_HASHTAG_COUNT;
}

function checkHashtagsReapitings(value) {
  const tagArray = normalizeHashtags(value);
  return tagArray.length === new Set(tagArray).size;
}

function onFormSubmit(evt) {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
}

function addPristineValidation() {
  uploaFiledForm.addEventListener('submit', onFormSubmit);
  pristine.addValidator(hashtagsTextField, validateHashtagsAmount, `хештегов должно быть не более ${VALIDATE_MAX_HASHTAG_COUNT}`);
  pristine.addValidator(hashtagsTextField, checkNormalizedHashtags, 'хештег неправильный, либо содержит более 20 символов');
  pristine.addValidator(hashtagsTextField, checkHashtagsReapitings, 'повторять хештеги запрещено');
  pristine.addValidator(commentTextField, isValidImageCommentLength, `допустимая длина комментария не больше ${VALIDATE_DESCRIPTION_TEXT_MAX_LENGTH} символов`);
}

function onDocumentEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (!(hashtagsTextField === document.activeElement || commentTextField === document.activeElement)) {
      closeModalWindow();
    }
  }
}

function openModalWindow() {
  imageUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentEscKeydown);
  cancelButtonElement.addEventListener('click', onCloseButtonClick);
}

function closeModalWindow() {
  resetEffects();
  pristine.reset();
  resetPictureScale();
  uploaFiledForm.reset();
  imageUploadOverlay.classList.add('hidden');
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

uploadFileField.addEventListener('change', onUploadFileFieldChange);
cancelButtonElement.addEventListener('click', onCloseButtonClick);


function submitForm () {
  uploadFileField.addEventListener('submit', openModalWindow);
  addPristineValidation();
}
export {submitForm};
