import {isEscapeKey} from './functions.js';

const bigPicture = document.querySelector('.big-picture');
const closeBigPictureButton = bigPicture.querySelector('.big-picture__cancel');
const commentsList = bigPicture.querySelector('.social__comments');
const commentItem = bigPicture.querySelector('.social__comment');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentLoader = bigPicture.querySelector('.comments-loader');


const onDocumentEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPhoto();
  }
};

const onCloseButtonClick = () => {
  closeBigPhoto();
};


const renderComments = (comments) => {
  const commentsListFragment = document.createDocumentFragment();
  comments.forEach(({avatar, message, name}) => {
    const comment = commentItem.cloneNode(true);
    const commentPicture = comment.querySelector('.social__picture');
    commentPicture.src = avatar;
    commentPicture.alt = name;
    comment.querySelector('.social__text').innerText = message;
    commentsList.append(comment);
  });
  commentsList.append(commentsListFragment);
};


const openBigPhoto = ({url, likes, description, comments}) => {
  bigPicture.classList.remove('hidden');
  commentCount.classList.add('hidden');
  commentLoader.classList.add('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentEscKeydown);
  closeBigPictureButton.addEventListener('click', onCloseButtonClick);
  bigPicture.querySelector('.big-picture__img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  renderComments(comments);
  bigPicture.querySelector('.social__caption').textContent = description;
};

function closeBigPhoto () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentEscKeydown);
  closeBigPictureButton.removeEventListener('click', onCloseButtonClick);
}

export {openBigPhoto};
