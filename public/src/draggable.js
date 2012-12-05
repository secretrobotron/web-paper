define([], function(){

  var TRANSFORM_PROPERTY = (function(){
    var div = document.createElement( "div" );
    var choices = "Webkit Moz O ms".split( " " ).map( function( prefix ) { return prefix + "Transform"; } );

    for ( var i = choices.length; i >= 0; --i ) {
      if ( div.style[ choices[ i ] ] !== undefined ) {
        return choices[ i ];
      }
    }

    return "transform";
  }());

  function setTransformProperty(element, transform){
    element.style[TRANSFORM_PROPERTY] = transform;
  }

  return {
    extend: function(domElement, options){
      options = options || {};

      var onStart = options.onStart || function(){};
      var onStop = options.onStop || function(){};
      var container = options.container;

      domElement.classList.add('draggable');

      domElement.addEventListener('mousedown', function(e){
        e.preventDefault();

        var mouseDownPosition = [e.clientX, e.clientY];
        var containmentRect = container ? container.getBoundingClientRect() : {top: 0, left: 0, right: window.innerWidth, top: window.innerHeight, width: window.innerWidth, height: window.innerHeight};
        var domElementRect = domElement.getBoundingClientRect();

        var maxX = containmentRect.right - domElementRect.left - domElementRect.width;
        var minX = containmentRect.left - domElementRect.left

        var maxY = containmentRect.bottom - domElementRect.top - domElementRect.height;
        var minY = containmentRect.top - domElementRect.top

        onStart();

        var x, y;

        function onMouseMove(e){
          e.preventDefault();
          x = Math.max(minX, Math.min(e.clientX - mouseDownPosition[0], maxX));
          y = Math.max(minY, Math.min(e.clientY - mouseDownPosition[1], maxY));
          setTransformProperty(domElement, 'translate(' + x + 'px, ' + y + 'px)');
        }

        setTransformProperty(domElement, 'translate(0, 0);');

        window.addEventListener('mouseup', function onMouseUp(e){
          window.removeEventListener('mousemove', onMouseMove, false);
          domElement.style.left = domElementRect.left + x + 'px';
          domElement.style.top = domElementRect.top + y + 'px';
          setTransformProperty(domElement, 'translate(0, 0)');
        }, false);

        window.addEventListener('mousemove', onMouseMove, false);
      }, false);

      return {
        destroy: function(){

        }
      }

    }
  };

});