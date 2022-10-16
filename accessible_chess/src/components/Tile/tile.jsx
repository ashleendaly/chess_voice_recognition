import "./tile.css";

const Tile = (props) => {
  const { number, image } = props;
  return (
    <div className={`tile ${number % 2 === 0 ? "black-tile" : "white-tile"}`}>
      {image && (
        <div
          style={{ backgroundImage: `url(${image})` }}
          className='chess-piece'
        ></div>
      )}
    </div>
  );
};

export default Tile;
