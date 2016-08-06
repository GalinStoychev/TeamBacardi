function createHero(){
    'use strict';
   var canvas = document.getElementById("main"),
        ctx = canvas.getContext('2d');

var heroProperties = {
        numberOfFrames: 6,
        deltaFrame: 105,
        speed: 10,
        leftStartingFrame_X: 0,
        leftStartingFrame_Y: 0,
        rightStartingFrame_X: 0,
        rightStartingFrame_Y: 110,
        startingFrame_X: 0,
        startingFrame_Y: 0,
        frameWidth: 60,
        frameHeight: 100,
        imageLocation: 'images/hero.png',
        x: 310,
        y: 270,
        up: false,
        down: false,
        left: false,
        right: false
    };

    var hero = createSprite({
        context: ctx,
        image: document.getElementById('hero'),
        startingFrame_X: heroProperties.startingFrame_X,
        startingFrame_Y: heroProperties.startingFrame_Y,
        frameWidth: heroProperties.frameWidth,
        frameHeight: heroProperties.frameHeight,
        sprite_X: heroProperties.x,
        sprite_Y: heroProperties.y,
        spriteWidth: heroProperties.frameWidth,
        spriteHeight: heroProperties.frameHeight,
    });
return {
    sprite : hero
};

}