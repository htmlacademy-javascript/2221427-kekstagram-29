import {commentsAutorNames, photoDescriptionArray, photoCommentsArray} from './mocks.js';
import {TOTAL_PHOTO_AMOUNT, LikesAmount, CommentsAmount} from './mock-consts.js';

// Функция проверяющая является ли строка палиндромом
const isPalindrome = (string) => {
  string = string.toLowerCase().replaceAll(' ','');
  let newString = '';
  for (let i = string.length - 1; i >= 0; --i) {
    newString += string[i];
  } if (newString === string) {
    return true;
  }
  return false;
};
isPalindrome('Лёша на полке клопа нашёл ');

// Функция извлекающая из строки цифры
const extractNumbers = (string) => {
  const numberArray = string.match(/\d+/g);
  if (numberArray === null) {
    return 'NaN';
  }
  return numberArray.join('').replace(/^0+/, '');
};
extractNumbers('Tak3 m3 to S4nTr0p3z');


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
  likes: getRandomPositiveInteger(LikesAmount.MIN, LikesAmount.MAX),
  comments: createComments(getRandomPositiveInteger(CommentsAmount.MIN, CommentsAmount.MAX))
});

const createPhotos = () => Array.from({length: TOTAL_PHOTO_AMOUNT}, (x, index) => createPhotoObject(index));
createPhotos();


//Функцию списал у соседа по парте) Как она работает разобрался, чесное пионерское!
const hoursToNumber = (time) => parseInt(time.split(':')[0], 10);

const minutesToNumber = (time) =>parseInt(time.split(':')[1], 10) / 60;

const isWithinTheWorkingDay = (start, end, meetingStart, duration) => {
  const startTime = hoursToNumber(start) + minutesToNumber(start);
  const endTime = hoursToNumber(end) + minutesToNumber(end);
  const meetingStartHours = hoursToNumber(meetingStart) + minutesToNumber(meetingStart);
  const meeingEndsAt = meetingStartHours + duration / 60;

  return meeingEndsAt <= endTime && meetingStartHours >= startTime;
};

// eslint-disable-next-line no-console
console.log(isWithinTheWorkingDay('8:00', '17:30', '08:00', 900));

export {createPhotos};


