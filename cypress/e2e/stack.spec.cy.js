import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import {
  circleContentClass,
  circleDefaultClass,
  circleChangingClass,
  circleIndexClass,
  circleStringClass
} from './../../src/constants/selectors';

describe('stack test', function () {

  beforeEach('stack algorithm should be available', function () {
    cy.visit('stack');
  });

  it('add button should be disabled with empty input', () => {
    cy.get('input').should('have.value', '');
    cy.get('button').eq(1).should('be.disabled');
  });

  it('items should be added correctly ', () => {
    //добавить 1й элемент
    cy.get('input').clear().type('1111');
    cy.get('button').contains('Добавить').click();
    cy.get(circleContentClass)
      .should('have.length', '1')
      .each((el, index) => {
        cy.wrap(el).get(circleIndexClass).contains(index);
        if (index === 0) {
          cy.wrap(el).get(circleStringClass).contains('top');
          cy.wrap(el).find(circleChangingClass);
        }
      });
    //добавить 2й элемент
    cy.get('input').clear().type('2222');
    cy.get('button').contains('Добавить').click();
    cy.get(circleContentClass)
      .should('have.length', '2')
      .each((el, index) => {
        cy.wrap(el).get(circleIndexClass).contains(index);
        if (index === 1) {
          cy.wrap(el).get(circleStringClass).contains('top');
          cy.wrap(el).find(circleChangingClass);
        } else {
          cy.wrap(el).find(circleDefaultClass);
        }
      });
    //добавить 3й элемент
    cy.get('input').clear().type('3333');
    cy.get('button').contains('Добавить').click();
    cy.get(circleContentClass)
      .should('have.length', '3')
      .each((el, index) => {
        cy.wrap(el).get(circleIndexClass).contains(index);
        if (index === 2) {
          cy.wrap(el).get(circleStringClass).contains('top');
          cy.wrap(el).find(circleChangingClass);
        } else {
          cy.wrap(el).find(circleDefaultClass);
        }
      });
    //добавить 4й элемент
    cy.get('input').clear().type('4444');
    cy.get('button').contains('Добавить').click();
    cy.get(circleContentClass)
      .should('have.length', '4')
      .each((el, index) => {
        cy.wrap(el).get(circleIndexClass).contains(index);
        if (index === 3) {
          cy.wrap(el).get(circleStringClass).contains('top');
          cy.wrap(el).find(circleChangingClass);
        } else {
          cy.wrap(el).find(circleDefaultClass);
        }
      });
    //проверить цвета
    cy.get(circleContentClass)
      .each((el) => {
        cy.wrap(el).find(circleDefaultClass);
      });

  });

  it('items should be deleted correctly ', () => {
    //добавить 3 элемента
    cy.get('input').clear().type('111');
    cy.get('button').contains('Добавить').click();
    cy.get('input').clear().type('222');
    cy.get('button').contains('Добавить').click();
    cy.get('input').clear().type('333');
    cy.get('button').contains('Добавить').click();

    //удалить 3й элемент
    cy.get('button').contains('Удалить').click();
    cy.get(circleContentClass)
      .should('have.length', '3')
      .each((el, index) => {
        if (index === 2) {
          cy.wrap(el).find(circleChangingClass);
          cy.wrap(el).get(circleStringClass).contains('top');
        } else {
          cy.wrap(el).find(circleDefaultClass);
        }
        cy.wrap(el).get(circleIndexClass).contains(index);
      });
    //ожидание на смену цвета и удаление
    cy.wait(SHORT_DELAY_IN_MS);
    //проверить количество, цвета и надпись top
    cy.get(circleContentClass)
      .should('have.length', '2')
      .each((el, index) => {
        if (index === 1) {
          cy.wrap(el).get(circleStringClass).contains('top');
        }
        cy.wrap(el).find(circleDefaultClass);
        cy.wrap(el).get(circleIndexClass).contains(index);
      });

    //удалить 2й элемент
    cy.get('button').contains('Удалить').click();
    cy.get(circleContentClass)
      .should('have.length', '2')
      .each((el, index) => {
        if (index === 1) {
          cy.wrap(el).find(circleChangingClass);
          cy.wrap(el).get(circleStringClass).contains('top');
        } else {
          cy.wrap(el).find(circleDefaultClass);
        }
        cy.wrap(el).get(circleIndexClass).contains(index);
      });
    //ожидание на смену цвета и удаление
    cy.wait(SHORT_DELAY_IN_MS);
    //проверить количество, цвета и надпись top
    cy.get(circleContentClass)
      .should('have.length', '1')
      .each((el, index) => {
        if (index === 0) {
          cy.wrap(el).get(circleStringClass).contains('top');
        }
        cy.wrap(el).find(circleDefaultClass);
        cy.wrap(el).get(circleIndexClass).contains(index);
      });

    //удалить 1й элемент
    cy.get('button').contains('Удалить').click();
    cy.get(circleContentClass)
      .should('have.length', '1')
      .each((el, index) => {
        if (index === 0) {
          cy.wrap(el).find(circleChangingClass);
          cy.wrap(el).get(circleStringClass).contains('top');
        }
        cy.wrap(el).get(circleIndexClass).contains(index);
      });
    //ожидание на смену цвета и удаление
    cy.wait(SHORT_DELAY_IN_MS);
    //проверить что элементов не осталось
    cy.get(circleContentClass).should('not.exist');
  });

  it('stack should be cleared correctly ', () => {
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
    cy.get(circleContentClass).should('have.length', '7')
    //очистить очередь    
    cy.get('button').contains('Очистить').click();
    cy.get(circleContentClass).should('have.length', '0')
  });
});