import {openBigPhoto} from './big-picture.js';

const pictureContainer = document.querySelector('.pictures');
pictureContainer.classList.remove('visually-hidden');
const picturesTemlpate = document.querySelector('#picture').content.querySelector('.picture');

const renderThumbnailsPictures = (drawOtherPhotos) => {
  const pictureContainerFragment = document.createDocumentFragment();
  drawOtherPhotos.forEach(({url, description, likes, comments}) => {
    const userPhotoElement = picturesTemlpate.cloneNode(true);
    userPhotoElement.querySelector('.picture__img').src = url;
    userPhotoElement.querySelector('.picture__img').alt = description;
    userPhotoElement.querySelector('.picture__likes').textContent = likes;
    userPhotoElement.querySelector('.picture__comments').textContent = comments.length;
    pictureContainerFragment.append(userPhotoElement);
    userPhotoElement.addEventListener('click', () => {
      openBigPhoto({url, description, likes, comments});
    });
  });

  pictureContainer.append(pictureContainerFragment);
};
export {renderThumbnailsPictures};
