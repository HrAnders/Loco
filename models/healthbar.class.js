class Healthbar extends StatusBar {
  health = 100;

  HEALTHBAR_IMAGES = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  constructor() {
    super().loadImage(this.HEALTHBAR_IMAGES[5]);
    this.loadImages(this.HEALTHBAR_IMAGES);
    this.animateHealthBar();
  }

 

  animateHealthBar() {
    setInterval(() => {
      if (this.world.character.energy < 100 && this.world.character.energy >= 80) {
        this.img = this.imageCache[this.HEALTHBAR_IMAGES[4]];
      }
      else if (this.world.character.energy < 80 && this.world.character.energy >= 60) {
        this.img = this.imageCache[this.HEALTHBAR_IMAGES[3]];      
      }
      else if (this.world.character.energy < 60 && this.world.character.energy >= 40) {
        this.img = this.imageCache[this.HEALTHBAR_IMAGES[2]];      
      }
      else if (this.world.character.energy < 40 && this.world.character.energy >= 20) {
        this.img = this.imageCache[this.HEALTHBAR_IMAGES[1]];      
      }
      else if (this.world.character.energy < 20) {
        this.img = this.imageCache[this.HEALTHBAR_IMAGES[0]];      
      }
    }, 200);

    
  }
}
