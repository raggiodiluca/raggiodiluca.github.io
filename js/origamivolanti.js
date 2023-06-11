var selectedIndex = 0;
var initialIndex = null;

function rotateCarousel() {
  var numberOfFaces = $('.open .box_face').length; // add this line to update the number of faces
  var angle = (selectedIndex - initialIndex) / numberOfFaces * -360;
  var box = document.querySelector('.open .box');

  // Check if the box has a relative with the id #web
  var hasWebAncestor = $(box).parents('#web').length > 0;
  var hasIlluAncestor = $(box).parents('#illu').length > 0;
  var hasExtraAncestor = $(box).parents('#extra').length > 0;
  var hasAboutAncestor = $(box).parents('#about').length > 0;

  if (hasWebAncestor) {
    box.style.transform = 'translateZ(-30vw) rotateY(' + angle + 'deg) ';
  } else if (hasIlluAncestor) {
    box.style.transform = 'translateZ(-38vw) rotateY(' + angle + 'deg) ';
  } else if (hasExtraAncestor) {
    box.style.transform = 'translateZ(-40vw) rotateY(' + angle + 'deg) ';
  } else if (hasAboutAncestor) {
    box.style.transform = 'translateZ(-25vw) rotateY(' + angle + 'deg) ';
  }

  $('.project_container').animate({
    scrollTop: 0
}, 500); // 500 is the duration of the animation in milliseconds

}


document.addEventListener('keydown', function (event) {
  if ($('.box_container').hasClass('open')) {
    if (event.key === "ArrowLeft") {
      // Left arrow key
      selectedIndex--;
      rotateCarousel();
    } else if (event.key === "ArrowRight") {
      // Right arrow key
      selectedIndex++;
      rotateCarousel();
    }
  }
});

// Click event listener for the box_face elements
$(document).on('click', '.open .box_face', function (event) {
  var currentIndex = $(this).index();
  if (currentIndex > selectedIndex) {
    selectedIndex = currentIndex;
    rotateCarousel();
  } else if (currentIndex < selectedIndex) {
    selectedIndex = currentIndex;
    rotateCarousel();
  }
});
