import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { RadioInput } from "../ui/radio-input/radio-input";


export const SortingPage: React.FC = () => {

  const [isLoaderAcsending, setIsLoaderAcsending] = useState(false);
  const [isLoaderDescending, setIsLoaderDescending] = useState(false);
  const [isLoaderNewArray, setIsLoaderNewArray] = useState(false);
  const [showColumns, setShowColumns] = useState<number[]>([]);

  const onAcsending = (): void => {
  }

  const onDescending = (): void => {
  }

  const onNewArray = (): void => {
  }

  const getState = (index: number) : ElementStates => {
    /*return ElementStates.Modified;
    return ElementStates.Changing;*/
    return ElementStates.Default;
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <section className={styles.content} >
        <RadioInput label = "Выбор" />
        <RadioInput label = "Пузырек" />
        <Button text="По возрастанию" disabled={false} isLoader={isLoaderAcsending} onChange={onAcsending} />
        <Button text="По убыванию" disabled={false} isLoader={isLoaderDescending} onChange={onDescending} />
        <Button text="Новый массив" disabled={false} isLoader={isLoaderNewArray} onChange={onNewArray} />
      </section>

      <ul className={styles.outString}>
        {showColumns.map((height, index) => (
          <li key={index}>
            <Column index={height} state={getState(index)} extraClass = '' />
          </li>))}
      </ul>
    </SolutionLayout>
  );
};
