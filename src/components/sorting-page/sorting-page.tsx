import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Direction } from "../../types/direction";


export const SortingPage: React.FC = () => {
  const [array, setArray] = useState<{number: number, state: ElementStates}[]>([]);
  const [sorting, setSorting] = useState<string>('selection');
  const [isLoaderAcsending, setIsLoaderAcsending] = useState(false);
  const [isLoaderDescending, setIsLoaderDescending] = useState(false);
  const [isLoaderNewArray, setIsLoaderNewArray] = useState(false);
  const [showColumns, setShowColumns] = useState<number[]>([]);

  
  const onAcsending = (): void => {
  }

  const onDescending = (): void => {
  }

  const randomArr = (minLen : number, maxLen : number, maxValue : number) : {number: number, state: ElementStates}[]  => {
    let newArray: {number: number, state: ElementStates}[] = [];
    let lengthArray : number = Math.floor(Math.random() * ( maxLen - minLen) + minLen);
    console.log(lengthArray);
    for (let i: number = 0; i < lengthArray; i++) {
        newArray.push({
          number : Math.floor(Math.random() * maxValue ),
          state : ElementStates.Default
        });        
    }
    console.log(newArray);
    setArray(newArray);
    return newArray;
  }

  const getState = (index: number): ElementStates => {
    /*return ElementStates.Modified;
    return ElementStates.Changing;*/
    return ElementStates.Default;
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <section className={styles.content} >
        <div className={styles.radio} >
          <RadioInput
            label="Выбор"
            onChange={() => setSorting('selection')}
            checked={sorting === 'selection'}  />
          <RadioInput
            label="Пузырек"
            onChange={() => setSorting('bubble')}
            checked={sorting === 'bubble'} />
        </div>
        <div className={styles.buttons} >
          <Button
            text="По возрастанию"
            disabled={false}
            isLoader={isLoaderAcsending}
            onClick={onAcsending}
            type='submit'
            sorting={Direction.Ascending} />
          <Button
            text="По убыванию"
            disabled={false}
            isLoader={isLoaderDescending}
            onClick={onDescending}
            type='submit'
            sorting={Direction.Descending} />
        </div>
        <Button
          text="Новый массив"
          disabled={false}
          isLoader={isLoaderNewArray}
          onClick={() => randomArr(3, 17, 100)} />
      </section>

      <ul className={styles.diagram}>
        {array.map((item, index) => (
          <li key={index}>
            <Column index={item.number} state={item.state} extraClass='' />
          </li>))}
      </ul>
    </SolutionLayout>
  );
};
