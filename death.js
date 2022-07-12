import { snakeBody } from './snake.js';

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

function hitTheSnake() {
  for (let i = 3; i < snakeBody.length; i++) {
    if (
      snakeBody[0].x === snakeBody[i].x &&
      snakeBody[0].y === snakeBody[i].y
    ) {
      return true;
    }
  }
}

export { hitTheWall, hitTheSnake };
