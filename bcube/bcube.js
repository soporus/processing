let angle = 0;
const barWidth = 80;
const barPadding = 8;
let maxD;
const w = barWidth / 2;
let toggleSpin = false;
let spinType = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  maxD = dist(0, 0, 300, 300);
  noFill();
  strokeWeight(4);
}

function draw() {
  rotateX(PI / 3);
  rotateZ(angle / 10);
  background(0);
  let offset = 0;
  for (let z = 0; z < height; z += w + barWidth) {
    for (let x = 0; x < width; x += w) {
      let d = dist(x, 0, width / 2, 0);
      let offset = map(d, -maxD, maxD, -PI, PI);
      let a = angle + offset;
      let h = map(sin(a), -1, 1, -windowHeight / 2, windowHeight / 2);
      let c = map(h, -windowHeight / 2, windowHeight / 2, 0, 255);
      stroke(c, map(c, 0, 255, 192, 0), c / 1.5 + (z / 2));
      push();
      if (toggleSpin === true) {
        switch (true) {
          case spinType === 0:
            rotateX(PI / map(c, 0, 255, -45, 45));
            break;
          case spinType === 1:
            rotateY(PI / map(c, 0, 255, -45, 45));
            break;
          case spinType === 2:
            rotateZ(PI / map(c, 0, 255, -45, 45));
            break;
          default:
            break;
        }
      }
      box((x - (width / 2)), h - offset * 20, x - (width / 2));
      pop();
      offset += a;
    }
  }
  angle -= 0.05;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  toggleSpin = !toggleSpin;
  switch (true) {
    case spinType === 0:
      spinType = 1;
      break;
    case spinType === 1:
      spinType = 2;
      break;
    case spinType === 2:
      spinType = 0;
      break;
    default:
      break;
  }
  return false;
}
