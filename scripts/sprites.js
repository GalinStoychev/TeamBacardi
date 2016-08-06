
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
function heroSprite(options, heroProperties) {
    Sprite.call(this, options);

    var self = this,
        screenWidth = $('#main').width();
    self.move = function (direction, speed) {

        if (direction.left) {
            if (self.sprite_X > 0) {
                self.sprite_X -= speed;
            }
            self.startingFrame_X += heroProperties.deltaFrame;
            self.startingFrame_Y = heroProperties.leftStartingFrame_Y;
            if (self.startingFrame_X >= heroProperties.deltaFrame * heroProperties.numberOfFrames) {
                self.startingFrame_X = heroProperties.leftStartingFrame_X;
            }
        }
        if (direction.right) {
            if (self.sprite_X < (screenWidth - self.spriteWidth)) {
                self.sprite_X += speed;
            }
            self.startingFrame_X += heroProperties.deltaFrame;
            self.startingFrame_Y = heroProperties.rightStartingFrame_Y;
            if (self.startingFrame_X >= heroProperties.deltaFrame * heroProperties.numberOfFrames) {
                self.startingFrame_X = heroProperties.leftStartingFrame_X;
            }
        }

    };

    return self;
}

function FallingSprite(options) {
    Sprite.call(this, options);

    var self = this,
        loopsCount = 0;
    self.spin = function (speed) {
        loopsCount += 1;
        if (loopsCount >= speed) {
            this.startingFrame_X += fallingObject.frameWidth;
            if (this.startingFrame_X >= fallingObject.frameWidth * fallingObject.numberOfFrames) {
                this.startingFrame_X = 0;
            }
            loopsCount = 0;
        }
    },

        self.gravity = function (speed) {
            this.sprite_Y += speed;
        }
    return self;
}
