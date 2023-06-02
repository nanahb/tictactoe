import { exit } from "process";
import * as readline from "readline";


/** Console-only logic */ 
const playerEmojis = {'X':'🐻','O':'🐼'}
const hPadding = "‎️‍🔥".repeat(10)
function logBoard(board) {
    //[null, "X", null].map(el => {if(!el){return " "}else{return el}}).join("|")
    console.log("🌊".repeat(25))
    let boardStr = hPadding + " 0  1  2 "+hPadding+"\n"
     + board.map((row, index) => 
    hPadding + index.toString() + row.map(el => { if (!el) { return "  " } else { return el } }).join("|") + hPadding )
     .join("\n")
    boardStr = boardStr.replaceAll('X', playerEmojis['X'])
    boardStr = boardStr.replaceAll('O', playerEmojis['O'])
    console.log(boardStr)
    console.log("🌊".repeat(25))
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