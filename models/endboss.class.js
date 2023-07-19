class Endboss extends MovableObject {
  height = 400;
  width = 300;
  currentImage = 0;
  health = 20;
  isDead = false;
  offset = {
    top: 50,
    left: 0,
    right: 0,
    bottom: 80,
  };
  y = 50;
  speed = 10;

  IMAGES_IDLE = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];
  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_IDLE[0]);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_WALKING);
    this.x = 700;
    this.animate();
  }

  animate() {
    clearInterval(this.animationInterval);
    if (!this.isDead) {
      this.animationInterval = setInterval(() => {
          this.playIdleAnimation();
      }, 200);
    }
  }

  playIdleAnimation() {
    this.playAnimation(this.IMAGES_IDLE);
  }

  playWalkAnimation() {
    this.moveLeft();
    this.playAnimation(this.IMAGES_WALKING);
  }

  playHurtAnimation() {
    this.animate(this.IMAGES_HURT);
  }

  playDeathAnimation() {
    this.loadImage(this.IMAGES_DEAD[2]);
  }

  reduceHealth() {
    if (this.health > 0) {
      this.health -= 10;
      if (this.health <= 0) {
        this.isDead = true;
        this.health = 0;
      }
    }
  }
}
