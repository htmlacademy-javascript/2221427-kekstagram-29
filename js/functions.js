// Функция для проверки длины строки
const checkStringLength = (string, length) => {
  if (string.length <= length) {
    return false;
  }
  return true;
};
checkStringLength('Привет, друг. Как дела?', 40);

const isEscapeKey = (evt) => evt.key === 'Escape';

export {isEscapeKey};
