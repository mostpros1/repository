import faker from 'faker';
//Stap 1
describe('Testing "Register as specialist"', () => {
  for (let i = 1; i < 6; i++) {
 //    it(`type in input - iteration ${i+1}`, () =>
    it(`type in input - test ${i}`, () => {

    cy.lisaTestBegin();
     faker.locale = 'nl'; // Zet de locale van faker op 'nl' voor Nederlandse gegevens 
     const dutchZipCode = `${faker.datatype.number({ min: 1000, max: 9999 })}${String.fromCharCode(faker.datatype.number({ min: 65, max: 90 }))}${String.fromCharCode(faker.datatype.number({ min: 65, max: 90 }))}`;
     const dutchCity = faker.address.city(); // Genereert een Nederlandse plaatsnaam
     const password = faker.internet.password();

     // TEST 2
      cy.get('input').eq(0).type(dutchZipCode)// Nederlands rendom postcode
      //cy.get('input[type="postcode"]').eq(0).type(`${Math.floor(1000 + Math.random() * 9000)}${String.fromCharCode(Math.floor(Math.random() * 26) + 65)}${String.fromCharCode(Math.floor(Math.random() * 26) + 65)}`);//werld postcode
      // Typ de gegenereerde postcode in het inputveld
      cy.get('input[type="text"]').eq(1).type(dutchCity); // Typ de gegenereerde plaatsnaam in het inputveld

      cy.goForward();
      //Test 3 -Stap2
      for (let i = 1; i < 6; i++) {
        cy.get(`.dateCards_wrapper > :nth-child(${i})`).should('be.visible').click();
        cy.get('[class="form-btn back"]').click();
        cy.goForward();
        cy.goForward();
        cy.get('textarea').eq(0).type('dajnbdlknsklvbsdls')
        cy.goForward();
        function performInputCheck() {
            cy.get('input[type="text"]').eq(0).type(faker.name.firstName());
            cy.get('input[type="text"]').eq(1).type(faker.name.lastName());
            cy.get('input[type="email"]').clear().type(faker.internet.email());
            cy.get('input[type="tel"]').clear().type(faker.phone.phoneNumber()); // Toegevoegd .clear() voor consistentie
            cy.get('input[type="password"]').eq(0).type(password);
            cy.get('input[type="password"]').eq(1).type(password);
            cy.goForward();
             // Aannemend dat dit een custom command is dat je opnieuw wilt uitvoeren
        }

        // Voer inputcheck uit met willekeurige waarden
        performInputCheck();
        cy.goForward();
    }
    
    });
  }
});
