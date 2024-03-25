import faker from 'faker'

describe('Testing "Register as specialist"', () => {
    let password = faker.internet.password(); // Maak een wachtwoord dat voor beide wachtwoordvelden zal worden gebruikt
    it('type in input', () => {
        cy.testAgain();
        function performInputCheck() {
            cy.get('input[type="text"]').eq(0).type(faker.name.firstName());
            cy.get('input[type="text"]').eq(1).type(faker.name.lastName());
            cy.get('input[type="email"]').clear().type(faker.internet.email());
            cy.get('input[type="tel"]').type(faker.phone.phoneNumber());
            cy.get('input[type="password"]').eq(0).type(password);
            cy.get('input[type="password"]').eq(1).type(password);
            cy.goForward();
            cy.testAgain();
        }
        // Perform input check with random values
        performInputCheck();
        cy.goForward();
    });
});