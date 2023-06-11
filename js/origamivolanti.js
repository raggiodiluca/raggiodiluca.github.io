var currentAngle = 0;
var initialIndex = null;

function rotateCarousel() {
  var selectedBox = document.querySelector('.open .box');

  // Check in which section the opened box is contained, if found the statement is true (has lenght = has parent) 
  var hasWebAncestor = $(selectedBox).parents('#web').length > 0;
  var hasIlluAncestor = $(selectedBox).parents('#illu').length > 0;
  var hasExtraAncestor = $(selectedBox).parents('#extra').length > 0;
  var hasAboutAncestor = $(selectedBox).parents('#about').length > 0;

  if (hasWebAncestor) {
    selectedBox.style.transform = 'translateZ(-30vw) rotateY(' + currentAngle + 'deg) ';
  } else if (hasIlluAncestor) {
    selectedBox.style.transform = 'translateZ(-38vw) rotateY(' + currentAngle + 'deg) ';
  } else if (hasExtraAncestor) {
    selectedBox.style.transform = 'translateZ(-40vw) rotateY(' + currentAngle + 'deg) ';
  } else if (hasAboutAncestor) {
    selectedBox.style.transform = 'translateZ(-25vw) rotateY(' + currentAngle + 'deg) ';
  }

  $('.project_container').animate({
    scrollTop: 0
}, 500); // 500 is the duration of the animation in milliseconds

}


document.addEventListener('keydown', function (event) {
  if ($('.box_container').hasClass('open')) {
    var numberOfFaces = $('.open .box_face').length; // add this line to update the number of faces
    var rotationIndex = 360 / numberOfFaces ;
    if (event.key === "ArrowLeft") {
      // Left arrow key
      currentAngle = currentAngle + rotationIndex;
      rotateCarousel();
    } else if (event.key === "ArrowRight") {
      // Right arrow key
      currentAngle = currentAngle - rotationIndex;
      rotateCarousel();
    }
  }
});

// Click event listener for the box_face elements
// $(document).on('click', '.open .box_face', function (event) {
//   var currentIndex = $(this).index();
//   if (currentIndex > selectedIndex) {
//     selectedIndex = currentIndex;
//     rotateCarousel();
//   } else if (currentIndex < selectedIndex) {
//     selectedIndex = currentIndex;
//     rotateCarousel();
//   }
// });
