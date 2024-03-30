import { SHORT_DELAY_IN_MS } from "./../../src/constants/delays";

describe('fibonacci test', function () {
const indexes  =  [0, 1, 2 ,3, 4, 5, 6,  7,  8,  9,  10, 11,  12,  13,  14,  15,  16,   17,   18,   19];
const fibonacci = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765];
const maxvalue = 8; // maxvalue<=19!  maxvalue>=1!

  beforeEach('string algorithm should be available', function () {
    cy.visit('http://localhost:3000/fibonacci');
  });

  it('button should be disabled on start', () => {
    cy.get('input').should('have.value', '0');
    cy.get('button').should('be.disabled');
  });

  it('should render correct fibonacci values', () => {
    cy.get('input').type('{moveToEnd}').type(maxvalue);    
    cy.get('button').contains('Рассчитать').click();

    cy.wait(SHORT_DELAY_IN_MS*(maxvalue+1));

    cy.get('[class*=circle_content]')
   .should('have.length', maxvalue+1)
    .each((el, index) => {
      cy.wrap(el).contains(fibonacci[index]);
      cy.wrap(el).get('[class*=circle_index]').contains(indexes[index]);
      cy.wrap(el).find('[class*=circle_default]');
    });
  });
});