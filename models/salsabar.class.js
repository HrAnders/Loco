class SalsaBar extends StatusBar {
    health = 0;
    y = 40;
  
    SALSABAR_IMAGES = [
      "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png",
      "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png",
      "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png",
      "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png",
      "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png",
      "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png"

    ];
  
    constructor() {
      super().loadImage(this.SALSABAR_IMAGES[5]);
      this.loadImages(this.SALSABAR_IMAGES);
      this.animateSalsaBar();
    }
  
   
  
    animateSalsaBar() {
      setInterval(() => {
        if (this.world.character.bottleAmount < 100 && this.world.character.bottleAmount >= 80) {
          this.img = this.imageCache[this.SALSABAR_IMAGES[5]];
        }
        else if (this.world.character.bottleAmount < 80 && this.world.character.bottleAmount >= 60) {
          this.img = this.imageCache[this.SALSABAR_IMAGES[4]];      
        }
        else if (this.world.character.bottleAmount < 60 && this.world.character.bottleAmount >= 40) {
          this.img = this.imageCache[this.SALSABAR_IMAGES[3]];      
        }
        else if (this.world.character.bottleAmount < 40 && this.world.character.bottleAmount >= 20) {
          this.img = this.imageCache[this.SALSABAR_IMAGES[2]];      
        }
        else if (this.world.character.bottleAmount < 20 && this.world.character.bottleAmount > 0) {
          this.img = this.imageCache[this.SALSABAR_IMAGES[1]];      
        }
        else{
            this.img = this.imageCache[this.SALSABAR_IMAGES[0]];  
        }
      }, 200);
  
      
    }
  }
  