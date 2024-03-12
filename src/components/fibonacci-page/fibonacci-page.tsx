import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./fibonacci-page.module.css";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { sleep } from "../../utils/sleep";

export const FibonacciPage: React.FC = () => {
  const maxValue : number = 19;
  const [inputNumber, setInputNumber] = useState<number>(0);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [outValues, setOutValues] = useState<number[]>([]);
  // eslint-disable-next-line
  const [currentValue, setCurrentValue] = useState<number>(0);

  const memo: Record<number, number> = {};

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputNumber(Number(e.target.value));
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoader(true);
    calcFibbonacci(inputNumber + 1, memo); //вычисление
    showFibbonacci(inputNumber + 1, memo); //отображение
  }

  const calcFibbonacci = (n: number, memo: Record<number, number>): number => {
    if (n in memo) {
      return memo[n];
    }
    if (n <= 2) {
      memo[1] = 1;
      memo[2] = 1;
      return 1;
    }
    memo[n] = calcFibbonacci(n - 1, memo) + calcFibbonacci(n - 2, memo);
    return memo[n];
  };

  //функция отображения во времени массива чисел фиббоначчи
  const showFibbonacci = async (n: number, memo: Record<number, number> = {}) => {
    let tmp: number = 1;
    let values: number[] = [];
    while (tmp <= n) {
      values[tmp] = memo[tmp];
      setOutValues(values);
      setCurrentValue(tmp); //сменить текущее состояние, чтобы отобразилось текущее состояние
      await sleep(SHORT_DELAY_IN_MS);
      tmp++;
    }
    setIsLoader(false);
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.content} onSubmit={onSubmit}  >
        <Input
          type="number"
          maxLength={maxValue}
          isLimitText={true}
          onChange={onChange}
          value={inputNumber}
          //min={0} //тоже блокирует ввод отрицательных!
          max={maxValue} />
        <Button
          text="Рассчитать"
          disabled={!inputNumber || inputNumber < 0 || inputNumber > maxValue}
          isLoader={isLoader}
          type='submit' />
      </form>
      <ul className={styles.outString}>
        {outValues.map((value, index) => (
          <li key={index}>
            {<Circle letter={value.toString()} index={index - 1} />}
          </li>))}
      </ul>
    </SolutionLayout>
  );
};
