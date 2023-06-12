// Функция для проверки длины строки
const checkStringLength = (string, length) => {
  if (string.length <= length) {
    return false;
  }
  return true;
};
checkStringLength('Привет, друг. Как дела?', 40);

// Функция проверяющая является ли строка палиндромом
function isPalindrome(string) {
  string = string.toLowerCase().replaceAll(' ','');
  let newString = '';
  for (let i = string.length - 1; i >= 0; --i) {
    newString += string[i];
  } if (newString === string) {
    return true;
  }
  return false;
}
isPalindrome('Лёша на полке клопа нашёл ');
