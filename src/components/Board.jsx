import { BOARD_SIZE } from "../gameLogic.js";
import Food from "./Food.jsx";
import Snake from "./Snake.jsx";

const cells = Array.from({ length: BOARD_SIZE * BOARD_SIZE }, (_, index) => index);

function Board({ snake, food }) {
  return (
    <section
      className="board"
      aria-label="Tablero de Snake de 20 por 20"
      style={{
        "--board-size": BOARD_SIZE,
      }}
    >
      {cells.map((cell) => (
        <span className="board-cell" key={cell} aria-hidden="true" />
      ))}
      <Snake snake={snake} />
      <Food food={food} />
    </section>
  );
}

export default Board;
