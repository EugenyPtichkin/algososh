import React, { FC } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { useState } from "react";
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS } from "../../constants/delays";

export const StringComponent: React.FC = () => {

  const [inputString, setInputString] = useState('');
  const [isLoader, setIsLoader] = useState(false);
  const [showString, setShowString] = useState('');
  const [currentValue, setCurrentValue] = useState(0);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setInputString(e.target.value);
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoader(true);
    invertString(inputString);
    setCurrentValue(0);
    reverseStr(inputString);
  }

  let swapString: string[] = [];


  const invertString = (inString: string) => {
    swapString = [];
    let symbols: string[] = new Array;
    symbols = Array.from(inString);  //преобразовать строку в символы

    swapString.push(symbols.join(''));
    //console.log(`swapString=${swapString}`);

    //заполнить выходной массив отображаемыми строками на каждом этапе перестановок
    let swap: string = '';
    for (let i: number = 0; i < Math.floor(inString.length / 2); i++) {
      //перестановка по два крайних элемента
      swap = symbols[i];
      symbols[i] = symbols[inString.length - 1 - i];
      symbols[inString.length - 1 - i] = swap;

      swapString.push(symbols.join(''));
      //console.log(`swapString=${swapString}`);
    }
  }
  
  //функция-ожидание
  const sleep = () => new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS));

  //функция прокрутки во времени массива строк
  const reverseStr = async (inString: string) => {
    let maxSwapValue = Math.floor(inString.length / 2) + 1;
    let currentString: string = '';
    let tmp: number = 0;
    while (tmp < maxSwapValue) {
      currentString = swapString.shift() || '';
      setShowString(currentString);
      await sleep();
      tmp++;
      //console.log(`nextValue=${tmp} maxValue=${maxSwapValue}`);
      setCurrentValue(tmp);
    }
    setIsLoader(false);
  }

  return (
    <SolutionLayout title="Строка" >
      <form className={styles.content} onSubmit={onSubmit}  >
        <Input type="text" maxLength={11} isLimitText={true} onChange={onChange} value={inputString} />
        <Button text="Развернуть" disabled={!inputString} isLoader={isLoader} type='submit' />
      </form>
      <ul className={styles.outString}>
        {showString.split('').map((symbol, index) => (
          <li key={index}>
            <Circle letter={symbol} />
          </li>))}
      </ul>
    </SolutionLayout>
  );
};
