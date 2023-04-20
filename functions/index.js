let blockSize = 25;
let rows = 20;
let cols = 20;
let speedX = 0;
let speedY = 0;
let board;
let speed = 100;
let ctx;
let snakeBody = [];
let gameOver = false;

//Position snake
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

//food
let foodX;
let foodY;

//Start game
window.onload = () => {
  board = document.getElementById("board");
  board.width = rows * blockSize;
  board.height = cols * blockSize;
  ctx = board.getContext("2d");

  randomFood();

  document.addEventListener("keyup", changeDirectionSnake);

  setInterval(update, speed);
};

//Create Rect for game
function update() {
  ctx.fillStyle = "rgb(66, 66, 66)";
  ctx.fillRect(0, 0, board.width, board.height);

  ctx.fillStyle = "red";
  ctx.fillRect(foodX, foodY, blockSize, blockSize);

  if (gameOver) {
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    speedX = 0;
    speedY = 0;
    randomFood();
    snakeBody = [];
    gameOver = false;
    return;
  }

  if (snakeX === foodX && snakeY === foodY) {
    snakeBody.push([foodX, foodY]);
    randomFood();
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  ctx.fillStyle = "lime";
  snakeX += speedX * blockSize;
  snakeY += speedY * blockSize;
  ctx.fillRect(snakeX, snakeY, blockSize, blockSize);

  for (let i = 0; i < snakeBody.length; i++) {
    ctx.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  if (
    snakeX < 0 ||
    snakeX > cols * blockSize ||
    snakeY < 0 ||
    snakeY > rows * blockSize
  ) {
    gameOver = true;
    alert("Game Over");
  }

  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
      alert("Game Over");
    }
  }
}

function changeDirectionSnake(e) {
  console.log(e);
  //keyCodes
  //38 Top
  //40 Bottom
  //37 Left
  //39 Right
  if (e.keyCode == 38 || (e.keyCode == 87 && speedY != 1)) {
    speedX = 0;
    speedY = -1;
  } else if (e.keyCode == 40 || (e.keyCode == 83 && speedY != -1)) {
    speedX = 0;
    speedY = 1;
  } else if (e.keyCode == 37 || (e.keyCode == 65 && speedX != 1)) {
    speedX = -1;
    speedY = 0;
  } else if (e.keyCode == 39 || (e.keyCode == 68 && speedX != -1)) {
    speedX = 1;
    speedY = 0;
  }
}

function randomFood() {
  foodX = Math.floor(Math.random() * rows) * blockSize;
  foodY = Math.floor(Math.random() * cols) * blockSize;
}
