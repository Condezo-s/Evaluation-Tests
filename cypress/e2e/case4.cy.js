describe('Multiple Scenarios Workflow Test', () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit('https://www.saucedemo.com/')
    //Login with valid credentials
    cy.login('standard_user', 'secret_sauce')
  })

  it('should complete the multiple scenarios workflow successfully', () => {

    
     // Change product sort and assert selection
     cy.get('[data-test="product-sort-container"]').select('Price (low to high)');
     cy.get('.product_sort_container').should('have.value', 'lohi');


     //add products to cart
    cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').should('be.visible').click()
    cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').should('be.visible').click()
   
   
    // Verify that the "Remove" buttons are enabled for the added products
    cy.get('[data-test="remove-sauce-labs-fleece-jacket"]').should('be.visible')
    cy.get('[data-test="remove-sauce-labs-onesie"]').should('be.visible')



//capture price of products from the list
  

let FleeceJacketPrice
cy.get('.inventory_container').contains('Sauce Labs Fleece Jacket')
cy.get(':nth-child(6) > [data-test="inventory-item-description"] > .pricebar > [data-test="inventory-item-price"]').should('be.visible').invoke('text').then(price => {
  FleeceJacketPrice = price
})


let OnesiePrice
  cy.get('.inventory_container').contains('Sauce Labs Onesie')
  cy.get(':nth-child(1) > [data-test="inventory-item-description"] > .pricebar > [data-test="inventory-item-price"]').should('be.visible').invoke('text').then(price => {
    OnesiePrice = price
  })
  


   // Verify that the cart icon shows a total of 2 products
    cy.get('.shopping_cart_badge').should('contain.text', '2')

    // go to shopping cart
    cy.get('.shopping_cart_link').click()



  // Capture and compare prices of products in the cart

 
  cy.get('[data-test="cart-list"]').contains('Sauce Labs Fleece Jacket')
  cy.get(':nth-child(3) > .cart_item_label > .item_pricebar > [data-test="inventory-item-price"]').invoke('text').then(cartPriceJacket => {
    // Comparar el precio del producto en el listado de productos con el precio en el carrito
    expect(cartPriceJacket).to.equal(FleeceJacketPrice)
    })

    cy.get('[data-test="cart-list"]').contains('Sauce Labs Onesie')
    cy.get(':nth-child(4) > .cart_item_label > .item_pricebar > [data-test="inventory-item-price"]').invoke('text').then(cartPriceOnesie => {
      // Comparar el precio del producto en el listado de productos con el precio en el carrito
      expect(cartPriceOnesie).to.equal(OnesiePrice)
      })
   
    

    // Remove the product "Sauce Labs Onesie" from the cart
    cy.get('[data-test="remove-sauce-labs-onesie"]').click()

    // Check the quantity of "Sauce Labs Fleece Jacket" in the cart
    cy.get('.cart_quantity').should('have.text', '1')

    // Verify that the cart icon shows a total of 1 product
    cy.get('.shopping_cart_badge').should('contain.text', '1')

    // Go to checkout page
    cy.get('[data-test="checkout"]').click()



    // Fill payment information with random data
    cy.get('[data-test="firstName"]').type('Diego')
    cy.get('[data-test="lastName"]').type('Florez')
    cy.get('[data-test="postalCode"]').type('11110')

    cy.get('[data-test="continue"]').click()

    // Capture the "Item total" on the order summary page
    cy.get('.summary_subtotal_label').invoke('text')
      .as('itemTotal')

    // Continue with the purchasing process
    cy.get('#finish').click()

    // finish buying
    cy.get('[data-test="checkout-complete-container"]').contains('Thank you for your order!')

    //return to product list
    cy.get('[data-test="back-to-products"]').click()

    // logout
    cy.get('.bm-burger-button').click()
    cy.get('#logout_sidebar_link').click()


    // Verify that the user has been redirected to the login page
    cy.url().should('include', 'https://www.saucedemo.com/')


    })
    Cypress.Commands.add('login', (username, password) => {
      // Introducir credenciales de inicio de sesión y hacer clic en el botón de inicio de sesión
      cy.get('#user-name').type(username)
      cy.get('#password').type(password)
      cy.get('#login-button').click()
    })


  })





