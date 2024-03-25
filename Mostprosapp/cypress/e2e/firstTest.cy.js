
describe('Testing app', () => {

    it('type in input', () => {
        cy.viewport('iphone-x')
        cy.visit('http://localhost:19006/')

        cy.get(':nth-child(3) > .css-view-175oi2r').click()
        cy.get('.r-backgroundColor-14lw9ot').click()

        for (let i = 1; i < 4; i++) {
            cy.get(`[data-testid="volgendeBtn${i}"]`).click()
            cy.wait(100);
        }

    })
})