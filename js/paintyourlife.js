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
    myPath.strokeWidth = .8;

    var hue = 0;
    var light = false;
    var randomOne = Math.floor(Math.random() * (45 - 0 + 1)) + 0;
    var randomTwo = Math.floor(Math.random() * (199 - 46 + 1)) + 46;
    var randomThree = Math.floor(Math.random() * (360 - 200 + 1)) + 200;
    var toggleRandom = Math.floor(Math.random() * (3 - 1 + 1)) + 1;

    if (toggleRandom == 1) {
        hue = randomOne;
    } else if (toggleRandom == 2) {
        hue = randomTwo;
        light = true;
    } else {
        hue = randomThree;
    };

    if (light == false) {
        var randomHex = hslToHex(hue, 100, 50);
    } else {
        var randomHex = hslToHex(hue, 100, 40);
    };


    myPath.strokeColor = randomHex;
    document.body.style.setProperty('--accent', randomHex);



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



var svg = paper.project.exportSVG({
    asString: true
});
var blob = new Blob([svg], {
    type: "image/svg+xml;charset=utf-8"
});

$('.save').click(function () {

    saveAs(blob, 'cazzillo.svg');

});