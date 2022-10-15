import "./Chessboard.css";
import { useState } from "react";
import { buildPieces, buildBoard, boardNotationToInteger } from "./helpers";

const Chessboard = () => {
  const pieces = buildPieces();
  const board = buildBoard(pieces);

  const [boardState, setBoardState] = useState(board);

  const movePiece = (type, currentPosition, newPosition) => {
    const [currentX, currentY] = boardNotationToInteger(currentPosition);
    const [newX, newY] = boardNotationToInteger(newPosition);

    console.table({ currentPosition, currentX, currentY });
    console.table({ newPosition, newX, newY });

    console.log(type);
    console.table(pieces[type]);

    pieces[type].forEach((p) => {
      if (p.x === currentX && p.y === currentY) {
        p.x = newX;
        p.y = newY;
      }
    });

    console.table(pieces[type]);
    const newBoard = buildBoard(pieces);

    setBoardState(newBoard);
  };

  return (
    <div>
      <div id='chessboard'>{boardState}</div>
      <button
        onClick={() => {
          movePiece("b", "a7", "a2");
        }}
      >
        Change position
      </button>
    </div>
  );
};

export default Chessboard;
