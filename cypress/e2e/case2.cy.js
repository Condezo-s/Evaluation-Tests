describe('Failed Login Test', () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit('https://www.saucedemo.com/')
  })

  it('should fail to login with invalid credentials', () => {
    // Enter invalid credentials
    cy.login('locked_out_user', 'secret_sauce')

    // Verify that a login error message is displayed
    cy.get('.error-message-container').should('be.visible')
      .and('contain.text', 'Epic sadface: Sorry, this user has been locked out.')
  })
})

Cypress.Commands.add('login', (username, password) => {
//Locate text input elements and login button, then enter credentials and click the button
  cy.get('#user-name').type(username)
  cy.get('#password').type(password)
  cy.get('#login-button').click()
})
