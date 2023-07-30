const DEFAULT_SCALE_VALUE = 100;
const STEP_SCALE_VALUE = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;

const smallerScaleButton = document.querySelector('.scale__control--smaller');
const biggerScaleButton = document.querySelector('.scale__control--bigger');
const scaleFieldValue = document.querySelector('.scale__control--value');
const image = document.querySelector('.img-upload__preview img');

const imagePreviewScale = (value = DEFAULT_SCALE_VALUE) => {
  image.style.transform = `scale(${value / 100})`;
  scaleFieldValue.value = `${value}%`;
};

const onSmallerScaleButtonClick = () => {
  const currentValue = parseInt(scaleFieldValue.value, 10);
  let newValue = currentValue - STEP_SCALE_VALUE;
  if (newValue < MIN_SCALE_VALUE) {
    newValue = MIN_SCALE_VALUE;
  }
  imagePreviewScale(newValue);
};

const onBiggerScaleButtonClick = () => {
  const currentValue = parseInt(scaleFieldValue.value, 10);
  let newValue = currentValue + STEP_SCALE_VALUE;
  if (newValue > MAX_SCALE_VALUE) {
    newValue = MAX_SCALE_VALUE;
  }
  imagePreviewScale(newValue);
};

const resetPictureScale = () => {
  imagePreviewScale();
};

biggerScaleButton.addEventListener('click', onBiggerScaleButtonClick);
smallerScaleButton.addEventListener('click', onSmallerScaleButtonClick);

export {resetPictureScale};
