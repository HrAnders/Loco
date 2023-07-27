let canvas;
let world;
let keyboard = new Keyboard();
let isFullScreen = false;
let canvasContainer = document.getElementById("container");

/**
 * This function initializes the start screen
 */
function init() {
  canvas = document.getElementById("canvas");
  showStartScreen();
}

/**
 * This function starts a new game
 */
function startNewGame() {
  world = new World(canvas, keyboard);
  document.getElementById("startBtn").classList.add("d-none");
  showControls();
  startButtonPress();
  stopButtonPress();
  startButtonClick();
  stopButtonClick();
}

/**
 * This function restarts the game
 */
function restartGame() {
  window.location.reload();
}

/**
 * This function shows the control buttons
 */
function showControls() {
  document.getElementById("btnLeft").classList.remove("d-none");
  document.getElementById("btnRight").classList.remove("d-none");
  document.getElementById("btnUp").classList.remove("d-none");
  document.getElementById("btnThrow").classList.remove("d-none");
  document.getElementById("restartBtn").classList.remove("d-none");
}

/**
 * This function shows the start screen
 */
function showStartScreen() {
  let ctx = canvas.getContext("2d");
  let startImageDiv = document.getElementById("startImageDiv");
  let startImage = document.getElementById("startImage");

  startImageDiv.style.display = "block";

  drawStartScreen(startImage, ctx);

  startImageDiv.style.display = "none";
}

/**
 * This function draws and aligns the start screen
 */
function drawStartScreen(startImage, ctx){
  let imageWidth = startImage.width;
  let imageHeight = startImage.height;

  let canvasWidth = canvas.width;
  let canvasHeight = canvas.height;
  let imageX = (canvasWidth - imageWidth) / 2;
  let imageY = (canvasHeight - imageHeight) / 2;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.drawImage(startImage, imageX, imageY, imageWidth, imageHeight);
}

/**
 * This function shows the info screen
 */
function showInfo(){
  let infoDiv = document.getElementById("infoDiv");
  infoDiv.classList.remove('d-none');
}

/**
 * This function hides the info screen
 */
function hideInfo(){
  let infoDiv = document.getElementById("infoDiv");
  infoDiv.classList.add('d-none');
}

/**
 * This function toggles the fullscreen
 */
function toggleFullScreen(){
  if(!isFullScreen){
    goFullScreen();
  }
  else{
    goMinScreen();
  }
}

/**
 * This function sets the canvas container to fullscreen
 */
function goFullScreen() {
  let container = document.getElementById("container");
  if (container.requestFullscreen) {
    container.requestFullscreen();
  } else if (container.webkitRequestFullscreen) {
    container.webkitRequestFullscreen();
  } else if (container.mozRequestFullScreen) {
    container.mozRequestFullScreen();
  }
  isFullScreen = true;
}

/**
 * This function resets the canvas container to small screen
 */
function goMinScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
  isFullScreen = false;
}

/**
 * This function handles the muting of the game
 */
function mutePage() {
  if (!world.isMuted) {
    world.backgroundMusic.muted = true;
    muteCharacter();
    muteEnemies();
    muteCollectibles();
    world.isMuted = true;
  }
  else{
    world.backgroundMusic.muted = false;
    unmuteCharacter();
    unmuteEnemies();
    unmuteCollectibles();
    world.isMuted = false;
  }
}

/**
 * This function mutes the character
 */
function muteCharacter() {
  world.character.walking_sound.muted = true;
  world.character.hurtSound.muted = true;
}

/**
 * This function unmutes the character
 */
function unmuteCharacter(){
  world.character.walking_sound.muted = true;
  world.character.hurtSound.muted = true;
}

/**
 * This function mutes the enemies
 */
function muteEnemies() {
  world.level.enemies.forEach((enemy) => {
    enemy.deathSound.muted = true;
  });
}

/**
 * This function unmutes the enemies
 */
function unmuteEnemies(){
  world.level.enemies.forEach((enemy) => {
    enemy.deathSound.muted = false;
  });
}

/**
 * This function mutes the collectibles
 */
function muteCollectibles() {
  world.level.collectibles.forEach((collectible) => {
    collectible.collectSound.muted = true;
  });
}


/**
 * This function mutes the collectibles
 */
function unmuteCollectibles() {
  world.level.collectibles.forEach((collectible) => {
    collectible.collectSound.muted = false;
  });
}

/**
 * This function handles the keys pressed by the player
 */
window.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "KeyD":
      keyboard.RIGHT = true;
      break;
    case "ArrowRight":
      keyboard.RIGHT = true;
      break;
    case "KeyA":
      keyboard.LEFT = true;
      break;
    case "ArrowLeft":
      keyboard.LEFT = true;
      break;
    case "Space":
      keyboard.SPACE = true;
      break;
    case "ControlLeft":
      keyboard.CTRL = true;
      break;
    default:
      break;
  }
});

/**
 * This function handles the keys released by the player
 */
window.addEventListener("keyup", (e) => {
  switch (e.code) {
    case "KeyD":
      keyboard.RIGHT = false;
      break;
    case "ArrowRight":
      keyboard.RIGHT = false;
      break;
    case "KeyA":
      keyboard.LEFT = false;
      break;
    case "ArrowLeft":
      keyboard.LEFT = false;
      break;
    case "Space":
      keyboard.SPACE = false;
      break;
    case "ControlLeft":
      keyboard.CTRL = false;
      break;
    default:
      break;
  }
});

/**
 * This function handles the touch events for non mobile devices on click
 */
function startButtonClick(){
  document.getElementById('btnLeft').addEventListener("mousedown", () => {
    keyboard.LEFT = true;
  });

  document.getElementById('btnRight').addEventListener("mousedown", () => {
    keyboard.RIGHT = true;
  });

  document.getElementById('btnUp').addEventListener("mousedown", () => {
    keyboard.SPACE = true;
  });

  document.getElementById('btnThrow').addEventListener("mousedown", () => {
    keyboard.CTRL = true;
  });
}

/**
 * This function handles the touch events for non mobile devices on release
 */
function stopButtonClick(){
  document.getElementById('btnLeft').addEventListener("mouseup", () => {
    keyboard.LEFT = false;
  });

  document.getElementById('btnRight').addEventListener("mouseup", () => {
    keyboard.RIGHT = false;
  });

  document.getElementById('btnUp').addEventListener("mouseup", () => {
    keyboard.SPACE = false;
  });

  document.getElementById('btnThrow').addEventListener("mouseup", () => {
    keyboard.CTRL = false;
  });
}

/**
 * This function handles the touch events for mobile devices on press
 */
function startButtonPress() {
  document.getElementById("btnLeft").addEventListener("touchstart", (ev) => {
      keyboard.LEFT = true;
      ev.preventDefault();
  })

  document.getElementById("btnRight").addEventListener("touchstart", (ev) => {
      keyboard.RIGHT = true;
      ev.preventDefault();
  })

  document.getElementById("btnUp").addEventListener("touchstart", (ev) => {
      keyboard.SPACE = true;
      ev.preventDefault();
  })

  document.getElementById("btnThrow").addEventListener("touchstart", (ev) => {
      keyboard.CTRL = true;
      ev.preventDefault();
  })
}

/**
 * This function handles the touch events for mobile devices on release
 */
function stopButtonPress() {
  document.getElementById("btnLeft").addEventListener("touchend", (ev) => {
      keyboard.LEFT = false;
      ev.preventDefault();
  })

  document.getElementById("btnRight").addEventListener("touchend", (ev) => {
      keyboard.RIGHT = false;
      ev.preventDefault();
  })

  document.getElementById("btnUp").addEventListener("touchend", (ev) => {
      keyboard.SPACE = false;
      ev.preventDefault();
  })

  document.getElementById("btnThrow").addEventListener("touchend", (ev) => {
      keyboard.CTRL = false;
      ev.preventDefault();
  })
}