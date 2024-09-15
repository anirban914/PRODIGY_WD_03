let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
const statusDisplay = document.getElementById('game-status');
const cells = document.querySelectorAll('.cell');


const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});


function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedIndex = clickedCell.getAttribute('data-index');

    
    if (board[clickedIndex] !== "" || !gameActive) {
        return;
    }

    
    board[clickedIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    
    checkGameResult();
}


function checkGameResult() {
    let roundWon = false;

    
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];

        if (a === "" || b === "" || c === "") {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

   
    let roundDraw = !board.includes("");
    if (roundDraw) {
        statusDisplay.textContent = "Draw!";
        gameActive = false;
        return;
    }

   
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
}

document.getElementById('reset-btn').addEventListener('click', resetGame);

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusDisplay.textContent = `Player X's Turn`;

    cells.forEach(cell => {
        cell.textContent = "";
    });
}
