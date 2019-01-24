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
// palettes 2 -3 pin down the useful drawing chars for these
// add color array of same size of grid, consider 3rd array dimension
// add ability to save, dump grid to txt
// breaks on resize

let font;
const fontsize = 30;
const gapX = -fontsize * 0.35;
const gridX = fontsize + gapX;
const gapY = fontsize * 0.2;
const gridY = fontsize + gapY;
let mouse = new p5.Vector(0, 0);
let slot = 5;
let row = 0;
let brush = '\u2588';
let grid = [];
let pOffset = 0;
let rowA = 0;
let rowB = 1;

const arrows = ['\u25b2', '\u25bc']

const blocks = [
  [
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
  '\u0020' // space
], [
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
  '\u0020' // space
], [
  '\u25a0', // box arrow
  '\u25a1', // box arrow
  '\u25a3', // box arrow
  '\u25a4', // box arrow
  '\u25a5', // box arrow
  '\u25a6', // box arrow
  '\u25a7', // box arrow
  '\u25a8', // box arrow
  '\u25a9', // box arrow
  '\u25f0', // box arrow
  '\u25f1', // box arrow
  '\u25f2', // box arrow
  '\u25f3', // box arrow
  '\u25c0', // box arrow
  '\u25b2', // box arrow
  '\u25bc', // box arrow
  '\u25b6', // box arrow
  '\u0020' // space
], [
  '\u2b12', // triangle
  '\u2b13', // triangle
  '\u25e7', // triangle
  '\u25e8', // triangle
  '\u2b14', // triangle
  '\u2b15', // triangle
  '\u25ea', // triangle
  '\u25e9', // triangle
  '\u25e2', // triangle
  '\u25e3', // triangle
  '\u25e5', // triangle
  '\u25e4', // triangle
  '\u271b', // triangle
  '\u2725', // triangle
  '\u2731', // triangle
  '\u2733', // triangle
  '\u273a', // triangle
  '\u0020' // space
]];

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
      grid[x][y] = '\u0020';
    }
  }
  // background(0);
  noLoop();
  // Set text characteristics
  textFont(font);
  textSize(fontsize);
  textAlign(LEFT, TOP);
  // fill(128, 192, 255);
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
  fill(0);
  rect(19 * gridX - 3, height - gridY * 2 - 4, (19 * gridX) + gridX + 1, height);
  noStroke();
  // noFill();
  //draw the palette
  for (let i = 0; i < 18; i++) {
    if (row === 0) {
      i !== slot ? fill(128) : fill(228);
    } else fill(128);
    // highlight slot
    text(blocks[rowA][i], i * gridX + 2, height - (gridY * 2) - 2); // row 1
    row === 2 ? fill(228) : fill(128);
    i === 17 ? text(arrows[0], (2 + i) * gridX, height - (gridY * 2) - 2) : false; //palette up
    if (row === 1) {
      i !== slot ? fill(128) : fill(228);
    } else fill(128);
    text(blocks[rowB][i], i * gridX + 2, height - gridY - 2); //  row 2
    row === 3 ? fill(228) : fill(128);
    i === 17 ? text(arrows[1], (2 + i) * gridX, height - gridY - 2) : false; // palette down
    // set the text color again
    fill(255, 255, 255);
  }
}

function mousePressed() {
  paletteShift();
  paletteBox();
  redraw();
  grid[int(mouse.x / gridX)][int(mouse.y / gridY)] = brush;
  redraw();
  // disp();
  return false;
}

function mouseDragged() {
  // paletteShift();
  paletteBox();
  redraw();
  grid[int(mouse.x / gridX)][int(mouse.y / gridY)] = brush;
  redraw();
  return false;
}

function paletteShift() {
  if ((mouseX > 19 * gridX) &&
    (mouseX < 20 * gridX) &&
    (mouseY < height - gridY) &&
    (mouseY > height - gridY * 2 - 4)) {
    row = 2;
    rowA > 0 ? rowA -= 1 : rowA = 3;
    rowB > 0 ? rowB -= 1 : rowB = 3;
    console.log("pallete switched up\t", rowA, '\t', rowB);
  }
  if ((mouseX > 19 * gridX) &&
    (mouseX < 20 * gridX) &&
    (mouseY < height) &&
    (mouseY > height - gridY)) {
    row = 3;
    rowA < 3 ? rowA += 1 : rowA = 0;
    rowB < 3 ? rowB += 1 : rowB = 0;
    console.log("pallete switched down\t", rowA, '\t', rowB);
  }
}

function paletteBox() {
  if ((mouseX < 18 * gridX + 2) &&
    (mouseY < height - gridY) &&
    (mouseY > height - gridY * 2 - 4)) {
    row = 0;
    paletteSelect(row);
    console.log(blocks[rowA][slot]);
    brush = blocks[rowA][slot];
  }
  if ((mouseX < 18 * gridX + 2) &&
    (mouseY < height) &&
    (mouseY > height - gridY)) {
    row = 1;
    paletteSelect(row);
    console.log(blocks[rowB][slot]);
    brush = blocks[rowB][slot];
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

function disp() {
  my_window = window.open("termdraw", "myWindow1", "height=\height,width=\width");

  for (let y = 0; y < int(windowHeight / gridY); y += 1) {
    for (let x = 0; x < int(windowWidth / gridX); x += 1) {
      (grid[x][y] === '\u0020') ? my_window.document.write('\&nbsp'): my_window.document.write(grid[x][y]);
    }
    my_window.document.write('\<br\>');
  }
}

function keyPressed() {
  if (keyCode === 83) disp();
  // return false; // prevent default
}
