class CollectibleObject extends DrawableObject {
    height = 100;
    width = 100;
    collectSound = new Audio();
    isCollected = false;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      };

    constructor(){
        super();
        
    }

    /**
     * This function plays the collect sound of an collectable object if its not already collected
     */
    playCollectSound(){
        if(!this.isCollected){
            this.collectSound.play();
            this.isCollected = true;
        }
        else{
            this.collectSound.pause();
        }
    }
}