function createNumber(){
  var isPositive= Random() || false,
 imgNum,
 imgSrc,
 imgValue;

 if (isPositive) {
    imgNum = Random(imageProperties.negative.length-1);
    imgSrc = imageProperties.positive[imgNum];
    imgValue = imageProperties.values[imgNum];
 } else {
    imgNum = Random(imageProperties.negative.length-1);
    imgSrc = imageProperties.negative[imgNum];
   if (typeof imageProperties.values[imgNum] === "string") {
     imgValue = imageProperties.values[imgNum];
   } else {
     imgValue = -imageProperties.values[imgNum];
   }
 }

 var image = new Image();
 image.src = imgSrc;
 var spawnX = Random(screenWidth);

var number =  new spriteModule.fallingSprite({
      context: ctx,
      image: image, // random *
      startingFrame_X: 0, // const
      startingFrame_Y: 0, // const
      frameWidth: 150,    // const
      frameHeight: 202,   //const
      sprite_X: spawnX, // random
      sprite_Y: 0,        // const
      spriteWidth: 30,    // const
      spriteHeight: 40,   // const
      deltaX: 1,
      deltaY: 1,
      value: imgValue
  });
  return number;
}
