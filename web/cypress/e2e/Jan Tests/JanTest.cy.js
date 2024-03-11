describe('Testing "Register as specialist"' , () => {
    it('type in input', () => {

        // THIS TEST FILE IS A DEMO, IT DOESNT WORK PROPERLY. CHECK THE OTHER 'JAN TEST' FILES

        cy.viewport(1250, 695) // Change viewport to use desktop website instead of mobile website

        // Functions: They are intended to better show repetitive code.

        // Note: There are some checks which only controls some actions. There are two Asterisk (*) after these actions

        function testBegin() {
            cy.visit("https://main.d2j290dx5bs7ht.amplifyapp.com/") // Go to website
            cy.get('.nav-blue-btn a.black-items').click() // Click on "Register as specialist" button
        }

        function testAgain() {
            cy.visit("https://main.d2j290dx5bs7ht.amplifyapp.com/")
            cy.get('.nav-blue-btn > .black-items').click() // Go to 'Register as specialist'

            for (let r = 0; r < 4; r++) {
                goForward()
            }
        }

        function goBack() { // To go back to the previous step  and to clear all input fields
            cy.get('[class="form-btn back"]').click()

            cy.get('input').each(($input) => {
                cy.wrap($input).clear()
            });
        }

        function goForward() { // To proceed to the next step
            cy.get('[class="form-btn"]').click()
        }



        // STEP 0

        testBegin()

        // STEP 1

        // check 1
        cy.get('input[type="text"]').eq(0).type('Loodgieter')
        cy.get('input[type="text"]').eq(1).type('test@test.com')
        cy.get('input[type="text"]').eq(2).type('2020EB')
        cy.get('input[type="text"]').eq(3).type('Amsterdam')
        goForward()

        goBack()

        // check 2
        cy.get('input[type="text"]').eq(0).type('dsamkdmsk')
        cy.get('input[type="text"]').eq(1).type('dsadasmdk')
        cy.get('input[type="text"]').eq(2).type('Amsterdam')
        cy.get('input[type="text"]').eq(3).type('2020EB')
        goForward()

        goBack()

        // check 3
        cy.get('input[type="text"]').eq(0).type('#&Y$ĞÜİŞÇ')
        cy.get('input[type="text"]').eq(1).type('/+/%%&ĞÜŞ2@(%&/.Ğğüş')
        cy.get('input[type="text"]').eq(2).type('32423532532ğüşçşö')
        cy.get('input[type="text"]').eq(3).type('asdwsadffğĞÜŞ')
        goForward()

        goBack()

        // check 4
        cy.get('input[type="text"]').eq(0).type('21353424') // **
        cy.get('input[type="text"]').eq(1).type('test@test.com')
        cy.get('input[type="text"]').eq(2).type('*^%%ĞÜŞÇÖiş') // **
        cy.get('input[type="text"]').eq(3).type('/&(&%ÜĞŞLçöi') // **
        goForward()

        goBack()

        // check 5 (location check)
        cy.get('input[type="text"]').eq(0).type('Loodgieter')
        cy.get('input[type="text"]').eq(1).type('test@test.com')
        cy.get('input[type="text"]').eq(2) // **
        cy.get('input[type="text"]').eq(3) // **
        goForward()

        goBack()

        // check 6 (location check)
        cy.get('input[type="text"]').eq(0).type('Loodgieter')
        cy.get('input[type="text"]').eq(1).type('test@test.com')
        cy.get('input[type="text"]').eq(2).type('20233AB') // **
        cy.get('input[type="text"]').eq(3).type('Istanbul') // **
        goForward() 

        goBack()

        // empty check
        cy.get('input[type="text"]').eq(0)
        cy.get('input[type="text"]').eq(1)
        cy.get('input[type="text"]').eq(2)
        cy.get('input[type="text"]').eq(3)
        goForward() 


        // STEP 2-3-4

        // check 1
        for (let k = 0; k < 3; k++) {
            goForward()
        }

        for (let l = 0; l < 3; l++) {
            cy.get('[class="form-btn back"]').click()
        }
        

        // check 2-3
        for (let i = 0; i < 6; i++) {
            cy.get('input[type="radio"]').eq(i).click()
            goForward()
            cy.get('[class="form-btn back"]').click()
        }

        goForward()

        for (let g = 0; g < 2; g++) {
            for (let z = 0; z < 5; z++) {
                cy.get('input[type="radio"]').eq(z).click()
                goForward()
                cy.get('[class="form-btn back"]').click()
            }
            goForward()
        }
        

        // STAP 5

        // check 1
        cy.get('input[type="text"]').eq(0).type('Mostpros')
        cy.get('input[type="text"]').eq(1).type('9305 6589')
        goForward()

        testAgain()

        // check 2
        cy.get('input[type="text"]').eq(0).type('dsnajdnuws^&%*')
        cy.get('input[type="text"]').eq(1).type('JDNASJD7^%&*')
        goForward()

        testAgain()

        // check 3
        cy.get('input[type="text"]').eq(0).type('KOÇTAŞ')
        cy.get('input[type="text"]').eq(1).type('sadvdsfadsss')
        goForward()

        testAgain()

        // check 4
        cy.get('input[type="text"]').eq(0).type('123543546')
        cy.get('input[type="text"]').eq(1).type('&/%/()(&%+')
        goForward()

        testAgain()

        // check 5
        goForward()
    })
})