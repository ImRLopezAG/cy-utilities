/**
 * @description A utility class to create a Page Object Model for Cypress tests
 * @param {T} elements - An object with the elements of the Page Object Model
 * @returns {MultiPOM<T>} - A Page Object Model instance
 * @example
 * const SitePOM = MultiPOM.create({
 * LOGIN_FORM: {
 *  FORM: 'form[data-testid="login-form"]',
 *  USERNAME_INPUT: 'input[data-testid="username-input"]',
 *  PASSWORD_INPUT: 'input[data-testid="password-input"]',
 *  SUBMIT_BUTTON: 'button[data-testid="submit-button"]',
 * },
 * SIGNUP_FORM: {
 *  FORM: 'form[data-testid="signup-form"]',
 *  USERNAME_INPUT: 'input[data-testid="username-input"]',
 *  PASSWORD_INPUT: 'input[data-testid="password-input"]',
 *  SUBMIT_BUTTON: 'button[data-testid="submit-button"]',
 * },
 *})
 * SitePOM.getElement('LOGIN_FORM', 'USERNAME_INPUT').type('username')
 * SitePOM.getElement('LOGIN_FORM', 'PASSWORD_INPUT').type('password')
 * SitePOM.getElement('LOGIN_FORM', 'SUBMIT_BUTTON').click()
 * SitePOM.getElement('LOGIN_FORM', 'FORM').should('not.exist')
 * SitePOM.getElement('SIGNUP_FORM', 'USERNAME_INPUT').type('username')
 * SitePOM.getElement('SIGNUP_FORM', 'PASSWORD_INPUT').type('password')
 * SitePOM.getElement('SIGNUP_FORM', 'SUBMIT_BUTTON').click()
 * SitePOM.getElement('SIGNUP_FORM', 'FORM').should('not.exist')
 */
export class MultiPOM<T extends Record<string, Record<string, string>> = {}> {
  #elements: T
  private constructor(elements: T) {
    this.#elements = elements
  }
  /**
   * @description A static method to create a Page Object Model instance
   * @param {T} elements - An object with the elements of the Page Object Model
   * @returns {MultiPOM<T>} - A Page Object Model instance
   * @throws {Error} - If the elements are not an object
   */
  static create<T extends Record<string, Record<string, string>>>(
    elements: T
  ): MultiPOM<T> {
    if (!elements) {
      throw new Error('The elements must be an object')
    }
    return new MultiPOM(elements)
  }
  /**
   * @description A method to get an element from the Page Object Model
   * @param parent - The key of the parent element to get
   * @param child - The key of the child element to get
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>} - The element
   */
  getElement = <U extends KeyOf<T>, K extends NestedKeys<T[U]>>(
    parent: U,
    child: K
  ): Cypress.Chainable<JQuery<HTMLElement>> =>
    cy.get(this.#elements[parent][child])
}
