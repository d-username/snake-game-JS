import { createRandomFood, drawFood, isFoodFound } from './food.js';
import { snakeBody, drawSnake, growSnake } from './snake.js';
import { moveSnake } from './movement.js';
import { hitTheSnake, hitTheWall } from './death.js';
import { updateScore, updateTime } from './time-score.js';

const gameBoard = document.getElementById('game-board-grid');
let previousTimeStamp;
let gameOver = false;
export let timerIsOn = false;
const snakeSpeed = 10;

export function setTimerIsOn() {
  timerIsOn = true;
}

function gameFlow(currentTime) {
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
  }

  if (timerIsOn) {
    updateTime();
  }

  if (hitTheWall() || hitTheSnake()) {
    gameOver = true;
    alert('Game Over');
  }

  if (isFoodFound()) {
    growSnake();
    updateScore();
    createRandomFood();
  }
}

window.requestAnimationFrame(gameFlow);

// NOTES: in the gameFlow function I used requestAnimationFrame() which will take care of the timing. it will re-render the game board again and again, until it is not game-over, it will also keep track of the game-time elapsed, and the speed can be adjusted by the snakeSpeed variable.

// DOCUMENTATION i used here:
// https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
