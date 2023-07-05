var numFaces = 0;
var indexFace = 0;
var currentOrigamiContainer;
var currentAngle = 0;
var invisibleCls = "is_invisible";
var hiddenCls = "is_hidden";
var invisibleCls = "is_invisible";
var openCls = "is_open";
var throttle = false;
var origamiCls;
var convertedZ = 0;


$(document).ready(function () {

    // open origami
    $(document).on('click', '.origami_container .origami_face', function () {
        currentOrigamiContainer = $(this).closest('.origami_container');
        if (!currentOrigamiContainer.hasClass(openCls)) {
            currentOrigamiContainer.addClass(openCls)
            numFaces = $('.is_open .origami_face').length;
            currentOrigamiContainer.css('z-index', '99');
            // all other closed origami_containers must not react and disappear
            $('.origami_container').not(currentOrigamiContainer).css({
                'pointer-events': 'none'
            });
            $('.origami_container').not(currentOrigamiContainer).addClass(invisibleCls);
            setTimeout(function () {
                currentOrigamiContainer.find('.project_container').removeClass(hiddenCls);
            }, 700);
            setTimeout(function () {
                currentOrigamiContainer.find('.origami_header').removeClass(invisibleCls);
                currentOrigamiContainer.find('.project_container').removeClass(invisibleCls);
            }, 720);
            updateSelected();
        }
        origamiCls = $('.is_open .origami');
    });

    // closing through clicking the closing button 
    $('.origami_close').on('click', function () {
        closeTheOrigami();
    });

    // closing through clicking Esc 
    $(document).on('keydown', function (event) {
        if (event.key === 'Escape') { // Check if the pressed key is 'Escape'
            closeTheOrigami();
        }
    });

    $(window).on('keydown', function (event) {
        if ($('.origami_container').hasClass(openCls)) {
            if (!throttle) {
                if (event.key === 'ArrowLeft') {
                    rotateOrigami(-1);
                } else if (event.key === 'ArrowRight') {
                    rotateOrigami(1);
                }
                throttle = true;
                throttling();
            }
        }
    });

    //scroll origami horizontally but only works outside selected scrollable project
    $(window).on('wheel', function (event) {
        if ($('.origami_container').hasClass(openCls)) {
            if (!$('.is_open .origami_face.selected').has(event.target).length) {
                if (!throttle) {
                    if (Math.sign(event.originalEvent.deltaY) === -1) {
                        rotateOrigami(-1);
                    } else if (Math.sign(event.originalEvent.deltaY) === 1) {
                        rotateOrigami(1);
                    }
                    throttle = true;
                    throttling();
                }
            }
        }
    });

});

function updateSelected() {
    $('.is_open .origami_face').removeClass('selected');
    $('.is_open .origami_face').eq(indexFace).addClass('selected');
    document.getElementsByClassName("selected")[0].addEventListener('webkitTransitionEnd', fixSafariScrolling);
}

function closeTheOrigami() {
    currentOrigamiContainer = $('.origami_container.is_open');
    origamiCls = $('.is_open .origami');
    origamiCls.css('transform', ''); // clear the transform style so that it doesn't bug
    $('.project_container').scrollTop(0);
    $('.origami_face').removeClass('selected');
    currentOrigamiContainer.removeClass(openCls)
    currentOrigamiContainer.css('z-index', '0')
    currentOrigamiContainer.find('.origami_header').addClass(invisibleCls);
    currentOrigamiContainer.find('.project_container').addClass(hiddenCls).addClass(invisibleCls);
    currentAngle = 0;
    indexFace = 0;
    $('.origami_container').not(currentOrigamiContainer).css({
        'pointer-events': 'auto'
    });
    $('.origami_container').not(currentOrigamiContainer).removeClass(invisibleCls);
}

function rotation() {
    origamiCls = $('.is_open .origami');
    var currentRotateZ = 'rotateY(' + currentAngle + 'deg)';
    origamiCls.css('transform', currentRotateZ);
    $('.project_container').animate({
        scrollTop: 0
    }, 500); // 500 is the duration of the animation in milliseconds
}

function fixSafariScrolling(event) {
    event.target.style.overflowY = 'hidden';
    setTimeout(function () {
        event.target.style.overflowY = 'auto';
    });
}


// left = -1
// right = 1
function rotateOrigami(direction) {
    numFaces = $('.is_open .origami_face').length; // add this line to update the number of faces
    var rotationIndex = 360 / numFaces;
    if (direction < 0) {
        currentAngle += rotationIndex;
        rotation();
        indexFace = (indexFace - 1 + numFaces) % numFaces;
    } else {
        currentAngle -= rotationIndex;
        rotation();
        indexFace = (indexFace + 1) % numFaces;
    }
    updateSelected();
}

//throttling function to avoid crazy spin of the origami carousel
function throttling() {
    if (throttle) {
        setTimeout(() => {
            throttle = false;
        }, 300);
    }
}




// swipe rotate(found online) -- - to be converted in JQuery
document.addEventListener('touchstart', handleTouchStart, {
    passive: false
});
document.addEventListener('touchmove', handleTouchMove, {
    passive: false
});
var xDown = null;
var yDown = null;

function getTouches(evt) {
    return evt.touches || evt.originalEvent.touches; // jQuery 
}

function handleTouchStart(evt) {
    if (!$('.origami_container').hasClass(openCls)) {
        return;
    }
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
    evt.target.setPointerCapture(firstTouch.pointerId);
}

function handleTouchMove(evt) {
    if (!$('.origami_container').hasClass(openCls) || !xDown || !yDown) {
        return;
    }
    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;
    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
            rotateOrigami(1);
        } else {
            rotateOrigami(-1);
        }
    }
    // Reset touch start coordinates     
    xDown = null;
    yDown = null;
}