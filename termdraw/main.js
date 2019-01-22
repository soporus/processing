// remove numbers?  to allow for larger palette
let font;
const fontsize = 30;
const gapX = -fontsize * 0.35;
const gridX = fontsize + gapX;
const gapY = fontsize * 0.2;
const gridY = fontsize + gapY;
let mouse = new p5.Vector(0, 0);
let slot = 8;
let row = 0;
let brush = '\u2588';
let grid = [];

const blocks = [
  '\u25FC',
  '\u2580',
  '\u2581',
  '\u2582',
  '\u2583',
  '\u2584',
  '\u2585',
  '\u2586',
  '\u2587',
  '\u2588',
  '\u2589',
  '\u258A',
  '\u258B',
  '\u258C',
  '\u258D',
  '\u258E',
  '\u258F',
]
const blocks2 = [
  '\u2590',
  '\u2591',
  '\u2592',
  '\u2593',
  '\u2594',
  '\u2595',
  '\u2596',
  '\u2597',
  '\u2598',
  '\u2599',
  '\u259A',
  '\u259B',
  '\u259C',
  '\u259D',
  '\u259E',
  '\u259F',
  '\u00A0',
]

function preload() {
  font = loadFont("assets/DejaVuSansMono.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // build canvas array.  2D, must be grid of width/gridx height/gridy
  for (let x = 0; x < int(windowWidth / gridX); x++) {
    grid[x] = [int(windowHeight / gridY)];
  }
  for (let x = 0; x < int(windowWidth / gridX); x += 1) {
    for (let y = 0; y < int(windowHeight / gridY); y += 1) {
      grid[x][y] = ' ';
    }
  }
  background(0);
  noLoop();
  // Set text characteristics
  textFont(font);
  textSize(fontsize);
  textAlign(LEFT, TOP);
  fill(0, 192, 255);
  rectMode(CORNERS);
}

function draw() {
  background(0);
  mouse.x = int(mouseX / gridX) * gridX;
  mouse.y = int(mouseY / gridY) * gridY;
  // draw the art, from the grid array
  for (let x = 0; x < int(windowWidth / gridX); x += 1) {
    for (let y = 0; y < int(windowHeight / gridY); y += 1) {
      text(grid[x][y], x * gridX, y * gridY);
    }
  }
  // background for palette (black rectangle)
  fill(0);
  strokeWeight(2);
  stroke(64);
  // rect x, y, width, height
  rect(0, height - gridY * 2 - 4, 17 * gridX + 2, height); //clean this up
  noStroke();
  //draw the palette
  for (let i = 0; i < blocks.length; i++) {
    if (row === 0) {
      i !== slot ? fill(128) : fill(228);
    } else {
      fill(64);
    } // highlight slot
    text(blocks[i], i * gridX, height - (gridY * 2)); // row 1
    if (row === 1) {
      i !== slot ? fill(128) : fill(228);
    } else {
      fill(64);
    }
    text(blocks2[i], i * gridX, height - gridY); //  row 2
  }
  // set the text color again
  fill(0, 192, 255);
}

function mousePressed() {
  paletteBox();
  redraw();
  grid[int(mouse.x / gridX)][int(mouse.y / gridY)] = brush;
  redraw();
  return false;
}

function mouseDragged() {
  paletteBox();
  redraw();
  grid[int(mouse.x / gridX)][int(mouse.y / gridY)] = brush;
  redraw();
  return false;
}

function paletteBox() {
  if ((mouseX < 17 * gridX + 2) &&
    (mouseY < height - gridY) &&
    (mouseY > height - gridY * 2 - 4)) {
    // console.log("blocks selected");
    row = 0;
    paletteSelect(row);
    console.log(blocks[slot]);
    brush = blocks[slot];
  }
  if ((mouseX < 17 * gridX + 2) &&
    (mouseY < height) &&
    (mouseY > height - gridY)) {
    // console.log("blocks2 selected");
    row = 1;
    paletteSelect(row);
    console.log(blocks2[slot]);
    brush = blocks2[slot];
  }
}

let paletteSelect = function(row) {
  switch (true) {
    case mouseX < gridX:
      slot = 0;
      console.log("slot 0");
      break;
    case mouseX > gridX && mouseX < gridX * 2:
      slot = 1;
      console.log("slot 1");
      break;
    case mouseX > gridX * 2 && mouseX < gridX * 3:
      slot = 2;
      console.log("slot 2");
      break;
    case mouseX > gridX * 3 && mouseX < gridX * 4:
      slot = 3;
      console.log("slot 3");
      break;
    case mouseX > gridX * 4 && mouseX < gridX * 5:
      slot = 4;
      console.log("slot 4");
      break;
    case mouseX > gridX * 5 && mouseX < gridX * 6:
      slot = 5;
      console.log("slot 5");
      break;
    case mouseX > gridX * 6 && mouseX < gridX * 7:
      slot = 6;
      console.log("slot 6");
      break;
    case mouseX > gridX * 7 && mouseX < gridX * 8:
      slot = 7;
      console.log("slot 7");
      break;
    case mouseX > gridX * 8 && mouseX < gridX * 9:
      slot = 8;
      console.log("slot 8");
      break;
    case mouseX > gridX * 9 && mouseX < gridX * 10:
      slot = 9;
      console.log("slot 9");
      break;
    case mouseX > gridX * 10 && mouseX < gridX * 11:
      slot = 10;
      console.log("slot 10");
      break;
    case mouseX > gridX * 11 && mouseX < gridX * 12:
      slot = 11;
      console.log("slot 11");
      break;
    case mouseX > gridX * 12 && mouseX < gridX * 13:
      slot = 12;
      console.log("slot 12");
      break;
    case mouseX > gridX * 13 && mouseX < gridX * 14:
      slot = 13;
      console.log("slot 13");
      break;
    case mouseX > gridX * 14 && mouseX < gridX * 15:
      slot = 14;
      console.log("slot 14");
      break;
    case mouseX > gridX * 15 && mouseX < gridX * 16:
      slot = 15;
      console.log("slot 15");
      break;
    case mouseX > gridX * 16 && mouseX < gridX * 17:
      slot = 16;
      row === 0 ? console.log("slot 16") : console.log("eraser");
      break;
    default:
      console.log(mouseX, '\t', mouseY);
      break;
  }
}
