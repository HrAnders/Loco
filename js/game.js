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
      console.log(keyboard);
      break;
    case "KeyA":
      keyboard.LEFT = true;
      console.log(keyboard);
      break;
      case "Space":
        keyboard.SPACE = true;
        console.log(keyboard)
        break;
    default:
      break;
  }
});

window.addEventListener("keyup", (e) => {
    switch (e.code) {
      case "KeyD":
        keyboard.RIGHT = false;
        console.log(keyboard);
        break;
      case "KeyA":
        keyboard.LEFT = false;
        console.log(keyboard);
        break;
        case "Space":
          keyboard.SPACE = false;
          console.log(keyboard)
          break;
      default:
        break;
    }
  });
