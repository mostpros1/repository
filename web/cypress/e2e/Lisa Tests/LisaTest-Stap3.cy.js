describe('Testing searchbar functionality', () => {
    it('type in input', () => {

        function goBackAndClear() { // this is a special function, since 'textarea' is not an input field it cant be cleared with the goBack() func
            cy.get('[class="form-btn back"]').click();

            cy.get('textarea').each(($input) => {
                cy.wrap($input).clear();
            });
        }

        cy.lisaTestBegin()

        cy.get('input[type="text"]').eq(0).type('2020TE')
        cy.get('input[type="text"]').eq(1).type('Amsterdam')
        cy.goForward()
        cy.goForward()

        // STAP 3

        // check 1
        cy.get('[class="text-field"]').type('Ik heb een probleem.')
        cy.goForward()

        goBackAndClear()

        // check 2
        cy.get('[class="text-field"]').type('ŞÖĞİÜ(%/+^^+İŞÖ')
        cy.goForward()

        goBackAndClear()

        // check 3
        cy.get('[class="text-field"]')
        cy.goForward()

    })
})