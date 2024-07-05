describe('HomePageTwo', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('should display the correct title', () => {
    cy.get('[data-testid="cypress-title"]').should('contain', 'Vind lokale vakspecialisten');
  });

  it('should have working links in the info bar', () => {
    cy.get('.infoContainerHomeLink').each(($link) => {
      cy.wrap($link).invoke('attr', 'href').should('not.be.empty');
    });
  });

  it('should navigate to sections when clicking on info bar links', () => {
    cy.get('.infoContainerHomeLink').first().click();
    cy.url().should('include', 'pro-overview');

    cy.go('back');
    cy.get('.infoContainerHomeLink').eq(1).click();
    cy.url().should('include', 'jobs-overview');

    cy.go('back');
    cy.get('#homeTextHyper').click();
    cy.get('#HomeProfReviewSectionHome').should('be.visible');
  });

  it('should scroll to top when clicking scroll to top button', () => {
    cy.scrollTo('bottom');
    cy.get('.whyMostProsButtonHome').first().click();
    cy.window().its('scrollY').should('equal', 0);
  });

  it('should display "Hoe Mostpros Werkt" section correctly', () => {
    cy.get('.howItWorksSectionHome').within(() => {
      cy.get('.howItWorksTitleHome').should('contain', 'Hoe Mostpros Werkt');
      cy.get('.howItWorksCardHome').should('have.length', 3);
    });
  });

  it('should display "Waarom Mostpros?" section correctly', () => {
    cy.get('.whyMostProsSectionHome').within(() => {
      cy.get('.howItWorksTitleHome').should('contain', 'Waarom Mostpros?');
      cy.get('.whyMostProsButtonHome').should('be.visible');
      cy.get('.whyMostProsButtonTwoHome').should('be.visible');
    });
  });

  it('should display "All-in-1 Home Services App" section correctly', () => {
    cy.get('.whyMostProsSectionHomeTwo').within(() => {
      cy.get('.howItWorksTitleHome').should('contain', 'All-in-1 Home Services App');
      cy.get('.AppStoreHomeDownload').should('have.attr', 'alt', 'Appstore download');
      cy.get('.PlayStoreHomeDownload').should('have.attr', 'alt', 'PlayStore download');
    });
  });

  it('should display reviews and navigate between them', () => {
    cy.get('.HomeProfReviewSectionHome').within(() => {
      cy.get('.HomeProfReviewWrapper h5').first().should('contain', 'Huiseigenaar');
      cy.get('.HomeProfReviewWrapper h5').last().should('contain', 'Vakspecialist');

      cy.get('.righthome-arrow').click();
      cy.get('.lefthome-arrow').click();
    });
  });

  it('should display "Join The Community" section correctly', () => {
    cy.get('.JoinTheCommunityHomeSection').within(() => {
      cy.get('.JoinTheCommunityH3').should('contain', 'Kom bij de community');
      cy.get('.CommunityTwoHome').should('be.visible');
    });
  });
});
