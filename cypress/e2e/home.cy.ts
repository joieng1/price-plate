import "cypress-localstorage-commands";

describe("Home Page", () => {
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

  it("should navigate to createIngredients from the ingredients page using the create ingredient button", () => {
    cy.visit("http://localhost:3000/ingredients");
    cy.get('[data-test="create-ingredient-button"]').click();
    cy.url().should("include", "/createIngredient");
  });

  it("should fill out the form and submit it to create an ingredient", () => {
    cy.visit("http://localhost:3000/createIngredient");
    cy.get('[data-test="ingredient-name-input"]').type("Test Ingredient");
    cy.get('[data-test="brand-input"]').type("Test Brand");
    cy.get('[data-test="vendor-name-input"]').type("Test Vendor");
    cy.get('[data-test="unit-type-dropdown"]').click();
    cy.get('[data-test="unit-type-g"]').click(); // Select G as unit type
    cy.get('[data-test="num-units"]').click().type("10");
    cy.get('[data-test="price-input"]').type("4"); // Clear the input and then type 4
    cy.get('[data-test="submit-button"]').click();
    cy.contains("Ingredient Created").should("be.visible");
  });

  it("should open the navbar and go back to ingredients to view the ingredient", () => {
    cy.visit("http://localhost:3000/createIngredient");
    cy.get("svg").click();
    cy.get('[data-test="ingredients-link"]').click();
    cy.url().should("include", "/ingredients");
    cy.get("body").click(50, 50, { force: true });
  });

  it("should click the more info button for the created ingredient and navigate back to home page", () => {
    cy.visit("http://localhost:3000/ingredients");
    cy.get('[data-test="more-info-Test Ingredient"]').click();

    cy.get("svg").click(); // Open the navbar
    cy.get('[data-test="home-link"]').click(); // Add data-test to the home link in the navbar
    cy.url().should("include", "/home");
    cy.get("body").click(50, 50, { force: true });
  });

  it("should navigate to the Create Recipe page by clicking the 'Create New Recipe' button", () => {
    cy.visit("http://localhost:3000/home");
    cy.get('[data-test="create-recipe-button"]').click();
    cy.url().should("include", "/createRecipe");
  });

  it("should create a recipe", () => {
    cy.visit("http://localhost:3000/createRecipe");
    // Type recipe name

    cy.get('[data-test="recipe-name-input"]').type("Test Recipe");

    // Select an ingredient
    cy.get('[data-test="checkbox"]').first().click();

    // Enter units for the selected ingredient
    cy.get('[data-test^="unit-input-"]').click().first().type("1");

    // Click the create recipe button
    cy.get('[data-test="create-recipe-button"]').click();

    // Ensure it redirects to the home page after successful recipe creation
    cy.url().should("include", "/home");
  });
  it("should click the view button on the home page", () => {
    cy.visit("http://localhost:3000/home");
    cy.get('[data-test="view"]').click();
  });

  it("should just show the ingredientCard", () => {
    cy.visit("http://localhost:3000/home");
    cy.get("svg").click();
    cy.get('[data-test="ingredients-link"]').click();
    cy.url().should("include", "/ingredients");
    cy.get("body").click(50, 50, { force: true });
    cy.get('[data-test="more-info-Test Ingredient"]').click();
    cy.get('[data-test="Edit"]').click()
  });
});
