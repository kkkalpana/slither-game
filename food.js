let food = getRandomFoodPosition();
const EXPANSION_RATE = 1;

import { onSnake, expandSnake } from "/snake.js";
import { randomGridPosition } from "/grid.js";
import { update as updateScore } from "/score.js";
const foodSound = new Audio("/sounds/food.mp3");

export function update() {
  // if the snake eats the food
  if (onSnake(food)) {
    foodSound.play();
    updateScore();
    expandSnake(EXPANSION_RATE);
    food = getRandomFoodPosition(); // new food position
  }
}

export function draw(gameBoard) {
  // draw the snake
  // draw the food
  const foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  gameBoard.appendChild(foodElement);
}

function getRandomFoodPosition() {
  let newFoodPosition;
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition();
  }
  return newFoodPosition;
}
