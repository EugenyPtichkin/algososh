import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import {
  circleContentClass,
  circleIndexClass,
  circleCircleClass,
  circleDefaultClass,
  circleModifiedClass,
  circleLetterClass
} from './../../src/constants/selectors';

describe('list test', function () {

  beforeEach('list algorithm should be available', function () {
    cy.visit('list');
  });

  it('add buttons should be disabled with empty input', () => {
    cy.get('input').eq(0).should('have.value', ''); //value
    cy.get('button').eq(1).should('be.disabled');   //Добавить в head
    cy.get('button').eq(2).should('be.disabled');   //Добавить в tail
    cy.get('button').eq(5).should('be.disabled');   //Добавить по индексу
  });

  it('add/delete index buttons should be disabled with zero index', () => {
    cy.get('input').eq(1).should('have.value', '0');  //index
    cy.get('button').eq(5).should('be.disabled');     //Добавить по индексу
    cy.get('button').eq(6).should('be.disabled');     //Удалить по индексу
  });

  it('should show default data correctly', () => {
    cy.get(circleContentClass)
      .should('have.length', 6)
      .each((el, index) => {
        if (index === 0) {
          cy.wrap(el).contains('head');
        }
        if (index === 6 - 1) {
          cy.wrap(el).contains('tail');
        }
        cy.wrap(el).get(circleLetterClass).should('be.not.empty');
        cy.wrap(el).get(circleIndexClass).contains(index);
      });
  });

  //---------------------ADD TO HEAD----------------------------
  it('should add element to head correctly', () => {
    //добавить один элемент в начало
    cy.get('input').eq(0).type('1111');
    cy.get('button').contains('Добавить в head').click();
    cy.get(circleContentClass).eq(0).children(circleCircleClass).contains('head').should('not.exist');//есть кружок, нет head
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circleContentClass)
      .should('have.length', 6 + 1)
      .each(($el, index) => {
        if (index === 0) {
          cy.wrap($el).contains('1111');
          cy.wrap($el).contains('head');
          cy.wrap($el).eq(0).children(circleModifiedClass);
        }
      });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circleContentClass).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).eq(0).children(circleDefaultClass);
      }
    });
    //добавить еще один элемент в начало
    cy.get('input').eq(0).type('2222');
    cy.get('button').contains('Добавить в head').click();
    cy.get(circleContentClass).eq(0).children(circleCircleClass).contains('head').should('not.exist');//есть кружок, нет head
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circleContentClass)
      .should('have.length', 6 + 2)
      .each(($el, index) => {
        if (index === 0) {
          cy.wrap($el).contains('2222');
          cy.wrap($el).contains('head');
          cy.wrap($el).eq(0).children(circleModifiedClass);
        }
      });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circleContentClass).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).eq(0).children(circleDefaultClass);
      }
    });
  });

  //---------------------ADD TO TAIL----------------------------
  it('should add element to tail correctly', () => {
    //добавить один элемент в конец
    cy.get('input').eq(0).type('7777');
    cy.get('button').contains('Добавить в tail').click();
    cy.get(circleContentClass).eq(6).children(circleCircleClass);//есть кружок
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circleContentClass)
      .should('have.length', 6 + 1)
      .each(($el, index) => {
        if (index === 5) {//удаление tail с предыдущего
          cy.wrap($el).contains('tail').should('not.exist');
        }
        if (index === 6) {
          cy.wrap($el).contains('7777');
          cy.wrap($el).contains('tail');
          cy.wrap($el).eq(0).children(circleModifiedClass);
        }
      });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circleContentClass).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).eq(0).children(circleDefaultClass);
      }
    });
    //добавить еще один элемент в конец
    cy.get('input').eq(0).type('8888');
    cy.get('button').contains('Добавить в tail').click();
    cy.get(circleContentClass).eq(7).children(circleCircleClass);//есть кружок
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circleContentClass)
      .should('have.length', 6 + 2)
      .each(($el, index) => {
        if (index === 6) {//удаление tail с предыдущего
          cy.wrap($el).contains('tail').should('not.exist');
        }
        if (index === 6 + 1) {
          cy.wrap($el).contains('8888');
          cy.wrap($el).contains('tail');
          cy.wrap($el).eq(0).children(circleModifiedClass);
        }
      });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circleContentClass).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).eq(0).children(circleDefaultClass);
      }
    });
  });

  //---------------------ADD BY INDEX----------------------------
  it('should add element by index correctly', () => {
    //добавить один элемент по индексу например №3
    cy.get('input').eq(0).type('ABCD');
    cy.get('input').eq(1).type('{moveToEnd}').type('3');
    cy.get('button').contains('Добавить по индексу').click();
    cy.get(circleContentClass).eq(3).children(circleCircleClass);//есть кружок
    cy.wait((3 + 1) * SHORT_DELAY_IN_MS);
    cy.get(circleContentClass)
      .should('have.length', 6 + 1)
      .each(($el, index) => {
        if (index === 3) {
          cy.wrap($el).contains('ABCD');
          cy.wrap($el).eq(0).children(circleModifiedClass);
        }
      });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circleContentClass).each(($el, index) => {
      if (index === 3) {
        cy.wrap($el).eq(0).children(circleDefaultClass);
      }
    });
    //добавить еще один элемент по индексу например №5
    cy.get('input').eq(0).type('АБВГ');
    cy.get('input').eq(1).type('{moveToEnd}').type('5');
    cy.get('button').contains('Добавить по индексу').click();
    cy.get(circleContentClass).eq(5).children(circleCircleClass);//есть кружок
    cy.wait((5 + 1) * SHORT_DELAY_IN_MS);
    cy.get(circleContentClass)
      .should('have.length', 6 + 2)
      .each(($el, index) => {
        if (index === 5) {
          cy.wrap($el).contains('АБВГ');
          cy.wrap($el).eq(0).children(circleModifiedClass);
        }
      });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circleContentClass).each(($el, index) => {
      if (index === 5) {
        cy.wrap($el).eq(0).children(circleDefaultClass);
      }
    });
  });

  //---------------------DELETE FROM HEAD----------------------------
  it('should delete element from head correctly', () => {
    //удалить один элемент из начала
    cy.get('button').contains('Удалить из head').click();
    cy.get(circleLetterClass).eq(0).should('be.empty');//очищено поле
    cy.get(circleContentClass).eq(0).children(circleCircleClass);//есть кружок    
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circleContentClass)
      .should('have.length', 6 - 1)
      .each(($el, index) => {
        if (index === 0) {
          cy.wrap($el).get(circleLetterClass).should('be.not.empty');
          cy.wrap($el).contains('head');
        }
      });
    //удалить еще один элемент из начала
    cy.get('button').contains('Удалить из head').click();
    cy.get(circleLetterClass).eq(0).should('be.empty');//очищено поле
    cy.get(circleContentClass).eq(0).children(circleCircleClass);//есть кружок    
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circleContentClass)
      .should('have.length', 6 - 2)
      .each(($el, index) => {
        if (index === 0) {
          cy.wrap($el).get(circleLetterClass).should('be.not.empty');
          cy.wrap($el).contains('head');
        }
      });
  });

  //---------------------DELETE FROM TAIL----------------------------
  it('should delete element from tail correctly', () => {
    //удалить один элемент с конца
    cy.get('button').contains('Удалить из tail').click();
    cy.get(circleLetterClass).eq(5).should('be.empty');//очищено поле
    cy.get(circleContentClass).eq(5).children(circleCircleClass).contains('tail').should('not.exist');//есть кружок, нет tail
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circleContentClass)
      .should('have.length', 6 - 1)
      .each(($el, index) => {
        if (index === 5 - 1) {
          cy.wrap($el).get(circleLetterClass).should('be.not.empty');
          cy.wrap($el).contains('tail');
        }
      });
    //удалить еще один элемент с конца
    cy.get('button').contains('Удалить из tail').click();
    cy.get(circleLetterClass).eq(4).should('be.empty');//очищено поле
    cy.get(circleContentClass).eq(4).children(circleCircleClass).contains('tail').should('not.exist');//есть кружок, нет tail
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circleContentClass)
      .should('have.length', 6 - 2)
      .each(($el, index) => {
        if (index === 5 - 2) {
          cy.wrap($el).get(circleLetterClass).should('be.not.empty');
          cy.wrap($el).contains('tail');
        }
      });
  });

  //---------------------DELETE BY INDEX----------------------------
  it('should delete element by index correctly', () => {
    //Удалить один элемент по индексу например №5 (последний)
    cy.get('input').eq(1).clear().type('{moveToEnd}').type('5');
    cy.get('button').contains('Удалить по индексу').click();
    cy.get(circleContentClass).eq(5).children(circleCircleClass).contains('tail').should('not.exist');;//есть кружок, нет tail
    cy.wait((5 + 1) * SHORT_DELAY_IN_MS);
    cy.get(circleContentClass)
      .should('have.length', 6 - 1)
      .each(($el, index) => {
        if (index === 5) {
          cy.wrap($el).get(circleLetterClass).should('be.not.empty');
          cy.wrap($el).contains('tail'); //у последнего должен вернуться tail
        }
      });
    cy.wait(SHORT_DELAY_IN_MS); //ожидание анимации кнопки
    //Удалить один элемент по индексу например №3
    cy.get('input').eq(1).clear().type('{moveToEnd}').type('3');
    cy.get('button').contains('Удалить по индексу').click();
    cy.get(circleContentClass).eq(3).children(circleCircleClass);//есть кружок
    cy.wait((3 + 1) * SHORT_DELAY_IN_MS);
    cy.get(circleContentClass)
      .should('have.length', 6 - 2)
      .each(($el, index) => {
        if (index === 3) {
          cy.wrap($el).get(circleLetterClass).should('be.not.empty');
        }
      });
  });
});

