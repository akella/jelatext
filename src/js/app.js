import {throttle,debounce} from 'underscore'

var MAX = 50;
var checkScrollSpeed = (function(settings){
    settings = settings || {};

    var lastPos, newPos, timer, delta, 
        delay = settings.delay || 50; // in "ms" (higher means lower fidelity )

    function clear() {
      lastPos = null;
      delta = 0;
    }

    clear();

    return function(){
      newPos = window.scrollY;
      if ( lastPos != null ){ // && newPos < maxScroll 
        delta = newPos -  lastPos;
      }
      lastPos = newPos;
      clearTimeout(timer);
      timer = setTimeout(clear, delay);
      return delta;
    };
})();

var setSkew = throttle( function(skew){
  $('p').css('transform','skewY('+ skew +'deg)')
}, 16);
var setBack = debounce(function(){
  $('p').css('transform','skewY(0deg)');
}, 100);

$(window).on('scroll',function(){
  var speed = checkScrollSpeed();
  if(speed>MAX) speed = MAX;
  if(speed<-MAX) speed = -MAX;

  setSkew(speed/10);
  setBack();
})
