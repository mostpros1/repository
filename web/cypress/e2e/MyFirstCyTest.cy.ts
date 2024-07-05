// Define custom commands for login and logout
Cypress.Commands.add('login', (username, password) => {
  cy.visit("http://localhost:5173/nl/login");
  cy.get('input[placeholder="Bijv. joe@hotmail.com"]').type(username);
  cy.get('input[placeholder="Wachtwoord"]').type(password);
  cy.get('button[type="button"]').contains('Login').click();
  cy.url().should('satisfy', (url) => {
    return url.includes('/homeowner-dashboard') || url.includes('/pro-dashboard');
  });
});

describe('Login Page Tests', () => {
  beforeEach(() => {
    // Clear any existing login session
    cy.clearCookies();
  });

  it('should display the login form', () => {
    // Check if the login form elements are visible
    cy.visit("http://localhost:5173/nl/login");
    cy.get('input[placeholder="Bijv. joe@hotmail.com"]').should('be.visible');
    cy.get('input[placeholder="Wachtwoord"]').should('be.visible');
    cy.get('button[type="button"]').contains('Login').should('be.visible');
  });

  it('should show an error message for invalid credentials', () => {
    // Enter invalid username and password
    cy.visit("http://localhost:5173/nl/login");
    cy.get('input[placeholder="Bijv. joe@hotmail.com"]').type('invalidUser@example.com');
    cy.get('input[placeholder="Wachtwoord"]').type('invalidPass');
    
    // Click the login button
    cy.get('button[type="button"]').contains('Login').click();

    // Check if an error message is displayed
    cy.get('.error-message').should('contain', 'User does not exist.');
  });

  it('should login successfully with valid credentials', () => {
    // Login with valid username and password using custom command
    cy.login('mostprosdemo@gmail.com', 'mostpros');
  });
});

describe('Chat Tests', () => {
  beforeEach(() => {
    // Ensure the user is logged in before each chat test
    cy.login('mostprosdemo@gmail.com', 'mostpros'); // Use the custom login command
    cy.visit("http://localhost:5173/nl/pro-dashboard/chat");
  });

  it('should display the chat interface', () => {
    // Check if chat elements are visible
    cy.get('.chat-container').should('be.visible');
    cy.get('.sidebarr').should('be.visible');
    cy.get('.main-container').should('be.visible');
    cy.get('.chatheader').should('be.visible');
    cy.get('.chat-box').should('be.visible');
    cy.get('.input-form').should('be.visible');
  });

  it('should select a contact and display messages', () => {
    // Click on a contact from the sidebar
    cy.get('.sidebarr').contains('timon.heidenreich').click(); 

    // Assert that the selected contact's messages are displayed in the chat box
    cy.get('.chatheader').should('contain', 'Contact Name'); // Verify selected contact name in chat header
    cy.get('.message-container').should('have.length.gt', 0); // Ensure messages are loaded
  });

  it('should send a message to a selected contact', () => {
    // Select a contact (if not already selected)
    cy.get('.sidebarr').contains('timon.heidenreich').click();

    // Type a message in the input and send
    const message = 'Hello, this is a test message from Cypress';
    cy.get('#message-input').type(`${message}{enter}`);

    // Verify if the message is visible in the chat box
    cy.get('.message-container').last().should('contain', message);
  });

  // Add more chat-related tests as needed
});
