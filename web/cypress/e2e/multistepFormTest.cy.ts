describe('Multi-step Form', () => {
  it('completes the form', () => {
    cy.visit('http://localhost:5173/pro-onboarding');
    
    // Step 1: SearchChoreForm
    cy.get('input[placeholder="example@example.com"]').type('test@example.com');
    cy.get('input[placeholder="1234AB"]').type('1920WA'); 
    cy.get('input[placeholder="Plaatsnaam"]').type('Amsterdam'); 
    cy.get('button').contains('Volgende').click();
    // Step 2: TestQ
    
    cy.get('label').contains('Amsterdam').click();
    cy.get('button').contains('Volgende').click();

    // Step 3: DateForm
    cy.get('div').contains('25').click();
    cy.get('button').contains('Volgende').click();

    // // Step 4: AccountForm
    cy.get('input[placeholder="Voornaam"]').type('Cypress');
    cy.get('input[placeholder="Achternaam"]').type('TestAccount');
    cy.get('input[value="+31"]').type('11111111');
    cy.get('input[placeholder="Wachtwoord (min. 8 tekens)"]').type('12345678');
    cy.get('input[placeholder="Herhaal wachtwoord').type('12345678');
    cy.get('button').contains('Volgende').click();

    cy.get('input[placeholder="Bedrijfsnaam"]').type('Cypress');
    cy.get('input[placeholder="Uw KvK nummer"]').type('12345678');
    cy.get('button').contains('Verstuur').click();

  });
});
