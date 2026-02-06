export class Node {
  value: number;
  next: Node | null;
  constructor(value: number, next: Node | null = null) {
    this.value = value;
    this.next = next;
  }
}
