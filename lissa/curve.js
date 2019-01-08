class Curve {
  constructor() {
    this.path = [];
    this.current = createVector();
    this.curveColor = color(128, 128, 128);
  }

  setX(x) {
    this.current.x = x;
  }
  setY(y) {
    this.current.y = y;
  }
  addPoint() {
    this.path.push(this.current);
  }

  reset() {
    this.path = [];
  }

  //    setColor(color1, color2) {
  //      this.curveColor = lerpColor(this.color1,this.color2,0.66);
  //    }

  show() {
    strokeWeight(2);
    stroke(this.curveColor);
    noFill();
    beginShape();
    for (let v of this.path) {
      vertex(v.x, v.y);
    }
    endShape();

    strokeWeight(6);
    point(this.current.x, this.current.y);
    this.current = createVector();
  }
}
