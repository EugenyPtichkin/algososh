import { invertString } from './string';

const testStringsEven = ['123456', '623451' ,'653421', '654321'];
const testStringsOdd = ['12345', '52341' ,'54321'];
const testStringsOne = ['1'];
const testStringZero = [''];

describe('String tests', () => {

    it('check invertString function with even length', () => {
        expect(invertString('123456')).toEqual(testStringsEven);
    });
    
     it('check invertString function with odd length', () => {    
         expect(invertString('12345')).toEqual(testStringsOdd);
     });

    it('check invertString function with length = 1', () => {
      expect(invertString('1')).toEqual(testStringsOne);
    });
    
    it('check invertString function with length = 0', () => {
        expect(invertString('')).toEqual(testStringZero);
    });
})