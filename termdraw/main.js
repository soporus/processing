// termdraw unicode ansi art editor in javascript
//shawn wilson 2019
// ▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
// ▛░▀░▀░▀░▜▄▛▔▏▕▔▜▕▏▛▔▏▕▔▜▄▛░▀░▀░▀░▜▏
// ▛░▀░▀░▀░▜▄▛▔▏▕▔▜▕▏▛▔▏▕▔▜▄▛░▀░▀░▀░▜▏
// ▏▁░▁░▁░▁▟▒░▔▁▁▔▟░░▙▔▁▁▔░▒▙▁░▁░▁░▁▕▏
// ▏░░░░▁◼▁◼▓▒▛░▔▟▔▏▕▔▙▔░▜▒▓◼▁◼▁░░░░▕▏
// ▏░░░▕▕▕▕▕▄▟▘▗▟▛▜▄▄▛▜▙▖▝▙▄▏▏▏▏▏░░░▕▏
// ▌▖▖▖▟▗▗▗▗░▛▏▟▄▖▖▖▗▗▗▄▙▕▜░▖▖▖▖▙▗▗▗▐▏
// ▏▏▏▏▏▟▁▁▁▁▙▛▀▀▛░▚▞░▜▀▀▜▟▁▁▁▁▙▕▕▕▕▕▏
// ▁▛▏▛▏░▛▀░▜▛▀░▀▌▚██▞▐▀░▀▜▛░▀▜░▕▜▕▜▁▏
// ▐▒▏▒▏▒▌◼░◼░◼░◼▌▐◼◼▌▐◼░◼░◼░◼▐▒▕▒▕▒▌
// ▔▙▏▙▏░▙▄░▟▙▄░◼▌▞██▚▐◼░▄▟▙░▄▟░▕▟▕▟▔▏
// ▏▏▏▏▏▜▔▔▔▔▛▙▄▄▙░▞▚░▟▄▄▟▜▔▔▔▔▛▕▕▕▕▕▏
// ▌▘▘▘▜▝▝▝▝░▙▏▜▀▘▘▘▝▝▝▀▛▕▟░▘▘▘▘▛▝▝▝▐▏
// ▏░░░▕▕▕▕▕▀▜▖▝▜▙▟▀▀▙▟▛▘▗▛▀▏▏▏▏▏░░░▕▏
// ▏░░░░▔◼▔◼▓▒▙░▁▜▁▏▕▁▛▁░▟▒▓◼▔◼▔░░░░▕▏
// ▏▔░▔░▔░▔▜▒░▁▔▔▁▜░░▛▁▔▔▁░▒▛▔░▔░▔░▔▕▏
// ▙░▄░▄░▄░▟▀▙▁▏▕▁▟▕▏▙▁▏▕▁▟▀▙░▄░▄░▄░▟▏
// ▙░▄░▄░▄░▟▀▙▁▏▕▁▟▕▏▙▁▏▕▁▟▀▙░▄░▄░▄░▟▏
// ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
// to do:
// rearrange palette, small blocks confused with double small block
// only 4 height blocks needed, only 3 of the width blocks needed
// add color array of same size of grid, consider 3rd array dimension
// add additional palettes
// add ability to save, dump grid to txt

let font;
const fontsize = 30;
const gapX = -fontsize * 0.35;
const gridX = fontsize + gapX;
const gapY = fontsize * 0.2;
const gridY = fontsize + gapY;
let mouse = new p5.Vector(0, 0);
let slot = 9;
let row = 0;
let brush = '\u2588';
let grid = [];

const blocks = [
  '\u2580', // top block
  '\u2594', // high thin
  '\u2581', // low thin
  '\u2584', // bottom block
  '\u2588', //full
  '\u25FC', // middle block
  '\u258C', //tall half left
  '\u258F', //tall thin left
  '\u2598', //small upper left
  '\u2596', //small low left
  '\u2597', //small low right
  '\u259d', //small upper right
  '\u2595', //tall thin right
  '\u2590', //tall half right
  '\u2593', // shade hi
  '\u2592', // shade med
  '\u2591', // shade low
  '\u2263' // 4 stripes

]
const blocks2 = [
  '\u2599', // L
  '\u259A', // tetris top left, bottom left
  '\u259B', // vert L
  '\u259C', // 7
  '\u259E', // tetris top right, bottom right
  '\u259F', // J
  '\u2510', // bottom left
  '\u2518', // top left
  '\u2524', // cross left
  '\u253c', // cross full
  '\u251C', // cross right
  '\u2514', // top right
  '\u250C', // bottom right
  '\u2500', // horizontal
  '\u2502', // vertical
  '\u2534', // top cross
  '\u252c', // bottom cross
  '\u00A0' // space
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
  rect(0, height - gridY * 2 - 4, 18 * gridX + 2, height); //clean this up
  noStroke();
  //draw the palette
  for (let i = 0; i < blocks.length; i++) {
    strokeWeight(1);
    if (row === 0) {
      i !== slot ? fill(128) : fill(228);
    } else {
      fill(96);
    } // highlight slot
    text(blocks[i], i * gridX + 2, height - (gridY * 2) - 2); // row 1
    if (row === 1) {
      i !== slot ? fill(128) : fill(228);
    } else {
      fill(96);
    }
    text(blocks2[i], i * gridX + 2, height - gridY - 2); //  row 2
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
  if ((mouseX < 18 * gridX + 2) &&
    (mouseY < height - gridY) &&
    (mouseY > height - gridY * 2 - 4)) {
    // console.log("blocks selected");
    row = 0;
    paletteSelect(row);
    console.log(blocks[slot]);
    brush = blocks[slot];
  }
  if ((mouseX < 18 * gridX + 2) &&
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
      console.log("slot 16");
      break;
    case mouseX > gridX * 17 && mouseX < gridX * 18:
      slot = 17;
      row === 0 ? console.log("slot 17") : console.log("eraser");
      break;
    default:
      console.log(mouseX, '\t', mouseY);
      break;
  }
}
