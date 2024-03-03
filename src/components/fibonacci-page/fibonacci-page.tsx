import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./fibonacci-page.module.css";
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: React.FC = () => {

  const [inputNumber, setInputNumber] = useState(0);
  const [isLoader, setIsLoader] = useState(false);
  const [outValues, setOutValues] = useState<number[]>([]);
  
  const memo: Record<number, number> = {};

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputNumber(Number(e.target.value));
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoader(true);
    calcFibbonacci(inputNumber, memo); //вычисление
    showFibbonacci(inputNumber, memo); //отображение
  }

  const calcFibbonacci = (n: number, memo: Record<number, number> = {}): number => {
    if (n in memo) {
      return memo[n];
    }
    if (n <= 2) {
      return 1;
    }
    memo[n] = calcFibbonacci(n - 1, memo) + calcFibbonacci(n - 2, memo);
    return memo[n];
  };

    //функция-ожидание
    const sleep = () => new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS));

    //функция отображения во времени массива чисел фиббоначчи
    const showFibbonacci =  async (n: number, memo: Record<number, number> = {}) => {
      let tmp: number = 0;
      let values : number[] = [];
      while (tmp <= n) {
        values[tmp] = memo[n];
        setOutValues(values);
        await sleep();
        tmp++;
      }
      setIsLoader(false);
    }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
     <form className={styles.content} onSubmit={onSubmit}  >
        <Input type="text" maxLength={19} isLimitText={true} onChange={onChange} value={inputNumber} />
        <Button text="Рассчитать" disabled={!inputNumber} isLoader={isLoader} type='submit' />
      </form>
      <ul className={styles.outString}>
        {outValues.map((value, index) => (
          <li key={index}>
            <Circle letter={value.toString()} index={index}/>
          </li>))}
      </ul>
    </SolutionLayout>
  );
};
