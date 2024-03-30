describe('routing is available', function() {

  it('should be available on localhost:3000', function() {
    cy.visit('http://localhost:3000');
  });

  it('string algorithm should be available', function() {
    cy.visit('http://localhost:3000/recursion');
  });

  it('fibonacci algorithm should be available', function() {
    cy.visit('http://localhost:3000/fibonacci');
  });

  it('sorting algorithm should be available', function() {
    cy.visit('http://localhost:3000/sorting');
  });

  it('stack algorithm should be available', function() {
    cy.visit('http://localhost:3000/stack');
  });

  it('queue algorithm should be available', function() {
    cy.visit('http://localhost:3000/queue');
  });

  it('connected list algorithm should be available', function() {
    cy.visit('http://localhost:3000/list');
  });

  it('unknown page should redirect', function() {
    cy.visit('http://localhost:3000/asdfasfd');
  });



}); 