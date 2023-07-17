class World {
  character = new Character();
  healthBar = new Healthbar();
  salsaBar = new SalsaBar();
  throwableObjects = [];
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

  setWorld() {
    //get access to world class from other classes
    this.character.world = this;
    this.healthBar.world = this;
    this.salsaBar.world = this;
    this.level.world = this;
  }

  updateWorldData() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrow();
    }, 50);
  }

  checkCollisions() {
    this.checkEnemyCollision();

    this.checkCollectibleCollision();

    this.checkBottleCollision();
  }

  checkEnemyCollision() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isTopColliding(enemy) && enemy instanceof Chicken && this.character.isAboveGround()) {
        console.log("top collision detected");
        //enemy.playDeathAnimation();
      } else if (!this.character.isJumping && this.character.isColliding(enemy)) {
        this.character.hit();
      }
    });
  }
  

  checkCollectibleCollision() {
    this.level.collectibles.forEach((collectible, index) => {
      if (
        this.character.isColliding(collectible) &&
        collectible instanceof Bottle
      ) {
        this.character.collectBottle();
        this.level.collectibles.splice(index, 1);
        collectible = null;
      }
    });
  }

  checkBottleCollision() {
    this.level.enemies.forEach((enemy, enemyIndex) => {
      this.throwableObjects.forEach((throwable, throwableIndex) => {
        if (enemy.isColliding(throwable) && enemy instanceof Endboss) {
          console.log("Collision");
          throwable.playSplashAnimation();
          if (!throwable.causesDamage && !enemy.isDead) {
            enemy.reduceHealth();
            throwable.causesDamage = true;
            enemy.playHurtAnimation();
            if (enemy.health < 10) {
              enemy.playDeathAnimation();
            }
          }
        }
      });
    });
  }

  checkThrow() {
    if (
      this.keyboard.CTRL &&
      !this.isThrowing &&
      this.character.bottleAmount > 0
    ) {
      this.isThrowing = true;
      let bottle = new ThrowableObject(
        this.character.x + 50,
        this.character.y + 100
      );
      this.throwableObjects.push(bottle);
      this.character.reduceBottles();

      setTimeout(() => {
        this.isThrowing = false;
      }, 1000);
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addStatusBars(this.healthBar);
    this.addStatusBars(this.salsaBar);

    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.collectibles);
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

  addStatusBars(bar) {
    bar.draw(this.ctx);
  }
}
