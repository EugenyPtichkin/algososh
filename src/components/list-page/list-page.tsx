import React, { useMemo } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./linked-list-page.module.css";
import { useState } from "react";
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { LinkedList } from "./linked-list";
import { IListDisplay } from "./interfaceListDisplay";
import { ArrowIcon } from "../ui/icons/arrow-icon";

export const ListPage: React.FC = () => {
  const maxListLength: number = 7;
  const initialArray = useMemo(() => {
    return ['0', '34', '8', '1'];
  }, [])
  const [listArray, setListArray] = useState<IListDisplay[]>(initialArray.map(item => { return { letter: item, state: ElementStates.Default } }));
  const [inputString, setInputString] = useState<string>('');
  const [inputIndex, setInputIndex] = useState<string>('');
  const list = useMemo(() => new LinkedList<string>(initialArray.reverse()), []);//сохранить list между рендерами!
  const [displayButtons, setDisplayButtons] = useState(
    {
      isAddHead: false,
      isAddTail: false,
      isAddByIndex: false,
      isDeleteByIndex: false,
      isDeleteHead: false,
      isDeleteTail: false
    });

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

  /*-------------------------------------------------*/
  /*    Добавление элемента в начало списка          */
  /*-------------------------------------------------*/
  const addToHead = async () => {
    if (!inputString) { //при пустой строке ввода не делать ничего, но не тушить кнопку "Добавить"
      return;
    }
    setDisplayButtons({ ...displayButtons, isAddHead: true });
    const array: IListDisplay[] = [...listArray]; //вычитываем массив из состояния
    list.prepend(inputString);  //добавить в очередь в начало 
    const currentArray: string[] = list.toArray(); //контроль текущего состояния очереди
    console.log(`list of nodes= ${currentArray ? currentArray : null}`);

    if (array.length > 0) {
      array[0] = { ...array[0], add: true, extra: inputString, head: '' }; //отобразить верхний элемент над первым
      setListArray([...array]); //применить изменения состояния очереди
      await sleep();
      array[0] = { ...array[0], add: false, extra: undefined };//убрать отображение верхнего элемента над первым       
      array.unshift({ letter: inputString, state: ElementStates.Modified, head: 'head', tail: '' });//добавить вперед массива отображения с зеленым цветом
    } else { //особый случай - добавлен первый элемент
      array.unshift({ letter: '', state: ElementStates.Default, add: true, extra: inputString, head: '', tail: '' });
      setListArray([...array]); //применить изменения состояния очереди
      await sleep();
      array[0] = { ...array[0], add: false, extra: undefined, letter: inputString, state: ElementStates.Modified, head: 'head', tail: 'tail' };
    }
    setListArray([...array]); //применить изменения состояния очереди
    await sleep();

    array[0].state = ElementStates.Default; //вернуть штатную расцветку
    setListArray([...array]); //применить изменения состояния очереди
    await sleep();

    setInputString(''); //обнулить ввод
    setDisplayButtons({ ...displayButtons, isAddHead: false });
  }

  /*-------------------------------------------------*/
  /*    Добавление элемента в конец списка           */
  /*-------------------------------------------------*/
  const addToTail = async () => {
    if (!inputString) { //при пустой строке ввода не делать ничего, но не тушить кнопку "Добавить"
      return;
    }
    setDisplayButtons({ ...displayButtons, isAddTail: true });
    const array: IListDisplay[] = [...listArray]; //вычитываем массив из состояния
    list.append(inputString);  //добавить в конец очереди
    const currentArray: string[] = list.toArray(); //контроль текущего состояния очереди
    console.log(`list of nodes= ${currentArray ? currentArray : null}`);

    if (array.length !== 0) { //при ненулевой длине очереди
      array[array.length - 1] = { ...array[array.length - 1], add: true, extra: inputString, head: '' }; //отобразить верхний элемент над последним
      setListArray([...array]); //применить изменения состояния очереди
      await sleep();
      array[array.length - 1] = { ...array[array.length - 1], add: false, extra: undefined, tail: '' }; //убрать отображение верхнего элемента над первым 
      array.push({ letter: inputString, state: ElementStates.Modified, tail: 'tail', head: array.length === 0 ? 'head' : '' });//добавить назад массива отображения
    } else { //особый случай - очередь пуста
      array.push({ letter: '', state: ElementStates.Default, tail: '', head: '', add: true, extra: inputString });//сначала добавить пустой элемент массива      
      setListArray([...array]); //применить изменения состояния очереди
      await sleep();
      array[0] = { ...array[0], add: false, extra: undefined, letter: inputString, state: ElementStates.Modified, tail: 'tail', head: 'head' };
    }
    if (array.length === 2) {
      array[0] = { ...array[0], head: 'head' }; //добавить head если добавлен второй элемент очереди (head удален выше)
    }
    setListArray([...array]); //применить изменения состояния очереди
    await sleep();

    array[array.length - 1].state = ElementStates.Default; //вернуть штатную расцветку
    setListArray([...array]); //применить изменения состояния очереди
    await sleep();

    setInputString(''); //обнулить ввод
    setDisplayButtons({ ...displayButtons, isAddTail: false });
  }

  /*-------------------------------------------------*/
  /*      Удаление элемента из начала списка         */
  /*-------------------------------------------------*/
  const deleteFromHead = async () => {
    setDisplayButtons({ ...displayButtons, isDeleteHead: true });
    const array: IListDisplay[] = [...listArray]; //вычитываем массив из состояния

    array[0] = { ...array[0], delete: true, extra: array[0].letter, letter: '', tail: '' }; //отобразить нижний элемент под первым, очистить значение
    setListArray([...array]); //применить изменения состояния очереди
    await sleep();

    array[0] = { ...array[0], delete: false, extra: undefined }; //убрать отображение нижнего элемента под первым
    array.shift();                                             //удалить первый элемент массива отображения
    if (array.length !== 0) array[0] = { ...array[0], head: 'head' };//добавить надпись head при ненулевой длине очереди
    setListArray([...array]); //применить изменения состояния очереди
    await sleep();

    list.deleteHead();  //удалить один элемент из начала очереди
    const currentArray: string[] = list.toArray(); //контроль текущего состояния очереди
    console.log(`list of nodes= ${currentArray ? currentArray : null}`);

    setDisplayButtons({ ...displayButtons, isDeleteHead: false });
  }

  /*-------------------------------------------------*/
  /*      Удаление элемента из конца списка          */
  /*-------------------------------------------------*/
  const deleteFromTail = async () => {
    setDisplayButtons({ ...displayButtons, isDeleteTail: true });
    const array: IListDisplay[] = [...listArray]; //вычитываем массив из состояния

    array[array.length - 1] = { ...array[array.length - 1], delete: true, extra: array[array.length - 1].letter, letter: '', tail: '' }; //отобразить нижний элемент под первым, очистить значение
    setListArray([...array]); //применить изменения состояния очереди
    await sleep();

    array[array.length - 1] = { ...array[array.length - 1], delete: false, extra: undefined }; //убрать отображение нижнего элемента под первым
    array.pop();                                                                         //удалить последний элемент массива отображения
    if (array.length !== 0) array[array.length - 1] = { ...array[array.length - 1], tail: 'tail' };//добавить надпись tail при ненулевой длине очереди
    setListArray([...array]); //применить изменения состояния очереди
    await sleep();

    list.deleteTail();  //удалить один элемент из конца очереди
    const currentArray: string[] = list.toArray(); //контроль текущего состояния очереди
    console.log(`list of nodes= ${currentArray ? currentArray : null}`);

    setDisplayButtons({ ...displayButtons, isDeleteTail: false });
  }
  /*-------------------------------------------------*/
  /*    Добавление элемента по указанному индексу    */
  /*-------------------------------------------------*/
  const addByIndex = async (inputIndex: string) => {
    if (Number(inputIndex) < 0 || Number(inputIndex) > list.getSize()) { //при некорректном индексе вывести сообщение в лог
      console.log(`Запрашиваемый индекс ${inputIndex} вне диапазона {0...${list.getSize()}}`)
      return;
    }
    setDisplayButtons({ ...displayButtons, isAddByIndex: true });

    const array: IListDisplay[] = [...listArray];    //вычитываем массив из состояния
    list.insertAt(inputString, Number(inputIndex));  //добавить в очередь по указанному индексу
    const currentArray: string[] = list.toArray();   //контроль текущего состояния очереди
    console.log(`list of nodes= ${currentArray ? currentArray : null}`);
    if (array.length > 0) {
      for (let i: number = 0; i <= Number(inputIndex); i++) {
        array[i] = { ...array[i], add: true, extra: inputString, head: '', state: ElementStates.Changing }; //отобразить верхний элемент над текущим элементом
        if (i > 0) {
          array[i - 1] = { ...array[i - 1], add: false, extra: undefined }; //убрать отображение верхнего элемента над предыдущим элементом
        }
        if (i === 1) {
          array[i - 1] = { ...array[i - 1], head: 'head' }; //вернуть удаленную метку head верхним элементом если он не первый
        }
        setListArray([...array]); //применить изменения состояния очереди
        await sleep();
      }
      array[Number(inputIndex)] = { ...array[Number(inputIndex)], add: false, extra: undefined }; //убрать отображение верхнего элемента над вставляемым элементом
      array.forEach((item) => item.state = ElementStates.Default);   //вернуть всем подкрашенным элементам стандартные цвета
      array.splice(Number(inputIndex), 0, { letter: inputString, state: ElementStates.Modified }); //вставить на выбранное место новый элемент, окрасить зеленым      
      array[0] = { ...array[0], head: 'head' }; //вернуть удаленную метку head верхним элементом если он первый      
      setListArray([...array]); //применить изменения состояния очереди
      await sleep();
      array[Number(inputIndex)] = { ...array[Number(inputIndex)], state: ElementStates.Default }; //вернуть вновь вставленному элементу стандартные цвета      
    } else { //особый случай - добавлен элемент в пустой список
      array.push({ letter: '', state: ElementStates.Default, add: true, extra: inputString, head: '', tail: '' });
      setListArray([...array]); //применить изменения состояния очереди
      await sleep();
      array[0] = { ...array[0], add: false, extra: undefined, letter: inputString, state: ElementStates.Modified, head: 'head', tail: 'tail' };
      setListArray([...array]); //применить изменения состояния очереди
      await sleep();
      array[0].state = ElementStates.Default; //вернуть штатную расцветку
    }
    setListArray([...array]); //применить изменения состояния очереди
    await sleep();

    setInputString(''); //обнулить ввод
    setDisplayButtons({ ...displayButtons, isAddByIndex: false });
  }

  /*-------------------------------------------------*/
  /*    Удаление элемента по указанному индексу      */
  /*-------------------------------------------------*/
  const deleteByIndex = async (inputIndex: string) => {
    setDisplayButtons({ ...displayButtons, isDeleteByIndex: true });



    setDisplayButtons({ ...displayButtons, isDeleteByIndex: false });
  }

  //функция-ожидание
  const sleep = () => new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS));

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
            disabled={list.getSize() === maxListLength}
            onClick={() => addToHead()}
            isLoader={displayButtons.isAddHead}
            style={{ width: 175 }}
          />
          <Button
            text="Добавить в tail"
            disabled={list.getSize() === maxListLength}
            onClick={() => addToTail()}
            isLoader={displayButtons.isAddTail}
            style={{ width: 175 }}
          />
          <Button
            text="Удалить из head"
            disabled={list.getSize() === 0}
            onClick={() => deleteFromHead()}
            isLoader={displayButtons.isDeleteHead}
            style={{ width: 175 }}
          />
          <Button
            text="Удалить из tail"
            disabled={list.getSize() === 0}
            onClick={() => deleteFromTail()}
            isLoader={displayButtons.isDeleteTail}
            style={{ width: 175 }}
          />
        </div>
        <div className={styles.indexes}>
          <Input
            min={0}
            max={list.getSize() >= 1 ? list.getSize() - 1 : 0}
            type="number"
            isLimitText={false}
            onChange={onChangeIndex}
            value={inputIndex}
            style={{ width: 204 }}
          />
          <Button
            text="Добавить по индексу"
            disabled={list.getSize() === maxListLength}
            onClick={() => addByIndex(inputIndex)}
            isLoader={displayButtons.isAddByIndex}
            style={{ width: 362 }}
          />
          <Button
            text="Удалить по индексу"
            disabled={list.getSize() === 0}
            onClick={() => deleteByIndex(inputIndex)}
            isLoader={displayButtons.isDeleteByIndex}
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
