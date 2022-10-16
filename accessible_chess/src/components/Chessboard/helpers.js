import Tile from "../Tile/tile";

const buildPieces = () => {
  const pieces = { w: [], b: [] };

  for (let i = 0; i < 2; i++) {
    const type = i === 0 ? "b" : "w";
    const y = i === 0 ? 8 : 1;

    pieces[type].push({
      name: "Rook",
      image: `assets/images/rook_${type}.png`,
      x: 1,
      y,
    });
    pieces[type].push({
      name: "Rook",
      image: `assets/images/rook_${type}.png`,
      x: 8,
      y,
    });
    pieces[type].push({
      name: "Knight",
      image: `assets/images/knight_${type}.png`,
      x: 2,
      y,
    });
    pieces[type].push({
      name: "Knight",
      image: `assets/images/knight_${type}.png`,
      x: 7,
      y,
    });
    pieces[type].push({
      name: "Bishop",
      image: `assets/images/bishop_${type}.png`,
      x: 3,
      y,
    });
    pieces[type].push({
      name: "Bishop",
      image: `assets/images/bishop_${type}.png`,
      x: 6,
      y,
    });
    pieces[type].push({
      name: "Queen",
      image: `assets/images/queen_${type}.png`,
      x: 4,
      y,
    });
    pieces[type].push({
      name: "King",
      image: `assets/images/king_${type}.png`,
      x: 5,
      y,
    });
  }

  for (let i = 1; i < 9; i++) {
    pieces["b"].push({
      name: "Pawn",
      image: "assets/images/pawn_b.png",
      x: i,
      y: 7,
    });
  }

  for (let i = 1; i < 9; i++) {
    pieces["w"].push({
      name: "Pawn",
      image: "assets/images/pawn_w.png",
      x: i,
      y: 2,
    });
  }

  return pieces;
};

const buildBoard = (pieces) => {
  let board = [];

  for (let j = 8; j > 0; j--) {
    for (let i = 0; i < 8; i++) {
      const number = j + i + 1;
      let image = "";

      pieces["w"].forEach((p) => {
        if (p.x === i + 1 && p.y === j) {
          image = p.image;
        }
      });
      pieces["b"].forEach((p) => {
        if (p.x === i + 1 && p.y === j) {
          image = p.image;
        }
      });
      board.push(<Tile key={`${j},${i}`} image={image} number={number} />);
    }
  }

  return [board];
};

const boardNotationToInteger = (stringPosition) => {
  const letterToInt = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8 };
  const intPosition_x = letterToInt[stringPosition[0]];
  const intPosition_y = parseInt(stringPosition[1]);

  return [intPosition_x, intPosition_y];
};

export { buildPieces, buildBoard, boardNotationToInteger };
