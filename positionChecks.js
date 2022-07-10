function isOnSnake(position) {
  let onSnake = snakeBody.forEach((segment) => samePosition(segment, position));
  if (onSnake) {
    return true;
  }
}

function samePosition(pos1, pos2) {
  if (pos1.x === pos2.x && pos1.y === pos2.y) {
    return true;
  }
}

export { isOnSnake, samePosition };
