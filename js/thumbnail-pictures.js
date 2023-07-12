const pictureContainer = document.querySelector('.pictures');
pictureContainer.classList.remove('visually-hidden');
const picturesTemlpate = document.querySelector('#picture').content.querySelector('.picture');

const renderThumbnailsPictures = (drawOtherPhotos) => {
  const pictureContainerFragment = document.createDocumentFragment();
  drawOtherPhotos().forEach((photo)=> {
    const userPhotoElement = picturesTemlpate.cloneNode(true);
    userPhotoElement.querySelector('.picture__img').src = photo.url;
    userPhotoElement.querySelector('.picture__img').alt = photo.description;
    userPhotoElement.querySelector('.picture__likes').textContent = photo.likes;
    userPhotoElement.querySelector('.picture__comments').textContent = photo.comments.length;

    pictureContainerFragment.appendChild(userPhotoElement);

  });

  pictureContainer.append(pictureContainerFragment);
};
export {renderThumbnailsPictures};
