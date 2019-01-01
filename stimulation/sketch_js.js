let img1, img2, img3, img4;
let u = false;
let v = false;
let uu = true;
let vv = true;
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
// const time = new Tone.Time();
let terrain = [];
// const Volume = new Tone.Volume(-24)
//just intoned C Dorian : c, d, d#, f, g, a, a#
// const baseFreq = [1, 1.2000000, 1.3333333, 1.6666667, 2.0000000, 2.4000000, 2.6666667, 3.6000000, 4.5000000,
//   5.3333333, 6.6666667];

function setup() {
  // img1 = loadImage("assets/blue-perlin8.png");
  // img2 = loadImage("assets/blue-perlin16.png");
  // img3 = loadImage("assets/blue-perlin36.png");
  // img4 = loadImage("assets/blue-perlin48.png");
  // img1 = loadImage("assets/terrain-1.png");
  // img2 = loadImage("assets/terrain-2.png");
  // img3 = loadImage("assets/terrain-3.png");
  // img4 = loadImage("assets/terrain-4.png");
  // img1 = loadImage("assets/texture-1.png");
  // img2 = loadImage("assets/texture-2.png");
  // img3 = loadImage("assets/texture-3.png");
  // img4 = loadImage("assets/texture-4.png");
  img1 = loadImage("assets/turb-1.png");
  img2 = loadImage("assets/turb-2.png");
  img3 = loadImage("assets/turb-3.png");
  img4 = loadImage("assets/turb-4.png");
  noSmooth();
  createCanvas(windowWidth, windowHeight, WEBGL);
  textureMode(NORMAL);
  terrain = [];
  // oscArray = [];

  for (let j = 0; j < cols; j++) {
    terrain[j] = [];
    // oscArray[j] = new Tone.Oscillator().chain(Volume, Tone.Master);
    // oscArray[j].sync();
    // oscArray[j].start();
    // oscArray[j].portamento = 0.03333333333;
    // oscArray[j].envelope = [1, 1, 1, 1];
    // oscArray[j].triggerAttack();
  }

  frameRate(fps);
  noStroke();
  // strokeWeight(3);
  // Tone.Transport.latencyHint = 'playback';
  // Tone.Transport.start();
  // stroke(255, 0, 128);
}

function draw() {
  background(0);

  // background(255 - map(pongVar, 0, height, 0, 255), random(map(pongVar, 0,
  //   height,
  //   0, 17)) + 228 - map(pongVar, 0, height, 0, 228), random(map(pongVar, 0,
  //   height, 0, 63)) + 192 - map(pongVar, 0, height, 0, 192));
  // stroke(map(pongVar, 0, height, 0, 255), random(map(pongVar, 0, height, 0, 64)) +
  //   0, random(64) + 64);

  //fill terrain values
  // flying -= 0.001 + map(pongVar, 0, height, 0, 0.4);
  flying -= 0.01;
  let yoff = flying;
  // with random variance that increases/decreases
  // for (let y = 0; y < rows; y++) {
  //   let xoff = 0.0;
  //   for (let x = 0; x < cols; x++) {
  //     terrain[x][y] = map(noise(xoff, yoff), 0, 1, -map(pongVar, 0, height, 0,
  //       1000), map(pongVar, 0, height, 0, random(map(pongVar, 0, height, 0,
  //       128)) + 1000));
  //     xoff += 0.01 + map(pongVar, 0, height, 0, 0.3);
  //   }
  //   yoff += 0.01 + map(pongVar, 0, height, 0, 0.3);
  // }
  //no modulated variance
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 333);
      xoff += 0.1;
    }
    yoff += 0.1;
  }
  background(32, map(terrain[0][0], -100, 333, 32, 0), 0);
  // ambientLight(60, 60, 60);
  push();
  // translate(-width / 2.1, -height - 200, -1000);
  // translate(-width / 1.5, -height / 2, -50); //-height/1.3
  // rotateY(radians(-45));
  // rotateX(radians(5));
  // pong();
  // translate(0, 50);
  rotateX(PI / 3);
  translate(-w / 2 + 30, -h / 2, -100);
  let dirY = (mouseY / height - 0.5) * 4;
  let dirX = (mouseX / width - 0.5) * 4;
  ambientLight(128, 0, 255);
  specularMaterial(250);

  for (let y = 0; y < rows - 1; y++) {
    //  . t f  f  t
    // u 0 1 0 1
    // v 0 0 1 1
    if (u === false && v === false) {
      texture(img1);
    }
    if (u === true && v === false) {
      texture(img2);
    }
    if (u === false && v === true) {
      texture(img3);
    }
    if (u === true && v === true) {
      texture(img4);
    }
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      // let b = map(terrain[x][y], -100, 333, 16, 0);
      // stroke(0, b * 12, b * 16);
      vertex(x * scaler, y * scaler, terrain[x][y], uu, !vv);
      // uu = !uu;
      // a = baseFreq[x] * map(terrain[x][y], -100, 1000, 20, 1000);
      // oscArray[x].setNote(map(terrain[x][y], -300, 1000, int(baseFreq[x] * 60.0), int(baseFreq[x] *
      //   1200.0)));
      // oscArray[x].frequency.exponentialRampToValueAtTime(a, time + ramptime);
      // b = map(terrain[x][y + 1], -100, 333, 0, 16);
      // fill(b * 2, b * 8, b * 16);
      vertex(x * scaler, (y + 1) * scaler, terrain[x][y + 1], uu, vv);
      // vv = !vv;
      //  . t f  f  t
      // u 0 1 0 1
      // v 0 0 1 1
      let bully = false;
      if (
        bully === false && u === false && v === false) {
        u = !u; //true
        bully = !
          bully;
      }
      if (
        bully === false && u === true && v === false) {
        u = !u; //false
        v = !v //true
        bully = !
          bully;
      }
      if (
        bully === false && u === false && v === true) {
        u = !u; //true
        bully = !
          bully;
      }
      if (
        bully === false && u === true && v === true) {
        v = !v; //false
        bully = !
          bully;
      }
      bully = !
        bully;
    }

    endShape(CLOSE);
  }
  pop();

  // stroke(map(pongVar, 0, height, 0, 255), random(map(pongVar, 0, height, 0, 64)),random(64) + 64);
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
