describe('Happy Path Workflow Test', () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit('https://www.saucedemo.com/')
    //Login with valid credentials
    cy.login('standard_user', 'secret_sauce')
  })

  it('should complete the happy path workflow successfully', () => {
    // Click the "Add to Cart" button for "Sauce Labs Bike Light"
    cy.get('.inventory_item_name')
      .contains('Sauce Labs Bike Light')

      cy.get('button#add-to-cart-sauce-labs-bike-light.btn.btn_primary.btn_small.btn_inventory').scrollIntoView().should('be.visible')

      .click()

    // Click on the shopping cart icon
    cy.get('.shopping_cart_link').click()

    // Click the "Checkout" button on the cart page
    cy.get('#checkout').click()

    // Fill payment information with random data
    cy.get('#first-name').type('David')
    cy.get('#last-name').type('Gomez')
    cy.get('#postal-code').type('12345')

    // Click the "Continue" button
    cy.get('#continue').click()

    // Click the "Finish" button on the order summary page
    cy.get('#finish').click()

    // Click on the menu icon
    cy.get('.bm-burger-button').click()

    // Click the "Logout" button
    cy.get('#logout_sidebar_link').click()

    // Verify that the user has been redirected to the login page
    cy.url().should('include', 'https://www.saucedemo.com/')

  })
})

Cypress.Commands.add('login', (username, password) => {
//Locate text input elements and login button, then enter credentials and click the button
  cy.get('#user-name').type(username)
  cy.get('#password').type(password)
  cy.get('#login-button').click()
})
