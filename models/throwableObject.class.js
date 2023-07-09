class ThrowableObject extends MovableObject{

    BOTTLE_ROTATION_IMAGES =[
        "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",

    ];

    BOTTLE_SPLASH_IMAGES =[
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
    ];

    isCollided = false;
    causesDamage = false;
    currentImage = 0;

    constructor(x,y){
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.BOTTLE_ROTATION_IMAGES);
        this.loadImages(this.BOTTLE_SPLASH_IMAGES);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 60;
        this.throw();
        this.animate(this.BOTTLE_ROTATION_IMAGES);
    }

    throw(){
        this.speedY = 30;
        this.applyGravity();

        setInterval(() => {
            this.x += 10
        }, 25);
    }

    animate(images){
        if (!this.isCollided) {
            setInterval(() => {
                this.playAnimation(images);
            }, 200);
        }
    }

    playAnimation(images) {
        let i = this.currentImage % images.length; //modulo-fkt berechnet rest: z.b. 1 / 6 --> ergebnis 0, rest 1
        let path = images[i]; // das i entspricht dem modulo-rest; es kann nicht außerhalb der length liegen
        this.img = this.imageCache[path];
        this.currentImage++;
      }
    
    playSplashAnimation(){
        this.isCollided = true;
        setInterval(() => {
            this.playAnimation(this.BOTTLE_SPLASH_IMAGES);
        }, 200);
    }
}