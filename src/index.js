const CANVAS_WIDTH = 1800;
const CANVAS_HEIGHT = 800;
const CELL_LENGTH = 50;
const canvas = document.getElementById("canvas");
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
const ctx = canvas.getContext("2d");
const rows = CANVAS_HEIGHT / CELL_LENGTH + 1;
const cols = CANVAS_WIDTH / CELL_LENGTH + 1;

const arr = [];
for (let y = 0; y < rows; y++) {
  arr[y] = [];
  for (let x = 0; x < cols; x++) {
    arr[y][x] = Math.floor(Math.random() * 2);
    let pX, pY;
    pX = x * CELL_LENGTH;
    pY = y * CELL_LENGTH;
    ctx.fillRect(pX - CELL_LENGTH, pY, 5, 5)

    if (y === 0) {
      pY += 10;
    }
    if (y === rows - 1) {
      pY -= 3;
    }
    if (x === cols - 1) {
      pX -= 6;
    }
    if (x === 0) {
      pX += 4;
    }
    ctx.font = "15px Arial";
    ctx.fillStyle = arr[y][x] === 1 ? 'black' : 'white';
    ctx.fill();

    // middle
    ctx.fillText(arr[y][x], pX - 3, pY + 2);
  }
}
//console.log(arr)

for (let y = 0; y < rows - 1; y++) {
  for (let x = 0; x < cols - 1; x++) {
    let pY = y * CELL_LENGTH;
    let pX = x * CELL_LENGTH;
    let a = { x: pX + CELL_LENGTH / 2, y: pY };
    let b = { x: pX + CELL_LENGTH,     y: pY + CELL_LENGTH / 2 };
    let c = { x: pX + CELL_LENGTH / 2, y: pY + CELL_LENGTH };
    let d = { x: pX,                   y: pY + CELL_LENGTH / 2 };
    //console.log(arr[x/100][y/100], arr[x/100][(y + CELL_LENGTH)/100], arr[(x + CELL_LENGTH)/100][(y + CELL_LENGTH)/100], arr[(x + CELL_LENGTH)/100][y/100])
    // there are 16 types of the drwaLine
  
    const type = calType(
      arr[pY / CELL_LENGTH]                [pX / CELL_LENGTH],
      arr[pY / CELL_LENGTH]                [(pX + CELL_LENGTH) / CELL_LENGTH],
      arr[(pY + CELL_LENGTH) / CELL_LENGTH][(pX + CELL_LENGTH) / CELL_LENGTH],
      arr[(pY + CELL_LENGTH) / CELL_LENGTH][pX / CELL_LENGTH]
    );
    
    drawImg(type, pX, pY, CELL_LENGTH, CELL_LENGTH)

  //   switch (type) {
  //     // 1---a---0
  //     // |  /    |
  //     // | /     |
  //     // d       b
  //     // |       |
  //     // |       |
  //     // 0---c---0

  //     // 0---a---1
  //     // |  /    |
  //     // | /     |
  //     // d       b
  //     // |       |
  //     // |       |
  //     // 1---c---1
  //     case "1000":
  //     case "0111":
  //       drawLine(a, d);
  //       break;
  //     // 1---a---1
  //     // |       |
  //     // |       |
  //     // d-------b
  //     // |       |
  //     // |       |
  //     // 0---c---0

  //     // 0---a---0
  //     // |       |
  //     // |       |
  //     // d-------b
  //     // |       |
  //     // |       |
  //     // 1---c---1
  //     case "1100":
  //     case "0011":
  //       drawLine(b, d);
  //       break;
  //     // 1---a---1
  //     // |       |
  //     // |       |
  //     // d       b
  //     // | \     |
  //     // |  \    |
  //     // 0---c---1

  //     // 0---a---0
  //     // |       |
  //     // |       |
  //     // d       b
  //     // | \     |
  //     // |  \    |
  //     // 1---c---0
  //     case "1110":
  //     case "0001":
  //       drawLine(c, d);
  //       break;
  //     // 1---a---0
  //     // |    \  |
  //     // |     \ |
  //     // d       b
  //     // | \     |
  //     // |  \    |
  //     // 0---c---1
  //     case "1010":
  //       drawLine(a, b);
  //       drawLine(c, d);
  //       break;
  //     // 1---a---0
  //     // |   |   |
  //     // |   |   |
  //     // d   |   b
  //     // |   |   |
  //     // |   |   |
  //     // 1---c---0

  //     // 0---a---1
  //     // |   |   |
  //     // |   |   |
  //     // d   |   b
  //     // |   |   |
  //     // |   |   |
  //     // 0---c---1
  //     case "1001":
  //     case "0110":
  //       drawLine(a, c);
  //       break;
  //     // 0---a---1
  //     // |  /    |
  //     // | /     |
  //     // d       b
  //     // |     / |
  //     // |    /  |
  //     // 1---c---0
  //     case "0101":
  //       drawLine(a, d);
  //       drawLine(b, c);
  //       break;
  //     // 0---a---0
  //     // |       |
  //     // |       |
  //     // d       b
  //     // |     / |
  //     // |    /  |
  //     // 0---c---1

  //     // 1---a---1
  //     // |       |
  //     // |       |
  //     // d       b
  //     // |     / |
  //     // |    /  |
  //     // 1---c---0
  //     case "0010":
  //     case "1101":
  //       drawLine(b, c);
  //       break;
  //     // 1---a---0
  //     // |    \  |
  //     // |     \ |
  //     // d       b
  //     // |       |
  //     // |       |
  //     // 1---c---1

  //     // 0---a---1
  //     // |    \  |
  //     // |     \ |
  //     // d       b
  //     // |       |
  //     // |       |
  //     // 0---c---0
  //     case "1011":
  //     case "0100":
  //       drawLine(a, b);
  //       break;
  //     default:
  //       // 0---a---0
  //       // |       |
  //       // |       |
  //       // d       b
  //       // |       |
  //       // |       |
  //       // 0---c---0

  //       // 1---a---1
  //       // |       |
  //       // |       |
  //       // d       b
  //       // |       |
  //       // |       |
  //       // 1---c---1
  //       break;
  //   }
  }
}

// drawLine
function drawLine(from, to) {
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.stroke();
}

// drw img
function drawImg(type, sx, sy, sWidth, sHeight){
  var img = new Image();
  img.src = `./src/img/${type}.png`;
  img.onload = function() {
    ctx.drawImage(img, 0, 0, 50, 50, sx, sy, sWidth, sHeight);
  };
}

function calType(tl, tr, br, bl) {
  return tl + "" + tr + "" + br + "" + bl + "";
}
