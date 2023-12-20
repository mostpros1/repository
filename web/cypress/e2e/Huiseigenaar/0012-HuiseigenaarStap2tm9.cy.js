// inlaad van het pagina , zoekt input faild , typt Loodgieter , kiest eerste optie wordt geladen en vologende pagina .
describe('Test website', () => {
    it('should load the website , should  find input faild, should typt and clict first result', () => {
      cy.visit('https://main.d2j290dx5bs7ht.amplifyapp.com/')
      cy.get('input').type('Loodgieter')
    
         // Wacht op de suggestielijst om zichtbaar te worden
      cy.get('.search_dropdown').should('be.visible');
  
        // second page , 001-2
      cy.get('.search_dropdown a:first').click();
      cy.get('.first-input').type("1505");
      cy.get('.second-input').type('WL');
      cy.get('.form-btn').click();
      // stappen van 2 t/m 9 
      cy.get('.repaircards-con > :nth-child(2)')
      cy.get('[type="submit"]').click();
      cy.get('.repaircards-con > :nth-child(3)')
      cy.get('[type="submit"]').click();
      cy.get('.repaircards-con > :nth-child(4)')
      cy.get('[type="submit"]').click();
      cy.get('.repaircards-con > :nth-child(5)')
      cy.get('[type="submit"]').click();
      cy.get('.repaircards-con > :nth-child(2)')
      cy.get('[type="submit"]').click();
      cy.get('.text-field').type('kan ik foto toevoegen ? ')
      cy.get('[type="submit"]').click();
      cy.get('.email-input').type('ll@gg')
      cy.get('[type="submit"]').click();
      // stap 9 van 9 voeg je voonaam, achternaam , Email, telfoonnummer , wachtwoord , HerhaalWachtwoord
      cy.get(':nth-child(1) > input').type('Liza');
      cy.get(':nth-child(2) > input').type('habieab')
      cy.get(':nth-child(3) > input').type('j')
      cy.get(':nth-child(4) > input').type('0645242516')
      cy.get(':nth-child(5) > input').type('xcvxcxvxxv')
      cy.get('.password > input').type('wqwqwqwqwqw')
      

    })
      
  })
   