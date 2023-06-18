import {commentsAutorNames, photoDescriptionArray, photoCommentsArray} from './moks.js';
import {TOTAL_PHOTO_AMOUNT, LIKES_AMOUNT, COMMENTS_AMOUNT} from './consts.js';

const getRandomPositiveInteger = (a, b) => {
  if (a < 0 || b < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements,) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const createComments = (number) => {
  const commentArray = [];
  for (let i = 0; i < number; i++) {
    commentArray.push({
      id: i,
      avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
      message: getRandomArrayElement(photoCommentsArray),
      name: getRandomArrayElement(commentsAutorNames)
    });
  }
  return commentArray;
};

const createPhotoObject = (index) => ({
  id: index,
  url: `photos/${index + 1}.jpg`,
  description: getRandomArrayElement(photoDescriptionArray),
  likes: getRandomPositiveInteger(LIKES_AMOUNT.min, LIKES_AMOUNT.max),
  comments: createComments(getRandomPositiveInteger(COMMENTS_AMOUNT.min, COMMENTS_AMOUNT.max))
});

const createPhotoArray = Array.from({length: TOTAL_PHOTO_AMOUNT}, (x, index) => createPhotoObject(index));

export {createPhotoArray};
