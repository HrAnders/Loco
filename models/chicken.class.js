class Chicken extends MovableObject{
    width = 75;
    height = 60;
    y = 370;
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
            let i = this.currentImage % this.IMAGES_WALKING.length; //modulo-fkt berechnet rest: z.b. 1 / 6 --> ergebnis 0, rest 1
            let path = this.IMAGES_WALKING[i]; // das i entspricht dem modulo-rest; es kann nicht außerhalb der length liegen
            this.img = this.imageCache[path];
            this.currentImage ++; 
        }, 200);
        this.moveLeft();
    }


}