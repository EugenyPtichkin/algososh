interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peek: () => T | null;
  getSize: () => number;
  clear: () => void;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {    
    this.container.push(item);
  };

  pop = (): void => {
    this.container.pop();
  };

  peek = (): T | null => {
    if (this.getSize() !== 0) {
      return this.container[this.getSize() - 1];
    } else {
      return null;
    }
  };

  getSize = () => this.container.length;

  clear = () => this.container = [];
}