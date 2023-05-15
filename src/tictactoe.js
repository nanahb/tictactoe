import { exit } from "process";
import * as readline from "readline";

export function createBoard() {
    return [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];
}

function isValidMove(board, row, col) {
    //row is in range
    if (row >= 0 && row <= 2) {
        // col is in range
        if (col >= 0 && col <= 2) {
            // position is unoccupied
            if (board[row][col] === null) {
                return true
            }
            throw new Error(`Cell at row ${row}, column ${col} is already occupied`)
        }
    }
    return false
}

export function updateBoard(board, row, col, symbol) {
    return placeSymbol(board, row, col, symbol)
}

function placeSymbol(board, row, col, symbol) {
    console.log("Placing")
    if (isValidMove(board, row, col)) {
        board[row][col] = symbol
        return board
    }
}

/**
 * Function to check for the winner.
 * @param Int[][] board 
 * @returns 'X if X is winner, 'O' if o is winner. If no winner yet, return null.
 */
export function checkWinner(board) {
    // Check rows
    // TODO
    for (let row of board) {
        if (row.every(cell => cell == 'X')) {
            return 'X'
        }
        if (row.every(cell => cell == 'O')) {
            return 'O'
        }
    }
    // Check columns
    for (let index = 0; index < 3; index++) {
        const column_at_index = [board[0][index], board[1][index], board[2][index]]
        if (column_at_index.every(cell => cell == 'X')) {
            return 'X'
        }
        if (column_at_index.every(cell => cell == 'O')) {
            return 'O'
        }
    }

    // Check diagonals
    // TODO
    let diagA = [0, 1, 2].map(i => board[i][i])
    let diagB = [0, 1, 2].map(i => board[i][2 - i])
    if (diagA.every(cell => cell == 'X') || diagB.every(cell => cell == 'X')) {
        return 'X'
    }
    if (diagA.every(cell => cell == 'O') || diagB.every(cell => cell == 'O')) {
        return 'O'
    }

    return null;
}


export function isBoardFull(board) {
    if (board.every(row => row.every(cell => cell != null))) {
        return true
    }
    return false
}

const winDecoration = '🎉'.repeat(30)
function play(board, row, col, currentPlayer) {
    if (!isValidMove(board, row, col)) {
        console.log(`Invalid move!${row}, ${col}`);
        return;
    }
    placeSymbol(board, row, col, currentPlayer);
    const winner = checkWinner(board);
    if (winner !== null) {
        console.log(`${winner} wins!` + winDecoration);
        exit()
        return;
    }
}

/** Console-only logic */ 
const playerEmojis = {'X':'🐻','O':'🐼'}
const hPadding = "‎️‍🔥".repeat(10)
function logBoard(board) {
    //[null, "X", null].map(el => {if(!el){return " "}else{return el}}).join("|")
    console.log("-".repeat(50))
    let boardStr = hPadding + " 0  1  2 "+hPadding+"\n"
     + board.map((row, index) => 
    hPadding + index.toString() + row.map(el => { if (!el) { return "  " } else { return el } }).join("|") + hPadding )
     .join("\n")
    boardStr = boardStr.replaceAll('X', playerEmojis['X'])
    boardStr = boardStr.replaceAll('O', playerEmojis['O'])
    console.log(boardStr)
    console.log("-".repeat(50))
}

async function prompt(board, currentPlayer) {
    let r, c
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    logBoard(board)
    rl.setPrompt(`Okay ${currentPlayer}, choose your move. Write row,col separated by a comma.\n`);
    rl.prompt();
    let promise = new Promise((resolve, reject) => {

        rl.on('line', (userInput) => {
            let parsed = userInput.split(",").map(s => parseInt(s))
            r = parsed[0]
            c = parsed[1]
            rl.close();
            play(board, r, c, currentPlayer)
            let nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
            prompt(board, nextPlayer)
        });
    });
    await promise
    
    console.log(board)
}

await prompt(createBoard(), "X")