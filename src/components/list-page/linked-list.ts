export class LinkedListNode<T> {
  value: T
  next: LinkedListNode<T> | null
  constructor(value: T, next?: LinkedListNode<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}

interface ILinkedList<T> {
  append: (element: T) => void;
  prepend: (element: T) => void;
  addByIndex: (element: T, position: number) => void;
  deleteByIndex: (position: number) => T | null;
  deleteHead: () => T | null;
  deleteTail: () => T | null;
  getSize: () => number;
  toArray: () => T[];
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: LinkedListNode<T> | null;
  private size: number;
  constructor(initialState?: T[]) {
    this.head = null;
    this.size = 0;
    initialState?.forEach((item) => {
      this.addByIndex(item, 0)
    });
  }

  addByIndex(element: T, index: number) {
    if (index < 0 || index > this.size) {
      //console.log('Enter a valid index');
      return;
    } else {
      const node = new LinkedListNode(element);

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

  deleteByIndex(index: number) {
    if (index < 0 || index > this.size) {
      //console.log('Enter a valid index');
      return null;
    }
    let curr: LinkedListNode<T> | null = this.head;

    if (index === 0 && curr) {// удалить элемент из начала списка
      this.head = curr.next;
      this.size--;
      return this.head ? this.head.value : null;
    }

    let currIndex: number = 0;
    let prev: LinkedListNode<T> | null = null;
    // перебрать элементы в списке до нужной позиции, запоминая предыдущий элемент
    while (curr && currIndex !== index) {
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


  deleteHead() {
    if (this.size === 0) { //если список пустой
      return null;
    }
    let curr: LinkedListNode<T> | null = this.head;
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
    let curr: LinkedListNode<T> | null = this.head;
    let prev: LinkedListNode<T> | null = null;
    let currIndex: number = 0;
    // перебрать элементы в списке до последнего элемента, запоминая предыдущий элемент
    while (currIndex !== this.size - 1 && curr) {
      prev = curr;
      curr = curr.next;
      currIndex++;
    }
    // пропустить удаляемый элемент, исправив ссылки указателей
    if (prev) {
      prev.next = null;
      this.size--;
    } else { //предыдущего нет, то есть был единственный элемент
      this.head = null;
      this.size = 0;
    }
    return curr ? curr.value : null; //вернуть значение удаленного элемента для отображения
  }

  append(element: T) {
    const node = new LinkedListNode(element);
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
    const node = new LinkedListNode(element);

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

  toArray() { //отобразить в консоли значения всех ячеек списка
    let res: T[] = [];
    let curr: LinkedListNode<T> | null = this.head;
    while (curr) {
      res.push(curr.value);
      curr = curr.next;
    }
    return res;
  }
}