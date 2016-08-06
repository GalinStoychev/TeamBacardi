    function Collision(hero, obj) {
        if (hero.sprite_X < obj.sprite_X + obj.spriteWidth &&
            hero.sprite_X + hero.spriteWidth > obj.sprite_X &&
            hero.sprite_Y < obj.sprite_Y + obj.spriteHeight &&
            hero.spriteHeight + hero.sprite_Y > obj.sprite_Y) {
            obj.remove();
            //implement calculation logic
            return true;
        }
        
        return false;
    }

    function FloorCollision(floor, obj) {
        if (obj.sprite_Y >= floor.height) {
            obj.remove();
        }
    }