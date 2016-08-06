
        var canvas = document.getElementById("main"),
            ctx = canvas.getContext('2d'),
            screenWidth = 640,
            screenHeight = 480,
            leftArrow = 37,
            rightArrow = 39,
            moveLeft = false,
            moveRight = false,
            level = 1,
            count = 0,
            spawnTimes=0;

        canvas.width = screenWidth;
        canvas.height = screenHeight;
