class World {
  character = new Character();
  healthBar = new Healthbar();
  salsaBar = new SalsaBar();
  bossBar = new BossBar();
  throwableObjects = [];
  level = level1;
  endboss;
  ctx;
  canvas;
  keyboard;
  camera_x = 0;
  backgroundMusic = new Audio("audio/background_music.mp3");
  isMuted = false;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.updateWorldData();
    this.backgroundMusic.volume = 0.2;
    this.backgroundMusic.play();
    this.backgroundMusic.loop = true;
  }

  setWorld() {
    //get access to other classes from world class
    this.character.world = this;
    this.healthBar.world = this;
    this.salsaBar.world = this;
    this.bossBar.world = this;
    this.level.world = this;
    this.getEndbossInstance();
  }

  getEndbossInstance() {
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        this.endboss = enemy;
        this.endboss.world = this;
      }
    });
  }

  updateWorldData() {
    this.updateInterval = setInterval(() => {
      this.checkCollisions();
      this.checkThrow();
      this.checkCharacterBossDist();
      this.endboss.changeBarPosition();
    }, 50);
  }

  getCharacterPosition() {
    let charXPos = this.character.x;
    return charXPos;
  }

  getBossPosition() {
    let bossXPos = 0;
    bossXPos = this.endboss.x;
    return bossXPos;
  }

  getCharacterToBossDist() {
    let charXPos = this.getCharacterPosition();
    let bossXPos = this.getBossPosition();
    let distance = bossXPos - charXPos;
    return Math.abs(distance); // Use the absolute value of the distance
  }

  checkCharacterBossDist() {
    let characterToBossDist = this.getCharacterToBossDist();
    //console.log('Distance to boss:', characterToBossDist); // Check the distance value

    if (!this.endboss.isDead) {
      if (characterToBossDist < 199) {
        console.log("Boss is Aggro!");
        this.endboss.isAggro = true;
      }
    }
  }

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
        this.character.isColliding(this.endboss) &&
        !this.endboss.isDead
      ) {
        this.character.energy = 0;
        this.character.hit();
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
        if (
          enemy.isColliding(throwable) &&
          enemy instanceof Endboss &&
          !enemy.isDead
        ) {
          throwable.playSplashAnimation();
          if (!throwable.causesDamage && !enemy.isDead) {
            enemy.reduceHealth();
            throwable.causesDamage = true;
            if (enemy.energy < 10) {
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
      this.character.bottleAmount > 0 &&
      !this.character.isDead()
    ) {
      this.isThrowing = true;
      this.getNewBottleObject();
      this.character.reduceBottles();

      setTimeout(() => {
        this.isThrowing = false;
      }, 1000);
    }
  }

  checkBtnThrow(){
    if (
      !this.isThrowing &&
      this.character.bottleAmount > 0 &&
      !this.character.isDead()
    ) {
      this.isThrowing = true;
      this.getNewBottleObject();
      this.character.reduceBottles();

      setTimeout(() => {
        this.isThrowing = false;
      }, 1000);
    }
  }

  getNewBottleObject(){
    if (!this.character.facesOtherDirection) {
      let bottle = new ThrowableObject(
        this.character.x + 50,
        this.character.y + 100,
        this.character.facesOtherDirection,
        this.isMuted
      );
      this.throwableObjects.push(bottle);
    } else {
      let bottle = new ThrowableObject(
        this.character.x + 10,
        this.character.y + 100,
        this.character.facesOtherDirection,
        this.isMuted
      );
      this.throwableObjects.push(bottle);
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addUIElement(this.healthBar);
    this.addUIElement(this.salsaBar);
    this.addUIElement(this.bossBar);

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

  cleanup() {
    // Stop the updateWorldData interval
    clearInterval(this.updateInterval);

    // Clear any remaining throwableObjects
    this.throwableObjects = [];

    // Stop the background music and reset it to the beginning
    this.backgroundMusic.pause();
    this.backgroundMusic.currentTime = 0;

    // Remove any event listeners added during the game
    window.removeEventListener("keydown", this.keydownHandler);
    window.removeEventListener("keyup", this.keyupHandler);
  }

}
