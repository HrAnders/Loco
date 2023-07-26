class CoinBar extends StatusBar {
    coins = 0;
    y = 65;
  
    COINBAR_IMAGES = [
      "img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png",
      "img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png",
      "img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png",
      "img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png",
      "img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png",
      "img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png",
    ];
  
    constructor() {
      super().loadImage(this.COINBAR_IMAGES[0]);
      this.loadImages(this.COINBAR_IMAGES);
      this.animateCoinBar();
    }
  
   
  
    animateCoinBar() {
      setInterval(() => {
        if (this.world.character.coinAmount.toFixed(0) == 1 && this.world.character.coinAmount > 0.9) {
          this.img = this.imageCache[this.COINBAR_IMAGES[5]];      
        }
        else if (this.world.character.coinAmount < world.character.coinsSpawned && this.world.character.coinAmount >= 0.8) {
          this.img = this.imageCache[this.COINBAR_IMAGES[4]];
        }
        else if (this.world.character.coinAmount < 0.8  && this.world.character.coinAmount >= 0.6 ) {
          this.img = this.imageCache[this.COINBAR_IMAGES[3]];      
        }
        else if (this.world.character.coinAmount < 0.6  && this.world.character.coinAmount >= 0.4 ) {
          this.img = this.imageCache[this.COINBAR_IMAGES[2]];      
        }
        else if (this.world.character.coinAmount < 0.4  && this.world.character.coinAmount >= 0.2 ) {
          this.img = this.imageCache[this.COINBAR_IMAGES[1]];      
        }
        
      }, 200);
  
      
    }
  }
  