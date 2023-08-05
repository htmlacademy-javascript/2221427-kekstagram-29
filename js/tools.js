const ALER_SHOW_TIME = 5000;
const FILE_TYPES = ['.apng', '.avif', '.gif', '.jpg', '.jpeg', '.jfif', '.pjpeg', '.pjp', '.png', '.svg', '.webp',];

const checkStringLength = (string, length) => {
  if (string.length <= length) {
    return false;
  }
  return true;
};
checkStringLength('Привет, друг. Как дела?', 40);

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '25px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALER_SHOW_TIME);
};

export {isEscapeKey, showAlert, FILE_TYPES};
