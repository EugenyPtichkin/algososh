export class Node<T> {
  value: T
  next: Node<T> | null
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}

interface ILinkedList<T> {
  append: (element: T) => void;
  prepend: (element: T) => void;
  insertAt: (element: T, position: number) => void;
  deleteAt: (position: number) => void;
  deleteHead: () => void;
  deleteTail: () => void;
  getSize: () => number;
  print: () => void;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;
  constructor() {
    this.head = null;
    this.size = 0;
  }

  insertAt(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
      return;
    } else {
      const node = new Node(element);

      // добавить элемент в начало списка
      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        let currIndex = 0;

        // перебрать элементы в списке до нужной позиции
        while (currIndex !== index - 1) {
          if (curr?.next) {
            curr = curr.next;
            currIndex++;
          }
        }
        // добавить элемент
        if (curr?.next) {
          node.next = curr.next;
          curr.next = node;
        }
      }
      this.size++;
    }
  }

  deleteAt(index: number) {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
      return null;
    }
    let curr: Node<T> | null = this.head;

    if (index === 0 && curr) {// удалить элемент из начала списка
      this.head = curr.next;
    } else {
      let currIndex: number = 0;
      let prev: Node<T> | null = null;
      // перебрать элементы в списке до нужной позиции, запоминая предыдущий элемент
      while (currIndex !== index - 1 && curr) {
        prev = curr;
        curr = curr.next;
        currIndex++;
      }
      // пропустить удаляемый элемент, исправив ссылки указателей
      if (prev && curr) {
        prev.next = curr.next;
      }
    }
    this.size--;
    return curr ? curr.value : null; //вернуть значение удаленного элемента для отображения
  }

  deleteHead() {
    if (this.size === 0) { //если список пустой
      return null;
    }
    let curr: Node<T> | null = this.head;
    if (curr && curr.next) { //если в списке есть следующий элемент
      this.head = curr.next;
    } else {
      this.head = null;
    }
    this.size--;
    return curr ? curr.value : null; //вернуть значение удаленного элемента для отображения
  }

  deleteTail() {
    if (this.size === 0) { //если список пустой
      return null;
    }
    let curr: Node<T> | null = this.head;
    let prev: Node<T> | null = null;
    let currIndex: number = 0;
    // перебрать элементы в списке до последнего элемента, запоминая предыдущий элемент
    while (currIndex !== this.size - 1 && curr) {
      prev = curr;
      curr = curr.next;
      currIndex++;
    }
    // пропустить удаляемый элемент, исправив ссылки указателей
    if (prev && curr) {
      prev.next = curr.next;
    }

    this.size--;
    return curr ? curr.value : null; //вернуть значение удаленного элемента для отображения
  }

  append(element: T) {
    const node = new Node(element);
    let current;

    if (this.head === null) { //пустой список
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {    //перебрать весь список до пустого элемента
        current = current.next;
      }
      current.next = node;      //вставить ссылку на новый элемент в последнем элементе
    }
    this.size++;
  }

  prepend(element: T) {
    const node = new Node(element);

    if (this.head === null) { //пустой список
      this.head = node;
    } else {
      node.next = this.head;  //скопировать ссылку
      this.head = node;       //заменить головной элемент новым
    }
    this.size++;
  }

  getSize() {
    return this.size;
  }

  print() { //отобразить в консоли значения всех ячеек списка
    let curr = this.head;
    let res = '';
    while (curr) {
      res += `${curr.value} `;
      curr = curr.next;
    }
    console.log(res);
  }
}