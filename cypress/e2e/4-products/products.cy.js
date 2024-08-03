describe("Login Test", () => {
  it("should able to get list of products", () => {
    // Intercept Login API
    cy.intercept("POST", "http://localhost:3000/api/auth/login*").as("login");

    // Intercept Orders API
    cy.intercept("GET", "http://localhost:3000/api/v1/products*").as(
      "getProducts"
    );

    // Visit the login page
    cy.visit("http://localhost:3000/sign-in");

    // Enter email
    cy.get('input[name="email"]').type("administrator@asha.com");

    // Enter password
    cy.get('input[name="password"]').type("secret"); // Replace 'yourPassword' with the actual password

    // Click login button
    cy.get('button[type="submit"]').click();

    // Wait Login
    cy.wait("@login");

    // Redirect to orders page
    cy.visit("http://localhost:3000/products");

    // Wait Orders and assert status code
    cy.wait("@getProducts").its("response.statusCode").should("eq", 200);
  });

  it("should able to show create product modal", () => {
    // Intercept Login API
    cy.intercept("POST", "http://localhost:3000/api/auth/login*").as("login");

    // Intercept Orders API
    cy.intercept("GET", "http://localhost:3000/api/v1/products*").as(
      "getProducts"
    );

    // Visit the login page
    cy.visit("http://localhost:3000/sign-in");

    // Enter email
    cy.get('input[name="email"]').type("administrator@asha.com");

    // Enter password
    cy.get('input[name="password"]').type("secret"); // Replace 'yourPassword' with the actual password

    // Click login button
    cy.get('button[type="submit"]').click();

    // Wait Login
    cy.wait("@login");

    // Redirect to products page
    cy.visit("http://localhost:3000/products");

    // Wait Orders and assert status code
    cy.wait("@getProducts").its("response.statusCode").should("eq", 200);

    // Click create button with text Create Order
    cy.contains("Create Product").click();

    // Assert the form with id id="create-product-form" is visible
    cy.get("#create-product-form").should("be.visible");
  });
});
