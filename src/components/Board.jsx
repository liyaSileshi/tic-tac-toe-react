import React from 'react';
import PropTypes from 'prop-types';
import { Square } from './Square';
import './Board.css';

class Board extends React.Component {
  renderSquare(i) {
    const { squares, onClick } = this.props;
    return (
      <Square
        value={squares[i]}
        onClick={() => onClick(i)}
        // onClick={this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default Board;

// Define your prop types here:
Board.propTypes = {
  // squares : PropTypes.array,
  squares: PropTypes.arrayOf(PropTypes.string), // An int
  onClick: PropTypes.func.isRequired, // a required function
};

// Set a default values for props
Board.defaultProps = {
  squares: null, // the default for name
};
