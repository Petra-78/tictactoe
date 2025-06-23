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

    const getBoard = function() {
        return board;
    }
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
                checkWinner();
                Player.switchActivePlayer();
            } else {
                alert("that spot is already taken!")
            } 
        } 
    } 

    const playRound = (row, col) => gameRound(row, col);

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
            }
            for (j = 0; j < 3; j++) {
                if (allEqual(board[0][j], board[1][j], board[2][j])) {
                    console.log(`${Player.getActivePlayer().name} won`)
                } 
            }
        }
    }
    return {playRound} 
})();

Player.switchActivePlayer();

const restartGame = function() {
    const restart = Gameboard.newBoard();
    return restart
}