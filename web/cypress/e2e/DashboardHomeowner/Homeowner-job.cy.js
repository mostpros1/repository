import faker from 'faker';

// Stap 1
context('Text in searchbaar typpen"', () => {
  for (let i = 1; i < 2; i++) {
    it(`Type in input - test ${i}`, () => {
      cy.Jobs();
      // TEST 1: Type in input
      cy.get('input[type="text"]').eq(0).type(faker.name.jobType());
      cy.chat();
      cy.Jobs();
    });
  }
});

// Stap 2
context('Text in searchbaar typpen"', () => {
    for (let i = 1; i < 2; i++) {
      it(`Type in input - test ${i}`, () => {
        cy.Jobs();
        // TEST 1: Type in input
        cy.get('input[type="text"]').eq(0).type(faker.name.jobType());
        cy.get('[class="job-actions"]').click().should('be.visible').click();
        cy.chat();
        cy.Jobs();
      });
    }
  });