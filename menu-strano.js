$(document).ready(function () {
  let labelHeight = $(".menu-container").height();
  let radius = labelHeight / 2;
  let labelWidth = $(".menu-label").width() - radius * 1.9;
  let x = $(".selected").position().left + radius;


  $(".clip-rod").attr("x", x);
  $(".clip-rod").attr("width", labelWidth);
  $(".clip-rod").attr("height", labelHeight);
  $(".clip-circle.left").attr("cx", x);
  $(".clip-circle.left").attr("cy", labelHeight / 2);
  $(".clip-circle.left").attr("r", radius);
  $(".clip-circle.right").attr("cx", labelWidth + x);
  $(".clip-circle.right").attr("cy", labelHeight / 2);
  $(".clip-circle.right").attr("r", radius);


  $(".menu.under").on({
    
    mousemove: function (event) {
      
  $('.clip-rod, .clip-circle').css('transition', 'all .3s ease .2s');
      x = event.clientX - $(this).offset().left - labelWidth / 2;

      // Update SVG shapes
      $(".clip-rod").attr("x", x);
      $(".clip-rod").attr("width", labelWidth);
      $(".clip-rod").attr("height", labelHeight);
      $(".clip-circle.left").attr("cx", x);
      $(".clip-circle.left").attr("cy", labelHeight / 2);
      $(".clip-circle.left").attr("r", radius);
      $(".clip-circle.right").attr("cx", labelWidth + x);
      $(".clip-circle.right").attr("cy", labelHeight / 2);
      $(".clip-circle.right").attr("r", radius);
    },
    mouseleave: function () {
      x = $(".selected").position().left + radius;
      // Update SVG shapes
      $(".clip-rod").attr("x", x);
      $(".clip-rod").attr("width", labelWidth);
      $(".clip-rod").attr("height", labelHeight);
      $(".clip-circle.left").attr("cx", x);
      $(".clip-circle.left").attr("cy", labelHeight / 2);
      $(".clip-circle.left").attr("r", radius);
      $(".clip-circle.right").attr("cx", labelWidth + x);
      $(".clip-circle.right").attr("cy", labelHeight / 2);
      $(".clip-circle.right").attr("r", radius);
    },
  });

  $(".menu-label").click(function () {
    // Remove selected class from all menu-labels
    $(".menu-label").removeClass("selected");
    // Add selected class to the clicked element
    $(this).addClass("selected");
  });
});
