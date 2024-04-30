import faker from 'faker';
// Stap 1
describe('Testing "Register as specialist"', () => {
  for (let i = 1; i < 6; i++) {
    it(`type in input - test ${i}`, () => {
      cy.lisaTestBegin();
      faker.locale = 'nl';
      const dutchZipCode = `${faker.datatype.number({ min: 1000, max: 9999 })}${String.fromCharCode(faker.datatype.number({ min: 65, max: 90 }))}${String.fromCharCode(faker.datatype.number({ min: 65, max: 90 }))}`;
      const dutchCity = faker.address.city();

      // TEST 2
      cy.get('input').eq(0).type(dutchZipCode);
      cy.get('input[type="text"]').eq(1).type(dutchCity);
      cy.goForward();

      //Test 3 -Stap2
      for (let j = 1; j < 6; j++) {
        cy.get(`.dateCards_wrapper > :nth-child(${j})`).should('be.visible').click();
        cy.get('[class="form-btn back"]').click();
        cy.goForward();
        cy.goForward();
        cy.get('textarea').eq(0).type('dajnbdlknsklvbsdls');
        cy.goForward();
        performInputCheck();
      }
    });
  }
});

const password = faker.internet.password();
function performInputCheck() {
  cy.get('input[type="text"]').eq(0).type(faker.name.firstName());
  cy.get('input[type="text"]').eq(1).type(faker.name.lastName());
  cy.get('input[type="email"]').clear().type(faker.internet.email());
  cy.get('input[type="tel"]').clear().type("+3109876323");
  cy.get('input[type="password"]').eq(0).type(password);
  cy.get('input[type="password"]').eq(1).type(password);

  // Simuleer een "pop-up" visueel
  cy.document().then((doc) => {
    const popup = doc.createElement('div');
    popup.innerHTML = "You are hacked!";
    popup.style.position = 'fixed';
    popup.style.left = '50%';
    popup.style.top = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.padding = '20px';
    popup.style.background = 'red';
    popup.style.color = 'white';
    popup.style.fontSize = '20px';
    popup.style.zIndex = '10000';
    doc.body.appendChild(popup);

    // Stop de test hier
    assert.fail('Simulated security alert: you are hacked');
  });
}
