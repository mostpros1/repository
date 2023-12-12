

describe('Testing searchbar functionality', () => {
    it('type in input', () => {
        cy.visit("https://main.d2j290dx5bs7ht.amplifyapp.com/")

        cy.get('input').type('oo')

        cy.get('input').type('{backspace}{backspace}')

    })

    it('click second result', () => {
        cy.visit("https://main.d2j290dx5bs7ht.amplifyapp.com/")

        cy.get('input').click()

        cy.get('.search_dropdown_item').eq(4).click()
    })
})