import faker from 'faker';

//Stap 1 - Test 1
context('Reviewpage bezoeken"', () => {
  for (let i = 1; i < 2; i++) {
    it(`Type in input - test ${i}`, () => {
        cy.testinlog(); //inlogpage naar toe 
        cy.dshreview('abdelrahmanfox22@yahoo.com','0123456789' ); // gegevens vullen
    });
  }
});

//Stap 2 - Test 1
context('Review functionality test uitvoeren"', () => {
    for (let i = 1; i < 2; i++) {
      it(`Type in input - test ${i}`, () => {
          cy.testinlog();
          cy.dshreview('abdelrahmanfox22@yahoo.com','0123456789' );
          cy.get('select').select('Date');
          cy.wait(5000);
          cy.get('select').select('totalReviews');
          cy.wait(5000);
          cy.get('select').select('Relevance');
          //tot nu wordt geen date opgeslagd in datebase 
          cy.get('input[type="text"]').eq(0).type(faker.name.firstName());
          cy.get('textarea').eq(0).type(faker.lorem.sentence());
          cy.get('.review-form > button').click();;

      });
    }
  });

  //Stap 3 - Test 1
context('reviews-list functionality testen "', () => {
    for (let i = 1; i < 2; i++) {
      it(`Type in input - test ${i}`, () => {
          cy.testinlog();
          cy.dshreview('abdelrahmanfox22@yahoo.com','0123456789' );
          // selectie box testen 
          cy.get('select').select('Date');
          cy.wait(2000); //tijd aangeven om te testen
          cy.get('select').select('totalReviews');
          cy.wait(2000);
          cy.get('select').select('Relevance');
          //tot nu wordt geen date opgeslagd in datebase 
          cy.get('input[type="text"]').eq(0).type(faker.name.firstName()); //voorname 
          cy.get('textarea').eq(0).type(faker.lorem.sentence()); //bio
          cy.get('.review-form > button').click(); //submit
          // review stars moet toepast zijn maar is nog niet getest
          //reviews list fn testen
          cy.get(':nth-child(1) > .review-footer > .review-actions > :nth-child(1)').click(); //public comment 
          cy.get(':nth-child(1) > .review-footer > .review-actions > :nth-child(2)').click(); //direct messege 
          cy.get('#search').click();
          cy.get('#search').eq(0).type('Excuseer voor het irriteren, dit is een automatische test van Abdel.{enter}');
         cy.get('.sidebar-list > :nth-child(1) > .sidebar-link').click(); // Job page 
        cy.get('.sidebar-list > :nth-child(5) > .sidebar-link').click(); //review page 
      });
    }
  });
