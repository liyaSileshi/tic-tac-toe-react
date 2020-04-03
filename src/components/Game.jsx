import React from 'react';
// eslint-disable-next-line import/extensions
import Board from './Board.jsx';
import './Game.css';
import { calculateWinner } from './Square';

class Game extends React.Component {
  constructor(props) {
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
    const { history, stepNumber, xIsNext } = this.state;

    const newHistory = history.slice(0,
      // eslint-disable-next-line max-len
      stepNumber + 1); // to make sure if we go back and make change, we throw away all the past 'futures'
    const current = newHistory[newHistory.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    this.setState({
      history: newHistory.concat([{
        squares,
      }]),
      stepNumber: newHistory.length,
      xIsNext: !xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0, // returns T/F
    });
  }

  render() {
    const { history, stepNumber, xIsNext } = this.state;
    // eslint-disable-next-line max-len
    const current = history[stepNumber]; // the last element in the array(the recent state of the game)
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move
        ? `Go to move #${move}`
        : 'Go to game start';
      return (
        <li key={move}>
          <button type="button" onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = `winner: ${winner}`;
    } else {
      status = `Next player: ${xIsNext
        ? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
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
