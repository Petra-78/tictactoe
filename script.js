const Gameboard = (function() {
    const rows = 3;
    const columns = 3;
    const board = [];

    const Cell = function() {
        const value = 0;  
        return value
    }

    const makeBoard = function() {
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < columns; j++) {
                row.push(Cell())
            }
            board.push(row);
        }
        return board
    }

    const newBoard = () => makeBoard();
    const getBoard = () => board;

    return {getBoard, newBoard}   
})();


const Player = (function() {

    const players = [
        {name: "player1", marker: "x"}, 
        {name: "player2", marker: "o"}
    ];

    let activePlayer = players[1];
    const getActivePlayer = () => activePlayer;

    const switchActivePlayer = function() {
        if (activePlayer === players[0]) {
            activePlayer = players[1];
            console.log(`its ${players[1].name}'s turn`)
        } else {
            activePlayer = players[0];
            console.log(`its ${players[0].name}'s turn`)
        } 
    }
    return {switchActivePlayer, getActivePlayer}
})();


const Game = (function() {

    function gameRound(row, col) {
        const marker = Player.getActivePlayer().marker
        if (row > 2 || col > 2 || row < 0 || col < 0) {
            alert("wrong num")
        } else {
            if (Gameboard.getBoard()[row][col] === 0) {
                Gameboard.getBoard()[row][col] = marker;
                console.log(Gameboard.getBoard());

                if (checkWinner()) {
                    renderDOM.cleanBoard();
                    restartGame();
                    
                } else Player.switchActivePlayer(); 

            } else {
                alert("that spot is already taken!")
            } 
        } 
    } 

    const checkWinner = function() {

        function allEqual(a, b, c) {
            return a === b && b === c && a !== 0;
        }

        const board = Gameboard.getBoard()
        for (i = 0; i < 3; i++) {
            if ((allEqual(board[i][0], board[i][1], board[i][2]) ||
                allEqual (board[0][0], board[1][1], board[2][2]) ||
                allEqual(board[0][2], board[1][1], board[2][0]))) {

                console.log(`${Player.getActivePlayer().name} won`)
                return true
            }
            for (j = 0; j < 3; j++) {
                if (allEqual(board[0][j], board[1][j], board[2][j])) {
                    console.log(`${Player.getActivePlayer().name} won`)
                    return true
                } 
            }
        } 
        return false
    }

    const restartGame = function() {
        const restart = Gameboard.newBoard();
        return restart
    }

    const playRound = (row, col) => gameRound(row, col);

    return {playRound} 
})();

Player.switchActivePlayer();
Gameboard.newBoard();

const renderDOM = (function() {
    const cells = document.querySelectorAll(".cell");

    function changeCell() {
        const columns = 3;

        cells.forEach((cell, index) => {
            const row = Math.floor(index / columns);
            const col = index % columns;

            cell.dataset.row = row;
            cell.dataset.col = col;

            cell.addEventListener ("click", () => {
                const row = parseInt(cell.dataset.row);
                const col = parseInt(cell.dataset.col);

                Game.playRound(row, col);
                const currentValue = Gameboard.getBoard()[row][col];
                cell.textContent = currentValue;
            })
        })
    }

    function cleanBoard() {
        cells.forEach((cell) => {
            cell.textContent = ""
        })
    }

    const getChangeCell = () => changeCell();
    return {getChangeCell, cleanBoard};
})();

renderDOM.getChangeCell();

