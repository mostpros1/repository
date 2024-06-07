import faker from 'faker';

const terms = [
    'Nieuwe Daken Plaatsen',
    'Oude Daken Vervangen',
    'Beschadigde Daken Repareren',
    'Dakisolatie Installeren',
    'Dakbedekking Aanbrengen (Bitumen, Shingles, Pannen, EPDM)',
    'Dakgoten/Regenpijpen Installeren',
    'Daken Onderhouden/Reinigen',
    'Lekkages Lokaliseren/Repareren',
    'Dakvensters/Dakramen Aanbrengen',
    'Zonnepanelen Plaatsen',
    'Schoorstenen/Ventilatiesystemen Installeren',
    'Groendaken/Daktuinen Aanbrengen',
    'Daken Behandelen (Water, UV-straling)',
    'Schadecontrole na Storm/Calamiteiten',
    'Dakinspectie & Onderhoudsadvies',
    'Veiligheidsuitrusting Gebruiken (Valbeveiliging)',
    'Samenwerking Andere Vakmensen',
    'Garantie op Werk',
    'Materiaal/Techniek Advies (Specifiek Dak)',
    'Offertes/Overeenkomsten Dakwerkzaamheden'
  ];

describe('Testing "Dakdekker"', () => {
  terms.forEach((term, index) => {
    it(`type in input - test ${index + 1} with term "${term}"`, () => {
      cy.testBegin();
      cy.get('input').type(term).click();
      cy.get('.search_dropdown a:first').click();
      faker.locale = 'nl'; // Zet de locale van faker op 'nl' voor Nederlandse gegevens 
      const dutchZipCode = `${faker.datatype.number({ min: 1000, max: 9999 })}${String.fromCharCode(faker.datatype.number({ min: 65, max: 90 }))}${String.fromCharCode(faker.datatype.number({ min: 65, max: 90 }))}`;
      const dutchCity = faker.address.city(); // Genereert een Nederlandse plaatsnaam

      // TEST 2
      cy.get('input').eq(0).type(dutchZipCode); // Nederlands random postcode
      cy.get('input[type="text"]').eq(1).type(dutchCity); // Typ de gegenereerde plaatsnaam in het inputveld

      cy.goForward();

      // Test 3 - Stap 2
        cy.get(`[data-testid="date-card-0"]`).click();
        cy.goForward();
        cy.get('textarea').eq(0).type('dajnbdlknsklvbsdls').should('not.have.value', '');
        cy.goForward();
        cy.get('.register-link > a').click();
        cy.wait(2000);
        cy.get('input[type="email"]').eq(0).type('abdelrahmanfox22@yahoo.com').should('not.have.value', '');
        cy.get('input[type="password"]').eq(0).type('0123456789').should('not.have.value', '');
        cy.get(`.Button-login`).click();
        cy.wait(6000);
        cy.get('[class="form-btn back"]').click();
        cy.goForward();
        cy.wait(4000);


    });
  });
});
