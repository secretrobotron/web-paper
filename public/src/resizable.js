define([], function(){
  
  return {
    extend: function(domElement, options){
      options = options || {};

      var onStart = options.onStart || function(){};
      var onStop = options.onStop || function(){};
      var container = options.container;

      var southHandle = document.createElement('div');
      var eastHandle = document.createElement('div');
      var southEastHandle = document.createElement('div');

      southHandle.classList.add('handle');
      eastHandle.classList.add('handle');
      southEastHandle.classList.add('handle');

      southHandle.classList.add('south');
      eastHandle.classList.add('east');
      southEastHandle.classList.add('south-east');

      domElement.appendChild(southHandle);
      domElement.appendChild(eastHandle);
      domElement.appendChild(southEastHandle);

      var containmentRect, domElementRectm, maxH, maxW, minH, minW;

      var containerClientTop, containerClientLeft;

      function handleMouse(mouseElement, onMouseMove, onMouseDown, onMouseUp){
        onMouseDown = onMouseDown || function(){};
        onMouseUp = onMouseUp || function(){};

        mouseElement.addEventListener('mousedown', function(e){
          e.preventDefault();
          e.stopPropagation();

          var mouseDownPosition = [e.clientX, e.clientY];

          containerClientTop = container ? container.clientTop : 0;
          containerClientLeft = container ? container.clientLeft : 0;
          containmentRect = container ? container.getBoundingClientRect() : {top: 0, left: 0, right: window.innerWidth, top: window.innerHeight, width: window.innerWidth, height: window.innerHeight};
          domElementRect = domElement.getBoundingClientRect();

          maxH = containmentRect.height - (domElementRect.top - containmentRect.top) - domElement.clientTop * 2 - containerClientTop;
          maxW = containmentRect.width - (domElementRect.left - containmentRect.left) - domElement.clientLeft * 2 - containerClientLeft;

          domElement.classList.add('resizing');

          onMouseDown();

          function mouseMoveWrapper(e){
            e.preventDefault();
            e.stopPropagation();
            onMouseMove(e, mouseDownPosition, domElementRect);
          }

          window.addEventListener('mousemove', mouseMoveWrapper, false);
          window.addEventListener('mouseup', function mouseUpWrapper(e){
            window.removeEventListener('mousemove', mouseMoveWrapper, false);
            window.removeEventListener('mouseup', mouseUpWrapper, false);
            domElement.classList.remove('resizing');
            onMouseUp(e);
          }, false);

        }, false);
      }

      handleMouse(southHandle,
        function(e, mouseDownPosition, domElementRect){
          domElement.style.height = Math.max(0, Math.min(maxH, domElementRect.height - mouseDownPosition[1] + e.clientY - domElement.clientTop * 2)) + 'px';
        });

      handleMouse(eastHandle,
        function(e, mouseDownPosition, domElementRect){
          domElement.style.width = Math.max(0, Math.min(maxW, domElementRect.width - mouseDownPosition[0] + e.clientX - domElement.clientLeft * 2)) + 'px';
        });


      handleMouse(southEastHandle,
        function(e, mouseDownPosition, domElementRect){
          domElement.style.height = Math.max(0, Math.min(maxH, domElementRect.height - mouseDownPosition[1] + e.clientY - domElement.clientTop * 2)) + 'px';
          domElement.style.width = Math.max(0, Math.min(maxW, domElementRect.width - mouseDownPosition[0] + e.clientX - domElement.clientLeft * 2)) + 'px';
        });

    }
  };
});