let angle = 0;
const barWidth = 80;
const barPadding = 8;
let ma;
let maxD;
const w = barWidth / 2;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  ma = atan(cos(QUARTER_PI));
  maxD = dist(0, 0, 300, 300);
  noFill();
  strokeWeight(4)
  stroke(255, 0, 255);
  // normalMaterial();
}

function draw() {
  // directionalLight(255, 0, 192, -1, 0, -1);
  // directionalLight(0, 192, 255, 1, 0, -1);
  // ortho(-windowWidth, windowHeight, windowWidth, -windowHeight, 0, 1000);
  rotateX(PI / 3);
  rotateZ(angle / 10);
  // rotateY(-QUARTER_PI);
  background(0);
  // fill(255);
  let offset = 0;
  for (let z = 0; z < height; z += w + barPadding) {
    for (let x = 0; x < width; x += w) {
      let d = dist(x, 0, width / 2, 0);
      let offset = map(d, -maxD, maxD, -PI, PI);
      let a = angle + offset;
      let h = map(sin(a), -1, 1, -windowHeight / 2, windowHeight / 2);
      let c = map(h, -windowHeight / 2, windowHeight / 2, 0, 255);
      stroke(c, map(c, 0, 255, 192, 0), c / 1.5 + (z / 2));
      box((x - (width / 2)) + (w / 2), h - offset * 20, x - (width / 2) + (w / 2) - w);
      // cylinder((x - (width / 2)) + (w / 2), (h - offset * 20) - w)
      offset += a;
    }
  }
  angle -= 0.05;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
