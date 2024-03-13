// describe('Testing "Register as specialist"', () => {
//     it('type in input', () => {
//         cy.testAgain();
//         // Helper function for input checks
//         function performInputCheck(value1, value2, value3,value4,value5,value6) {
//             cy.get('input[type="text"]').eq(0).type(value1);
//             cy.get('input[type="text"]').eq(1).type(value2);
//             cy.get('input[type="email"]').clear();
//             cy.get('input[type="email"]').type(value3);
//             cy.get('input[type="tel"]').type(value4);
//             cy.get('input[type="password"]').eq(0).type(value5);
//             cy.get('input[type="password"]').eq(1).type(value6);
//             cy.goForward();
//             cy.testAgain();
//         }
//         // Check 1
//         performInputCheck('JanTest', 'Mostpros','test@test.com','+31688864797','22554477','22554477' );
//         // Check 2
//         performInputCheck('hfghnljnglhn', 'dfgdfgbkjdfb','dhshgoihgodfhg','fsgsdfgsd','22554477Ds','22554477Ds' );
//         // Check 3
//         performInputCheck('KOÇTAŞ', 'ÉÉÉÔÔÔ$$$&&#*','dlfngldfngl12@test.com','465456446^&%*','22554477Ds&!!','22554477Ds&!!');
//         // Check 4
//         performInputCheck('3216516165', '126+541651',' ',' ',' ',' ' );
//         // Check 5
//         performInputCheck(' ', ' ',' ',' ',' ',' ' );
        
//         cy.goForward();
//     })
// })









// import faker from 'faker';

// describe('Testing "Register as specialist"', () => {
//     let password= faker.internet.password()
//   it('type in input', () => {
//     cy.testAgain();
// function performInputCheck(value1, value2, value3,value4,value5,value6) {
// cy.get('input[type="text"]').eq(0).type(value1).type(faker.name.firstName());
// cy.get('input[type="text"]').eq(1).type(value2).type(faker.name.lastName());
// cy.get('input[type="email"]').clear();
// cy.get('input[type="email"]').type(value3).type(faker.internet.email());
// cy.get('input[type="tel"]').type(value4).type(faker.phone.phoneNumber());
// cy.get('input[type="password"]').eq(0).type(value5).type('Cypress123!!');
// cy.get('input[type="password"]').eq(1).type(value6).type('Cypress123!!');

//     // // Helper function for input checks
//     // function performInputCheck() {
//     // cy.get('input[type="text"]') // Selecteer het juiste inputveld
//     // .type(faker.name.firstName());
//     // cy.get('input[type="text"][required][name="Achternaam"]') // Selecteer het juiste inputveld
//     // .type(faker.name.lastName());
//     // cy.get('input[type="email"]').clear();
//     // cy.get('input[type="email"][required][name="Email"]') // Selecteer het juiste inputveld
//     // .type(faker.internet.email());
//     // cy.get('input[type="tel"][required][name="Telefoonnummer"]') // Selecteer het juiste inputveld
//     // .type(faker.phone.phoneNumber());
//     // cy.get('input[type="password"][required][name="Wachtwoord"]') // Selecteer het juiste inputveld
//     // .type(faker.internet.password());
//     // cy.get('input[type="password"][required][name="Herhaal wachtwoord"]') // Selecteer het juiste inputveld
//     // .type(faker.internet.password());


//         // cy.get('#input-firstName').type(faker.name.firstName());
//         // cy.get('#input-Achternaam').type(faker.name.lastName());
//         // cy.get('#input-Email').clear().type(faker.internet.email());
//         // cy.get('#input-Telefoonnummer').type(faker.phone.phoneNumber());
//         // cy.get('#input-Wachtwoord').type(faker.internet.password());
//         // cy.get('#input-Herhaal wachtwoord').type(faker.internet.password());
        
//         cy.goForward();
//         cy.testAgain();
//     }

//     // Perform input check with random values
//     performInputCheck();
    
//     cy.goForward();
//   })
// })

import faker from 'faker';

describe('Testing "Register as specialist"', () => {
    let password = faker.internet.password(); // Maak een wachtwoord dat voor beide wachtwoordvelden zal worden gebruikt
    it('type in input', () => {
        cy.testAgain();
        function performInputCheck() {
            cy.get('input[type="text"]').eq(0).type(faker.name.firstName());
            cy.get('input[type="text"]').eq(1).type(faker.name.lastName());
            cy.get('input[type="email"]').clear().type(faker.internet.email()); //Verwijderen van oude wachwoord en new wachtwoord van faker pakken
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
