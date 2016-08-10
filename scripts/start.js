function Start() {

    'use strict';

    $('#gameScreen').show();
    $('#menu').hide();

    var hero = createHero(),
        numbers = [],
        sign;

    function mainLoop() {

        //draws background
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, screenWidth, screenHeight);

        if (spawns === spawnTimesPerLevel) {
            level++;
            spawns = 1;
        }

        if (timePassed === intervalOfSpawn) {
            for (var j = 0; j < level; j += 1) {
                numbers.push(createNumber());
            }
            spawns++;
            timePassed = 1;
        }
        timePassed++;

        var hasCollision;
        for (var i = 0; i < numbers.length; i += 1) {
            //draws
            numbers[i].render();
            numbers[i].gravity(1); //to do add falling speed
            numbers[i].spin(3);

            //calculate score
            $('.scoreValue').text(hero.value);
            //game ends
            if (hero.value < 0) {
                $('#gameOver').show();
                return;
            }
            //checks for collision
            hasCollision = Collision(hero, numbers[i], sign);

            if (hasCollision) {
                sign = numbers[i].value;
                if (typeof sign !== "string") {
                    sign = "+";
                }

                numbers.splice(i, 1);
            }
        }

        hero.render();

        if (moveLeft) {
            hero.move({ left: true }, 5, 10);
        }
        if (moveRight) {
            hero.move({ right: true }, 5, 10);
        }


        window.requestAnimationFrame(mainLoop);
    }

    window.addEventListener('keydown', function(el) {

        if (el.which === leftArrow) {
            moveLeft = true;
        } else if (el.which === rightArrow) {
            moveRight = true;

        }

    }, false);

    window.addEventListener('keyup', function(el) {
        if (el.which === leftArrow) {
            moveLeft = false;
        } else if (el.which === rightArrow) {
            moveRight = false;
        }

    }, false);

    mainLoop();
}

//Start();