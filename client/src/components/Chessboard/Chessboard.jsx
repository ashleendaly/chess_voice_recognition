import Tile from "../Tile/tile";
import "./Chessboard.css";


const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const horizontalDic = {"a":1, "b":2, "c":3, "d":4, "e":5, "f":6, "g":7, "h":8};

interface Piece {
  name: string;
  image: string;
  x: number;
  y: number;
}

const pieces: Piece[] = [];

// for (let p = 0; p < 2; p++) {
//   const type = p === 0 ? "b" : "w";
//   const y = p === 0 ? 7 : 0;

//   pieces.push({ name: "Rook", image: `assets/images/rook_${type}.png`, x: 0, y });
//   pieces.push({ name: "Rook", image: `assets/images/rook_${type}.png`, x: 7, y });
//   pieces.push({ name: "Knight", image: `assets/images/knight_${type}.png`, x: 1, y });
//   pieces.push({ name: "Knight", image: `assets/images/knight_${type}.png`, x: 6, y });
//   pieces.push({ name: "Bishop", image: `assets/images/bishop_${type}.png`, x: 2, y });
//   pieces.push({ name: "Bishop", image: `assets/images/bishop_${type}.png`, x: 5, y });
//   pieces.push({ name: "Queen", image: `assets/images/queen_${type}.png`, x: 3, y });
//   pieces.push({ name: "King", image: `assets/images/king_${type}.png`, x: 4, y });

for (let p = 0; p < 2; p++) {
  const type = p === 0 ? "b" : "w";
  const y = p === 0 ? 8 : 1;

  pieces.push({ name: "Rook", image: `assets/images/rook_${type}.png`, x: 0, y });
  pieces.push({ name: "Rook", image: `assets/images/rook_${type}.png`, x: 7, y });
  pieces.push({ name: "Knight", image: `assets/images/knight_${type}.png`, x: 1, y });
  pieces.push({ name: "Knight", image: `assets/images/knight_${type}.png`, x: 6, y });
  pieces.push({ name: "Bishop", image: `assets/images/bishop_${type}.png`, x: 2, y });
  pieces.push({ name: "Bishop", image: `assets/images/bishop_${type}.png`, x: 5, y });
  pieces.push({ name: "Queen", image: `assets/images/queen_${type}.png`, x: 3, y });
  pieces.push({ name: "King", image: `assets/images/king_${type}.png`, x: 4, y });
}

for (let i = 0; i < 8; i++) {
  pieces.push({ name: "Pawn", image: "assets/images/pawn_b.png", x: i, y: 6 });
}

for (let i = 0; i < 8; i++) {
  pieces.push({ name: "Pawn", image: "assets/images/pawn_w.png", x: i, y: 1 });
}

function movePiece(currentPosition, newPosition) {
    console.log({pieces})

    const current_x = horizontalDic[currentPosition[0]];
    const current_y = parseInt(currentPosition[1]);
    const new_x = horizontalDic[newPosition[0]];
    const new_y = parseInt(newPosition[1]);

    for (let i = 0; i < pieces.length; i ++){
        if (pieces[i].y === current_y && pieces[i].x === current_x) {
            pieces[i].y = new_y;
            pieces[i].x = new_x;
        }
    }
    console.log({pieces})




}

 const Chessboard = () => {
  let board = [];

  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      const number = j + i + 2;
      let image = undefined;

      pieces.forEach((p) => {
        if (p.x === i && p.y === j) {
          image = p.image;
        }
      });
      board.push(<Tile key={`${j},${i}`} image={image} number={number} />);
    }
  }

  return (
  <div>
  <div id="chessboard">{board}</div>
  <button onClick={()=>{movePiece("e2","e4")}}> Change position </button>
  </div>);
}

export default Chessboard;