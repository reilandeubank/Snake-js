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
var started = false;

var count = 0;

var directions = ["right", "left", "up", "down"];
var direction = [0, 0, 0, 0];
var keyPressed = "none";

var animationFrameId = null; // Store the animation frame ID

appleX = Math.floor(Math.random() * (canvas.width / squareSize)) * squareSize;
appleY = Math.floor(Math.random() * (canvas.height / squareSize)) * squareSize;
if (appleX == 0 && appleY == 0) {
  appleX = Math.floor(Math.random() * (canvas.width / squareSize)) * squareSize;
  appleY = Math.floor(Math.random() * (canvas.height / squareSize)) * squareSize;
}

function restart() {
  cancelAnimationFrame(animationFrameId); // Stop the previous animation frame
  count = 0;
  headX = startPos;
  headY = startPos;
  snakeSquares = [
    [startPos, startPos + squareSize],
    [startPos, startPos],
  ];
  direction = [0, 0, 0, 0];
  keyPressed = "none";
  started = false;
  appleX = Math.floor(Math.random() * (canvas.width / squareSize)) * squareSize;
  appleY = Math.floor(Math.random() * (canvas.height / squareSize)) * squareSize;
  if (appleX == 0 && appleY == 0) {
    appleX = Math.floor(Math.random() * (canvas.width / squareSize)) * squareSize;
    appleY = Math.floor(Math.random() * (canvas.height / squareSize)) * squareSize;
  }
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
  started = true;
}

function appleHandler() {
  if (headX == appleX && headY == appleY) {
    appleX = Math.floor(Math.random() * (canvas.width / squareSize)) * squareSize;
    appleY = Math.floor(Math.random() * (canvas.height / squareSize)) * squareSize;
    headX = headX + direction[0] * squareSize - direction[1] * squareSize;
    headY = headY + direction[3] * squareSize - direction[2] * squareSize;
    snakeSquares.push([headX, headY]);
  }
  ctx.beginPath();
  ctx.rect(appleX, appleY, squareSize - 1, squareSize - 1); 
  ctx.fillStyle = "#b80000";
  ctx.fill();
  ctx.closePath();
}

function drawSnake() {
  ctx.beginPath();
  ctx.fillStyle = "#00bF00";
  for (var i = 0; i < snakeSquares.length; i++) {
    ctx.rect(snakeSquares[i][0], snakeSquares[i][1], squareSize - 1, squareSize - 1);
    ctx.fill();
  }
  ctx.closePath();
}

function draw() {
  if (++count < 4) {
    //count++;
  } else if (started) {
    count = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    headX = headX + direction[0] * squareSize - direction[1] * squareSize;
    headY = headY + direction[3] * squareSize - direction[2] * squareSize;

    snakeSquares.shift();
    snakeSquares.push([headX, headY]);
    drawSnake();
    appleHandler();
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    appleHandler();
  }
  animationFrameId = requestAnimationFrame(draw); // Store the new animation frame ID
}

draw();
