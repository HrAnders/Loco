class MovableObject{
    x;
    y = 120;
    img;
    height = 75;
    width = 150;

    loadImage(path){
        this.img = new Image(); // entspricht dem img-tag in html --> this.img = document.getElementById('image) --> <img id="image">
        this.img.src = path;
    }

    moveRight(){
        console.log('moving right');
    }

    moveLeft(){

    }
}