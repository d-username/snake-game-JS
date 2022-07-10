import { snakeBody } from './snake.js';

function hitTheWall(snakeBody) {
  if (
    snakeBody[0].x === -1 ||
    snakeBody[0].x === 37 ||
    snakeBody[0].y === -1 ||
    snakeBody[0].y === 37
  ) {
    return true;
  }
}

function hitTheSnake(isOnSnake) {
  if (isOnSnake(snakeBody[0])) {
    console.log('here');
    return true;
  }
}

export { hitTheWall, hitTheSnake };
