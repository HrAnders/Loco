class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 180;
  height = 75;
  width = 150;

  loadImage(path) {
    this.img = new Image(); // entspricht dem img-tag in html --> this.img = document.getElementById('image) --> <img id="image">
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
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
}
