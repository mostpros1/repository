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

Cypress.Commands.add('logout', () => {
  // Implement logout logic here if needed
  // Example:
  // cy.get('.logout-button').click();
  // cy.url().should('include', '/login');
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

  it('should send a message in the chat', () => {
    // Type a message in the input
    cy.get('#message-input').type('Hello, this is a test message{enter}');

    // Verify if the message is visible in the chat box
    cy.get('.message-container').last().contains('Hello, this is a test message');

    // Optionally, add more assertions to validate message sending
  });

  // Add more chat-related tests as needed
});
