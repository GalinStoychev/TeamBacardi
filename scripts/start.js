function Start() {

    'use strict';

     $('#gameScreen').show();
     $('#menu').hide();

    var hero = createHero();


    var oneImage = new Image(); //replace with img.src;
    oneImage.src = 'images/numbers/1blue.png';

    var numbers=[];

    // var num = new FallingSprite({
    //     context: ctx,
    //     image: oneImage, // random *
    //     startingFrame_X: 0, // const
    //     startingFrame_Y: 0, // const
    //     frameWidth: 150,    // const
    //     frameHeight: 202,   //const
    //     sprite_X: 150, // random
    //     sprite_Y: 0,        // const
    //     spriteWidth: 30,    // const
    //     spriteHeight: 40,   // const
    //     value: 0, //random *
    //     deltaX: 1,
    //     deltaY: 1
    // });

    function mainLoop() {

      //draws background
        ctx.drawImage(img,
            0,
            0,
            img.width,
            img.height,
            0,
            0,
            screenWidth,
            screenHeight);
  numbers.push(createNumber());

    // var one = createNumber();

        for (var i = 0; i < numbers.length; i+=1) {
          numbers[i].render();
          numbers[i].gravity(5);
          numbers[i].spin(3);


          Collision(hero, numbers[i]);
        }

        //


      //  Collision(hero, one);


         hero.render(5);
        if (moveLeft) {
            hero.move({ left: true }, 10);
        }
        if (moveRight) {
            hero.move({ right: true }, 10);
        }

        window.requestAnimationFrame(mainLoop);
    }

    window.addEventListener('keydown', function (el) {

        if (el.which === leftArrow) {
            moveLeft = true;
        }
        else if (el.which === rightArrow) {
            moveRight = true;

        }

    }, false);

    window.addEventListener('keyup', function (el) {
        if (el.which === leftArrow) {
            moveLeft = false;
        }
        else if (el.which === rightArrow) {
            moveRight = false;
        }

    }, false);

    mainLoop();
}

//Start();
