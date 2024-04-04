gsap.registerPlugin(MotionPathPlugin);

const strokeWidth = 22.8;
const colors = ["#5951B8", "#5951B8", "#ffffff", "#ffffff"];
const gradientPath = document.querySelector("#gradient-path");
const dotsDensity = 0.6 * strokeWidth;
const numberOfDots = Math.ceil(
  (dotsDensity * gradientPath.getTotalLength()) / strokeWidth
);

const dotsGroup = document.querySelector(".dots");
createBasicGradient(dotsGroup);

function createBasicGradient(g) {
  let circles = [];
  for (let idx = 0; idx < numberOfDots; idx++) {
    let circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    g.appendChild(circle);

    gsap.set(circle, {
      motionPath: {
        path: gradientPath, // the target path
        start: (numberOfDots - 1 - idx) / numberOfDots, // the position on target path
        end: (numberOfDots - 1 - idx) / numberOfDots,
      },
      attr: {
        r: 0.5 * strokeWidth, // to compose strokeWidth
        fill: gsap.utils.interpolate(
          colors,
          (numberOfDots - 1 - idx) / (numberOfDots * 3)
        ),
      },
    });

    circles.unshift(circle);
  }

  // Apply the gradient to your SVG element
let punkt = document.querySelector(".punkt");
let punktOutline = document.querySelector(".punkt-outline");
let punktMask = document.querySelector(".punkt-mask");

window.onscroll = function () {
  let scrollFactor =
    window.scrollY / (document.body.scrollHeight - window.innerHeight);

  circles.forEach((circle, idx) => {
    let progress = (idx / (numberOfDots * 3) + scrollFactor / 1.5) % 1;
    gsap.set(circle, {
      attr: {
        fill: gsap.utils.interpolate(colors, progress),
      },
    });
  });

  // Rotate the .punkt and .punkt-outline elements based on the scroll position
  let rotation = scrollFactor * 360; // Adjust the multiplier as needed
  punkt.style.transform = `rotate(${rotation}deg)`;
  punktOutline.style.transform = `rotate(${rotation}deg)`;
  punktMask.style.transform = `rotate(${rotation}deg)`;

  punkt.style.fillOpacity = scrollFactor;
};

}





