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
    setIsLoader(false);
  }

  //создать пустой двумерный массив для хранения всех значений строк на всех этапах перестановок
  //const n: number = inputString.length;
  //const m: number = Math.floor(n / 2) + 1;
  //let swapArr = Array.apply(null, Array(m)).map(function () {
  //   return Array.apply(null, Array(n));
  //});
  let swapString : string[] = [];

  const invertString = (inString: string) => {    
    swapString = [];
    let symbols: string[] = new Array;
    symbols = Array.from(inString);  //преобразовать строку в символы
    //console.log(`first symbols=${symbols}`);


    //заполнить выходной массив входной строкой (в нулевую позицию)
    //for (let j: number = 0; j < inString.length; j++) {
    //  swapArr[0][j] = symbols[j];      
    //}
    swapString.push(symbols.join(''));
    console.log(`swapString[0]=${swapString}`);

    //заполнить выходной массив отображаемыми строками на каждом этапе перестановок
    let swap: string = '';
    for (let i: number = 0; i < Math.floor(inString.length / 2); i++) {
      //перестановка двух крайних элементов
      swap = symbols[i];
      symbols[i] = symbols[inString.length - 1 - i];
      symbols[inString.length - 1 - i] = swap;

      //запись в массив отображения строки в текущем состоянии (с 1 позиции)
      //for (let j: number = 0; j < inString.length; j++) {
      //  swapArr[i + 1][j] = symbols[j];
      //}
      swapString.push(symbols.join(''));                    
      console.log(`swapString=${swapString}`);
    }
  }
  
  const sleep = () => new Promise ((resolve) => setTimeout(resolve, DELAY_IN_MS));

  const reverseStr = async (inString: string) => {
  let maxSwapValue = Math.floor(inString.length / 2) + 1;
    let currentString : string = '';
    let tmp : number = 0;
    while (tmp < maxSwapValue) {
      currentString = swapString.shift() || '';  
      setShowString(currentString);            
      await sleep();
      tmp++;
      setCurrentValue(tmp);
      }    
  }

  return (
    <SolutionLayout title="Строка" >
      <form className={styles.content} onSubmit={onSubmit}  >
        <Input type="text" maxLength={11} isLimitText={true} onChange={onChange} value={inputString} />
        <Button text="Развернуть" disabled={!inputString} isLoader={isLoader} type = 'submit'/>
      </form>
      <ul>
        {/*showString.split('').map((symbol,index) => (
        <li key={index}> 
         <Circle letter={symbol} />
        </li> )) */}
         {showString}
      </ul>
    </SolutionLayout>
  );
};
