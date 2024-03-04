interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peek: () => T | null;
  clear: () => void;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    // Ваш код
    this.container[this.tail % this.size]=item;
    this.tail++;
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    this.head++;
    this.length--;    
    //return(this.container[(this.head-1) % this.size]);
  };

  peek = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
      return null;
    }
    return(this.container[this.head % this.size]);
  };

  isEmpty = () => this.length === 0;

  clear = () => {
    this.head =0;
    this.tail =0;
    this.length =0 
  }
}

const queue = new Queue<number>(4);