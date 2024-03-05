import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Direction } from "../../types/direction";
import { DELAY_IN_MS } from "../../constants/delays";

export const SortingPage: React.FC = () => {
  const [array, setArray] = useState<{ number: number, state: ElementStates }[]>([]);
  const [sortType, setSortType] = useState<string>('selection');
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const minIndex : number = 3;
  const maxIndex : number  = 17;
  const maxValue : number = 100;

  //сортировка выбором максимума/минимума с запоминанием его индекса
  const selectionSort = async (
    sortDirection: 'ascending' | 'descending',
    arr: { number: number, state: ElementStates }[],
    changeArray: React.Dispatch<React.SetStateAction<{
      number: number;
      state: ElementStates;
    }[]>>) => {

    setIsLoader(true);

    //создаем копию массива, в котором будут производиться перестановки
    const array = [...arr];
    array.forEach(item => (item.state = ElementStates.Default));

    let value: number;
    let index: number;
    for (let i: number = 0; i < array.length; i++) {
      array[i].state = ElementStates.Changing;
      value = array[i].number;
      index = i;
      //console.log(`test: array[${i}]=${array[i].number} index=${index} value=${value}`);
      for (let j: number = i + 1; j < array.length; j++) {
        array[j].state = ElementStates.Changing;
        changeArray([...array]);//отобразить подсветку изменения
        await sleep();
        if (((sortDirection === 'ascending') && (array[j].number < value)) ||  // сортируем элементы по возрастанию 
          ((sortDirection === 'descending') && (array[j].number > value))) {   // сортируем элементы по убыванию
          value = array[j].number;     //находим минимум/максимум, сдвигаем к началу
          index = j;                   //индекс минимума/максимума
          if (index !== i) { //обмен экстремума с крайним левым элементом
            //console.log(`array[${index}]=${array[index].number} and array[${i}]=${array[i].number} => swap`)
            array[index].number = array[i].number;
            array[i].number = value;
            changeArray([...array]);
            await sleep();
          }
        }
        array[j].state = ElementStates.Default;
      }
      array[i].state = ElementStates.Modified;
    }
    changeArray([...array]);
    setIsLoader(false);
  }

  //сортировка пузырьком
  const bubbleSort = async (
    sortDirection: 'ascending' | 'descending',
    arr: { number: number, state: ElementStates }[],
    changeArray: React.Dispatch<React.SetStateAction<{
      number: number;
      state: ElementStates;
    }[]>>) => {

    setIsLoader(true);

    //создаем копию массива, в котором будут производиться перестановки
    const array = [...arr];
    array.forEach(item => (item.state = ElementStates.Default));

    let swap: number = 0;
    for (let i: number = 0; i < array.length; i++) {
      for (let j: number = 0; j < array.length - i - 1; j++) {
        array[j].state = ElementStates.Changing;
        array[j + 1].state = ElementStates.Changing;
        if (((sortDirection === 'ascending') && (array[j].number > array[j + 1].number)) || // по возрастанию 
          ((sortDirection === 'descending') && (array[j].number < array[j + 1].number))) {  // по убыванию
          //console.log(`array[${j}]=${array[j].number} and array[${j + 1}]=${array[j + 1].number} => swap`)
          swap = array[j].number;
          array[j].number = array[j + 1].number
          array[j + 1].number = swap;
        }
        changeArray([...array]);
        await sleep();
        array[j].state = ElementStates.Default;
      }
      array[array.length - 1 - i].state = ElementStates.Modified;
    }
    changeArray([...array]);
    setIsLoader(false);
  }

  const randomArr = (minLen: number, maxLen: number, maxValue: number): void => {
    const newArray: { number: number, state: ElementStates }[] = [];
    const lengthArray: number = Math.floor(Math.random() * (maxLen - minLen) + minLen);
    //console.log(lengthArray);
    for (let i: number = 0; i < lengthArray; i++) {
      newArray.push({
        number: Math.floor(Math.random() * maxValue),
        state: ElementStates.Default
      });
    }
    //console.log(newArray);
    setArray(newArray);
    return;
  }

  //функция-ожидание
  const sleep = () => new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS));

  return (
    <SolutionLayout title="Сортировка массива">
      <section className={styles.content} >
        <div className={styles.radio} >
          <RadioInput
            label="Выбор"
            onChange={() => setSortType('selection')}
            checked={sortType === 'selection'} />
          <RadioInput
            label="Пузырек"
            onChange={() => setSortType('bubble')}
            checked={sortType === 'bubble'} />
        </div>
        <div className={styles.buttons} >
          <Button
            text="По возрастанию"
            style={{ minWidth: 205 }}
            disabled={false}
            isLoader={isLoader}
            onClick={() => sortType === 'selection' ?
              selectionSort('ascending', array, setArray) :
              bubbleSort('ascending', array, setArray)}
            type='submit'
            sorting={Direction.Ascending} />
          <Button
            text="По убыванию"
            style={{ minWidth: 184 }}
            disabled={false}
            isLoader={isLoader}
            onClick={() => sortType === 'selection' ?
              selectionSort('descending', array, setArray) :
              bubbleSort('descending', array, setArray)}
            type='submit'
            sorting={Direction.Descending} />
        </div>
        <Button
          text="Новый массив"
          style={{ minWidth: 158 }}
          disabled={false}
          isLoader={isLoader}
          onClick={() => randomArr(minIndex, maxIndex, maxValue)} />
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
