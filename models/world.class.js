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
  backgroundMusic = new Audio("audio/background_music.mp3");

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.updateWorldData();
    this.backgroundMusic.play();
    this.backgroundMusic.loop = true;
  }

  setWorld() {
    //get access to other classes from world class
    this.character.world = this;
    this.healthBar.world = this;
    this.salsaBar.world = this;
    this.level.world = this;
  }

  updateWorldData() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrow();
      this.getCharacterPosition();
    }, 50);
  }

  getCharacterPosition() {
    let charXPos = this.character.x;
    this.checkCharacterBossDist(charXPos);
  }

  checkCharacterBossDist(characterXPos) {
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss && characterXPos > 200) {
        enemy.playWalkAnimation();
        console.log("endboss moving");
      }
    }
  )}

  checkCollisions() {
    this.checkEnemyCollision();

    this.checkCollectibleCollision();

    this.checkBottleCollision();
  }

  checkEnemyCollision() {
    this.level.enemies.forEach((enemy) => {
      if (
        this.character.isColliding(enemy) &&
        this.character.isTopColliding(enemy) &&
        enemy instanceof Chicken
      ) {
        enemy.playDeathAnimation();
      } else if (
        !this.character.isJumping &&
        this.character.isColliding(enemy) &&
        !enemy.isDead
      ) {
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
      if (!this.character.facesOtherDirection) {
        let bottle = new ThrowableObject(
          this.character.x + 50,
          this.character.y + 100,
          this.character.facesOtherDirection
        );
        this.throwableObjects.push(bottle);
      } else {
        let bottle = new ThrowableObject(
          this.character.x + 10,
          this.character.y + 100,
          this.character.facesOtherDirection
        );
        this.throwableObjects.push(bottle);
      }

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
    this.addUIElement(this.healthBar);
    this.addUIElement(this.salsaBar);

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

    //movObj.drawCollisionBoxes(this.ctx);
    //movObj.drawOffsetBoxes(this.ctx);

    if (movObj.facesOtherDirection) {
      movObj.flipImageBack(this.ctx);
    }
  }

  addUIElement(elem) {
    elem.draw(this.ctx);
  }
}
