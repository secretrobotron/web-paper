require(['canvas'], function(Canvas){
  
  function start(){
    var mainContainer = document.querySelector('.main-container');
    var testCanvas = new Canvas(document.querySelector('.page-canvas'), mainContainer);
  }

  document.addEventListener('dragover', function(e){
    e.preventDefault();
    e.stopPropagation();
    return false;
  }, false);

  document.addEventListener('drop', function(e){
    console.log(554);
    e.preventDefault();
    e.stopPropagation();
    return false;
  }, false);

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', start, false);
  }
  else {
    start();
  }

});