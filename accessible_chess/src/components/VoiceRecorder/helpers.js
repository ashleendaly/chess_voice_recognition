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

  const pos = stripNonsense(textInput.toLowerCase());

  const commonErrors = { s: "f", age: "h" };

  let pos1 = Object.keys(commonErrors).includes(pos[1])
    ? commonErrors[pos[1]]
    : pos[1];
  let pos4 = Object.keys(commonErrors).includes(pos[4])
    ? commonErrors[pos[4]]
    : pos[4];

  const currentPos = pos1 + toNumber[pos[2]];
  const newPos = pos4 + toNumber[pos[5]];

  return [currentPos, newPos];
};

export { destructureInput };
