class CollectibleObject extends DrawableObject {
    height = 100;
    width = 100;
    collectSound = new Audio();
    isCollected = false;

    constructor(){
        super();
    }

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