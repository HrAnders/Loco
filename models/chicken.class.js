class Chicken extends MovableObject{
    x;


    constructor(x){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = x;
    }
}