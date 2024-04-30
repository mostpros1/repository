

import faker from 'faker';
describe('Testing "Register as Home owner"', () => {
  for (let i = 1; i < 6; i++) { // 5 keer testen
 //    it(`type in input - iteration ${i+1}`, () =>
    it(`type in input - test ${i}`, () => { //test 1 tot 5

    cy.lisaTestBegin();// home page
     faker.locale = 'nl'; // Zet de locale van faker op 'nl' voor Nederlandse gegevens 
     const dutchZipCode = `${faker.datatype.number({ min: 1000, max: 9999 })}${String.fromCharCode(faker.datatype.number({ min: 65, max: 90 }))}${String.fromCharCode(faker.datatype.number({ min: 65, max: 90 }))}`;
     const dutchCity = faker.address.city(); // Genereert een Nederlandse plaatsnaam

     // TEST 2
      cy.get('input').eq(0).type(dutchZipCode)// Nederlands rendom postcode
      //cy.get('input[type="postcode"]').eq(0).type(`${Math.floor(1000 + Math.random() * 9000)}${String.fromCharCode(Math.floor(Math.random() * 26) + 65)}${String.fromCharCode(Math.floor(Math.random() * 26) + 65)}`);//werld postcode
      // Typ de gegenereerde postcode in het inputveld
      cy.get('input[type="text"]').eq(1).type(dutchCity); // Typ de gegenereerde plaatsnaam in het inputveld

      cy.goForward(); //naar de volgend page
    });
  }
});
