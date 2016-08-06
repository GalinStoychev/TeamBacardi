var heroProperties = {
            numberOfFrames: 6,
            deltaFrame: 105,
            speed: 10,
            leftStartingFrame_X: 0,
            leftStartingFrame_Y: 0,
            rightStartingFrame_X: 0,
            rightStartingFrame_Y: 105, 
            startingFrame_X: 0,
            startingFrame_Y: 0,
            frameWidth: 60,
            frameHeight: 100,
            image: document.getElementById('donchoImage'),
            x: 310,
            y: 390
        };
function createHero() {

        var hero = new heroSprite({
            context: ctx,
            image: heroProperties.image,
            startingFrame_X: heroProperties.startingFrame_X,
            startingFrame_Y: heroProperties.startingFrame_Y,
            frameWidth: heroProperties.frameWidth,
            frameHeight: heroProperties.frameHeight,
            sprite_X: heroProperties.x,
            sprite_Y: heroProperties.y,
            spriteWidth: heroProperties.frameWidth,
            spriteHeight: heroProperties.frameHeight,
            value : 0

        }, heroProperties);

        return hero;

}