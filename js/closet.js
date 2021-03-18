var $y = jQuery.noConflict();

$y(document).ready(function () {

    $y('.button.web').click(function () {
        $y('.closet').removeClass('hide').addClass('hide');
        $y('.closet.web').toggleClass('hide');
    });

    $y('.button.graphic').click(function () {
        $y('.closet').removeClass('hide').addClass('hide');
        $y('.closet.graphic').toggleClass('hide');
    });

    $y('.button.illustration').click(function () {
        $y('.closet').removeClass('hide').addClass('hide');
        $y('.closet.illustration').toggleClass('hide');
    });

    $y('.about-button').click(function () {
        $y('.closet').removeClass('hide').addClass('hide');
        $y('.closet.about').toggleClass('hide');
    });

    $y('.contact-button').click(function () {
        $y('.closet').removeClass('hide').addClass('hide');
        $y('.closet.contact').toggleClass('hide');
    });

    $y('.closet .closer').click(function () {
        $y('.closet').removeClass('hide').addClass('hide');
    });





});