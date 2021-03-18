var $y = jQuery.noConflict();

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

var downloadAsSVG = function (fileName) {

    if (!fileName) {
        fileName = "vector-art.svg"
    }

    var url = "data:image/svg+xml;utf8," + encodeURIComponent(paper.project.exportSVG({
        asString: true
    }));

    var link = document.createElement("a");
    link.download = fileName;
    link.href = url;
    link.click();
}

window.onload = function () {
    paper.setup("drawing-canvas");
    var tool = new Tool();
    var myPath = new Path();
    myPath.strokeWidth = .8;

    var light = false;
    var randomHue = Math.floor(Math.random() * (360 - 0 + 1)) + 0;

    if (randomHue > "45" && randomHue < "200" ) {
        light = true;
    };

    if (light == false) {
        var randomHex = hslToHex(randomHue, 100, 50);
    } else {
        var randomHex = hslToHex(randomHue, 100, 40);
    };


    myPath.strokeColor = randomHex;
    document.body.style.setProperty('--accent', randomHex);



    tool.onMouseMove = function (event) {
        myPath.add(event.point);
        myPath.smooth();
    };

    $y('.save').click(function () {
        downloadAsSVG();
    });




    /* click
    $y("body").mousedown(function () {
        paper.project.activeLayer.removeChildren();
    });

    $y("body").mouseup(function () {
        myPath = new Path();
        myPath.strokeColor = '#FF00FF';
        myPath.strokeWidth = .8;
    });
    */
}