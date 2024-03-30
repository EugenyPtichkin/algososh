import { SHORT_DELAY_IN_MS } from "./../../src/constants/delays";

it('should add the new element correctly', () => {
  cy.visit('http://localhost:3000/queue');
  
  cy.get('input').type('19');
  cy.get('button').contains('Добавить').click();

  cy.get('[class*=circle_content]').first().as('firstElement');
  cy.get('@firstElement').children('[class*=circle_changing]');
  cy.get('@firstElement').contains('19');
  cy.get('@firstElement').contains('head');
  cy.get('@firstElement').contains('tail');
  cy.wait(SHORT_DELAY_IN_MS);
  cy.get('@firstElement').children('[class*=circle_default]');

  cy.get('input').type('12');
  cy.get('button').contains('Добавить').click();
  cy.wait(SHORT_DELAY_IN_MS);

  cy.get('[class*=circle_content]').should('have.length', 7).each(($el, index) => {
      if (index === 0) {
          cy.wrap($el).contains('19');
          cy.wrap($el).contains('head');
      }
      if (index === 1) {
          cy.wrap($el).contains('12');
          cy.wrap($el).contains('tail');
      }
  });
});