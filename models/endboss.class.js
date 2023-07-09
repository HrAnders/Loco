class Endboss extends MovableObject {
  height = 400;
  width = 300;
  currentImage = 0;
  health = 20;
  isDead = false;

  y = 50;

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

  constructor() {
    super().loadImage(this.IMAGES_IDLE[0]);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 700;
    this.animate(this.IMAGES_IDLE);
  }

  animate(images) {
    console.log(images);

    if (!this.isDead) {
        setInterval(() => {
          this.playAnimation(images);
        }, 200);
    }
  }

  playHurtAnimation() {
    this.animate(this.IMAGES_HURT);
  }

  playDeathAnimation() {
    this.loadImage(this.IMAGES_DEAD[2])
  }

  reduceHealth() {
    if (this.health > 0) {
      this.health -= 10;
    } else {
      this.isDead = true;
      this.health = 0;
    }
  }
}
