describe('Specialist Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/pro-onboarding');
  });

  it('should render the NavBar component', () => {
    cy.get('nav').should('exist');
  });

  it('should render the SpecialistMultistep and SpecialistHome component', () => {
      cy.get('.multistep-viewportTwo').should('exist');
  });

  it('should render the Footer component', () => {
    cy.get('footer').should('exist');
  });

  // Add more detailed tests as needed
  it('should display the How It Works section', () => {
    cy.get('.howItWorksSectionHome').should('be.visible');
    cy.get('.howItWorksTitleHome').should('contain.text', 'Hoe Mostpros Werkt');
  });

  it('should navigate through reviews', () => {
    cy.get('.righthome-arrow').click();
    cy.get('.ReviewCardHomeProfHome').first().should('have.class', 'animate-out');
    cy.wait(400); // Wait for animation
    cy.get('.ReviewCardHomeProfHome').first().should('not.have.class', 'animate-out');

    cy.get('.lefthome-arrow').click();
    cy.get('.ReviewCardHomeProfHome').first().should('have.class', 'animate-out');
    cy.wait(400); // Wait for animation
    cy.get('.ReviewCardHomeProfHome').first().should('not.have.class', 'animate-out');
  });

  it('should display the Join the Community section', () => {
    cy.get('.JoinTheCommunityHomeSection').should('be.visible');
    cy.contains('Kom bij de community').should('be.visible');
  });

  it('should scroll to top on button click', () => {
    cy.scrollTo('bottom');
    cy.get('.CommunityCircleUp').click();
    cy.window().its('scrollY').should('equal', 0);
  });

it('should display an error message for invalid email', () => {
    cy.get('input[type="email"]').type('invalidemail');
    cy.get('.error-message').should('contain', 'Voer alstublieft een geldig e-mailadres in');
});

it('should accept valid email', () => {
    cy.get('input[type="email"]').type('example@example.com');
    cy.get('.error-message').should('not.exist');
});

it('should display an error message for invalid postcode', () => {
    cy.get('input[type="postcode"]').type('123');
    cy.get('.error-message').should('contain', 'Voer alstublieft een geldige postcode in (bijv. 1234AB)');
});

it('should accept valid postcode', () => {
    cy.get('input[type="postcode"]').type('1234AB');
    cy.get('.error-message').should('not.exist');
});

it('should display an error message for invalid stad', () => {
    cy.get('input[placeholder="Plaatsnaam"]').type('1234');
    cy.get('.error-message').should('contain', 'Voer alstublieft een geldige stad in (bijv. Amsterdam)');
});

it('should accept valid stad', () => {
    cy.get('input[placeholder="Plaatsnaam"]').type('Amsterdam');
    cy.get('.error-message').should('not.exist');
});

it('should update fields correctly', () => {
    cy.get('select').select('Loodgieter');
    cy.get('select').should('have.value', 'Loodgieter');

    cy.get('input[type="email"]').clear().type('new@example.com');
    cy.get('input[type="email"]').should('have.value', 'new@example.com');

    cy.get('input[type="postcode"]').clear().type('5678CD');
    cy.get('input[type="postcode"]').should('have.value', '5678CD');

    cy.get('input[placeholder="Plaatsnaam"]').clear().type('Rotterdam');
    cy.get('input[placeholder="Plaatsnaam"]').should('have.value', 'Rotterdam');
});

it('should navigate to login page on clicking "Inloggen"', () => {
    cy.get('.form_login a').click();
    cy.url().should('include', '/login');
});


});
