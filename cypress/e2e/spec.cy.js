describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000');

    cy.contains('Novo Contato').click();

    cy.url({ timeout: 10000 }).should('include', 'new');
  });
});
