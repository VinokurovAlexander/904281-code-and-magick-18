'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 30;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_GAP = 50;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (maxElement < arr[i]) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP, CLOUD_Y + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + FONT_GAP + (GAP * 2));

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var barY = BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime + CLOUD_Y + (FONT_GAP * 3);

    ctx.fillStyle = 'black';
    ctx.fillText(names[i], CLOUD_X + FONT_GAP + (BAR_GAP * i) + (BAR_WIDTH * i), CLOUD_HEIGHT - GAP);
    ctx.fillText(Math.round(times[i]), CLOUD_X + FONT_GAP + (BAR_GAP * i) + (BAR_WIDTH * i), barY - (GAP * 2));

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var colorSaturation = Math.floor(Math.random() * 100);
      ctx.fillStyle = 'hsl(227,' + colorSaturation + '%,50%)';
    }
    ctx.fillRect(CLOUD_X + FONT_GAP + (BAR_GAP * i) + (BAR_WIDTH * i), barY, BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime);
  }
};
