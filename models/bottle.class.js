class Bottle extends CollectibleObject{
    
    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png'
    ]

    collectSound = new Audio('audio/bottle.mp3');


    constructor(){
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = 200 + Math.random()*800;
        this.y = 330;
    }
}