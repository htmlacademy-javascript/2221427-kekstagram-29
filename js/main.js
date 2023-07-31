import {renderThumbnailsPictures} from './thumbnail-pictures.js';
import {addValidationAndListeners} from './form/main-form.js';
import {getData} from './api.js';

getData((photos) => {
  renderThumbnailsPictures(photos);
});
addValidationAndListeners();
