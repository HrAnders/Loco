class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 180;
  height = 75;
  width = 150;
   offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };
  jumpCollisionBox = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  /**
   * This function loads an single image from the specified path
   * 
   * @param {string} path - The source path of the image
   */
  loadImage(path) {
    this.img = new Image(); // entspricht dem img-tag in html --> this.img = document.getElementById('image) --> <img id="image">
    this.img.src = path;
  }

  /**
   * This function draws an image to the canvas with the specified x/y coordinates and its dimensions
   * 
   * @param {canvas 2d context} ctx - the canvas 2d context
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * This function transforms the images from the paths to image objects
   *
   * @param {Array} arr - array with image paths
   */
  loadImages(arr) {
    //der funktion wird ein array mit img-pfaden übergeben
    arr.forEach((path) => {
      //aus jedem pfad des arrays wird ein image-objekt gemacht, indem die source des neuen img-objekts aus dem arraypfad gespeist wird
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img; //dem imagecache-array wird beim key "path" der value "img" zugefügt --> so stehen alle img-objekte dann im image-cache
    });
  }

  /**
   * This function renders the objects original collision boxes
   * 
   * @param {canvas 2d context} ctx - the canvas context
   */
  drawCollisionBoxes(ctx) {
    if (this instanceof Character || this instanceof Chicken) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

   /**
   * This function renders the objects offset collision boxes
   * 
   * @param {canvas 2d context} ctx - the canvas context
   */
  drawOffsetBoxes(ctx) {
    if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof ThrowableObject || this instanceof CollectibleObject) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "red";
      ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right, this.height-this.offset.bottom);
      ctx.stroke();
    }
  }

   /**
   * This function renders the characters collision box for checking the top collision
   * 
   * @param {canvas 2d context} ctx - the canvas context
   */
  drawJumpCollisionBox(ctx){
    if (this instanceof Character) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "orange";
      ctx.rect(this.x + this.jumpCollisionBox.left, this.y + this.jumpCollisionBox.top, this.width - this.jumpCollisionBox.right, this.height-this.jumpCollisionBox.bottom);
      ctx.stroke();
    }
  }

  /**
   * This function checks if the collision between two objects according to their offset collision boxes
   * 
   * @param {colliding object} obj - the object which collides with the calling object
   * @returns {boolean} true if the objects collide
   */
  isColliding(obj) {
    return (
      (this.x + this.width - this.offset.right) >= obj.x + obj.offset.left &&  // R-L-Abfrage 
      (this.x + this.offset.left) <= (obj.x + obj.width - obj.offset.right) && // L-R-Abfrage
      (this.y + this.offset.top + this.offset.bottom) >= obj.y + obj.offset.top &&  // T-B-Abfrage
      (this.y + this.offset.top) <= (obj.y + obj.height - obj.offset.bottom) // B-T-Abfrage
    );
  }

  /**
   * This function checks if the character collides with another object from above while jumping
   * 
   * @param {colliding object} obj - the object which collides with the character
   * @returns {boolean} true if the object is hit from above
   */
  isTopColliding(obj) {
  return (
    this.isFalling && // Überprüfe, ob der Character sich im Sprung befindet
    this.x + this.jumpCollisionBox.left >= obj.x + obj.offset.left && // Linke Seite der Sprung-Kollisionsbox
    this.x + this.jumpCollisionBox.right <= obj.x + obj.width - obj.offset.right && // Rechte Seite der Sprung-Kollisionsbox
    this.y + this.jumpCollisionBox.top >= obj.y + obj.offset.top  // Obere Seite der Sprung-Kollisionsbox
    //this.y + this.jumpCollisionBox.bottom <= obj.y + obj.height - obj.offset.bottom // Untere Seite der Sprung-Kollisionsbox
  );
}

  /**
   * This function is used to "iterate" through an image array for endless animations
   * 
   * @param {image array} images - Image array
   */
  playAnimation(images) {
    let i = this.currentImage % images.length; 
    let path = images[i]; 
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}
