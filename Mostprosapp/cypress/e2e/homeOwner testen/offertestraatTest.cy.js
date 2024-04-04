import faker from 'faker'

describe('Home Owner Test: Offertestraat Test', () => {

    beforeEach(() => {
        cy.viewport('iphone-x')
        cy.homeOwnerAppTestBegin()
        cy.get('[data-testid="searchbar"]').click()
        cy.get('[data-testid="option"] > :nth-child(1) > :nth-child(1)').click()
        cy.get('[data-testid="forward"]').click()
    })

    // DEEL 1

    context('Postcode', () => {

        const min = 1000;
        const max = 9999;
        const randomInteger = faker.datatype.number({ min, max });

        it('Test 1: Andersom input', () => {
            cy.get('[data-testid="postcodeNummerInput"]').invoke('val', '5678').trigger('change')
            cy.get('[data-testid="postcodeLetterInput"]').invoke('val', 'WE').trigger('change')
            
        })

        // it('Test 2: ')

    })

})