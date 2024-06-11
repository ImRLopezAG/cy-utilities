import { SiteMultiPOM, SitePOM } from '../support/commands'
describe('template spec', () => {
  beforeEach(() => {
    cy.visit('https://demoblaze.com')
  })
  it('Should work with Single POM', () => {
    cy.awaitableCluster(
      [
        () => SitePOM.getElement('ITEMS').should('have.length', 9),
        () => SitePOM.getElement('NEXT_ITEMS').click(),
        () => SitePOM.getElement('ITEMS').should('have.length', 6),
        () => SitePOM.getElement('PREV_ITEMS').click()
      ],
      200
    )
  })
  it('Should work with Nested POM', () => {
    cy.visit('https://demoblaze.com/cart.html')
    cy.awaitableCluster(
      [
        () => SiteMultiPOM.getElement('CART', 'PLACE_ORDER').click(),
        () =>
          SiteMultiPOM.getElement('CART', 'MODAL_ORDER')
            .should('have.class', 'show')
            .should('have.css', 'display', 'block'),
  
        () => SiteMultiPOM.getElement('CART', 'NAME').type('John Doe'),
        () => SiteMultiPOM.getElement('CART', 'COUNTRY').type('United States'),
        () => SiteMultiPOM.getElement('CART', 'CITY').type('New York'),
        () =>
          SiteMultiPOM.getElement('CART', 'CREDIT_CARD').type(
            '1234567890123456'
          ),
        () => SiteMultiPOM.getElement('CART', 'MONTH').type('12'),
        () => SiteMultiPOM.getElement('CART', 'YEAR').type('2023'),
        () => SiteMultiPOM.getElement('CART', 'PURCHASE').click(),
        () =>
          SiteMultiPOM.getElement('CART', 'SWEET_ALERT')
            .should('have.class', 'visible')
            .should('have.css', 'display', 'block'),
        () => SiteMultiPOM.getElement('CART', 'SWEET_BUTTON').click()
      ])
  })
})
