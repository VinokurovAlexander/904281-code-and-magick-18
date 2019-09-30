'use strict';

var FullName = {
  NAMES: [
    'Иван', 'Хуан Себастьян', 'Мария', 'Кристоф',
    'Виктор', 'Юлия', 'Люпита', 'Вашингтон'
  ],
  SUR_NAMES: [
    'да Марья', 'Верон', 'Мирабелла', 'Вальц',
    'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'
  ]
};

var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var NUMBER_OF_WIZARDS = 4;

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var setupWindow = document.querySelector('.setup');
var setupWindowOpenElement = document.querySelector('.setup-open');
var setupWindowCloseBtn = setupWindow.querySelector('.setup-close');
var setupWizardCoat = setupWindow.querySelector('.setup-wizard .wizard-coat');
var setupWizardEyes = setupWindow.querySelector('.setup-wizard .wizard-eyes');
var setupWizardFireball = setupWindow.querySelector('.setup-fireball-wrap');

var inputUserName = setupWindow.querySelector('.setup-user-name');

document.querySelector('.setup-similar').classList.remove('hidden');

/**
 * Возвращает случайное число в диапазоне от 0 до maxValue(не включая).
 *
 * @param {number} maxValue - верхняя граница диапазона.
 * @return {number} Случайное число.
 */
var getRandomNumber = function (maxValue) {
  return Math.floor(Math.random() * maxValue);
};

/**
 * Возвращает случайное значение из массива.
 *
 * @param {array} arr - массив, из которого нужно получить значение.
 * @return {*} Случайное значение из массива.
 */
var getRandomValueFromArray = function (arr) {
  var valueIndex = getRandomNumber(arr.length);
  return arr[valueIndex];
};

/**
 * Составляет полное имя для персонажа, состоящие из имени и фамилии.
 * Случайные значения для имени и фамилии берутся из массивов NAMES и SUR_NAMES соответственно.
 * Расположение имени и фамилии в итоговой строке зависит от значения
 * переменной fullnameIndex(true или false).
 *
 * @return {string} Строка с именем и фамилией персонажа.
 */
var getCharacterName = function () {
  var name = getRandomValueFromArray(FullName.NAMES);
  var surName = getRandomValueFromArray(FullName.SUR_NAMES);
  var fullnameIndex = getRandomNumber(2);

  return fullnameIndex ? name + ' ' + surName : surName + ' ' + name;
};

/**
 * Генерирует объект персонажа.
 *
 * @return {object} Объект персонажа.
 */
var generateCharacter = function () {
  return {
    name: getCharacterName(),
    coatColor: getRandomValueFromArray(COAT_COLORS),
    eyesColor: getRandomValueFromArray(EYES_COLORS)
  };
};

/**
 * Генерирует массив с объектами персонажа.
 *
 * @param {number} charactersNumber - количество генерируемых персонажей.
 * @return {array} Массив с объектами персонажа.
 */
var generateAllCharacters = function (charactersNumber) {
  var characters = [];

  for (var i = 0; i < charactersNumber; i++) {
    characters.push(generateCharacter());
  }
  return characters;
};

/**
 * Подготавливает ноду с персонажем.
 *
 * @param {object} wizard - объект персонажа с необходимыми свойствами для подготовки ноды.
 * @return {objects} Нода персонажа.
 */
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
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

  wizards.forEach(function (item, i) {
    fragment.appendChild(renderWizard(wizards[i]));
  });
  similarListElement.appendChild(fragment);
};

/**
 * Открывает окно с настройками персонажа и
 * вешает обработчик на кнопку Esc для закрытия окна.
 */
var openSetupWindow = function () {
  setupWindow.classList.remove('hidden');
  document.addEventListener('keydown', onSetupWindowEscPress);
};

/**
 * Закрывает окно с настройками персонажа и
 * удаляет обработчик, отвечающий за закртиые окна по
 * нажатию на кнопку Esc.
 */
var closeSetupWindow = function () {
  setupWindow.classList.add('hidden');
  document.removeEventListener('keydown', onSetupWindowEscPress);
};

/**
 * Закрывает окно с настройками персонажа при нажатии на Esc.
 *
 * @param {object} evt - Объект события.
 */
var onSetupWindowEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeSetupWindow();
  }
};

/**
 * Меняет цвет мантии персонажа.
 */
var updateSetupWizardCoatColor = function () {
  var coatColorInput = setupWindow.querySelector('input[name="coat-color"]');
  setupWizardCoat.style.fill = coatColorInput.value = getRandomValueFromArray(COAT_COLORS);
};

/**
 * Меняет цвет глаз персонажа.
 */
var updateSetupWizardEyesColor = function () {
  var eyesColorInput = setupWindow.querySelector('input[name="eyes-color"]');
  setupWizardEyes.style.fill = eyesColorInput.value = getRandomValueFromArray(EYES_COLORS);
};

/**
 * Меняет цвет фаербола.
 */
var updateSetupWizardFireballColor = function () {
  var fireballColorInput = setupWindow.querySelector('input[name="fireball-color"]');
  setupWizardFireball.style.backgroundColor = fireballColorInput.value = getRandomValueFromArray(FIREBALL_COLORS);
};

// Отрисовывем похожих персонажей
var wizards = generateAllCharacters(NUMBER_OF_WIZARDS);
appendWizards(wizards);

// Назначаем обработчики
setupWindowOpenElement.addEventListener('click', function () {
  openSetupWindow();
});

setupWindowOpenElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openSetupWindow();
  }
});

setupWindowCloseBtn.addEventListener('click', function () {
  closeSetupWindow();
});

setupWindowCloseBtn.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeSetupWindow();
  }
});

inputUserName.addEventListener('keydown', function (evt) {
  evt.stopPropagation();
});

setupWizardCoat.addEventListener('click', function () {
  updateSetupWizardCoatColor();
});

setupWizardEyes.addEventListener('click', function () {
  updateSetupWizardEyesColor();
});

setupWizardFireball.addEventListener('click', function () {
  updateSetupWizardFireballColor();
});
