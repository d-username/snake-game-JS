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

function hitTheSnake(position) {
  for (let i = 1; i < snakeBody.length; i++) {
    if (position.x === snakeBody[i].x && position.y === snakeBody[i].y) {
      return true;
    }
  }
}

export { hitTheWall, hitTheSnake };
