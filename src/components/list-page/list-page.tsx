import React, { useEffect, useMemo } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./linked-list-page.module.css";
import { useState } from "react";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { LinkedList } from "./linked-list";
import { IListDisplay } from "./interfaceListDisplay";
import { ArrowIcon } from "../ui/icons/arrow-icon";

export const ListPage: React.FC = () => {
  const initialArray = useMemo ( () => {
    return ['0', '34', '8', '1'];
  }, [])
  const [listArray, setListArray] = useState<IListDisplay[]>(initialArray.map(item => {return { letter: item, state: ElementStates.Default}}));    
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [inputString, setInputString] = useState<string>('');
  const [inputIndex, setInputIndex] = useState<string>('');
  const list = useMemo(() => new LinkedList<string>(initialArray), []);//сохранить list между рендерами!

  const onChangeString = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setInputString(e.target.value);
  }

  const onChangeIndex = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setInputIndex(e.target.value);
  }
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  const addToHead = async () => {
    if (!inputString) { //при пустой строке ввода не делать ничего, но не тушить кнопку Добавить
      return;
    }
    const array: IListDisplay[] = [...listArray]; //вычитываем массив из состояния
    list.prepend(inputString);  //добавить в очередь в начало 
    const currentArray: string[] = list.toArray(); //контроль текущего состояния очереди
    console.log(`list of nodes= ${currentArray?currentArray:null}`);

    if (array.length > 0) {  
      array[0] = {...array[0], add: true, extra: inputString, head: ''}; //отобразить верхний элемент над первым
      setListArray([...array]); //применить изменения состояния очереди
      await sleep(); 
      array[0] = {...array[0], add: false, extra: undefined};//убрать отображение верхнего элемента над первым       
      array.unshift({ letter: inputString, state: ElementStates.Modified, head: 'head', tail: '' });//добавить вперед массива отображения с зеленым цветом
    } else { //особый случай - добавлен первый элемент
      array.unshift({ letter: '', state: ElementStates.Default, add: true, extra: inputString, head: '', tail: '' });
      setListArray([...array]); //применить изменения состояния очереди
      await sleep(); 
      array[0] = {...array[0], add: false, extra: undefined, letter: inputString, state: ElementStates.Modified, head: 'head', tail: 'tail'};             
    }
    setListArray([...array]); //применить изменения состояния очереди
    await sleep();

    array[0].state= ElementStates.Default; //вернуть штатную расцветку
    setListArray([...array]); //применить изменения состояния очереди
    await sleep();

    setInputString(''); //обнулить ввод
  }

  const addToTail = async () => {
    if (!inputString) { //при пустой строке ввода не делать ничего, но не тушить кнопку Добавить
      return;
    }
        
    const array: IListDisplay[] = [...listArray]; //вычитываем массив из состояния
    list.append(inputString);  //добавить в конец очереди
    const currentArray: string[] = list.toArray(); //контроль текущего состояния очереди
    console.log(`list of nodes= ${currentArray}`);

    if(array.length !== 0) { //при ненулевой длине очереди
      array[array.length-1] = {...array[array.length-1], add: true, extra: inputString, head: ''}; //отобразить верхний элемент над последним
      setListArray([...array]); //применить изменения состояния очереди
      await sleep(); 
      array[array.length-1] = {...array[array.length-1], add: false, extra: undefined,  tail: ''}; //убрать отображение верхнего элемента над первым 
      array.push({ letter: inputString, state: ElementStates.Modified, tail: 'tail', head: array.length === 0? 'head' : '' });//добавить назад массива отображения
    } else { //особый случай - очередь пуста
      array.push({ letter: '', state: ElementStates.Default, tail: '', head: '', add: true, extra: inputString });//сначала добавить пустой элемент массива      
      setListArray([...array]); //применить изменения состояния очереди
      await sleep(); 
      array[0] = {...array[0], add: false, extra: undefined, letter: inputString, state: ElementStates.Modified, tail: 'tail', head: 'head'};
    }
    if (array.length === 2)  {
      array[0] = {...array[0], head: 'head'}; //добавить head если добавлен второй элемент очереди (head удален выше)
    }  
    setListArray([...array]); //применить изменения состояния очереди
    await sleep();

    array[array.length-1].state= ElementStates.Default; //вернуть штатную расцветку
    setListArray([...array]); //применить изменения состояния очереди
    await sleep();

    setInputString(''); //обнулить ввод
  }

  const deleteFromHead = async () => {
    const array: IListDisplay[] = [...listArray]; //вычитываем массив из состояния

    array[0] = {...array[0], delete: true, extra: array[0].letter, letter: '', tail: ''}; //отобразить нижний элемент под первым, очистить значение
    setListArray([...array]); //применить изменения состояния очереди
    await sleep(); 
    
    array[0] = {...array[0], delete: false, extra: undefined}; //убрать отображение нижнего элемента под первым
    array.shift();                                             //удалить первый элемент массива отображения
    if (array.length !== 0) array[0] = {...array[0], head : 'head'};//добавить надпись head при ненулевой длине очереди
    setListArray([...array]); //применить изменения состояния очереди
    await sleep();
    
    list.deleteHead();  //удалить один элемент из начала очереди
    const currentArray: string[] = list.toArray(); //контроль текущего состояния очереди
    console.log(`list of nodes= ${currentArray}`);

    setListArray([...array]); //применить изменения состояния очереди
    await sleep();
  }

  const deleteFromTail = async () => {
    const array: IListDisplay[] = [...listArray]; //вычитываем массив из состояния

    array[array.length-1] = {...array[array.length-1], delete: true, extra: array[array.length-1].letter, letter: '', tail: ''}; //отобразить нижний элемент под первым, очистить значение
    setListArray([...array]); //применить изменения состояния очереди
    await sleep(); 
    
    array[array.length-1] = {...array[array.length-1], delete: false, extra: undefined}; //убрать отображение нижнего элемента под первым
    array.pop();                                             //удалить последний элемент массива отображения
    if (array.length !== 0) array[array.length-1] = {...array[array.length-1], tail : 'tail'};//добавить надпись tail при ненулевой длине очереди
    setListArray([...array]); //применить изменения состояния очереди
    await sleep();
    
    list.deleteTail();  //удалить один элемент из конца очереди
    const currentArray: string[] = list.toArray(); //контроль текущего состояния очереди
    console.log(`list of nodes= ${currentArray}`);

    setListArray([...array]); //применить изменения состояния очереди
    await sleep();
  }

  const addByIndex = () => { }
  const deleteByIndex = () => { }

  //функция-ожидание
  const sleep = () => new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));

  return (
    <SolutionLayout title="Связный список">
      <form className={styles.content} onSubmit={onSubmit}  >
        <div className={styles.headtail}>
          <Input
            type="text"
            maxLength={4}
            isLimitText={true}
            onChange={onChangeString}
            value={inputString}
            style={{ width: 204 }}
          />
          <Button
            text="Добавить в head"
            disabled={false}
            onClick={() => addToHead()}
            isLoader={isLoader}
            style={{ width: 175 }}
          />
          <Button
            text="Добавить в tail"
            disabled={false}
            onClick={() => addToTail()}
            isLoader={isLoader}
            style={{ width: 175 }}
          />
          <Button
            text="Удалить из head"
            disabled={false}
            onClick={() => deleteFromHead()}
            isLoader={isLoader}
            style={{ width: 175 }}
          />
          <Button
            text="Удалить из tail"
            disabled={false}
            onClick={() => deleteFromTail()}
            isLoader={isLoader}
            style={{ width: 175 }}
          />
        </div>
        <div className={styles.indexes}>
          <Input
            min={1}
            max={listArray.length}
            type="number"
            isLimitText={false}
            onChange={onChangeIndex}
            value={inputIndex}
            style={{ width: 204 }}
          />
          <Button
            text="Добавить по индексу"
            disabled={false}
            onClick={() => addByIndex()}
            isLoader={isLoader}
            style={{ width: 362 }}
          />
          <Button
            text="Удалить по индексу"
            disabled={false}
            onClick={() => deleteByIndex()}
            isLoader={isLoader}
            style={{ width: 362 }}
          />
        </div>
      </form>
      <ul className={styles.outString}>
        {listArray.map((item, index) => (
          <li key={index} className={styles.elementsArrows}>
            {item && <Circle
              letter={item.letter ? item.letter.toString() : ''}
              state={item.state}
              index={index}
              head={item.head ? item.head.toString() : ''}
              tail={item.tail ? item.tail.toString() : ''} />}
            {index < listArray.length - 1 && <ArrowIcon />}
            {item.add && <Circle 
              letter={item.extra}
              state={ElementStates.Changing}
              isSmall={true}
              extraClass={styles.top}
            />}
            {item.delete && <Circle 
              letter={item.extra}
              state={ElementStates.Changing}
              isSmall={true}
              extraClass={styles.bottom}
            />}
          </li>))}
      </ul>
    </SolutionLayout >
  );
};
