class World {
  character = new Character();
  healthBar = new Healthbar();
  throwableObjects = []
  level = level1;
  ctx;
  canvas;
  keyboard;
  camera_x = 0;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.updateWorldData();
  }

  setWorld() {  //get access to world class from other classes
    this.character.world = this;
    this.healthBar.world = this;
  }

  updateWorldData(){
    setInterval(() => {
      this.checkCollisions();
      this.checkThrow();
    }, 200);
  }

  checkCollisions(){
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
      }
    });
    this.level.collectibles.forEach((collectible) => {
      if (this.character.isColliding(collectible)) {
        collectible.height = 0;
      }
    });
  }

  checkThrow(){
    if (this.keyboard.CTRL) {
      let bottle = new ThrowableObject(this.character.x + 50, this.character.y+100);
      this.throwableObjects.push(bottle);
    }
  }


  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addStatusBars(this.healthBar)
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.collectibles)
    this.addObjectsToMap(this.throwableObjects);

    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0);

    //draw() wird immer wieder aufgerufen
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    //iterates through all elements in the given array and returns every element to addToMap()
    objects.forEach((obj) => {
      this.addToMap(obj);
    });
  }

  addToMap(movObj) {
    if (movObj.facesOtherDirection) {
      movObj.flipImage(this.ctx);
    }

    movObj.draw(this.ctx);

    movObj.drawCollisionBoxes(this.ctx);
    movObj.drawOffsetBoxes(this.ctx);
    

    if (movObj.facesOtherDirection) {
      movObj.flipImageBack(this.ctx);
    }
  }

  addStatusBars(bar){
    bar.draw(this.ctx);
  }
}
