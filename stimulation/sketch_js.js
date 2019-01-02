let img1, img2;
let u = false;
let v = false;
let boost = false;
let boostSpeed;
const scaler = 72;
const w = 1656;
const h = 1944;
const cols = w / scaler;
const rows = h / scaler;
const fps = 60;
let flying = 0.0;
let moonRotation = 0.0;
let terrain = [];

function preload() {
  img1 = loadImage("assets/fract-1.png");
  img2 = loadImage('assets/diff3.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  textureMode(NORMAL);
  terrain = [];
  for (let j = 0; j < cols; j++) {
    terrain[j] = [];
  }
  frameRate(fps);
  noStroke();
  noSmooth();
}

function draw() {
  boostSpeed = map(mouseY, 0, windowHeight, -3.2, 3.2);
  //terrain generation
  flying -= 0.01 * boostSpeed;
  let yoff = flying;
  for (let y = 0; y < rows; y++) {
    let xoff = 0.0;
    for (let x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -333, 333);
      xoff += 0.2;
    }
    yoff += 0.2;
  }
  background(0, random(16), map(terrain[0][0], -200, 433, 32, 0));
  push();
  rotateX(PI / 3);
  translate(-w / 2 + 30, -h / 2, -100);
  ambientLight(255, 0, 160);

  for (let y = 0; y < rows - 1; y++) {
    texture(img1);
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      vertex(x * scaler, y * scaler, terrain[x][y], u, !v);
      //glitch texture on click
      if (boost === true) {
        u = Math.random() < 0.5;
      }
      // u = !u;
      vertex(x * scaler, (y + 1) * scaler, terrain[x][y + 1], !u, v);
      // if (boost === true) {
      //   v = Math.random() < 0.5;
      // }
      // v = Math.random() < 0.5;
    }
    endShape(CLOSE);
  }
  pop();
  // moon?
  push();
  noStroke();
  ambientLight(0, random(64, 160), random(96, 160));
  translate(0, -1000, -2500);

  rotateZ(moonRotation -= 0.002);
  rotateX(moonRotation);
  rotateX(moonRotation);
  rotateY(moonRotation)
  texture(img2);
  sphere(width, 24, 24);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  boost = !boost;
  boostSpeed = map(mouseY, 0, windowHeight, -3.2, 3.2);
  return false;
}
