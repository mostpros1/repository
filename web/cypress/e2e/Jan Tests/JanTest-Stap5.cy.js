describe('Testing "Register as specialist"' , () => {
    it('type in input', () => {

        cy.janTestBegin()

        cy.get('input[type="text"]').eq(0).type('Loodgieter')
        cy.get('input[type="text"]').eq(1).type('test@test.com')
        cy.get('input[type="text"]').eq(2).type('2020EB')
        cy.get('input[type="text"]').eq(3).type('Amsterdam')
        
        for (let i = 0; i < 3; i++) {
            cy.goForward()
        }
        
        cy.goForward()
        

        // check 1
        cy.get('input[type="text"]').eq(0).type('Mostpros')
        cy.get('input[type="text"]').eq(1).type('9305 6589')
        cy.goForward()

        cy.testAgain()

        // check 2
        cy.get('input[type="text"]').eq(0).type('dsnajdnuws^&%*')
        cy.get('input[type="text"]').eq(1).type('JDNASJD7^%&*')
        cy.goForward()

        cy.testAgain()

        // check 3
        cy.get('input[type="text"]').eq(0).type('KOÇTAŞ')
        cy.get('input[type="text"]').eq(1).type('sadvdsfadsss')
        cy.goForward()

        cy.testAgain()

        // check 4
        cy.get('input[type="text"]').eq(0).type('123543546')
        cy.get('input[type="text"]').eq(1).type('&/%/()(&%+')
        cy.goForward()

        cy.testAgain()

        // check 5
        cy.goForward()
        
    })
})