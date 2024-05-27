//Test 1
context('Profile page bezoeken', () => {
    for (let i = 1; i < 2; i++) {
      it(`Type in input - test ${i}`, () => {
        // TEST 1: Type in input
        cy.testinlog();
        cy.helps('abdelrahmanfox22@yahoo.com','0123456789' );
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
  
//Test 2
  context('Over Mostpros', () => {
    it('Type in input en controleer foutmelding', () => {
      // TEST 1: Type in input
      cy.testinlog();
      cy.helps('abdelrahmanfox22@yahoo.com', '0123456789');
      cy.get('body').then(($body) => {
        if ($body.text().includes('abdelrahmanfox22@yahoo.com')) {
          throw new Error('Foutmelding: abdelrahmanfox22@yahoo.com moet niet bestaan');
        } else {
          console.log('Het proces is correct uitgevoerd.');
        }
      });
  
      // Klik op antwoorden
      for (let i = 1; i < 6; i++) {
        cy.get(`:nth-child(1) > .questions-con > :nth-child(${i}) > .answer`).click();
      }
    });
  });
  
  //Test 3
  context('Tarieven en facturatie', () => {
    it('Type in input en controleer foutmelding', () => {
      // TEST 1: Type in input
      cy.testinlog();
      cy.helps('abdelrahmanfox22@yahoo.com', '0123456789');
      cy.get('body').then(($body) => {
        if ($body.text().includes('abdelrahmanfox22@yahoo.com')) {
          throw new Error('Foutmelding: abdelrahmanfox22@yahoo.com moet niet bestaan');
        } else {
          console.log('Het proces is correct uitgevoerd.');
        }
      });
  
      // Klik op antwoorden
      for (let i = 1; i < 4; i++) {
        cy.get(`:nth-child(2) > .questions-con > :nth-child(${i}) > .answer`).click();
      }
    });
  });

//Test 4
  context('Ratings en Reviews', () => {
    it('Type in input en controleer foutmelding', () => {
      // TEST 1: Type in input
      cy.testinlog();
      cy.helps('abdelrahmanfox22@yahoo.com', '0123456789');
      cy.get('body').then(($body) => {
        if ($body.text().includes('abdelrahmanfox22@yahoo.com')) {
          throw new Error('Foutmelding: abdelrahmanfox22@yahoo.com moet niet bestaan');
        } else {
          console.log('Het proces is correct uitgevoerd.');
        }
      });
  
      // Klik op antwoorden
      for (let i = 1; i < 5; i++) {
        cy.get(`:nth-child(3) > .questions-con > :nth-child(${i}) > .answer`).click();
      }
    });
  });
//Test 5
  context('Pro-certificering en screening', () => {
    it('Type in input en controleer foutmelding', () => {
      // TEST 1: Type in input
      cy.testinlog();
      cy.helps('abdelrahmanfox22@yahoo.com', '0123456789');
      cy.get('body').then(($body) => {
        if ($body.text().includes('abdelrahmanfox22@yahoo.com')) {
          throw new Error('Foutmelding: abdelrahmanfox22@yahoo.com moet niet bestaan');
        } else {
          console.log('Het proces is correct uitgevoerd.');
        }
      });
  
      // Klik op antwoorden
      for (let i = 1; i < 7; i++) {
        cy.get(`:nth-child(4) > .questions-con > :nth-child(${i}) > .answer`).click();
      }
    });
  });

//Test 6
  context('Projectondersteuning', () => {
    it('Type in input en controleer foutmelding', () => {
      // TEST 1: Type in input
      cy.testinlog();
      cy.helps('abdelrahmanfox22@yahoo.com', '0123456789');
      cy.get('body').then(($body) => {
        if ($body.text().includes('abdelrahmanfox22@yahoo.com')) {
          throw new Error('Foutmelding: abdelrahmanfox22@yahoo.com moet niet bestaan');
        } else {
          console.log('Het proces is correct uitgevoerd.');
        }
      });
  
      // Klik op antwoorden
      for (let i = 1; i < 5; i++) {
        cy.get(`:nth-child(5) > .questions-con > :nth-child(${i}) > .answer`).click();
      }
    });
  });
//Test 7
  context('Beveiliging en accountbeheer', () => {
    it('Type in input en controleer foutmelding', () => {
      // TEST 1: Type in input
      cy.testinlog();
      cy.helps('abdelrahmanfox22@yahoo.com', '0123456789');
      cy.get('body').then(($body) => {
        if ($body.text().includes('abdelrahmanfox22@yahoo.com')) {
          throw new Error('Foutmelding: abdelrahmanfox22@yahoo.com moet niet bestaan');
        } else {
          console.log('Het proces is correct uitgevoerd.');
        }
      });
  
      // Klik op antwoorden///
      for (let i = 1; i < 7; i++) {
        cy.get(`:nth-child(6) > .questions-con > :nth-child(${i}) > .answer`).click();
      }
    });
  });
  
  

