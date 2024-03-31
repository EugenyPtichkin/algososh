import {
  circleContentClass,
  circleDefaultClass,
  circleChangingClass,
  circleModifiedClass
} from './../../src/constants/selectors';

describe('string reverse test for length of 1-6 only', function () {
  const testString = 'МОРЯКИ';

  beforeEach('string algorithm should be available', function () {
    cy.visit('recursion');
  });

  it('button should be disabled with empty input', () => {
    cy.get('input').should('have.value', '');
    cy.get('button').eq(1).should('be.disabled');
  });

  it('should reverse string', () => {
    cy.get('input').type(testString);
    cy.get('button').contains('Развернуть').click();
    //состояние до переворота
    cy.get(circleContentClass)
      .should('have.length', testString.length)
      .each((el, index) => {
        cy.wrap(el).contains(testString[index]);
        if (index === 0 || index === testString.length - 1) {
          cy.wrap(el).find(circleChangingClass);
        } else {
          cy.wrap(el).find(circleDefaultClass);
        }
      });
    //состояние после второго переворота
    cy.get(circleContentClass)
      .each((el, index) => {
        if (index === 0 || index === testString.length - 1) {
          cy.wrap(el).contains(testString[testString.length - 1 - index]);
          cy.wrap(el).find(circleModifiedClass);
        } else {
          cy.wrap(el).contains(testString[index]);
          if (index === 1 || index === testString.length - 2) {
            cy.wrap(el).find(circleChangingClass);
          } else {
            cy.wrap(el).find(circleDefaultClass);
          }
        }
      });
    //состояние после третьего переворота
    cy.get(circleContentClass)
      .each((el, index) => {
        if (index === 0 || index === 1 || index === testString.length - 2 || index === testString.length - 1) {
          cy.wrap(el).contains(testString[testString.length - 1 - index]);
          cy.wrap(el).find(circleModifiedClass);
        } else {
          cy.wrap(el).contains(testString[index]);
          cy.wrap(el).find(circleChangingClass);
        }
      });
    //состояние окончательное
    cy.get(circleContentClass)
      .each((el, index) => {
        cy.wrap(el).contains(testString[testString.length - 1 - index]);
        cy.wrap(el).find(circleModifiedClass);
      });
  });
});