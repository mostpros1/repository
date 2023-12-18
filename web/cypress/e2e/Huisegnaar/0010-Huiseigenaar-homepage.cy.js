// inlaad van het pagina , zoekt input faild , typt Loodgieter , kiest eerste optie wordt geladen en vologende pagina .
describe('Test website', () => {
    it('should load the website , should  find input faild, should typt and clict first result', () => {
      cy.visit('https://main.d2j290dx5bs7ht.amplifyapp.com/')
      cy.get('input').type('Loodgieter')
    
         // Wacht op de suggestielijst om zichtbaar te worden
      cy.get('.search_dropdown').should('be.visible');

        // Klik op de eerste suggestie in de lijst
      cy.get('.search_dropdown a:first').click();

    })
      
  })
   