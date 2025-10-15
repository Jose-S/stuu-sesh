const canvas = document.getElementById("canvas-board");
const ctx = canvas.getContext("2d");
let points = [];

const MAX_POINTS = 80; // spatial decay length
const STROKE_WIDTH = 25;
const COLOR_YELLOW = "rgba(255, 230, 0, 1)";
const COLOR_RED = "rgba(255, 56, 56, 1)";
const COLOR_BLUE = "rgba(0, 0, 255, 1)";
const STROKE_COLORS = [COLOR_YELLOW, COLOR_RED, COLOR_BLUE];
const STROKE_COLOR =
  STROKE_COLORS[Math.floor(Math.random() * STROKE_COLORS.length)];

// Resize canvas on screen resize
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Add points to list, and keep performance good by removing older points
function addPoint(x, y) {
  points.push({ x, y });
  if (points.length > MAX_POINTS) points.shift();
}

// Draw bezier curve using point list
function drawCurve() {
  if (points.length < 3) return;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length - 2; i++) {
    const xc = (points[i].x + points[i + 1].x) / 2;
    const yc = (points[i].y + points[i + 1].y) / 2;
    ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
  }
  ctx.strokeStyle = STROKE_COLOR;
  ctx.lineWidth = STROKE_WIDTH;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.stroke();
}

// Load new frame
function animate() {
  ctx.fillStyle = "rgba(255, 255, 255, 0)";
  ctx.fillRect(100, 0, canvas.width, canvas.height);
  drawCurve();
  requestAnimationFrame(animate);
}

// Add point to
function handleMove(e) {
  const x = e.touches ? e.touches[0].clientX : e.clientX;
  const y = e.touches ? e.touches[0].clientY : e.clientY;
  addPoint(x, y);
}

window.addEventListener("resize", resize);
window.addEventListener("mousemove", handleMove);
window.addEventListener("touchmove", handleMove);
resize();
animate();
