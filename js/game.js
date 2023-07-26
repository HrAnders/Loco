let canvas;
let world;
let keyboard = new Keyboard();
let isFullScreen = false;
let canvasContainer = document.getElementById("container");

function init() {
  canvas = document.getElementById("canvas");
  showStartScreen();
}

function startNewGame() {
  world = new World(canvas, keyboard);
  document.getElementById("startBtn").classList.add("d-none");
  showControls();
  startButtonPress();
  stopButtonPress();
}

function restartGame() {
  window.location.reload();
}

function showControls() {
  document.getElementById("btnLeft").classList.remove("d-none");
  document.getElementById("btnRight").classList.remove("d-none");
  document.getElementById("btnUp").classList.remove("d-none");
  document.getElementById("btnThrow").classList.remove("d-none");
  document.getElementById("restartBtn").classList.remove("d-none");
}

function showStartScreen() {
  let ctx = canvas.getContext("2d");
  let startImageDiv = document.getElementById("startImageDiv");
  let startImage = document.getElementById("startImage");

  // Show the hidden div temporarily to access the image
  startImageDiv.style.display = "block";

  // Get the width and height of the image
  let imageWidth = startImage.width;
  let imageHeight = startImage.height;

  // Calculate the position to center the image on the canvas
  let canvasWidth = canvas.width;
  let canvasHeight = canvas.height;
  let imageX = (canvasWidth - imageWidth) / 2;
  let imageY = (canvasHeight - imageHeight) / 2;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.drawImage(startImage, imageX, imageY, imageWidth, imageHeight);

  // Hide the div again after drawing the image
  startImageDiv.style.display = "none";
}

function showInfo(){
  let infoDiv = document.getElementById("infoDiv");
  infoDiv.classList.remove('d-none');
}

function hideInfo(){
  let infoDiv = document.getElementById("infoDiv");
  infoDiv.classList.add('d-none');
}

function toggleFullScreen(){
  if(!isFullScreen){
    goFullScreen();
  }
  else{
    goMinScreen();
  }
}

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

function mutePage() {
  if (!world.isMuted) {
    world.backgroundMusic.muted = true;
    muteCharacter();
    muteEnemies();
    world.isMuted = true;
  }
  else{
    world.backgroundMusic.muted = false;
    unmuteCharacter();
    unmuteEnemies();
    world.isMuted = false;
  }
}

function muteCharacter() {
  world.character.walking_sound.muted = true;
  world.character.hurtSound.muted = true;
}

function unmuteCharacter(){
  world.character.walking_sound.muted = true;
  world.character.hurtSound.muted = true;
}

function muteEnemies() {
  world.level.enemies.forEach((enemy) => {
    enemy.deathSound.muted = true;
  });
}

function unmuteEnemies(){
  world.level.enemies.forEach((enemy) => {
    enemy.deathSound.muted = false;
  });
}

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