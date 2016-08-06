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
    self.value = options.value;

    self.remove = function () {
        self.stop = true;
    };


    self.render = function () {

        //Clear the sprite
        //Useless after adding the background
        // self.context.clearRect(
        //     sprite_X,
        //     sprite_Y,
        //     self.spriteWidth,
        //     self.spriteHeight);

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


function heroSprite(options, heroProperties) {
    Sprite.call(this, options);

    var self = this;
    
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
            this.startingFrame_X += 150;
            if (this.startingFrame_X >= 150 * 12) {
                this.startingFrame_X = 0;
            }
            loopsCount = 0;
        }
    },
    self.gravity = function (speed) {
            this.sprite_Y += speed;
            //to do - bouncing numbers
    };
    return self;
}
