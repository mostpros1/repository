describe('Testing "Register as specialist"' , () => {
    it('type in input', () => {

        cy.janTestBegin()

        cy.get('input[type="text"]').eq(0).type('Loodgieter')
        cy.get('input[type="text"]').eq(1).type('test@test.com')
        cy.get('input[type="text"]').eq(2).type('2020EB')
        cy.get('input[type="text"]').eq(3).type('Amsterdam')
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