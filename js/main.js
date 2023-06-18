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

const TOTAL_PHOTO_AMOUNT = 25;

const LIKES_AMOUNT = {
  min: 15,
  max: 200,
};

const COMMENTS_AMOUNT = {
  min: 0,
  max: 30,
};

const COMMETNTS_AUTHOR_NAMES = ['Вася','Петя','Миша','Маша','Саломон','Кексик','Булочка','Казявка','Лена','Света','Костя','Иван','Марьяна','Петя','Марк','Босс','Альфа','Омега'];

const PHOTO_DESCRIPTION_ARRAY = [
  'Моя тачка!',
  'Это я на пляже',
  'Хочу на морюшко!!!',
  'А тут прям инфаркт-леопарда! Ну вы поняли',
  'Забыл камеру протереть',
  'Чилим!',
  'Самолёёёётиииииикк!',
  'Зацените тапки-унты!',
  'Которолл, вкусняшка!',
  'По уши!',
  'щас поем!',
  'Да это же McLaren P1!!!! Пушка-гонка!',
];

const PHOTO_COMMENTS_ARRAY = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  'Горизонт то, все таки, завален!',
  'Фоткали на чехол от телефона, или это все же камера домофона?',
  'Супер, мне нравится!',
  'Сделай попроще лицо!',
  'Да кто вообще пишет эти комменты к фото?!',
];

const createComments = (number) => {
  const commentArray = [];
  for (let i = 0; i < number; i++) {
    commentArray.push({
      id: i,
      avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
      message: getRandomArrayElement(PHOTO_COMMENTS_ARRAY),
      name: getRandomArrayElement(COMMETNTS_AUTHOR_NAMES)
    });
  }
  return commentArray;
};

const createPhotoObject = (index) => ({
  id: index,
  url: `photos/${index + 1}.jpg`,
  description: getRandomArrayElement(PHOTO_DESCRIPTION_ARRAY),
  likes: getRandomPositiveInteger(LIKES_AMOUNT.min, LIKES_AMOUNT.max),
  comments: createComments(getRandomPositiveInteger(COMMENTS_AMOUNT.min, COMMENTS_AMOUNT.max))
});

const createPhotoArray = Array.from({length: TOTAL_PHOTO_AMOUNT}, (x, index) => createPhotoObject(index));
// eslint-disable-next-line no-console
console.log(createPhotoArray);
