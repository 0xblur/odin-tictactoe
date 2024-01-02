/*INFO: Game controller for the TicTacToe*/
function ticTacToe() {
  const board = Gameboard();
  const players = {
    first: {
      name: "",
      token: 1,
    },
    second: {
      name: "",
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

  function setPlayersNames() {
    players.first.name = prompt()
    players.second.name = prompt()
  };
  function getPlayersNames(player) {
    if (player === "first") {
      return players.first.name;
    } else if (player === "second") {
      return players.second.name;
    }

  }



  return { playRound, getCurrentPlayer, setPlayersNames, getPlayersNames }
};

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
    } else {
      draw()
    }
  }
function Gameboard() {
  const board = [
    [],
    [],
    [],
  ]

  const getBoard = () => board;

  const fillCell = (coordinates, player) => {
    const [row, column] = coordinates

    if (player === 1) {
      board[row][column] = "X";
    } else {
      board[row][column] = "O";
    };
  };

  return { getBoard, fillCell }

}
}
