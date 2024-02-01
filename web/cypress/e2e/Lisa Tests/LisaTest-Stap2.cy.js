describe('Testing searchbar functionality', () => {
    it('type in input', () => {

        cy.lisaTestBegin()

        cy.get('input[type="text"]').eq(0).type('2020TE')
        cy.get('input[type="text"]').eq(1).type('Amsterdam')
        cy.goForward()

        // STAP 2

        // check 1
        cy.goForward()

        cy.get('[class="form-btn back"]').click()

        // check 2-3
        for (let i = 1; i < 6; i++) {
            cy.get(`.dateCards_wrapper > :nth-child(${i})`).click()
            cy.goForward()
            cy.get('[class="form-btn back"]').click()
        }

        // check 4
        cy.get('.dateCards_wrapper > :nth-child(6)').click()
        cy.get('[data-timestamp="1706482800000"]').click()
        cy.goForward()

        cy.get('[class="form-btn back"]').click()

        // check 5
        cy.get('.dateCards_wrapper > :nth-child(6)').click()
        cy.get('.MuiPickersDay-today').click()
        cy.goForward()

        cy.get('[class="form-btn back"]').click()

        // check 6
        cy.get('.dateCards_wrapper > :nth-child(6)').click()
        cy.get('[data-timestamp="1708988400000"]').click()
        cy.goForward()

    })
})