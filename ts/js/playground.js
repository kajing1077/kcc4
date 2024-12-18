class Node {
  constructor(value, prev = null, next = null) {
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(value) {
    const newNode = new Node(value);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
  }

  insertAt(value, position) {
    const newNode = new Node(value);

    // 위치가 0이면 head에 삽입
    if (position === 0) {
      newNode.next = this.head;
      this.head = newNode;
      if (this.tail === null) {
        this.tail = newNode;
      }
      return;
    }

    let current = this.head;
    let index = 0;
    let previous = null;

    // position 위치까지 이동
    while (current !== null && index < position) {
      previous = current;
      current = current.next;
      index++;
    }

    // 연결 재구성
    newNode.next = current;
    previous.next = newNode;

    // 만약 마지막 위치라면 tail 업데이트
    if (current === null) {
      this.tail = newNode;
    }
  }

  print() {
    let current = this.head;
    const values = [];

    while (current !== null) {
      values.push(current.value);
      current = current.next;
    }

    console.log(values.join(" -> "));
  }
}
class Stack {
  
}
const list = new LinkedList();
list.append(1);
list.append(2);
list.append(3);
list.insertAt(3, 1);

list.print();
