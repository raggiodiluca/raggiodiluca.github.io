var selectedIndex = 0;
var initialIndex = null;

function rotateCarousel() {
  var numberOfFaces = $('.open .box_face').length; // add this line to update the number of faces
  var angle = (selectedIndex - initialIndex) / numberOfFaces * -360;
  var box = document.querySelector('.open .box');
  box.style.transform = 'translateZ(-32vw) rotateY(' + angle + 'deg) ';
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
$(document).on('click', '.open .box_face', function(event) {
  var currentIndex = $(this).index();
  if (currentIndex > selectedIndex) {
    selectedIndex = currentIndex;
    rotateCarousel();
  } else if (currentIndex < selectedIndex) {
    selectedIndex = currentIndex;
    rotateCarousel();
  }
});
