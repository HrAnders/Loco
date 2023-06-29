class World {
  character = new Character();
  enemies = level1.enemies;
  clouds = [
    new Cloud()
  ];
  backgroundObjects = [
    new BackgroundObject('img/5_background/layers/air.png ', -719),
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
    new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
    new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

    new BackgroundObject('img/5_background/layers/air.png ', 0),
    new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
    new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

    new BackgroundObject('img/5_background/layers/air.png ', 719),
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
    new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
    new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

    new BackgroundObject('img/5_background/layers/air.png ', 719*2),
    new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*2),
    new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*2),
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*2),

    new BackgroundObject('img/5_background/layers/air.png ', 719*3),
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*3),
    new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*3),
    new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*3),
  ];
  ctx;
  canvas;
  keyboard;
  camera_x = 0;

  constructor(canvas){
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
  }

  setWorld(){
    this.character.world = this;
  }

  draw(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x,0);

    this.addObjectsToMap(this.backgroundObjects);
    this.addObjectsToMap(this.clouds);

    this.addObjectsToMap(this.enemies);
    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x,0);

    //draw() wird immer wieder aufgerufen
    let self = this;
    requestAnimationFrame(function(){
        self.draw();
    })
  }

  addObjectsToMap(objects){  //iterates through all elements in the given array and returns every element to addToMap()
    objects.forEach(obj => {
      this.addToMap(obj);    
    });
  }

  addToMap(movObj){  
    if(movObj.facesOtherDirection){
      this.flipImage(movObj);
    }
    
    //draws the given object
    this.ctx.drawImage(movObj.img, movObj.x, movObj.y, movObj.width, movObj.height);

    if(movObj.facesOtherDirection){
      movObj.x = movObj.x * -1;
      this.ctx.restore();
    }
  }

  flipImage(movObj){
    this.ctx.save();
    this.ctx.translate(movObj.width,0);
    this.ctx.scale(-1,1);
    movObj.x = movObj.x * -1;
  }

}

