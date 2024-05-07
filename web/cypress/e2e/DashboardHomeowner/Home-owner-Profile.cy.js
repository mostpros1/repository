//Stap 1 - Test 1
context('Profile page bezoeken', () => {
  for (let i = 1; i < 2; i++) {
    it(`Type in input - test ${i}`, () => {
      // TEST 1: Type in input
      cy.testinlog();
      cy.dshsprofile('abdelrahmanfox22@yahoo.com','0123456789' );
      cy.get('body').then(($body) => {
        if ($body.text().includes('abdelrahmanfox22@yahoo.com')) {
          throw new Error('Foutmelding: abdelrahmanfox22@yahoo.com moet niet bestaan');
        } else {
          console.log('Het proces is correct uitgevoerd.');
        }
      });
      //cy.get('.sidebar-list > :nth-child(2) > .sidebar-link').click();  //Job page
        //cy.get('.sidebar-list > :nth-child(3) > .sidebar-link').click(); //chat page
    });
  }
});

//Stap 2 Test 1
context('Profile page testing uitvoeren', () => {
    beforeEach(() => {
    // Voer de inlog- en setupacties uit voor elke test
    cy.testinlog();
    cy.dshsprofile('abdelrahmanfox22@yahoo.com','0123456789' );
    });
    it('Profile page testen , button Beschikbaarheid doorgeven & Wijzigen', () => {
        
        cy.get('.availability-btn').click();
        cy.wait(2000);
        cy.get('.sidebar-bottom > :nth-child(1) > .sidebar-link').click();
        cy.get('.change-btn').click();

        //cy.get('.sidebar-list > :nth-child(2) > .sidebar-link').click();  //Job pagina
     // cy.get('.sidebar-bottom > :nth-child(1) > .sidebar-link').click(); //profile paginaa 

    });
});
