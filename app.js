/*INFO: Game controller for the TicTacToe*/
function ticTacToe() {
  const board = Gameboard();
  const players = {
    first: {
      name: "Player 1",
      token: 1,
    },
    second: {
      name: "Player 2",
      token: 2,
    },
  };

  let currentPlayer = 1;
  let winner = "";

  const getCurrentPlayer = () => currentPlayer;
  const getWinner = () => winner;

  function nextTurn() {
    const nextPlayer = currentPlayer === 1 ? 2 : 1;
    currentPlayer = nextPlayer
  };

  function playRound(coordinates, player = currentPlayer) {
    board.fillCell(coordinates, player)
    checkBoard()
    nextTurn()
  };

  function setPlayersNames(player) {
    if (player === 1) {
      players.first.name = prompt() || players.first.name;
    } else {
      players.second.name = prompt() || players.second.name;
    };
  };

  function getPlayersNames(player) {
    if (player === 1) {
      return players.first.name;
    } else if (player === 2) {
      return players.second.name;
    }

  }

  function resetGame() {
    currentPlayer = 1;
    winner = "";
    board.resetBoard();
  }

  function checkBoard() {
    const boardArr = board.getBoard()
    const isFilled = (cell) => cell !== "";

    if (boardArr[0][0] === "X" && boardArr[0][1] === "X" && boardArr[0][2] === "X") {
      playerWins()
    } else if (boardArr[1][0] === "X" && boardArr[1][1] === "X" && boardArr[1][2] === "X") {
      playerWins()
    } else if (boardArr[2][0] === "X" && boardArr[2][1] === "X" && boardArr[2][2] === "X") {
      playerWins()
    } else if (boardArr[0][0] === "X" && boardArr[1][0] === "X" && boardArr[2][0] === "X") {
      playerWins()
    } else if (boardArr[0][1] === "X" && boardArr[1][1] === "X" && boardArr[2][1] === "X") {
      playerWins()
    } else if (boardArr[0][2] === "X" && boardArr[1][2] === "X" && boardArr[2][2] === "X") {
      playerWins()
    } else if (boardArr[0][0] === "X" && boardArr[1][1] === "X" && boardArr[2][2] === "X") {
      playerWins()
    } else if (boardArr[0][2] === "X" && boardArr[1][1] === "X" && boardArr[2][0] === "X") {
      playerWins()
    } else if (boardArr[0][0] === "O" && boardArr[0][1] === "O" && boardArr[0][2] === "O") {
      computerWins()
    } else if (boardArr[1][0] === "O" && boardArr[1][1] === "O" && boardArr[1][2] === "O") {
      computerWins()
    } else if (boardArr[2][0] === "O" && boardArr[2][1] === "O" && boardArr[2][2] === "O") {
      computerWins()
    } else if (boardArr[0][0] === "O" && boardArr[1][0] === "O" && boardArr[2][0] === "O") {
      computerWins()
    } else if (boardArr[0][1] === "O" && boardArr[1][1] === "O" && boardArr[2][1] === "O") {
      computerWins()
    } else if (boardArr[0][2] === "O" && boardArr[1][2] === "O" && boardArr[2][2] === "O") {
      computerWins()
    } else if (boardArr[0][0] === "O" && boardArr[1][1] === "O" && boardArr[2][2] === "O") {
      computerWins()
    } else if (boardArr[0][2] === "O" && boardArr[1][1] === "O" && boardArr[2][0] === "O") {
      computerWins()
    } else if (boardArr.filter(row => row.every(isFilled)).length === 3) {
      draw()
    };



    function playerWins() {
      //TODO: Change from console.log message to DOM display
      // and game reset.
      winner = players.first.name;
    };


    function computerWins() {
      //TODO: Change from console.log message to DOM display
      // and game reset.
      winner = players.second.name;
    };


    function draw() {
      //TODO: Change from console.log message to DOM display
      // and game reset.
      winner = "DRAW :("
    };
  };


  return { playRound, getCurrentPlayer, getWinner, setPlayersNames, getPlayersNames, resetGame, checkBoard }
};


function Gameboard() {
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const getBoard = () => board;

  const fillCell = (coordinates, player) => {
    const [row, column] = coordinates

    if (player === 1) {
      board[row][column] = "X";
    } else {
      board[row][column] = "O";
    }
  };



  function resetBoard() {
    board.forEach((row) => {
      row.forEach((cell, j) => {
        row[j] = "";
      })
    })
  };


  return { getBoard, fillCell, resetBoard }
};

function ScreenController() {
  const game = ticTacToe();
  const playerTurnDiv = document.querySelector("#player-turn")
  const resultDiv = document.querySelector("#result")
  const cells = document.querySelectorAll(".cell")
  const resetBtn = document.querySelector("#reset");
  const playerOneBtn = document.querySelector("#player-one");
  const playerTwoBtn = document.querySelector("#player-two");

  const clearDisplay = () => {
    cells.forEach((cell) => {
      cell.textContent = "";
    });

    resultDiv.textContent = "";
  };

  const updateDisplay = () => {
    const currentPlayer = game.getCurrentPlayer()
    const winner = game.getWinner()

    if (winner) {
      resultDiv.textContent = `The winner is: ${winner}!!`;
      cells.forEach((cell) => cell.removeEventListener("click", clickHandler))
    };

    if (currentPlayer === 1) {
      playerTurnDiv.textContent = `${game.getPlayersNames(1)} Turn`;
    } else if (currentPlayer === 2) {
      playerTurnDiv.textContent = `${game.getPlayersNames(2)} Turn`;
    }
  };


  function clickHandler(e) {
    const currentPlayer = game.getCurrentPlayer()
    const row = e.target.dataset.row
    const column = e.target.dataset.column
    const coordinates = [row, column]

    if (currentPlayer === 1 && e.target.textContent === "") {
      e.target.textContent = "X"
      //Deactivate cells clickHandler after filled
      e.target.removeEventListener("click", clickHandler)
    } else if (currentPlayer === 2 && e.target.textContent === "") {
      e.target.textContent = "O"
      //Deactivate cells clickHandler after filled
      e.target.removeEventListener("click", clickHandler)
    };

    game.playRound(coordinates);
    updateDisplay()
  };

  //Initialize empty board
  clearDisplay();
  //Prompt for player names
  playerOneBtn.addEventListener("click", () => {
    game.setPlayersNames(1);
    updateDisplay()
  });
  playerTwoBtn.addEventListener("click", () => {
    game.setPlayersNames(2)
    updateDisplay()
  });
  //Initialize display
  updateDisplay();

  //Click handler for cells
  function activateCells() {
    cells.forEach((cell) => {
      cell.addEventListener("click", clickHandler)
    });
  }

  activateCells()

  //Reset button handler
  resetBtn.addEventListener("click", () => {
    game.resetGame();
    clearDisplay();
    activateCells();
    updateDisplay();
  })

}

ScreenController()
