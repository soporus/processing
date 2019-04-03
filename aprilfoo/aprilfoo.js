function setup() {
  const mainCanvas = createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  document.getElementById("export").style.visibility = "hidden";
  let vlfo, vlfo2, vlfo3 = 0;
  frameRate(60);
}

function draw() {
  vlfo = ~~map(Math.sin(frameCount / 23), -1, 1, 0, 255);
  vlfo2 = ~~map(Math.cos(frameCount / 29), -1, 1, 0, 255);
  vlfo3 = ~~map(Math.sin(frameCount / 31), -1, 1, 0, 255);
  background(vlfo3, vlfo2, vlfo);
  // rotateY(PI / 4);
  for (let a = 50; a < 150; a += 10) {
    strokeWeight(Math.sqrt(a * 3));
    rotateZ(frameCount * 0.005);
    push();
    // noFill();
    fill(a, 100 - a);
    // stroke(0, 255 - random(128), 255 - random(128));
    stroke(vlfo, vlfo3, vlfo2);
    translate((window.innerWidth / 2), (window.innerHeight / 2), 50 * -a);
    push();
    rotateY(frameCount * 0.005);
    translate((window.innerWidth) + (a - 25), a + 2 * log(a), -a * 3);
    rotateX(frameCount * 0.01);
    sphere(30 * a, 12, 12)
    pop();
    pop();
  }
}
