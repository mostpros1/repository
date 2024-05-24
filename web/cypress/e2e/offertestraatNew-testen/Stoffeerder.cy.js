import faker from 'faker';

const terms = [
    'Tapijt Leggen',
    'Vinyl/Linoleum/PVC Vloeren Installeren',
    'Trapbekleding Aanbrengen',
    'Bestaande Vloerbedekking Herstellen/Renoveren',
    'Ondervloeren Plaatsen/Vloeren Egaliseren',
    'Laminaat/Parketvloeren Installeren',
    'Meubels/Interieuronderdelen Bekleden',
    'Gordijnen/Vitrages/Raambekleding Plaatsen',
    'Materialen/Kleurcombinaties Advies',
    'Kamerbreed Tapijt Spannen/Plaatsen',
    'Diverse Technieken (Binden, Naaien, Lijmen)',
    'Wandbekleding (Textiel, Kunstleder) Aanbrengen',
    'Stoffering Onderhoud/Reiniging Advies',
    'Ruimtes/Ramen Opmeten',
    'Samenwerking Interieurontwerpers/Architecten',
    'Kleine Reparaties (Naaiwerk/Beschadigingen)',
    'Zonwering (Rolgordijnen, Jaloezieën) Plaatsen',
    'Kunstwerken/Textiele Panelen Opspannen',
    'Brandvertragende Behandelingen Stoffering',
    'Akoestische Panelen/Wandbekleding Aanbrengen'
  ];

describe('Testing "Stoffeerder"', () => {
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
