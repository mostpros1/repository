/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

// cypress/support/commands.ts

declare namespace Cypress {
    interface Chainable {
        setDesktopViewport(): void;
        testBegin(): void;
        testAgain(): void;
        goBack(): void;
        goForward(): void;
    }
}

Cypress.Commands.add('setDesktopViewport', () => {
    cy.viewport(1250, 695);
});

Cypress.Commands.add('testBegin', () => {
    cy.setDesktopViewport();
    cy.visit("https://main.d2j290dx5bs7ht.amplifyapp.com/");
    cy.get('.nav-blue-btn a.black-items').click();
});

Cypress.Commands.add('testAgain', () => {
    cy.setDesktopViewport();
    cy.visit("https://main.d2j290dx5bs7ht.amplifyapp.com/");
    cy.get('.nav-blue-btn > .black-items').click();

    for (let r = 0; r < 4; r++) {
        cy.goForward();
    }
});

Cypress.Commands.add('goBack', () => {
    cy.get('[class="form-btn back"]').click();

    cy.get('input').each(($input) => {
        cy.wrap($input).clear();
    });
});

Cypress.Commands.add('goForward', () => {
    cy.get('[class="form-btn"]').click();
});
