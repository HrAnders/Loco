class BackgroundObject extends MovableObject {
    x = 0;
    height = 200;

    width = document.getElementById('canvas').width;

    constructor(imagePath){
        super().loadImage(imagePath);
    }
}