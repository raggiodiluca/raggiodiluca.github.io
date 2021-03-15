$(document).ready(function () {

    $('.button.web').click(function () {
        $('.closet').removeClass('hide').addClass('hide');
        $('.closet.web').toggleClass('hide');
    });

    $('.button.graphic').click(function () {
        $('.closet').removeClass('hide').addClass('hide');
        $('.closet.graphic').toggleClass('hide');
    });

    $('.button.illustration').click(function () {
        $('.closet').removeClass('hide').addClass('hide');
        $('.closet.illustration').toggleClass('hide');
    });

    $('.closet .closer').click(function () {
        $('.closet').removeClass('hide').addClass('hide');
    });


});