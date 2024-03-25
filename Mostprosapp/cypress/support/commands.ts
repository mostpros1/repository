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

declare namespace Cypress {
    interface Chainable {
        setAppViewport(): void;
        homeProAppTestBegin(): void;
        homeOwnerAppTestBegin(): void;
    }
}

Cypress.Commands.add('setAppViewport', () => {
    cy.viewport('iphone-x')
});

Cypress.Commands.add('homeProAppTestBegin', () => {
    cy.visit('http://localhost:19006/')


    cy.get(':nth-child(3) > .css-view-175oi2r').click()
    cy.get('[data-testid="homePofessionalBtn"]').click()

    for (let i = 1; i < 4; i++) {
        cy.get(`[data-testid="volgendeBtn${i}"]`).click()
        cy.wait(100);
    }
})

Cypress.Commands.add('homeOwnerAppTestBegin', () => {
    cy.visit('http://localhost:19006/')


    cy.get(':nth-child(3) > .css-view-175oi2r').click()
    cy.get('[data-testid="homeOwnerBtn"]').click()

    for (let i = 1; i < 4; i++) {
        cy.get(`[data-testid="volgendeBtn${i}"]`).click()
        cy.wait(100);
    }
})