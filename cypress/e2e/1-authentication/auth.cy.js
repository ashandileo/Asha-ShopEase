describe("Login Test", () => {
  it("should login with valid credentials", () => {
    // Intercept Login API
    cy.intercept("POST", "http://localhost:3000/api/auth/login").as("login");

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

    // Assert the user is redirected to the dashboard
    cy.url().should("include", "/dashboard");

    // Assert the presence of a dashboard element
    cy.contains("Dashboard").should("be.visible");
  });

  it("should not login with invalid credentials", () => {
    // Intercept Login API
    cy.intercept("POST", "http://localhost:3000/api/auth/login").as("login");

    // Visit the login page
    cy.visit("http://localhost:3000/sign-in");

    // Enter wrong email
    cy.get('input[name="email"]').type("administrator123@asha.com");

    // Enter wrong password
    cy.get('input[name="password"]').type("secret123");

    // Click login button
    cy.get('button[type="submit"]').click();

    // Wait Login
    cy.wait("@login");

    // Assert the user is not redirected to the dashboard
    cy.url().should("not.include", "/dashboard");
  });
});
