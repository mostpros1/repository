describe('Testing "Register as specialist"', () => {
    it('type in input', () => {

        cy.viewport(1250, 695) // Change viewport to use desktop website instead of mobile website
        cy.visit("https://main.d2j290dx5bs7ht.amplifyapp.com/") // Go to website
        cy.get('.nav-blue-btn a.black-items').click() // Click on "Register as specialist" button

        // functions: They are intended to better show repetitive code.

        // note: There are some checks which only controls some actions. There are two Asterisk (*) after these actions

        function goBack() { // To go back to the previous step and to clear all input fields
            cy.get('[class="form-btn back"]').click()

            cy.get('input[placeholder="Uw beroep"]').clear();
            cy.get('input[placeholder="example@example.com"]').clear();
            cy.get('input[placeholder="1234AB"]').clear();
            cy.get('input[placeholder="Plaatsnaam"]').clear();
        }

        function goForward() { // To proceed to the next step
            cy.get('[class="form-btn"]').click()
        }

        // STEP 1

        // check 1
        cy.get('input[placeholder="Uw beroep"]').type('Loodgieter')
        cy.get('[placeholder="example@example.com"]').type('test@test.com')
        cy.get('[placeholder="1234AB"]').type('2020EB')
        cy.get('[placeholder="Plaatsnaam"]').type('Amsterdam')
        goForward()

        goBack()

        // check 2
        cy.get('input').first().type('dsamkdmsk')
        cy.get('[placeholder="example@example.com"]').type('dsadasmdk')
        cy.get('[placeholder="1234AB"]').type('Amsterdam')
        cy.get('[placeholder="Plaatsnaam"]').type('2020EB')
        goForward()

        goBack()

        // check 3
        cy.get('input').first().type('#&Y$ĞÜİŞÇ')
        cy.get('[placeholder="example@example.com"]').type('/+/%%&ĞÜŞ2@(%&/.Ğğüş')
        cy.get('[placeholder="1234AB"]').type('32423532532ğüşçşö')
        cy.get('[placeholder="Plaatsnaam"]').type('asdwsadffğĞÜŞ')
        goForward()

        goBack()

        // check 4
        cy.get('input').first().type('21353424') **
            cy.get('[placeholder="example@example.com"]').type('test@test.com')
        cy.get('[placeholder="1234AB"]').type('*^%%ĞÜŞÇÖiş') **
            cy.get('[placeholder="Plaatsnaam"]').type('/&(&%ÜĞŞLçöi') **
            goForward()

        goBack()

        // check 5 (location check)
        cy.get('input').first().type('Loodgieter')
        cy.get('[placeholder="example@example.com"]').type('test@test.com')
        cy.get('[placeholder="1234AB"]') **
            cy.get('[placeholder="Plaatsnaam"]') **
            goForward()

        goBack()

        // check 6 (location check)
        cy.get('input').first().type('Loodgieter')
        cy.get('[placeholder="example@example.com"]').type('test@test.com')
        cy.get('[placeholder="1234AB"]').type('20233AB') **
        cy.get('[placeholder="Plaatsnaam"]').type('Istanbul') **
        goForward() 

        goBack() 

        // empty check
        cy.get('input').first()
        cy.get('[placeholder="example@example.com"]')
        cy.get('[placeholder="1234AB"]')
        cy.get('[placeholder="Plaatsnaam"]')
        goForward() 


        // STEP 2-3-4

        // check 1
        goForward()
        goForward()
        goForward() 

        // check 2
        cy.get('.specialist_q').each(($label, index, $labels) => {

            cy.wrap($label).click();

        });
    })
})