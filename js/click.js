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


    $(document).on('click', '.box_container .box_face', function () {
        var $currentBoxContainer = $(this).closest('.box_container');
        if (!$currentBoxContainer.hasClass('open')) {
            $currentBoxContainer.toggleClass('open');
            $currentBoxContainer.css('z-index', '99')
            // $('.box_container').not($currentBoxContainer).css({ 'opacity': '1', 'pointer-events': 'none' });
            $('.box_container').not($currentBoxContainer).css({'pointer-events': 'none' });
            setTimeout(function () {
                $currentBoxContainer.find('.box_header').css('opacity', '1');
                $currentBoxContainer.find('.project_container').css('opacity', '1');
            }, 1000); // Set the opacity of the related .box_header to 1 after an 800ms delay
        }
    });

    $(document).on('click', '.box_container.open .box_close', function (event) {
        var $currentBoxContainer = $(this).closest('.box_container');
        var box = $currentBoxContainer.find('.box')[0];
        box.style.transform = ''; // clear the transform style
        $('.project_container').scrollTop(0);
        $currentBoxContainer.toggleClass('open');
        $currentBoxContainer.css('z-index', '0')
        $currentBoxContainer.find('.box_header').css('opacity', '0');
        $currentBoxContainer.find('.project_container').css('opacity', '0');
        $('.box_container').not($currentBoxContainer).css({'pointer-events': 'auto' });
    });

    $(document).on('keydown', function (event) {
        if (event.key === 'Escape') { // Check if the key is 'Escape'
            var $currentBoxContainer = $('.box_container.open');
            if ($currentBoxContainer.length > 0) {
                var box = $currentBoxContainer.find('.box')[0];
                box.style.transform = ''; // clear the transform style
                $('.project_container').scrollTop(0);
                $currentBoxContainer.toggleClass('open');
                $currentBoxContainer.css('z-index', '0')
                $currentBoxContainer.find('.box_header').css('opacity', '0');
                $currentBoxContainer.find('.project_container').css('opacity', '0');
                $('.box_container').not($currentBoxContainer).css({'pointer-events': 'auto' });
            }
        }
    });
});


$(document).ready(function () {
    $('img').each(function () {
        var imgSrc = $(this).attr('src');
        var preloadImg = new Image();
        preloadImg.src = imgSrc;
    });
});