var cols, rows;
var scaler = 48;
var w = 990;
var h = 2000;
var flying = 0.0;
var pongVar = 1.0;
var pongVarbit = false;

var terrain = [];
var rot = 0.0;

//sound stuff
var attackLevel = 0.01;
var releaseLevel = 0;

var attackTime = 0.6;
var decayTime = 0.4;
var susPercent = 0.2;
var releaseTime = 0.7;

var env;

function setup() {
  cols = w / scaler;
  rows = h / scaler;
  createCanvas(windowWidth, windowHeight, WEBGL);
  terrain = [];
  oscArray = [];
  reverb = new p5.Reverb();
  env = new p5.Env();
  env.setExp();
  env.setADSR(attackTime, decayTime, susPercent, releaseTime);
  env.setRange(attackLevel, releaseLevel);
  for (var j = 0; j < cols; j++) {
    terrain[j] = [];
    oscArray[j] = new p5.Oscillator();
    oscArray[j].setType('sine');
    oscArray[j].amp(env);
    oscArray[j].freq(0);
    oscArray[j].start();
    reverb.process(oscArray[j], 10, 2);
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
  flying -= 0.01 + map(pongVar, 0, height, 0, 0.4);
  var yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 0.0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -map(pongVar, 0, height, 0,
        1000), map(pongVar, 0, height, 0, random(map(pongVar, 0, height, 0,
        128)) + 1000));
      xoff += 0.01 + map(pongVar, 0, height, 0, 0.3);
    }
    yoff += 0.01 + map(pongVar, 0, height, 0, 0.3);
  }
  push();
  translate(-width / 2.1, -height - 200, -1000); //-height/1.3
  rotateY(radians(-30));
  pong();
  //print(terrain.length);
  for (var y2 = 0; y2 < rows - 1; y2++) {
    env.play();
    beginShape();
    for (var x2 = 0; x2 < cols - 1; x2++) {
      vertex(x2 * scaler, y2 * scaler, terrain[x2][y2]);
      oscArray[x2].freq(map(terrain[x2][y2], -80, 80, 20, 1000));
      //oscArray[x2].amp(map(y2, 0, rows, 0.00, 0.06));
      oscArray[x2].pan(map(terrain[x2][y2], -80, 80, -1, 1));
      vertex(x2 * scaler, (y2 + 1) * scaler, terrain[x2][y2 + 1]);
      //print(terrain[x2][y2]);
    }
    endShape(CLOSE);
  }
  pop();
  //print(pongVar);
  fill(0);
  strokeWeight(3);
  stroke(map(pongVar, 0, height, 0, 255), random(map(pongVar, 0, height, 0, 64)),
    random(64) + 64);
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
