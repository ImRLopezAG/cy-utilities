/**
 * @description A utility class to create a Page Object Model for Cypress tests
 * @param {T} elements - An object with the elements of the Page Object Model
 * @returns {SinglePOM<T>} - A Page Object Model instance
 */
export class SinglePOM<T extends Record<string, string> = {}> {
  #elements: T
  #origin: string
  private constructor(elements: T, origin: string ='') {
    this.#elements = elements
    this.#origin = origin
  }
  /**
   * @description A static method to create a Page Object Model instance
   * @param {T} elements - An object with the elements of the Page Object Model
   * @returns {SinglePOM<T>} - A Page Object Model instance
   * @throws {Error} - If the elements are not an object
   * @example
   * const SitePOM = SinglePOM.create({
   *  LOGIN_FORM: 'form[data-testid="login-form"]',
   *  USERNAME_INPUT: 'input[data-testid="username-input"]',
   *  PASSWORD_INPUT: 'input[data-testid="password-input"]',
   *  SUBMIT_BUTTON: 'button[data-testid="submit-button"]',
   * })
   * SitePOM.getElement('USERNAME_INPUT').type('username')
   * SitePOM.getElement('PASSWORD_INPUT').type('password')
   * SitePOM.getElement('SUBMIT_BUTTON').click()
   * SitePOM.getElement('LOGIN_FORM').should('not.exist')
   */
  static create<T extends Record<string, string>>(elements: T): SinglePOM<T> {
    if (!elements) {
      throw new Error('The elements must be an object')
    }
    return new SinglePOM(elements)
  }
  /**
   * @description A method to get an element from the Page Object Model
   * @param {KeyOf<T>} element - The key of the element to get
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>} - The element
   * @example
   * SitePOM.getElement('LOGIN_BUTTON').click()
   */
  getElement = (element: KeyOf<T>): Cypress.Chainable<JQuery<HTMLElement>> => {
    if (!(element in this.#elements)) {
      throw new Error(`The element ${element.toLocaleString()} does not exist`)
    }
    return cy.get(this.#elements[element])
  }

  createOriginElement = (origin:string, elements: T): SinglePOM<T> => {
    if (!elements) {
      throw new Error('The elements must be an object')
    }
    return new SinglePOM(elements, origin)
  }

  getOriginElement = (element: KeyOf<T>): Cypress.Chainable<JQuery<HTMLElement>> => {
    if (!(element in this.#elements)) {
      throw new Error(`The element ${element.toLocaleString()} does not exist`)
    }
    return cy.origin(this.#origin, () => cy.get(this.#elements[element]))
  }
}
