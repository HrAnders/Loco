class Character extends MovableObject {
  width = 100;
  height = 250;

  IMAGES_WALKING = [
    "../img/2_character_pepe/2_walk/W-21.png",
    "../img/2_character_pepe/2_walk/W-22.png",
    "../img/2_character_pepe/2_walk/W-23.png",
    "../img/2_character_pepe/2_walk/W-24.png",
    "../img/2_character_pepe/2_walk/W-25.png",
    "../img/2_character_pepe/2_walk/W-26.png",
  ];

  world;

  currentImage = 0;

  constructor() {
    super().loadImage("../img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
  }

  jump() {}

  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT) {
        let i = this.currentImage % this.IMAGES_WALKING.length; //modulo-fkt berechnet rest: z.b. 1 / 6 --> ergebnis 0, rest 1
        let path = this.IMAGES_WALKING[i]; // das i entspricht dem modulo-rest; es kann nicht außerhalb der length liegen
        this.img = this.imageCache[path];
        this.currentImage++;
      }
    }, 100);
  }
}
