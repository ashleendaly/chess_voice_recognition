const stripNonsense = (textInput) => {
  const inputArray = textInput.split(/(\s+)/);
  const inputNoSpaces = inputArray.filter((w) => w !== " ");
  const inputNoPunctuation = inputNoSpaces.map((w) => w.replace(/\W/g, ""));
  return inputNoPunctuation;
};

const generateChessnotation = (textInput) => {
  if (!textInput) return;

  const toNumber = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
  };

  const playerMoveArray = stripNonsense(textInput);
  const arrLength = playerMoveArray.length;
  console.log({ playerMoveArray });

  const piece = playerMoveArray[0].toLowerCase();
  const capture = arrLength === 4 ? "x" : "";

  let pieceSymbol = "";
  if (piece.toLowerCase()[0] === "p" && arrLength === 4) {
    pieceSymbol = "e";
  } else if (piece.toLowerCase()[0] === "p") {
    pieceSymbol = "";
  } else {
    pieceSymbol = piece.toUpperCase()[0];
  }

  return (
    pieceSymbol +
    capture +
    playerMoveArray[arrLength - 2].toLowerCase() +
    toNumber[playerMoveArray[arrLength - 1].toLowerCase()]
  );
};

export { generateChessnotation };
