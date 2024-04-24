import React, { useState } from 'react';
import { Box, Button, Grid, useToast } from '@chakra-ui/react';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const toast = useToast();

  const calculateWinner = (squares) => {
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
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    const newBoard = [...board];
    if (calculateWinner(board) || newBoard[index]) return;
    newBoard[index] = 'X'; // Player's move
    setBoard(newBoard);
    setIsXNext(!isXNext);

    // Computer's move
    const emptyIndices = newBoard.map((value, idx) => value === null ? idx : null).filter(v => v !== null);
    if (emptyIndices.length > 0 && !calculateWinner(newBoard)) {
      const bestMove = findBestMove(newBoard);
      newBoard[bestMove] = 'O';
      setBoard(newBoard);
    }

    // Check for winner
    if (calculateWinner(newBoard)) {
      toast({
        title: `Player ${calculateWinner(newBoard)} has won!`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const findBestMove = (board) => {
    const availableMoves = board.map((value, idx) => value === null ? idx : null).filter(v => v !== null);
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < availableMoves.length; i++) {
      const index = availableMoves[i];
      board[index] = 'O';
      let score = minimax(board, 0, false);
      board[index] = null;
      if (score > bestScore) {
        bestScore = score;
        move = index;
      }
    }
    return move;
  };

  const minimax = (board, depth, isMaximizing) => {
    const winner = calculateWinner(board);
    if (winner === 'X') return -10;
    if (winner === 'O') return 10;
    if (board.every(cell => cell !== null)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = 'O';
          let score = minimax(board, depth + 1, false);
          board[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = 'X';
          let score = minimax(board, depth + 1, true);
          board[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true); // Ensure player starts first after reset
  };

  return (
    <Box p={4}>
      <Grid templateColumns="repeat(3, 120px)" templateRows="repeat(3, 120px)" gap={2}>
        {board.map((value, index) => (
          <Button key={index} onClick={() => handleClick(index)} p={10} fontSize="2xl">
            {value}
          </Button>
        ))}
      </Grid>
      <Button onClick={handleReset} mt={4}>
        Reset Game
      </Button>
    </Box>
  );
};

export default TicTacToe;