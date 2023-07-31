
const ALERT_TEXT = 'Не удалось загрузить данные с сервера';
const ERROR_TEXT = 'Не удалось загрузить. Попробуйте еще раз';


import {showAlert} from './tools.js';


const getData = (onSuccess) => {
  fetch('https://29.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(() => {
      showAlert(ALERT_TEXT);
    });
};


const sendData = (onSuccess, onFail, body) => {
  fetch('https://29.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail (ERROR_TEXT);
      }
    })
    .catch(() => {
      onFail (ERROR_TEXT);
    });
};


export {getData, sendData};
