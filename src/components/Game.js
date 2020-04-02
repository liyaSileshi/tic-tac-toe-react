import React from 'react'
import Board from './Board'
import './Game.css'
import { calculateWinner } from './Square';
class Game extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        stepNumber: 0,
        xIsNext: true,
      };
    }

    handleClick(i) {
      const history = this.state.history.slice(0,
        this.state.stepNumber + 1); //to make sure if we go back and make change, we throw away all the past 'futures'
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history : history.concat([{
          squares: squares  
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      });
    }

    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0, //returns T/F
      });
    }

    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber]; //the last element in the array(the recent state of the game)
      const winner = calculateWinner(current.squares);
      console.log(current.squares)
      console.log('yo')
      const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        return (
          <li key={move}>
            <button onClick= {() => this.jumpTo(move)}>
              {desc}
            </button>
          </li>
        );
      });

      let status;
      if (winner) {
        status = "winner: " + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext 
        ? 'X' : 'O');
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares = {current.squares} 
              onClick = {(i) => this.handleClick(i)}
             />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
      
    }
  }


export default Game; 