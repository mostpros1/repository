import faker from 'faker';
//Stap 1 - Test 1
context('Chat page ENTER', () => {
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


//Stap 2 - Test 1
context('text en foto uploaden test', () => {
  for (let i = 1; i < 2; i++) {
    it(`Type in input - test ${i}`, () => {
      // TEST 1: Type in input
      cy.testinlog();
      cy.dshchat('abdelrahmanfox22@yahoo.com','0123456789' );
      cy.wait(2000);
      cy.get('#sidebar > ul > li').click();
    cy.get('body').then(($body) => {
      if ($body.text().includes('abdelrahmanfox22@yahoo.com')) {
        throw new Error('Foutmelding: abdelrahmanfox22@yahoo.com moet niet bestaan');
      } else {
        console.log('Het proces is correct uitgevoerd.');
      }
    });
      cy.get('#search').click();
      //cy.get('#search').eq(0).type('Excuseer voor het irriteren, dit is een automatische test van Abdel.');
      // cy.get('kbd').click(); muis klik werkt niet
      cy.get('#search').eq(0).type('Excuseer voor het irriteren, dit is een automatische test van Abdel.{enter}');
      cy.get('.addPhoto').click();
      // cy.get('.sidebar-list > :nth-child(1) > .sidebar-link').click(); // Job page 
      //   cy.get('.sidebar-list > :nth-child(2) > .sidebar-link').click(); //Chat page 

    });
  }
});

//Stap 3 - Test 1
context('Payment testen', () => {
  for (let i = 1; i < 2; i++) {
    it(`Type in input - test ${i}`, () => {
      // TEST 1: Type in input
      cy.testinlog();
      cy.dshchat('abdelrahmanfox22@yahoo.com','0123456789' );
      cy.wait(2000);
      cy.get('#sidebar > ul > li').click();
      cy.get('.betalingbedrag').eq(0).type('20').click;
      cy.get('.addPay').click();
      cy.wait(1000);
      cy.get('.create-payment').click();
      cy.get('body').then(($body) => {
        if ($body.text().includes('Stripe account ID is missing.')) {
          throw new Error('Error: Stripe account ID is missing moet niet weergeven.');
        }
      });
     // cy.get('.sidebar-list > :nth-child(1) > .sidebar-link').click(); // Job page 
    //   cy.get('.sidebar-list > :nth-child(2) > .sidebar-link').click(); //Chat page 
    });
  }
});