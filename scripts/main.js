$(document).ready(function () {


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
       

        



        var heroImage = new Image(); //replace with img.src;
        heroImage.src = heroProperties.imageLocation;

        var hero = new heroSprite({
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
            
        },heroProperties);
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

        var img = document.getElementById('bgrd');
        var left = false;
        var right = false;
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
             
            if(left){
                hero.move({left:true},10);
            }
            if(right){
                hero.move({right:true},10);
            }
            // if (heroProperties.left) {
            //     if (hero.sprite_X > 0) {
            //         hero.sprite_X -= heroProperties.speed;
            //     }
            //     hero.startingFrame_X += heroProperties.deltaFrame;
            //     hero.startingFrame_Y = heroProperties.leftStartingFrame_Y;
            //     if (hero.startingFrame_X >= heroProperties.deltaFrame * heroProperties.numberOfFrames) {
            //         hero.startingFrame_X = heroProperties.leftStartingFrame_X;
            //     }
            // }
            // if (heroProperties.right) {
            //     if (hero.sprite_X < (screenWidth - hero.spriteWidth)) {
            //         hero.sprite_X += heroProperties.speed;
            //     }
            //     hero.startingFrame_X += heroProperties.deltaFrame;
            //     hero.startingFrame_Y = heroProperties.rightStartingFrame_Y;
            //     if (hero.startingFrame_X >= heroProperties.deltaFrame * heroProperties.numberOfFrames) {
            //         hero.startingFrame_X = heroProperties.leftStartingFrame_X;
            //     }
            // }

            window.requestAnimationFrame(Start);
        }
        //setInterval(Start, 1000 / 30);

        window.addEventListener('keydown', function (el) {

            if (el.which === leftArrow) {
                  left = true;
            }
            else if (el.which === rightArrow) {
                  right = true;
                   
            }

        }, false);

        window.addEventListener('keyup', function (el) {
            if (el.which === leftArrow) {
               left = false;
            }
            else if (el.which === rightArrow) {
                  right = false;
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
});

