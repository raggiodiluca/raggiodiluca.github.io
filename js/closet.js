$(document).ready(function () {

    $('.button.web').click(function () {
        $('.closet').removeClass('hide').addClass('hide');
        $('.closet.web').toggleClass('hide');
        $('#tipp').removeClass('hide').addClass('hide');
    });

    $('.button.graphic').click(function () {
        $('.closet').removeClass('hide').addClass('hide');
        $('.closet.graphic').toggleClass('hide');
        $('#tipp').removeClass('hide').addClass('hide');
    });

    $('.button.illustration').click(function () {
        $('.closet').removeClass('hide').addClass('hide');
        $('.closet.illustration').toggleClass('hide');
        $('#tipp').removeClass('hide').addClass('hide');
    });

    $('.about-button').click(function () {
        $('.closet').removeClass('hide').addClass('hide');
        $('.closet.about').toggleClass('hide');
        $('#tipp').removeClass('hide').addClass('hide');
    });

    $('.contact-button').click(function () {
        $('.closet').removeClass('hide').addClass('hide');
        $('.closet.contact').toggleClass('hide');
        $('#tipp').removeClass('hide').addClass('hide');
    });

    $('.closet .closer').click(function () {
        $('.closet').removeClass('hide').addClass('hide');
        $('#tipp').removeClass('hide');
    });

    $(document).keyup(function (e) {
        if (e.keyCode == 27) {
            $('.closet').removeClass('hide').addClass('hide');
            $('#tipp').removeClass('hide');
            $('.showcase').scrollBottom = 0;
        }
    });

});