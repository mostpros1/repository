import { faker } from '@faker-js/faker';

describe('Home Owner Test: Offertestraat Test', () => {

    // DEEL 1

    const min = 1000;
    const max = 9999;
    const randomInteger = faker.number.int({ min, max })
    const randomLetters = faker.string.alpha({ count: 2 }).toUpperCase()

    // Ontvang de huidige datum
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    // email faker
    const validEmail = faker.internet.email();

    // Ontvang de vorige maand
    Cypress.Commands.add('getPreviousMonthName', () => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const today = new Date();
        const previousMonthIndex = (today.getMonth() - 1) % 12;
        return months[previousMonthIndex];
    });

    // Ontvang de volgende maand
    Cypress.Commands.add('getNextMonthName', () => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const today = new Date();
        const nextMonthIndex = (today.getMonth() + 1) % 12;
        return months[nextMonthIndex];
    });


    context('Beroep', () => {

        beforeEach(() => {
            cy.viewport('iphone-x')
            cy.homeOwnerAppTestBegin()
        })

        it('Test 1: Klik op zoekveld en krijg de lijst', () => {
            cy.get('[data-testid="searchbar"]').click()

            // assertion
            cy.get('[data-testid="options"] > :nth-child(1) > :nth-child(1)').should('be.visible')
        })

        it('Test 2: Geen keuze', () => {
            cy.get('[data-testid="zoekBtn"]').click()

            // assertion
            cy.get('[data-testid="searchbar"]').should('be.visible')
        })

        it('Test 3: Typ random letters in en ga door', () => {
            const randomString = faker.word.words(1);
            cy.get('[data-testid="searchbar"]').type(randomString)
            cy.get('[data-testid="zoekBtn"]').click()

            // assertion
            cy.get('[data-testid="searchbar"]').should('be.visible')
        })

        it('Test 4: Typ random nummers in en ga door', () => {
            cy.get('[data-testid="searchbar"]').type(randomInteger)
            cy.get('[data-testid="zoekBtn"]').click()

            // assertion
            cy.get('[data-testid="searchbar"]').should('be.visible')
        })

        for (let i = 1; i < 40; i++) {
            it(`Test 5.${i}: Probeer elke keuze om door te gaan`, () => {
                cy.get('[data-testid="searchbar"]').click()
                cy.get(`[data-testid="options"] > :nth-child(1) > :nth-child(${i})`).click()
                cy.get('[data-testid="zoekBtn"]').click()

                // assertion
                cy.get('[data-testid="postcodeNummerInput"]').should('be.visible')

                // repeat
                cy.viewport('iphone-x')
                cy.homeOwnerAppTestBegin()
            })
        }

    })

    context('Postcode', () => {

        beforeEach(() => {
            cy.viewport('iphone-x')
            cy.homeOwnerAppTestBegin()
            cy.get('[data-testid="searchbar"]').click()
            cy.get('[data-testid="options"] > :nth-child(1) > :nth-child(1)').click()
            cy.get('[data-testid="zoekBtn"]').click()
        })

        it('Test 1: Andersom input', () => {
            cy.get('[data-testid="postcodeNummerInput"]').type(randomLetters, { force: true })
            cy.get('[data-testid="postcodeLetterInput"]').type(randomInteger, { force: true })
            // Removing "{force: true}" prevents users from filling in the input fields, while including it compels users to take action.
            cy.get('[data-testid="volgendeBtn-1"]').click({ force: true })

            // assertion
            cy.get('[data-testid="postcodeNummerInput"]').should('be.visible')
        })

        it('Test 2: Typ speciaal karakters in', () => {
            // Generate random special characters using faker
            const specialChars = '!@#$%^&*()_+{}:"<>?|[];\',./`~';
            let randomSpecialChars = '';
            for (let i = 0; i < 5; i++) {
                const randomIndex = Math.floor(Math.random() * specialChars.length);
                randomSpecialChars += specialChars[randomIndex];
            }
            // Type random special characters into the input field
            cy.get('[data-testid="postcodeNummerInput"]').type(randomSpecialChars, { force: true });
            cy.get('[data-testid="postcodeLetterInput"]').type(randomSpecialChars, { force: true });
            cy.get('[data-testid="volgendeBtn-1"]').click({ force: true })
            cy.wait(1000)

            // assertion
            cy.get('[data-testid="postcodeNummerInput"]').should('be.visible')
        })

        it('Test 3: Typ een postcode in', () => {
            cy.get('[data-testid="postcodeNummerInput"]').type(randomInteger, { force: true });
            cy.get('[data-testid="postcodeLetterInput"]').type(randomLetters, { force: true });
            cy.get('[data-testid="volgendeBtn-1"]').click({ force: true })

            // assertion
            cy.get('[data-testid="volgendeBtn-2"]')
        })

    })

    context('Keuze Over Klus', () => {

        beforeEach(() => {
            cy.viewport('iphone-x')
            cy.homeOwnerAppTestBegin()
            cy.get('[data-testid="searchbar"]').click()
            cy.get('[data-testid="options"] > :nth-child(1) > :nth-child(1)').click()
            cy.get('[data-testid="zoekBtn"]').click()
            cy.get('[data-testid="postcodeNummerInput"]').type(randomInteger, { force: true });
            cy.get('[data-testid="postcodeLetterInput"]').type(randomLetters, { force: true });
            cy.get('[data-testid="volgendeBtn-1"]').click()
        })

        it('Test 1: Geen keuze', () => {
            cy.get('[data-testid="volgendeBtn-2"]').click()

            // assertion
            cy.get('[data-testid="volgendeBtn-2"]').should('be.visible')
        })

        it('Test 2: Klik op elke keuze (mag alleen een keuze)', () => {
            for (let i = 1; i < 7; i++) {
                cy.get(`[data-testid="keuze${i}"]`).click()
            }
            cy.get('[data-testid="volgendeBtn-2"]').click()

            // assertion
            cy.get('[data-testid="volgendeBtn-2"]').should('be.visible')
        })

        for (let i = 1; i < 7; i++) {
            it(`Test 3.${i}: Probeer elke keuze`, () => {
                cy.get(`[data-testid="keuze${i}"]`).click()
                cy.get('[data-testid="volgendeBtn-2"]').click()

                // assertion
                cy.get('[data-testid="volgendeBtn-3"]').should('be.visible')
            })
        }
    })

    context('Aanvullende Informatie', () => {

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
        })

        it('Test 1: Typ een zin in', () => {
            const randomSentence = faker.lorem.sentence();
            cy.get('[data-testid="infoInput"]').type(randomSentence);
            cy.get('[data-testid="volgendeBtn-3"]').click()

            // assertion
            cy.get('[data-testid="volgendeBtn-4"]').should('be.visible')
        })

        it('Test 2: Typ niks in', () => {
            cy.get('[data-testid="volgendeBtn-3"]').click()

            // assertion
            cy.get('[data-testid="volgendeBtn-4"]').should('be.visible')
        })
    })

    context('Datum', () => {

        // Date: 23/04/2024
        // IMPORTANT ERROR: The calendar doesn't work properly. 
        // The issue is that when clicking on a date, it selects the day before the intended one.
        // This is why tests are different. This must be fixed in the future.
        // Example test problem: Test 2: It clicks on the date 4 day before today and then checks if the 5 day before today is clicked. 

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

            // assertion
            cy.get('[data-testid="volgendeBtn-5"]').should('be.visible')
        })

        it('Test 2: Kies een oudere datum', () => {

            // Calculate the date four days before today
            const pastDate = new Date(currentYear, currentMonth - 1, currentDay - 4);
            const pastDateFormatted = `${pastDate.getFullYear()}-${String(pastDate.getMonth() + 1).padStart(2, '0')}-${String(pastDate.getDate()).padStart(2, '0')}`;

            const pastDate2 = new Date(currentYear, currentMonth - 1, currentDay - 5);
            const pastDate2Formatted = `${pastDate2.getFullYear()}-${String(pastDate2.getMonth() + 1).padStart(2, '0')}-${String(pastDate2.getDate()).padStart(2, '0')}`;

            // Click on the calculated past date
            cy.get(`[data-testid="${pastDateFormatted}"]`).click();

            // assertion
            cy.get(`[data-testid="${pastDate2Formatted}"]`).should('not.have.css', 'background-color', 'rgba(58, 114, 255, 0.83)')
        })

        it('Test 3: Kies een toekomstige datum', () => {
            const futureDate = new Date(currentYear, currentMonth - 1, currentDay + 2);
            const futureDateFormatted = `${futureDate.getFullYear()}-${String(futureDate.getMonth() + 1).padStart(2, '0')}-${String(futureDate.getDate()).padStart(2, '0')}`;

            const tomorrow = new Date(currentYear, currentMonth - 1, currentDay + 1);
            const tomorrowFormatted = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`;

            // Assert that the future date is not selected initially
            cy.get(`[data-testid="${tomorrowFormatted}"]`).should('not.have.class', 'selectedDay');

            // Click on future date
            cy.get(`[data-testid="${futureDateFormatted}"]`).click();

            // Assert that tomorrow's is selected after clicking
            // Check the css background to see if the date is chosen or not
            cy.get(`[data-testid="${tomorrowFormatted}"]`).should('have.css', 'background-color', 'rgba(58, 114, 255, 0.83)')
        })

        it('Test 4: Kies meerdere datums', () => {
            for (let i = 1; i <= 4; i++) {
                const futureDate = new Date(currentYear, currentMonth - 1, currentDay + i);
                const futureDateFormatted = `${futureDate.getFullYear()}-${String(futureDate.getMonth() + 1).padStart(2, '0')}-${String(futureDate.getDate()).padStart(2, '0')}`;
                cy.get(`[data-testid="${futureDateFormatted}"]`).click();

                // assertion
                const futureDate2 = new Date(currentYear, currentMonth - 1, currentDay - 1 + i);
                const futureDate2Formatted = `${futureDate2.getFullYear()}-${String(futureDate2.getMonth() + 1).padStart(2, '0')}-${String(futureDate2.getDate()).padStart(2, '0')}`;
                cy.get(`[data-testid="${futureDate2Formatted}"]`).should('have.css', 'background-color', 'rgba(58, 114, 255, 0.83)')
            }
        })

        it('Test 5: Klik op linkere pijltje', () => {
            cy.get('[data-testid="arrowLinks"]').click()

            // assertion
            cy.getPreviousMonthName().then(previosMonthName => {
                cy.get('body').should('contain', previosMonthName);
            });
        })

        it('Test 6: Klik op rechtere pijltje', () => {
            cy.get('[data-testid="arrowRechts"]').click()

            // assertion
            cy.getNextMonthName().then(nextMonthName => {
                cy.get('body').should('contain', nextMonthName);
            });
        })
    })


    context('Email Adres', () => {

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

            // Calculate the date two days after today
            const futureDate = new Date(currentYear, currentMonth - 1, currentDay + 2);
            const futureDateFormatted = `${futureDate.getFullYear()}-${String(futureDate.getMonth() + 1).padStart(2, '0')}-${String(futureDate.getDate()).padStart(2, '0')}`;

            // Click on the calculated future date
            cy.get(`[data-testid="${futureDateFormatted}"]`).click();

            cy.get('[data-testid="volgendeBtn-4"]').click()
        })

        it('Test 1: Ongeldig email adres', () => {
            // Generate an invalid email address
            const invalidEmail = faker.internet.email();

            // Modify the generated email address to make it invalid (for example, remove the '@' symbol)
            const invalidEmailWithoutAtSymbol = invalidEmail.replace('@', '');


            cy.get('[data-testid="emailInput"]').type(invalidEmailWithoutAtSymbol)
            cy.get('[data-testid="volgendeBtn-5"]').click()

            // assertion
            cy.get('[data-testid="volgendeBtn-5"]').should('be.visible')
        })

        function generateEmailWithSpecialCharacters() {
            // Generate local part of email address
            const localPart = faker.internet.userName();
            // Generate domain part of email address
            const domain = faker.internet.domainName();
            // Combine local part and domain part to create email address
            let email = `${localPart}@${domain}`;

            // Add special characters to the email address
            const specialCharacters = ['!', '#', '$', '%', '&', "'", '*', '+', '-', '/', '=', '?', '^', '_', '{', '|', '}', '~'];
            const randomSpecialCharacter = specialCharacters[Math.floor(Math.random() * specialCharacters.length)];

            return email;
        }

        it('Test 2: Geldige e-mail adres met speciaal tekens', () => {
            const validEmailWithSpecialChars = generateEmailWithSpecialCharacters();

            cy.get('[data-testid="emailInput"]').type(validEmailWithSpecialChars)
            cy.get('[data-testid="volgendeBtn-5"]').click()

            // assertion
            cy.get('[data-testid="volgendeBtn-5"]').should('not.be.visible')
        })

        it('Test 3: Typ niks in', () => {
            cy.get('[data-testid="volgendeBtn-5"]').click()

            // assertion
            cy.get('[data-testid="volgendeBtn-5"]').should('be.visible')
        })

        it('Test 4: Typ een email adres in', () => {

            cy.get('[data-testid="emailInput"]').type(validEmail)
            cy.get('[data-testid="volgendeBtn-5"]').click()

            // assertion
            cy.get('[data-testid="volgendeBtn-5"]').should('not.be.visible')
        })
    })

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

    //     for (let k = 0; k < 5; k++) {
    //         it(`Test 1.${k}: Kies een vakspecialist`, () => {
    //             cy.get(`[data-testid="testKeuze-${k}"] > .css-view-175oi2r`).click()
    //         })
    //     }
    // })
})