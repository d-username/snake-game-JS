import { growBy } from './snake.js';

let score = 0;

function updateScore() {
  score += growBy;
  const displayScore = document.getElementById('score-num');
  displayScore.innerText = score;
}

function updateTime(totalTimeElapsed) {
  const displayTime = document.getElementById('time-num');
  displayTime.innerText = totalTimeElapsed;
}

export { updateScore, updateTime, score };
