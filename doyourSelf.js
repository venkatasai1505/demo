const rowInput = document.querySelector('#rows');
const doYourSelf = document.querySelector('.doYourSelf');
const board = document.querySelector('.imagesCont');
const squareSize = 70;

var b = false;
var boardArr = [[]];
var rows;
var count = 0;
var count1 = 0;

rowInput.onkeyup = function (e) {
  removeAllChildNodes(board);
  b = false;
  count = 0;
  count1 = 0;
};

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

doYourSelf.addEventListener('click', (e) => {
  rows = rowInput.value;
  if (!b) {
    printBoard(rows);
    b = true;
  }
  boardArr = new Array(rows);
  for (var i = 0; i < rows; i++) {
    boardArr[i] = new Array(rows);
    for (var j = 0; j < rows; j++) {
      boardArr[i][j] = '0';
      console.log(boardArr);
    }
  }
  //   boardArr = [
  //     [1, 1, 0, 0],
  //     [0, 1, 1, 0],
  //     [1, 1, 1, 1],
  //     [0, 1, 1, 1],
  //   ];
  printArray();
});

function printBoard(inputRows) {
  board.style.width = inputRows * (squareSize + 2) + 'px';
  for (var i = 0; i < inputRows; i++) {
    for (var j = 0; j < inputRows; j++) {
      count++;
      count1++;
      var square = document.createElement('div');
      square.id = 'square' + count;
      square.style.height = squareSize + 'px';
      square.style.width = squareSize + 'px';
      square.style.border = '1px solid black';
      if (count1 % 2 == 0) {
        square.style.backgroundColor = 'rgb(195 195 195)';
      } else {
        square.style.backgroundColor = 'rgb(32 32 32)';
      }
      board.appendChild(square);
      square.appendChild(queen('queen' + count));
      square.onclick = function (e) {
        var idd = e.target.id.replace(/\D/g, '');
        var tempQueen = document.querySelector('#queen' + idd);
        if (tempQueen.style.visibility == 'hidden') {
          tempQueen.style.visibility = 'visible';
          boardArr[getCol(idd, inputRows)][getRow(idd, inputRows)] = 1;
          // checkForChecks(getCol(idd, inputRows), getRow(idd, inputRows));
        } else {
          tempQueen.style.visibility = 'hidden';
          boardArr[getCol(idd, inputRows)][getRow(idd, inputRows)] = 0;
          // drawBoard();
        }
        printArray();
      };
    }
    if (inputRows % 2 == 0) {
      count1++;
    }
  }
}

function queen(id) {
  var queenPiece = document.createElement('div');
  queenPiece.id = id;
  queenPiece.style.color = 'white';
  queenPiece.style.height = squareSize + 'px';
  queenPiece.style.width = squareSize + 'px';
  queenPiece.style.background = 'url(queen.svg) 50% 50%';
  queenPiece.style.backgroundSize = '50px';
  queenPiece.style.backgroundRepeat = 'no-repeat';
  //   queenPiece.innerHTML = `<i class="fas fa-chess-queen"></i>`;
  queenPiece.style.position = 'absolute';
  queenPiece.style.visibility = 'hidden';
  return queenPiece;
}

function printArray() {
  checked_boxes = 0;
  drawBoard();
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < rows; j++) {
      if (boardArr[i][j] == 1) {
        checkForChecks(i, j);
      }
      if (boardArr[i][j] == 1) {
        document.querySelector('#queen' + (i * rows + j + 1)).style.visibility =
          'visible';
      } else {
        document.querySelector('#queen' + (i * rows + j + 1)).style.visibility =
          'hidden';
      }
    }
  }
  console.log(checked_boxes);
}

function getRow(inpt, size) {
  return (inpt - 1) % size;
}
function getCol(inpt, size) {
  return parseInt((inpt - 1) / size, 0);
}
var checked_boxes = 0;
function checkForChecks(i1, j1, check) {
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < rows; j++) {
      if (i == i1) {
        checked_boxes++;
      } else if (j == j1) {
        checked_boxes++;
      } else {
        if (i + (j1 - i1) == j || i + (rows - 1 - j1 - i1) == rows - 1 - j) {
          checked_boxes++;
          tempDigonal = document.querySelector(
            '#square' + Number(i * rows + j + 1)
          );
          tempDigonal.style.backgroundColor = '#ff0000c4';
          tempDigonal.style.padding;
        }
      }
      tempSquareRow = document.querySelector('#square' + (i1 * rows + j + 1)); // 0*4 + 1
      tempSquareColumn = document.querySelector(
        '#square' + (i * rows + j1 + 1)
      );
      tempSquareRow.style.backgroundColor = '#ff0000c4';
      tempSquareColumn.style.backgroundColor = '#ff0000c4';
    }
  }
}

function drawBoard() {
  var count2 = 0;
  for (var i = 1; i <= rows * rows; i++) {
    count2++;
    if (count2 % 2 == 0) {
      document.querySelector('#square' + i).style.backgroundColor =
        'rgb(195 195 195)';
    } else {
      document.querySelector('#square' + i).style.backgroundColor =
        'rgb(32 32 32)';
    }
    if (rows % 2 == 0 && i % rows == 0) {
      count2++;
    }
  }
}
