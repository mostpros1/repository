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

     // TEST 2
      cy.get('input').eq(0).type(dutchZipCode)// Nederlands rendom postcode
      //cy.get('input[type="postcode"]').eq(0).type(`${Math.floor(1000 + Math.random() * 9000)}${String.fromCharCode(Math.floor(Math.random() * 26) + 65)}${String.fromCharCode(Math.floor(Math.random() * 26) + 65)}`);//werld postcode
      // Typ de gegenereerde postcode in het inputveld
      cy.get('input[type="text"]').eq(1).type(dutchCity); // Typ de gegenereerde plaatsnaam in het inputveld

      cy.goForward();
      //Test 3 -Stap2
      for (let i = 1; i < 6; i++) {
        cy.get(`.dateCards_wrapper > :nth-child(${i})`).click()
        cy.goForward()
        cy.get('[class="form-btn back"]').click()
    }
    
    // check 4
    cy.get('.dateCards_wrapper > :nth-child(6)').click()
    cy.get('[data-timestamp]').first().click();
    cy.goForward()
    
    cy.get('[class="form-btn back"]').click()
    
    // check 5
    cy.get('.dateCards_wrapper > :nth-child(6)').click()
    cy.get('[data-timestamp]').last().click();
    cy.goForward()
    });
  }
});
