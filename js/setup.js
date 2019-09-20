'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SUR_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var NUMBER_OF_WIZARDS = 4;

var userDialog = document.querySelector('.setup');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

userDialog.classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');

/**
 * Возвращает случайное число в диапазоне от 0 до maxValue(не включая).
 *
 * @param {number} maxValue - верхняя граница диапазона.
 * @return {number} Случайное число.
 */
var getRandomNumber = function (maxValue) {
  var randomNumber = Math.floor(Math.random() * maxValue);
  return randomNumber;
};

/**
 * Возвращает случайное значение из массива.
 *
 * @param {array} arr - массив, из которого нужно получить значение.
 * @return {*} Случайное значение из массива.
 */
var getRandomValueFromArray = function (arr) {
  var valueIndex = getRandomNumber(arr.length);
  var value = arr[valueIndex];
  return value;
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
  var fullName;

  var name = getRandomValueFromArray(NAMES);
  var surName = getRandomValueFromArray(SUR_NAMES);
  var fullnameIndex = getRandomNumber(2);

  fullName = fullnameIndex ? name + ' ' + surName : surName + ' ' + name;
  return fullName;
};

/**
 * Генерирует объект персонажа.
 *
 * @return {object} Объект персонажа.
 */
var generateCharacter = function () {
  var character = {};

  character.name = getCharacterName();
  character.coatColor = getRandomValueFromArray(COAT_COLORS);
  character.eyesColor = getRandomValueFromArray(EYES_COLORS);
  return character;
};

/**
 * Генерирует массив с объектами персонажа.
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
 * @param {arr} wizards - массив с обектами персонажей.
 */

var appendWizards = function (wizards) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
};

var wizards = generateAllCharacters(NUMBER_OF_WIZARDS);
appendWizards(wizards);
