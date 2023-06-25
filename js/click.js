$(document).ready(function () {
});

var numFaces = 0;
var indexFace = 0;
var prevIndexFace = (indexFace - 1 + numFaces) % numFaces;
var nextIndexFace = (indexFace + 1) % numFaces;
var currentBoxContainer;
var currentAngle = 0;

function updateSelected() {
    $('.open .box_face').removeClass('selected');
    $('.open .box_face').removeClass('selected_two');
    $('.open .box_face').eq(indexFace).addClass('selected');
    prevIndexFace = (indexFace - 1 + numFaces) % numFaces;
    nextIndexFace = (indexFace + 1) % numFaces;
    $('.open .box_face').eq(prevIndexFace).addClass('selected_two');
    $('.open .box_face').eq(nextIndexFace).addClass('selected_two');
}

// open box
$(document).on('click', '.box_container .box_face', function () {
    numFaces = $('.open .box_face').length;
    currentBoxContainer = $(this).closest('.box_container');
    prevIndexFace = (indexFace - 1 + numFaces) % numFaces;
    nextIndexFace = (indexFace + 1) % numFaces;
    if (!currentBoxContainer.hasClass('open')) {
        currentBoxContainer.toggleClass('open');
        currentBoxContainer.css('z-index', '99');
        updateSelected();
        // all other closed box_containers must not react to click (apparently I needed that?)
        $('.box_container').not(currentBoxContainer).css({ 'pointer-events': 'none' });
        setTimeout(function () {
            currentBoxContainer.find('.box_header').css('opacity', '1');
            currentBoxContainer.find('.project_container').css({
                'opacity': '1'
            });
        }, 1050);
        setTimeout(function () {
            currentBoxContainer.find('.project_container').css({
                'display': 'flex',
            });
        }, 1000); // Set the opacity 
    }
});


function closeTheBox() {
    currentBoxContainer = $('.box_container.open');
    var box = currentBoxContainer.find('.box')[0];
    box.style.transform = ''; // clear the transform style so that it doesn't bug
    $('.project_container').scrollTop(0);
    $('.box_face').removeClass('selected');
    currentBoxContainer.toggleClass('open');
    currentBoxContainer.css('z-index', '0')
    currentBoxContainer.find('.box_header').css('opacity', '0');
    currentBoxContainer.find('.project_container').css({
        'display': 'none',
        'opacity': '0'
    });
    currentAngle = 0;
    indexFace = 0;
    $('.box_container').not(currentBoxContainer).css({ 'pointer-events': 'auto' });
}

// closing through clicking the closing button 
$(document).on('click', '.box_container.open .box_close', function (event) {
    closeTheBox();
});

// closing through clicking Esc 
$(document).on('keydown', function (event) {
    if (event.key === 'Escape') { // Check if the pressed key is 'Escape'
        closeTheBox();
    }
});


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

function rotateLeft() {
    numFaces = $('.open .box_face').length; // add this line to update the number of faces
    var rotationIndex = 360 / numFaces;
    currentAngle = currentAngle + rotationIndex;
    rotateCarousel();
    indexFace = (indexFace - 1 + numFaces) % numFaces;
    updateSelected();
}

function rotateRight() {
    numFaces = $('.open .box_face').length; // add this line to update the number of faces
    var rotationIndex = 360 / numFaces;
    currentAngle = currentAngle - rotationIndex;
    rotateCarousel();
    indexFace = (indexFace + 1) % numFaces;
    updateSelected();
}

//throttling function to avoid crazy spin of the box carousel
var throttle = false;
function throttling() {
    if (throttle) {
        setTimeout(() => {
            throttle = false;
        }, 300);
    }
}


//rotating with a click (slow on tap why?)
$(document).on('click', '.open .box_face', function () {
    var prevFace = $('.open .box_face').eq(prevIndexFace);
    var nextFace = $('.open .box_face').eq(nextIndexFace);
    if (this === prevFace[0]) {
        rotateLeft();
    } else if (this === nextFace[0]) {
        rotateRight();
    }
});

document.addEventListener('keydown', function (event) {
    if ($('.box_container').hasClass('open')) {
        if (!throttle) {
            if (event.key === 'ArrowLeft') {
                rotateLeft();
            } else if (event.key === 'ArrowRight') {
                rotateRight();
            }
            throttle = true;
            throttling();
        }
    }
});

//scroll box horizontally but only works outside selected scrollable project
window.addEventListener('wheel', function (event) {
    if ($('.box_container').hasClass('open')) {
        if (!document.querySelector('.open .box_face.selected').contains(event.target)) {
            if (!throttle) {
                if (Math.sign(event.deltaY) === -1) {
                    rotateLeft();
                } else if (Math.sign(event.deltaY) === 1) {
                    rotateRight();
                }
                throttle = true;
                throttling();
            }
        }
    }
});


//swipe rotate (found online)

document.addEventListener('touchstart', handleTouchStart, { passive: false });
document.addEventListener('touchmove', handleTouchMove, { passive: false });

var xDown = null;
var yDown = null;

function getTouches(evt) {
    return evt.touches || evt.originalEvent.touches; // jQuery
}

function handleTouchStart(evt) {
    if (!$('.box_container').hasClass('open')) {
        return;
    }

    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;

    evt.target.setPointerCapture(firstTouch.pointerId);
}

function handleTouchMove(evt) {
    if (!$('.box_container').hasClass('open') || !xDown || !yDown) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;
    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
            rotateRight();
        } else {
            rotateLeft();
        }
    }

    // Reset touch start coordinates
    xDown = null;
    yDown = null;
}





//preload images so that they not take time when opening boxes
$(document).ready(function () {
    $('img').each(function () {
        var imgSrc = $(this).attr('src');
        var preloadImg = new Image();
        preloadImg.src = imgSrc;
    });
});