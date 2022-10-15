import "./Chessboard.css";
import { useState } from "react";
import { buildBoard, boardNotationToInteger } from "./helpers";

const Chessboard = () => {
  const board = buildBoard();

  const [boardState, setBoardState] = useState(board);

  const movePiece = (currentPosition, newPosition) => {
    const [currentX, currentY] = boardNotationToInteger(currentPosition);
    const [newX, newY] = boardNotationToInteger(newPosition);

    console.table({ currentPosition, currentX, currentY });
    console.table({ newPosition, newX, newY });

    const newBoard = buildBoard();
    console.log({ boardState });

    for (let i = 0; i < newBoard.length; i++) {
      if (newBoard[i].y === currentY && newBoard[i].x === currentX) {
        newBoard[i].y = newY;
        newBoard[i].x = newX;
      }
    }
    setBoardState(newBoard);
  };

  return (
    <div>
      <div id='chessboard'>{boardState}</div>
      <button
        onClick={() => {
          movePiece("e2", "e4");
        }}
      >
        Change position
      </button>
    </div>
  );
};

export default Chessboard;
