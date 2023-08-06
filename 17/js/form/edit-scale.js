const DEFAULT_SCALE_VALUE = 100;
const STEP_SCALE_VALUE = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const HUNDREDTH_DEVIDER = 100;
const DEMICAL = 10;

const smallerScaleButtonElement = document.querySelector('.scale__control--smaller');
const biggerScaleButtonElement = document.querySelector('.scale__control--bigger');
const scaleFieldValueElement = document.querySelector('.scale__control--value');
const imageElement = document.querySelector('.img-upload__preview img');

const imagePreviewScale = (value = DEFAULT_SCALE_VALUE) => {
  imageElement.style.transform = `scale(${value / HUNDREDTH_DEVIDER})`;
  scaleFieldValueElement.value = `${value}%`;
};

const onSmallerScaleButtonClick = () => {
  const currentValue = parseInt(scaleFieldValueElement.value, DEMICAL);
  let newValue = currentValue - STEP_SCALE_VALUE;
  if (newValue < MIN_SCALE_VALUE) {
    newValue = MIN_SCALE_VALUE;
  }
  imagePreviewScale(newValue);
};

const onBiggerScaleButtonClick = () => {
  const currentValue = parseInt(scaleFieldValueElement.value, DEMICAL);
  let newValue = currentValue + STEP_SCALE_VALUE;
  if (newValue > MAX_SCALE_VALUE) {
    newValue = MAX_SCALE_VALUE;
  }
  imagePreviewScale(newValue);
};

const resetPictureScale = () => {
  imagePreviewScale();
};

biggerScaleButtonElement.addEventListener('click', onBiggerScaleButtonClick);
smallerScaleButtonElement.addEventListener('click', onSmallerScaleButtonClick);

export {resetPictureScale};
