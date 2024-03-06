import "./App.css"
import React, { useState } from "react";
import Board from "./components/Board";

function App() {
  // HisTory State 객체를 App.js(부모) 단에서 처리
  const [history, setHistory] = useState([{squares: Array(9).fill(null)}])
  const [xIsNext , setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);

  const calculateWinner = (squares) => {
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
    ]

    for(let index = 0; index < lines.length; index++) {
      const [a,b,c] = lines[index];
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  let status;
  if(winner){
    status = `Winner: ${winner}`
  } else {
    status = `Next Player: ${ xIsNext ? 'X' : 'O'}`;
  }

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1); // 다시 되돌아가면 바뀔 미래 기록을 버리는 것
    const newCurrent = newHistory[newHistory.length - 1];
    const newSquares  = newCurrent.squares.slice(); // 원본아닌 복사본 수정 목적
    if(calculateWinner(newSquares) || newSquares[i]) {
      return; // 로직 종료
    }
    newSquares[i] = xIsNext ? 'X' : 'O';
    // history에 과거의 squares들을 저장 -> 내역 저장
    setHistory([...newHistory, {squares: newSquares}]);
    setXIsNext(prev => !prev) // true,false 지정

    setStepNumber(newHistory.length);
  }

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext((step % 2) === 0); // 마찬가지로 true, false 지정
  }

  const moves = history.map((step,move) => {
    const desc = move ?
    'Go to Move #' + move :
    'Go to game start';
    return(
      <li key={move}>
        <button className="move-button" onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });


  return (
    <div className="game">
      <div className="game-board">
        <Board 
          squares = {current.squares}
          onClick = {(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div className='status'>{status}</div>
        <ol style={{listStyle: 'none'}}>{moves}</ol>
      </div>
    </div>
  );
}

export default App;
