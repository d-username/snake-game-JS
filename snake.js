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
  console.log('food is found and i am in grow snake');

  for (let i = 0; i < growBy; i++) {
    console.log(snakeBody, 'before');
    snakeBody.push(food[0]);
    console.log(snakeBody, 'after');
  }
}

export { snakeBody, drawSnake, growSnake };

// NOTES: growSnake() takes the position of the last segment of the snake and pushes it into snakeBody.

// NOTES: i grabbed the gameBoard from DOM, created the snakeBody as an array of objects, each object represents one coordinate of a snake segment. the drawSnake() takes each segment and created a div on the gameBoard, places it where they have to be and adds class for styling.

// DOCUMENTATION i used here:
// https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML
