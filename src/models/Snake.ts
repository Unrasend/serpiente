import { Direction } from './Types';
import { calcNewPosition } from '../utils/GameLogic';
import { Node as SnakeNode } from './Node';

export class Snake {

  head: SnakeNode;
  cells: Set<number>;
  
  constructor(head: SnakeNode, cells: Set<number>) {
    this.head = head;
    this.cells = cells;
  }

  move(direction: Direction, shouldGrow: boolean = false): Snake {
    const newHeadPos = calcNewPosition(this.head.value, direction);
    const newHead = new SnakeNode(newHeadPos);
    const newCells = new Set<number>();
    newCells.add(newHeadPos);

    let current = this.head;
    let newCurrent = newHead;

    while(shouldGrow ? current : current.next) {
      const newNode = new SnakeNode(current.value);
      newCurrent.next = newNode;
      newCurrent = newNode;
      newCells.add(current.value);
      
      if (!current.next) break; 
      current = current.next; 
    }
    
    return new Snake(newHead, newCells);
  }

  tail(): SnakeNode | null {
    let current = this.head;
    while(current.next) {
      current = current.next;
    }
    return current;
  }

}
