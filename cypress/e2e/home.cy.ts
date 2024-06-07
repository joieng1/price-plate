describe("End-to-End Test Suite", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000");
    });
  
    it("should display the welcome message and navigate to the signup page when clicking 'Get Started'", () => {
      // Check for the welcome message to ensure we are on the right page
      cy.contains('Welcome to PricePlate, your everyday food budgeting tool!').should('be.visible');
  
      // Find and click the "Get Started" button using the data-test attribute
      cy.get('[data-test="get-started-button"]').click();
  
      // Verify that the URL is correct after clicking the button (assuming /signup is the correct path)
      cy.url().should('include', '/signup');
    });
  
    it("should navigate to the sign-in page when clicking the 'Already have an account' link from the signup page", () => {
      // Click the "Get Started" button to navigate to the signup page
      cy.get('[data-test="get-started-button"]').click();
  
      // Verify that the URL is correct after clicking the button (assuming /signup is the correct path)
      cy.url().should('include', '/signup');
  
      // Click the "Already have an account? Click here to sign in" link
      cy.get('[data-test="sign-in-link"]').click();
  
      // Verify that the URL is correct after clicking the link (assuming /login is the correct path)
      cy.url().should('include', '/login');
    });
  
    it("should login with valid credentials and navigate to /home", () => {
      // Visit the login page directly for this test
      cy.visit("http://localhost:3000/login");
  
      // Enter the username
      cy.get('[data-test="username-input"]').type('Sharan_Krishna');
  
      // Enter the password
      cy.get('[data-test="password-input"]').type('hi');
  
      // Submit the login form
      cy.get('[data-test="login-button"]').click();
  
      // Verify that the URL is correct after logging in
      cy.url().should('include', '/home');
    });
  
    it("should display the recipe list and navigate to the recipe card page when clicking 'View' on the first recipe", () => {
      // Visit the home page directly for this test
      cy.visit("http://localhost:3000/home");
  
      // Ensure the recipe page is loaded
      cy.get('[data-test="recipe-page"]').should('be.visible');
  
      // Ensure the first recipe item is present
      cy.get('[data-test="recipe-item-0"]').should('be.visible');
  
      // Click the 'View' button for the first recipe
      cy.get('[data-test="view-button-0"]').click();
  
      // Verify that the URL is correct after clicking the 'View' button (assuming /recipeCard is the correct path)
      cy.url().should('include', '/recipeCard');
    });
  });
  