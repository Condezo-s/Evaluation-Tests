
describe('Successful Login Test', () => {
  beforeEach(() => {
   // Visit the login page before each test
    cy.visit('https://www.saucedemo.com/')
  })

  it('should login successfully with valid credentials', () => {
   //Enter valid credentials
    cy.login('standard_user', 'secret_sauce')

    // Verify that the user is redirected to the product page and the "Add to Cart" button is present
    cy.url().should('include', '/inventory.html')
    cy.get('.btn_inventory').should('exist')
  })
})

Cypress.Commands.add('login', (username, password) => {
//Locate text input elements and login button, then enter credentials and click the button
  cy.get('#user-name').type(username)
  cy.get('#password').type(password)
  cy.get('#login-button').click()
})
