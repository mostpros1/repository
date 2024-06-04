context('payment stander test', () => {
  for (let i = 1; i < 2; i++) {
    it(`Type in input - test ${i}`, () => {
      // TEST 1: Type in input
      cy.testinlog();
      cy.dshspayment('abdelrahmanfox22@yahoo.com','0123456789' );
      cy.get('body').then(($body) => {
        if ($body.text().includes('abdelrahmanfox22@yahoo.com')) {
          throw new Error('Foutmelding: abdelrahmanfox22@yahoo.com moet niet bestaan');
        } else {
          console.log('Het proces is correct uitgevoerd.');
        }
      });
      cy.get('.ProPaymentsButton').should('not.be.visible').click();
      //cy.get('.sidebar-list > :nth-child(2) > .sidebar-link').click();  //Job page
        //cy.get(':nth-child(5) > .sidebar-link').click(); //payment page
    });
  }
});