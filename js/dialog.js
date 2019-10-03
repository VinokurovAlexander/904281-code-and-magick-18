'use strict';

(function () {
  var dialogHandler = window.setupWindow.querySelector('.upload');

  dialogHandler.addEventListener('mousedown', function (evt) {
    var coords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: coords.x - moveEvt.clientX,
        y: coords.y - moveEvt.clientY,
      };
      coords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.setupWindow.style.top = (window.setupWindow.offsetTop - shift.y) + 'px';
      window.setupWindow.style.left = (window.setupWindow.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (evtOnClick) {
          evtOnClick.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });
})();
