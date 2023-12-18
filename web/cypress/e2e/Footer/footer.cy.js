describe('Footer aanwezigheidstest', () => {
    it('Controleer of de footer aanwezig is op de webpagina', () => {
      cy.visit('https://main.d2j290dx5bs7ht.amplifyapp.com/'); // Vervang met de werkelijke URL van je website
      
      // Controleer of de footer aanwezig is
      cy.get('footer').should('exist');
    });
  });
  