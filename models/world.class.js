class World {
  character = new Character();
  enemies = [
    new Chicken(), 
    new Chicken(), 
    new Chicken()
  ];
  clouds = [
    new Cloud()
  ];
  backgroundObjects = [
    new BackgroundObject('img/5_background/layers/air.png ', 0),
    new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
    new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0)
  ]
  ctx;
  canvas;

  constructor(canvas){
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
  }

  draw(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.addObjectsToMap(this.backgroundObjects);
    this.addObjectsToMap(this.clouds);

    this.addObjectsToMap(this.enemies);
    this.addToMap(this.character);


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

  addToMap(movObj){  //draws the given object
    this.ctx.drawImage(movObj.img, movObj.x, movObj.y, movObj.width, movObj.height);
  }

}

