define(['draggable', 'resizable'], function(Draggable, Resizable){

  function Overlay(contentContainer, positionX, positionY){
    var _element = document.createElement('div');
    _element.classList.add('overlay');

    this.element = _element;

    _element.style.left = positionX + 'px';
    _element.style.top = positionY + 'px';

    this.contentContainer = contentContainer;
  }

  Overlay.prototype.adjust = function(finishedCallback){
    var _element = this.element;
    var _contentContainer = this.contentContainer;

    var contentContainerRect, overlayRect;

    var maxDims;

    function onMouseMove(e){
      e.preventDefault();

      overlayRect = overlayRect || _element.getBoundingClientRect();
      contentContainerRect = contentContainerRect || _contentContainer.getBoundingClientRect();

      maxDims = maxDims || [
        contentContainerRect.right - overlayRect.left - _element.clientLeft * 2 - _contentContainer.clientLeft * 2,
        contentContainerRect.bottom - overlayRect.top - _element.clientTop * 2 - _contentContainer.clientTop * 2,
      ];

      _element.style.width = Math.max(0, Math.min(maxDims[0], e.clientX - overlayRect.left)) + 'px';
      _element.style.height = Math.max(0, Math.min(maxDims[1], e.clientY - overlayRect.top)) + 'px';
    }

    window.addEventListener('mouseup', function onMouseUp(e){
      window.removeEventListener('mouseup', onMouseUp, false);
      window.removeEventListener('mousemove', onMouseMove, false);

      var closeButton = document.createElement('div');
      closeButton.classList.add('overlay-close-button');
      _element.appendChild(closeButton);

      closeButton.addEventListener('click', function(e){
        _element.parentNode.removeChild(_element);
      }, false);

      var draggable = Draggable.extend(_element, {container: _contentContainer});
      var resizable = Resizable.extend(_element, {container: _contentContainer});
    }, false);

    window.addEventListener('mousemove', onMouseMove, false);
  };

  return Overlay;

});