describe('Multiple Scenarios Workflow Test', () => {
  beforeEach(() => {
    // Visitar la página de inicio de sesión antes de cada prueba
    cy.visit('https://www.saucedemo.com/')
    // Iniciar sesión con credenciales válidas
    cy.login('standard_user', 'secret_sauce')
  })

  it('should complete the multiple scenarios workflow successfully', () => {

    
     // Change product sort and assert selection
     cy.get('[data-test="product-sort-container"]').select('Price (low to high)');
     cy.get('.product_sort_container').should('have.value', 'lohi');


    
    cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').should('be.visible').click()
    cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').should('be.visible').click()
   
   
    // Verificar que los botones "Remove" estén habilitados para los productos agregados
    cy.get('[data-test="remove-sauce-labs-fleece-jacket"]').should('be.visible')
    cy.get('[data-test="remove-sauce-labs-onesie"]').should('be.visible')



//captura precia de productos del listado
  let OnesiePrice
  cy.get('.inventory_item_description').contains('Sauce Labs Onesie')
  cy.get(':nth-child(1) > [data-test="inventory-item-description"] > .pricebar > [data-test="inventory-item-price"]').should('be.visible').invoke('text').then(price => {
    OnesiePrice = price
  })
  

  let FleeceJacketPrice
  cy.get('.inventory_container').contains('Sauce Labs Fleece Jacket')


  cy.get(':nth-child(6) > [data-test="inventory-item-description"] > .pricebar > [data-test="inventory-item-price"]').should('be.visible').invoke('text').then(price => {
    FleeceJacketPrice = price
  })
 

    //})

    // Verificar que el ícono del carrito muestre un total de 2 productos
    cy.get('.shopping_cart_badge').should('contain.text', '2')

    // Ir al carrito
    cy.get('.shopping_cart_link').click()



 // Capturar los precios de los productos en el carrito

 /*
 cy.get('.cart_item').contains('Sauce Labs Onesie')
 .siblings('.inventory_item_price').invoke('text').then(cartPrice => {
// Comparar el precio del producto en el listado de productos con el precio en el carrito
expect(cartPrice).to.equal(OnesiePrice)
})
*/

   

  
 
    

    })
    Cypress.Commands.add('login', (username, password) => {
      // Introducir credenciales de inicio de sesión y hacer clic en el botón de inicio de sesión
      cy.get('#user-name').type(username)
      cy.get('#password').type(password)
      cy.get('#login-button').click()
    })


  })





