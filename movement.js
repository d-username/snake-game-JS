import { startTimer } from './time-score.js';
import { timerIsOn } from './game.js';

const speedUp = document.getElementById('speedUp');
const speedDown = document.getElementById('speedDown');

speedUp.addEventListener('click', function () {
  adjustSnakeSpeed('increase');
});

speedDown.addEventListener('click', function () {
  adjustSnakeSpeed('decrease');
});

let direction = { x: 0, y: 0 };
let snakeSpeed = 10;

function updateSpeed() {
  const displaySpeed = document.getElementById('speed-num');
  displaySpeed.innerText = snakeSpeed;
}

function moveSnake(snakeBody) {
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }

  const head = snakeBody[0];
  head.x += direction.x;
  head.y += direction.y;
}

document.addEventListener('keydown', changeDirection);

function changeDirection(e) {
  if (e.code === 'ArrowUp' && direction.y === 0) {
    direction = { x: 0, y: -1 };
    if (timerIsOn === false) {
      startTimer();
    }
  }
  if (e.code === 'ArrowLeft' && direction.x === 0) {
    direction = { x: -1, y: 0 };
    if (timerIsOn === false) {
      startTimer();
    }
  }
  if (e.code === 'ArrowDown' && direction.y === 0) {
    direction = { x: 0, y: +1 };
    if (timerIsOn === false) {
      startTimer();
    }
  }
  if (e.code === 'ArrowRight' && direction.x === 0) {
    direction = { x: +1, y: 0 };
    if (timerIsOn === false) {
      startTimer();
    }
  }
}

function adjustSnakeSpeed(value) {
  if (value === 'increase') {
    snakeSpeed++;
    updateSpeed();
  }
  if (value === 'decrease' && snakeSpeed > 1) {
    snakeSpeed--;
    updateSpeed();
  }
}

export { moveSnake, snakeSpeed };

// NOTES: in moveSnake() the head of the snake will be the coordinates of the input direction. thats the head moving alone, but in the loop i take each segment and shift it to the one ahead.

// DOCUMENTATION i used here:
// https://developer.mozilla.org/en-US/docs/Web/API/Document/keydown_event
// https://developer.mozilla.org/en-US/docs/Web/Events
