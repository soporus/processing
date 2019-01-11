let loc = 0.0;
let angle = 0.0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  rectMode(CENTER);
  stroke(0);
  strokeWeight(3);
  background(0);
}

function draw() {

  loc = map(Math.sin(angle), -1, 1, 0, width / 8);
  squareParty(width / 2, height / 2, width);
  angle += 0.01;
}

const squareParty = function(x, y, w) {
  rect(x, y, w + loc, w + loc);
  if (w > 75) {
    fill(255, 0, 128, 64);
    squareParty(x + w / 2, y, w / 2);
    fill(255, 128, 0, 96);
    squareParty(x - w / 2, y, w / 2);
    fill(0, 128, 255, 112);
    squareParty(x, y - w / 2, w / 2);
    fill(128, 0, 255, 128);
    squareParty(x, y + w / 2, w / 2);
  }
}
