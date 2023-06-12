// Функция для проверки длины строки
const checkStringLength = (string, length) => {
  if (string.length <= length) {
    return false;
  }
  return true;
};
checkStringLength('Привет, друг. Как дела?', 40);

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


