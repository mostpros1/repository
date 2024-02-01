describe('Testing "Register as specialist"' , () => {
    it('type in input', () => {

        cy.janTestBegin()

        // STAP 1

        // check 1
        cy.get('input[type="text"]').eq(0).type('Loodgieter')
        cy.get('input[type="text"]').eq(1).type('test@test.com')
        cy.get('input[type="text"]').eq(2).type('2020EB')
        cy.get('input[type="text"]').eq(3).type('Amsterdam')
        cy.goForward()

        cy.goBack()

        // check 2
        cy.get('input[type="text"]').eq(0).type('dsamkdmsk')
        cy.get('input[type="text"]').eq(1).type('dsadasmdk')
        cy.get('input[type="text"]').eq(2).type('Amsterdam')
        cy.get('input[type="text"]').eq(3).type('2020EB')
        cy.goForward()

        cy.goBack()

        // check 3
        cy.get('input[type="text"]').eq(0).type('#&Y$ĞÜİŞÇ')
        cy.get('input[type="text"]').eq(1).type('/+/%%&ĞÜŞ2@(%&/.Ğğüş')
        cy.get('input[type="text"]').eq(2).type('32423532532ğüşçşö')
        cy.get('input[type="text"]').eq(3).type('asdwsadffğĞÜŞ')
        cy.goForward()

        cy.goBack()

        // check 4
        cy.get('input[type="text"]').eq(0).type('21353424') // **
        cy.get('input[type="text"]').eq(1).type('test@test.com')
        cy.get('input[type="text"]').eq(2).type('*^%%ĞÜŞÇÖiş') // **
        cy.get('input[type="text"]').eq(3).type('/&(&%ÜĞŞLçöi') // **
        cy.goForward()

        cy.goBack()

        // check 5 (location check)
        cy.get('input[type="text"]').eq(0).type('Loodgieter')
        cy.get('input[type="text"]').eq(1).type('test@test.com')
        cy.get('input[type="text"]').eq(2) // **
        cy.get('input[type="text"]').eq(3) // **
        cy.goForward()

        cy.goBack()

        // check 6 (location check)
        cy.get('input[type="text"]').eq(0).type('Loodgieter')
        cy.get('input[type="text"]').eq(1).type('test@test.com')
        cy.get('input[type="text"]').eq(2).type('20233AB') // **
        cy.get('input[type="text"]').eq(3).type('Istanbul') // **
        cy.goForward() 

        cy.goBack()

        // empty check
        cy.get('input[type="text"]').eq(0)
        cy.get('input[type="text"]').eq(1)
        cy.get('input[type="text"]').eq(2)
        cy.get('input[type="text"]').eq(3)
        cy.goForward() 

    })
})