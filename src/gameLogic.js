export const BOARD_SIZE = 20;
export const INITIAL_SPEED = 150;
export const MIN_SPEED = 70;
export const SPEED_STEP = 5;

export const INITIAL_SNAKE = [{ x: 10, y: 10 }];
export const INITIAL_DIRECTION = { x: 1, y: 0 };

export function createCellKey(position) {
  return `${position.x}-${position.y}`;
}

export function generateFood(snake) {
  const occupiedCells = new Set(snake.map(createCellKey));
  const availableCells = [];

  for (let y = 0; y < BOARD_SIZE; y += 1) {
    for (let x = 0; x < BOARD_SIZE; x += 1) {
      const position = { x, y };

      if (!occupiedCells.has(createCellKey(position))) {
        availableCells.push(position);
      }
    }
  }

  if (availableCells.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * availableCells.length);
  return availableCells[randomIndex];
}

export function getNextHead(snake, direction) {
  const head = snake[0];

  return {
    x: head.x + direction.x,
    y: head.y + direction.y,
  };
}

export function hasWallCollision(head) {
  return (
    head.x < 0 ||
    head.x >= BOARD_SIZE ||
    head.y < 0 ||
    head.y >= BOARD_SIZE
  );
}

export function hasSelfCollision(head, body) {
  return body.some((segment) => segment.x === head.x && segment.y === head.y);
}

export function isSamePosition(a, b) {
  return Boolean(a && b && a.x === b.x && a.y === b.y);
}

export function isOppositeDirection(currentDirection, nextDirection) {
  return (
    currentDirection.x + nextDirection.x === 0 &&
    currentDirection.y + nextDirection.y === 0
  );
}
