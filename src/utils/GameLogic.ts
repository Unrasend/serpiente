import { Direction } from '../models/Types';
import { GRID_SIZE } from '../constants/Config'; 


export const calcNewPosition = (position: number, direction: Direction): number => {
  if (direction === Direction.LEFT) {
    return position - 1;
  }
  if (direction === Direction.RIGHT) {
    return position + 1;
  }
  if (direction === Direction.UP) {
    return position - GRID_SIZE;
  }
  if (direction === Direction.DOWN) {
    return position + GRID_SIZE;
  }
  return position;
}

export const invertDirection = (direction: Direction): Direction => {
  switch (direction) {
    case Direction.LEFT:
      return Direction.RIGHT;
    case Direction.RIGHT:
      return Direction.LEFT;
    case Direction.UP:
      return Direction.DOWN;
    case Direction.DOWN:
      return Direction.UP;
  }
}


