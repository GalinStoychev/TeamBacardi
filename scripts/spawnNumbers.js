function createNumber() {

  // var imageProperties = {
  //          positive: ['images/numbers/zero.png', 'images/numbers/1blue.png',
  //              'images/numbers/2blue.png', 'images/numbers/3blue.png',
  //              'images/numbers/4blue.png', 'images/numbers/5blue.png',
  //              'images/numbers/6blue.png', 'images/numbers/7blue.png',
  //              'images/numbers/8blue.png', 'images/numbers/9blue.png',
  //              'images/numbers/divide.png', 'images/numbers/multiply.png'],
  //          negative: ['images/numbers/zero.png', 'images/numbers/1red.png',
  //              'images/numbers/2red.png', 'images/numbers/3red.png',
  //              'images/numbers/4red.png', 'images/numbers/5red.png',
  //              'images/numbers/6red.png', 'images/numbers/7red.png',
  //              'images/numbers/8red.png', 'images/numbers/9red.png',
  //              'images/numbers/divide.png', 'images/numbers/multiply.png'],
  //          values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '/', '*']
  //  };

  var isPositive = Random() || false,
    imgNum,
    imgSrc,
    imgValue;

  if (isPositive) {
    imgNum = Random(fallingNumberProperties.positive.length - 1);
    imgSrc = fallingNumberProperties.positive[imgNum];
    imgValue = fallingNumberProperties.values[imgNum];
  } else {
    imgNum = Random(fallingNumberProperties.negative.length - 1);
    imgSrc = fallingNumberProperties.negative[imgNum];
    if (typeof fallingNumberProperties.values[imgNum] === "string") {
      imgValue = fallingNumberProperties.values[imgNum];
    } else {
      imgValue = -fallingNumberProperties.values[imgNum];
    }
  }

  var image = new Image();
  image.src = imgSrc;
  var spawnX = Random(screenWidth);

  var number = new spriteModule.fallingSprite({
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
