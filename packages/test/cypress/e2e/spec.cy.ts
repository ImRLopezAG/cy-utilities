import { SiteMultiPOM, SitePOM } from '../support/commands'
describe('template spec', () => {
  beforeEach(() => {
    cy.visit('https://demoblaze.com')
  })
  it('Should work with Single POM', () => {
    cy.awaitableCluster(
      [
        () => SitePOM.get('ITEMS').should('have.length', 9),
        () => SitePOM.get('NEXT_ITEMS').click(),
        () => SitePOM.get('ITEMS').should('have.length', 6),
        () => SitePOM.get('PREV_ITEMS').click()
      ],
      200
    )
  })
  it('Should work with Nested POM', () => {
    cy.visit('https://demoblaze.com/cart.html')
    cy.awaitableCluster([
      () => SiteMultiPOM.get('CART', 'PLACE_ORDER').click(),
      () =>
        SiteMultiPOM.get('CART', 'MODAL_ORDER')
          .should('have.class', 'show')
          .should('have.css', 'display', 'block'),

      () => SiteMultiPOM.get('CART', 'NAME').type('John Doe'),
      () => SiteMultiPOM.get('CART', 'COUNTRY').type('United States'),
      () => SiteMultiPOM.get('CART', 'CITY').type('New York'),
      () => SiteMultiPOM.get('CART', 'CREDIT_CARD').type('1234567890123456'),
      () => SiteMultiPOM.get('CART', 'MONTH').type('12'),
      () => SiteMultiPOM.get('CART', 'YEAR').type('2023'),
      () => SiteMultiPOM.get('CART', 'PURCHASE').click(),
      () =>
        SiteMultiPOM.get('CART', 'SWEET_ALERT')
          .should('have.class', 'visible')
          .should('have.css', 'display', 'block'),
      () => SiteMultiPOM.get('CART', 'SWEET_BUTTON').click()
    ])
  })
})
