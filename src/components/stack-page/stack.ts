interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peek: () => T | null;
  size: () => number;
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
    if (this.size() !== 0) {
      return this.container[this.size() - 1];
    } else {
      return null;
    }
  };

  size = () => this.container.length;

  clear = () => this.container = [];
}