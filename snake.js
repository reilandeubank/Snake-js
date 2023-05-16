var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var changeDirFrame = [0, 0, 0, 1];
var frameCount = 0;

var squareSize = 20;
var snakeX = 0;
var snakeY = 0;
var changeDir = false;

var directions = ["right", "left", "up", "down"];
var direction = [0, 0, 0, 0]
var keyPressed = "none";

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight") {
    keyPressed = directions[0];
    if (!direction[1]) {
      direction=  [1, 0, 0, 0];
    }
  }
  else if(e.key == "Left" || e.key == "ArrowLeft") {
    keyPressed = directions[1];
    if (!direction[0]) {
      direction = [0, 1, 0, 0];
    }
  }
  else if(e.key == "Up" || e.key == "ArrowUp") {
    keyPressed = directions[2]; 
    if (!direction[3]) {
      direction = [0, 0, 1, 0]; 
    }
  }
  else if(e.key == "Down" || e.key == "ArrowDown") {
    keyPressed = directions[3];
    if (!direction[2]) {
      direction = [0, 0, 0, 1];
    }
  }
  changeDir = true;
}

function keyUpHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight") {
    //keyPressed = "none";
  }
  else if(e.key == "Left" || e.key == "ArrowLeft") {
    //keyPressed = "none";    
  }
  else if(e.key == "Up" || e.key == "ArrowUp") {
    //keyPressed = "none";
  }
  else if(e.key == "Down" || e.key == "ArrowDown") {
    //keyPressed = "none";
  }
}



function drawSnake() {
  ctx.beginPath();
  ctx.rect(snakeX, snakeY, squareSize-2, squareSize-2);
  ctx.fillStyle = "#02FF02";
  ctx.fill();
  ctx.closePath();
}


function draw() {
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  

  if (direction[0]) {
    snakeX += squareSize;
  }
  else if (direction[1]) {
    snakeX -= squareSize;
  }
  else if (direction[2]) {
    snakeY -= squareSize;
  }
  else if (direction[3]) {
    snakeY += squareSize;
  }
  frameCount++;
  //requestAnimationFrame(draw);
}

//draw();
var interval = setInterval(draw, 60);
