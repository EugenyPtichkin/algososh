describe('routing is available', function() {

  it('should be available on localhost:3000', function() {
    cy.visit('');
  });

  it('string algorithm should be available', function() {
    cy.visit('recursion');
  });

  it('fibonacci algorithm should be available', function() {
    cy.visit('fibonacci');
  });

  it('sorting algorithm should be available', function() {
    cy.visit('sorting');
  });

  it('stack algorithm should be available', function() {
    cy.visit('stack');
  });

  it('queue algorithm should be available', function() {
    cy.visit('queue');
  });

  it('connected list algorithm should be available', function() {
    cy.visit('list');
  });

  it('unknown page should redirect', function() {
    cy.visit('asdfasfd');
  });

}); 