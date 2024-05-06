import faker from 'faker';
//Stap 1 - Test 1
// context('Kalender page bezoeken', () => {
//   for (let i = 1; i < 2; i++) {
//     it(`Type in input - test ${i}`, () => {
//       // TEST 1: Type in input
//       cy.testinlog();
//       cy.dshscalnder('abdelrahmanfox22@yahoo.com','0123456789' );
//       cy.get('body').then(($body) => {
//         if ($body.text().includes('abdelrahmanfox22@yahoo.com')) {
//           throw new Error('Foutmelding: abdelrahmanfox22@yahoo.com moet niet bestaan');
//         } else {
//           console.log('Het proces is correct uitgevoerd.');
//         }
//       });
//       //cy.get('.sidebar-list > :nth-child(2) > .sidebar-link').click();  //Job page
//         //cy.get('.sidebar-list > :nth-child(3) > .sidebar-link').click(); //chat page
//     });
//   }
// });

//  Stap 2 Test 1

    context('Password & Security testen', () => {
        beforeEach(() => {
        // Voer de inlog- en setupacties uit voor elke test
        cy.testinlog();
        cy.dshscalnder('abdelrahmanfox22@yahoo.com','0123456789' );
        });
        it('niet beschikbaar dagen, bevestig keuzen, verwijder u beschikbaar testen', () => {
            // Define current date components
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear(); // This year
            const currentMonth = currentDate.getMonth(); // Current month (0-indexed)
            const currentDay = currentDate.getDate(); // Today's day
        
            // Check if subtracting 4 days goes into a previous month
            let testDay = currentDay - 4;
            let testMonth = currentMonth;
            let testYear = currentYear;
        
            if (testDay < 1) {
                testMonth -= 1;
                if (testMonth < 0) {
                    testMonth = 11; // December of the previous year
                    testYear -= 1;
                }
                testDay = new Date(testYear, testMonth + 1, 0).getDate() + testDay;
            }
        
            // Create pastDate using corrected year, month, and day
            const pastDate = new Date(testYear, testMonth, testDay);
            const pastDateFormatted = `${String(pastDate.getMonth() + 1).padStart(2, '0')}/${String(pastDate.getDate()).padStart(2, '0')}/${pastDate.getFullYear()}`;
        
            // Interact with past date in the calendar
            cy.get(`[aria-label="Kies ${pastDateFormatted}"]`).click();
            cy.goForward(); // Ensure this command matches intended navigation or actions
        
            // Test visibility of elements post-navigation
            cy.get('[class="form-btn"]').should('not.be.visible');
        
            // Define today's date for further tests if necessary
            const todayDate = new Date(currentYear, currentMonth, currentDay);
            const todayDateFormatted = `${String(todayDate.getMonth() + 1).padStart(2, '0')}/${String(todayDate.getDate()).padStart(2, '0')}/${todayDate.getFullYear()}`;
            cy.get(`[aria-label="Kies ${todayDateFormatted}"]`);
        });
    });