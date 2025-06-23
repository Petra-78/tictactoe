const Gameboard = (function() {
    const rows = 3;
    const columns = 3;
    const board = [];

    const Cell = function() {
        const value = 0;  
        return value
    }

    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < columns; j++) {
            row.push(Cell())
        }
        board.push(row);
    }

    const getBoard = function() {
        return board;
    }
    return {getBoard}   
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
})()


const Game = (function() {
    function gameRound(row, col) {
        const marker = Player.getActivePlayer().marker
        if (row > 2 || col > 2 || row < 0 || col < 0) {
            alert("wrong num")
        } else {
            if (Gameboard.getBoard()[row][col] === 0) {
                Gameboard.getBoard()[row][col] = marker;
                console.log(Gameboard.getBoard())
                Player.switchActivePlayer();
            } else {
                alert("that spot is already taken!")
            } 
        }
    } 

    const playRound = (row, col) => gameRound(row, col);
    return {playRound}
})()

Player.switchActivePlayer();

const checkWinner = function() {
    for (i = 0; i < 3; i++) {
        if (Gameboard.getBoard()[i]) {
            console.log("hehe")
        }
        
    }
}