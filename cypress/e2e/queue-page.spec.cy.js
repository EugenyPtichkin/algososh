import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import {
  circleContentClass,
  circleDefaultClass,
  circleChangingClass,
  circleLetterClass
} from './../../src/constants/selectors';

describe('queue test', function () {

  beforeEach('queue algorithm should be available', function () {
    cy.visit('queue');
  });

  it('add button should be disabled with empty input', () => {
    cy.get('input').should('have.value', '');
    cy.get('button').eq(1).should('be.disabled');
  });

  it('should add the new element correctly', () => {
    //добавить 1й элемент
    cy.get('input').clear().type('1111');
    cy.get('button').contains('Добавить').click();
    cy.get(circleContentClass).first().as('firstElement');
    cy.get('@firstElement').children(circleChangingClass);
    cy.get('@firstElement').contains('1111');
    cy.get('@firstElement').contains('head');
    cy.get('@firstElement').contains('tail');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('@firstElement').children(circleDefaultClass);

    //добавить 2й элемент    
    cy.get('input').type('2222');
    cy.get('button').contains('Добавить').click();
    cy.get(circleContentClass).eq(1).children(circleChangingClass);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circleContentClass).eq(1).children(circleDefaultClass);
    cy.get(circleContentClass)
      .should('have.length', 7)
      .each(($el, index) => {
        if (index === 0) {
          cy.wrap($el).contains('1111');
          cy.wrap($el).contains('head');
        }
        if (index === 1) {
          cy.wrap($el).contains('2222');
          cy.wrap($el).contains('tail');
        }
      });

    //добавить 3й элемент    
    cy.get('input').type('3333');
    cy.get('button').contains('Добавить').click();
    cy.get(circleContentClass).eq(2).children(circleChangingClass);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circleContentClass).eq(2).children(circleDefaultClass);
    cy.get(circleContentClass)
      .each(($el, index) => {
        if (index === 0) {
          cy.wrap($el).contains('1111');
          cy.wrap($el).contains('head');
          cy.wrap($el).contains('tail').should('not.exist');
        }
        if (index === 1) {
          cy.wrap($el).contains('2222');
          cy.wrap($el).contains('head').should('not.exist');
          cy.wrap($el).contains('tail').should('not.exist');
        }
        if (index === 2) {
          cy.wrap($el).contains('3333');
          cy.wrap($el).contains('head').should('not.exist');
          cy.wrap($el).contains('tail');
        }
      });


    //добавить 4й элемент    
    cy.get('input').type('4444');
    cy.get('button').contains('Добавить').click();
    cy.get(circleContentClass).eq(3).children(circleChangingClass);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circleContentClass).eq(3).children(circleDefaultClass);
    cy.get(circleContentClass)
      .each(($el, index) => {
        if (index === 0) {
          cy.wrap($el).contains('1111');
          cy.wrap($el).contains('head');
          cy.wrap($el).contains('tail').should('not.exist');
        }
        if (index === 1) {
          cy.wrap($el).contains('2222');
          cy.wrap($el).contains('head').should('not.exist');
          cy.wrap($el).contains('tail').should('not.exist');
        }
        if (index === 2) {
          cy.wrap($el).contains('3333');
          cy.wrap($el).contains('head').should('not.exist');
          cy.wrap($el).contains('tail').should('not.exist');
        }
        if (index === 3) {
          cy.wrap($el).contains('4444');
          cy.wrap($el).contains('head').should('not.exist');
          cy.wrap($el).contains('tail');
        }
      });
  });

  it('should delete elements from queue correctly', () => {
    //добавить 4 элемента
    cy.get('input').clear().type('111');
    cy.get('button').contains('Добавить').click();
    cy.get('input').clear().type('222');
    cy.get('button').contains('Добавить').click();
    cy.get('input').clear().type('333');
    cy.get('button').contains('Добавить').click();
    cy.get('input').clear().type('444');
    cy.get('button').contains('Добавить').click();
    cy.wait(SHORT_DELAY_IN_MS);
    //удалить 1й элемент
    cy.get('button').contains('Удалить').click();
    cy.get(circleContentClass).eq(0).children(circleChangingClass);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circleContentClass).eq(0).children(circleDefaultClass);
    cy.get(circleContentClass)
      .each(($el, index) => {
        if (index === 0) {
          cy.wrap($el).contains('111').should('not.exist');
          cy.wrap($el).contains('head').should('not.exist');
          cy.wrap($el).contains('tail').should('not.exist');
        }
        if (index === 1) {
          cy.wrap($el).contains('222');
          cy.wrap($el).contains('head');
          cy.wrap($el).contains('tail').should('not.exist');
        }
        if (index === 2) {
          cy.wrap($el).contains('333');
          cy.wrap($el).contains('head').should('not.exist');
          cy.wrap($el).contains('tail').should('not.exist');
        }
        if (index === 3) {
          cy.wrap($el).contains('444');
          cy.wrap($el).contains('head').should('not.exist');
          cy.wrap($el).contains('tail');
        }
      });

    //удалить 2й элемент
    cy.get('button').contains('Удалить').click();
    cy.get(circleContentClass).eq(1).children(circleChangingClass);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circleContentClass).eq(1).children(circleDefaultClass);
    cy.get(circleContentClass)
      .each(($el, index) => {
        if (index === 0) {
          cy.wrap($el).contains('111').should('not.exist');
          cy.wrap($el).contains('head').should('not.exist');
          cy.wrap($el).contains('tail').should('not.exist');
        }
        if (index === 1) {
          cy.wrap($el).contains('222').should('not.exist');
          cy.wrap($el).contains('head').should('not.exist');
          cy.wrap($el).contains('tail').should('not.exist');
        }
        if (index === 2) {
          cy.wrap($el).contains('333');
          cy.wrap($el).contains('head');
          cy.wrap($el).contains('tail').should('not.exist');
        }
        if (index === 3) {
          cy.wrap($el).contains('444');
          cy.wrap($el).contains('head').should('not.exist');
          cy.wrap($el).contains('tail');
        }
      });

    //удалить 3й элемент
    cy.get('button').contains('Удалить').click();
    cy.get(circleContentClass).eq(2).children(circleChangingClass);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circleContentClass).eq(2).children(circleDefaultClass);
    cy.get(circleContentClass)
      .each(($el, index) => {
        if (index === 0) {
          cy.wrap($el).contains('111').should('not.exist');
          cy.wrap($el).contains('head').should('not.exist');
          cy.wrap($el).contains('tail').should('not.exist');
        }
        if (index === 1) {
          cy.wrap($el).contains('222').should('not.exist');
          cy.wrap($el).contains('head').should('not.exist');
          cy.wrap($el).contains('tail').should('not.exist');
        }
        if (index === 2) {
          cy.wrap($el).contains('333').should('not.exist');
          cy.wrap($el).contains('head').should('not.exist');
          cy.wrap($el).contains('tail').should('not.exist');
        }
        if (index === 3) {
          cy.wrap($el).contains('444');
          cy.wrap($el).contains('head');
          cy.wrap($el).contains('tail');
        }
      });

    //удалить 4й элемент
    cy.get('button').contains('Удалить').click();
    cy.get(circleContentClass).eq(3).children(circleChangingClass);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circleContentClass).eq(3).children(circleDefaultClass);
    cy.get(circleContentClass)
      .each(($el, index) => {
        if (index === 0) {
          cy.wrap($el).contains('111').should('not.exist');
          cy.wrap($el).contains('head').should('not.exist');
          cy.wrap($el).contains('tail').should('not.exist');
        }
        if (index === 1) {
          cy.wrap($el).contains('222').should('not.exist');
          cy.wrap($el).contains('head').should('not.exist');
          cy.wrap($el).contains('tail').should('not.exist');
        }
        if (index === 2) {
          cy.wrap($el).contains('333').should('not.exist');
          cy.wrap($el).contains('head').should('not.exist');
          cy.wrap($el).contains('tail').should('not.exist');
        }
        if (index === 3) {
          cy.wrap($el).contains('444').should('not.exist');
          cy.wrap($el).contains('head');
          cy.wrap($el).contains('tail').should('not.exist');
        }
      });

    //добавить 5й элемент
    cy.get('input').clear().type('555');
    cy.get('button').contains('Добавить').click();
    cy.get(circleContentClass).eq(4).children(circleChangingClass);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circleContentClass).eq(4).children(circleDefaultClass);
    cy.get(circleContentClass)
      .each(($el, index) => {
        if (index === 4) {
          cy.wrap($el).contains('555');
          cy.wrap($el).contains('head');
          cy.wrap($el).contains('tail');
        } else {
          cy.wrap($el).contains('head').should('not.exist');
          cy.wrap($el).contains('tail').should('not.exist');
        }
      });

    //удалить 5й элемент
    cy.get('button').contains('Удалить').click();
    cy.get(circleContentClass).eq(4).children(circleChangingClass);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circleContentClass).eq(4).children(circleDefaultClass);
    cy.get(circleContentClass)
      .each(($el, index) => {
        if (index === 4) {
          cy.wrap($el).contains('555').should('not.exist');
          cy.wrap($el).contains('head');
          cy.wrap($el).contains('tail').should('not.exist');
        } else {
          cy.wrap($el).contains('head').should('not.exist');
          cy.wrap($el).contains('tail').should('not.exist');
        }
      });
    //очистить очередь
    cy.get('button').contains('Очистить').click();

  });

  it('should clear queue correctly', () => {
    //добавить 7 элементов
    cy.get('input').clear().type('11');
    cy.get('button').contains('Добавить').click();
    cy.get('input').clear().type('22');
    cy.get('button').contains('Добавить').click();
    cy.get('input').clear().type('33');
    cy.get('button').contains('Добавить').click();
    cy.get('input').clear().type('44');
    cy.get('button').contains('Добавить').click();
    cy.get('input').clear().type('55');
    cy.get('button').contains('Добавить').click();
    cy.get('input').clear().type('66');
    cy.get('button').contains('Добавить').click();
    cy.get('input').clear().type('77');
    cy.get('button').contains('Добавить').click();
    cy.wait(SHORT_DELAY_IN_MS);
    //очистить очередь
    cy.get('button').contains('Очистить').click();
    cy.get(circleContentClass)
      .each((el) => {
        cy.wrap(el).contains('head').should('not.exist');
        cy.wrap(el).contains('tail').should('not.exist');
        cy.wrap(el).get(circleLetterClass).should('be.empty');
      })
  });

});