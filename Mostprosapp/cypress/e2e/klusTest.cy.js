describe('Testing app', () => {

    beforeEach(() => {
        cy.viewport('iphone-x')
    })

    it('Nieuw Klus Aanmaken Test', () => {
        cy.homeOwnerAppTestBegin()

        cy.get('.r-backgroundColor-ktws75')
            .trigger('mousedown', { which: 1, pageX: 600, pageY: 100 })
            .trigger('mousemove', { which: 1, pageX: 200, pageY: 100 })
            .trigger('mouseup', { force: true });
        // cy.scrollTo('bottom')


        // cy.get('[data-testid="klusBtn"]').click()

        // cy.get('[data-testid="beroepBtn"]').trigger('mousedown').wait(10000).trigger('mouseup');


        // cy.get('[data-testid="klusBtn"]').click()
        // cy.get('[data-testid="beroepInput"]').click()
        // cy.get('[data-testid="optionsID"] > :nth-child(1) > :nth-child(1)').click()
        // cy.get('[data-testid="emailInput"]').click().type('test@test.com')
        // cy.get('[data-testid="nummerInput"]').type('5678', { delay: 100 });
        // cy.get('[data-testid="letterInput"]').invoke('val', 'TW').trigger('change')
        // cy.get('[data-testid="volgendeBtn"]').click()
        // cy.wait(100)

        // cy.get('[data-testid="loginEmailInput"]').click().type('test@test.com')
        // cy.get('[data-testid="loginWachtInput"]').click().type('Longpass')


        // cy.get('[data-testid="letterInput"]').click().type('TW')
    })
})