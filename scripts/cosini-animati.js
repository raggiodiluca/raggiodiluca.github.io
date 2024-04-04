$(document).ready(function(){
    $('.cosino-svg').hover(function(){
      var $cosinoPath = $(this).find('.cosino-path');
      $cosinoPath.addClass('animate');
  
      $cosinoPath.on('animationend', function() {
        $cosinoPath.removeClass('animate');
      });
    });
  });
  