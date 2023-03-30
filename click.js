$(document).ready(function () {
    var boxLabel = $('.box_label');

    // Loop through each box_face element
    $('.box_face').each(function () {
        // Clone the box_label and prepend it to the current box_face element
        $(this).prepend(boxLabel.clone());

    });

$(document).on('click', '#container .box_face', function () {
            if (!$('#container').hasClass('open')) {
                $('#container').toggleClass('open');
                setTimeout(function() {
                    $('.box_header').css('opacity', '1');
                }, 800); // Set the opacity of .box_header to 1 after an 800ms delay
            }
        });

$(document).on('click', '#container.open .box_close', function (event) {
    var box = document.querySelector('.open .box');
    box.style.transform = ''; // clear the transform style
    $('#container').toggleClass('open');
    $('.box_header').css('opacity', '0');
});

});