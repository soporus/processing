let cols, rows;
let scaler = 96;
let w = 990;
let h = 2000;
let flying = 0.0;
let pongVar = 1.0;
let pongVarbit = false;

let terrain = [];
let Volume = new Tone.Volume(-24)

function setup() {
  noSmooth();
  cols = w / scaler;
  rows = h / scaler;
  createCanvas(windowWidth, windowHeight, WEBGL);
  terrain = [];
  oscArray = [];

  for (let j = 0; j < cols; j++) {
    terrain[j] = [];
    oscArray[j] = new Tone.Synth().chain(Volume, Tone.Master);
    oscArray[j].portamento = 0.03;
    oscArray[j].envelope = [1, 1, 1, 1];
    oscArray[j].triggerAttack();
  }

  frameRate(30);

  noFill();
  strokeWeight(8);
}

function draw() {
  background(255 - map(pongVar, 0, height, 0, 255), random(map(pongVar, 0,
    height,
    0, 17)) + 228 - map(pongVar, 0, height, 0, 228), random(map(pongVar, 0,
    height, 0, 63)) + 192 - map(pongVar, 0, height, 0, 192));
  stroke(map(pongVar, 0, height, 0, 255), random(map(pongVar, 0, height, 0, 64)) +
    0, random(64) + 64);

  //fill terrain values
  flying -= 0.01 + map(pongVar, 0, height, 0, 0.4);
  let yoff = flying;
  for (let y = 0; y < rows; y++) {
    let xoff = 0.0;
    for (let x = 0; x < cols; x++) {
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
  for (let y2 = 0; y2 < rows; y2++) {
    beginShape();
    for (let x2 = 0; x2 < cols; x2++) {
      vertex(x2 * scaler, y2 * scaler, terrain[x2][y2]);
      oscArray[x2].setNote(map(terrain[x2][y2], -80, 80, 20, 1000));
      vertex(x2 * scaler, (y2 + 1) * scaler, terrain[x2][y2 + 1]);
    }
    endShape(CLOSE);
  }
  pop();

  // stroke(map(pongVar, 0, height, 0, 255), random(map(pongVar, 0, height, 0, 64)),random(64) + 64);
}

function pong() {
  if (pongVarbit === false) {
    if (pongVar > height) {
      pongVarbit = !pongVarbit;
    }
    if (pongVar <= height) {
      pongVar += HALF_PI;
    }
  } else {
    if (pongVar <= 0) {
      pongVarbit = !pongVarbit;
    }
    if (pongVar > 0) {
      pongVar -= HALF_PI;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  frameRate(0);
}

function mouseReleased() {
  frameRate(30);
}
