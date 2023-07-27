class ThrowableObject extends MovableObject {
  BOTTLE_ROTATION_IMAGES = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  BOTTLE_SPLASH_IMAGES = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  isCollided = false;
  causesDamage = false;
  isMuted;
  currentImage = 0;
  breakingSound = new Audio("audio/breakingGlass.mp3");
  startTime = 0;

  constructor(x, y, characterFacesOtherDirection, isMuted) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.BOTTLE_ROTATION_IMAGES);
    this.loadImages(this.BOTTLE_SPLASH_IMAGES);
    this.x = x;
    this.y = y;
    this.height = 80;
    this.width = 60;
    this.isMuted = isMuted;
    this.breakingSound.volume = 0.2;
    this.throw(characterFacesOtherDirection);
    this.animate(this.BOTTLE_ROTATION_IMAGES);
  }

  /**
   * This function sets the gravity values for the throwable object and sets the origin coordinates
   * 
   * @param {boolean} characterFacesOtherDirection - true if the character looks to the left
   */
  throw(characterFacesOtherDirection) {
    this.speedY = 30;
    this.applyGravity();

    setInterval(() => {
      if (!characterFacesOtherDirection) {
        this.x += 10;
      } else {
        this.x -= 10;
      }
    }, 25);
  }

  /**
   * This function renders the rotation animation
   * 
   * @param {image array} images - array of images
   */
  animate(images) {
    if (!this.isCollided) {
      setInterval(() => {
        this.playAnimation(images);
      }, 200);
    }
  }

  /**
   * This function is used to "iterate" through an image array for endless animations
   * 
   * @param {image array} images - Image array
   */
  playAnimation(images) {
    let i = this.currentImage % images.length; //modulo-fkt berechnet rest: z.b. 1 / 6 --> ergebnis 0, rest 1
    let path = images[i]; // das i entspricht dem modulo-rest; es kann nicht außerhalb der length liegen
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * This function is used to render the splash animation
   */
  playSplashAnimation() {
    if (!this.isMuted) {
      this.breakingSound.play();
    }
    this.isCollided = true;
    setInterval(() => {
      this.playAnimation(this.BOTTLE_SPLASH_IMAGES);
    }, 200);
  }
}
