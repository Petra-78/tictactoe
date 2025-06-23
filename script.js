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




// const playerTurns = (function() {

//     const player1Turn = function() {
//         let player1Row = prompt('which row? (0-2)')
//         let player1Col = prompt('which column? (0-2)')

//         playRound(player1Row, player1Col);
//         console.log(Gameboard.getBoard()) 
//     }

//     const player2Turn = function() {
//         let player2Row = prompt('which row? (0-2)')
//         let player2Col = prompt('which column? (0-2)')

//         playRound(player2Row, player2Col);
//         console.log(Gameboard.getBoard());
//     }
//     const getPlayer1Turn = () => player1Turn();
//     const getPlayer2Turn = () => player2Turn();

//     return {getPlayer1Turn, getPlayer2Turn}
// })();

const Player = (function() {
    const players = [
        {name: "player1", marker: "x"}, 
        {name: "player2", marker: "o"}
    ];

    let activePlayer = players[0];
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
                Player.switchActivePlayer();
            } else {
                alert("that spot is already taken!")
            }
            console.log(Gameboard.getBoard())
        }
    } 

    const playRound = (row, col) => gameRound(row, col);
    return {playRound}
})()