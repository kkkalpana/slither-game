let score = 0;
const scoreElement = document.getElementById("score");
const highScoreElement = document.getElementById("highScore");
const highScore = localStorage.getItem("highScore") || 0;

export function update() {
  score += 1;
  draw();
}

function draw() {
  scoreElement.innerHTML = "Score: " + score;
}

export function updateHighScore() {
  if (score > highScore) {
    localStorage.setItem("highScore", score);
  }
}

export function drawHighScore() {
  highScoreElement.innerHTML = "High Score: " + highScore;
}
