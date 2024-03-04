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
  const initialArray: IListDisplay[] = [{ letter: '0' }, { letter: '34' }, { letter: '8' }, { letter: '1' }];
  const [listArray, setListArray] = useState<IListDisplay[]>(initialArray);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [inputString, setInputString] = useState<string>('');
  const [inputIndex, setInputIndex] = useState<string>('');
  const list = useMemo(() => new LinkedList<number>(), []);//сохранить queue между рендерами!


  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    //setInputString(e.target.value);
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //addToQueue();
  }

  const addToHead = () => { }
  const addToTail = () => { }
  const deleteFromHead = () => { }
  const deleteFromTail = () => { }
  const addByIndex = () => { }
  const deleteByIndex = () => { }

  return (
    <SolutionLayout title="Связный список">
      <form className={styles.content} onSubmit={onSubmit}  >
        <div className={styles.headtail}>
          <Input
            type="text"
            maxLength={4}
            isLimitText={true}
            onChange={onChange}
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
            text="Удалить в tail"
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
            type="number"
            isLimitText={false}
            onChange={onChange}
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
              <ArrowIcon/>
          </li>))}
      </ul>
    </SolutionLayout >
  );
};
