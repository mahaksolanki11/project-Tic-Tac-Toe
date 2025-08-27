const cells = document.querySelectorAll(".cell"); // Select all boxes
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");

let currentPlayer = "X"; // Player starts with X
let board = ["", "", "", "", "", "", "", "", ""]; // Empty board
let gameActive = true;

// Winning combinations
const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6]              // diagonals
];

// Handle cell click
function cellClicked(event) {
  const index = event.target.getAttribute("data-index");

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  checkWinner();
}

// Check winner
function checkWinner() {
  let roundWon = false;

  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if (!board.includes("")) {
    statusText.textContent = " It's a Draw!";
    gameActive = false;
    return;
  }

  // Switch turn
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

// Reset game
function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  statusText.textContent = "Player X's turn";
  cells.forEach(cell => (cell.textContent = ""));
}

// Event Listeners
cells.forEach(cell => cell.addEventListener("click", cellClicked));
resetBtn.addEventListener("click", resetGame);
