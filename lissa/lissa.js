function make2DArray(rows, cols) {
  let arr = new Array(rows); //like arr[]; but with number of columns hardcoded
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(cols);
  }
  return arr;
}

function makeColorArray(rows, cols) {
  let arrColor = new Array(rows); // create single row array for horz palette
  for (let i = 0; i < arrColor.length; i++) { // create second for vertical palette
    arrColor[i] = new Array(cols);
  }
  //fill row one horz palette
  for (let i = 0; i < rows; i++) {
    arrColor[i][0] = randColor(128, 255);
  }
  //fill row one vert palette
  for (let i = 0; i < cols; i++) {
    arrColor[0][i] = randColor(128, 255);
  }
  return arrColor;
}

let angle = 0;
const w = 60;
let cols;
let rows;
let curves;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  cols = Math.floor(width / w) - 1;
  rows = Math.floor(height / w) - 1;
  curves = make2DArray(rows, cols);
  colors = makeColorArray(rows, cols);
  // stroke(randColor(128, 255));
  noFill();

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      curves[j][i] = new Curve();
      //       curves[j][i].setColor(colors[i][0],colors[0][j]);
      curves[j][i].curveColor = lerpColor(colors[j][0], colors[0][i], 0.5);
    }
  }
}

function draw() {
  background(0);
  let d = w - 0.2 * w;
  let r = d / 2;
  //horizontal row of ellipses
  for (let i = 0; i < cols; i++) {
    let cx = w + i * w + w / 2;
    let cy = w / 2;
    strokeWeight(1);
    stroke(colors[0][i]);
    ellipse(cx, cy, d, d);
    let x = r * Math.cos(angle * (i + 1) - HALF_PI);
    let y = r * Math.sin(angle * (i + 1) - HALF_PI);
    strokeWeight(6);
    point(cx + x, cy + y);
    strokeWeight(1);
    line(cx + x, 0, cx + x, height);

    for (let j = 0; j < rows; j++) {
      curves[j][i].setX(cx + x);
    }
  }

  noFill();
  // vertical row of ellipses
  for (let j = 0; j < rows; j++) {
    let cx = w / 2;
    let cy = w + j * w + w / 2;
    strokeWeight(1);
    stroke(colors[j][0]);
    ellipse(cx, cy, d, d);
    let x = r * Math.cos(angle * (j + 1) - HALF_PI);
    let y = r * Math.sin(angle * (j + 1) - HALF_PI);
    strokeWeight(6);
    point(cx + x, cy + y);
    strokeWeight(1);
    line(0, cy + y, width, cy + y);

    for (let i = 0; i < cols; i++) {
      curves[j][i].setY(cy + y);
    }
  }

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      curves[j][i].addPoint();
      curves[j][i].show();
    }
  }
  angle -= 0.05;

  if (angle < -TWO_PI) {
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        curves[j][i].reset();
      }
    }
    // saveFrame("lissajous#####.png");
    angle = 0;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function randColor(min, max) {
  let randomcolor = color(
    Math.floor(Math.random() * (max - min)) + min,
    Math.floor(Math.random() * (max - min)) + min,
    Math.floor(Math.random() * (max - min)) + min);
  return randomcolor;
}
