import faker from 'faker';
//Stap 1 - Test 1
// context('Settings page ENTER', () => {
//   for (let i = 1; i < 2; i++) {
//     it(`Type in input - test ${i}`, () => {
//       // TEST 1: Type in input
//       cy.testinlog();
//       cy.dshsettings('abdelrahmanfox22@yahoo.com','0123456789' );
//       cy.get('body').then(($body) => {
//         if ($body.text().includes('abdelrahmanfox22@yahoo.com')) {
//           throw new Error('Foutmelding: abdelrahmanfox22@yahoo.com moet niet bestaan');
//         } else {
//           console.log('Het proces is correct uitgevoerd.');
//         }
//       });
//       //cy.get('.sidebar-list > :nth-child(2) > .sidebar-link').click();  //Job page
//         //cy.get('.sidebar-list > :nth-child(3) > .sidebar-link').click(); //chat page
//     });
//   }
// });

//Stap 2 - Test 1

// context('Algemene Info formuleer testen', () => {
//     beforeEach(() => {
//       // Voer de inlog- en setupacties uit voor elke test
//       cy.testinlog();
//       cy.dshsettings('abdelrahmanfox22@yahoo.com', '0123456789');
//     });
//           //Test 2 Algemene formuleer invullen
//         it('formuleer testing uitvoeren', () => {
//         cy.get('input[type="text"]').eq(0).type(faker.name.firstName());
//         cy.get('input[type="text"]').eq(1).type(faker.name.lastName());
//         cy.get(':nth-child(3) > input').clear().type(faker.internet.email()); //Voor e-mail
//         cy.get(':nth-child(4) > input').clear().type('+31' + faker.phone.phoneNumber().slice(2));//voor telefoonnummer
//         cy.get('.save-btn > button').click();
//     });
// });

// //Stap 3 - Test 1

// context('Notification optie testen', () => {
//     beforeEach(() => {
//       // Voer de inlog- en setupacties uit voor elke test
//       cy.testinlog();
//       cy.dshsettings('abdelrahmanfox22@yahoo.com', '0123456789');
//     });
//     it('Voert alle slider interacties uit met wachten en dubbelklikken', () => {
//       // Hier voer je de slider interacties uit
//       cy.log('Wacht en klikt dan twee keer op de eerste slider');
//       cy.wait(2000); // Wacht 2 seconden voor de eerste actie
//       cy.get(':nth-child(1) > :nth-child(3) > .switch > .slider').click().click();
  
//       cy.log('Wacht en klikt dan twee keer op de tweede slider');
//       cy.wait(2000); // Wacht nogmaals 2 seconden
//       cy.get(':nth-child(1) > :nth-child(4) > .switch > .slider').click().click();
  
//       cy.log('Wacht en klikt dan twee keer op de derde slider');
//       cy.wait(2000); // Wacht nogmaals 2 seconden
//       cy.get(':nth-child(1) > :nth-child(5) > .switch > .slider').click().click();
  
//       cy.log('Wacht en klikt dan twee keer op de vierde slider');
//       cy.wait(2000); // Wacht nogmaals 2 seconden
//       cy.get('.notification-settings > :nth-child(3) > :nth-child(3) > .switch > .slider').click().click();
  
//       cy.log('Wacht en klikt dan twee keer op de vijfde slider');
//       cy.wait(2000); // Wacht nogmaals 2 seconden
//       cy.get(':nth-child(3) > :nth-child(4) > .switch > .slider').click().click();
  
//       cy.log('Wacht en klikt dan twee keer op de zesde slider');
//       cy.wait(2000); // Wacht nogmaals 2 seconden
//       cy.get(':nth-child(3) > :nth-child(5) > .switch > .slider').click().click();
//     });
//   });

  //Stap 4 - Test 1

// context('Password & Security testen', () => {
//     beforeEach(() => {
//       // Voer de inlog- en setupacties uit voor elke test
//       cy.testinlog();
//       cy.dshsettings('abdelrahmanfox22@yahoo.com', '0123456789');
//     });
//     it('Password & Security testen testing uitvoeren', () => {
//         const password = faker.internet.password();

//     cy.get('input[type="password"]').eq(0).type(password); //wachtwoord veld invullen
//       cy.log('Wacht en klikt op slider');
//       cy.wait(2000); // Wacht nogmaals 2 seconden
//       cy.get('.toggle-switch > .switch > .slider').click();//2 Stap verificatie aanzetten
//       cy.get('.field-input > button').click(); //Klikken op wachtwoord wijzigen
  
//     });
//   });

 //Stap 5 Test 1

  context('Account verwijderen', () => {
    beforeEach(() => {
      // Voer de inlog- en setupacties uit voor elke test
      cy.testinlog();
      cy.dshsettings('abdelrahmanfox22@yahoo.com', '0123456789');
    });
    it('Account verwijderen testing uitvoren', () => {
    cy.get('#delete-confirm').click(); //vinkje op (Bevestig dat u uw account wilt verwijderen)
    cy.get('.delete-account-button(testen)').click(); //Account verwijderen button klikken.
    });
  });