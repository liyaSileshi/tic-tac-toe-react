import React from 'react';
import './Square.css';
import PropTypes from 'prop-types';

function Square(props) {
  const { onClick, value } = props;
  return (
    <button
      type="button"
      className="square"
      onClick={onClick}
    >
      {value}
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export { Square, calculateWinner };

// Define your prop types here:
Square.propTypes = {
  value: PropTypes.number, // An int
  onClick: PropTypes.func.isRequired, // a required function
};

// Set a default values for props
Square.defaultProps = {
  value: null, // the default for name
};
