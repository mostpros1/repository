describe('Navigatie naar specifieke klussenpagina na omleiding', () => {
    it('Bezoek de omgeleide URL voor "mijn klussen"', () => {
      // Ga naar de hoofdpagina van de website
      cy.visit('https://main.d2j290dx5bs7ht.amplifyapp.com/'); // Bezoek de website
  
      // Bezoek de omgeleide klussenpagina URL
      cy.visit('https://main.d2j290dx5bs7ht.amplifyapp.com/klussen'); // Bezoek de omgeleide klussenpagina URL
  
      // Verifieer of de klussenpagina geladen is na omleiding
      cy.url().should('eq', 'https://main.d2j290dx5bs7ht.amplifyapp.com/klussen'); // Controleer of de URL juist is na omleiding
  
      // Voeg eventueel verdere assertions toe als je specifieke verificaties op deze pagina wilt uitvoeren
    });
  });
  