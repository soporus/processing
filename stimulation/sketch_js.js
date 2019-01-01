let img1, img2, img3, img4;
let u = false;
let v = false;
let Boost = false;
let BoostSpeed = 1.0;
const scaler = 72;
const w = 1656;
const h = 1944;
const cols = w / scaler;
const rows = h / scaler;
const fps = 30;

// const ramptime = 1.0 / fps;

let flying = 0.0;
// let pongVar = 1.0;
// let pongVarbit = false;
let terrain = [];

function setup() {
  img1 = loadImage("assets/fract-1.png");
  // img2 = loadImage("assets/fract-2.png");
  // img3 = loadImage("assets/fract-3.png");
  // img4 = loadImage("assets/moon_map_mercator.jpg");
  // img4 = loadImage("assets/enceladus_map-lo.jpg");
  img4 = loadImage("assets/europa-map.jpg");


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
  //terrain generation
  flying -= 0.01 * BoostSpeed;
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
  ambientLight(192, 0, 128);

  for (let y = 0; y < rows - 1; y++) {
    texture(img1);

    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      vertex(x * scaler, y * scaler, terrain[x][y], !u, v);
      // if (Boost === true) {
      //   u = Math.random() < 0.5;
      // }
      // u = !u;
      vertex(x * scaler, (y + 1) * scaler, terrain[x][y + 1], u, !v);
      // if (Boost === true) {
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
  ambientLight(0, 192, 228);
  translate(0, -700, -2500);

  rotateZ(flying / 8);
  rotateX(flying / 4);

  texture(img4);
  sphere(width);
  pop();
}

// function pong() {
//   if (pongVarbit === false) {
//     if (pongVar > height) {
//       pongVarbit = !pongVarbit;
//     }
//     if (pongVar <= height) {
//       pongVar += HALF_PI;
//     }
//   } else {
//     if (pongVar <= 0) {
//       pongVarbit = !pongVarbit;
//     }
//     if (pongVar > 0) {
//       pongVar -= HALF_PI;
//     }
//   }
// }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  // frameRate(60);
  Boost = true;
  if (mouseY > width / 2) {
    BoostSpeed = 3.2;
  } else BoostSpeed = -3.2;
}

function mouseReleased() {
  // frameRate(30);
  Boost = false;
  BoostSpeed = 1.0;

}
