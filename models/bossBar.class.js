class BossBar extends StatusBar{


  HEALTHBAR_IMAGES = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  constructor() {
    super().loadImage(this.HEALTHBAR_IMAGES[5]);
    this.loadImages(this.HEALTHBAR_IMAGES);
    this.animateHealthBar();
  }

 
  /**
   * This function is used to render the healthbar of the endboss
   */
  animateHealthBar() {
    setInterval(() => {
      if (this.world.endboss.energy < 100 && this.world.endboss.energy >= 80) {
        this.img = this.imageCache[this.HEALTHBAR_IMAGES[4]];
      }
      else if (this.world.endboss.energy < 80 && this.world.endboss.energy >= 60) {
        this.img = this.imageCache[this.HEALTHBAR_IMAGES[3]];      
      }
      else if (this.world.endboss.energy < 60 && this.world.endboss.energy >= 40) {
        this.img = this.imageCache[this.HEALTHBAR_IMAGES[2]];      
      }
      else if (this.world.endboss.energy < 40 && this.world.endboss.energy >= 20) {
        this.img = this.imageCache[this.HEALTHBAR_IMAGES[1]];      
      }
      else if (this.world.endboss.energy < 20) {
        this.img = this.imageCache[this.HEALTHBAR_IMAGES[0]];      
      }
    }, 200);
    
    
  }
}