var selectedIndex = 0;
var initialIndex = null;

function rotateCarousel() {
  var numberOfFaces = $('.open .box_face').length; // add this line to update the number of faces
  var angle = (selectedIndex - initialIndex) / numberOfFaces * -360;
  var selectedBox = document.querySelector('.open .box');
  var selectedProject = document.querySelector('.open .box_face:first-child .project_container');

  // Check if the box has a relative with the id #web
  var hasWebAncestor = $(selectedBox).parents('#web').length > 0;
  var hasIlluAncestor = $(selectedBox).parents('#illu').length > 0;
  var hasExtraAncestor = $(selectedBox).parents('#extra').length > 0;
  var hasAboutAncestor = $(selectedBox).parents('#about').length > 0;

  if (hasWebAncestor) {
    selectedBox.style.transform = 'translateZ(-30vw) rotateY(' + angle + 'deg) ';
  } else if (hasIlluAncestor) {
    selectedBox.style.transform = 'translateZ(-38vw) rotateY(' + angle + 'deg) ';
  } else if (hasExtraAncestor) {
    selectedBox.style.transform = 'translateZ(-40vw) rotateY(' + angle + 'deg) ';
  } else if (hasAboutAncestor) {
    selectedBox.style.transform = 'translateZ(-25vw) rotateY(' + angle + 'deg) ';
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
