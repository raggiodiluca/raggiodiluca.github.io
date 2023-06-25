$(document).ready(function () {

    //preload images so that they not take time when opening boxes
    $('img').each(function () {
        var imgSrc = $(this).attr('src');
        var preloadImg = new Image();
        preloadImg.src = imgSrc;
    });


    // Loop through each box_container element
    $('.box_container').each(function () {
        // Find the box_label within the current box_container element
        var boxLabel = $(this).find('.box_label');

        // Loop through each box_face element within the current box_container
        $(this).find('.box_face').each(function () {
            // Clone the box_label and prepend it to the current box_face element
            $(this).prepend(boxLabel.clone());
        });
    });
});

var numFaces = 0;
var indexFace = 0;
var prevIndexFace = (indexFace - 1 + numFaces) % numFaces;
var nextIndexFace = (indexFace + 1) % numFaces;
var currentBoxContainer;
var currentAngle = 0;
var invisibleCls = "is_invisible";
var hiddenCls = "is_hidden";
var openCls = "is_open";

function updateSelected() {
    prevIndexFace = (indexFace - 1 + numFaces) % numFaces;
    nextIndexFace = (indexFace + 1) % numFaces;
    $('.is_open .box_face').removeClass(['selected','selectable']);
    $('.is_open .box_face').eq(indexFace).addClass('selected');
    $('.is_open .box_face').eq(prevIndexFace).addClass('selectable');
    $('.is_open .box_face').eq(nextIndexFace).addClass('selectable');
}

// open box
$(document).on('click', '.box_container .box_face', function () {
    currentBoxContainer = $(this).closest('.box_container');
    if (!currentBoxContainer.hasClass(openCls)) {
        currentBoxContainer.addClass(openCls)
        numFaces = $('.is_open .box_face').length;
        currentBoxContainer.css('z-index', '99');
        // all other closed box_containers must not react to click (apparently I needed that?)
        $('.box_container').not(currentBoxContainer).css({ 'pointer-events': 'none' });
        currentBoxContainer.find('.box_header').removeClass([hiddenCls]);
        currentBoxContainer.find('.project_container').removeClass([hiddenCls]);
        updateSelected();
    }
});

function closeTheBox() {
    currentBoxContainer = $('.box_container.is_open');
    var box = currentBoxContainer.find('.box')[0];
    box.style.transform = ''; // clear the transform style so that it doesn't bug
    $('.project_container').scrollTop(0);
    $('.box_face').removeClass('selected');
    currentBoxContainer.removeClass(openCls)
    currentBoxContainer.css('z-index', '0')
    currentBoxContainer.find('.box_header').addClass(hiddenCls);
    currentBoxContainer.find('.project_container').addClass(hiddenCls);
    currentAngle = 0;
    indexFace = 0;
    $('.box_container').not(currentBoxContainer).css({ 'pointer-events': 'auto' });
}

// closing through clicking the closing button 
$('.box_close').on('click', function () {
    closeTheBox();
});

// closing through clicking Esc 
$(document).on('keydown', function (event) {
    if (event.key === 'Escape') { // Check if the pressed key is 'Escape'
        closeTheBox();
    }
});


function rotateCarousel() {
    var selectedBox = document.querySelector('.is_open .box');

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

// left = -1
// right = 1
function rotateBox(direction) {
    numFaces = $('.is_open .box_face').length; // add this line to update the number of faces
    var rotationIndex = 360 / numFaces;
    if (direction < 0) {
        currentAngle += rotationIndex;
        rotateCarousel();
        indexFace = (indexFace - 1 + numFaces) % numFaces;
    } else {
        currentAngle -= rotationIndex;
        rotateCarousel();
        indexFace = (indexFace + 1) % numFaces;
    }
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
$(document).on('click', '.is_open .box_face', function () {
    var prevFace = $('.is_open .box_face').eq(prevIndexFace);
    var nextFace = $('.is_open .box_face').eq(nextIndexFace);
    if (this === prevFace[0]) {
        rotateBox(-1);
    } else if (this === nextFace[0]) {
        rotateBox(1);
    }
    
});

document.addEventListener('keydown', function (event) {
    if ($('.box_container').hasClass(openCls)) {
        if (!throttle) {
            if (event.key === 'ArrowLeft') {
                rotateBox(-1);
            } else if (event.key === 'ArrowRight') {
                rotateBox(1);
            }
            throttle = true;
            throttling();
        }
    }
});

//scroll box horizontally but only works outside selected scrollable project
window.addEventListener('wheel', function (event) {
    if ($('.box_container').hasClass(openCls)) {
        if (!document.querySelector('.is_open .box_face.selected').contains(event.target)) {
            if (!throttle) {
                if (Math.sign(event.deltaY) === -1) {
                    rotateBox(-1);
                } else if (Math.sign(event.deltaY) === 1) {
                    rotateBox(1);
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
    if (!$('.box_container').hasClass(openCls)) {
        return;
    }

    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;

    evt.target.setPointerCapture(firstTouch.pointerId);
}

function handleTouchMove(evt) {
    if (!$('.box_container').hasClass(openCls) || !xDown || !yDown) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;
    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
            rotateBox(1);
        } else {
            rotateBox(-1);
        }
    }

    // Reset touch start coordinates
    xDown = null;
    yDown = null;
}