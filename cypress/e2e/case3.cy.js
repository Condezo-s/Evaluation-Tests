describe('Happy Path Workflow Test', () => {
  beforeEach(() => {
    // Visitar la página de inicio de sesión antes de cada prueba
    cy.visit('https://www.saucedemo.com/')
    // Iniciar sesión con credenciales válidas
    cy.login('standard_user', 'secret_sauce')
  })

  it('should complete the happy path workflow successfully', () => {
    // Agregar un artículo al carrito y completar el proceso de compra
    cy.addToCartAndCompleteCheckout()

    // Cerrar sesión
    cy.logout()

    // Verificar que el usuario haya sido redirigido a la página de inicio de sesión
    cy.url().should('include', '/index.html')
  })
})

Cypress.Commands.add('login', (username, password) => {
  // Introducir credenciales de inicio de sesión y hacer clic en el botón de inicio de sesión
  cy.get('#user-name').type(username)
  cy.get('#password').type(password)
  cy.get('#login-button').click()
})

Cypress.Commands.add('addToCartAndCompleteCheckout', () => {
  // Hacer clic en el botón "Add to Cart" para "Sauce Labs Bike Light"
  cy.get('.inventory_item_name')
    .contains('Sauce Labs Bike Light')
    .siblings('.btn_inventory')
    .click()

  // Hacer clic en el icono del carrito de compras
  cy.get('.shopping_cart_link').click()

  // Hacer clic en el botón "Checkout" en la página del carrito
  cy.get('#checkout').click()

  // Completar la información de pago con datos aleatorios
  cy.get('#first-name').type('John')
  cy.get('#last-name').type('Doe')
  cy.get('#postal-code').type('12345')

  // Hacer clic en el botón "Continue"
  cy.get('#continue').click()

  // Hacer clic en el botón "Finish" en la página de resumen del pedido
  cy.get('#finish').click()
})

Cypress.Commands.add('logout', () => {
  // Hacer clic en el icono del menú
  cy.get('.bm-burger-button').click()

  // Hacer clic en el botón "Logout"
  cy.get('#logout_sidebar_link').click()
})