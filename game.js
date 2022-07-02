let start, totalTimeElapsed, previousTimeStamp;
let gameOver = false;
const snakeSpeed = 15;

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
  drawFood();
  moveSnake();
  isFoodFound();
}

window.requestAnimationFrame(gameFlow);

// NOTES: in the gameFlow function I used requestAnimationFrame() which will take care of the timing. it will re-render the game board again and again, until it is not game-over, it will also keep track of the game-time elapsed, and the speed can be adjusted by the snakeSpeed variable.

// DOCUMENTATION i used here:
// https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame

const gameBoard = document.getElementById('game-board-grid');

let snakeBody = [
  { x: 10, y: 10 },
  //   { x: 11, y: 10 },
  //   { x: 12, y: 10 },
  //   { x: 13, y: 10 },
  //   { x: 14, y: 10 },
  //   { x: 15, y: 10 },
  //   { x: 16, y: 10 },
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

function isFoodFound() {
  if (food[0].x === snakeBody[0].x && food[0].y === snakeBody[0].y) {
    console.log('found a food');

    snakeBody.push({ ...food[0] });
    // TODO: after eatch the fruit automatically regenarate a new fruit, make it random.
  }
}

// NOTES: isFoodFound() simply checks the snake found food. this is run every iteration of the game.

// TODO: if sneak head touches the fruit, then i want to remove the fruit from the board, and grow the snake. - this will be done by a function which will take the location of the fuit and push it into the snakeBody

// TODO: i want to create a variable for the expension, lets say when the snake eats an apple it will grow by 1 but when eat an orange it will grow by 2
// TODO: food should be placed in random positions, but never on a position where the snake is already.
// TODO: game-over: if snake hits wall, or if snake hits itself

// TODO: BUG : snake does not grow after the first fruit :(
