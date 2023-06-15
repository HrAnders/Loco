class Cloud extends MovableObject{
    height = 200;
    width = 400;

    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random()*400;
        this.y = 50
    }

}

