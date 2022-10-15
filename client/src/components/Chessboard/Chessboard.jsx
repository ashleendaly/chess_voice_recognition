import "./Chessboard.css";
import { useState } from "react";
import { buildBoard } from "./helpers";

const movePiece = (currentPosition, newPosition) => {
  const letterToInt = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8 };
  const pieces = buildBoard();
  console.log({ pieces });
  const current_x = letterToInt[currentPosition[0]];
  const current_y = parseInt(currentPosition[1]);
  const new_x = letterToInt[newPosition[0]];
  const new_y = parseInt(newPosition[1]);
  for (let i = 0; i < pieces.length; i++) {
    if (pieces[i].y === current_y && pieces[i].x === current_x) {
      pieces[i].y = new_y;
      pieces[i].x = new_x;
    }
  }
  console.log({ pieces });
};

const Chessboard = () => {
  const board = buildBoard();

  const [boardState, setBoardState] = useState(board);

  return (
    <div>
      <div id='chessboard'>{board}</div>
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
