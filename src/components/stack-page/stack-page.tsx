import React, { useMemo } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./stack-page.module.css";
import { useState } from "react";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { Stack } from "./stack";
import { IStackDisplay } from "./interfaceStackDisplay";

export const StackPage: React.FC = () => {
  const [inputString, setInputString] = useState<string>('');
  const [stackArray, setStackArray] = useState<IStackDisplay[]>([]);
  const [isLoaderAdd, setIsLoaderAdd] = useState<boolean>(false);
  const [isLoaderDelete, setIsLoaderDelete] = useState<boolean>(false);
  const stack = useMemo( () => new Stack<IStackDisplay>() , []);  //cохранять стек между рендерами!

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setInputString(e.target.value);
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addToStack();
  }

  const addToStack = async () => {
    if(!inputString) {
      return;
    }
    setIsLoaderAdd(true);
    stack.push({value: inputString, state: ElementStates.Default});
    setInputString('');
    const lastElement: IStackDisplay | null = stack.peek(); //вычитать последний элемент из стека
    if (lastElement) lastElement.state = ElementStates.Changing;
    if (lastElement) stackArray.push(lastElement); //записать в массив отображения
    //stackArray.push({ value: lastElement, state: ElementStates.Changing }); //записать в массив отображения
    setStackArray([...stackArray]);
    await sleep();
    stackArray[stackArray.length - 1].state = ElementStates.Default; //изменить окраску на обычную
    setStackArray([...stackArray]);
    setIsLoaderAdd(false);
    await sleep();    
  }

  const deleteFromStack = async () => {
    setIsLoaderDelete(true);
    stack.pop();
    stackArray[stackArray.length - 1].state = ElementStates.Changing; //изменить окраску у последнего элемента перед удалением
    setStackArray([...stackArray]);
    await sleep();
    stackArray.pop(); 
    setStackArray([...stackArray]);
    setIsLoaderDelete(false);
    await sleep();
  }

  const clearStack = () => {
    stack.clear();
    setStackArray([])    
  }

  //функция-ожидание
  const sleep = () => new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));

  return (
    <SolutionLayout title="Стек" >
      <form className={styles.content} onSubmit={onSubmit}  >
        <Input type="text" maxLength={4} isLimitText={true} onChange={onChange} value={inputString} />
        <div className={styles.buttons} >
          <Button
            text="Добавить"
            disabled={false}
            onClick={() => addToStack()}
            isLoader={isLoaderAdd}
          />
          <Button
            text="Удалить"
            disabled={stack.size() === 0}
            onClick={() => deleteFromStack()}
            isLoader={isLoaderDelete} />
        </div>
        <div className={styles.clearbutton} >
          <Button
            text="Очистить"
            disabled={false}
            onClick={() => clearStack()}
          />
        </div>
      </form>
      <ul className={styles.outString}>
        {stackArray.map((item, index) => (
          <li key={index}>
            <Circle letter={item.value? item.value.toString():''} state={item.state} index={index} head={index === stackArray.length-1 ? 'top' : ''} />
          </li>))}
      </ul>
    </SolutionLayout>
  );
};