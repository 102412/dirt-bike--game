const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let bike = { x: 50, y: 300, speedY: 0, grounded: false };
let keys = {};

document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);

function drawBike() {
  ctx.fillStyle = "orange";
  ctx.fillRect(bike.x, bike.y, 40, 20);
}

function drawGround() {
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 350, 800, 50);
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGround();
  drawBike();

  if (keys["ArrowRight"]) bike.x += 3;
  if (keys["ArrowLeft"]) bike.x -= 3;

  // gravity
  bike.speedY += 0.5;
  bike.y += bike.speedY;

  // ground collision
  if (bike.y + 20 > 350) {
    bike.y = 330;
    bike.speedY = 0;
    bike.grounded = true;
  } else {
    bike.grounded = false;
  }

  if (keys["ArrowUp"] && bike.grounded) {
    bike.speedY = -10;
    bike.grounded = false;
  }

  requestAnimationFrame(update);
}

update();
