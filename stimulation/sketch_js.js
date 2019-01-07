// paraSight: parasite / line of sight
//ideas
// time economy.  time limit, sphere is full of time.  cube drains time
// time can be drained by cube gaining line of sight with sphere
// use back plane of cube for display for player
let img1, img2, img3, img4, img5, img6, img7;
let u = 0.0;
let v = 0.0;
let boost = false;
let boostSpeedX;
let boostSpeedY;
const scaler = 72;
const w = 1656;
const h = 1944;
const cols = w / scaler;
const rows = h / scaler;
const fps = 60;
let flyingY = 0.0;
let flyingX = 0.0;
let moonRotation = 0.0;
let terrain = [];
let swap = 1;
let ship;
let angle = 0;

function preload() {
  img7 = loadImage("assets/fract-1.png");
  img1 = loadImage('assets/diff-seq-1.jpg');
  img2 = loadImage('assets/diff-seq-2.jpg');
  img3 = loadImage('assets/diff-seq-3.jpg');
  img4 = loadImage('assets/diff-seq-4.jpg');
  img5 = loadImage('assets/diff-seq-5.jpg');
  img6 = loadImage('assets/diff-seq-6.jpg');
}

function setup() {
  // ship = new shipObject(33, 50, 25);
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

  u = v = Math.sin(angle);
  directionalLight(255, 255, 255, 0, 1, 1, -1);
  boostSpeedY = map(mouseY, 0, windowHeight, 3.2, -3.2);
  boostSpeedX = map(mouseX, 0, windowWidth, 3.2, -3.2);
  //terrain generation
  flyingY -= 0.01 * boostSpeedY;
  flyingX -= 0.01 * boostSpeedX;
  let yoff = flyingY;
  for (let y = 0; y < rows; y++) {
    let xoff = flyingX;
    for (let x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -333, 333);
      xoff += 0.2;
    }
    yoff += 0.2;
  }
  // background(random(16), map(terrain[0][0], -200, 433, 24, 0), 0);
  background(Math.floor(Math.random() * Math.floor(16)), map(terrain[0][0], -200, 433, 24, 0), 0);


  push();


  rotateX(PI / 3);
  translate(-w / 2, -h / 2, -100);
  // pointLight(32, 96, 255, 0, 0, h, 1000);
  ambientLight(228, 128, 228);
  ambientMaterial(255, 255, 255);

  for (let y = 0; y < rows - 1; y++) {
    texture(img1);
    // specularMaterial(128, 228, 255);
    // ambientMaterial(128, 228, 255);
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      vertex(x * scaler, y * scaler, terrain[x][y], u, -1 * v);
      //glitch texture on click
      if (boost === true) {
        u = Math.random() < 0.5;
      }
      vertex(x * scaler, (y + 1) * scaler, terrain[x][y + 1], -1 * u, v);
    }
    endShape(CLOSE);
  }
  angle += 0.005;
  // ship.display();
  pop();
  // moon?
  push();
  noStroke();
  translate(0, -1000, -2500);

  // rotateZ(moonRotation -= 0.002);
  rotateY(45);
  rotateX(moonRotation -= 0.002);
  // rotateX(moonRotation);

  switch (true) {
    case swap === 1:
      swap = 2;
      texture(img1);
      break;
    case swap === 2:
      swap = 3;
      texture(img2);
      break;
    case swap === 3:
      swap = 4;
      texture(img3);
      break;
    case swap === 4:
      swap = 5;
      texture(img4);
      break;
    case swap === 5:
      swap = 6;
      texture(img5);
      break;
    case swap === 6:
      swap = 1;
      texture(img6);
      break;
  }

  sphere(1000, 20, 20);

  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  boost = !boost;
  return false;
}
