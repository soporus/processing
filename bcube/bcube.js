let angle = 0;
const barWidth = 80.0;
// const barPadding = 8;
// let maxD;
const w = barWidth / 2;
let toggleSpin = false;
let spinType = 0;
let w2;
let startRot = true;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  w2 = windowWidth / 2;
  smooth(1);
  // maxD = dist(0, 0, 300, 300);
  // maxD = Math.hypot(0, 300);
  // maxD = w2;
  noFill();
  strokeWeight(4);
  frameRate(60)
}

function draw() {
  // rotateX(PI / 3);
  // rotateX(radians(map(mouseY, -height / 2, height / 2, 360, 0)));
  // rotateX(map(mouseY, -height / 2, height / 2, Math.PI, -Math.PI));
  rotateX(rotationX);
  rotateZ((angle / 10) * startRot);
  // rotateY(radians(map(mouseX, -width / 2, width / 2, 0, 360)));
  rotateY(map(mouseX, -width / 2, width / 2, Math.PI, -Math.PI));
  background(0);
  let offset = 0;
  for (let z = 0; z < height; z += w + barWidth) {
    for (let x = 0; x < width; x += w) {
      let d = dist(x, 0, width / 2, 0); // silky result
      // let d = Math.hypot(x * 1.0, width / 2.0); //gives odd result, why?
      // let d = Math.sqrt(x *  x + w2 * w2);
      // let offset = map(d, -maxD, maxD, -PI, PI);
      let offset = map(d, -w2, w2, -PI, PI);
      let a = angle + offset;
      let h = map(Math.sin(a), -1, 1, -windowHeight / 2, windowHeight / 2);
      let c = map(h, -windowHeight / 2, windowHeight / 2, 0, 255);
      stroke(c, map(c, 0, 255, 192, 0), c / 1.5 + (z / 2));

      if (toggleSpin === true) {
        switch (spinType) {
          case 0:
            push();
            rotateY(map(c, 0, 255, -Math.PI, Math.PI));
            box(x - (width / 2), h - offset * 20, x - (width / 2));
            pop();
            break;
          case 1:
            push();
            rotateZ(map(c, 0, 255, Math.PI, -Math.PI));
            box((h - (width / 2)), x - offset * 20, x - (width / 2));
            pop();
            break;
          case 2:
            push();
            rotateY(map(c, 0, 255, -Math.PI, Math.PI));
            box((h - (width / 2)), x * (offset / Math.log(x)), x - (width / 2));
            pop();
            break;
          default:
            break;
        }
      }
      if (toggleSpin === false) {
        switch (true) {
          case spinType === 0:
            box((x - (width / 2)), h - offset * 20, x - (width / 2));
            break;
          case spinType === 1:
            box((h - (width / 2)), x - offset * 20, x - (width / 2));
            break;
          case spinType === 2:
            box((h - (width / 2)), x * (offset / Math.log(x)), x - (width / 2));
            break;
          default:
            break;
        }
      }
      offset += a;
    }
  }
  angle -= 0.05;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  startRot = !startRot;
  toggleSpin = !toggleSpin;
  switch (spinType) {
    case 0:
      spinType = 1;
      break;
    case 1:
      spinType = 2;
      break;
    case 2:
      spinType = 0;
      break;
    default:
      break;
  }
  return false;
}
