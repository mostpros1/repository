// Start van de testreeks voor "Register as specialist"
import faker from 'faker';
//"Faker" -bibliotheek, het is een hulpmiddel voor testing , maakt nep info zoals namen en postcodes voor tests.
describe('Testing "Register as specialist"', () => {
  // Herhaal de test voor 5 verschillende invoergegevens
  for (let i = 1; i < 2; i++) {
    // Specificeer wat elke test doet
    it(`type in input - test ${i}`, () => {

      // Initialiseer de testomgeving
      cy.janTestBegin();
      // Stel faker in op Nederlands voor realistische testdata
      faker.locale = 'nl';
      // Genereer een Nederlandse postcode
      const dutchZipCode = `${faker.datatype.number({ min: 1000, max: 9999 })}${String.fromCharCode(faker.datatype.number({ min: 65, max: 90 }))}${String.fromCharCode(faker.datatype.number({ min: 65, max: 90 }))}`;
      // Genereer een fictieve Nederlandse stad
      const dutchCity = faker.address.city();

      // Begin met het invullen van het formulier, startend met een beroep
      cy.get('input').eq(0).type('Loodgieter');
       // "loodgieter" wordt in het eerste veld ingevuld.
       // Vervang 'selectie-npm' met het daadwerkelijke id van het <select> element.
       // Wacht tot de optie in het DOM verschijnt
      //cy.get('#klus-select').should('contain', 'Afvoer Ontstopping')
      //cy.get('#klus-select').select('Lekkende Kranen/Leidingen Reparatie');
      // Corrected the selector by closing the quotes properly
      
      // Vul de overige velden in met gegenereerde data
      //cy.get('textarea').eq(0).type(faker.lorem.sentence()); //Rendom zinnen wordt in 2de veld (bio) ingevuld
      cy.get('input[type="email"]').eq(0).type(faker.internet.email()); //Rendom e-mail wordt in 3de veld ingevuld
      cy.get('input[type="postcode"]').eq(0).type(dutchZipCode); //Rendom postcode wordt in 4de veld ingevuld
      cy.get('input[type="text"]').eq(1).type(dutchCity); //Rendom plaatsnaam wordt in 5de veld ingevuld

      // Navigeer naar de volgende pagina na het invullen van het formulier
      cy.goForward();
    });
  }
});
