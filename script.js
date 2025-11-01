const bird = document.getElementById('bird');
const container = document.querySelector('.game-container');
const scoreDisplay = document.getElementById('score');

let birdTop = 200;
let gravity = 2;
let isJumping = false;
let score = 0;

const obstacles = [];

function createObstacle() {
  const obstacle = document.createElement('div');
  obstacle.classList.add('obstacle');
  
  const heightTop = Math.floor(Math.random() * 200) + 50;
  const heightBottom = container.clientHeight - heightTop - 150;
  
  obstacle.style.height = `${heightTop}px`;
  obstacle.style.top = `0px`;
  obstacle.style.left = `${container.clientWidth}px`;
  
  const bottomPart = document.createElement('div');
  bottomPart.style.height = `${heightBottom}px`;
  bottomPart.style.width = '50px';
  bottomPart.style.background = '#00aa00';
  bottomPart.style.position = 'absolute';
  bottomPart.style.bottom = '0';
  bottomPart.style.left = '0';
  
  obstacle.appendChild(bottomPart);
  container.appendChild(obstacle);
  obstacles.push(obstacle);
}

function moveObstacles() {
  obstacles.forEach((obs, index) => {
    const currentLeft = parseInt(obs.style.left);
    if(currentLeft > -50){
      obs.style.left = (currentLeft - 3) + 'px';
    } else {
      obs.remove();
      obstacles.splice(index, 1);
      score++;
      scoreDisplay.innerText = `Score: ${score}`;
    }
  });
}

function gravityEffect() {
  if(!isJumping){
    birdTop += gravity;
    if(birdTop + 30 >= container.clientHeight){
      birdTop = container.clientHeight - 30;
      endGame();
    }
    bird.style.top = birdTop + 'px';
  }
}

function jump() {
  isJumping = true;
  let jumpCount = 0;
  const jumpInterval = setInterval(() => {
    if(jumpCount < 15){
      birdTop -= 4;
      bird.style.top = birdTop + 'px';
      jumpCount++;
    } else {
      clearInterval(jumpInterval);
      isJumping = false;
    }
  }, 20);
}

function detectCollision() {
  obstacles.forEach(obs => {
    const obsLeft = parseInt(obs.style.left);
    const obsTop = parseInt(obs.firstChild.style.height);
    const birdRight = 80 + 30;
    const birdBottom = birdTop + 30;

    if((80 < obsLeft + 50 && birdRight > obsLeft) &&
       (birdTop < obsTop || birdBottom > container.clientHeight - (container.clientHeight - obsTop - 150))){
      endGame();
    }
  });
}

function endGame() {
  alert(`Game Over! Score: ${score}`);
  window.location.reload();
}

// Events
document.addEventListener('keydown', e => {
  if(e.code === 'Space') jump();
});

// Game Loop
setInterval(() => {
  gravityEffect();
  moveObstacles();
  detectCollision();
}, 20);

setInterval(() => {
  createObstacle();
}, 2000);
