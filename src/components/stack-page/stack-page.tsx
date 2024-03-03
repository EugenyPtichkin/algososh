import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./stack-page.module.css";
import { useState } from "react";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { Stack } from "./stack";

export const StackPage: React.FC = () => {
  const [inputString, setInputString] = useState<string>('');
  const [stackArray, setStackArray] = useState<{ value: string, state: ElementStates }[]>([]);
  const stack = new Stack<string>();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setInputString(e.target.value);
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addToStack();
  }
const addToStack = () => {

}

const deleteFromStack = () => {

}

const clearStack = () => {

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
            disabled={!inputString}
            type='submit'
            onClick={() => addToStack()}
          />
          <Button
            text="Удалить"
            disabled={!stack.getSize()}
            type='submit'
            onClick={() => deleteFromStack()} />
        </div>
        <div className={styles.clearbutton} >
          <Button
            text="Очистить"
            disabled={false}
            type='submit'
            onClick={() => clearStack() }  
          />
        </div>
      </form>
      <ul className={styles.outString}>
        {stackArray.map((item, index) => (
          <li key={index}>
            <Circle letter={item.value.toString()} state={item.state} index={index} head = {index === stack.getSize()? 'head': ''} />
          </li>))}
      </ul>
    </SolutionLayout>
  );
};