class Chicken extends MovableObject{
    width = 75;
    height = 60;
    y = 370;
    offset = {
        top: 50,
        left: 0,
        right: 0,
        bottom: 0
      }

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',  
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',  
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',  
    ];

    currentImage = 0;
    speed = Math.random()*((0.3 - 0.05) +0.05);


    
    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 200 + Math.random()*400;
        this.loadImages(this.IMAGES_WALKING)

        this.animate();
        
    }

    animate(){
        setInterval(() => {
            this.moveLeft();
        }, 1000/60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }


}