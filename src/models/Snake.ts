import { Node } from './Node';

export class Snake {
  head: Node;
  constructor(node: Node) {
    this.head = node;
  }

  increase(lastCell: number) {
    let node = this.head;
    while (node.next) {
      node = node.next;
    }
    node.next = new Node(lastCell);
  }
}
