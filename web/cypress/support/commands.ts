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
        lisaTestBegin(): void;
        testAgain(): void;
        goBack(): void;
        goForward(): void;
        janTestBegin(): void;
        testBegin(): void
        clear(): void;
        testreg(): void;
        nextreg(): void;
        testinlog(): void;
        nextinlog(): void;
        inlogmenu():void;
        uitloggen():void;
        performInputCheck2(value1, value2):void;
        performInputChecktestreg(value1, value2,value3,value4,value5,value6):void;
        testAgain_new():void;
        testlisaAgain():void;
        signupbutton():void;
        
    }
}

Cypress.Commands.add('setDesktopViewport', () => {
    cy.viewport(1250, 695);
});

Cypress.Commands.add('testBegin', () => {
    cy.setDesktopViewport();
    cy.visit("http://localhost:5173/")
})

Cypress.Commands.add('lisaTestBegin', () => {
    cy.setDesktopViewport();
    cy.visit("http://localhost:5173/")
    cy.get('input').type('Loodgieter').click()
    cy.get('.search_dropdown a:first').click()
});

Cypress.Commands.add('janTestBegin', () => {
    cy.setDesktopViewport();
    cy.visit("http://localhost:5173/") // Go to website
    cy.get('.nav-blue-btn a.black-items').click() // Click on "Register as specialist" button
});

Cypress.Commands.add('testAgain', () => {
    cy.setDesktopViewport();
    cy.visit("http://localhost:5173/");
    cy.get('.nav-blue-btn > .black-items').click();
    cy.get('input').eq(0).type('Loodgieter')
    cy.get('textarea').eq(0).type('test bio abdel klussen')
    cy.get('input').eq(1).type('test@test.com')
    cy.get('input').eq(2).type('2020EB')
    cy.get('input').eq(3).type('Amsterdam')
    for (let r = 0; r < 4; r++) {
        cy.goForward();
    }
});

Cypress.Commands.add('testlisaAgain', () => {
    cy.setDesktopViewport();
    cy.visit("http://localhost:5173/");
    cy.get('.nav-blue-btn > .black-items').click();
    cy.get('input').eq(0).type('Loodgieter')
    cy.get('input').eq(2).type('2020EB')
    cy.get('input').eq(3).type('Amsterdam')
    cy.get('textarea').eq(0).type('test bio abdel klussen')
    for (let r = 0; r < 4; r++) {
        cy.goForward();
    }
});

// Cypress.Commands.add('testAgain_new', () => {
//     import faker from 'faker';
//     cy.janTestBegin();
//     faker.locale = 'nl';
//     const dutchZipCode = `${faker.datatype.number({ min: 1000, max: 9999 })}${String.fromCharCode(faker.datatype.number({ min: 65, max: 90 }))}${String.fromCharCode(faker.datatype.number({ min: 65, max: 90 }))}`;
//     const dutchCity = faker.address.city();
  
//     cy.get('input').eq(0).type('Loodgieter');
//     cy.get('textarea').eq(0).type(faker.lorem.sentence());
//     cy.get('input[type="email"]').eq(0).type(faker.internet.email());
//     cy.get('input[type="postcode"]').eq(0).type(dutchZipCode);
//     cy.get('input[type="text"]').eq(1).type(dutchCity);
  
//     for (let r = 0; r < 4; r++) {
//       cy.goForward();
//     }
//   });
  


Cypress.Commands.add('goBack', () => {
    cy.get('[class="form-btn back"]').click();

    cy.get('input').each(($input) => {
        cy.wrap($input).clear();
    });
});

Cypress.Commands.add('goForward', () => {
    cy.get('[class="form-btn"]').click();
});

//
Cypress.Commands.add('testreg', () => {
    cy.setDesktopViewport();
    cy.visit("http://localhost:5173/registreer") // Go to website 
});
Cypress.Commands.add('nextreg', () => {
    cy.get('[class="registerForm_wrapper"]').click();
    //cy.get('#308AE4').click();
});
//
Cypress.Commands.add('testinlog', () => {
    cy.setDesktopViewport();
    cy.visit("http://localhost:5173/login") // Go to website 
});

Cypress.Commands.add('nextinlog', () => {
    cy.get('[class="Button-login"]').click();
    //cy.get('#308AE4').click();
});
Cypress.Commands.add('inlogmenu', () => {
    cy.get('[class="dropdown-container"]').click();
    //cy.get('#308AE4').click();
});
Cypress.Commands.add('uitloggen', () => {
    cy.get('[class="logoutButton"]').click();
    //cy.get('#308AE4').click();
});

Cypress.Commands.add('performInputCheck2', (value1, value2) => {
    cy.get('input[type="email"]').eq(0).type(value1);
    cy.get('input[type="password"]').type(value2);
    cy.nextinlog();
        

    cy.wait(2000);

    cy.inlogmenu();

    cy.uitloggen();

    cy.testinlog();
});

Cypress.Commands.add('performInputChecktestreg', (value1, value2,value3,value4,value5,value6) => {
    cy.get('input[type="text"]').eq(0).type(value1).should('not.have.value', '');
    cy.get('input[type="text"]').eq(1).type(value2).should('not.have.value', '');
    cy.get('input[type="email"]').clear();
    cy.get('input[type="email"]').type(value3).should('not.have.value', '');
    cy.get('input[type="tel"]').type(value4).should('not.have.value', '');
    cy.get('input[type="password"]').eq(0).type(value5).should('not.have.value', '');
    cy.get('input[type="password"]').eq(1).type(value6).should('not.have.value', '');

    cy.get('input[type="email"]').invoke('val').then(emailValue => {
        expect(emailValue).to.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format.');
    });
    cy.get('input[type="tel"]').invoke('val').then(phoneValue => {
        expect(phoneValue).to.match(/^\+31/, 'Phone number must start with +31.');
    });

    cy.nextreg();
    cy.testreg();
})


Cypress.Commands.add('signupbutton', () => {
    cy.get('[class="button-sign-up"]').click();
    //cy.get('#308AE4').click();
});