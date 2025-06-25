const Gameboard = (function () {
    const rows = 3;
    const columns = 3;
    let board = [];

    const Cell = () => "";

    const makeBoard = function () {
        board = [];
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < columns; j++) {
                row.push(Cell());
            }
            board.push(row);
        }
    };

    const getBoard = () => board;

    return { getBoard, makeBoard };
})();

const Player = (function () {
    const players = [
        { name: "Player 1", marker: "x" },
        { name: "Player 2", marker: "o" },
    ];

    let activePlayer = players[0];
    const getActivePlayer = () => activePlayer;

    const switchActivePlayer = function () {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    return { switchActivePlayer, getActivePlayer };
})();

const Game = (function () {

    function gameRound(row, col) {
        const marker = Player.getActivePlayer().marker;
        const board = Gameboard.getBoard();

        if (board[row][col] === "") {
        board[row][col] = marker;
        renderDOM.updateCell(row, col, marker);

        if (checkWinner()) {
            renderDOM.showWinner(`${Player.getActivePlayer().name} wins!`);
            return;
        }

        if (isDraw()) {
            renderDOM.showWinner("It's a draw!");
            return;
        }

        Player.switchActivePlayer();
        } else {
            alert("That spot is already taken!");
        }
    }

    const checkWinner = function () {
        const b = Gameboard.getBoard();
        const allEqual = (a, b, c) => a === b && b === c && a !== "";

        for (let i = 0; i < 3; i++) {
            if (allEqual(b[i][0], b[i][1], b[i][2]) || 
            allEqual(b[0][i], b[1][i], b[2][i])) {
                return true;
            }
        }

        return (
            allEqual(b[0][0], b[1][1], b[2][2]) || 
            allEqual(b[0][2], b[1][1], b[2][0])
        );
    };

    function isDraw() {
    const board = Gameboard.getBoard();
    return board.every(row => row.every(cell => cell !== ""));
    };

    function startGame() {
        Gameboard.makeBoard();
        renderDOM.renderBoard();
    }

    const playRound = (row, col) => gameRound(row, col);

    return { startGame, playRound };
})();

const renderDOM = (function () {
    const cells = document.querySelectorAll(".cell");
    const popup = document.querySelector(".popup-bg");
    const winnerText = document.querySelector(".winner-name");
    const restartBtn = document.querySelector("button");

    function renderBoard() {
        cells.forEach((cell, index) => {
            const row = Math.floor(index / 3);
            const col = index % 3;

            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.textContent = "";

            cell.onclick = () => {
                Game.playRound(row, col);
            };
        });
    }

    function updateCell(row, col, value) {
        const cell = [...cells].find(
            (cell) =>
                parseInt(cell.dataset.row) === row &&
                parseInt(cell.dataset.col) === col
        );
        if (cell) cell.textContent = value;
    }

    function showWinner(name) {
        winnerText.textContent = `${name}`;
        popup.style.display = "flex";
    }

    function hidePopup() {
        popup.style.display = "none";
    }

    restartBtn.addEventListener("click", () => {
        hidePopup();
        Game.startGame();
    });

    return { renderBoard, updateCell, showWinner };
})();

Game.startGame();
