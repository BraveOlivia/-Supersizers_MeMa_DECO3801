const images = {
  character0: require("../assets/avatar/character0.png"),
  character1: require("../assets/avatar/character1.png"),
  character2: require("../assets/avatar/character2.png"),
  character3: require("../assets/avatar/character3.png"),
  background1: require("../assets/BackgroundBlack.png"),
  background2: require("../assets/BackgroundBlue.png"),
  background3: require("../assets/BackgroundGray.png"),
  background4: require("../assets/BackgroundGreen.png"),
  background5: require("../assets/BackgroundOrange.png"),
  background6: require("../assets/BackgroundPink.png"),
  background7: require("../assets/BackgroundYellow.png"),
};

function getBackgroundImage(color) {
  if (color == 1) {
    return images.background1;
  } else if (color == 2) {
    return images.background2;
  } else if (color == 3) {
    return images.background3;
  } else if (color == 4) {
    return images.background4;
  } else if (color == 5) {
    return images.background5;
  } else if (color == 6) {
    return images.background6;
  } else {
    return images.background7;
  }
};

export { images, getBackgroundImage };
