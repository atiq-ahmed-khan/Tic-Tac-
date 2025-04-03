const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('game-board');
const restartButton = document.getElementById('restart');
let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
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
    cell.addEventListener('click', handleClick, { once: true });
});

function handleClick(e) {
    const cell = e.target;
    const index = Array.from(cells).indexOf(cell);
    cell.textContent = currentPlayer;
    boardState[index] = currentPlayer;

    if (checkWin()) {
        setTimeout(() => alert(`${currentPlayer} wins!`), 10);
        return;
    }

    if (boardState.every(cell => cell)) {
        setTimeout(() => alert("It's a draw!"), 10);
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentPlayer;
        });
    });
}

restartButton.addEventListener('click', restartGame);

function restartGame() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleClick, { once: true });
    });
    currentPlayer = 'X';
}
