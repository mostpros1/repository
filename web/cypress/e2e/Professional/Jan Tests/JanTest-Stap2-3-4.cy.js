import faker from 'faker';
describe('Testing "Register as specialist"' , () => {
    for (let i = 1; i < 5; i++) 
   //Stap 1
   it(`type in input - test ${i}`, () => {

        cy.janTestBegin()
        faker.locale = 'nl'; // Zet de locale van faker op 'nl' voor Nederlandse gegevens 
        const dutchZipCode = `${faker.datatype.number({ min: 1000, max: 9999 })}${String.fromCharCode(faker.datatype.number({ min: 65, max: 90 }))}${String.fromCharCode(faker.datatype.number({ min: 65, max: 90 }))}`;
        const dutchCity = faker.address.city(); // Genereert een Nederlandse plaatsnaam

        // TEST 2
         cy.get('input').eq(0).type('Loodgieter')// "loodgieter" wordt in het eerste veld ingevuld.
         cy.get('textarea').eq(0).type(faker.lorem.sentence());  //Rendom zinnen wordt in 2de veld (bio) ingevuld
         cy.get('input[type="email"]').eq(0).type(faker.internet.email());//Rendom postcode wordt in 4de veld ingevuld
         cy.get('input[type="postcode"]').eq(0).type(dutchZipCode);// Nederlands rendom postcode
         //cy.get('input[type="postcode"]').eq(0).type(`${Math.floor(1000 + Math.random() * 9000)}${String.fromCharCode(Math.floor(Math.random() * 26) + 65)}${String.fromCharCode(Math.floor(Math.random() * 26) + 65)}`);//werld postcode
         // Typ de gegenereerde postcode in het inputveld
         cy.get('input[type="text"]').eq(1).type(dutchCity); // Typ de gegenereerde plaatsnaam in het inputveld

         cy.goForward();

        // STAP 2-3-4
        
        // Check 1 H: Navigate forward three pages.
        for (let k = 0; k < 3; k++) {
            cy.goForward()
        }
        // Then navigate back three pages using the back button in the form.
        for (let l = 0; l < 3; l++) {
            cy.get('[class="form-btn back"]').click()
        }
        

        // Check 2-3: Iterate through the first six radio inputs, 
        // clicking each one and navigating forward and then back to test navigation functionality.

        for (let i = 0; i < 6; i++) {
            cy.get('input[type="radio"]').eq(i).click()
            cy.goForward()
            cy.get('[class="form-btn back"]').click()
        }
        // Proceed to the next page in the form.
        cy.goForward()

        // Double iteration to test clicking on the first five radio buttons, navigating forward,
        // and then back, repeated for two cycles. This likely checks the persistence of selected options across navigation.

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