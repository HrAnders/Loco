let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);

  console.log("My character is ", world.character);
  console.log("Enemies are ", world.enemies);
}

window.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "KeyD":
      keyboard.RIGHT = true;
      break;
    case "KeyA":
      keyboard.LEFT = true;
      break;
    case "Space":
      keyboard.SPACE = true;
        break;
    default:
      break;
  }
});

window.addEventListener("keyup", (e) => {
    switch (e.code) {
      case "KeyD":
        keyboard.RIGHT = false;
        break;
      case "KeyA":
        keyboard.LEFT = false;
        break;
        case "Space":
          keyboard.SPACE = false;
          break;
      default:
        break;
    }
  });
