class Chicken extends MovableObject {
  width = 75;
  height = 60;
  y = 370;
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };
  jumpThreshold = 20;
  isDead = false;
  deathSound = new Audio("audio/chicken.mp3");


  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  currentImage = 0;
  speed = Math.random() * (5-1) + 1;

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = 350 + Math.random() * 1500;
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
  }

  /**
   * This function renders the walking animation of the chickens
   */
  animate() {
    this.animationInterval = setInterval(() => {
      this.playWalkingAnimation();
    }, 100);
  }

  /**
   * This function moves the chicken to the left and delivers the animation images
   */
  playWalkingAnimation() {
    this.moveLeft();
    this.playAnimation(this.IMAGES_WALKING);
  }

  /**
   * This function renders the death animation of the chicken
   */
  playDeathAnimation() {
    this.deathSound.play();
    this.isDead = true;
    clearInterval(this.animationInterval); // Lösche das aktive Animation-Intervall
    this.loadImage("img/3_enemies_chicken/chicken_normal/2_dead/dead.png");
  }

}
