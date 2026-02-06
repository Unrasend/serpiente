import { Direction } from '../models/Types';
import { GRID_SIZE } from '../constants/Config'; 
import { Node } from '../models/Node';
import { Snake } from '../models/Snake';

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

export const updateSnake = (snake: Snake, direction: Direction): [Snake, Set<number>, number] => {
  const headVal = snake.head.value;
  const newHeadPos = calcNewPosition(headVal, direction);
  const newHead = new Node(newHeadPos);
  
  const cells = new Set<number>();
  cells.add(newHeadPos);

  let currentOld = snake.head;
  let currentNew = newHead;

  while (currentOld.next) {
    const newNode = new Node(currentOld.value);
    currentNew.next = newNode;
    currentNew = newNode;
    cells.add(currentOld.value);
    currentOld = currentOld.next;
  }
  
  const lastCell = currentOld.value;
  
  return [new Snake(newHead), cells, lastCell];
}
