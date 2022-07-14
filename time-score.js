import { growBy } from './snake.js';
import { setTimerIsOn } from './game.js';

let score = 0;
let start;

function updateScore() {
  score += growBy;
  const displayScore = document.getElementById('score-num');
  displayScore.innerText = score;
}

function updateTime() {
  const displayTime = document.getElementById('time-num');
  let current = new Date();
  let elapsed = current - start;
  let timeToDisplay = formatTime(elapsed);
  displayTime.innerText = timeToDisplay;
}

function startTimer() {
  start = new Date();
  setTimerIsOn();
}

function formatTime(milliseconds) {
  let minutes = Math.floor(milliseconds / 60000);
  let seconds = ((milliseconds % 60000) / 1000).toFixed(0);
  return (
    (minutes < 10 ? '0' : '') +
    minutes +
    ':' +
    (seconds < 10 ? '0' : '') +
    seconds
  );
}

export { updateScore, updateTime, score, startTimer };
