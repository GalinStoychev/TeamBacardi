function Start() {

    'use strict';

     $('#gameScreen').show();
     $('#menu').hide();

    var hero = createHero(),
     numbers=[],
     sign;

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

        if (spawns===spawnTimesPerLevel) {
            level++;
            spawns=0;
          }

        if (timePassed===intervalOfSpawn) {
            for (var i = 0; i < level; i+=1) {
              numbers.push(createNumber());
            }
            spawns++;
            timePassed=0;
          }
          timePassed++;

        var hasCollision;
        for (var i = 0; i < numbers.length; i+=1) {
          //draws
          numbers[i].render();
          numbers[i].gravity(5);
          numbers[i].spin(3);
          if (typeof sign !== "string") {
            sign="+";
          }

          if (hero.value<0) {
            return;
          }
          //checks for collision
          hasCollision= Collision(hero, numbers[i],sign);
          if (hasCollision) {
            sign=numbers[i].value;
            numbers.splice(i,1);
          }
        }

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
