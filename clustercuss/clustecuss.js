let loc = 0.0;
let angle = 0.0;

function setup() {
  createCanvas(windowWidth, windowHeight,WEBGL);
  frameRate(60);
  rectMode(CENTER);
//   fill(0);
  noFill();
  strokeWeight(2);
  background(0);

}

function draw() {
  scale(.80);
  background(0);
  loc = map(Math.sin(angle), -1, 1, 0, width / 8);
  rotateX(PI/4);
  rotateY(PI/2);
  squareParty(width / 2, height / 2, width);
  angle += 0.01;
}

const squareParty = function(x, y, w) {
    fill(0,31,63,31);
    rotateX(angle);
    rect(x, y, w + loc, w + loc);
    noFill();
    box(x, y, w + loc);
      if (w > 75) {
        push();
        rotateX(-angle/2);
        stroke(255, 0, 127);
        squareParty(x + w / 2, y, w / 2);
        pop();
        push();
        rotateZ(-angle/3);
        stroke(255, 127, 0);
        squareParty(x - w / 2, y, w / 2);
        pop();
        push();
        rotateY(angle);
        stroke(0, 127, 255);
        squareParty(x, y - w / 2, w / 2);
        pop();
        stroke(127, 0, 255);
        squareParty(x, y - height / 2, w / 2);
      }
    }
