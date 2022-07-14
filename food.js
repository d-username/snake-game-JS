import { hitTheSnake } from './death.js';
import { snakeBody } from './snake.js';

let food = [];
const numberOfFood = 1;

function createRandomFood() {
  for (let i = 0; i < numberOfFood; i++) {
    let newFood = { x: null, y: null };
    newFood.x = Math.floor(Math.random() * 35) + 1;
    newFood.y = Math.floor(Math.random() * 35) + 1;
    if (hitTheSnake(newFood)) {
      createRandomFood();
    }
    food[0] = newFood;
  }
}

function drawFood(gameBoard) {
  if (food.length === 0) createRandomFood();
  food.forEach((item) => {
    const food = document.createElement('div');
    food.style.gridRowStart = item.y;
    food.style.gridColumnStart = item.x;
    food.classList.add('food');
    gameBoard.append(food);
  });
}

function isFoodFound() {
  if (food[0].x === snakeBody[0].x && food[0].y === snakeBody[0].y) {
    return true;
  }
}

export { food, createRandomFood, drawFood, isFoodFound };

// DOCUMENTATION i used here:
// https://www.w3schools.com/js/js_random.asp
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch

// NOTES: drawFood() works just like drawSnake() - it displayes a division on the game board. coordinates of the food is const food. - in case the food array is empty - ie. there is now food, then throws arror.

// NOTES: isFoodFound() simply checks the snake found food. this is run every iteration of the game. -> return true only.
