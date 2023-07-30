import {renderThumbnailsPictures} from './thumbnail-pictures.js';
import {addValidationAndListeners,setUserFormSubmit} from './form/main-form.js';
import {getData} from './api.js';

getData((photos) => {
  renderThumbnailsPictures(photos);
});
setUserFormSubmit(addValidationAndListeners);
