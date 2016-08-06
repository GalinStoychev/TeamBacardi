    function Collision(hero, obj, sign="+") {
        if (hero.sprite_X < obj.sprite_X + obj.spriteWidth &&
            hero.sprite_X + hero.spriteWidth > obj.sprite_X &&
            hero.sprite_Y < obj.sprite_Y + obj.spriteHeight &&
            hero.spriteHeight + hero.sprite_Y > obj.sprite_Y) {

            if (obj.value===0 && level>1) {
              level--;
            } else if (typeof obj.value !== "string"){
              if (sign==="+") {
                hero.value += obj.value;
              } else if (sign==="%") {
                hero.value /= obj.value;
                console.log(hero.value /= obj.value);
              } else if(sign==="*") {
                  hero.value *= obj.value;
              }
              obj.value="+";
            }

            
            obj.remove();

            return true;
        }

        return false;
    }

    function FloorCollision(floor, obj) {
        if (obj.sprite_Y >= floor.height) {
            obj.remove();
        }
    }
