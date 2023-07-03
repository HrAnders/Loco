class MovableObject extends DrawableObject{
  speed = 0.15;
  facesOtherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
  energy = 100;

  lastHit = 0;

  

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
    return this.y < 180;
  }

  drawCollisionBoxes(ctx) {
    if (this instanceof Character || this instanceof Chicken) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  drawOffsetBoxes(ctx) {
    if (this instanceof Character || this instanceof Chicken) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "red";
      ctx.rect(this.x + this.offset.left, this.y + this.offset.bottom, this.width - this.offset.right, this.height-this.offset.bottom);
      ctx.stroke();
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

  // Bsp.: character.isColliding(chicken)
  isColliding (obj) {
    return  (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) && 
            (this.x + this.offset.bottom + this.height) >= obj.y &&
            (this.y + this.offset.bottom) <= (obj.y + obj.height) //&& 
            //obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.

}

  

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length; //modulo-fkt berechnet rest: z.b. 1 / 6 --> ergebnis 0, rest 1
    let path = images[i]; // das i entspricht dem modulo-rest; es kann nicht außerhalb der length liegen
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  hit() {
    this.energy -= 10;
    if (this.energy < 0) {
      this.energy = 0;
    }
    else{
      this.lastHit = new Date().getTime();
    }
  }

  isHurt(){
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 1;
  }

  isDead(){
    return this.energy == 0;
  }
}
