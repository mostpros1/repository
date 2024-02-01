describe('Testing searchbar functionality', () => {
    it('type in input', () => {

        function lisaStap4TestStart() {
            cy.lisaTestBegin()

            cy.get('input[type="text"]').eq(0).type('2020TE')
            cy.get('input[type="text"]').eq(1).type('Amsterdam')
            cy.goForward()
            cy.goForward()
            cy.goForward()
        }

        lisaStap4TestStart()

        // STAP 4

        // check 1
        cy.get('input[type="text"]').eq(0).type('Test')
        cy.get('input[type="text"]').eq(1).type('Test')
        cy.get('input[type="email"]').eq(0).type('test@test.nl')
        cy.get('input[type="tel"]').eq(0).type('+3109876323')
        cy.get('input[type="password"]').eq(0).type('qwertyasdfg')
        cy.get('input[type="password"]').eq(1).type('qwertyasdfg')
        cy.goForward()

        lisaStap4TestStart()

        // check 2
        cy.goForward()

        // check 3-4-5-6
        cy.get('input[type="text"]').eq(0).type('%&&^5İÜÇ')
        cy.get('input[type="text"]').eq(1).type('%&(%^+İŞÇÖ')
        cy.get('input[type="email"]').eq(0).type('%&$Y^@ğÜŞÇ:.^+%^+^')
        cy.get('input[type="tel"]').eq(0).type('+/&/&%&ĞÜİŞÇÇiüi%+')
        cy.get('input[type="password"]').eq(0).type('+%&/()=/&%+')
        cy.get('input[type="password"]').eq(1).type('^^+%&/()/&%+')
        cy.goForward()

        cy.get('input').each(($input) => {
            cy.wrap($input).clear();
        });

        // check 7
        cy.get('input[type="text"]').eq(0).type('Test')
        cy.get('input[type="text"]').eq(1).type('Test')
        cy.get('input[type="email"]').eq(0).type('test@test.nl')
        cy.get('input[type="tel"]').eq(0).type('+3109876323')
        cy.get('input[type="password"]').eq(0).type('qwertyasdfg')
        cy.get('input[type="password"]').eq(1).type('qwertyasdfgasdfg')
        cy.goForward()

        cy.get('input').each(($input) => {
            cy.wrap($input).clear();
        });

        // check 8
        cy.get('input[type="text"]').eq(0).type('Test')
        cy.get('input[type="text"]').eq(1).type('Test')
        cy.get('input[type="email"]').eq(0).type('test@test.nl')
        cy.get('input[type="tel"]').eq(0).type('+3109876323')
        cy.get('input[type="password"]').eq(0).type('1234')
        cy.get('input[type="password"]').eq(1).type('1234')
        cy.goForward()

    })
})