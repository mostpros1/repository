import { faker } from '@faker-js/faker';

describe('Home Pro Test: Nieuwe Klus Test', () => {

    const min = 1000;
    const max = 9999;
    const randomInteger = faker.number.int({ min, max })
    const randomLetters = faker.string.alpha({ length: 5, casing: 'upper' })

    // email faker
    const validEmail = faker.internet.email();

    // Generate random special characters using faker
    const specialChars = '!@#$%^&*()_+{}:"<>?|[];\',./`~';
    let randomSpecialChars = '';
    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * specialChars.length);
        randomSpecialChars += specialChars[randomIndex];
    }

    context('Hoofdberoep', () => {

        beforeEach(() => {
            cy.viewport('iphone-x')
            cy.homeProAppTestBegin()
            cy.get('[data-testid="klusVindBtn"]').click()
            cy.get('[data-testid="tijdelijkeLoginBtn"]').click()
            cy.get('[data-testid="emailInput"]').type(validEmail)
            cy.get('[data-testid="nummerInput"]').focus().type(randomInteger)
            cy.get('[data-testid="letterInput"]').focus().type(randomLetters)
        })

        it('Test 1: Klik op zoekveld en krijg de lijst', () => {
            cy.get('[data-testid="beroepInput"]').click()

            // assertion
            cy.get('[data-testid="optionsID"] > :nth-child(1) > :nth-child(1)').should('be.visible')
        })

        it('Test 2: Geen keuze', () => {
            cy.get('[data-testid="volgendeBtn-1"]').click()

            // assertion
            cy.get('[data-testid="beroepInput"]').should('be.visible')
        })

        it('Test 3: Typ random letters in en ga door', () => {
            const randomString = faker.random.word();
            cy.get('[data-testid="beroepInput"]').type(randomString)
            cy.get('[data-testid="volgendeBtn-1"]').click()

            // assertion
            cy.get('[data-testid="beroepInput"]').should('be.visible')
        })

        it('Test 4: Typ random nummers in en ga door', () => {
            cy.get('[data-testid="beroepInput"]').type(randomInteger)
            cy.get('[data-testid="volgendeBtn-1"]').click()

            // assertion
            cy.get('[data-testid="beroepInput"]').should('be.visible')
        })

        for (let i = 1; i < 40; i++) {
            it(`Test 5.${i}: Probeer elke keuze om door te gaan`, () => {
                cy.get('[data-testid="beroepInput"]').click()
                cy.get(`[data-testid="optionsID"] > :nth-child(1) > :nth-child(${i})`).click()
                cy.get('[data-testid="volgendeBtn-1"]').click()

                // assertion
                cy.get('[data-testid="voornaamInput"]').should('be.visible')

                // repeat
                cy.viewport('iphone-x')
                cy.homeProAppTestBegin()
            })
        }

    })

    context('Email', () => {

        beforeEach(() => {
            cy.viewport('iphone-x')
            cy.homeProAppTestBegin()
            cy.get('[data-testid="klusVindBtn"]').click()
            cy.get('[data-testid="tijdelijkeLoginBtn"]').click()
            cy.get('[data-testid="beroepInput"]').click()
            cy.get('[data-testid="optionsID"] > :nth-child(1) > :nth-child(1)').click()
            cy.get('[data-testid="nummerInput"]').focus().type(randomInteger)
            cy.get('[data-testid="letterInput"]').focus().type(randomLetters)
        })

        it('Test 1: Ongeldig email adres', () => {
            // Generate an invalid email address
            const invalidEmail = faker.internet.email();

            // Modify the generated email address to make it invalid (for example, remove the '@' symbol)
            const invalidEmailWithoutAtSymbol = invalidEmail.replace('@', '');


            cy.get('[data-testid="emailInput"]').type(invalidEmailWithoutAtSymbol)
            cy.get('[data-testid="volgendeBtn-1"]').click()

            // assertion
            cy.get('[data-testid="volgendeBtn-1"]').should('be.visible')
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
            cy.get('[data-testid="volgendeBtn-1"]').click()

            // assertion
            cy.get('[data-testid="voornaamInput"]').should('be.visible')
        })

        it('Test 3: Typ niks in', () => {
            cy.get('[data-testid="volgendeBtn-1"]').click()

            // assertion
            cy.get('[data-testid="volgendeBtn-1"]').should('be.visible')
        })

        it('Test 4: Typ een email adres in', () => {

            cy.get('[data-testid="emailInput"]').type(validEmail)
            cy.get('[data-testid="volgendeBtn-1"]').click()

            // assertion
            cy.get('[data-testid="voornaamInput"]').should('be.visible')
        })

    })

    context('Postcode', () => {

        beforeEach(() => {
            cy.viewport('iphone-x')
            cy.homeProAppTestBegin()
            cy.get('[data-testid="klusVindBtn"]').click()
            cy.get('[data-testid="tijdelijkeLoginBtn"]').click()
            cy.get('[data-testid="beroepInput"]').click()
            cy.get('[data-testid="optionsID"] > :nth-child(1) > :nth-child(1)').click()
            cy.get('[data-testid="emailInput"]').type('test@test.com')
        })

        it('Test 1: Andersom input', () => {
            cy.get('[data-testid="nummerInput"]').focus().type(randomLetters)
            cy.get('[data-testid="letterInput"]').focus().type(randomInteger)
            // Removing "{force: true}" prevents users from filling in the input fields, while including it compels users to take action.
            cy.get('[data-testid="volgendeBtn-1"]').click()

            // assertion
            cy.get('[data-testid="nummerInput"]').should('be.visible')
        })

        it('Test 2: Typ speciaal karakters in', () => {
            // Type random special characters into the input field
            cy.get('[data-testid="nummerInput"]').focus().type(randomSpecialChars);
            cy.get('[data-testid="letterInput"]').focus().type(randomSpecialChars);
            cy.get('[data-testid="volgendeBtn-1"]').click()

            // assertion
            cy.get('[data-testid="nummerInput"]').should('be.visible')
        })

        it('Test 3: Typ een postcode in', () => {
            cy.get('[data-testid="nummerInput"]').type(randomInteger, { force: true });
            cy.get('[data-testid="letterInput"]').type(randomLetters, { force: true });
            cy.get('[data-testid="volgendeBtn-1"]').click({ force: true })

            // assertion
            cy.get('[data-testid="voornaamInput"]').should('be.visible')
        })
    })

    const passwordInput = faker.internet.password()

    // REGISTER
    context('Register', () => {

        beforeEach(() => {
            cy.viewport('iphone-x')
            cy.homeProAppTestBegin()
            cy.get('[data-testid="klusVindBtn"]').click()
            cy.get('[data-testid="tijdelijkeLoginBtn"]').click()
            cy.get('[data-testid="beroepInput"]').click()
            cy.get('[data-testid="optionsID"] > :nth-child(1) > :nth-child(1)').click()
            cy.get('[data-testid="emailInput"]').type(validEmail)
            cy.get('[data-testid="nummerInput"]').focus().type(randomInteger)
            cy.get('[data-testid="letterInput"]').focus().type(randomLetters)
            cy.get('[data-testid="volgendeBtn-1"]').click()
        })

        it('Test 1: Vul alle input velden goed in', () => {
            cy.get('[data-testid="voornaamInput"]').type(faker.person.firstName())
            cy.get('[data-testid="achternaamInput"]').type(faker.person.lastName())
            cy.get('[data-testid="telInput"]').type(faker.phone.number())
            cy.get('[data-testid="wachtwoordInput"]').type(passwordInput)
            cy.get('[data-testid="wachtwoordBevestigInput"]').type(passwordInput)
            cy.get('[data-testid="volgendeBtn-2"]').click()

            // assertion
            cy.get('[data-testid="volgendeBtn-3"]').should('be.visible')
        })

        it('Test 2: Vul niks in', () => {
            cy.get('[data-testid="volgendeBtn-2"]').click()

            // assertion
            cy.get('[data-testid="volgendeBtn-2"]').should('be.visible')
        })

        it('Test 3: Typ random karakters in input velden', () => {

            cy.get('[data-testid="voornaamInput"]').type(randomSpecialChars)
            cy.get('[data-testid="achternaamInput"]').type(randomSpecialChars)
            cy.get('[data-testid="telInput"]').type(randomSpecialChars)
            cy.get('[data-testid="wachtwoordInput"]').type(randomSpecialChars)
            cy.get('[data-testid="wachtwoordBevestigInput"]').type(randomSpecialChars)
            cy.get('[data-testid="volgendeBtn-2"]').click()

            // assertion
            cy.get('[data-testid="volgendeBtn-2"]').should('be.visible')
        })

        it('Test 4: Fout bevestiging wachtwoord', () => {
            cy.get('[data-testid="voornaamInput"]').type(faker.person.firstName())
            cy.get('[data-testid="achternaamInput"]').type(faker.person.lastName())
            cy.get('[data-testid="telInput"]').type(faker.phone.number())
            cy.get('[data-testid="wachtwoordInput"]').type(faker.internet.password())
            cy.get('[data-testid="wachtwoordBevestigInput"]').type(faker.internet.password())
            cy.get('[data-testid="volgendeBtn-2"]').click()

            // assertion
            cy.get('.r-color-howw7u').should('be.visible')
            cy.get('[data-testid="volgendeBtn-2"]').should('be.visible')
        })


        const shortPassword = faker.internet.password({ length: 6 })

        it('Test 5: Wachtwoord van minder dan 8 tekens', () => {
            cy.get('[data-testid="voornaamInput"]').type(faker.person.firstName())
            cy.get('[data-testid="achternaamInput"]').type(faker.person.lastName())
            cy.get('[data-testid="telInput"]').type(faker.phone.number())
            cy.get('[data-testid="wachtwoordInput"]').type(shortPassword)
            cy.get('[data-testid="wachtwoordBevestigInput"]').type(shortPassword)
            cy.get('[data-testid="volgendeBtn-2"]').click()

            // assertion
            cy.get('[data-testid="volgendeBtn-2"]').should('be.visible')
        })

    })


    // KEUZES
    context('Omgeving Keuze', () => {

        beforeEach(() => {
            cy.viewport('iphone-x')
            cy.homeProAppTestBegin()
            cy.get('[data-testid="klusVindBtn"]').click()
            cy.get('[data-testid="tijdelijkeLoginBtn"]').click()
            cy.get('[data-testid="beroepInput"]').click()
            cy.get('[data-testid="optionsID"] > :nth-child(1) > :nth-child(1)').click()
            cy.get('[data-testid="emailInput"]').type(validEmail)
            cy.get('[data-testid="nummerInput"]').focus().type(randomInteger)
            cy.get('[data-testid="letterInput"]').focus().type(randomLetters)
            cy.get('[data-testid="volgendeBtn-1"]').click()

            cy.get('[data-testid="voornaamInput"]').type(faker.person.firstName())
            cy.get('[data-testid="achternaamInput"]').type(faker.person.lastName())
            cy.get('[data-testid="telInput"]').type(faker.phone.number())
            cy.get('[data-testid="wachtwoordInput"]').type(passwordInput)
            cy.get('[data-testid="wachtwoordBevestigInput"]').type(passwordInput)
            cy.get('[data-testid="volgendeBtn-2"]').click()
        })

        it('Test 1: Geen keuze', () => {
            cy.get('[data-testid="volgendeBtn-3"]').click()

            // assertion
            cy.get('[data-testid="volgendeBtn-3"]').should('be.visible')
        })

        it('Test 2: Klik op meerdere keuzes', () => {
            for (let i = 1; i < 7; i++) {
                cy.get(`[data-testid="omgevingKeuze-${i}"]`).click()
            }
            cy.get('[data-testid="volgendeBtn-3"]').click()

            // assertion
            cy.get('[data-testid="volgendeBtn-4"]').should('be.visible')
        })

        for (let z = 1; z < 7; z++) {
            it(`Test 3.${z}: Probeer elke keuze`, () => {
                cy.get(`[data-testid="omgevingKeuze-${z}"]`).click()
                cy.get('[data-testid="volgendeBtn-3"]').click()

                // assertion
                cy.get('[data-testid="volgendeBtn-4"]').should('be.visible')
            })
        }

    })

    context('Huidige Professionele Situatie', () => {

        beforeEach(() => {
            cy.viewport('iphone-x')
            cy.homeProAppTestBegin()
            cy.get('[data-testid="klusVindBtn"]').click()
            cy.get('[data-testid="tijdelijkeLoginBtn"]').click()
            cy.get('[data-testid="beroepInput"]').click()
            cy.get('[data-testid="optionsID"] > :nth-child(1) > :nth-child(1)').click()
            cy.get('[data-testid="emailInput"]').type(validEmail)
            cy.get('[data-testid="nummerInput"]').focus().type(randomInteger)
            cy.get('[data-testid="letterInput"]').focus().type(randomLetters)
            cy.get('[data-testid="volgendeBtn-1"]').click()

            cy.get('[data-testid="voornaamInput"]').type(faker.person.firstName())
            cy.get('[data-testid="achternaamInput"]').type(faker.person.lastName())
            cy.get('[data-testid="telInput"]').type(faker.phone.number())
            cy.get('[data-testid="wachtwoordInput"]').type(passwordInput)
            cy.get('[data-testid="wachtwoordBevestigInput"]').type(passwordInput)
            cy.get('[data-testid="volgendeBtn-2"]').click()

            cy.get('[data-testid="omgevingKeuze-1"]').click()
            cy.get('[data-testid="volgendeBtn-3"]').click()
        })

        it('Test 1: Geen keuze', () => {
            cy.get('[data-testid="volgendeBtn-4"]').click()

            // assertion
            cy.get('[data-testid="volgendeBtn-4"]').should('be.visible')
        })

        it('Test 2: Klik op meerdere keuzes', () => {
            for (let i = 1; i < 6; i++) {
                cy.get(`[data-testid="situatie-1 Keuze-${i}"]`).click()
            }
            cy.get('[data-testid="volgendeBtn-4"]').click()

            // assertion
            cy.get('[data-testid="volgendeBtn-4"]').should('be.visible')
        })

        for (let z = 1; z < 6; z++) {
            it(`Test 3.${z}: Probeer elke keuze`, () => {
                cy.get(`[data-testid="situatie-1 Keuze-${z}"]`).click()
                cy.get('[data-testid="volgendeBtn-4"]').click()

                // assertion
                cy.get('[data-testid="volgendeBtn-5"]').should('be.visible')
            })
        }

    })

    context('Waarom Mostpros?', () => {

        beforeEach(() => {
            cy.viewport('iphone-x')
            cy.homeProAppTestBegin()
            cy.get('[data-testid="klusVindBtn"]').click()
            cy.get('[data-testid="tijdelijkeLoginBtn"]').click()
            cy.get('[data-testid="beroepInput"]').click()
            cy.get('[data-testid="optionsID"] > :nth-child(1) > :nth-child(1)').click()
            cy.get('[data-testid="emailInput"]').type(validEmail)
            cy.get('[data-testid="nummerInput"]').focus().type(randomInteger)
            cy.get('[data-testid="letterInput"]').focus().type(randomLetters)
            cy.get('[data-testid="volgendeBtn-1"]').click()

            cy.get('[data-testid="voornaamInput"]').type(faker.person.firstName())
            cy.get('[data-testid="achternaamInput"]').type(faker.person.lastName())
            cy.get('[data-testid="telInput"]').type(faker.phone.number())
            cy.get('[data-testid="wachtwoordInput"]').type(passwordInput)
            cy.get('[data-testid="wachtwoordBevestigInput"]').type(passwordInput)
            cy.get('[data-testid="volgendeBtn-2"]').click()

            cy.get('[data-testid="omgevingKeuze-1"]').click()
            cy.get('[data-testid="volgendeBtn-3"]').click()

            cy.get('[data-testid="situatie-1 Keuze-1"]').click()
            cy.get('[data-testid="volgendeBtn-4"]').click()
        })

        it('Test 1: Geen keuze', () => {
            cy.get('[data-testid="volgendeBtn-5"]').click()

            // assertion
            cy.get('[data-testid="volgendeBtn-5"]').should('be.visible')
        })

        it('Test 2: Klik op meerdere keuzes', () => {
            for (let i = 1; i < 5; i++) {
                cy.get(`[data-testid="situatie-2 Keuze-${i}"]`).click()
            }
            cy.get('[data-testid="volgendeBtn-5"]').click()

            // assertion
            cy.get('[data-testid="volgendeBtn-5"]').should('be.visible')
        })

        for (let z = 1; z < 5; z++) {
            it(`Test 3.${z}: Probeer elke keuze`, () => {
                cy.get(`[data-testid="situatie-2 Keuze-${z}"]`).click()
                cy.get('[data-testid="volgendeBtn-5"]').click()

                // assertion
                cy.get('[data-testid="volgendeBtn-6"]').should('be.visible')
            })
        }

    })

    context('Huidige Professionele Situatie ????', () => {

        beforeEach(() => {
            cy.viewport('iphone-x')
            cy.homeProAppTestBegin()
            cy.get('[data-testid="klusVindBtn"]').click()
            cy.get('[data-testid="tijdelijkeLoginBtn"]').click()
            cy.get('[data-testid="beroepInput"]').click()
            cy.get('[data-testid="optionsID"] > :nth-child(1) > :nth-child(1)').click()
            cy.get('[data-testid="emailInput"]').type(validEmail)
            cy.get('[data-testid="nummerInput"]').focus().type(randomInteger)
            cy.get('[data-testid="letterInput"]').focus().type(randomLetters)
            cy.get('[data-testid="volgendeBtn-1"]').click()

            cy.get('[data-testid="voornaamInput"]').type(faker.person.firstName())
            cy.get('[data-testid="achternaamInput"]').type(faker.person.lastName())
            cy.get('[data-testid="telInput"]').type(faker.phone.number())
            cy.get('[data-testid="wachtwoordInput"]').type(passwordInput)
            cy.get('[data-testid="wachtwoordBevestigInput"]').type(passwordInput)
            cy.get('[data-testid="volgendeBtn-2"]').click()

            cy.get('[data-testid="omgevingKeuze-1"]').click()
            cy.get('[data-testid="volgendeBtn-3"]').click()

            cy.get('[data-testid="situatie-1 Keuze-1"]').click()
            cy.get('[data-testid="volgendeBtn-4"]').click()

            cy.get('[data-testid="situatie-2 Keuze-1"]').click()
            cy.get('[data-testid="volgendeBtn-5"]').click()
        })

        it('Test 1: Geen keuze', () => {
            cy.get('[data-testid="volgendeBtn-6"]').click()

            // assertion
            cy.get('[data-testid="volgendeBtn-6"]').should('be.visible')
        })

        it('Test 2: Klik op meerdere keuzes', () => {
            for (let i = 1; i < 6; i++) {
                cy.get(`[data-testid="situatie-3 Keuze-${i}"]`).click()
            }
            cy.get('[data-testid="volgendeBtn-6"]').click()

            // assertion
            cy.get('[data-testid="volgendeBtn-6"]').should('be.visible')
        })

        for (let z = 1; z < 6; z++) {
            it(`Test 3.${z}: Probeer elke keuze`, () => {
                cy.get(`[data-testid="situatie-3 Keuze-${z}"]`).click()
                cy.get('[data-testid="volgendeBtn-6"]').click()

                // assertion
                cy.get('[data-testid="volgendeBtn-7"]').should('be.visible')
            })
        }

    })

    context('Hoeveel Mensen', () => {

        beforeEach(() => {
            cy.viewport('iphone-x')
            cy.homeProAppTestBegin()
            cy.get('[data-testid="klusVindBtn"]').click()
            cy.get('[data-testid="tijdelijkeLoginBtn"]').click()
            cy.get('[data-testid="beroepInput"]').click()
            cy.get('[data-testid="optionsID"] > :nth-child(1) > :nth-child(1)').click()
            cy.get('[data-testid="emailInput"]').type(validEmail)
            cy.get('[data-testid="nummerInput"]').focus().type(randomInteger)
            cy.get('[data-testid="letterInput"]').focus().type(randomLetters)
            cy.get('[data-testid="volgendeBtn-1"]').click()

            cy.get('[data-testid="voornaamInput"]').type(faker.person.firstName())
            cy.get('[data-testid="achternaamInput"]').type(faker.person.lastName())
            cy.get('[data-testid="telInput"]').type(faker.phone.number())
            cy.get('[data-testid="wachtwoordInput"]').type(passwordInput)
            cy.get('[data-testid="wachtwoordBevestigInput"]').type(passwordInput)
            cy.get('[data-testid="volgendeBtn-2"]').click()

            cy.get('[data-testid="omgevingKeuze-1"]').click()
            cy.get('[data-testid="volgendeBtn-3"]').click()

            cy.get('[data-testid="situatie-1 Keuze-1"]').click()
            cy.get('[data-testid="volgendeBtn-4"]').click()

            cy.get('[data-testid="situatie-2 Keuze-1"]').click()
            cy.get('[data-testid="volgendeBtn-5"]').click()

            cy.get('[data-testid="situatie-3 Keuze-1"]').click()
            cy.get('[data-testid="volgendeBtn-6"]').click()
        })

        it('Test 1: Geen keuze', () => {
            cy.get('[data-testid="volgendeBtn-7"]').click()

            // assertion
            cy.get('[data-testid="volgendeBtn-7"]').should('be.visible')
        })

        it('Test 2: Klik op meerdere keuzes', () => {
            for (let i = 1; i < 5; i++) {
                cy.get(`[data-testid="situatie-4 Keuze-${i}"]`).click()
            }
            cy.get('[data-testid="volgendeBtn-7"]').click()

            // assertion
            cy.get('[data-testid="volgendeBtn-7"]').should('be.visible')
        })

        for (let z = 1; z < 5; z++) {
            it(`Test 3.${z}: Probeer elke keuze`, () => {
                cy.get(`[data-testid="situatie-4 Keuze-${z}"]`).click()
                cy.get('[data-testid="volgendeBtn-7"]').click()

                // assertion
                cy.get('[data-testid="volgendeBtn-8"]').should('be.visible')
            })
        }

    })


    const kvkNumber = faker.number.int({ min: 10000000, max: 99999999 })

    // BEDRIJF INFORMATION
    context('Bedrijf Naam', () => {

        beforeEach(() => {
            cy.viewport('iphone-x')
            cy.homeProAppTestBegin()
            cy.get('[data-testid="klusVindBtn"]').click()
            cy.get('[data-testid="tijdelijkeLoginBtn"]').click()
            cy.get('[data-testid="beroepInput"]').click()
            cy.get('[data-testid="optionsID"] > :nth-child(1) > :nth-child(1)').click()
            cy.get('[data-testid="emailInput"]').type(validEmail)
            cy.get('[data-testid="nummerInput"]').focus().type(randomInteger)
            cy.get('[data-testid="letterInput"]').focus().type(randomLetters)
            cy.get('[data-testid="volgendeBtn-1"]').click()

            cy.get('[data-testid="voornaamInput"]').type(faker.person.firstName())
            cy.get('[data-testid="achternaamInput"]').type(faker.person.lastName())
            cy.get('[data-testid="telInput"]').type(faker.phone.number())
            cy.get('[data-testid="wachtwoordInput"]').type(passwordInput)
            cy.get('[data-testid="wachtwoordBevestigInput"]').type(passwordInput)
            cy.get('[data-testid="volgendeBtn-2"]').click()

            cy.get('[data-testid="omgevingKeuze-1"]').click()
            cy.get('[data-testid="volgendeBtn-3"]').click()

            cy.get('[data-testid="situatie-1 Keuze-1"]').click()
            cy.get('[data-testid="volgendeBtn-4"]').click()

            cy.get('[data-testid="situatie-2 Keuze-1"]').click()
            cy.get('[data-testid="volgendeBtn-5"]').click()

            cy.get('[data-testid="situatie-3 Keuze-1"]').click()
            cy.get('[data-testid="volgendeBtn-6"]').click()

            cy.get('[data-testid="situatie-4 Keuze-1"]').click()
            cy.get('[data-testid="volgendeBtn-7"]').click()

            cy.get('[data-testid="kvkInput"]').type(kvkNumber)
        })

        it('Test 1: Typ een bedrijf naam in', () => {
            cy.get('[data-testid="bedrijfInput"]').type(faker.company.name(1))
            cy.get('[data-testid="volgendeBtn-8"]').click()

            // assertion
            cy.get('[data-testid="klusInfoBtn"]').should('be.visible')
        })

        it('Test 2: Typ speciaal random karakters in', () => {
            cy.get('[data-testid="bedrijfInput"]').type(randomSpecialChars)
            cy.get('[data-testid="volgendeBtn-8"]').click()

            // assertion
            cy.get('[data-testid="volgendeBtn-8"]').should('be.visible')
        })

        it('Test 3: Type alleen nummers in', () => {
            cy.get('[data-testid="bedrijfInput"]').type(faker.number.int({ min: 10000000, max: 99999999 }))
            cy.get('[data-testid="volgendeBtn-8"]').click()

            // assertion
            cy.get('[data-testid="volgendeBtn-8"]').should('be.visible')
        })

        it('Test 4: Typ niks in', () => {
            cy.get('[data-testid="volgendeBtn-8"]').click()

            // assertion
            cy.get('[data-testid="volgendeBtn-8"]').should('be.visible')
        })

    })

    context('KVK Nummer', () => {

        beforeEach(() => {
            cy.viewport('iphone-x')
            cy.homeProAppTestBegin()
            cy.get('[data-testid="klusVindBtn"]').click()
            cy.get('[data-testid="tijdelijkeLoginBtn"]').click()
            cy.get('[data-testid="beroepInput"]').click()
            cy.get('[data-testid="optionsID"] > :nth-child(1) > :nth-child(1)').click()
            cy.get('[data-testid="emailInput"]').type(validEmail)
            cy.get('[data-testid="nummerInput"]').focus().type(randomInteger)
            cy.get('[data-testid="letterInput"]').focus().type(randomLetters)
            cy.get('[data-testid="volgendeBtn-1"]').click()

            cy.get('[data-testid="voornaamInput"]').type(faker.person.firstName())
            cy.get('[data-testid="achternaamInput"]').type(faker.person.lastName())
            cy.get('[data-testid="telInput"]').type(faker.phone.number())
            cy.get('[data-testid="wachtwoordInput"]').type(passwordInput)
            cy.get('[data-testid="wachtwoordBevestigInput"]').type(passwordInput)
            cy.get('[data-testid="volgendeBtn-2"]').click()

            cy.get('[data-testid="omgevingKeuze-1"]').click()
            cy.get('[data-testid="volgendeBtn-3"]').click()

            cy.get('[data-testid="situatie-1 Keuze-1"]').click()
            cy.get('[data-testid="volgendeBtn-4"]').click()

            cy.get('[data-testid="situatie-2 Keuze-1"]').click()
            cy.get('[data-testid="volgendeBtn-5"]').click()

            cy.get('[data-testid="situatie-3 Keuze-1"]').click()
            cy.get('[data-testid="volgendeBtn-6"]').click()

            cy.get('[data-testid="situatie-4 Keuze-1"]').click()
            cy.get('[data-testid="volgendeBtn-7"]').click()

            cy.get('[data-testid="bedrijfInput"]').type(faker.company.name(1))
        })

        it('Test 1: Typ een KVK nummer in', () => {
            cy.get('[data-testid="kvkInput"]').type(kvkNumber)

            cy.get('[data-testid="volgendeBtn-8"]').click()

            // assertion
            cy.get('[data-testid="klusInfoBtn"]').should('be.visible')
        })

        it('Test 2: Typ letters in', () => {
            cy.get('[data-testid="kvkInput"]').type(faker.string.alpha({ length: { min: 5, max: 10 } }))
            cy.get('[data-testid="volgendeBtn-8"]').click()

            // assertion
            cy.get('[data-testid="volgendeBtn-8"]').should('be.visible')
        })

        it('Test 3: Typ speciaal karakters in', () => {
            cy.get('[data-testid="kvkInput"]').type(randomSpecialChars)
            cy.get('[data-testid="volgendeBtn-8"]').click()

            // assertion
            cy.get('[data-testid="volgendeBtn-8"]').should('be.visible')
        })

        it('Test 4: Typ niks in', () => {
            cy.get('[data-testid="volgendeBtn-8"]').click()

            // assertion
            cy.get('[data-testid="volgendeBtn-8"]').should('be.visible')
        })

    })

})