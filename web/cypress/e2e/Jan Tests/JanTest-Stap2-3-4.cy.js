import faker from 'faker';
describe('Testing "Register as specialist"' , () => {
    it('type in input', () => {

        cy.janTestBegin()
        faker.locale = 'nl'; // Zet de locale van faker op 'nl' voor Nederlandse gegevens 
        const dutchZipCode = `${faker.datatype.number({ min: 1000, max: 9999 })}${String.fromCharCode(faker.datatype.number({ min: 65, max: 90 }))}${String.fromCharCode(faker.datatype.number({ min: 65, max: 90 }))}`;
        const dutchCity = faker.address.city(); // Genereert een Nederlandse plaatsnaam
        // cy.get('input').eq(0).type('Loodgieter')
        // cy.get('input').eq(1).type('test@test.com')
        // cy.get('input').eq(2).type('2020EB')
        // cy.get('input').eq(3).type('Amsterdam')
        // TEST 2
         cy.get('input').eq(0).type('Loodgieter')
         cy.get('input[type="email"]').type(faker.internet.email());
         cy.get('input[type="postcode"]').eq(0).type(dutchZipCode);// Nederlands rendom postcode
         //cy.get('input[type="postcode"]').eq(0).type(`${Math.floor(1000 + Math.random() * 9000)}${String.fromCharCode(Math.floor(Math.random() * 26) + 65)}${String.fromCharCode(Math.floor(Math.random() * 26) + 65)}`);//werld postcode
         // Typ de gegenereerde postcode in het inputveld
         cy.get('input[type="text"]').eq(1).type(dutchCity); // Typ de gegenereerde plaatsnaam in het inputveld



        cy.goForward()

        // STAP 2-3-4
        
        // check 1
        for (let k = 0; k < 3; k++) {
            cy.goForward()
        }

        for (let l = 0; l < 3; l++) {
            cy.get('[class="form-btn back"]').click()
        }
        

        // check 2-3
        for (let i = 0; i < 6; i++) {
            cy.get('input[type="radio"]').eq(i).click()
            cy.goForward()
            cy.get('[class="form-btn back"]').click()
        }

        cy.goForward()

        for (let g = 0; g < 2; g++) {
            for (let z = 0; z < 5; z++) {
                cy.get('input[type="radio"]').eq(z).click()
                cy.goForward()
                cy.get('[class="form-btn back"]').click()
            }
            cy.goForward()
        }

    })
})