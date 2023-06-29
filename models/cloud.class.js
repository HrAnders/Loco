class Cloud extends MovableObject{
    height = 200;
    width = 400;

    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500;
        this.animate();
        this.y = 50
    }

    animate(){
        this.moveLeft();
    }


}

