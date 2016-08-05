(function () {
    'use strict';

    Array.prototype.shuffle = function () {
        var self = this,
            n = self.length,
            i,
            j,
            tmp;

        for (i = n - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1));
            tmp = self[i];
            self[i] = self[j];
            self[j] = tmp;
        }
        return self;
    };

    var canvas = document.getElementById("main"),
        ctx = canvas.getContext('2d'),
        screenWidth = 640,
        screenHeight = 480,
        leftArrow = 37,
        rightArrow = 39;

    

    canvas.width = screenWidth;
    canvas.height = screenHeight;

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
    var fallingObject = {
        numberOfFrames: 12,
        frameWidth: 150,
        frameHeight: 202,
        imageProperties: {
            positive: ['images/zero.png', 'images/1blue.png',
                'images/2blue.png', 'images/3blue.png',
                'images/4blue.png', 'images/5blue.png',
                'images/6blue.png', 'images/7blue.png',
                'images/8blue.png', 'images/9blue.png',
                'images/divide.png', 'images/multiply.png'],
            negative: ['images/zero.png', 'images/1red.png',
                'images/2red.png', 'images/3red.png',
                'images/4red.png', 'images/5red.png',
                'images/6red.png', 'images/7red.png',
                'images/8red.png', 'images/9red.png',
                'images/divide.png', 'images/multiply.png'],
            value: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '/', '*']
        }
    };

    function Sprite(options) {
        var self = this;

        self.context = options.context;
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

        var lastX = self.sprite_X,
            lastY = self.sprite_Y;

        self.render = function () {
            
            //Clear the sprite
            //Useless after adding the background
            // self.context.clearRect(
            //     lastX,
            //     lastY,
            //     self.spriteWidth,
            //     self.spriteHeight);

            lastX = self.sprite_X;
            lastY = self.sprite_Y;
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

        return self;
    }
    function FallingSprite(options) {
        Sprite.call(this, options);
    }
    var loopsCount = 0;
    FallingSprite.prototype = {
        spin: function (speed) {
            loopsCount += 1;
            if (loopsCount >= speed) {
                this.startingFrame_X += fallingObject.frameWidth;
                if (this.startingFrame_X >= fallingObject.frameWidth * fallingObject.numberOfFrames) {
                    this.startingFrame_X = 0;
                }
                loopsCount = 0;
            }
        },

        gravity: function (speed) {
            this.sprite_Y += speed;
        }
    };


    
    var heroImage = new Image(); //replace with img.src;
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
    var oneImage = new Image(); //replace with img.src;
    oneImage.src = 'images/1blue.png';

    var one = new FallingSprite({
        context: ctx,
        image: oneImage,
        startingFrame_X: 0,
        startingFrame_Y: 0,
        frameWidth: 150,
        frameHeight: 202,
        sprite_X: 150,
        sprite_Y: 40,
        spriteWidth: 30,
        spriteHeight: 40
    });

  var img =  document.getElementById('bgrd');
    function Start() {
           ctx.drawImage(
               img,
                0,
                0,
                img.width,
                img.height,
                0,
                0,
                screenWidth,
                screenHeight);

        one.render();
        one.spin(4);
        one.gravity(5);
        hero.render(heroProperties.speed);
        Collision(hero, one);

        if (heroProperties.left) {
            if (hero.sprite_X > 0) {
                hero.sprite_X -= heroProperties.speed;
            }
            hero.startingFrame_X += heroProperties.deltaFrame;
            hero.startingFrame_Y = heroProperties.leftStartingFrame_Y;
            if (hero.startingFrame_X >= heroProperties.deltaFrame * heroProperties.numberOfFrames) {
                hero.startingFrame_X = heroProperties.leftStartingFrame_X;
            }
        }
        if (heroProperties.right) {
            if (hero.sprite_X < (screenWidth - hero.spriteWidth)) {
                hero.sprite_X += heroProperties.speed;
            }
            hero.startingFrame_X += heroProperties.deltaFrame;
            hero.startingFrame_Y = heroProperties.rightStartingFrame_Y;
            if (hero.startingFrame_X >= heroProperties.deltaFrame * heroProperties.numberOfFrames) {
                hero.startingFrame_X = heroProperties.leftStartingFrame_X;
            }
        }

        window.requestAnimationFrame(Start);
    }
    //setInterval(Start, 1000 / 30);

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

    Start();

}
    ());

function Random(range) {

    return Math.floor(Math.random() * range);

}

function Collision(hero, obj) { 
    if (hero.sprite_X < obj.sprite_X + obj.spriteWidth &&
        hero.sprite_X + hero.spriteWidth > obj.sprite_X &&
        hero.sprite_Y < obj.sprite_Y + obj.spriteHeight &&
        hero.spriteHeight + hero.sprite_Y > obj.sprite_Y) {
        obj.remove();
        //implement calculation logic
    }
}

function FloorCollision(floor, obj) {
    if (obj.sprite_Y >= floor.height) {
        obj.remove();
    }
}


