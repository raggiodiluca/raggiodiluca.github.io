document.addEventListener("DOMContentLoaded", function () {
  const textElement = document.getElementById("draggable-text");
  const words = textElement.textContent.split(" ");
  textElement.textContent = ""; // Clear original text

  words.forEach((word) => {
    const span = document.createElement("span");
    span.textContent = word + " ";
    span.className = "draggable";
    textElement.appendChild(span);
  });

  // Initialize Matter.js
  const {
    Engine,
    Render,
    Runner,
    Bodies,
    Composite,
    Mouse,
    MouseConstraint,
    Events,
    Body,
  } = Matter;

  const engine = Engine.create();
  const world = engine.world;

  const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: window.innerWidth,
      height: window.innerHeight,
      wireframes: false,
      background: "transparent",
    },
  });

  Render.run(render);
  Runner.run(Runner.create(), engine);

  // Add ground to catch falling words
  const ground = Bodies.rectangle(
    window.innerWidth / 2,
    window.innerHeight,
    window.innerWidth,
    10,
    { isStatic: true }
  );
  Composite.add(world, ground);

  // Function to make elements draggable
  function makeDraggable(el) {
    let wordBody = null;

    // Synchronize the DOM element with the physics body
    Events.on(engine, "beforeUpdate", () => {
      if (wordBody) {
        const rect = el.getBoundingClientRect();
        el.style.position = "fixed";
        el.style.left = `${wordBody.position.x - rect.width / 2}px`;
        el.style.top = `${wordBody.position.y - rect.height / 2}px`;
        el.style.transform = `rotate(${wordBody.angle}rad)`;
      }
    });

    // Enable dragging using Matter.js MouseConstraint
    const mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: { visible: false },
        },
      });

    Composite.add(world, mouseConstraint);

    el.addEventListener("mousedown", () => {
      if (!wordBody) {
        const rect = el.getBoundingClientRect();
        wordBody = Bodies.rectangle(
          rect.left + rect.width / 2,
          rect.top + rect.height / 2,
          rect.width,
          rect.height,
          { restitution: 0.8 }
        );
        Composite.add(world, wordBody);
      }
    });

    // keep the mouse in sync with rendering
    render.mouse = mouse;
  }

  // Make initial elements draggable
  const wordElements = document.querySelectorAll(".draggable");
  wordElements.forEach((el) => {
    makeDraggable(el);
  });

  // Add event listener to elements with class "destroy"
  document.querySelectorAll(".destroy").forEach((el) => {
    el.addEventListener("click", function () {
      el.classList.remove("destroy");
      el.classList.add("draggable");
      makeDraggable(el);
    });
  });
});
