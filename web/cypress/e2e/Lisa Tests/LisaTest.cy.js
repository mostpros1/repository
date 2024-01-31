// import './commands'

describe('Testing searchbar functionality' , () => {
    it('type in input', () => {

        cy.viewport(1250, 695) // Change viewport to use desktop website instead of mobile website

        // Functions: They are intended to better show repetitive code.

        function goBack() {
            cy.get('[class="form-btn back"]').click()

            cy.get('input').each(($input) => {
               cy.wrap($input).clear()
            });
        }

        function goForward() { // To proceed to the next step
            cy.get('[class="form-btn"]').click()
        }


        // STAP 0

        cy.visit("https://main.d2j290dx5bs7ht.amplifyapp.com/")
        cy.get('input').type('Loodgieter').click()
        cy.get('.search_dropdown a:first').click()


        // STAP 1

        // Locatie check 1
        cy.get('input[type="text"]').eq(0).type('2020TE')
        cy.get('input[type="text"]').eq(1).type('Amsterdam')
        goForward()

        goBack()

        // Locatie check 2
        cy.get('input[type="text"]').eq(0).type('Amsterdam')
        cy.get('input[type="text"]').eq(1).type('202TE')
        goForward()

        goBack()

        // Locatie check 3
        cy.get('input[type="text"]').eq(0).type('2131dasdsa23')
        cy.get('input[type="text"]').eq(1).type('123dsasdw')
        goForward()

        goBack()

        // Locatie check 4
        cy.get('input[type="text"]').eq(0).type('ÖÇŞİÜ%&(/)')
        cy.get('input[type="text"]').eq(1).type('ÇSIŞŞĞÜÜ=)/&')
        goForward()

        goBack()

        // Locatie check 5.1
        cy.get('input[type="text"]').eq(0)
        goForward()

        // Locatie check 5.2
        cy.get('input[type="text"]').eq(1)
        goForward()

        // Locatie check 6
        cy.get('input[type="text"]').eq(0).type('12345')
        cy.get('input[type="text"]').eq(1).type('Istanbul')
        goForward()



        // STAP 2-4

        // check 1
        for (let i = 0; i < 5; i++) {
        }
        goForward()


        // STAP 5

        // check 1
        // cy.get('[class="text-field"]').type('Ik heb een probleem.')
        // goForward()


        // check 2
        // cy.get('[class="text-field"]').type('ŞÖĞİÜ(%/+^^+İŞÖ')
        // goForward()


        // check 3
        // cy.get('[class="text-field"]').type('')
        goForward()



        // STAP 6

        // check 1
        cy.get('[class="email-input"]').type('test@test.com')
        goForward()
        cy.get('[class="form-btn back"]').click()
        cy.get('[class="email-input"]').clear()

        // check 2
        cy.get('[class="email-input"]').type('dsad#$:?Ş:ÇİÜğ')
        goForward()
        cy.get('[class="email-input"]').clear()

        // check 3
        cy.get('[class="email-input"]').type('test123@*&**^&.TEST')
        goForward()
        cy.get('[class="email-input"]').clear()

        // check 4
        // cy.get('[class="email-input"]').type('')
        goForward()

        cy.get('[class="email-input"]').type('test@test.com')
        goForward()



        // STAP 7

        // Check 1
        cy.get('[placeholder="Voornaam"]').type('Test')
        cy.get('[placeholder="Achternaam"]').type('Test')
        cy.get('[type="tel"]').type('+3109876323')
        cy.get('[placeholder="Wachtwoord (min. 6 tekens)"]').type('qwerty')
        cy.get('[placeholder="Herhaal wachtwoord"]').type('qwerty')
        goForward()

        cy.get('input').each(($input) => {
            cy.wrap($input).clear();
        });

        // check 2
        goForward()

        // check 3-4-5-6-7-8-9
        cy.get('[placeholder="Voornaam"]').type('ÜŞŞÇÇÖÖŞ+^/%&/')
        cy.get('[placeholder="Achternaam"]').type(')/&(&:ÇŞİÜ')
        cy.get('[placeholder="Email"]').type('randomÜĞŞ(/=@/&%().nl').clear()
        cy.get('[placeholder="Email"]').type('random@test.nl').clear()
        cy.get('[placeholder="Email"]').type('&$&%@test.trn')
        cy.get('[type="tel"]').type('(&)%ÜĞÇÇ:')
        cy.get('[placeholder="Wachtwoord (min. 6 tekens)"]').type('ĞÜŞÇ!')
        cy.get('[placeholder="Herhaal wachtwoord"]').type('qwertyasg')
        goForward()

    })
})


// // conditie-2
// cy.get('input').first().click()
// cy.get('[class="form-btn"]').click()

// // conditie-3
// cy.get('input[type="radio"][value="Anders"]').click()
// cy.get('[class="form-btn"]').click()

// // conditie-4
// cy.get('input[type="radio"][value="Anders"]').click()
// cy.get('[class="form-btn"]').click()

// // conditie-5
// cy.get('input[type="radio"][value="Anders"]').click()
// cy.get('[class="form-btn"]').click()

// // conditie-6
// cy.get('input[type="radio"][value="Nee"]').click()
// cy.get('[class="form-btn"]').click()

// // conditie-7
// cy.get('[class="text-field"]').type('Hallooooo')
// cy.get('[class="form-btn"]').click()

// // conditie-8
// cy.get('input').type("test@test.com")
// cy.get('[class="form-btn"]').click()

// cy.get('input[value="Voornaam"]').type('Lisa')
// cy.get('input[value="Achternaam"]').type('Summer')