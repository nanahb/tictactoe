import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/board.js';
console.log("AHAJDAIJOISAJDOSJD")
const App = () => {
  const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}
  return <div style={style}><Board></Board></div>;
};

ReactDOM.render(<App />, document.getElementById('root'));
