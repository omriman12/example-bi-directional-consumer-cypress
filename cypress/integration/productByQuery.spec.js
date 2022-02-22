const productResponse = require('../fixtures/products.json')

describe('product page', () => {
  beforeEach(() => {
    cy.intercept(
      {
        url: 'http://localhost:3001/products*',
        query: {
          id: '2'
        }
      },
      {
        statusCode: 200,
        body: productResponse,
        headers: { 'access-control-allow-origin': '*' }
      },
    ).as('getProductById')

    cy.visit('http://localhost:3000/products?id=2')
  })

  it.only('displays product item by query', () => {
    cy.usePactWait('getProductById')

    cy.get('.product-item').its('length').should('eq', 3)
  })
})
