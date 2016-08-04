(function () {
    'use strict';

    var canvas = document.getElementById("main");
    var ctx = canvas.getContext('2d');
    var screenWidth = 640;
    var screenHeight = 480;
    canvas.width = screenWidth;
    canvas.height = screenHeight;
    var speed = 10;
    var deltaFrame = 105;
    var leftArrow = 37;
    var rightArrow = 39;

    var heroProperties = {
        numberOfFrames: 6,
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
        y: 390,
        up: false,
        down: false,
        left: false,
        right: false
    };
    var fallingObject = {
        numberOfFrames: 12,
        startingFrame_X: 0,
        startingFrame_Y: 0,
        frameWidth: 150,
        frameHeight: 202,
        x: 0,
        y: 0,
    };



    function Sprite(options) {
        var self = this;

        self.context = options.context;
        self.width = options.width;
        self.height = options.height;
        self.image = options.image;
        self.startingFrame_X = options.startingFrame_X;
        self.startingFrame_Y = options.startingFrame_Y;
        self.frameWidth = options.frameWidth;
        self.frameHeight = options.frameHeight;
        self.sprite_X = options.sprite_X;
        self.sprite_Y = options.sprite_Y;
        self.spriteWidth = options.spriteWidth;
        self.spriteHeight = options.spriteHeight;



        self.remove = function () {
            self.stop = true;
        };
        self.render = function () {
            //Clear the sprite
            self.context.clearRect(
                self.sprite_X - speed,
                self.sprite_Y,
                self.spriteWidth + speed,
                self.spriteHeight + speed);

            if (self.stop) {
                return;
            }
            //Draw the sprite
            self.context.drawImage(
                self.image,
                self.startingFrame_X,
                self.startingFrame_Y,
                self.frameWidth,
                self.frameHeight,
                self.sprite_X,
                self.sprite_Y,
                self.spriteWidth,
                self.spriteHeight);
        };
        // self.spin = function () {

        // };


        return self;
    }
    function FallingSprite(options) {
        Sprite.call(this, options);
    }
    FallingSprite.prototype = {

        spin: function () {
            this.startingFrame_X += fallingObject.frameWidth;
            if (this.startingFrame_X >= fallingObject.frameWidth * fallingObject.numberOfFrames) {
                this.startingFrame_X = 0;
            }
        },
        gravity: function (speed) {
            this.sprite_Y += speed;
        }
    };



    var heroImage = new Image();
    heroImage.src = heroProperties.imageLocation;

    var hero = new Sprite({
        context: ctx,
        image: heroImage,
        startingFrame_X: heroProperties.startingFrame_X,
        startingFrame_Y: heroProperties.startingFrame_Y,
        frameWidth: heroProperties.frameWidth,
        frameHeight: heroProperties.frameHeight,
        sprite_X: heroProperties.x,
        sprite_Y: heroProperties.y,
        spriteWidth: heroProperties.frameWidth,
        spriteHeight: heroProperties.frameHeight,
    });

    var oneImage1 = new Image();
    oneImage1.src = 'images/1blue.png';

    var one = new FallingSprite({
        context: ctx,
        image: oneImage1,
        startingFrame_X: 0,
        startingFrame_Y: 0,
        frameWidth: 150,
        frameHeight: 202,
        sprite_X: 150,
        sprite_Y: 40,
        spriteWidth: 30,
        spriteHeight: 40
    });
    var one2 = new FallingSprite({
        context: ctx,
        image: oneImage1,
        startingFrame_X: 0,
        startingFrame_Y: 0,
        frameWidth: 150,
        frameHeight: 202,
        sprite_X: 150,
        sprite_Y: 75,
        spriteWidth: 30,
        spriteHeight: 40
    });


    function Start() {
        one.render();
        one.spin();
        one.gravity(1);
        one2.render();
        one2.spin();
        one2.gravity(1);
        hero.render();

        if (heroProperties.left) {
            if (hero.sprite_X > 0) {
                hero.sprite_X -= speed;
            }
            hero.startingFrame_X += deltaFrame;
            hero.startingFrame_Y = heroProperties.leftStartingFrame_Y;
            if (hero.startingFrame_X >= deltaFrame * heroProperties.numberOfFrames) {
                hero.startingFrame_X = heroProperties.leftStartingFrame_X;
            }
        }
        if (heroProperties.right) {
            if (hero.sprite_X < (screenWidth - hero.spriteWidth)) {
                hero.sprite_X += speed;
            }
            hero.startingFrame_X += deltaFrame;
            hero.startingFrame_Y = heroProperties.rightStartingFrame_Y;
            if (hero.startingFrame_X >= deltaFrame * heroProperties.numberOfFrames) {
                hero.startingFrame_X = heroProperties.leftStartingFrame_X;
            }
        }

        //window.requestAnimationFrame(Start);
    }
    setInterval(Start, 1000 / 60);

    window.addEventListener('keydown', function (el) {

        if (el.which === leftArrow) {
            heroProperties.left = true;
        }
        else if (el.which === rightArrow) {
            heroProperties.right = true;
        }

    }, false);

    window.addEventListener('keyup', function (el) {
        if (el.which === leftArrow) {
            heroProperties.left = false;
        }
        else if (el.which === rightArrow) {
            heroProperties.right = false;
        }

    }, false);

    //mainLoop();

}
    ());

var Random = function (range) {
    return Math.floor(Math.random() * range);
};