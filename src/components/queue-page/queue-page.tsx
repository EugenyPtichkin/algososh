import React from "react";
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
  const [inputString, setInputString] = useState<string>('');
  const [queueArray, setQueueArray] = useState<{ value: string, state: ElementStates }[]>([]);
  const [isLoaderAdd, setIsLoaderAdd] = useState<boolean>(false);
  const [isLoaderDelete, setIsLoaderDelete] = useState<boolean>(false);
  const queue = new Queue<string>(7);  

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setInputString(e.target.value);
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addToQueue();
  }

  const addToQueue = async () => {
    if(!inputString) {
      return;
    }
    setIsLoaderAdd(true);
    queue.enqueue(inputString);
    setInputString('');
    const lastElement: string = queue.peek() || ''; //вычитать последний элемент из стека
    queueArray.push({ value: lastElement, state: ElementStates.Changing }); //записать в массив отображения
    setQueueArray([...queueArray]);
    await sleep();
    queueArray[queueArray.length - 1].state = ElementStates.Default; //изменить окраску на обычную
    setQueueArray([...queueArray]);
    setIsLoaderAdd(false);
    await sleep();    
  }

  const deleteFromQueue = async () => {
    setIsLoaderDelete(true);
    queue.dequeue();
    queueArray[queueArray.length - 1].state = ElementStates.Changing; //изменить окраску у последнего элемента перед удалением
    setQueueArray([...queueArray]);
    await sleep();
    queueArray.pop(); 
    setQueueArray([...queueArray]);
    setIsLoaderDelete(false);
    await sleep();
  }

  const clearQueue = () => {
    queue.clear();
    setQueueArray([])    
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
            disabled={false}
            onClick={() => addToQueue()}
            isLoader={isLoaderAdd}
          />
          <Button
            text="Удалить"
            disabled={false}
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
            <Circle letter={item.value.toString()} state={item.state} index={index} head={index === queueArray.length-1 ? 'top' : ''} />
          </li>))}
      </ul>
    </SolutionLayout>
  );
};