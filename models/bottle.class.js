class Bottle extends CollectibleObject{
    height = 100;
    width = 100; 

    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png'
    ]


    constructor(){
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = 200 + Math.random()*800;
        this.y = 100 + Math.random()*150;
    }
}