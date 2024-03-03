import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./stack-page.module.css";
import { useState } from "react";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";

export const StackPage: React.FC = () => {
  const [inputString, setInputString] = useState<string>('');
  const [stack, setStack] = useState<{ value: string, state: ElementStates }[]>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setInputString(e.target.value);
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
            onClick={() => {
              stack.push({ value: inputString, state: ElementStates.Changing });
              setInputString('');
            }}
          />
          <Button
            text="Удалить"
            disabled={!stack.length}
            type='submit'
            onClick={() => stack.pop()} />
        </div>
        <div className={styles.clearbutton} >
          <Button
            text="Очистить"
            disabled={false}
            type='submit'
            onClick={() => stack.splice(1, stack.length)}
          />
        </div>
      </form>
      <ul className={styles.outString}>
        {stack.map((item, index) => (
          <li key={index}>
            <Circle letter={item.value.toString()} state={item.state} index={index} head = {index === stack.length-1? 'head': ''} />
          </li>))}
      </ul>
    </SolutionLayout>
  );
};