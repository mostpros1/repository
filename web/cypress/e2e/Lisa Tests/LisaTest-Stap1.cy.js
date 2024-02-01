describe('Testing searchbar functionality', () => {
    it('type in input', () => {

        cy.lisaTestBegin()

        // STAP 1

        // Locatie check 1
        cy.get('input[type="text"]').eq(0).type('2020TE')
        cy.get('input[type="text"]').eq(1).type('Amsterdam')
        cy.goForward()

        cy.goBack()

        // Locatie check 2
        cy.get('input[type="text"]').eq(0).type('Amsterdam')
        cy.get('input[type="text"]').eq(1).type('202TE')
        cy.goForward()

        cy.goBack()

        // Locatie check 3
        cy.get('input[type="text"]').eq(0).type('2131dasdsa23')
        cy.get('input[type="text"]').eq(1).type('123dsasdw')
        cy.goForward()

        cy.goBack()

        // Locatie check 4
        cy.get('input[type="text"]').eq(0).type('ÖÇŞİÜ%&(/)')
        cy.get('input[type="text"]').eq(1).type('ÇSIŞŞĞÜÜ=)/&')
        cy.goForward()

        cy.goBack()

        // Locatie check 5.1
        cy.get('input[type="text"]').eq(0)
        cy.goForward()

        // Locatie check 5.2
        cy.get('input[type="text"]').eq(1)
        cy.goForward()

        // Locatie check 6
        cy.get('input[type="text"]').eq(0).type('12345')
        cy.get('input[type="text"]').eq(1).type('Istanbul')
        cy.goForward()

    })
})