interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peek: () => T | null;
  head: () => { item: T | null; index: number};
  tail: () => { item: T | null; index: number};
  isEmpty: () => boolean;
  clear: () => void;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private _head = 0;
  private _tail = 0;
  private readonly size: number = 0;
  private _length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this._length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    this.container[this._tail]=item;
    this._tail++;
    this._length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    this.container[this._head] = null;
    this._head++;
    this._length--;    
  };

  peek = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return(this.container[this._head]);
  };

  
  head = (): { item: T | null; index: number} => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return {item: this.container[this._head], index: this._head};
  };

  tail = (): { item: T | null; index: number} => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return {item: this.container[this._tail], index: this._tail};
  };

  isEmpty = () => {
    return(this._length === 0);
  }
  //isEmpty = () =>  this._length === 0;

  clear = () => {
    this._head =0;
    this._tail =0;
    this._length =0 
  }
}