let start, totalTimeElapsed, previousTimeStamp;
let gameOver = false;
const snakeSpeed = 3;

function gameFlow(currentTime) {
  if (start === undefined) {
    start = currentTime;
  }

  totalTimeElapsed = currentTime - start;

  if (gameOver !== true) {
    window.requestAnimationFrame(gameFlow);
  }

  const secondsSinceLastRender = (currentTime - previousTimeStamp) / 1000;

  if (secondsSinceLastRender < 1 / snakeSpeed) return;

  //console.log('render game board');
  previousTimeStamp = currentTime;

  drawSnake();
  moveSnake();
  drawFood();
}

window.requestAnimationFrame(gameFlow);

// NOTES: in the gameFlow function I used requestAnimationFrame() which will take care of the timing. it will re-render the game board again and again, until it is not game-over, it will also keep track of the game-time elapsed, and the speed can be adjusted by the snakeSpeed variable.

// DOCUMENTATION i used here:
// https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame

const gameBoard = document.getElementById('game-board-grid');

let snakeBody = [
  { x: 10, y: 10 },
  { x: 11, y: 10 },
  { x: 12, y: 10 },
  { x: 13, y: 10 },
  { x: 14, y: 10 },
  { x: 15, y: 10 },
  { x: 16, y: 10 },
];

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
  console.log(e.code);
  if (e.code === 'ArrowUp') {
    direction = { x: 0, y: -1 };
  }
  if (e.code === 'ArrowLeft') {
    direction = { x: -1, y: 0 };
  }
  if (e.code === 'ArrowDown') {
    direction = { x: 0, y: +1 };
  }
  if (e.code === 'ArrowRight') {
    direction = { x: +1, y: 0 };
  }
}

const food = [{ x: 21, y: 30 }];

function drawFood() {
  food.forEach((item) => {
    const food = document.createElement('div');
    food.style.gridRowStart = item.y;
    food.style.gridColumnStart = item.x;
    food.classList.add('food');
    gameBoard.append(food);
  });
}

// NOTES: drawFood() works just like drawSnake() - it displayes a division on the game board. coordinates of the food is const food.

// TODO:  i want to make sure the snake cannot switch direction on the spot -ie: if goes right then cannot switch to left
// TODO: i want to create a variable for the expension, lets say whe eats an apple it will grow by 1 but when eat an orange it will grow by 2
// TODO: after each render i want to check if fruit is eaten, create a function for this.
// TODO: if sneak head touches the fruit, then i want to remove the fruit from the board, and grow the snake.
// TODO: this will be done by a function which will take the location of the fuit and push it into the snakeBody
// TODO: food should be placed in random positions, but never on a position where the snake is already.
// TODO: game-over: if snake hits wall, or if snake hits itself
