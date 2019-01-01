let img1, img2, img3, img4;
let u = false;
let v = false;
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
  flying -= 0.01;
  let yoff = flying;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
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
    //  . t f  f  t
    // u 0 1 0 1
    // v 0 0 1 1
    texture(img1);
    // switch (y % 2 === 1) {
    //   case (u === false && v === false):
    //     {
    //       texture(img1);
    //       u = !u; //true
    //       break;
    //     }
    //   case (u === true && v === false):
    //     {
    //       texture(img2);
    //       u = !u; //false
    //       v = !v //true
    //       break;
    //     }
    //   case (u === false && v === true):
    //     {
    //       texture(img3);
    //       u = !u; //true
    //       break;
    //     }
    //   case (u === true && v === true):
    //     {
    //       texture(img4);
    //       v = !v; //false
    //       break;
    //     }
    // }
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      vertex(x * scaler, y * scaler, terrain[x][y], !u, v);
      // u = !u;
      vertex(x * scaler, (y + 1) * scaler, terrain[x][y + 1], u, !v);
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
  rotateZ(flying / 10);
  rotateX(flying / 8);
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
  frameRate(0);
}

function mouseReleased() {
  frameRate(30);
}
