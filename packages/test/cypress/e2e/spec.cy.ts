describe('template spec', () => {
  it('passes', () => {
    cy.awaitableCluster([
      () => cy.visit('https://x.com'),
      () => cy.visit('https://github.com'),
    ], 300)
    cy.getByFeature('HOME', 'ITEMS')
  })
})