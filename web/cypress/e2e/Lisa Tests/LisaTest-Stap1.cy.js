describe('Testing searchbar functionality', () => {

    function performLocationCheck(value1, value2, skipButtonClick) {

        cy.get('input[type="text"]').eq(0).type(value1);
        cy.get('input[type="text"]').eq(1).type(value2);
        // cy.screenshot();
        cy.goForward();

        if (!skipButtonClick) {
            try {
                cy.get('[class="form-btn back"]').click();
            } catch (error) {
                console.error('Caught an exception, skipping the command:', error.message);

                cy.log('Skipping the failing command and continuing the test.');
            }
        }

        cy.get('input').each(($input) => {
            cy.wrap($input).clear();
        });
    }

    it('test 1', () => {
        cy.lisaTestBegin();

        performLocationCheck('2020TE', 'Amsterdam', false);

    })

    it('test 2', () => {
        cy.lisaTestBegin();

        performLocationCheck('Amsterdam', '202TE', true);

    })

    it('test 3', () => {
        cy.lisaTestBegin();

        performLocationCheck('2131dasdsa23', '123dsasdw', true);
    })

    it('test 4', () => {
        cy.lisaTestBegin();

        performLocationCheck('ÖÇŞİÜ%&(/)', 'ÇSIŞŞĞÜÜ=)/&', true);
    })

    it('test 5.1', () => {
        cy.lisaTestBegin();

        cy.get('input[type="text"]').eq(0).goForward();
    })

    it('test 5.2', () => {
        cy.lisaTestBegin();

        cy.get('input[type="text"]').eq(1).goForward();
    })
})