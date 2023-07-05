class Level {
    enemies;
    clouds;
    backgroundObjects;
    collectibles;
    level_end_x = 2200;

    constructor(enemies, clouds, backgroundObjects, collectibles){  //dem constructor werden die arrays übergeben. mit den übergebenen arrays werden die internen variablen gefüllt
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectibles = collectibles;
    }
}