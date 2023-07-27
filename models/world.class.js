class World {
  character = new Character();
  healthBar = new Healthbar();
  salsaBar = new SalsaBar();
  bossBar = new BossBar();
  coinBar = new CoinBar();
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
    this.backgroundMusic.volume = 0.05;
    this.backgroundMusic.play();
    this.backgroundMusic.loop = true;
  }

  /**
   * This function grants access to other classes from world class
   */
  setWorld() {
    this.character.world = this;
    this.healthBar.world = this;
    this.salsaBar.world = this;
    this.bossBar.world = this;
    this.coinBar.world = this;
    this.level.world = this;
    this.getEndbossInstance();
    this.getSpawnedCoins();
  }

  /**
   * This function gets the endboss instance
   */
  getEndbossInstance() {
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        this.endboss = enemy;
        this.endboss.world = this;
      }
    });
  }

  /**
   * This function is called to update the world data, i.e. collisions
   */
  updateWorldData() {
    this.updateInterval = setInterval(() => {
      this.checkCollisions();
      this.checkThrow();
      this.checkCharacterBossDist();
      this.endboss.changeBarPosition();
    }, 10);
  }

  /**
   * This function returns the current x position of the character
   *
   * @returns {number} - x value of the character
   */
  getCharacterPosition() {
    let charXPos = this.character.x;
    return charXPos;
  }

  /**
   * This function returns the current x position of the endboss
   *
   * @returns {number} - x value of the endboss
   */
  getBossPosition() {
    let bossXPos = 0;
    bossXPos = this.endboss.x;
    return bossXPos;
  }

  /**
   * This function returns the absolute distance between the endboss and the character
   *
   * @returns {number} - distance on x-axis between the endboss and the character
   */
  getCharacterToBossDist() {
    let charXPos = this.getCharacterPosition();
    let bossXPos = this.getBossPosition();
    let distance = bossXPos - charXPos;
    return Math.abs(distance);
  }

  /**
   * This function checks if the character is close to the endboss
   */
  checkCharacterBossDist() {
    let characterToBossDist = this.getCharacterToBossDist();

    if (!this.endboss.isDead) {
      if (characterToBossDist < 199) {
        this.endboss.isAggro = true;
      }
    }
  }

  /**
   * This function bundles all collision functions
   */
  checkCollisions() {
    this.checkEnemyCollision();

    this.checkCollectibleCollision();

    this.checkBottleCollision();
  }

  /**
   * This function handles the collision between the character and the enemies
   */
  checkEnemyCollision() {
    this.level.enemies.forEach((enemy) => {
      if (this.isHeadJumping(enemy)) {
        this.character.jump();
        enemy.playDeathAnimation();
      } else if (
        this.character.isColliding(this.endboss) &&
        !this.endboss.isDead
      ) {
        this.character.energy = 0;
        this.character.hit();
      } else if (this.isGroundColliding(enemy)) {
        this.character.hit();
      }
    });
  }

  /**
   * This function checks if the character is jumping on the head of a colliding chicken
   *
   * @param {obj} enemy - colliding enemy object
   * @returns {boolean} state - true if the character jumps on the head of a chicken
   */
  isHeadJumping(enemy) {
    return (
      this.character.isTopColliding(enemy) &&
      !enemy.isDead &&
      enemy instanceof Chicken
    );
  }

  /**
   * This function checks if the character collides with a chicken while on ground
   *
   * @param {obj} enemy - colliding enemy object
   * @returns {boolean} state - true if the character collides while on ground
   */
  isGroundColliding(enemy) {
    return (
      !this.character.isJumping &&
      this.character.isColliding(enemy) &&
      !enemy.isDead
    );
  }

  /**
   * This function handles the collision between the character and collectible objects
   */
  checkCollectibleCollision() {
    this.level.collectibles.forEach((collectible, index) => {
      if (this.character.isColliding(collectible)) {
        collectible.playCollectSound();
        if (collectible instanceof Bottle) {
          this.character.collectBottle();
        } else if (collectible instanceof Coin) {
          this.character.collectCoin();
        }
        this.level.collectibles.splice(index, 1);
        collectible = null;
      }
    });
  }

  /**
   * This function sets the total amount of spawned coins
   */
  getSpawnedCoins() {
    this.level.collectibles.forEach((collectible) => {
      if (collectible instanceof Coin) {
        this.character.coinsSpawned += 1;
      }
    });
  }

  /**
   * This function handles the collision between the bottles and the endboss
   */
  checkBottleCollision() {
    this.level.enemies.forEach((enemy, enemyIndex) => {
      this.throwableObjects.forEach((throwable, throwableIndex) => {
        if (this.isEndbossColliding(enemy, throwable)) {
          throwable.playSplashAnimation();
          if (!throwable.causesDamage && !enemy.isDead) {
            this.getEndbossBehaviour(enemy, throwable);
            if (enemy.energy < 10) {
              enemy.playDeathAnimation();
            }
          }
        }
      });
    });
  }

  /**
   * This function checks if the throwed bottle collides with the endboss
   *
   * @param {object} enemy - instance of the enemy
   * @param {object} throwable - instance of the throwable
   * @returns {boolean} -true if the endboss gets hit by a bottle
   */
  isEndbossColliding(enemy, throwable) {
    return (
      enemy.isColliding(throwable) && enemy instanceof Endboss && !enemy.isDead
    );
  }

  /**
   * This function sets the values for the boss behaviour after being hit by a bottle
   *
   * @param {object} enemy - instance of the enemy
   * @param {object} throwable - instance of the throwable
   */
  getEndbossBehaviour(enemy, throwable) {
    enemy.isAggro = true;
    enemy.reduceHealth();
    throwable.causesDamage = true;
  }

  /**
   * This function handles the throwing process
   */
  checkThrow() {
    if (this.isAbleToThrow()) {
      this.isThrowing = true;
      this.getNewBottleObject();
      this.character.reduceBottles();

      setTimeout(() => {
        this.isThrowing = false;
      }, 1000);
    }
  }

  /**
   * This function checks if the character is able to throw
   *
   * @returns {boolean} - true if the character is able to throw
   */
  isAbleToThrow() {
    return (
      this.keyboard.CTRL &&
      !this.isThrowing &&
      this.character.bottleAmount > 0 &&
      !this.character.isDead()
    );
  }

  /**
   * This function handles the throwing process on button press
   */
  checkBtnThrow() {
    if (this.isAbleToBtnThrow()) {
      this.isThrowing = true;
      this.getNewBottleObject();
      this.character.reduceBottles();

      setTimeout(() => {
        this.isThrowing = false;
      }, 1000);
    }
  }

  /**
   * This function checks if the character is able to throw on button press
   *
   * @returns {boolean} - true if the character is able to throw on button press
   */
  isAbleToBtnThrow() {
    return (
      !this.isThrowing &&
      this.character.bottleAmount > 0 &&
      !this.character.isDead()
    );
  }

  /**
   * This function creates an instance of a bottle according to the characters facing direction
   */
  getNewBottleObject() {
    if (!this.character.facesOtherDirection) {
      this.getNewBottleRight();
    } else {
      this.getNewBottleLeft();
    }
  }

  /**
   * This function creates an bottle instance for a right looking character
   */
  getNewBottleRight() {
    let bottle = new ThrowableObject(
      this.character.x + 50,
      this.character.y + 100,
      this.character.facesOtherDirection,
      this.isMuted
    );
    this.throwableObjects.push(bottle);
  }

  /**
   * This function creates an bottle instance for a left looking character
   */
  getNewBottleLeft() {
    let bottle = new ThrowableObject(
      this.character.x + 10,
      this.character.y + 100,
      this.character.facesOtherDirection,
      this.isMuted
    );
    this.throwableObjects.push(bottle);
  }

  /**
   * This function draws the objects on the canvas
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addBackgroundObjectsToMap();
    this.addUIObjectsToMap();
    this.addInteractiveObjectsToMap();
    this.ctx.translate(-this.camera_x, 0);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * This function adds the UI objects to the map
   */
  addUIObjectsToMap() {
    this.addUIElement(this.healthBar);
    this.addUIElement(this.salsaBar);
    this.addUIElement(this.bossBar);
    this.addUIElement(this.coinBar);
  }

  /**
   * This function adds the background objects to the map
   */
  addBackgroundObjectsToMap() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
  }

  /**
   * This function adds the interactive objects to the map
   */
  addInteractiveObjectsToMap() {
    this.addObjectsToMap(this.level.collectibles);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.addToMap(this.character);
  }

  /**
   * This function adds all the objects of an array of objects to the map
   * 
   * @param {object} objects - objects to be added to the map
   */
  addObjectsToMap(objects) {
    objects.forEach((obj) => {
      this.addToMap(obj);
    });
  }

  /**
   * This function adds the single object to the map
   * 
   * @param {object} movObj - movable object to be added to the map
   */
  addToMap(movObj) {
    if (movObj.facesOtherDirection) {
      movObj.flipImage(this.ctx);
    }

    movObj.draw(this.ctx);

    //movObj.drawCollisionBoxes(this.ctx);
    //movObj.drawOffsetBoxes(this.ctx);
    //movObj.drawJumpCollisionBox(this.ctx);

    if (movObj.facesOtherDirection) {
      movObj.flipImageBack(this.ctx);
    }
  }

  /**
   * This function adds an UI object to the map
   * 
   * @param {object} elem - UI object to be added to the map
   */
  addUIElement(elem) {
    elem.draw(this.ctx);
  }
}
