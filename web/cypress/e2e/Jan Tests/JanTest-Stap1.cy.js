// describe('Testing "Register as specialist"', () => {
//     it('type in input', () => {

//         const testDataStap1 = [
//             ['Loodgieter', 'test@test.com', '2020EB', 'Amsterdam'],
//             ['dsamkdmsk', 'dsadasmdk', 'Amsterdam', '2020EB'],
//             ['#&Y$ĞÜİŞÇ', '/+/%%&ĞÜŞ2@(%&/.Ğğüş', '32423532532ğüşçşö', 'asdwsadffğĞÜŞ'],
//             ['21353424', 'test@test.com', '*^%%ĞÜŞÇÖiş', '/&(&%ÜĞŞLçöi'],
//             ['Loodgieter', 'test@test.com', '', ''],
//             ['Loodgieter', 'test@tesgfcvt.com', '20233AB', 'Istanbul'],
//             ['', '', '', '']
//         ];

        // cy.janTestBegin()// Deze is de oude stap 1 versie 0.1

        import faker from 'faker';
        describe('Testing "Register as specialist"' , () => {
        it('type in input', () => {

        cy.janTestBegin()
        faker.locale = 'nl'; // Zet de locale van faker op 'nl' voor Nederlandse gegevens 
        const dutchZipCode = `${faker.datatype.number({ min: 1000, max: 9999 })}${String.fromCharCode(faker.datatype.number({ min: 65, max: 90 }))}${String.fromCharCode(faker.datatype.number({ min: 65, max: 90 }))}`;
        const dutchCity = faker.address.city(); // Genereert een Nederlandse plaatsnaam

        // TEST 2
         cy.get('input').eq(0).type('Loodgieter')
         cy.get('input[type="email"]').type(faker.internet.email());
         cy.get('input[type="postcode"]').eq(0).type(dutchZipCode);// Nederlands rendom postcode
         //cy.get('input[type="postcode"]').eq(0).type(`${Math.floor(1000 + Math.random() * 9000)}${String.fromCharCode(Math.floor(Math.random() * 26) + 65)}${String.fromCharCode(Math.floor(Math.random() * 26) + 65)}`);//werld postcode
         // Typ de gegenereerde postcode in het inputveld
         cy.get('input[type="text"]').eq(1).type(dutchCity); // Typ de gegenereerde plaatsnaam in het inputveld



        cy.goForward()

        const performChecksStap1 = (data) => {
            for (let i = 0; i < data.length; i++) {

                for (let j = 0; j < data[i].length; j++) {
                    if (data[i][j] !== '') {
                        cy.get('input').eq(j).should('exist').type(data[i][j]);
                    }
                }

                cy.goForward();
                cy.goBack();
            }
        };

        // Perform the checks with testData
        performChecksStap1(testDataStap1);

        // Empty check
        cy.goForward();

    })
})