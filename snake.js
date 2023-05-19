var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var squareSize = 32;

var sideLength = canvas.width / squareSize;
var startPos = Math.floor(sideLength / 2) * squareSize;
var headX = startPos;
var headY = startPos;
var snakeSquares = [
  [startPos, startPos + squareSize],
  [startPos, startPos],
];
snakeLen = 2;
var started = false;

var count = 0;

var directions = ["right", "left", "up", "down"];
var direction = [0, 0, 0, 0];
var keyPressed = "none";

var animationFrameId = null; // Store the animation frame ID

appleX = Math.floor(Math.random() * (canvas.width / squareSize)) * squareSize;
appleY = Math.floor(Math.random() * (canvas.height / squareSize)) * squareSize;

function restart() {
  console.log("restarting");
  started = false;
  cancelAnimationFrame(animationFrameId); // Stop the previous animation frame
  count = 0;
  headX = startPos;
  headY = startPos;
  snakeSquares = [
    [startPos, startPos + squareSize],
    [startPos, startPos],
  ];
  snakeLen = 2;
  direction = [0, 0, 0, 0];
  keyPressed = "none";
  appleX = Math.floor(Math.random() * (canvas.width / squareSize)) * squareSize;
  appleY = Math.floor(Math.random() * (canvas.height / squareSize)) * squareSize;
  draw(); // Start a new animation frame
}

document.addEventListener("keydown", keyDownHandler, false);

function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    keyPressed = directions[0];
    if (!direction[1]) {
      direction = [1, 0, 0, 0];
    }
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    keyPressed = directions[1];
    if (!direction[0]) {
      direction = [0, 1, 0, 0];
    }
  } else if (e.key == "Up" || e.key == "ArrowUp") {
    keyPressed = directions[2];
    if (!direction[3]) {
      direction = [0, 0, 1, 0];
    }
  } else if (e.key == "Down" || e.key == "ArrowDown") {
    keyPressed = directions[3];
    if (!direction[2]) {
      direction = [0, 0, 0, 1];
    }
  }
  if (e.code == "KeyR") {
    restart();
  }
  else {
  started = true;
  }
}

function gameOver() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  ctx.fillStyle = "#b80000";
  ctx.textAlign = 'center';
  ctx.fillText("GAME OVER", canvas.width/2, canvas.height/2);
  ctx.fillText("Press 'restart' or 'R' to try again", canvas.width/2, canvas.height/2 + 50);
}

function appleHandler() {
  if (headX == appleX && headY == appleY) {
    appleX = Math.floor(Math.random() * (canvas.width / squareSize)) * squareSize;
    appleY = Math.floor(Math.random() * (canvas.height / squareSize)) * squareSize;
    snakeLen++
  }
  ctx.beginPath();
  ctx.rect(appleX, appleY, squareSize - 1, squareSize - 1); 
  ctx.fillStyle = "#b80000";
  ctx.fill();
  ctx.closePath();
}

function collisionDetection() {
  if (headX < 0 || headX >= canvas.width || headY < 0 || headY >= canvas.height) {
    gameOver();
    return true;
  }

  for (var i = 0; i < snakeSquares.length - 1; i++) {
    if (snakeSquares[i][0] === headX && snakeSquares[i][1] === headY) {
      gameOver();
      return true;
    }
  }
  return false;
}

function drawSnake() {
  ctx.beginPath();
  ctx.fillStyle = "#00bF00";
  for (var i = 0; i < snakeSquares.length; i++) {
    ctx.rect(snakeSquares[i][0], snakeSquares[i][1], squareSize - 1, squareSize - 1);
    ctx.fill();
  }
  ctx.font = "35px Courier New";
  ctx.textAlign = 'right';
  ctx.fillStyle = "black";
  ctx.fillText("Score: " + (snakeLen - 2), canvas.width - 10, 35);
  ctx.closePath();
}

function draw() {
  if (++count < 5) {
  }
  else if (started) {
    count = 0;
    headX = headX + direction[0] * squareSize - direction[1] * squareSize;
    headY = headY + direction[3] * squareSize - direction[2] * squareSize;

    if (collisionDetection()) {
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snakeSquares.push([headX, headY]);
    if (snakeSquares.length > snakeLen) {
      snakeSquares.shift();
    }
    //snakeController();
  }
  else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "35px Courier New";
    ctx.fillStyle = "#b80000";
    ctx.textAlign = "center";
    ctx.fillText("Welcome to Snake", canvas.width/2, canvas.height/2 - 100);
    ctx.fillText("Use the arrow keys to start", canvas.width/2, canvas.height/2 - 50);
  }
  drawSnake();
  appleHandler();
  animationFrameId = requestAnimationFrame(draw); // Store the new animation frame ID
}

draw();
