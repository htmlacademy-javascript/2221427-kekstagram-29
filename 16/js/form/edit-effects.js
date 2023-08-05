const EFFECTS_LIST = [
  {name: 'none', min: 0, max: 100, step: 1, start: 100,},
  {name: 'chrome', style: 'grayscale', min: 0, max: 1, step: 0.1, unit : '',},
  {name: 'sepia', style: 'sepia', min: 0, max: 1, step: 0.1, unit : '',},
  {name: 'marvin', style: 'invert', min: 0, max: 100, step: 1, unit : '%',},
  {name: 'phobos', style: 'blur', min: 0, max: 3, step: 0.1, unit : 'px',},
  {name: 'heat', style: 'brightness', min: 1, max: 3, step: 0.1, unit : '',}
];

const DEFAULT_EFFECT = EFFECTS_LIST[0];

const uploaFiledForm = document.querySelector('.img-upload__form');
const previewImageElement = document.querySelector('.img-upload__preview img');
const sliderContainer = document.querySelector('.effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');
const sliderElement = sliderContainer.querySelector('.effect-level__slider');

let chosenEffect = DEFAULT_EFFECT;

const isDefault = () => chosenEffect === DEFAULT_EFFECT;

const updateSlider = () => {
  sliderContainer.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
  });

  if(isDefault()) {
    sliderContainer.classList.add('hidden');
  }
};

const onFormChange = (evt) => {
  if(!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEffect = EFFECTS_LIST.find((effect) => effect.name === evt.target.value);
  updateSlider();
};

const onSliderUpdate = () => {
  previewImageElement.style.filter = 'none';
  previewImageElement.className = '';
  effectLevelValue.value = '';
  if(isDefault()){
    return;
  }
  const sliderValue = sliderElement.noUiSlider.get();
  previewImageElement.style.filter = `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  previewImageElement.classList.add(`effects__preview--${chosenEffect.name}`);
  effectLevelValue.value = sliderValue;
};

const resetEffects = () => {
  chosenEffect = DEFAULT_EFFECT;
  updateSlider();
};

noUiSlider.create(sliderElement, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  step: DEFAULT_EFFECT.step,
  start: DEFAULT_EFFECT.max,
  connect: 'lower',
});

updateSlider();

uploaFiledForm.addEventListener('change', onFormChange);
sliderElement.noUiSlider.on('update', onSliderUpdate);

export {resetEffects};
