/*
var myFont;

function preload() {
  // Ensure the .ttf or .otf font stored in the assets directory
  // is loaded before setup() and draw() are called
  myFont = loadFont("assets/Roboto-Regular.ttf");
}
var txtsize = 100;
*/
var cols, rows;
var scaler = 48;
var w = 990;
var h = 2000;
var flying = 0.0;
var pongVar = 1.0;
var pongVarbit = false;
//noSmooth();

var terrain = [];
var rot = 0.0;

function setup() {
  //textFont(myFont);
  //textSize(txtsize);
  cols = w / scaler;
  rows = h / scaler;
  createCanvas(windowWidth, windowHeight, WEBGL);
  terrain = [];
  for (var j = 0; j < cols; j++) {
    terrain[j] = [];
  }
  frameRate(30);
}

function draw() {
  noFill();
  background(255 - map(pongVar, 0, height, 0, 255), random(map(pongVar, 0,
    height,
    0, 17)) + 228 - map(pongVar, 0, height, 0, 228), random(map(pongVar, 0,
    height, 0, 63)) + 192 - map(pongVar, 0, height, 0, 192));
  stroke(map(pongVar, 0, height, 0, 255), random(map(pongVar, 0, height, 0, 64)) +
    0, random(64) + 64);
  //fill terrain values
  flying -= 0.1 + map(pongVar, 0, height, 0, 0.4);
  var yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 0.0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -map(pongVar, 0, height, 0,
        1000), map(pongVar, 0, height, 0, random(map(pongVar, 0, height, 0,
        128)) + 1000));
      xoff += 0.1 + map(pongVar, 0, height, 0, 0.4);
    }
    yoff += 0.1 + map(pongVar, 0, height, 0, 0.4);
  }
  push();
  translate(-width / 2.1, -height - 200, -1000); //-height/1.3
  rotateY(radians(-30));
  pong();
  //print(terrain.length);
  for (var y2 = 0; y2 < rows - 1; y2++) {
    beginShape();
    for (var x2 = 0; x2 < cols - 1; x2++) {
      vertex(x2 * scaler, y2 * scaler, terrain[x2][y2]);
      vertex(x2 * scaler, (y2 + 1) * scaler, terrain[x2][y2 + 1]);
    }
    endShape(CLOSE);
  }
  pop();
  fill(0);
  strokeWeight(3);
  stroke(map(pongVar, 0, height, 0, 255), random(map(pongVar, 0, height, 0, 64)),
    random(64) + 64);

  /*
    textAlign(RIGHT);
    text(pongVar, txtsize * 4.75, height - txtsize * 3);
    textAlign(LEFT);
    text("STIMULATION", txtsize, windowHeight - txtsize * 2);

    //text("STIMULATION", 100, 100);

    if (pongVar > height / 2) {
      fill(map(pongVar, 0, height, 128, 255), (map(pongVar, 0, height, 64, 128)),
        random(64) + 64);
      text('CAUTION', txtsize, height - txtsize);
    }
    */
}

function pong() {
  if (pongVarbit == false) {
    if (pongVar > height) pongVarbit = !pongVarbit;
    if (pongVar <= height) {
      pongVar += HALF_PI;
    }
  } else {
    if (pongVar <= 0) pongVarbit = !pongVarbit;
    if (pongVar > 0) {
      pongVar -= HALF_PI;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
