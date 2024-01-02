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

  const getCurrentPlayer = () => currentPlayer;

  function nextTurn() {
    const nextPlayer = currentPlayer === 1 ? 2 : 1;
    currentPlayer = nextPlayer
  };

  function playRound(coordinates, player = currentPlayer) {
    board.fillCell(coordinates, player)
    board.checkBoard()
    nextTurn()
  };

  function setPlayersNames(player) {
    if (player === 1) {
      players.first.name = prompt()
    } else {
      players.second.name = prompt()
    };
  };

  function getPlayersNames(player) {
    if (player === 1) {
      return players.first.name;
    } else if (player === 2) {
      return players.second.name;
    }

  }



  return { playRound, getCurrentPlayer, setPlayersNames, getPlayersNames }
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

  const isFilled = (cell) => cell !== "";

  function checkBoard() {
    if (board[0][0] === "X" && board[0][1] === "X" && board[0][2] === "X") {
      playerWins()
    } else if (board[1][0] === "X" && board[1][1] === "X" && board[1][2] === "X") {
      playerWins()
    } else if (board[2][0] === "X" && board[2][1] === "X" && board[2][2] === "X") {
      playerWins()
    } else if (board[0][0] === "X" && board[1][0] === "X" && board[2][0] === "X") {
      playerWins()
    } else if (board[0][1] === "X" && board[1][1] === "X" && board[2][1] === "X") {
      playerWins()
    } else if (board[0][2] === "X" && board[1][2] === "X" && board[2][2] === "X") {
      playerWins()
    } else if (board[0][0] === "X" && board[1][1] === "X" && board[2][2] === "X") {
      playerWins()
    } else if (board[0][2] === "X" && board[1][1] === "X" && board[2][0] === "X") {
      playerWins()
    } else if (board[0][0] === "O" && board[0][1] === "O" && board[0][2] === "O") {
      computerWins()
    } else if (board[1][0] === "O" && board[1][1] === "O" && board[1][2] === "O") {
      computerWins()
    } else if (board[2][0] === "O" && board[2][1] === "O" && board[2][2] === "O") {
      computerWins()
    } else if (board[0][0] === "O" && board[1][0] === "O" && board[2][0] === "O") {
      computerWins()
    } else if (board[0][1] === "O" && board[1][1] === "O" && board[2][1] === "O") {
      computerWins()
    } else if (board[0][2] === "O" && board[1][2] === "O" && board[2][2] === "O") {
      computerWins()
    } else if (board[0][0] === "O" && board[1][1] === "O" && board[2][2] === "O") {
      computerWins()
    } else if (board[0][2] === "O" && board[1][1] === "O" && board[2][0] === "O") {
      computerWins()
    } else if (board.filter(row => row.every(isFilled)).length === 3) {
      draw()
    };


    function playerWins() {
      //TODO: Change from console.log message to DOM display
      // and game reset.
      console.log("Player wins!")
    };


    function computerWins() {
      //TODO: Change from console.log message to DOM display
      // and game reset.
      console.log("Computer wins!")
    };


    function draw() {
      //TODO: Change from console.log message to DOM display
      // and game reset.
      console.log("It's a draw!")
    };
  };


  return { getBoard, fillCell, checkBoard }
};

function ScreenController() {
  const game = ticTacToe();
  const playerTurnDiv = document.querySelector("#player-turn")
  const cells = document.querySelectorAll(".cell")

  const clearCells = (cell) => {
    cells.forEach((cell) => {
      cell.textContent = "";
    })
  };

  const updateDisplay = () => {
    const currentPlayer = game.getCurrentPlayer()
    if (currentPlayer === 1) {
      playerTurnDiv.textContent = `${game.getPlayersNames("first")} Turn`;
    } else if (currentPlayer === 2) {
      playerTurnDiv.textContent = `${game.getPlayersNames("second")} Turn`;
    }
  };


  function clickHandler(e) {
    const currentPlayer = game.getCurrentPlayer()
    const row = e.target.dataset.row
    const column = e.target.dataset.column
    const coordinates = [row, column]

    if (currentPlayer === 1 && e.target.textContent === "") {
      e.target.textContent = "X"
      e.target.removeEventListener("click", clickHandler)
    } else if (currentPlayer === 2 && e.target.textContent === "") {
      e.target.textContent = "O"
      e.target.removeEventListener("click", clickHandler)
    };

    game.playRound(coordinates);
    updateDisplay()
  };

  //Initialize empty board
  clearCells();
  //Prompt for player names
  game.setPlayersNames()
  //Initialize display
  updateDisplay();

  //Click handler for cells
  cells.forEach((cell) => {
    cell.addEventListener("click", clickHandler)
  });

}

ScreenController()
