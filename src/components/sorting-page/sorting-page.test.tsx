import { ISortDisplay } from "./interfaceSortDisplay";
import { selectionSort, bubbleSort } from "./sorting-page";

import { ElementStates } from "../../types/element-states";

const inputSingleValue = [ {number: 1, state: ElementStates.Default} ];
const resultSingleValue = [ {number: 1, state: ElementStates.Modified} ];

const inputArray = [
  {number: 8, state: ElementStates.Default},
  {number: 64, state: ElementStates.Default},
  {number: 4, state: ElementStates.Default},
  {number: 16, state: ElementStates.Default},
  {number: 32, state: ElementStates.Default}
];

const resultingArrayUpwards = [
  {number: 4, state: ElementStates.Modified},
  {number: 8, state: ElementStates.Modified},
  {number: 16, state: ElementStates.Modified},
  {number: 32, state: ElementStates.Modified},
  {number: 64, state: ElementStates.Modified}
];

const resultingArrayDownwards = [
  {number: 64, state: ElementStates.Modified},
  {number: 32, state: ElementStates.Modified},
  {number: 16, state: ElementStates.Modified},
  {number: 8, state: ElementStates.Modified},
  {number: 4, state: ElementStates.Modified}
];


const changeArray = jest.fn();

jest.setTimeout(30000);

describe('Sort tests', () => {
 //------------------------Ascending Sorting--------------------------------
  it('should sort by SORTING ascending algorithm empty array', async () => {
    await selectionSort('ascending', [], changeArray);
    expect(changeArray).toHaveBeenCalledTimes(1);
    expect(changeArray).toHaveBeenLastCalledWith([]);
  });

  it('should sort by SORTING ascending algorithm single value', async () => {
    await selectionSort('ascending', inputSingleValue, changeArray);
    expect(changeArray).toHaveBeenCalledTimes(1);
    expect(changeArray).toHaveBeenLastCalledWith(resultSingleValue);
  });

  it('should sort by SORTING ascending algorithm with array', async () => {
    await selectionSort('ascending', inputArray, changeArray);
    expect(changeArray).toHaveBeenCalledTimes(15);
    expect(changeArray).toHaveBeenLastCalledWith(resultingArrayUpwards);
  });

  //------------------------Descending Sorting--------------------------------
  it('should sort by SORTING descending algorithm empty array', async () => {
    await selectionSort('descending', [], changeArray);
    expect(changeArray).toHaveBeenCalledTimes(1);
    expect(changeArray).toHaveBeenLastCalledWith([]);
  });

  it('should sort by SORTING descending algorithm single value', async () => {
    await selectionSort('descending', inputSingleValue, changeArray);
    expect(changeArray).toHaveBeenCalledTimes(1);
    expect(changeArray).toHaveBeenLastCalledWith(resultSingleValue);
  });

  it('should sort by SORTING descending algorithm with array', async () => {
    await selectionSort('descending', inputArray, changeArray);
    expect(changeArray).toHaveBeenCalledTimes(21);
    expect(changeArray).toHaveBeenLastCalledWith(resultingArrayDownwards);
  });

   //------------------------Ascending Bubble--------------------------------
   it('should sort by BUBBLE ascending algorithm empty array', async () => {
    await bubbleSort('ascending', [], changeArray);
    expect(changeArray).toHaveBeenCalledTimes(1);
    expect(changeArray).toHaveBeenLastCalledWith([]);
  });

  it('should sort by BUBBLE ascending algorithm single value', async () => {
    await bubbleSort('ascending', inputSingleValue, changeArray);
    expect(changeArray).toHaveBeenCalledTimes(1);
    expect(changeArray).toHaveBeenLastCalledWith(resultSingleValue);
  });

  it('should sort by BUBBLE ascending algorithm with array', async () => {
    await bubbleSort('ascending', inputArray, changeArray);
    expect(changeArray).toHaveBeenCalledTimes(11);
    expect(changeArray).toHaveBeenLastCalledWith(resultingArrayUpwards);
  });

  //------------------------Descending Bubble--------------------------------
  it('should sort by BUBBLE descending algorithm empty array', async () => {
    await bubbleSort('descending', [], changeArray);
    expect(changeArray).toHaveBeenCalledTimes(1);
    expect(changeArray).toHaveBeenLastCalledWith([]);
  });

  it('should sort by BUBBLE descending algorithm single value', async () => {
    await bubbleSort('descending', inputSingleValue, changeArray);
    expect(changeArray).toHaveBeenCalledTimes(1);
    expect(changeArray).toHaveBeenLastCalledWith(resultSingleValue);
  });

  it('should sort by BUBBLE descending algorithm with array', async () => {
    await bubbleSort('descending', inputArray, changeArray);
    expect(changeArray).toHaveBeenCalledTimes(11);
    expect(changeArray).toHaveBeenLastCalledWith(resultingArrayDownwards);
  });

});


