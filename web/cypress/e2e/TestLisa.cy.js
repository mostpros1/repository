// import './commands'

describe('Testing searchbar functionality', () => {
    it('type in input', () => {
        
        // STAP 1

        cy.visit("https://main.d2j290dx5bs7ht.amplifyapp.com/")
        cy.get('input').type('Loodgieter').click()
        cy.get('.search_dropdown a:first').click()

        // Locatie check 1
        cy.get('[class="form-input first-input"]').type('2020TE')
        cy.get('[class="form-input second-input"]').type('Amsterdam')
        cy.get('[class="form-btn"]').click()


        cy.visit("https://main.d2j290dx5bs7ht.amplifyapp.com/")
        cy.get('input').type('Loodgieter').click()
        cy.get('.search_dropdown a:first').click()

        // Locatie check 2
        cy.get('[class="form-input first-input"]').type('Amsterdam')
        cy.get('[class="form-input second-input"]').type('202TE')
        cy.get('[class="form-btn"]').click()


        cy.visit("https://main.d2j290dx5bs7ht.amplifyapp.com/")
        cy.get('input').type('Loodgieter').click()
        cy.get('.search_dropdown a:first').click()

        // Locatie check 3
        cy.get('[class="form-input first-input"]').type('2131dasdsa23')
        cy.get('[class="form-input second-input"]').type('123dsasdw')
        cy.get('[class="form-btn"]').click()


        cy.visit("https://main.d2j290dx5bs7ht.amplifyapp.com/")
        cy.get('input').type('Loodgieter').click()
        cy.get('.search_dropdown a:first').click()

        // Locatie check 4
        cy.get('[class="form-input first-input"]').type('ÖÇŞİÜ%&(/)')
        cy.get('[class="form-input second-input"]').type('ÇSIŞŞĞÜÜ=)/&')
        cy.get('[class="form-btn"]').click()


        cy.visit("https://main.d2j290dx5bs7ht.amplifyapp.com/")
        cy.get('input').type('Loodgieter').click()
        cy.get('.search_dropdown a:first').click()

        // Locatie check 5
        // cy.get('[class="form-input first-input"]').type('')
        // cy.get('[class="form-input second-input"]').type('')
        // cy.get('[class="form-btn"]').click()


        cy.visit("https://main.d2j290dx5bs7ht.amplifyapp.com/")
        cy.get('input').type('Loodgieter').click()
        cy.get('.search_dropdown a:first').click()

        // Locatie check 6
        cy.get('[class="form-input first-input"]').type('12345')
        cy.get('[class="form-input second-input"]').type('Istanbul')
        cy.get('[class="form-btn"]').click()



        // STAP 2-4

        // check 1
        cy.get('[class="form-btn"]').click()
        cy.get('[class="form-btn"]').click()
        cy.get('[class="form-btn"]').click()
        cy.get('[class="form-btn"]').click()
        cy.get('[class="form-btn"]').click()


        
        // STAP 5

        // check 1
        // cy.get('[class="text-field"]').type('Ik heb een probleem.')
        // cy.get('[class="form-btn"]').click()


        // check 2
        // cy.get('[class="text-field"]').type('ŞÖĞİÜ(%/+^^+İŞÖ')
        // cy.get('[class="form-btn"]').click()


        // check 3
        // cy.get('[class="text-field"]').type('')
        cy.get('[class="form-btn"]').click()



        // STAP 6
        
        // check 1
        cy.get('[class="email-input"]').type('test@test.com')
        cy.get('[class="form-btn"]').click()
        cy.get('[class="form-btn back"]').click()
        cy.get('[class="email-input"]').clear()

        // check 2
        cy.get('[class="email-input"]').type('dsad#$:?Ş:ÇİÜğ')
        cy.get('[class="form-btn"]').click()
        cy.get('[class="email-input"]').clear()

        // check 3
        cy.get('[class="email-input"]').type('test123@*&**^&.TEST')
        cy.get('[class="form-btn"]').click()
        cy.get('[class="email-input"]').clear()

        // check 4
        // cy.get('[class="email-input"]').type('')
        cy.get('[class="form-btn"]').click()

        cy.get('[class="email-input"]').type('test@test.com')
        cy.get('[class="form-btn"]').click()



        // STAP 7

        // Check 1
        cy.get('[placeholder="Voornaam"]').type('Test')
        cy.get('[placeholder="Achternaam"]').type('Test')
        cy.get('[type="tel"]').type('+3109876323')
        cy.get('[placeholder="Wachtwoord (min. 6 tekens)"]').type('qwerty')
        cy.get('[placeholder="Herhaal wachtwoord"]').type('qwerty')
        cy.get('[class="form-btn"]').click()

        cy.get('input').each(($input) => {
            cy.wrap($input).clear();
        });

        // check 2
        cy.get('[class="form-btn"]').click()

        // check 3-4-5-6-7-8-9
        cy.get('[placeholder="Voornaam"]').type('ÜŞŞÇÇÖÖŞ+^/%&/')
        cy.get('[placeholder="Achternaam"]').type(')/&(&:ÇŞİÜ')
        cy.get('[placeholder="Email"]').type('randomÜĞŞ(/=@/&%().nl').clear()
        cy.get('[placeholder="Email"]').type('random@test.nl').clear()
        cy.get('[placeholder="Email"]').type('&$&%@test.trn')
        cy.get('[type="tel"]').type('(&)%ÜĞÇÇ:')
        cy.get('[placeholder="Wachtwoord (min. 6 tekens)"]').type('ĞÜŞÇ!')
        cy.get('[placeholder="Herhaal wachtwoord"]').type('qwertyasg')
        cy.get('[class="form-btn"]').click()

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