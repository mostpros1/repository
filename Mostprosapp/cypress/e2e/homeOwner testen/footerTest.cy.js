describe('Home Owner Test: Footer Test', () => {

    beforeEach(() => {
        cy.viewport('iphone-x')
        cy.homeOwnerAppTestBegin()
    })

    it('Footer test 1: Home button test', () => {

        cy.get('[data-testid="footer homeBtn"]').click()

    })

    it('Footer test 2: Chat button test', () => {

        cy.get('[data-testid="footer chatOverviewBtn"]').click()

    })

    it('Footer test 3: Profiel button test', () => {

        cy.get('[data-testid="footer profileBtn"]').click()

    })
})