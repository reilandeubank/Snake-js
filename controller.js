function snakeController() {
  if (appleX > headX) {
    direction = [1, 0, 0, 0];
  } else if (appleX < headX) {
    direction = [0, 1, 0, 0];
  }
  else if (appleY > headY) {
    direction = [0, 0, 0, 1];
  }
  else if (appleY < headY) {
    direction = [0, 0, 1, 0];
  }
}
