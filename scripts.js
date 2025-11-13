import {
  SNAKE_SPEED,
  update as updateSnake,
  draw as drawSnake,
} from "/snake.js";

import { update as updateFood, draw as drawFood } from "/food.js";
import { getSnakeHead, snakeIntersection } from "/snake.js";
import { outsideGrid } from "/grid.js";
import { updateHighScore, drawHighScore } from "/score.js";

let lastRenderTime = 0;
let gameOver = false;

const gameBoard = document.getElementById("game-board");
const gameOverSound = new Audio("/sounds/gameover.mp3");
const moveSound = new Audio("/sounds/move.mp3");

function main(currentTime) {
  if (gameOver) {
    gameOverSound.play();
    if (confirm("You lost. Press ok to restart.")) {
      window.location = "/";
    }

    updateHighScore();
    return;
  }

  if (lastRenderTime === 0) {
    drawHighScore();
  }

  window.requestAnimationFrame(main);

  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) {
    return;
  }
  lastRenderTime = currentTime;

  update();
  draw();
}

window.requestAnimationFrame(main);

function update() {
  // update the snake position
  // update the food position

  updateSnake();
  updateFood();
  checkDeath();
}

function draw() {
  // draw the snake
  // draw the food
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
  if (gameOver) {
    updateHighScore();
  }
}
