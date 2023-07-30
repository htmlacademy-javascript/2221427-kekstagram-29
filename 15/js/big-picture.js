import {isEscapeKey} from './tools.js';

const COMMENTS__LOAD_COUNT = 5;

const bigPhotoElement = document.querySelector('.big-picture');
const closePhotoElement = bigPhotoElement.querySelector('.big-picture__cancel');
const commentsListElement = bigPhotoElement.querySelector('.social__comments');
const commentElemen = commentsListElement.querySelector('.social__comment');
const loadMoreCommentsElement = bigPhotoElement.querySelector('.social__comments-loader');
const commentCountElement = bigPhotoElement.querySelector('.social__comment-count');

let renderedComents = COMMENTS__LOAD_COUNT;


const createComment = (comments) => {
  if (renderedComents >= comments.length) {
    renderedComents = comments.length;
    loadMoreCommentsElement.classList.add('hidden');
  } else {
    loadMoreCommentsElement.classList.remove('hidden');
  }
  commentCountElement.innerHTML = `${renderedComents} из <span class="comments-count">${comments.length}</span> комментариев`;
  const commentItems = commentsListElement.querySelectorAll('.social__comment');
  for (let i = 0; i < renderedComents; i++) {
    commentItems[i].classList.remove('hidden');
  }
};

const renderComments = (comments) => {
  commentsListElement.innerHTML = '';
  const commentsListFragment = document.createDocumentFragment();
  comments.forEach(({avatar, name, message}) => {
    const comment = commentElemen.cloneNode(true);
    const commentPicture = comment.querySelector('.social__picture');
    commentPicture.src = avatar;
    commentPicture.alt = name;
    comment.querySelector('.social__text').innerText = message;
    comment.classList.add('hidden');
    commentsListElement.append(comment);
  });
  commentsListElement.append(commentsListFragment);
  createComment(comments);
};

const openBigPhoto = ({url, likes, description, comments}) => {
  bigPhotoElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  closePhotoElement.addEventListener('click', onCloseButtonClick);
  bigPhotoElement.querySelector('.big-picture__img img').src = url;
  bigPhotoElement.querySelector('.likes-count').textContent = likes;
  bigPhotoElement.querySelector('.social__caption').textContent = description;
  renderComments(comments);
  loadMoreCommentsElement.addEventListener('click', onLoadButtonClick);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPhoto();
  }
}

function onCloseButtonClick() {
  closeBigPhoto();
}

function onLoadButtonClick() {
  const comments = commentsListElement.children;
  renderedComents += COMMENTS__LOAD_COUNT;
  createComment(comments);
}

function closeBigPhoto() {
  bigPhotoElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  closePhotoElement.removeEventListener('click', onCloseButtonClick);
  loadMoreCommentsElement.removeEventListener('click', onLoadButtonClick);
  renderedComents = COMMENTS__LOAD_COUNT;
}

export {openBigPhoto};
