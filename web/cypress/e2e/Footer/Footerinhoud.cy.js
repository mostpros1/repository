describe('Inhoudsvalidatie van de footer', () => {
    beforeEach(() => {
      cy.visit('https://main.d2j290dx5bs7ht.amplifyapp.com/'); // Vervang met de werkelijke URL van je website
    });
  
    it('Controleer of de belangrijke links in de footer aanwezig zijn', () => {
      cy.get('footer').within(() => {
        // Controleer of belangrijke links aanwezig zijn, bijvoorbeeld Over ons, Contact, Privacybeleid, etc.
        cy.get('a').contains('Over').should('exist');
        cy.get('a').contains('Contact').should('exist');
        cy.get('a').contains('Privacybeleid').should('exist');
        cy.get('a').contains('social').should('exist');
      });
    });
  
    it('Controleer of sociale media-pictogrammen in de footer aanwezig zijn', () => {
      cy.get('footer').within(() => {
        // Controleer of sociale media-pictogrammen aanwezig zijn, bijvoorbeeld Facebook, Twitter, LinkedIn, etc.
        cy.get('.Social').should('exist'); // Vervang '.social-icons' met de juiste selector voor jouw pictogrammen
        // Voeg assertions toe om te controleren of de specifieke pictogrammen aanwezig zijn
      });
    });
  
    it('Controleer of copyright-informatie in de footer aanwezig is', () => {
      cy.get('cpad_wrapper').within(() => {
        // Controleer of copyright-informatie aanwezig is, bijvoorbeeld het jaartal en bedrijfsnaam
        cy.contains('©2023').should('exist'); // Vervang met de juiste copyright-informatie
      });
    });
  
    // Voeg hier andere tests toe voor specifieke inhoudsvalidatie in de footer
  });
  