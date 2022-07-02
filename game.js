let start, totalTimeElapsed, previousTimeStamp;
let gameOver = false;
const snakeSpeed = 1;

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
}

window.requestAnimationFrame(gameFlow);

// NOTES: in the gameFlow function I used requestAnimationFrame() which will take care of the timing. it will re-render the game board again and again, until it is not game-over, it will also keep track of the game-time elapsed, and the speed can be adjusted by the snakeSpeed variable.

// DOCUMENTATION i used here:
// https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame

const gameBoard = document.getElementById('game-board-grid');

const snakeBody = [
  //add to the head { x: 9, y: 10 }
  { x: 10, y: 10 },
  { x: 11, y: 10 },
  { x: 12, y: 10 },
  { x: 13, y: 10 },
  { x: 14, y: 10 } /* <--- remove this line from the tail.*/,
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

function moveSnake() {
  //what i want to do....
  // i want to remove the last one....and add one to the front...
  // do a loop and on each key...shift the value to the value of the higher key....
  // - **push()** adds element at the start of an array
  // - **unshift()** adds element at the end of an array
  // - **.shift()** removes an element at the start of an array.
  // - **.pop()** removes an element at the end of an array.

  const head = snakeBody[0];
  let direction = { x: head.x + 1, y: head.y };

  snakeBody.unshift(direction);
  snakeBody.pop();
}

// NOTES: the moveSnake() find the first segment and in the direction we can change the position of the new element. then i .unshift() this new element ie: the head of the snake, and .pop() the last element from the array.

// NOTES: the implementation below works as well, but i find my version much simpler.

// **********this works just fine *************

// function moveSnake() {
//   for (let i = snakeBody.length - 2; i >= 0; i--) {
//     snakeBody[i + 1] = { ...snakeBody[i] };
//   }
//   snakeBody[0].x += 0;
//   snakeBody[0].y += 1;
// }
