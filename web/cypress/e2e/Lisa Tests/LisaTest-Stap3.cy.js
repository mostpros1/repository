describe('Testing searchbar functionality', () => {
    it('type in input', () => {

        function goBackAndClear() { // this is a special function, since 'textarea' is not an input field it cant be cleared with the goBack() func
            cy.get('[class="form-btn back"]').click();

            cy.get('.text-field').each(($input) => {
                cy.wrap($input).clear();
            });
        }

        // Function to perform the checks in STAP 3
        const performChecksStap3 = (textValues) => {
            textValues.forEach((text) => {
                cy.get('.text-field').type(text);
                cy.goForward();
                goBackAndClear();
            });
        };


        cy.lisaTestBegin();
        cy.get('input[type="text"]').eq(0).type('2020TE');
        cy.get('input[type="text"]').eq(1).type('Amsterdam');
        cy.goForward();
        cy.get('.dateCards_wrapper > :nth-child(4)').click()
        cy.goForward();

        // Check 1-2
        const textValuesStap3 = [
            'Ik heb een probleem.',
            'ŞÖĞİÜ(%/+^^+İŞÖ',
            // Add more text values for additional checks
        ];

        performChecksStap3(textValuesStap3);

    })
})