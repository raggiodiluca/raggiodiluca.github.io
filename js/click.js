$(document).ready(function () {
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

var indexFace = 0;
var currentBoxContainer;
var currentAngle = 0;

function updateSelected() {
    $('.open .box_face').removeClass('selected');
    $('.open .box_face').eq(indexFace).addClass('selected');
}

// open box
$(document).on('click', '.box_container .box_face', function () {
    currentBoxContainer = $(this).closest('.box_container');
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



document.addEventListener('keydown', function (event) {
    if ($('.box_container').hasClass('open')) {
        var numberOfFaces = $('.open .box_face').length; // add this line to update the number of faces
        var rotationIndex = 360 / numberOfFaces;
        if (event.key === "ArrowLeft") {
            // Left arrow key
            currentAngle = currentAngle + rotationIndex;
            rotateCarousel();
            indexFace = (indexFace - 1 + numberOfFaces) % numberOfFaces;
            updateSelected();
        } else if (event.key === "ArrowRight") {
            // Right arrow key
            currentAngle = currentAngle - rotationIndex;
            rotateCarousel();
            indexFace = (indexFace + 1) % numberOfFaces;
            updateSelected();
        }
    }
});



//preload images so that they not take time when opening boxes
$(document).ready(function () {
    $('img').each(function () {
        var imgSrc = $(this).attr('src');
        var preloadImg = new Image();
        preloadImg.src = imgSrc;
    });
});