import React, { useState, useRef } from 'react';
import { TicTacToeBoard } from '../components/TicTacToeBoard';

const template = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

const checkWinner = (board, x, y, currentPlayer) => {
  // check the col
  if (board[x][0] === currentPlayer && board[x][1] === currentPlayer && board[x][2] === currentPlayer) {
    return true;
  }
  // check the row
  if (board[0][y] === currentPlayer && board[1][y] === currentPlayer && board[2][y] === currentPlayer) {
    return true;
  }

  if (board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] === currentPlayer) {
    return true;
  }

  if (board[2][0] === currentPlayer && board[1][1] === currentPlayer && board[0][2] === currentPlayer) {
    return true;
  }

  return false;
};

export const TicTacToePage = () => {
  const [board, setBoard] = useState(template);
  const [player, setPlayer] = useState(Math.random() < 0.5 ? 'x' : 'o');
  const hasWinnerRef = useRef(false);

  const onClick = (row, col) => {
    if (board[row][col] !== '') {
      return;
    }

    if (hasWinnerRef.current) {
      return;
    }

    const newBoard = [...board];
    newBoard[row][col] = player;

    if (checkWinner(newBoard, row, col, player)) {
      hasWinnerRef.current = true;
    }

    if (player === 'x') {
      setPlayer('o');
    } else {
      setPlayer('x');
    }
    setBoard(newBoard);
  };

  const reset = () => {
    const newBoard = board.map((row) => row.map(() => ''));
    setPlayer((prevPlayer) => (prevPlayer === 'x' ? 'o' : 'x'));
    hasWinnerRef.current = false;
    setBoard([...newBoard]);
  };

  return (
    <>
      <div>Tic Tae Toe</div>
      <div>
        <button onClick={reset}>Reset</button>
        <div>It is {player}&apos;s turn</div>
      </div>
      <TicTacToeBoard matrix={board} onClick={onClick} />
    </>
  );
};
