let start, totalTimeElapsed, previousTimeStamp;
let gameOver = false;
const snakeSpeed = 10;
let score = 0;

function gameFlow(currentTime) {
  if (start === undefined) {
    start = currentTime;
  }

  totalTimeElapsed = ((currentTime - start) / 1000).toFixed(2);

  if (gameOver !== true) {
    window.requestAnimationFrame(gameFlow);
  }

  const secondsSinceLastRender = (currentTime - previousTimeStamp) / 1000;

  if (secondsSinceLastRender < 1 / snakeSpeed) return;

  previousTimeStamp = currentTime;

  drawSnake();
  drawFood();
  moveSnake();
  updateTime();

  if (hitTheWall()) {
    gameOver = true;
    alert('Game Over - You hit the Wall');
  }
  if (hitTheSnake()) {
    gameOver = true;
    alert('Game Over - You hit the Snake');
  }
}

window.requestAnimationFrame(gameFlow);

// NOTES: in the gameFlow function I used requestAnimationFrame() which will take care of the timing. it will re-render the game board again and again, until it is not game-over, it will also keep track of the game-time elapsed, and the speed can be adjusted by the snakeSpeed variable.

// DOCUMENTATION i used here:
// https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame

const gameBoard = document.getElementById('game-board-grid');

let snakeBody = [{ x: 10, y: 10 }];

function drawSnake() {
  // this is important -- before we re-draw the snake we must clear off the game board
  gameBoard.innerHTML = '';
  snakeBody.forEach((segment) => {
    const snakeSegment = document.createElement('div');
    snakeSegment.style.gridRowStart = segment.y;
    snakeSegment.style.gridColumnStart = segment.x;
    snakeSegment.classList.add('snake');
    gameBoard.append(snakeSegment);
  });
}

// NOTES: i grabbed the gameBoard from DOM, created the snakeBody as an array of objects, each object represents one coordinate of a snake segment. the drawSnake() takes each segment and created a div on the gameBoard, places it where they have to be and adds class for styling.

// DOCUMENTATION i used here:
// https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML

let direction = { x: 0, y: 0 };

function moveSnake() {
  if (isFoodFound()) {
    growSnake();
    updateScore();
    createRandomFood();
  }
  const head = snakeBody[0];
  head.x += direction.x;
  head.y += direction.y;

  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }
}

// NOTES: in moveSnake() the head of the snake will be the coordinates of the input direction. thats the head moving alone, but in the loop i take each segment and shift it to the one ahead.

// DOCUMENTATION i used here:
// https://developer.mozilla.org/en-US/docs/Web/API/Document/keydown_event
// https://developer.mozilla.org/en-US/docs/Web/Events

document.addEventListener('keydown', changeDirection);

function changeDirection(e) {
  if (e.code === 'ArrowUp' && direction.y === 0) {
    direction = { x: 0, y: -1 };
  }
  if (e.code === 'ArrowLeft' && direction.x === 0) {
    direction = { x: -1, y: 0 };
  }
  if (e.code === 'ArrowDown' && direction.y === 0) {
    direction = { x: 0, y: +1 };
  }
  if (e.code === 'ArrowRight' && direction.x === 0) {
    direction = { x: +1, y: 0 };
  }
}

let food = [{ x: 21, y: 30 }];

function drawFood() {
  try {
    food.forEach((item) => {
      const food = document.createElement('div');
      food.style.gridRowStart = item.y;
      food.style.gridColumnStart = item.x;
      food.classList.add('food');
      gameBoard.append(food);
    });
  } catch (error) {
    console.error(error);
  }
}

// // DOCUMENTATION i used here:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch

// NOTES: drawFood() works just like drawSnake() - it displayes a division on the game board. coordinates of the food is const food. - in case the food array is empty - ie. there is now food, then throws arror.

function isFoodFound() {
  if (food[0].x === snakeBody[0].x && food[0].y === snakeBody[0].y) {
    return true;
  }
}

// NOTES: isFoodFound() simply checks the snake found food. this is run every iteration of the game. -> return true only.

const numberOfFood = 1;

function createRandomFood() {
  let newFoods = [];
  for (let i = 0; i < numberOfFood; i++) {
    let newFood = { x: 0, y: 0 };
    newFood.x = Math.floor(Math.random() * 35) + 1;
    newFood.y = Math.floor(Math.random() * 35) + 1;
    newFoods.push(newFood);
  }
  food = newFoods;
}

// DOCUMENTATION i used here:
// https://www.w3schools.com/js/js_random.asp

const growBy = 10;

function growSnake() {
  for (let i = 0; i < growBy; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }
}

// NOTES: growSnake() takes the position of the last segment of the snake and pushes it into snakeBody.

function hitTheWall() {
  if (
    snakeBody[0].x === -1 ||
    snakeBody[0].x === 37 ||
    snakeBody[0].y === -1 ||
    snakeBody[0].y === 37
  ) {
    return true;
  }
}

// NOTES: hitTheWall() return true if the snake head is positioned outside the board.

function hitTheSnake() {
  for (let i = 2; i < snakeBody.length; i++) {
    if (
      snakeBody[0].x === snakeBody[i].x &&
      snakeBody[0].y === snakeBody[i].y
    ) {
      return true;
    }
  }
}

// NOTES: hitTheSnake() checkes any segment of the snake (excluding the head) - is in the same position as the head.

// TODO: possible solution for refactoring...
// function samePosition(pos1, pos2) {
//   if (pos1.x === pos2.x && pos1.y === pos2.y) {
//     return true;
//   }
// }

// TODO: BUG : snake does not grow after the first fruit
// TODO: BUG: food should be placed in random positions, but never on a position where the snake is already.

function updateScore() {
  score += growBy;
  const displayScore = document.getElementById('score-num');
  displayScore.innerText = score;
}

function updateTime() {
  const displayTime = document.getElementById('time-num');
  displayTime.innerText = totalTimeElapsed;
}

const startButton = document.getElementById('start');
startButton.addEventListener('click', () => {
  console.log('david is here');
  switchStartButton();
});

function switchStartButton() {
  if (startButton.innerText === 'START') {
    startButton.innerText = 'PAUSE';
  } else {
    startButton.innerText = 'START';
  }
}

// NOTES: i introdued functions of DOM manipulation for the button, time and score.
