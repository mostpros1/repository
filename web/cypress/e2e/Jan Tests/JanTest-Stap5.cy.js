describe('Testing "Register as specialist"', () => {
    it('type in input', () => {

        cy.testAgain();

        // Helper function for input checks
        function performInputCheck(value1, value2) {
            cy.get('input[type="text"]').eq(0).type(value1);
            cy.get('input[type="text"]').eq(1).type(value2);
            cy.goForward();
            cy.testAgain();
        }

        // Check 1
        performInputCheck('Mostpros', '9305 6589');

        // Check 2
        performInputCheck('dsnajdnuws^&%*', 'JDNASJD7^%&*');

        // Check 3
        performInputCheck('KOÇTAŞ', 'sadvdsfadsss');

        // Check 4
        performInputCheck('123543546', '&/%/()(&%+');

        // Check 5
        cy.goForward();


    })
})