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
 * SitePOM.get('LOGIN_FORM', 'USERNAME_INPUT').type('username')
 * SitePOM.get('LOGIN_FORM', 'PASSWORD_INPUT').type('password')
 * SitePOM.get('LOGIN_FORM', 'SUBMIT_BUTTON').click()
 * SitePOM.get('LOGIN_FORM', 'FORM').should('not.exist')
 * SitePOM.get('SIGNUP_FORM', 'USERNAME_INPUT').type('username')
 * SitePOM.get('SIGNUP_FORM', 'PASSWORD_INPUT').type('password')
 * SitePOM.get('SIGNUP_FORM', 'SUBMIT_BUTTON').click()
 * SitePOM.get('SIGNUP_FORM', 'FORM').should('not.exist')
 */
export class MultiPOM<T extends Record<string, Record<string, string>> = {}> {
  #elements: Readonly<T>
  #origin: Readonly<string>
  private constructor(elements: T) {
    this.#elements = elements
    this.#origin = ''
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
  get = <U extends KeyOf<T>, K extends NestedKeys<T[U]>>(
    parent: U,
    child: K
  ): Cypress.Chainable<JQuery<HTMLElement>> =>
    cy.get(this.#elements[parent][child])

  
  /**
   * Sets the origin for the MultiPOM instance.
   * @param origin - The origin to set.
   * @returns The updated MultiPOM instance.
   * @throws {Error} If the origin is not a string.
   */
  withOrigin = (origin: string): MultiPOM<T> => {
    if (!origin) {
      throw new Error('The origin must be a string')
    }
    if (this.#origin) return this

    this.#origin = origin
    return this
  }

  /**
   * Retrieves the origin element using the provided parent and child keys.
   * 
   * @template U - The type of the parent key.
   * @template K - The type of the child key.
   * @param {U} parent - The parent key.
   * @param {K} child - The child key.
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>} - A Cypress.Chainable object representing the origin element.
   * @throws {Error} - If the parent or child element does not exist.
   */
  getOriginElement = <U extends KeyOf<T>, K extends NestedKeys<T[U]>>(
    parent: U,
    child: K
  ): Cypress.Chainable<JQuery<HTMLElement>> => {
    if (!(parent in this.#elements)) {
      throw new Error(
        `The parent element ${parent.toLocaleString()} does not exist`
      )
    }
    if (!(child in this.#elements[parent])) {
      throw new Error(
        `The child element ${child.toLocaleString()} does not exist`
      )
    }
    return cy.origin(this.#origin, () => {
      cy.get(this.#elements[parent][child])
    })
  }

  /**
   * Returns the elements of type T.
   *
   * @returns The elements of type T.
   */
  getElements = (): Readonly<T> => this.#elements
}
