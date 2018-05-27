var game = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
];

var player = 1;


window.onload = function() {
  startGame();
}
// czekamy z uruchomieniem tego, az caly html zostanie pobrany i wyswietlony



function startGame() {
  draw();
  document.querySelector("#resetGame").addEventListener("click", resetGame);
}

function draw() {

  var gameContainer =document.querySelector("#game");
  gameContainer.innerHTML='';

  // document.body.innerHTML = '';
  // czyścimy wszystko i rysujemy to samo

  for (var i = 0; i < game.length; i++) {
    var line = document.createElement('div');
    line.setAttribute('class', 'line');

    for (var j = 0; j < game[i].length; j++) {
      var col = document.createElement('div');
      col.setAttribute('class', 'col');
      col.setAttribute('data-i', i);
      col.setAttribute('data-j', j);


      if (game[i][j] === 1) {
        col.innerText = 'o';
      } else if (game[i][j] === 2) {
        col.innerText = 'x';
      }

      line.appendChild(col);
      // console.log('x:',i,'y:',j, game[i][j]);
    }
    // document.body.appendChild(line);
    gameContainer.appendChild(line);
  }
  addEvents();
}

function addEvents() {
  var elements = document.querySelectorAll('.col');
  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', onClickFunction);
  }
}

function onClickFunction() {
  console.log(this);
  var i = this.getAttribute('data-i');
  var j = this.getAttribute('data-j');
  var field = game[i][j];
  if (field === 0) {
    game[i][j] = player;
    changePlayer();
  }
  draw();
  setTimeout(checkWinner, 20);


  console.log(i, j, game[i][j]);
}

function changePlayer() {
  var currentPlayer = document.querySelector("#currentPlayer");

  if (player == 1) {
    player = 2;
    var playerInput = document.querySelector("#player2");
    currentPlayer.innerText = playerInput.value;
  } else {
    player = 1;
    var playerInput = document.querySelector("#player1");
    currentPlayer.innerText = playerInput.value;
  }
}

function checkLine() {
  for (var i = 0; i < game.length; i++) {
    if (game[i][0] > 0 && game[i][0] === game[i][1] && game[i][1] === game[i][2])
      return game[i][0];
  }
}

function checkCol() {
  for (var i = 0; i < game.length; i++) {
    if (game[0][i] > 0 && game[0][i] === game[1][i] && game[1][i] === game[2][i])
      return game[0][i];
  }
}

function checkCross() {
  if (game[0][0] > 0 &&
    game[0][0] === game[1][1] &&
    game[1][1] === game[2][2]) {
    return game[0][0];
  }

  if (game[0][2] > 0 &&
    game[0][2] === game[1][1] &&
    game[1][1] === game[2][0]) {
    return game[0][2];
  }
}

function checkIfEmpty() {
  for (var i = 0; i < game.length; i++) {
    for (var j = 0; j < game[i].length; j++) {
      if (game[i][j] === 0) {
        return true;
      }
    }
  }
  return false;
}

function resetGame(){
  game=[
    [0,0,0],
    [0,0,0],
    [0,0,0]
  ];
  draw();
}

function checkWinner() {
  var winner = null;

  var line = checkLine();
  if (line) {
    winner = line;
  }

  var col = checkCol();
  if (col) {
    winner = col;
  }

  var cross = checkCross();
  if (cross) {
    winner = cross;
  }

  if (winner) {

    var player1 = document.querySelector("#player1");
    var player2 = document.querySelector("#player2");
    if(winner == 1)
    {
      alert("Wygral gracz " + player1.value);
    }
    else
    {
      alert("Wygral gracz " + player2.value);
    }
    resetGame();

  } else if (checkIfEmpty() === false) {
    alert("Remis");
    resetGame();
  }


}
