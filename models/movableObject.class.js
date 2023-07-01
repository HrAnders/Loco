class MovableObject{
    x = 120;
    y = 180;
    img;
    height = 75;
    width = 150;
    imageCache = {};
    speed = 0.15;
    facesOtherDirection = false;
    speedY = 0;
    acceleration = 2.5;

    applyGravity(){
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0){
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
            
            }
        }, 1000/25);
    }

    jump(){
        return this.speedY = 30;
      }

    isAboveGround(){
        return this.y < 180
    }

    loadImage(path){
        this.img = new Image(); // entspricht dem img-tag in html --> this.img = document.getElementById('image) --> <img id="image">
        this.img.src = path;
    }

    /**
     * 
     * @param {Array} arr - array with image paths
     */
    loadImages(arr){  //der funktion wird ein array mit img-pfaden übergeben
        arr.forEach((path) => {     //aus jedem pfad des arrays wird ein image-objekt gemacht, indem die source des neuen img-objekts aus dem arraypfad gespeist wird
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;  //dem imagecache-array wird beim key "path" der value "img" zugefügt --> so stehen alle img-objekte dann im image-cache
        })
    }

    moveRight(){
        this.x += this.speed;
    }

    moveLeft(){
        this.x -= this.speed;
    }

    playAnimation(images){
        let i = this.currentImage % this.IMAGES_WALKING.length; //modulo-fkt berechnet rest: z.b. 1 / 6 --> ergebnis 0, rest 1
        let path = images[i]; // das i entspricht dem modulo-rest; es kann nicht außerhalb der length liegen
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}