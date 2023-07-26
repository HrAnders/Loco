class MovableObject extends DrawableObject {
  speed = 0.15;
  facesOtherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  isJumping = false;
  energy = 100;
  lastHit = 0;
  hurtSound = new Audio();
 
  /**
   * This function simulates gravity for jumping functionality by changing the y-value by time
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * This function returns the speed of the jumping process
   * 
   * @returns {int} - the y "speed" of the jumping object
   */
  jump() {
    return (this.speedY = 30);
  }

  /**
   * This function checks if the calling object is above the ground
   * 
   * @returns {boolean} - true if the object is a throwable object or if the objects y-value is smaller than 180
   */
  isAboveGround() {
    if (this instanceof ThrowableObject){
      return true;
    } else {
    return this.y < 180;
  }

  }

  /**
   * This function flips the images of the calling object
   * 
   * @param {canvas 2d context} ctx - the canvas context
   */
  flipImage(ctx) {
    ctx.save();
    ctx.translate(this.width, 0);
    ctx.scale(-1, 1);
    this.x = this.x * -1;
  }

  /**
   * This function flips the images of the calling object back
   * 
   * @param {canvas 2d context} ctx - the canvas context
   */
  flipImageBack(ctx) {
    this.x = this.x * -1;
    ctx.restore();
  }

  /**
   * This function moves the calling object to the right by its speed value
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * This function moves the calling object to the left by its speed value
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * This function reduces the energy of the calling object and declares the lastHit-value
   */
  hit() {
    if (this.energy < 0) {
      this.energy = 0;
      this.playHurtSound();
    } else {
      if (!this.isHurt()) {
        this.energy -= 20;
        this.playHurtSound();
      }
      this.lastHit = new Date().getTime();
    }
  }
  
  /**
   * This function checks if the calling object was hit in the last 2 seconds
   * 
   * @returns {boolean} - true if the passed time is smaller than 2 seconds
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 2;
  }

  /**
   * This function checks if the calling objects health is 0
   * 
   * @returns {boolean} true if the calling objects health is 0
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * This function plays the hurtSound of the calling object
   */
  playHurtSound(){
    this.hurtSound.play();
  }
}
