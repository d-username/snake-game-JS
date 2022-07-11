let snakeBody = [{ x: 10, y: 10 }];
const growBy = 1;

function drawSnake(gameBoard) {
  gameBoard.innerHTML = '';
  snakeBody.forEach((segment) => {
    const snakeSegment = document.createElement('div');
    snakeSegment.style.gridRowStart = segment.y;
    snakeSegment.style.gridColumnStart = segment.x;
    snakeSegment.classList.add('snake');
    gameBoard.append(snakeSegment);
  });
}

function growSnake() {
  for (let i = 0; i < growBy; i++) {
    snakeBody.push(snakeBody[snakeBody.length - 1]);
  }
}

export { snakeBody, drawSnake, growSnake, growBy };

// NOTES: growSnake() takes the position of the last segment of the snake and pushes it into snakeBody.

// NOTES: i grabbed the gameBoard from DOM, created the snakeBody as an array of objects, each object represents one coordinate of a snake segment. the drawSnake() takes each segment and created a div on the gameBoard, places it where they have to be and adds class for styling.

// DOCUMENTATION i used here:
// https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML
