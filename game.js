import { createRandomFood, drawFood, isFoodFound } from './food.js';
import { snakeBody, drawSnake, growSnake } from './snake.js';
import { moveSnake, snakeSpeed } from './movement.js';
import { hitTheSnake, hitTheWall } from './death.js';
import { updateScore, updateTime } from './time-score.js';

const gameBoard = document.getElementById('game-board-grid');
const buttonRestart = document.getElementById('restart');
const intro = document.getElementById('intro');
const gameOverSign = document.getElementById('game-over');

let previousTimeStamp;
let gameOver = false;
export let timerIsOn = false;

buttonRestart.addEventListener('click', function () {
  location.reload();
});

export function setTimerIsOn() {
  timerIsOn = true;
  intro.classList.replace('show', 'hide');
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

  if (hitTheWall() || hitTheSnake(snakeBody[0])) {
    gameOver = true;
    gameOverSign.classList.replace('hide', 'show');
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

// Possible todos:
// TODO: make food random colours
// TODO: the game over on the top is not aligned when on full screen width
