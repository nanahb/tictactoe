import React, { useState } from 'react'
import { createBoard } from '../tictactoe.js';

const playerEmojis = {'X':'🐻','O':'🐼'}
const hPadding = "‎️‍🔥".repeat(10)
function stringifyBoard(board) {
    var res = "🌊".repeat(25)
    let boardStr = hPadding + " 0  1  2 "+hPadding+"\n"
     + board.map((row, index) => 
    hPadding + index.toString() + row.map(el => { if (!el) { return "  " } else { return el } }).join("|") + hPadding )
     .join("\n")
    boardStr = boardStr.replaceAll('X', playerEmojis['X'])
    boardStr = boardStr.replaceAll('O', playerEmojis['O'])
    res += boardStr
    res += "🌊".repeat(25)
    return res
}
const Board = (props) => {
    const [state, setState] = useState(createBoard())
    return (<h1>state:{stringifyBoard(state)}</h1>)
}

export default Board;