describe('Testing "Register as specialist"', () => {
    it('type in input', () => {
        cy.testAgain();
        // Helper function for input checks
        function performInputCheck(value1, value2, value3,value4,value5,value6) {
            cy.get('input[type="text"]').eq(0).type(value1);
            cy.get('input[type="text"]').eq(1).type(value2);
            cy.get('input[type="email"]').clear();
            cy.get('input[type="email"]').type(value3);
            cy.get('input[type="tel"]').type(value4);
            cy.get('input[type="password"]').eq(0).type(value5);
            cy.get('input[type="password"]').eq(1).type(value6);
            cy.goForward();
            cy.testAgain();
        }
        // Check 1
        // Check 1
        performInputCheck('JanTest', 'Mostpros','test@test.com','+31688864797','22554477','22554477' );
        // Check 2
        performInputCheck('hfghnljnglhn', 'dfgdfgbkjdfb','dhshgoihgodfhg','fsgsdfgsd','22554477Ds','22554477Ds' );
        // Check 3
        performInputCheck('KOÇTAŞ', 'ÉÉÉÔÔÔ$$$&&#*','dlfngldfngl12@test.com','465456446^&%*','22554477Ds&!!','22554477Ds&!!');
        // Check 4
        performInputCheck('3216516165', '126+541651','','','','' );
        // Check 5
        cy.goForward();
    })
})