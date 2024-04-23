
describe('Successful Login Test', () => {
  beforeEach(() => {
    // Visitar la página de inicio de sesión antes de cada prueba
    cy.visit('https://www.saucedemo.com/')
  })

  it('should login successfully with valid credentials', () => {
    // Introducir credenciales válidas
    cy.login('standard_user', 'secret_sauce')

    // Verificar que el usuario sea redirigido a la página de productos y el botón "Agregar al carrito" esté presente
    cy.url().should('include', '/inventory.html')
    cy.get('.btn_inventory').should('exist')
  })
})

Cypress.Commands.add('login', (username, password) => {
  // Localizar elementos de entrada de texto y botón de inicio de sesión, luego introducir credenciales y hacer clic en el botón
  cy.get('#user-name').type(username)
  cy.get('#password').type(password)
  cy.get('#login-button').click()
})
