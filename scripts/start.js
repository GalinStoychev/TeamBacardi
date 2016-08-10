
var canvas = document.getElementById("main"),
    ctx = canvas.getContext('2d'),
    screenWidth = 840,
    screenHeight = 480,
    leftArrow = 37,
    rightArrow = 39,
    moveLeft = false,
    moveRight = false,
    gravitySpeed = 1,
    spawns = 0, 
    spawnTimesPerLevel = 10,
    intervalOfSpawn = 100,
    timePassed = intervalOfSpawn,
    maxGravitySpeed = 5,
    backGroundImage = '',
    fallingNumberProperties = {};

canvas.width = screenWidth;
canvas.height = screenHeight;

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

var donchoProperties = {
    positive: ['images/numbers/zero.png', 'images/numbers/1blue.png',
        'images/numbers/2blue.png', 'images/numbers/3blue.png',
        'images/numbers/4blue.png', 'images/numbers/5blue.png',
        'images/numbers/6blue.png', 'images/numbers/7blue.png',
        'images/numbers/8blue.png', 'images/numbers/9blue.png',
        'images/numbers/divide.png', 'images/numbers/multiply.png',
        'images/numbers/zero.png', 'images/numbers/zero.png',
        'images/numbers/zero.png', 'images/numbers/zero.png',
        'images/numbers/zero.png', 'images/numbers/zero.png'],
    negative: ['images/numbers/zero.png', 'images/numbers/1red.png',
        'images/numbers/2red.png', 'images/numbers/3red.png',
        'images/numbers/4red.png', 'images/numbers/5red.png',
        'images/numbers/6red.png', 'images/numbers/7red.png',
        'images/numbers/8red.png', 'images/numbers/9red.png',
        'images/numbers/divide.png', 'images/numbers/multiply.png',
        'images/numbers/zero.png', 'images/numbers/zero.png',
        'images/numbers/zero.png', 'images/numbers/zero.png',
        'images/numbers/zero.png', 'images/numbers/zero.png'
    ],
    values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '/', '*', 0, 0, 0, 0, 0, 0]
};
var cykiProperties = {
    positive: ['images/numbers/zero.png', 'images/numbers/1blue.png',
        'images/numbers/2blue.png', 'images/numbers/3blue.png',
        'images/numbers/4blue.png', 'images/numbers/5blue.png',
        'images/numbers/6blue.png', 'images/numbers/7blue.png',
        'images/numbers/8blue.png', 'images/numbers/9blue.png',
        'images/numbers/divide.png', 'images/numbers/multiply.png',
        'images/numbers/multiply.png', 'images/numbers/multiply.png',
        'images/numbers/multiply.png', 'images/numbers/multiply.png'
    ],
    negative: ['images/numbers/zero.png', 'images/numbers/1red.png',
        'images/numbers/2red.png', 'images/numbers/3red.png',
        'images/numbers/4red.png', 'images/numbers/5red.png',
        'images/numbers/6red.png', 'images/numbers/7red.png',
        'images/numbers/8red.png', 'images/numbers/9red.png',
        'images/numbers/divide.png', 'images/numbers/multiply.png',
        'images/numbers/multiply.png', 'images/numbers/multiply.png',
        'images/numbers/multiply.png', 'images/numbers/multiply.png'
    ],
    values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '/', '*', '*', '*', '*', '*']
};
var koceProperties = {
    positive: ['images/numbers/zero.png', 'images/numbers/1blue.png',
        'images/numbers/2blue.png', 'images/numbers/3blue.png',
        'images/numbers/4blue.png', 'images/numbers/5blue.png',
        'images/numbers/6blue.png', 'images/numbers/7blue.png',
        'images/numbers/8blue.png', 'images/numbers/9blue.png',
        'images/numbers/multiply.png'
    ],
    negative: ['images/numbers/zero.png', 'images/numbers/1red.png',
        'images/numbers/2red.png', 'images/numbers/3red.png',
        'images/numbers/4red.png', 'images/numbers/5red.png',
        'images/numbers/6red.png', 'images/numbers/7red.png',
        'images/numbers/8red.png', 'images/numbers/9red.png',
        'images/numbers/multiply.png'
    ],
    values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '*']
};

function Start() {

    'use strict';

    $('#gameScreen').show();
    $('#menu').hide();

    var hero = createHero(),
        numbers = [],
        sign,
        maxScore = 0;

    function mainLoop() {

        //draws background
        ctx.drawImage(backGroundImage, 0, 0, backGroundImage.width, backGroundImage.height, 0, 0, screenWidth, screenHeight);

        if (spawns === spawnTimesPerLevel) {
            if (gravitySpeed <= maxGravitySpeed) {
                gravitySpeed++;
            }
            spawns = 1;
        }

        if (timePassed === intervalOfSpawn) {
            numbers.push(createNumber());
            spawns++;
            timePassed = 1;
        }
        timePassed++;
        for (var i = 0; i < numbers.length; i += 1) {
            //draws
            numbers[i].render();
            numbers[i].gravity(gravitySpeed); //to do add falling speed
            numbers[i].spin(3);

            //calculate score
            if (hero.value > maxScore) {
                maxScore = hero.value;
            }
            $('.scoreValue').text(hero.value);
            $('.gravityValue').text(gravitySpeed);
            //game ends
            if (hero.value < 0) {
                $('#gameOver').show();
                $('#maxScore').text(maxScore);
                return;
            }
            //checks for collision
            var hasCollision;
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

        let audio = document.getElementById('walkingAudioMp3');
        if (moveLeft) {
            audio.play();
            hero.move({ left: true }, 5, 10);
        }
        if (moveRight) {
            audio.play();
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