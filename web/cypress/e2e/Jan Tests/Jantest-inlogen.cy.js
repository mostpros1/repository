describe('Testing "inlogen"', () => {
    it('type in input', () => {
        cy.testinlog();
        // Helper function for input checks
        function performInputCheck(value1, value2) {
            cy.get('input[type="email"]').eq(0).type(value1);
            cy.get('input[type="password"]').type(value2);
            cy.nextinlog();
              // Wait for 5 seconds

            cy.wait(2000);

            cy.inlogmenu();

            cy.uitloggen();

            cy.testinlog();
        }
        // Check 1
        performInputCheck('abdelrahmanfox22@yahoo.com','0123456789' );
        // Check 2
        performInputCheck('abdelrahmanfox22@yahoo.com','0123456789' );
        // Wait for 5 seconds

        cy.testinlog();
    })
})