im//Stap 1 - Test 1
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

//  //Stap 2 Test 1

//     context('calender oude datum met bevestiging en verwijder van beschikbaarheiden testen', () => {
//         beforeEach(() => {
//         // Voer de inlog- en setupacties uit voor elke test
//         cy.testinlog();
//         cy.dshscalnder('abdelrahmanfox22@yahoo.com','0123456789' );
//         });
//         it('niet beschikbaar dagen, bevestig keuzen, verwijder u beschikbaar testen', () => {
//             // Define current date components
//             const currentDate = new Date();
//             const currentYear = currentDate.getFullYear(); // This year
//             const currentMonth = currentDate.getMonth(); // Current month (0-indexed)
//             const currentDay = currentDate.getDate(); // Today's day
        
//             // Check if subtracting 4 days goes into a previous month
//             let testDay = currentDay - 4;
//             let testMonth = currentMonth;
//             let testYear = currentYear;
        
//             if (testDay < 1) {
//                 testMonth -= 1;
//                 if (testMonth < 0) {
//                     testMonth = 11; // December of the previous year
//                     testYear -= 1;
//                 }
//                 testDay = new Date(testYear, testMonth + 1, 0).getDate() + testDay;
//             }
        
//             // Create pastDate using corrected year, month, and day
//             const pastDate = new Date(testYear, testMonth, testDay);
//             const pastDateFormatted = `[aria-label="Kies${String(pastDate.getMonth() + 1).padStart(2)}/${String(pastDate.getDate()).padStart(1)}/${pastDate.getFullYear()}`;
        
//             // Interact with past date in the calendar
//             cy.get(`${pastDateFormatted}`).click();
//             //cy.goForward(); // Ensure this command matches intended navigation or actions
        
//             // Test visibility of elements post-navigation
//             cy.get('.date-time-picker > :nth-child(2)').click();
        
//             // Verwijderen uw beschikbaar dagen
//             cy.get('.date-time-picker > :nth-child(3)').click();
//           //cy.get('.sidebar-list > :nth-child(2) > .sidebar-link').click();  //Job page
//             //cy.get('.sidebar-list > :nth-child(3) > .sidebar-link').click(); //calender page

//         });
//     });

//     //Stap 3 test 1
    
//     context('calender oude datum met bevestiging en verwijder van beschikbaarheiden testen', () => {
//         beforeEach(() => {
//         // Voer de inlog- en setupacties uit voor elke test
//         cy.testinlog();
//         cy.dshscalnder('abdelrahmanfox22@yahoo.com','0123456789' );
//         });
//         it('niet beschikbaar dagen, bevestig keuzen, verwijder u beschikbaar testen', () => {
//             // Define current date components
//             const currentDate = new Date();
//             const currentYear = currentDate.getFullYear(); // This year
//             const currentMonth = currentDate.getMonth(); // Current month (0-indexed)
//             const currentDay = currentDate.getDate(); // Today's day
        
//             // Check if subtracting 4 days goes into a previous month
//             let testDay = currentDay + 4;
//             let testMonth = currentMonth;
//             let testYear = currentYear;
        
//             if (testDay < 1) {
//                 testMonth -= 1;
//                 if (testMonth < 0) {
//                     testMonth = 11; // December of the previous year
//                     testYear -= 1;
//                 }
//                 testDay = new Date(testYear, testMonth + 1, 0).getDate() + testDay;
//             }
        
//             // Create futureDate using corrected year, month, and day
//             const futureDate = new Date(testYear, testMonth, testDay);
//             const futureDateFormatted = `[aria-label="Kies${String(futureDate.getMonth() + 1).padStart(2)}/${String(futureDate.getDate()).padStart(1)}/${futureDate.getFullYear()}`;
        
//             // Interact with past date in the calendar
//             cy.get(`${futureDateFormatted}`).click();
//             cy.get('[aria-label="Kies tijdslot 12:30"]').click();
//             cy.get('[aria-label="Kies tijdslot 13:30"]').click();
//             cy.get('[aria-label="Kies tijdslot 18:00"]').click();
//             //cy.goForward(); // Ensure this command matches intended navigation or actions
        
//             // Test visibility of elements post-navigation
//             cy.get('.date-time-picker > :nth-child(3)').click();
        
//             // Verwijderen uw beschikbaar dagen
//             cy.get('.date-time-picker > :nth-child(4)').click();
//           //cy.get('.sidebar-list > :nth-child(2) > .sidebar-link').click();  //Job page
//             //cy.get('.sidebar-list > :nth-child(3) > .sidebar-link').click(); //calender page

//         });
//     });
    //Stap 4 test 1
    
    context('calender new datum met bevestiging en verwijder van beschikbaarheiden testen + volgende maand en vorege maand testen , timezone testen', () => {
        beforeEach(() => {
        // Voer de inlog- en setupacties uit voor elke test
        cy.testinlog();
        cy.dshscalnder('abdelrahmanfox22@yahoo.com','0123456789' );
        });
        it('futureDate en futurupdates testen', () => {
            // Define current date components
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear(); // This year
            const currentMonth = currentDate.getMonth(); // Current month (0-indexed)
            const currentDay = currentDate.getDate(); // Today's day
            cy.get('.nextIcon').click(); //volgende maand
            //cy.get('.prevIcon').click(); Vorege maand 
            // Check if subtracting 4 days goes into a previous month
            let testDay = currentDay + 4;
            let testMonth = currentMonth + 1;
            // Voor test .prevIcon  gewoon terug naar de vorege maand
            // let testMonth = currentMonth - 1;
            let testYear = currentYear;
        
            if (testDay < 1) {
                testMonth -= 1;
                if (testMonth < 0) {
                    testMonth = 11; // December of the previous year
                    testYear -= 1;
                }
                testDay = new Date(testYear, testMonth + 1, 0).getDate() + testDay;
            }
        
            // Create futureDate using corrected year, month, and day
            const futureDate = new Date(testYear, testMonth, testDay);
            const futureDateFormatted = `[aria-label="Kies${String(futureDate.getMonth() + 1).padStart(2)}/${String(futureDate.getDate()).padStart(1)}/${futureDate.getFullYear()}`;
        
            // Interact with future date in the calendar
            cy.get(`${futureDateFormatted}`).click();
            // Als #timezone-select een <select> element is en de tijdzones zijn <option> elementen erin:
            cy.get('#timezone-select').select('GMT+02:00 Africa/Cairo');

            // Als de tijdzones worden weergegeven in een ander type interactief element, zoals een lijst of menu:

            cy.get('[aria-label="Kies tijdslot 12:30"]').click();
            cy.get('[aria-label="Kies tijdslot 13:30"]').click();
            cy.get('[aria-label="Kies tijdslot 18:00"]').click();
            //cy.goForward(); // Ensure this command matches intended navigation or actions
            // Test visibility of elements post-navigation
            cy.get('.date-time-picker > :nth-child(3)').click();
            cy.get(`[aria-label="Kies 6/11/2024"]`).should('not.be.visible')
            // Verwijderen uw beschikbaar dagen
            cy.get('.date-time-picker > :nth-child(4)').click();

            // cy.get('.date-time-picker > :nth-child(3)').should('not.be.visible')
        //cy.get('.sidebar-list > :nth-child(2) > .sidebar-link').click();  //Job page
         //cy.get('.sidebar-list > :nth-child(4) > .sidebar-link').click(); //calender page

        });
    });
