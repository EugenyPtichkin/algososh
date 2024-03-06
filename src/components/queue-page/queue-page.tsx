import React, { useEffect, useMemo } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./queue-page.module.css";
import { useState } from "react";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { Queue } from "./queue";
import { IQueueDisplay } from "./interfaceQueueDisplay";
import { sleep } from "../../utils/sleep";

export const QueuePage: React.FC = () => {
  const queueLength: number = 7;
  const initialArray: IQueueDisplay[] = Array.from({ length: queueLength }, () => ({ value: '', state: ElementStates.Default, head: '', tail: '' }));
  const [inputString, setInputString] = useState<string>('');
  const [queueArray, setQueueArray] = useState<IQueueDisplay[]>(initialArray);
  const [isLoaderAdd, setIsLoaderAdd] = useState<boolean>(false);
  const [isLoaderDelete, setIsLoaderDelete] = useState<boolean>(false);
  const queue = useMemo(() => new Queue<string>(queueLength), []);//сохранить queue между рендерами!


  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setInputString(e.target.value);
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addToQueue();
  }

  const addToQueue = async () => {
    if (!inputString) {
      return; //ничего не делать при пустой строке, но не тушить кнопку "Добавить"
    }

    setIsLoaderAdd(true);
    queue.enqueue(inputString);
    //console.log(queue.head().index, queue.tail().index, queue.getSize());
    setInputString('');

    //вычитываем значения head и tail из очереди методами queue
    const head: () => { item: string | null; index: number; } = queue.head;
    const tail: () => { item: string | null; index: number; } = queue.tail;
    //console.log(head().item, head().index, tail().item, tail().index, queue.isEmpty());
    
     //только меняю подсветку
    queueArray[tail().index].state = ElementStates.Changing;
    setQueueArray([...queueArray]);
    await sleep(SHORT_DELAY_IN_MS);
  
    //обновляем поля в отображаемом массиве
    queueArray[tail().index].state = ElementStates.Default;
    queueArray[head().index].value = head().item || '';
    queueArray[head().index].head = 'head';
    if (head().index > 0) { //сбросить надпись head у предыдущего элемента для ситуации, когда удалены были все элементы очереди посередине очереди (index>=1)
      queueArray[head().index - 1].head = '';
    }

    queueArray[tail().index].value = tail().item || '';
    if (tail().index > 0) {
      queueArray[tail().index - 1].tail = '';
    }
    queueArray[tail().index].tail = 'tail';

    setQueueArray([...queueArray]);
    setIsLoaderAdd(false);
    await sleep(SHORT_DELAY_IN_MS);
  }

  const deleteFromQueue = async () => {
    setIsLoaderDelete(true);
    //вычитываем значения head и tail из очереди методами queue
    const head: () => { item: string | null; index: number; } = queue.head;
    const tail: () => { item: string | null; index: number; } = queue.tail;
    //console.log(head().item, head().index, tail().item, tail().index, queue.isEmpty());

    //только меняю подсветку
    queueArray[head().index].state = ElementStates.Changing;
    setQueueArray([...queueArray]);
    await sleep(SHORT_DELAY_IN_MS);

    if (head().index === tail().index) { //последний элемент и требуется его удалить из очереди      
      queue.dequeue();
      //console.log(head().index, tail().index, queue.getSize());
      queueArray[head().index-1].tail = '';
    } else {
      queue.dequeue();
      //console.log(head().index, tail().index, queue.getSize());
      queueArray[head().index - 1].head = '';
      queueArray[head().index].head = 'head';
    }
    queueArray[head().index-1].state = ElementStates.Default;            
    queueArray[head().index-1].value = '';

    setQueueArray([...queueArray]);
    setIsLoaderDelete(false);
    await sleep(SHORT_DELAY_IN_MS);
  }

  const clearQueue =  async () => {
    queue.clear();    
    setQueueArray(initialArray);
    await sleep(SHORT_DELAY_IN_MS);
  }

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.content} onSubmit={onSubmit}  >
        <Input type="text" maxLength={4} isLimitText={true} onChange={onChange} value={inputString} />
        <div className={styles.buttons} >
          <Button
            text="Добавить"
            disabled={(queue.tail().index === queueLength - 1 ) || (queue.head().index === queueLength ) ? true : false} /*притушить при когда добавлять некуда*/
            onClick={() => addToQueue()}
            isLoader={isLoaderAdd}
          />
          <Button
            text="Удалить"
            disabled={(queue.head().index === queueLength ? true : false) || queue.isEmpty()} /*притушить при пустой очереди или когда удалять в конце нечего*/
            onClick={() => deleteFromQueue()}
            isLoader={isLoaderDelete} />
        </div>
        <div className={styles.clearbutton} >
          <Button
            text="Очистить"
            disabled={queue.head().index === 0 && queue.isEmpty()}/*притушить кнопку очистить только когда пусто и указатель head=0 */
            onClick={() => clearQueue()}
          />
        </div>
      </form>
      <ul className={styles.outString}>
        {queueArray.map((item, index) => (
          <li key={index}>
            {item && <Circle
              letter={item.value? item.value.toString():'' }
              state={item.state}
              index={index}
              head={item.head? item.head.toString() : ''}
              tail={item.tail? item.tail.toString(): ''} />}
          </li>))}
      </ul>
    </SolutionLayout>);
};