/*
var myFont;

function preload() {
  // Ensure the .ttf or .otf font stored in the assets directory
  // is loaded before setup() and draw() are called
  myFont = loadFont("assets/centuryGoth.otf");
}
var txtsize = 30;
*/
var cols, rows;
var scaler = 30;
var w = 990;
var h = 2000;
//var r,g,b;
var flying = 0.0;
var lightX = 1.0;
var lightY = 1.0;
var lightXbit = false;
var lightYbit = false;

var terrain = [];
var rot = 0.0;

function setup() {
  /*
  textFont(myFont);
  textSize(txtsize);
  */
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
  background(255 - map(lightY, 0, height, 0, 255), random(map(lightY, 0, height,
    0, 17)) + 228 - map(lightY, 0, height, 0, 228), random(map(lightY, 0,
    height, 0, 63)) + 192 - map(lightY, 0, height, 0, 192));
  stroke(map(lightY, 0, height, 0, 255), random(map(lightY, 0, height, 0, 64)) +
    0, random(64) + 64);
  //fill terrain values
  flying -= 0.1 + map(lightY, 0, height, 0, 0.4);
  var yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 0.0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -map(lightY, 0, height, 0,
        1000), map(lightY, 0, height, 0, random(map(lightY, 0, height, 0,
        128)) + 1000));
      xoff += 0.1 + map(lightY, 0, height, 0, 0.4);
    }
    yoff += 0.1 + map(lightY, 0, height, 0, 0.4);
  }
  push();
  translate(-width / 3, -height - 220, -1000); //-height/1.3
  rotateY(radians(-30));
  moveLight();
  //print(terrain.length);
  for (var y = 0; y < rows - 1; ++y) {
    beginShape();
    for (var x = 0; x < cols - 1; ++x) {
      vertex(x * scaler, y * scaler, terrain[x][y]);
      vertex(x * scaler, (y + 1) * scaler, terrain[x][y + 1]);
    }
    endShape(CLOSE);
  }
  pop();
  fill(map(lightY, 0, height, 0, 255), random(map(lightY, 0, height, 0, 64)),
    random(64) + 64);
  /*
  textAlign(RIGHT);
  text(lightY, txtsize * 4.75, height - txtsize * 3);
  textAlign(LEFT);
  text("STIMULATION", txtsize, windowHeight - txtsize * 2);
  if (lightY > height / 2) {
    fill(map(lightY, 0, height, 128, 255), (map(lightY, 0, height, 64, 128)),
      random(64) + 64);
    text('CAUTION', txtsize, height - txtsize);
  }
  */
}

function moveLight() {
  if (lightXbit == false) {
    if (lightX > width) lightXbit = !lightXbit;
    if (lightX <= width) {
      lightX += 3;
    }
  } else {
    if (lightX <= 0) lightXbit = !lightXbit;
    if (lightX > 0) {
      lightX -= 3;
    }
  }
  if (lightYbit == false) {
    if (lightY > height) lightYbit = !lightYbit;
    if (lightY <= height) {
      lightY += HALF_PI;
    }
  } else {
    if (lightY <= 0) lightYbit = !lightYbit;
    if (lightY > 0) {
      lightY -= HALF_PI;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
