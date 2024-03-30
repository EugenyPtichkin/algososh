describe('string reverse test for length of 1-6 only', function () {
  const testString = 'МОРЯКИ';

  beforeEach('string algorithm should be available', function () {
    cy.visit('http://localhost:3000/recursion');
  });

  it('button should be disabled with empty input', () => {
    cy.get('input').should('have.value', '');
    cy.get('button').eq(1).should('be.disabled');
  });

  it('should reverse string', () => {
    cy.get('input').type(testString);
    cy.get('button').contains('Развернуть').click();
  
    //состояние до переворота
    cy.get('[class*=circle_content]')
      .should('have.length', testString.length)
      .each((el, index) => {
        cy.wrap(el).contains(testString[index]);
        if (index === 0 || index === testString.length - 1) {
          cy.wrap(el).find('[class*=circle_changing]');
        } else {
          cy.wrap(el).find('[class*=circle_default]');
        }
      });
      
      //состояние после второго переворота
      cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 0 || index === testString.length - 1) {
          cy.wrap(el).contains(testString[testString.length - 1 - index]);
          cy.wrap(el).find('[class*=circle_modified]');
        } else {
          cy.wrap(el).contains(testString[index]);
          if (index === 1 || index === testString.length - 2) {
            cy.wrap(el).find('[class*=circle_changing]');
          } else {
            cy.wrap(el).find('[class*=circle_default]');
          }
        }
      });

      //состояние после третьего переворота
      cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 0 || index === 1 || index === testString.length - 2 || index === testString.length - 1) {
          cy.wrap(el).contains(testString[testString.length - 1 - index]);
          cy.wrap(el).find('[class*=circle_modified]');
        } else {
          cy.wrap(el).contains(testString[index]);
            cy.wrap(el).find('[class*=circle_changing]');
         }
      });

      //состояние окончательное
      cy.get('[class*=circle_content]')
      .each((el, index) => {
        cy.wrap(el).contains(testString[testString.length - 1 - index]);
        cy.wrap(el).find('[class*=circle_modified]');
      });

  });

});