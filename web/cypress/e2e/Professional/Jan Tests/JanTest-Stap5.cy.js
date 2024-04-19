
import faker from 'faker';

describe('Testing "Register as specialist"', () => {
    const password = faker.internet.password(); // Maak een wachtwoord dat voor beide wachtwoordvelden zal worden gebruikt
    
    for (let i = 1; i <= 5; i++) {
        it(`type in input - test ${i}`, () => {
            cy.testAgain(); // Zorg ervoor dat je dit commando hebt gedefinieerd in je Cypress commands bestand
            // Functie binnen de it-functie is niet ideaal, plaats performInputCheck buiten de it-functie voor betere structuur
            function performInputCheck() {
                cy.get('input[type="text"]').eq(0).type(faker.name.firstName());//Rendom voornaam wordt in 3de veld ingevuld
                cy.get('input[type="text"]').eq(1).type(faker.name.lastName());//Rendom achternaam wordt in 3de veld ingevuld
                cy.get('input[type="email"]').clear().type(faker.internet.email());//Rendom e-mail wordt in 3de veld ingevuld
                cy.get('input[type="tel"]').clear().type(faker.phone.phoneNumber()); //Rendom telefoon nummer wordt in 3de veld ingevuld
                cy.get('input[type="password"]').eq(0).type(password);//Rendom wachtwoord wordt in 3de veld ingevuld
                cy.get('input[type="password"]').eq(1).type(password);//Rendom wachtwoord wordt in 3de veld ingevuld
                cy.goForward();
                cy.testAgain(); // Aannemend dat dit een custom command is dat je opnieuw wilt uitvoeren
            }

            // Voer inputcheck uit met willekeurige waarden
            performInputCheck();
            
            cy.goForward(); // Aannemend dat dit navigeert naar de volgende pagina van het formulier
        });
    }
});
