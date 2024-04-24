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
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

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