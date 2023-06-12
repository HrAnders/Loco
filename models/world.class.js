class World {
  character = new Character();
  enemies = [new Chicken(getRandomPosition()), new Chicken(getRandomPosition()), new Chicken(getRandomPosition())];
  ctx;
  canvas;

  constructor(canvas){
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
  }

  draw(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.height, this.character.width);

    this.enemies.forEach(enemy => {
        this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.height, enemy.width);
    });

    let self = this;
    requestAnimationFrame(function(){
        self.draw();
    })
  }
}

function getRandomPosition(){
    let x = 200+ Math.random() *400;
    return x;
}
