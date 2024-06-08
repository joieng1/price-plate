describe("Delete Test Ingredient + Recipe", () => {
    before(() => {
        cy.clearLocalStorageSnapshot();
      });
    
      beforeEach(() => {
        cy.restoreLocalStorage();
      });
    
      afterEach(() => {
        cy.saveLocalStorage();
      });
    
      it("should display the welcome message and navigate to the signup page when clicking 'Get Started'", () => {
        cy.visit("http://localhost:3000");
        cy.contains(
          "Welcome to PricePlate, your everyday food budgeting tool!"
        ).should("be.visible");
        cy.get('[data-test="get-started-button"]').click();
        cy.url().should("include", "/signup");
      });
    
      it("should navigate to the sign-in page when clicking the 'Already have an account' link from the signup page", () => {
        cy.visit("http://localhost:3000");
        cy.get('[data-test="get-started-button"]').click();
        cy.url().should("include", "/signup");
        cy.get('[data-test="sign-in-link"]').click();
        cy.url().should("include", "/login");
      });
    
      it("should login with valid credentials and navigate to /home", () => {
        cy.visit("http://localhost:3000/login");
        cy.get('[data-test="username-input"]').type("Sharan_Krishna");
        cy.get('[data-test="password-input"]').type("hi");
        cy.get('[data-test="login-button"]').click();
        cy.url().should("include", "/home");
      });
    
      it("should navigate to the ingredients page from the home page using the navbar", () => {
        cy.visit("http://localhost:3000/home");
        cy.get("svg").click();
        cy.get('[data-test="ingredients-link"]').click();
        cy.url().should("include", "/ingredients");
        cy.get("body").click(50, 50, { force: true });
      });

      it("should delete the test recipe", () => {
        cy.visit("http://localhost:3000/ingredients");
        cy.get('[data-test = "delete-button"]').click()
      })

      it("should navigate back to the home page", () => {
        cy.visit("http://localhost:3000/ingredients");
        cy.get("svg").click()
        cy.get('[data-test="home-link"]').click(); // Add data-test to the home link in the navbar
        cy.url().should("include", "/home");
        cy.get("body").click(50, 50, { force: true });
      })

      it("should delete the existing recipe", () => {
        cy.visit("http://localhost:3000/home");
        cy.get('[data-test="delete-recipe"]').click()
        
      })
});