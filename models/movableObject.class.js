class MovableObject extends DrawableObject {
  speed = 0.15;
  facesOtherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  isJumping = false;
  energy = 100;
  lastHit = 0;

  hurtSound = new Audio();

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  jump() {
    return (this.speedY = 30);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject){
      return true;
    } else {
    return this.y < 180;
  }

  }

  flipImage(ctx) {
    ctx.save();
    ctx.translate(this.width, 0);
    ctx.scale(-1, 1);
    this.x = this.x * -1;
  }

  flipImageBack(ctx) {
    this.x = this.x * -1;
    ctx.restore();
  }

  

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

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

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 2;
  }

  isDead() {
    return this.energy == 0;
  }

  playHurtSound(){
    this.hurtSound.play();
  }
}
