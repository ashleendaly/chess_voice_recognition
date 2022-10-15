import "./Chessboard.css";

const Chessboard = (props) => {
  const { boardState } = props;

  return (
    <div>
      <div id='chessboard'>{boardState}</div>
    </div>
  );
};

export default Chessboard;
