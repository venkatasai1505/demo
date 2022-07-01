/*--------------------------------- Algorithm --------------------------------------- */

function queenPuzzle(rows, columns) {
  if (rows <= 0) {
    return [[]];
  } else {
    return addQueen(rows - 1, columns);
  }
}

function addQueen(newRow, columns) {
  var newSolutions = [];
  var prev = queenPuzzle(newRow, columns);
  for (var i = 0; i < prev.length; i++) {
    var solution = prev[i];
    for (var newColumn = 0; newColumn < columns; newColumn++) {
      if (!hasConflict(newRow, newColumn, solution))
        newSolutions.push(solution.concat([newColumn]));
    }
  }
  return newSolutions;
}

function hasConflict(newRow, newColumn, solution) {
  for (var i = 0; i < newRow; i++) {
    if (
      solution[i] == newColumn ||
      solution[i] + i == newColumn + newRow ||
      solution[i] - i == newColumn - newRow
    ) {
      return true;
    }
  }
  return false;
}
/*-------------------------------------------------------------------------------------- */
const imagesCont = document.querySelector('.imagesCont');
const rowEle = document.getElementById('rows');
const submit = document.querySelector('.submitBtn');

submit.addEventListener('click', (e) => {
  var rows = rowEle.value;
  var columns = rowEle.value;
  var color = 1;
  imagesCont.innerHTML = '';

  var queens = queenPuzzle(rows, columns);
  console.log(queens);
  //   var queens = [1, 2];
  queens.forEach((queen) => {
    var print_board = function (columns) {
      var n = columns.length,
        row = 0,
        col = 0;

      var divI = document.createElement('div');
      divI.className = 'images';
      imagesCont.appendChild(divI);

      while (row < n) {
        var divC = document.createElement('div');
        divC.className = 'row';
        divI.appendChild(divC);

        while (col < n) {
          var divP = document.createElement('div');
          divP.className = 'pice';
          divC.appendChild(divP);

          if (color % 2 == 0) {
            divP.classList.add('black');
          } else {
            divP.classList.add('white');
          }
          color++;
          //   (columns[row] === col ? 'Q ' : '# ');
          if (columns[row] == col) {
            divP.innerHTML = `<div class="queenPosition correctPosition">
              <i class="fas fa-chess-queen"></i>
           </div>`;
          }

          col++;
        }

        if (rowEle.value % 2 == 0) {
          color += 1;
        }
        // process.stdout.write('\n');
        col = 0;
        row++;
      }
    };
    print_board(queen);
  });
});
