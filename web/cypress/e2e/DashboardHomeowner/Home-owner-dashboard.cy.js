import faker from 'faker';
//Stap 1 - Test 1
context('Dashboard Home-owner', () => {
  for (let i = 1; i < 2; i++) {
    it(`Type in input - test ${i}`, () => {
      // TEST 1: Type in input
      cy.testinlog();
      cy.dshchat('abdelrahmanfox22@yahoo.com','0123456789' );
      cy.get('[type="button"]').click();
      cy.get('.button-container > :nth-child(2)').click();
      cy.get('body').then(($body) => {
        if ($body.text().includes('abdelrahmanfox22@yahoo.com')) {
          throw new Error('Foutmelding: abdelrahmanfox22@yahoo.com moet niet bestaan');
        } else {
          console.log('Het proces is correct uitgevoerd.');
        }
      });

      //cy.get('.sidebar-list > :nth-child(1) > .sidebar-link').click();  //Job page
        //cy.get('.sidebar-list > :nth-child(2) > .sidebar-link').click(); //chat page
    });
  }
});
