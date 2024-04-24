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
context('Klikbaar van current jobs-Finished jobs"', () => {
    for (let i = 1; i < 2; i++) {
      it(`Type in input - test ${i}`, () => {
        cy.Jobs();
        // TEST 2: Klikbaar van current jobs-Finished jobs
        cy.get('.job-status > .active').click();
        cy.get('.job-status > :nth-child(2)').click();
        cy.get('.job-status > .active').click();
        cy.chat();
        cy.Jobs();
      });
    }
  });