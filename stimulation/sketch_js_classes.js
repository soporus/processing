class shipObject {
  constructor(shipwidth, shipheight, shipdepth) {
    this.width = shipwidth;
    this.height = shipheight;
    this.depth = shipdepth;

    // SPACESHIP
    this.display = function() {
      texture(img6);
      translate(w / 2, 1000, terrain[12][14] + 25);

      // box(33, 50, 25);
      // box(this.width, this.height, this.depth);
      specularMaterial(96, 255, 255)
        //custom shape
      scale(50);
      // rotateZ(20);
      beginShape();
      //top horizontal
      vertex(-1, -1, 1); // +z top left p1
      vertex(1, -1, 1); // +z top right p2
      vertex(1, 1, 1); // +z bottom right p4
      vertex(-1, 1, 1); // +z bottom left p3
      //east facing vertical side
      vertex(1, 1, 1); // +x top front -> bottom right
      vertex(1, 1, -1); // +x bottom front
      vertex(1, -1, -1); // +x bottom back
      vertex(1, -1, 1); // +x top back -> top right
      //north facing vertical side
      vertex(1, -1, 1); // -y top right
      vertex(-1, -1, 1); // -y top left
      vertex(-1, -1, -1); // -y bottom left
      vertex(1, -1, -1); // -y bottom right
      //bottom horizontal
      vertex(1, -1, -1); // -z back right
      vertex(1, 1, -1); // -z front right
      vertex(-1, 1, -1); // -z front left
      vertex(-1, -1, -1); // -z back left
      // west facing vertical side
      vertex(-1, -1, -1) // -x back bottom
      vertex(-1, -1, 1) // -x back top
      vertex(-1, 1, 1) // -x front top
      vertex(-1, 1, -1) // -x front bottom
        //south facing vertical side
      vertex(-1, 1, -1); // +y bottom left
      vertex(1, 1, -1); // +y bottom right
      vertex(1, 1, 1); // +y top right
      vertex(-1, 1, 1); // +y top left
      endShape(CLOSE);
      //corners
      // this.p1=terrain[11-1][14+1] + 25; //top left
      // this.p2=terrain[11+1][14+1] + 25; //top right
      // this.p3=terrain[11-1][14-1] + 25; //bottom left
      // this.p4=terrain[11+1][14-1] + 25; //bottom right
      // this.rotate(this.p1,this.p2,this.p3,this.p4);
    }
    this.rotate = function(p1, p2, p3, p4) {
      // north
      //south
      //west
      //east
      //x axis rotation
      //p1
      //rotateX(    )
    }
  }
}
