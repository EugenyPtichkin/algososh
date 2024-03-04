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

export const QueuePage: React.FC = () => {
  const queueLength: number = 7;
  //const initialItem: { value: string, state: ElementStates, head: string, tail: string } = {value: '', state: ElementStates.Default, head: '', tail: ''};
  //const initialArray : { value: string, state: ElementStates, head: string, tail: string }[] = [];
  const initialArray: { value: string, state: ElementStates, head: string, tail: string }[] = Array.from({ length: queueLength }, () => ({ value: '', state: ElementStates.Default, head: '', tail: '' }));
  const [inputString, setInputString] = useState<string>('');
  const [queueArray, setQueueArray] = useState<{ value: string, state: ElementStates, head: string, tail: string }[]>(initialArray);
  const [isLoaderAdd, setIsLoaderAdd] = useState<boolean>(false);
  const [isLoaderDelete, setIsLoaderDelete] = useState<boolean>(false);
  const queue = useMemo(() => new Queue<string>(queueLength), []);//сохранить queue между рендерами!

  //заполнить пустыми значениями исходный массив для отображения
  //  for(let i: number = 0; i<queueLength; i++) {
  //    initialArray.push(initialItem);
  //  }
  useEffect(() => {
    console.log(initialArray);
  }, []);

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
      return; //ничего не делать при пустой строке
    }

    setIsLoaderAdd(true);
    queue.enqueue(inputString);
    setInputString('');
    
    //вычитываем значения head и tail из очереди методами queue
    const head: () => { item: string | null; index: number; } = queue.head;
    const tail: () => { item: string | null; index: number; } = queue.tail;
    console.log(head().item, head().index, tail().item, tail().index, queue.isEmpty());

    //обновляем поля в отображаемом массиве
    queueArray[head().index].value = head().item || '';
    queueArray[head().index].head = 'head';
    if (head().index>0) { //для ситуации, когда удалены были все элементы очереди посередине очереди
      queueArray[head().index-1].head = '';
    }

    queueArray[tail().index].value = tail().item || '';
    if (tail().index > 0) {
      queueArray[tail().index - 1].tail = '';
    }
    queueArray[tail().index].tail = 'tail';

    setQueueArray([...queueArray]);
    setIsLoaderAdd(false);
    await sleep();
  }

  const deleteFromQueue = async () => {
    setIsLoaderDelete(true);
    //вычитываем значения head и tail из очереди методами queue
    const head: () => { item: string | null; index: number; } = queue.head;
    const tail: () => { item: string | null; index: number; } = queue.tail;
    console.log(head().item, head().index, tail().item, tail().index, queue.isEmpty());

    if (head().index === tail().index) { //последний элемент и требуется его удалить из очереди
      queue.dequeue();
      queueArray[head().index-1].value = '';      
      queueArray[head().index-1].tail = '';
    } else {
      queue.dequeue();
      //обновляем поля в отображаемом массиве
      queueArray[head().index-1].value = '';
      queueArray[head().index-1].head = '';
      queueArray[head().index].head = 'head';
    }
    setQueueArray([...queueArray]);
    setIsLoaderDelete(false);
    await sleep();
  }

  const clearQueue = () => {
    queue.clear();
    setQueueArray([...initialArray]);
  }

  //функция-ожидание
  const sleep = () => new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.content} onSubmit={onSubmit}  >
        <Input type="text" maxLength={4} isLimitText={true} onChange={onChange} value={inputString} />
        <div className={styles.buttons} >
          <Button
            text="Добавить"
            disabled={queue.tail().index === queueLength-1? true: false}
            onClick={() => addToQueue()}
            isLoader={isLoaderAdd}
          />
          <Button
            text="Удалить"
            disabled={(queue.head().index === queueLength? true: false) || queue.isEmpty()}
            onClick={() => deleteFromQueue()}
            isLoader={isLoaderDelete} />
        </div>
        <div className={styles.clearbutton} >
          <Button
            text="Очистить"
            disabled={false}
            onClick={() => clearQueue()}
          />
        </div>
      </form>
      <ul className={styles.outString}>
        {queueArray.map((item, index) => (
          <li key={index}>
            <Circle
              letter={item.value.toString()}
              state={item.state}
              index={index}
              head={item.head.toString()}
              tail={item.tail.toString()} />
          </li>))}
      </ul>
    </SolutionLayout>
  );
};