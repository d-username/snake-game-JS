import { createRandomFood, drawFood, isFoodFound } from './food.js';
import { snakeBody, drawSnake, growSnake } from './snake.js';
import { moveSnake } from './movement.js';
import { hitTheSnake, hitTheWall } from './death.js';
import { updateScore, updateTime, score } from './time-score.js';
// import { isOnSnake, samePosition } from './positionChecks.js';

const gameBoard = document.getElementById('game-board-grid');
let start, totalTimeElapsed, previousTimeStamp;
let gameOver = false;
const snakeSpeed = 10;

function gameFlow(currentTime) {
  if (start === undefined) {
    start = currentTime;
  }
  totalTimeElapsed = ((currentTime - start) / 1000).toFixed(2);

  if (!gameOver) {
    window.requestAnimationFrame(gameFlow);
  }

  const secondsSinceLastRender = (currentTime - previousTimeStamp) / 1000;

  if (secondsSinceLastRender < 1 / snakeSpeed) return;

  previousTimeStamp = currentTime;

  if (!gameOver) {
    drawSnake(gameBoard);
    drawFood(gameBoard);
    moveSnake(snakeBody);

    if (isFoodFound()) {
      growSnake();
      updateScore();
      createRandomFood();
    }
  }

  // if (hitTheWall) {
  //   // gameOver = true;
  //   // alert('Game Over - You hit the Wall');
  // }

  // if (hitTheSnake(isOnSnake)) {
  //   gameOver = true;
  //   alert('Game Over - You hit the Snake');
  // }
}

window.requestAnimationFrame(gameFlow);

// NOTES: in the gameFlow function I used requestAnimationFrame() which will take care of the timing. it will re-render the game board again and again, until it is not game-over, it will also keep track of the game-time elapsed, and the speed can be adjusted by the snakeSpeed variable.

// DOCUMENTATION i used here:
// https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame

// TODO: BUG : snake does not grow after the first fruit
// TODO: BUG: food should be placed in random positions, but never on a position where the snake is already.
