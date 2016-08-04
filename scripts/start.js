
function Start() {

        one.render();
        two.render();
        hero.render();

     
        if (heroProperties.left) {
            if (hero.sprite_X > 0) {
                hero.sprite_X -= speed;
            }
            hero.startingFrame_X += deltaFrame;
            hero.startingFrame_Y = heroProperties.leftStartingFrame_Y;
            if (hero.startingFrame_X >= deltaFrame * heroProperties.numberOfFrames) {
                hero.startingFrame_X = heroProperties.leftStartingFrame_X;
            }
        }
        if (heroProperties.right) {
            if (hero.sprite_X < (screenWidth - hero.spriteWidth)) {
                hero.sprite_X += speed;
            }
            hero.startingFrame_X += deltaFrame;
            hero.startingFrame_Y = heroProperties.rightStartingFrame_Y;
            if (hero.startingFrame_X >= deltaFrame * heroProperties.numberOfFrames) {
                hero.startingFrame_X = heroProperties.leftStartingFrame_X;
            }
        }
       
        

        //window.requestAnimationFrame(Start);
    }