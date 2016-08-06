
        var canvas = document.getElementById("main"),
            ctx = canvas.getContext('2d'),
            screenWidth = 640,
            screenHeight = 480,
            leftArrow = 37,
            rightArrow = 39,
            moveLeft = false,
            moveRight = false,
            level = 1,
            spawns = 0,
            spawnTimesPerLevel=10,
            intervalOfSpawn=100,
            timePassed=0;


        canvas.width = screenWidth;
        canvas.height = screenHeight;
