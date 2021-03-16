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

function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0'); // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}



paper.install(window);

window.onload = function () {
    paper.setup("drawing-canvas");
    var tool = new Tool();
    var myPath = new Path();
    myPath.strokeColor = {
        hue: Math.random() * 360,
    };
    myPath.strokeWidth = .8;


    var accento = myPath.strokeColor;
    var roundhue = accento.toString().split('hue: ').pop().split('.')[0];


    myPath.strokeColor = {
        hue: roundhue,
        saturation: 1,
        brightness: 1
    };



    var finalhex = hslToHex(roundhue, 100, 50);



    document.body.style.setProperty('--accent', finalhex);



    tool.onMouseMove = function (event) {
        myPath.add(event.point);
        myPath.smooth();

    };




    /* click
    $("body").mousedown(function () {
        paper.project.activeLayer.removeChildren();
    });

    $("body").mouseup(function () {
        myPath = new Path();
        myPath.strokeColor = '#FF00FF';
        myPath.strokeWidth = .8;
    });
    */
}



window.onAccentoReady = function (accento) {


    function hslToHex(h, s, l) {
        l /= 100;
        const a = s * Math.min(l, 1 - l) / 100;
        const f = n => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color).toString(16).padStart(2, '0'); // convert to Hex and prefix "0" if needed
        };
        return `#${f(0)}${f(8)}${f(4)}`;
    }


    //colorReplace("#FF00FF", myColor);
};