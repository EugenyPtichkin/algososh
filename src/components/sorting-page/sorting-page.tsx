import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Direction } from "../../types/direction";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { sleep } from "../../utils/sleep";
import { getRandomNumber } from "../../utils/get-random-number";
import { ISortDisplay } from "./interfaceSortDisplay";

export const SortingPage: React.FC = () => {
  const initialArray: ISortDisplay[] = Array.from({ length: 5 }, () => ({ number: getRandomNumber(100), state: ElementStates.Default }));
  const [array, setArray] = useState<ISortDisplay[]>(initialArray);
  const [sortType, setSortType] = useState<string>('selection');
  const [displayButtons, setDisplayButtons] = useState(
    {
      isAscending: false,
      isDescending: false,
      isNewArray: false,
    });
  const minIndex: number = 3;
  const maxIndex: number = 17;
  const maxValue: number = 100;

  //сортировка выбором максимума/минимума с запоминанием его индекса
  const selectionSort = async (
    sortDirection: 'ascending' | 'descending',
    arr: ISortDisplay[],
    changeArray: React.Dispatch<React.SetStateAction<ISortDisplay[]>>
  ) => {

    if (sortDirection === 'ascending') {
      setDisplayButtons({ ...displayButtons, isAscending: true });
    } else {
      setDisplayButtons({ ...displayButtons, isDescending: true });
    }

    //создаем копию массива, в котором будут производиться перестановки
    const array = [...arr];
    array.forEach(item => (item.state = ElementStates.Default));

    let value: number;
    let index: number;
    for (let i: number = 0; i < array.length; i++) {
      array[i].state = ElementStates.Changing;
      value = array[i].number!;
      index = i;
      //console.log(`test: array[${i}]=${array[i].number} index=${index} value=${value}`);
      for (let j: number = i + 1; j < array.length; j++) {
        array[j].state = ElementStates.Changing;
        changeArray([...array]);//отобразить подсветку изменения
        await sleep(SHORT_DELAY_IN_MS);
        if (((sortDirection === 'ascending') && (array[j].number! < value)) ||  // сортируем элементы по возрастанию 
          ((sortDirection === 'descending') && (array[j].number! > value))) {   // сортируем элементы по убыванию
          value = array[j].number!;     //находим минимум/максимум, сдвигаем к началу
          index = j;                   //индекс минимума/максимума
          if (index !== i) { //обмен экстремума с крайним левым элементом
            //console.log(`array[${index}]=${array[index].number} and array[${i}]=${array[i].number} => swap`)
            array[index].number = array[i].number;
            array[i].number = value;
            changeArray([...array]);
            await sleep(SHORT_DELAY_IN_MS);
          }
        }
        array[j].state = ElementStates.Default;
      }
      array[i].state = ElementStates.Modified;
    }
    changeArray([...array]);
    setDisplayButtons({ ...displayButtons, isAscending: false, isDescending: false });
  }

  //сортировка пузырьком
  const bubbleSort = async (
    sortDirection: 'ascending' | 'descending',
    arr: ISortDisplay[],
    changeArray: React.Dispatch<React.SetStateAction<ISortDisplay[]>>
  ) => {

    if (sortDirection === 'ascending') {
      setDisplayButtons({ ...displayButtons, isAscending: true });
    } else {
      setDisplayButtons({ ...displayButtons, isDescending: true });
    }

    //создаем копию массива, в котором будут производиться перестановки
    const array = [...arr];
    array.forEach(item => (item.state = ElementStates.Default));

    let swap: number = 0;
    for (let i: number = 0; i < array.length; i++) {
      for (let j: number = 0; j < array.length - i - 1; j++) {
        array[j].state = ElementStates.Changing;
        array[j + 1].state = ElementStates.Changing;
        if (((sortDirection === 'ascending') && (array[j].number! > array[j + 1].number!)) || // по возрастанию 
          ((sortDirection === 'descending') && (array[j].number! < array[j + 1].number!))) {  // по убыванию
          //console.log(`array[${j}]=${array[j].number} and array[${j + 1}]=${array[j + 1].number} => swap`)
          swap = array[j].number!;
          array[j].number = array[j + 1].number
          array[j + 1].number = swap;
        }
        changeArray([...array]);
        await sleep(SHORT_DELAY_IN_MS);
        array[j].state = ElementStates.Default;
      }
      array[array.length - 1 - i].state = ElementStates.Modified;
    }
    changeArray([...array]);
    setDisplayButtons({ ...displayButtons, isAscending: false, isDescending: false });
  }

  const randomArr = async (minLen: number, maxLen: number, maxValue: number) => {
    const newArray: { number: number, state: ElementStates }[] = [];
    const lengthArray: number = getRandomNumber(maxLen - minLen) + minLen;
    setDisplayButtons({ ...displayButtons, isNewArray: true });
    
    for (let i: number = 0; i < lengthArray; i++) {
      newArray.push({
        number: getRandomNumber(maxValue),
        state: ElementStates.Default
      });
    }
    setArray(newArray);
    await sleep(SHORT_DELAY_IN_MS);
    setDisplayButtons({ ...displayButtons, isNewArray: false });
    return;
  }

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
            disabled={displayButtons.isDescending || displayButtons.isNewArray}
            isLoader={displayButtons.isAscending}
            onClick={() => sortType === 'selection' ?
              selectionSort('ascending', array, setArray) :
              bubbleSort('ascending', array, setArray)}
            type='submit'
            sorting={Direction.Ascending} />
          <Button
            text="По убыванию"
            style={{ minWidth: 184 }}
            disabled={displayButtons.isAscending || displayButtons.isNewArray}
            isLoader={displayButtons.isDescending}
            onClick={() => sortType === 'selection' ?
              selectionSort('descending', array, setArray) :
              bubbleSort('descending', array, setArray)}
            type='submit'
            sorting={Direction.Descending} />
        </div>
        <Button
          text="Новый массив"
          style={{ minWidth: 158 }}
          disabled={displayButtons.isAscending || displayButtons.isDescending}
          isLoader={displayButtons.isNewArray}
          onClick={() => randomArr(minIndex, maxIndex, maxValue)} />
      </section>

      <ul className={styles.diagram}>
        {array.map((item, index) => (
          <li key={index}>
            <Column index={item.number!} state={item.state} extraClass='' />
          </li>))}
      </ul>
    </SolutionLayout>
  );
};
