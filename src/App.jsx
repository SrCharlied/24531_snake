import { useCallback, useEffect, useRef, useState } from "react";
import Board from "./components/Board.jsx";
import GameOver from "./components/GameOver.jsx";
import Score from "./components/Score.jsx";
import StartScreen from "./components/StartScreen.jsx";
import {
  INITIAL_DIRECTION,
  INITIAL_SNAKE,
  INITIAL_SPEED,
  MIN_SPEED,
  SPEED_STEP,
  generateFood,
  getNextHead,
  hasSelfCollision,
  hasWallCollision,
  isOppositeDirection,
  isSamePosition,
} from "./gameLogic.js";

const keyDirections = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};

function App() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(() => generateFood(INITIAL_SNAKE));
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);

  const directionRef = useRef(INITIAL_DIRECTION);

  const resetGame = useCallback(() => {
    const startingSnake = [...INITIAL_SNAKE];

    directionRef.current = INITIAL_DIRECTION;
    setSnake(startingSnake);
    setFood(generateFood(startingSnake));
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setGameOver(false);
    setSpeed(INITIAL_SPEED);
    setGameStarted(true);
  }, []);

  const startGame = useCallback(() => {
    resetGame();
  }, [resetGame]);

  const moveSnake = useCallback(() => {
    setSnake((currentSnake) => {
      const nextHead = getNextHead(currentSnake, directionRef.current);
      const ateFood = isSamePosition(nextHead, food);
      const bodyToCheck = ateFood ? currentSnake : currentSnake.slice(0, -1);

      if (hasWallCollision(nextHead) || hasSelfCollision(nextHead, bodyToCheck)) {
        setGameOver(true);
        return currentSnake;
      }

      const nextSnake = [nextHead, ...currentSnake];

      if (ateFood) {
        setScore((currentScore) => currentScore + 1);
        setSpeed((currentSpeed) => Math.max(currentSpeed - SPEED_STEP, MIN_SPEED));
        setFood(generateFood(nextSnake));
        return nextSnake;
      }

      nextSnake.pop();
      return nextSnake;
    });
  }, [food]);

  useEffect(() => {
    function handleKeyDown(event) {
      const nextDirection = keyDirections[event.key];

      if (!nextDirection) {
        return;
      }

      event.preventDefault();

      if (gameOver) {
        return;
      }

      if (!gameStarted) {
        setGameStarted(true);
      }

      if (isOppositeDirection(directionRef.current, nextDirection)) {
        return;
      }

      directionRef.current = nextDirection;
      setDirection(nextDirection);
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameOver, gameStarted]);

  useEffect(() => {
    if (!gameStarted || gameOver) {
      return undefined;
    }

    const interval = window.setInterval(moveSnake, speed);

    return () => {
      window.clearInterval(interval);
    };
  }, [gameStarted, gameOver, moveSnake, speed, direction]);

  if (!gameStarted) {
    return (
      <div className="app">
        <main className="game-container start-container">
          <StartScreen onStart={startGame} />
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <main className="game-container">
        <header className="game-header">
          <div>
            <p className="game-kicker">React + Vite</p>
            <h1 className="game-title">Snake Game</h1>
          </div>
          <Score score={score} />
        </header>

        <Board snake={snake} food={food} />

        <p className="controls-hint">Usa las flechas del teclado para moverte</p>

        {gameOver && <GameOver score={score} onRestart={resetGame} />}
      </main>
    </div>
  );
}

export default App;
