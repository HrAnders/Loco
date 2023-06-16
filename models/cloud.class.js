class Cloud extends MovableObject{
    height = 200;
    width = 400;
    ctx = canvas.getContext("2d");
    

    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500;
        this.animate();
        this.y = 50
    }

    animate(){
        setInterval(()=>{
        this.x -= 0.2;
        },1000/60) //entspricht 60fps
    }

}

