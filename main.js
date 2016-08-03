(function () {
    'use strict';

    var canvas = document.getElementById("main");
    var ctx = canvas.getContext('2d');
    var screenWidth = 640;
    var screenHeight = 480;
    canvas.width = screenWidth;
    canvas.height = screenHeight;

    var deltaX = 10;
    var deltaFrame = 105;
    var leftArrow = 37;
    var rightArrow = 39;
    var numberOfFrames = 6;

    var heroProperties = {
        leftStartingFrame_X: 0,
        leftStartingFrame_Y: 0,
        rightStartingFrame_X: 0,
        rightStartingFrame_Y: 105,
        startingFrame_X: 210,
        startingFrame_Y: 105,
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

    function Sprite(options) {
        var _this = this;

        _this.context = options.context;
        _this.width = options.width;
        _this.height = options.height;
        _this.image = options.image;
        _this.startingFrame_X = options.startingFrame_X;
        _this.startingFrame_Y = options.startingFrame_Y;
        _this.frameWidth = options.frameWidth;
        _this.frameHeight = options.frameHeight;
        _this.sprite_X = options.sprite_X;
        _this.sprite_Y = options.sprite_Y;
        _this.spriteWidth = options.spriteWidth;
        _this.spriteHeight = options.spriteHeight;

        _this.render = function () {
            _this.context.drawImage(
                _this.image,
                _this.startingFrame_X,
                _this.startingFrame_Y,
                _this.frameWidth,
                _this.frameHeight,
                _this.sprite_X,
                _this.sprite_Y,
                _this.spriteWidth,
                _this.spriteHeight);
        };
        return _this;
    }
    function FallingObject(options) {
        //context.fillText(text,x,y,maxWidth);
        var _this = this;

        _this.context = options.context;
        _this.text = options.text;
        _this.x = options.x;
        _this.y = options.y;
        _this.maxWidth = options.maxWidth || heroProperties.frameWidth;

        _this.render = function () {
            _this.context.font = "30px Georgia";
            _this.context.fillText(
                _this.text,
                _this.x,
                _this.y,
                _this.maxWidth
            );

        };
        return _this;
    }

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
        spriteHeight: heroProperties.frameHeight
    });

    var fallingNumber = new FallingObject({
        context: ctx,
        text: "AAA",
        x: 20,
        y: 20,

    });
    var fallingNumber2 = new FallingObject({
        context: ctx,
        text: "BBB",
        x: 20,
        y: 20,

    });

    function mainLoop(el) {
        hero.context.clearRect(
            hero.sprite_X,
            hero.sprite_Y,
            hero.image.width,
            hero.image.height);


        if (heroProperties.left) {
            hero.sprite_X -= deltaX;
            hero.startingFrame_X += deltaFrame;
            hero.startingFrame_Y = heroProperties.leftStartingFrame_Y;
            if (hero.startingFrame_X >= deltaFrame * numberOfFrames) {
                hero.startingFrame_X = heroProperties.leftStartingFrame_X;
            }
        }
        if (heroProperties.right) {
            hero.sprite_X += deltaX;
            hero.startingFrame_X += deltaFrame;
            hero.startingFrame_Y = heroProperties.rightStartingFrame_Y;
            if (hero.startingFrame_X >= deltaFrame * numberOfFrames) {
                hero.startingFrame_X = heroProperties.rightStartingFrame_X;
            }
        }


        hero.render();
        window.requestAnimationFrame(mainLoop);
    }
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

    mainLoop();
  
}
    ());