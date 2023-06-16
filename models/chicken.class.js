class Chicken extends MovableObject{
    width = 75;
    height = 60;
    y = 370;

    
    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 200 + Math.random()*400;
        this.animate();
        
    }

    animate(){
        setInterval(()=>{
            this.x-=1;
            this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/2_w.png');
        },1000/60);

        setInterval(()=>{
            this.x-=1;
            this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/3_w.png');
        },1000/60);

    }


}