class Character extends MovableObject {
  width = 100;
  height = 250;
  speed = 10;
  y = 80;
  bottleAmount = 0;
  coinAmount = 0;
  coinsSpawned = 0;
  offset = {
    top: 100,
    left: 20,
    right: 30,
    bottom: 110,
  };
  jumpCollisionBox = {
    top: 238,
    left: 35,
    right: 85,
    bottom: 239,
  };
  isHurted = false;
  isGameOver = false;
  isIdle = false;
  isMoving = false;
  animationInterval;

  IMAGES_WALKING = [
    "../img/2_character_pepe/2_walk/W-21.png",
    "../img/2_character_pepe/2_walk/W-22.png",
    "../img/2_character_pepe/2_walk/W-23.png",
    "../img/2_character_pepe/2_walk/W-24.png",
    "../img/2_character_pepe/2_walk/W-25.png",
    "../img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  world;

  currentImage = 0;

  walking_sound = new Audio("audio/walking.mp3");
  hurtSound = new Audio("audio/ouch.mp3");
  gameOverSound = new Audio("audio/fail_sound.mp3");

  idleTimeout = null;
  isIdleTimeoutStarted = false;

  constructor() {
    super().loadImage("../img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.animate();
    this.applyGravity();
    this.checkJumpState();
    this.startIdleTimer();
  }

  animate() {
    this.walking_sound.pause();

    setInterval(() => {
      this.isMoving = false;
      if (
        this.world.keyboard.RIGHT &&
        this.x < this.world.level.level_end_x &&
        !this.isDead() &&
        !this.isGameOver
      ) {
        this.moveRight();
        this.facesOtherDirection = false;
        this.walking_sound.play();
        this.isMoving = true;
      }

      if (
        this.world.keyboard.LEFT &&
        this.x > 0 &&
        !this.isDead() &&
        !this.isGameOver
      ) {
        this.moveLeft();
        this.facesOtherDirection = true;
        this.walking_sound.play();
        this.isMoving = true;
      }

      if (
        this.world.keyboard.SPACE &&
        !this.isAboveGround() &&
        !this.isDead()
      ) {
        this.jump();
        this.isMoving = true;
      }

      if (!this.isMoving) {
        this.startIdleTimer();
      } else {
        this.stopIdleTimer(); 
        this.longsleep = false;
      }

      this.changeCameraPosition();
    }, 1000 / 30);

    let animationInterval = setInterval(() => {
      if (this.isDead()) {
        clearInterval(animationInterval);
        this.playAnimation(this.IMAGES_DEAD);
        this.speed = 0;
        this.world.endboss.showEndScreen();
        clearInterval(animationInterval);
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      }else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } 
      else {
        if (this.world.keyboard.RIGHT && !this.isGameOver || this.world.keyboard.LEFT && !this.isGameOver) {
          //walk animation
          this.playAnimation(this.IMAGES_WALKING);
        } else if(this.isIdle){
          this.playAnimation(this.IMAGES_IDLE);
        }
        else {
          this.loadImage("../img/2_character_pepe/1_idle/idle/I-1.png");
        }
      }
    }, 125);
  }

  changeCameraPosition() {
    this.world.camera_x = -this.x + 100;
    this.world.healthBar.x = this.x - 60;
    this.world.salsaBar.x = this.x - 60;
    this.world.coinBar.x = this.x - 60;
  }

  collectBottle() {
    this.bottleAmount += 10;
  }

  collectCoin() {
    this.coinAmount += 1 / this.coinsSpawned;
  }

  reduceBottles() {
    if (this.bottleAmount > 0) {
      this.bottleAmount -= 10;
    } else {
      this.bottleAmount = 0;
    }
  }

  checkJumpState() {
    setInterval(() => {
      if (this.y >= 180) {
        this.isJumping = false;
      } else {
        this.isJumping = true;
      }
    }, 100);
  }

  startIdleTimer() {
    if (!this.isIdleTimeoutStarted) {
      this.idleTimeout = setTimeout(() => {
        this.isIdle = true;
      }, 1500);
      this.isIdleTimeoutStarted = true;
      //console.log("Timeout wurde gestartet.");
    } else {
      //console.log("Timeout wurde bereits gestartet.");
    }
  }

  stopIdleTimer() {
    if (this.idleTimeout) {
      clearTimeout(this.idleTimeout);
      this.idleTimeout = null;
      this.isIdleTimeoutStarted = false;
      //console.log("Timeout wurde gestoppt.");
    }
  }


}
