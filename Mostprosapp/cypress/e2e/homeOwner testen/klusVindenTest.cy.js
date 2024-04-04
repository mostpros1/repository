describe('Home Owner Test: Klus Vinden Test', () => {

    beforeEach(() => {
        cy.viewport('iphone-x')
        cy.homeOwnerAppTestBegin()
        cy.get('[data-testid="klusBtn"]').click()
    })

    context('Beroep', () => {

        it('Test 1: Opklik en krijg lijst test', () => {
            cy.get('[data-testid="beroepInput"]').click()

            cy.get('[data-testid="beroepInput"]').then($input => {
                // Dispatch a focus event to simulate focusing on the input field
                $input[0].dispatchEvent(new FocusEvent('focus'));

                // Dispatch a keypress event to simulate typing a character
                $input[0].dispatchEvent(new KeyboardEvent('keypress', { key: 'a' }));
            });
        })

        // it('Test 2: Ga door zonder een keuze', () => {

        // })

        // it('Search test 3: Random letters intypen', () => {

        // })

        // it('Search test 4: Random nummers intypen', () => {

        // })

        // it('Search test 5: Probeer elke keuze', () => {

        // })

    })

})