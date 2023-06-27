import React, { useState } from 'react'
import { createBoard, updateBoard, isValidMove, checkWinner, isBoardFull } from '../tictactoe.js';

const playerEmojis = { 'X': '🐻', 'O': '🐼' }
const hPadding = "‎️‍🔥".repeat(10)
function stringifyBoard(board) {
    var res = "🌊".repeat(25)
    let boardStr = hPadding + " 0  1  2 " + hPadding + "\n"
        + board.map((row, index) =>
            hPadding + index.toString() + row.map(el => { if (!el) { return "  " } else { return el } }).join("|") + hPadding)
            .join("\n")
    boardStr = boardStr.replaceAll('X', playerEmojis['X'])
    boardStr = boardStr.replaceAll('O', playerEmojis['O'])
    res += boardStr
    res += "🌊".repeat(25)
    return res
}
const MyCell = (props) => {
    const style = {
        height: '40px',
        width: '40px',
        background: 'grey',
        margin: '1px',
        boarderColor: 'white',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
    return (<div style={style} onClick={props.onClick}>{playerEmojis[props.xOrO]}</div>)
}
const WinMessage = (props) => {
    let msg;
    if (props.winner === 'X'){
        msg = `${playerEmojis['X']} WINS!!!`
    }
    if (props.winner === 'O'){
        msg = `${playerEmojis['O']} WINS!!!`
    }
    if (props.winner === 'T'){
        msg = "Oh no, it's a tie!!!"
    }
    if (props.winner !== ''){
        return (<div>{msg}<button onClick={props.onResetClicked}>Play Again</button></div>)
    }
    
}

const Board = (props) => {
    const [boardState, setBoardState] = useState(createBoard())
    const [playerState, setPlayerState] = useState('X')
    const [winState, setWinState] = useState('') // empty string for no wins, X for xwin, O for owin, T for tie.
    function onResetClicked(){
        setBoardState(createBoard())
        setWinState('')
    }

    function onCellClick(row, col){
        try {
            if(winState !== ''){
                return;
            }
            let nextBoardState = updateBoard(boardState, row,col,playerState)
            setBoardState(nextBoardState)
            let maybeWinner = checkWinner(nextBoardState)
            if (maybeWinner===null && isBoardFull(nextBoardState)){
                maybeWinner = 'T'
            }
            if(maybeWinner !== null){ // X or O
                setWinState(maybeWinner)
            }
            let nextPlayer;
            if (playerState === 'X'){
                nextPlayer = 'O'
            } else {
                nextPlayer = 'X'
            }
            setPlayerState(nextPlayer)
         } catch (error) {
             console.log(error)
         }
    }
    
    let rows = boardState.map((row, rowIndex) => (<div style={{ display: 'flex' }}>{row.map((cell, colIndex) => (<MyCell xOrO={cell}
        onClick={e=>onCellClick(rowIndex, colIndex)}
    />))}</div>))
    return (<h1>currentPlayer:{playerEmojis[playerState]}<div>{rows}</div> <WinMessage onResetClicked={onResetClicked} winner={winState}/></h1>)
}

export default Board;