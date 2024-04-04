import faker from 'faker'

describe('Home Owner Test: Search Test', () => {

    beforeEach(() => {
        cy.viewport('iphone-x')
        cy.homeOwnerAppTestBegin()
    })

    it('Search test 1: Opklik en krijg lijst test', () => {
        cy.get('[data-testid="searchbar"]').click()
    })

    it('Search test 2: Ga door zonder een keuze', () => {
        cy.get('[data-testid="forward"]').click()
        cy.get('[data-testid="forward"]').should('exist')
    })

    it('Search test 3: Random letters intypen', () => {
        const randomWord = faker.random.words();

        cy.get('[data-testid="searchbar"]').click().type(randomWord)
        cy.get('[data-testid="forward"]').click()
        cy.get('[data-testid="forward"]').should('exist')
    })

    it('Search test 4: Random nummers intypen', () => {
        const min = 10001;
        const max = 100000;
        const randomInteger = faker.datatype.number({ min, max });

        cy.get('[data-testid="searchbar"]').click().type(randomInteger)
        cy.get('[data-testid="forward"]').click()
        cy.get('[data-testid="forward"]').should('exist')
    })

    // it('Search test 5: Probeer elke keuze', () => {
    //     for (let i = 1; i < 40; i++) {
    //         cy.get('[data-testid="searchbar"]').click()
    //         cy.get(`[data-testid="option"] > :nth-child(1) > :nth-child(${i})`).click()
    //         cy.get('[data-testid="forward"]').click()
    //         // cy.wait(100);
    //         cy.homeOwnerAppTestBegin()
    //     }
    // })

})