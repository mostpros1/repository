describe('Testing "Register as specialist"', () => {
    it('test 1', () => {

        cy.janTestBegin()

        cy.get('input').eq(0).type('Loodgieter')
        cy.get('input').eq(1).type('test@test.com')
        cy.get('input').eq(2).type('2020EB')
        cy.get('input').eq(3).type('Amsterdam')
        cy.goForward()


        for (let k = 0; k < 3; k++) {
            cy.goForward()
        }

        // go back
        for (let l = 0; l < 3; l++) {
            cy.get('[class="form-btn back"]').click()
        }
    })

    it('test 2-3', () => {

        cy.janTestBegin()

        cy.get('input').eq(0).type('Loodgieter')
        cy.get('input').eq(1).type('test@test.com')
        cy.get('input').eq(2).type('2020EB')
        cy.get('input').eq(3).type('Amsterdam')
        cy.goForward()

        for (let i = 0; i < 6; i++) {
            cy.get('input[type="radio"]').eq(i).click()
            cy.goForward()
            cy.get('[class="form-btn back"]').click()
        }

        // cy.goForward()

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