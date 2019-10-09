'use strict';

(function () {
  /**
   * Инициализирует объект XHR и навешивает обработчики для
   * успешного и неуспешного выполнения запроса.
   *
   * @param {function} onLoad - функция, которая отрабатывает при
   * успешно выполненном запросе.
   * @param {function} onError - функция, которая отрабатывает при
   * НЕуспешно выполненном запросе.
   *
   * @return {objects} Объект XHR.
   */
  var initXHR = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 10000;

    return xhr;
  };
  window.backend = {
    /**
     * Метод для получения данных с сервера.
     *
     * @param {string} url - Адрес сервера.
     * @param {function} onLoad - Функция, которая отрабатывает при
     * успешно выполненном запросе.
     * @param {function} onError - Функция, которая отрабатывает при
     * НЕуспешно выполненном запросе.
     */
    load: function (url, onLoad, onError) {
      var xhr = initXHR(onLoad, onError);
      xhr.open('GET', url);
      xhr.send();
    },

    /**
     * Метод для отправки данных на сервер.
     *
     * @param {string} url - Адрес сервера.
     * @param {objects} data - Объект с данными, которые нужно отправить.
     * @param {function} onLoad - Функция, которая отрабатывает при
     * успешно выполненном запросе.
     * @param {function} onError - Функция, которая отрабатывает при
     * НЕуспешно выполненном запросе.
     */
    save: function (url, data, onLoad, onError) {
      var xhr = initXHR(onLoad, onError);
      xhr.open('POST', url);
      xhr.send(data);
    }
  };
})();
