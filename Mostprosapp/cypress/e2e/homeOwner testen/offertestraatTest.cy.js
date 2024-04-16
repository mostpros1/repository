import faker from 'faker'
import { getByTestId } from '@testing-library/cypress'

describe('Home Owner Test: Offertestraat Test', () => {

    // DEEL 1

    const min = 1000;
    const max = 9999;
    const randomInteger = faker.datatype.number({ min, max })

    const randomLetters = faker.random.alpha({ count: 2 }).toUpperCase()

    // Get the current date
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    const validEmail = faker.internet.email();

    // context('Postcode', () => {

    //     beforeEach(() => {
    //         cy.viewport('iphone-x')
    //         cy.homeOwnerAppTestBegin()
    //         cy.get('[data-testid="searchbar"]').click()
    //         cy.get('[data-testid="options"] > :nth-child(1) > :nth-child(1)').click()
    //         cy.get('[data-testid="zoekBtn"]').click()
    //     })

    //     it('Test 1: Andersom input', () => {
    //         cy.get('[data-testid="postcodeNummerInput"]').type(randomLetters, { force: true })
    //         cy.get('[data-testid="postcodeLetterInput"]').type(randomInteger, { force: true })
    //         // Removing "{force: true}" prevents users from filling in the input fields, while including it compels users to take action.
    //         cy.get('[data-testid="volgendeBtn1"]').click()
    //         cy.get('[data-testid="postcodeNummerInput"]').should('exist')
    //     })

    //     it('Test 2: Typ speciaal karakters in', () => {
    //         // Generate random special characters using faker
    //         const specialChars = '!@#$%^&*()_+{}:"<>?|[];\',./`~';
    //         let randomSpecialChars = '';
    //         for (let i = 0; i < 5; i++) {
    //             const randomIndex = Math.floor(Math.random() * specialChars.length);
    //             randomSpecialChars += specialChars[randomIndex];
    //         }
    //         // Type random special characters into the input field
    //         cy.get('[data-testid="postcodeNummerInput"]').type(randomSpecialChars, { force: true });
    //         cy.get('[data-testid="postcodeLetterInput"]').type(randomSpecialChars, { force: true });
    //         cy.get('[data-testid="volgendeBtn1"]').click()
    //         cy.wait(1000)
    //         cy.contains('[data-testid="postcodeNummerInput"]')
    //     })

    //     it('Test 3: Typ een postcode in', () => {
    //         cy.get('[data-testid="postcodeNummerInput"]').type(randomInteger, { force: true });
    //         cy.get('[data-testid="postcodeLetterInput"]').type(randomLetters, { force: true });
    //         cy.get('[data-testid="volgendeBtn1"]').click()
    //     })

    // })

    // context('Keuze Over Klus', () => {

    //     beforeEach(() => {
    //         cy.viewport('iphone-x')
    //         cy.homeOwnerAppTestBegin()
    //         cy.get('[data-testid="searchbar"]').click()
    //         cy.get('[data-testid="options"] > :nth-child(1) > :nth-child(1)').click()
    //         cy.get('[data-testid="zoekBtn"]').click()
    //         cy.get('[data-testid="postcodeNummerInput"]').type(randomInteger, { force: true });
    //         cy.get('[data-testid="postcodeLetterInput"]').type(randomLetters, { force: true });
    //         cy.get('[data-testid="volgendeBtn-1"]').click()
    //     })

    //     it('Test 1: Geen keuze', () => {
    //         cy.get('[data-testid="volgendeBtn-2"]').click()
    //         cy.get('[data-testid="volgendeBtn-2"]')
    //     })

    //     it('Test 2: Klik op elke keuze', () => {
    //         for (let i = 1; i < 7; i++) {
    //             cy.get(`[data-testid="keuze${i}"]`).click()
    //         }
    //         cy.get('[data-testid="volgendeBtn-2"]').click()
    //         cy.contains('[data-testid="volgendeBtn-2"]')
    //     })

    //     for (let i = 1; i < 7; i++) {
    //         it(`Test 3-${i}: Probeer elke keuze`, () => {
    //             cy.get(`[data-testid="keuze${i}"]`).click()
    //             cy.get('[data-testid="volgendeBtn-2"]').click()
    //         })
    //     }
    // })

    // context('Aanvullende Informatie', () => {

    //     beforeEach(() => {
    //         cy.viewport('iphone-x')
    //         cy.homeOwnerAppTestBegin()
    //         cy.get('[data-testid="searchbar"]').click()
    //         cy.get('[data-testid="options"] > :nth-child(1) > :nth-child(1)').click()
    //         cy.get('[data-testid="zoekBtn"]').click()
    //         cy.get('[data-testid="postcodeNummerInput"]').type(randomInteger, { force: true });
    //         cy.get('[data-testid="postcodeLetterInput"]').type(randomLetters, { force: true });
    //         cy.get('[data-testid="volgendeBtn-1"]').click()
    //         cy.get('[data-testid="keuze1"]').click()
    //         cy.get('[data-testid="volgendeBtn-2"]').click()
    //     })

    //     it('Test 1: Typ een zin in', () => {
    //         const randomSentence = faker.lorem.sentence();
    //         cy.get('[data-testid="infoInput"]').type(randomSentence);
    //         cy.get('[data-testid="volgendeBtn-3"]').click()
    //     })

    //     it('Test 2: Typ niks in', () => {
    //         cy.get('[data-testid="volgendeBtn-3"]').click()
    //     })
    // })

    context('Datum', () => {

        beforeEach(() => {
            cy.viewport('iphone-x')
            cy.homeOwnerAppTestBegin()
            cy.get('[data-testid="searchbar"]').click()
            cy.get('[data-testid="options"] > :nth-child(1) > :nth-child(1)').click()
            cy.get('[data-testid="zoekBtn"]').click()
            cy.get('[data-testid="postcodeNummerInput"]').type(randomInteger, { force: true });
            cy.get('[data-testid="postcodeLetterInput"]').type(randomLetters, { force: true });
            cy.get('[data-testid="volgendeBtn-1"]').click()
            cy.get('[data-testid="keuze1"]').click()
            cy.get('[data-testid="volgendeBtn-2"]').click()
            cy.get('[data-testid="volgendeBtn-3"]').click()
        })

        it('Test 1: Geen keuze', () => {
            cy.get('[data-testid="volgendeBtn-4"]').click()
            cy.get('[data-testid="volgendeBtn-3"]').should('not.be.visible')
        })

        it('Test 2: Kies een oudere datum', () => {

            // Calculate the date four days before today
            const pastDate = new Date(currentYear, currentMonth - 1, currentDay - 4);
            const pastDateFormatted = `${pastDate.getFullYear()}-${String(pastDate.getMonth() + 1).padStart(2, '0')}-${String(pastDate.getDate()).padStart(2, '0')}`;

            // Click on the calculated past date
            cy.get(`[data-testid="${pastDateFormatted}"]`).click();

            cy.get('[data-testid="volgendeBtn-4"]').click()
            cy.get('[data-testid="volgendeBtn-4"]').should('be.visible')

        })

        it('Test 3: Kies een toekomstige datum', () => {
            const futureDate = new Date(currentYear, currentMonth - 1, currentDay + 4);
            const futureDateFormatted = `${futureDate.getFullYear()}-${String(futureDate.getMonth() + 1).padStart(2, '0')}-${String(futureDate.getDate()).padStart(2, '0')}`;

            cy.get(`[data-testid="${futureDateFormatted}"]`).click();

            cy.get('[data-testid="volgendeBtn-4"]').click()
            cy.get('[data-testid="volgendeBtn-4"]').should('not.be.visible')
        })

        it('Test 4: Kies meerdere datums', () => {
            for (let i = 1; i <= 4; i++) {
                const futureDate = new Date(currentYear, currentMonth - 1, currentDay + i);
                const futureDatesFormatted = `${futureDate.getFullYear()}-${String(futureDate.getMonth() + 1).padStart(2, '0')}-${String(futureDate.getDate()).padStart(2, '0')}`;
                cy.get(`[data-testid="${futureDatesFormatted}"]`).click();
            }

            cy.get('[data-testid="volgendeBtn-4"]').click()
            cy.get('[data-testid="volgendeBtn-4"]').should('not.be.visible')
        })

        it('Test 5: Klik op linkere pijltje', () => {
            cy.get('[data-testid="arrowLinks"]').click()
        })

        it('Test 6: Klik op rechtere pijltje', () => {
            cy.get('[data-testid="arrowRechts"]').click()
        })
    })


    // context('Email Adres', () => {

    //     beforeEach(() => {
    //         cy.viewport('iphone-x')
    //         cy.homeOwnerAppTestBegin()
    //         cy.get('[data-testid="searchbar"]').click()
    //         cy.get('[data-testid="options"] > :nth-child(1) > :nth-child(1)').click()
    //         cy.get('[data-testid="zoekBtn"]').click()
    //         cy.get('[data-testid="postcodeNummerInput"]').type(randomInteger, { force: true });
    //         cy.get('[data-testid="postcodeLetterInput"]').type(randomLetters, { force: true });
    //         cy.get('[data-testid="volgendeBtn-1"]').click()
    //         cy.get('[data-testid="keuze1"]').click()
    //         cy.get('[data-testid="volgendeBtn-2"]').click()
    //         cy.get('[data-testid="volgendeBtn-3"]').click()

    //         // Calculate the date two days after today
    //         const futureDate = new Date(currentYear, currentMonth - 1, currentDay + 2);
    //         const futureDateFormatted = `${futureDate.getFullYear()}-${String(futureDate.getMonth() + 1).padStart(2, '0')}-${String(futureDate.getDate()).padStart(2, '0')}`;

    //         // Click on the calculated future date
    //         cy.get(`[data-testid="${futureDateFormatted}"]`).click();

    //         cy.get('[data-testid="volgendeBtn-4"]').click()
    //     })

    //     it('Test 1: Ongeldig email adres', () => {
    //         // Generate an invalid email address
    //         const invalidEmail = faker.internet.email();

    //         // Modify the generated email address to make it invalid (for example, remove the '@' symbol)
    //         const invalidEmailWithoutAtSymbol = invalidEmail.replace('@', '');


    //         cy.get('[data-testid="emailInput"]').type(invalidEmailWithoutAtSymbol)
    //         cy.get('[data-testid="volgendeBtn-5"]').click()
    //         cy.get('[data-testid="volgendeBtn-5"]').should('be.visible')
    //     })

    //     function generateEmailWithSpecialCharacters() {
    //         // Generate local part of email address
    //         const localPart = faker.internet.userName();
    //         // Generate domain part of email address
    //         const domain = faker.internet.domainName();
    //         // Combine local part and domain part to create email address
    //         let email = `${localPart}@${domain}`;

    //         // Add special characters to the email address
    //         const specialCharacters = ['!', '#', '$', '%', '&', "'", '*', '+', '-', '/', '=', '?', '^', '_', '{', '|', '}', '~'];
    //         const randomSpecialCharacter = specialCharacters[Math.floor(Math.random() * specialCharacters.length)];

    //         return email;
    //     }

    //     it('Test 2: Geldige e-mail adres met speciaal tekens', () => {
    //         const validEmailWithSpecialChars = generateEmailWithSpecialCharacters();

    //         cy.get('[data-testid="emailInput"]').type(validEmailWithSpecialChars)
    //         cy.get('[data-testid="volgendeBtn-5"]').click()
    //         cy.get('[data-testid="volgendeBtn-5"]').should('not.be.visible')
    //     })

    //     it('Test 3: Typ niks in', () => {
    //         cy.get('[data-testid="volgendeBtn-5"]').click()
    //         cy.get('[data-testid="volgendeBtn-5"]').should('be.visible')
    //     })

    //     it('Test 4: Typ een email adres in', () => {

    //         cy.get('[data-testid="emailInput"]').type(validEmail)
    //         cy.get('[data-testid="volgendeBtn-5"]').click()
    //         cy.get('[data-testid="volgendeBtn-5"]').should('not.be.visible')
    //     })
    // })

    // context('Vakspecialist keuze', () => {

    //     beforeEach(() => {
    //         cy.viewport('iphone-x')
    //         cy.homeOwnerAppTestBegin()
    //         cy.get('[data-testid="searchbar"]').click()
    //         cy.get('[data-testid="options"] > :nth-child(1) > :nth-child(1)').click()
    //         cy.get('[data-testid="zoekBtn"]').click()
    //         cy.get('[data-testid="postcodeNummerInput"]').type(randomInteger, { force: true });
    //         cy.get('[data-testid="postcodeLetterInput"]').type(randomLetters, { force: true });
    //         cy.get('[data-testid="volgendeBtn-1"]').click()
    //         cy.get('[data-testid="keuze1"]').click()
    //         cy.get('[data-testid="volgendeBtn-2"]').click()
    //         cy.get('[data-testid="volgendeBtn-3"]').click()

    //         // Calculate the date two days after today
    //         const futureDate = new Date(currentYear, currentMonth - 1, currentDay + 2);
    //         const futureDateFormatted = `${futureDate.getFullYear()}-${String(futureDate.getMonth() + 1).padStart(2, '0')}-${String(futureDate.getDate()).padStart(2, '0')}`;
    //         // Click on the calculated future date
    //         cy.get(`[data-testid="${futureDateFormatted}"]`).click();
    //         cy.get('[data-testid="volgendeBtn-4"]').click()

    //         cy.get('[data-testid="emailInput"]').type(validEmail)
    //         cy.get('[data-testid="volgendeBtn-5"]').click()

    //     })

    //     it('Test 1: Kies een vakspecialist', () => {
            
    //     })

    // })
})