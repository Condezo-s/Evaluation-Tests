describe('Failed Login Test', () => {
  beforeEach(() => {
    // Visitar la página de inicio de sesión antes de cada prueba
    cy.visit('https://www.saucedemo.com/')
  })

  it('should fail to login with invalid credentials', () => {
    // Introducir credenciales inválidas
    cy.login('locked_out_user', 'secret_sauce')

    // Verificar que se muestre un mensaje de error de inicio de sesión
    cy.get('.error-message-container').should('be.visible')
      .and('contain.text', 'Epic sadface: Sorry, this user has been locked out.')
  })
})

Cypress.Commands.add('login', (username, password) => {
  // Localizar elementos de entrada de texto y botón de inicio de sesión, luego introducir credenciales y hacer clic en el botón
  cy.get('#user-name').type(username)
  cy.get('#password').type(password)
  cy.get('#login-button').click()
})
