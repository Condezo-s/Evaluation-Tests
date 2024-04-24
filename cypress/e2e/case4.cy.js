describe('Multiple Scenarios Workflow Test', () => {
  beforeEach(() => {
    // Visitar la página de inicio de sesión antes de cada prueba
    cy.visit('https://www.saucedemo.com/')
    // Iniciar sesión con credenciales válidas
    cy.login('standard_user', 'secret_sauce')
  })

  it('should complete the multiple scenarios workflow successfully', () => {
    // Cambiar la clasificación de productos a "Price (low to high)"
    cy.get('[data-test="product-sort-container"]')
    .contains('Price (low to high)').click()

    // Verificar que la clasificación seleccionada sea "Price (low to high)"
    cy.get('.product_sort_container').should('have.value', 'lohi')

    // Capturar y verificar los precios de los productos en orden ascendente
   // cy.captureAndVerifyPricesInAscendingOrder()

    // Agregar los productos al carrito
    cy.addToCart('Sauce Labs Fleece Jacket')
    cy.addToCart('Sauce Labs Onesie')

    // Verificar que los botones "Remove" estén habilitados para los productos agregados
    cy.checkRemoveButtonsEnabled('Sauce Labs Fleece Jacket')
    cy.checkRemoveButtonsEnabled('Sauce Labs Onesie')

    // Capturar los precios de los productos agregados al carrito
    cy.captureProductPriceFromCart('Sauce Labs Fleece Jacket')
      .as('fleeceJacketPrice')
    cy.captureProductPriceFromCart('Sauce Labs Onesie')
      .as('onesiePrice')

    // Verificar que el ícono del carrito muestre un total de 2 productos
    cy.get('.shopping_cart_badge').should('contain.text', '2')

    // Ir al carrito
    cy.goToCart()

    // Capturar los precios de los productos en el carrito
    cy.captureProductPriceFromCart('Sauce Labs Fleece Jacket')
      .as('fleeceJacketCartPrice')
    cy.captureProductPriceFromCart('Sauce Labs Onesie')
      .as('onesieCartPrice')

    // Verificar los precios de los productos capturados
    cy.get('@fleeceJacketPrice').then(fleeceJacketPrice => {
      cy.get('@fleeceJacketCartPrice').should('eq', fleeceJacketPrice)
    })
    cy.get('@onesiePrice').then(onesiePrice => {
      cy.get('@onesieCartPrice').should('eq', onesiePrice)
    })

    // Remover el producto "Sauce Labs Onesie" del carrito
    cy.removeProductFromCart('Sauce Labs Onesie')

    // Verificar la cantidad de "Sauce Labs Fleece Jacket" en el carrito
    cy.get('.cart_quantity').should('have.text', '1')

    // Verificar que el ícono del carrito muestre un total de 1 producto
    cy.get('.shopping_cart_badge').should('contain.text', '1')

    // Ir a la página de checkout
    cy.checkout()

    // Completar la información de pago con datos aleatorios
    cy.fillCheckoutInfo('John', 'Doe', '12345')

    // Capturar el "Item total" en la página de resumen del pedido
    cy.get('.summary_subtotal_label').invoke('text')
      .as('itemTotal')

    // Continuar con el proceso de compra
    cy.get('#finish').click()

    // Verificar el texto de agradecimiento en la página de finalización del pedido
    cy.get('.complete-header').should('contain.text', 'THANK YOU FOR YOUR ORDER')
    
    // Cerrar sesión
    cy.logout()
  })


  Cypress.Commands.add('login', (username, password) => {
    // Introducir credenciales de inicio de sesión y hacer clic en el botón de inicio de sesión
    cy.get('#user-name').type(username)
    cy.get('#password').type(password)
    cy.get('#login-button').click()
  })


})

