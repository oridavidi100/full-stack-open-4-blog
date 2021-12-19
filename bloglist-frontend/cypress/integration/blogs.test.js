/* eslint-disable no-undef */
describe('Note app', function () {
  describe('when logged in', function () {
    beforeEach(function () {
      cy.visit('http://localhost:3000');
      cy.contains('log in').click();
      cy.get('input:username').type('ori');
      cy.get('input:password').type('ori');
      cy.get('#login-button').click();
    });

    it('a new note can be created', function () {
      cy.contains('new note').click();
      cy.get('input').type('a note created by cypress');
      cy.contains('save').click();
      cy.contains('a note created by cypress');
    });
  });
});
