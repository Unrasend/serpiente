export const GRID_SIZE = 21;
export const GRID_LENGTH = GRID_SIZE * GRID_SIZE;
export const CELL_SIZE_PX = 25;
export const TICK_RATE_MS = 400;

export const BOARD = [...Array(GRID_SIZE * GRID_SIZE).keys()];

const startCell = Math.ceil(GRID_LENGTH / 2 - 1);
export const INITIAL_SNAKE = [
  startCell,
  startCell - GRID_SIZE,
  startCell - 2 * GRID_SIZE,
];
