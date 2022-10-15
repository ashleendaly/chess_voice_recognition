import Tile from "../Tile/tile";

const buildBoard = () => {
  const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

  const pieces = [];

  for (let i = 0; i < 2; i++) {
    const type = i === 0 ? "b" : "w";
    const y = i === 0 ? 8 : 1;

    pieces.push({
      name: "Rook",
      image: `assets/images/rook_${type}.png`,
      type: type,
      x: 1,
      y,
    });
    pieces.push({
      name: "Rook",
      image: `assets/images/rook_${type}.png`,
      type: type,
      x: 8,
      y,
    });
    pieces.push({
      name: "Knight",
      image: `assets/images/knight_${type}.png`,
      type: type,
      x: 2,
      y,
    });
    pieces.push({
      name: "Knight",
      image: `assets/images/knight_${type}.png`,
      type: type,
      x: 7,
      y,
    });
    pieces.push({
      name: "Bishop",
      image: `assets/images/bishop_${type}.png`,
      type: type,
      x: 3,
      y,
    });
    pieces.push({
      name: "Bishop",
      image: `assets/images/bishop_${type}.png`,
      type: type,
      x: 6,
      y,
    });
    pieces.push({
      name: "Queen",
      image: `assets/images/queen_${type}.png`,
      type: type,
      x: 4,
      y,
    });
    pieces.push({
      name: "King",
      image: `assets/images/king_${type}.png`,
      type: type,
      x: 5,
      y,
    });
  }

  for (let i = 1; i < 9; i++) {
    pieces.push({
      name: "Pawn",
      image: "assets/images/pawn_b.png",
      type: "b",
      x: i,
      y: 7,
    });
  }

  for (let i = 1; i < 9; i++) {
    pieces.push({
      name: "Pawn",
      image: "assets/images/pawn_w.png",
      type: "w",
      x: i,
      y: 2,
    });
  }

  let board = [];

  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      const number = j + i + 2;
      let image = "";

      pieces.forEach((p) => {
        if (p.x === i && p.y === j) {
          image = p.image;
        }
      });
      board.push(<Tile key={`${j},${i}`} image={image} number={number} />);
    }
  }
  return board;
};

export { buildBoard };
