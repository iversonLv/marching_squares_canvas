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
for (let i = 0; i < rows; i++) {
  arr[i] = [];
  for (let j = 0; j < cols; j++) {
    //console.log(i)
    arr[i][j] = Math.floor(Math.random() * 2);
    // ctx.fillRect(j * CELL_LENGTH, i * CELL_LENGTH, 1, 1)
    // ctx.fillStyle = arr[i][j] ? 'black' : 'red';
    // ctx.fill();

    let x, y;
    x = j * CELL_LENGTH;
    y = i * CELL_LENGTH;
    if (i === 0) {
      y = i * CELL_LENGTH + 10;
    }
    if (i === rows - 1) {
      y = i * CELL_LENGTH - 3;
    }
    if (j === cols - 1) {
      x = j * CELL_LENGTH - 6;
    }
    if (j === 0) {
      x = j * CELL_LENGTH + 4;
    }
    ctx.font = "15px Arial";

    // middle
    ctx.fillText(arr[i][j], x - 3, y + 2);
  }
}
//console.log(arr)

for (let i = 0; i < rows - 1; i++) {
  for (let j = 0; j < cols - 1; j++) {
    let x = i * CELL_LENGTH;
    let y = j * CELL_LENGTH;
    let a = { x: y + CELL_LENGTH / 2, y: x };
    let b = { x: y + CELL_LENGTH, y: x + CELL_LENGTH / 2 };
    let c = { x: y + CELL_LENGTH / 2, y: x + CELL_LENGTH };
    let d = { x: y, y: x + CELL_LENGTH / 2 };
    //console.log(arr[x/100][y/100], arr[x/100][(y + CELL_LENGTH)/100], arr[(x + CELL_LENGTH)/100][(y + CELL_LENGTH)/100], arr[(x + CELL_LENGTH)/100][y/100])
    // there are 16 types of the drwaLine
    const type = calType(
      arr[x / CELL_LENGTH][y / CELL_LENGTH],
      arr[x / CELL_LENGTH][(y + CELL_LENGTH) / CELL_LENGTH],
      arr[(x + CELL_LENGTH) / CELL_LENGTH][(y + CELL_LENGTH) / CELL_LENGTH],
      arr[(x + CELL_LENGTH) / CELL_LENGTH][y / CELL_LENGTH]
    );

    switch (type) {
      // 1---a---0
      // |  /    |
      // | /     |
      // d       b
      // |       |
      // |       |
      // 0---c---0

      // 0---a---1
      // |  /    |
      // | /     |
      // d       b
      // |       |
      // |       |
      // 1---c---1
      case "1000":
      case "0111":
        drawLine(a, d);
        break;
      // 1---a---1
      // |       |
      // |       |
      // d-------b
      // |       |
      // |       |
      // 0---c---0

      // 0---a---0
      // |       |
      // |       |
      // d-------b
      // |       |
      // |       |
      // 1---c---1
      case "1100":
      case "0011":
        drawLine(b, d);
        break;
      // 1---a---1
      // |       |
      // |       |
      // d       b
      // | \     |
      // |  \    |
      // 0---c---1

      // 0---a---0
      // |       |
      // |       |
      // d       b
      // | \     |
      // |  \    |
      // 1---c---0
      case "1110":
      case "0001":
        drawLine(c, d);
        break;
      // 1---a---0
      // |    \  |
      // |     \ |
      // d       b
      // | \     |
      // |  \    |
      // 0---c---1
      case "1010":
        drawLine(a, b);
        drawLine(c, d);
        break;
      // 1---a---0
      // |   |   |
      // |   |   |
      // d   |   b
      // |   |   |
      // |   |   |
      // 1---c---0

      // 0---a---1
      // |   |   |
      // |   |   |
      // d   |   b
      // |   |   |
      // |   |   |
      // 0---c---1
      case "1001":
      case "0110":
        drawLine(a, c);
        break;
      // 0---a---1
      // |  /    |
      // | /     |
      // d       b
      // |     / |
      // |    /  |
      // 1---c---0
      case "0101":
        drawLine(a, d);
        drawLine(b, c);
        break;
      // 0---a---0
      // |       |
      // |       |
      // d       b
      // |     / |
      // |    /  |
      // 0---c---1

      // 1---a---1
      // |       |
      // |       |
      // d       b
      // |     / |
      // |    /  |
      // 1---c---0
      case "0010":
      case "1101":
        drawLine(b, c);
        break;
      // 1---a---0
      // |    \  |
      // |     \ |
      // d       b
      // |       |
      // |       |
      // 1---c---1

      // 0---a---1
      // |    \  |
      // |     \ |
      // d       b
      // |       |
      // |       |
      // 0---c---0
      case "1011":
      case "0100":
        drawLine(a, b);
        break;
      default:
        // 0---a---0
        // |       |
        // |       |
        // d       b
        // |       |
        // |       |
        // 0---c---0

        // 1---a---1
        // |       |
        // |       |
        // d       b
        // |       |
        // |       |
        // 1---c---1
        break;
    }
  }
}

// drawLine
function drawLine(from, to) {
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.stroke();
}

function calType(tl, tr, br, bl) {
  return tl + "" + tr + "" + br + "" + bl + "";
}
