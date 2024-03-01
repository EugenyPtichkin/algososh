import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { useState } from "react";

export const StringComponent: React.FC = () => {

  const [inputString, setInputString] = useState('');
  const [isLoader, setIsLoader] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setInputString(e.target.value);
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setIsLoader(true);
    invertString(inputString);
    setIsLoader(false);
  }

  const invertString = (inputString: string) => {
    let symbols: string[] = new Array;
    symbols = Array.from(inputString);  //преобразовать строку в символы
    //console.log(`first symbols=${symbols}`);

    //создать пустой двумерный массив для хранения всех значений строк на всех этапах перестановок
    const n : number = inputString.length;
    const m : number = Math.floor(n/2)+1;    
    let swapArr = Array.apply(null, Array(m)).map(function() {
      return Array.apply(null, Array(n));      
    });

    //заполнить выходной массив входной строкой (в нулевую позицию)
    for (let j: number = 0; j < inputString.length; j++) {
      swapArr[0][j]=symbols[j];
    }

    //заполнить выходной массив отображаемыми строками на каждом этапе перестановок
    let swap: string = '';
    for (let i: number = 0; i < Math.floor(inputString.length / 2); i++) {
      //перестановка двух крайних элементов
      swap = symbols[i];
      symbols[i] = symbols[inputString.length - 1 - i];
      symbols[inputString.length - 1 - i] = swap;            
      
      //запись в массив отображения строки в текущем состоянии (с 1 позиции)
      for (let j: number = 0; j < inputString.length; j++) {
        swapArr[i+1][j]=symbols[j];
      }
      //console.log(`current swapArr=${swapArr}`);
    }
  }

  return (
    <SolutionLayout title="Строка" >
      <form className={styles.content} onSubmit={onSubmit}>
        <Input type="text" maxLength={11} isLimitText={true} onChange={onChange} />
        <Button text="Развернуть" isLoader={isLoader} />
      </form>
    </SolutionLayout>
  );
};
