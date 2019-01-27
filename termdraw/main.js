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
//
// palettes 2 -3 pin down the useful drawing chars for these
// add color array of same size of grid, consider 3rd array dimension
// add ability to save, dump grid to txt
// breaks on resize
let fontsize;
let gapX = 0;
let gridX = 0;
let gapY = 0;
let gridY = 0;
let font;
// let mouse = new p5.Vector(0.0, 0.0);
let slot = 4;
let row = 0;
let brush = '\u2588';
let grid = [];
// let pOffset = 0;
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
  '\u00a0' // space
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
  '\u00a0' // space
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
  '\u00a0' // space
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
  '\u00a0' // space
]];

function preload() {
  font = loadFont("assets/DejaVuSansMono.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // fontsize = windowHeight / 28;
  fontsize = (windowHeight >> 6) * 2.75;
  console.log(windowHeight >> 6);
  // gapX = -fontsize * 0.35;
  gapX = -fontsize >> 2;
  // gapX = -8;
  gridX = fontsize + gapX - 2;
  // gridX = 16;
  // gapY = fontsize * 0.2;
  gapY = fontsize >> 2;
  gridY = fontsize + gapY - 2;
  // gridY = 30;
  hLimit = ~~(windowHeight / gridY);
  wLimit = ~~(windowWidth / gridX);
  // build canvas array.  2D, must be grid of width/gridx height/gridy
  for (let x = 0; x < wLimit; x++) {
    grid[x] = [hLimit];
  }
  for (let x = 0; x < wLimit; x += 1) {
    for (let y = 0; y < hLimit; y += 1) {
      grid[x][y] = '\u00a0';
    }
  }
  noLoop();
  // Set text characteristics
  textFont(font);
  textSize(fontsize);
  textAlign(LEFT, TOP);
  rectMode(CORNERS);
}

function draw() {
  background(0);
  // draw the art, from the grid array.
  for (let x = 0; x < wLimit; ++x) {
    for (let y = 0; y < hLimit; ++y) {
      text(grid[x][y], x * gridX, y * gridY);
    }
  }
  // console.log('font size: ', fontsize, '\ngridX: ', gridX, '\tgridY: ', gridY,
  //   '\ngapX: ', gapX, '\tgapY: ', gapY);
  // background for palette (dark blue rectangle)
  fill(0, 16, 32);
  strokeWeight(2);
  stroke(64);
  // rect x, y, width, height
  rect(0, height - gridY * 2 - 4, 18 * gridX + 2, height); //clean this up
  fill(0, 16, 32);
  rect(19 * gridX - 3, height - gridY * 2 - 4, (19 * gridX) + gridX + 1, height);
  noStroke();
  //draw the palette
  for (let i = 0; i < 18; ++i) {
    if (row === 0) {
      i !== slot ? fill(128) : fill(228);
    } else fill(128);
    // highlight slot
    text(blocks[rowA][i], i * gridX, height - (gridY * 2) - 2); // row 1
    row === 2 ? fill(228) : fill(128);
    i === 17 ? text(arrows[0], (2 + i) * gridX, height - (gridY * 2) - 2) : false; //palette up
    if (row === 1) {
      i !== slot ? fill(128) : fill(228);
    } else fill(128);
    text(blocks[rowB][i], i * gridX, height - gridY - 2); //  row 2
    row === 3 ? fill(228) : fill(128);
    i === 17 ? text(arrows[1], (2 + i) * gridX, height - gridY - 2) : false; // palette down
  }
  fill(192, 160, 192);
  text('\u23CF', width - (gridX + 2), 0);
  fill(255);
}

function mousePressed() {
  eject();
  if (!paletteShift()) {
    if (!paletteBox()) {
      if (mouseX > 0) {
        if (mouseY > 0) {
          if (mouseY < gridY * 19) {
            if (mouseX < width - gridX * 1.5) {
              grid[~~(mouseX / gridX)][~~(mouseY / gridY)] = brush;
              return redraw();
            }
          }
        }
      }
    }
  }
  redraw();
  return false;
}

function mouseDragged() {
  if (!paletteBox()) {
    if (mouseX > 0) {
      if (mouseY > 0) {
        if (mouseY < gridY * 19) {
          if (mouseX < width - gridX * 1.5) {
            grid[~~(mouseX / gridX)][~~(mouseY / gridY)] = brush;
            return redraw();
          }
        }
      }
    }
  }
  return false;
}

const eject = function() {
  if (mouseX >= width - (gridX)) {
    if (mouseY <= gridY && mouseX < width) {
      disp();
    }
  }
}

const paletteShift = function() {
  if (mouseY > height - gridY * 2) {
    if (mouseX > 19 * gridX) {
      if (mouseX < 20 * gridX) {
        if (mouseY < height - gridY) {
          row = 2;
          rowA > 0 ? rowA -= 1 : rowA = 3;
          rowB > 0 ? rowB -= 1 : rowB = 3;
          return true;
        } else {
          row = 3;
          rowA < 3 ? rowA += 1 : rowA = 0;
          rowB < 3 ? rowB += 1 : rowB = 0;
          return true;
        }
      }
    }
  }
  return false;
}
const paletteBox = function() {
  if (mouseX < 18 * gridX) {
    if (mouseY < height - gridY) {
      if (mouseY > height - gridY * 2 - 4) {
        row = 0;
        paletteSelect(row);
        brush = blocks[rowA][slot];
        return true;
      }
    }
    if (mouseY < height) {
      if (mouseY > height - gridY) {
        row = 1;
        paletteSelect(row);
        brush = blocks[rowB][slot];
        return true;
      }
    }
  }
  return false
}
const paletteSelect = function(row) {
  switch (true) {
    case mouseX < gridX:
      slot = 0;
      break;
    case mouseX > gridX && mouseX < gridX * 2:
      slot = 1;
      break;
    case mouseX > gridX * 2 && mouseX < gridX * 3:
      slot = 2;
      break;
    case mouseX > gridX * 3 && mouseX < gridX * 4:
      slot = 3;
      break;
    case mouseX > gridX * 4 && mouseX < gridX * 5:
      slot = 4;
      break;
    case mouseX > gridX * 5 && mouseX < gridX * 6:
      slot = 5;
      break;
    case mouseX > gridX * 6 && mouseX < gridX * 7:
      slot = 6;
      break;
    case mouseX > gridX * 7 && mouseX < gridX * 8:
      slot = 7;
      break;
    case mouseX > gridX * 8 && mouseX < gridX * 9:
      slot = 8;
      break;
    case mouseX > gridX * 9 && mouseX < gridX * 10:
      slot = 9;
      break;
    case mouseX > gridX * 10 && mouseX < gridX * 11:
      slot = 10;
      break;
    case mouseX > gridX * 11 && mouseX < gridX * 12:
      slot = 11;
      break;
    case mouseX > gridX * 12 && mouseX < gridX * 13:
      slot = 12;
      break;
    case mouseX > gridX * 13 && mouseX < gridX * 14:
      slot = 13;
      break;
    case mouseX > gridX * 14 && mouseX < gridX * 15:
      slot = 14;
      break;
    case mouseX > gridX * 15 && mouseX < gridX * 16:
      slot = 15;
      break;
    case mouseX > gridX * 16 && mouseX < gridX * 17:
      slot = 16;
      break;
    case mouseX > gridX * 17 && mouseX < gridX * 18:
      slot = 17;
      break;
    default:
      break;
  }
}

const disp = function() {
  let my_window = window.open("termdraw", "myWindow1", "height=\height,width=\width");
  let HTMLstring = "<!DOCTYPE html>\n";
  HTMLstring = '<HTML>\n';
  HTMLstring += '<HEAD>\n';
  HTMLstring += "<TITLE>░░░░▒▒▒▓▓▛▀▔✺▁▄▟▓▓▒▒▒░░░░</TITLE>\n";
  HTMLstring += '</HEAD>\n';
  HTMLstring += "<BODY bgColor='000000 '>\n";
  HTMLstring += "<pre>";
  HTMLstring +=
    "<p style= \"color: #FFFFFF;  font-family:monospace;  font-size: ";
  HTMLstring += ~~fontsize + "px;\">";
  for (let y = 0; y < hLimit; ++y) {
    for (let x = 0; x < wLimit; ++x) {
      HTMLstring += grid[x][y];
    }
    HTMLstring += '<br \\>';
  }
  HTMLstring += '</p>\n';
  HTMLstring += "</pre>\n";
  HTMLstring += '</BODY>\n';
  HTMLstring += '</HTML>';
  my_window.document.write(HTMLstring);
}

function keyPressed() {
  if (keyCode === 83) disp();
  // return false; // prevent default
}
