class BackgroundObject extends MovableObject {
    canvas = document.getElementById('canvas');
    height = this.canvas.height;
    width = this.canvas.width;

    constructor(imagePath, x){
        super().loadImage(imagePath);
        console.log(this.canvas)
        this.x = x;
        this.y = this.canvas.height - this.height;
    }
}