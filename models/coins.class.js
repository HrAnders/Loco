class Coin extends CollectibleObject{
    height = 150;
    width = 150;
    offset = {
        top: 50,
        left: 50,
        right: 100,
        bottom: 100,
      };

    IMAGES_COINS = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ]

    collectSound = new Audio('audio/coin.mp3');


    constructor(){
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COINS);
        this.x = Math.random()*800;
        this.y = 100 + Math.random()*100;
        this.collectSound.volume = 0.1;
        this.animate();
    }

    /**
     * This function renders the coin animation
     */
    animate(){
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 250);
    }


}