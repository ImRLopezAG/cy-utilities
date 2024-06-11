import { SitePOM } from '../support/commands'
describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://demoblaze.com')
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
})
