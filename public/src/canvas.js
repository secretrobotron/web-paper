define(['overlay'], function(Overlay){
  
  function Canvas(domElement, contentContainer){

    domElement.addEventListener('mousedown', function(e){
      e.preventDefault();

      var overlay = document.createElement('div');
      overlay.classList.add('overlay');

      var contentContainerRect = contentContainer.getBoundingClientRect();

      var overlay = new Overlay(contentContainer, e.clientX, e.clientY);
      overlay.adjust(function(){

      });

      document.body.appendChild(overlay.element);
    }, false);

    domElement.addEventListener('dragover', function(e){
      e.preventDefault();
      e.stopPropagation();
      e.dataTransfer.dropEffect = 'copy';
      return false;
    }, false);

    domElement.addEventListener('drop', function(e){
      e.preventDefault();
      e.stopPropagation();

      var reader = new FileReader();
      reader.onload = function(e){
        var img = new Image();
        img.onload = function(){
          currentInputCanvas.setImage(img);
          afterDropFunction();
        };

        domElement.style.backgroundImage = 'url(' + reader.result + ')';
      };

      reader.readAsDataURL(e.dataTransfer.files[0]);

      return false;
    }, false);
  }


  return Canvas;
});