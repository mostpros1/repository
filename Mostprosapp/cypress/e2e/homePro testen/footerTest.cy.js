describe('Home Pro   Test: Footer Test', () => {

    beforeEach(() => {
        cy.viewport('iphone-x')
        cy.homeProAppTestBegin()
    })

    it('Footer test 1: Home button test', () => {

        cy.get('[data-testid="footer homeBtn"]').click()

        // assertion
        cy.get('[data-testid="searchbar"]').should('be.visible')
    })

    it('Footer test 2: Chat button test', () => {

        cy.get('[data-testid="footer chatOverviewBtn"]').click()

        // assertion
        cy.get('.r-gap-hnu01a > :nth-child(1)').should('be.visible')
    })

    it('Footer test 3: Profiel button test', () => {

        cy.get('[data-testid="footer profileBtn"]').click()

        // assertion
        cy.contains('Profiel Bijwerken').should('be.visible')
    })
})