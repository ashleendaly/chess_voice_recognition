const stripNonsense = (textInput) => {
  const inputArray = textInput.split(/(\s+)/);
  const inputNoSpaces = inputArray.filter((w) => w !== " ");
  const inputNoPunctuation = inputNoSpaces.map((w) => w.replace(/\W/g, ""));
  return inputNoPunctuation;
};

const destructureInput = (textInput) => {
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

  if (!textInput) return ["", "", ""];

  const playerMoveArray = stripNonsense(textInput);

  const pos0 = playerMoveArray[0];
  const pos1 = playerMoveArray[1];
  const pos2 = playerMoveArray[2];
  const pos3 = playerMoveArray[3];
  const pos4 = playerMoveArray[4];
  const pos5 = playerMoveArray[5];

  const capture_options = ["captures", "takes"];
  const capture = capture_options.includes(pos3.toLowerCase()) ? "x" : "";

  let pieceSymbol = "";
  if (pos0.toLowerCase()[0] === "p" && capture === "x") {
    pieceSymbol = "e";
  } else if (pos0.toLowerCase()[0] === "p") {
    pieceSymbol = "";
  } else {
    pieceSymbol = pos0.toUpperCase()[0];
  }

  const currentPos = pos1 + toNumber[pos2];
  const newPos = pos4 + toNumber[pos5];

  const chessNotation = pieceSymbol + capture + newPos;

  return [chessNotation, currentPos, newPos];
};

export { destructureInput };
