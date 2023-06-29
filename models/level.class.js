class Level {
    enemies;
    clouds;
    backgroundObjects;

    constructor(enemies, clouds, backgroundObjects){  //dem constructor werden die arrays übergeben. mit den übergebenen arrays werden die internen variablen gefüllt
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}