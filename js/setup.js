'use strict';

(function () {
  var Colors = {
    COAT_COLORS: [
      'rgb(101, 137, 164)',
      'rgb(241, 43, 107)',
      'rgb(146, 100, 161)',
      'rgb(56, 159, 117)',
      'rgb(215, 210, 55)',
      'rgb(0, 0, 0)'],
    EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
    FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
  };

  var NUMBER_OF_WIZARDS = 4;
  var LOAD_WIZARDS_URL = 'https://js.dump.academy/code-and-magick/data';
  var SAVE_WIZARDS_URL = 'https://js.dump.academy/code-and-magick';

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');

  window.setupWindow = document.querySelector('.setup');
  var setupWindowOpenElement = document.querySelector('.setup-open');
  var setupWindowCloseBtn = window.setupWindow.querySelector('.setup-close');
  var setupWindowStartCoords = {
    x: window.getComputedStyle(window.setupWindow).left,
    y: window.getComputedStyle(window.setupWindow).top
  };
  var inputUserName = window.setupWindow.querySelector('.setup-user-name');
  var isWizardsLoad = false;

  document.querySelector('.setup-similar').classList.remove('hidden');

  /**
   * Подготавливает ноду с персонажем.
   *
   * @param {object} wizard - объект персонажа с необходимыми свойствами для подготовки ноды.
   * @return {objects} Нода персонажа.
   */
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  };

  /**
   * Добавляет персонажей в разметку HTML.
   *
   * @param {arr} wizards - массив с обектами персонажей.
   */
  var appendWizards = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);
  };

  /**
   * Открывает окно с настройками персонажа и
   * вешает обработчик на кнопку Esc для закрытия окна.
   */
  var openSetupWindow = function () {
    window.setupWindow.classList.remove('hidden');
    document.addEventListener('keydown', setupWindowEscPressHandler);
    if (!isWizardsLoad) {
      window.backend.load(LOAD_WIZARDS_URL, appendWizards, errorHandler);
      isWizardsLoad = true;
    }
  };

  /**
   * Закрывает окно с настройками персонажа и
   * удаляет обработчик, отвечающий за закртиые окна по
   * нажатию на кнопку Esc.
   */
  var closeSetupWindow = function () {
    window.setupWindow.classList.add('hidden');
    document.removeEventListener('keydown', setupWindowEscPressHandler);
    window.setupWindow.style.left = setupWindowStartCoords.x;
    window.setupWindow.style.top = setupWindowStartCoords.y;
  };

  /**
   * Закрывает окно с настройками персонажа при нажатии на Esc.
   *
   * @param {object} evt - Объект события.
   */
  var setupWindowEscPressHandler = function (evt) {
    window.util.isEscEvent(evt, closeSetupWindow);
  };

  var wizardItems = {
    coat: window.setupWindow.querySelector('.setup-wizard .wizard-coat'),
    eyes: window.setupWindow.querySelector('.setup-wizard .wizard-eyes'),
    fireball: {
      target: window.setupWindow.querySelector('.setup-fireball'),
      color: window.setupWindow.querySelector('.setup-fireball-wrap')
    }
  };

  /**
   * Меняет цвет частей персонажа.
   *
   * @param {string} item - Часть персонажа, цвет которой необходимо поменять.
   * Принимает значения: coat, eyes, fireball.
   */
  var updateColor = function (item) {
    var itemInput = window.setupWindow.querySelector('input[name="' + item + '-color"]');

    if (item === 'fireball') {
      wizardItems[item].color.style.backgroundColor = itemInput.value = window.util.getRandomValueFromArray(Colors[item.toUpperCase() + '_COLORS']);
    } else {
      wizardItems[item].style.fill = itemInput.value = window.util.getRandomValueFromArray(Colors[item.toUpperCase() + '_COLORS']);
    }
  };

  /**
   * Определяет источник по которому возник клик мышки
   * и меняет соответствующий цвет элемента.
   *
   * @param {obj} evt - объект события.
   */
  var getTargetAndUpdateColor = function (evt) {
    for (var item in wizardItems) {
      if (wizardItems.hasOwnProperty(item)) {
        if (evt.target === wizardItems.fireball.target) {
          updateColor('fireball');
        } else if (evt.target === wizardItems[item]) {
          updateColor(item);
        }
      }
    }
  };

  /**
   * Функция, которая отображает ошибки при загрузке данных с сервера.
   *
   * @param {string} errorMessage - текст ошибки.
   */
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  /**
   * Отправка формы с волшебником на сервер и
   * закрытие окна с настройками персонажа.
   *
   * @param {objects} evt - Объект события.
   */
  var saveWizards = function (evt) {
    window.backend.save(SAVE_WIZARDS_URL, new FormData(form), function () {
      window.setupWindow.classList.add('hidden');
    }, errorHandler);
    evt.preventDefault();
  };

  // Назначаем обработчики
  setupWindowOpenElement.addEventListener('click', function () {
    openSetupWindow();
  });

  setupWindowOpenElement.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openSetupWindow);
  });

  setupWindowCloseBtn.addEventListener('click', function () {
    closeSetupWindow();
  });

  setupWindowCloseBtn.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closeSetupWindow);
  });

  inputUserName.addEventListener('keydown', function (evt) {
    evt.stopPropagation();
  });

  window.setupWindow.addEventListener('click', function (evt) {
    getTargetAndUpdateColor(evt);
  });

  var form = document.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    saveWizards(evt);
  });
})();
