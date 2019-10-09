'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    /**
     * Функция для обработки событий при нажатии на ESC.
     *
     * @param {object} evt - объект события
     * @param {function} action - функция, которую необходимо выполнить
     */
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },

    /**
     * Функция для обработки событий при нажатии на ENTER.
     *
     * @param {object} evt - объект события.
     * @param {function} action - функция, которую необходимо выполнить.
     */
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },

    /**
     * Возвращает случайное число в диапазоне от 0 до maxValue(не включая).
     *
     * @param {number} maxValue - верхняя граница диапазона.
     * @return {number} Случайное число.
     */
    getRandomNumber: function (maxValue) {
      return Math.floor(Math.random() * maxValue);
    },

    /**
     * Возвращает случайное значение из массива.
     *
     * @param {array} arr - массив, из которого нужно получить значение.
     * @return {*} Случайное значение из массива.
     */
    getRandomValueFromArray: function (arr) {
      var valueIndex = this.getRandomNumber(arr.length);
      return arr[valueIndex];
    },

    /**
     * Возвращает элемент из массива с максимальным значением.
     *
     * @param {array} arr - Массив.
     * @return {number} Элемент с максимальным значением.
     */
    getMaxElementFromArray: function (arr) {
      var maxElement = arr[0];
      for (var i = 1; i < arr.length; i++) {
        if (maxElement < arr[i]) {
          maxElement = arr[i];
        }
      }
      return maxElement;
    }
  };
})();
