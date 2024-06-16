/**
 * @description A utility class to create a Page Object Model for Cypress tests
 * @param {T} elements - An object with the elements of the Page Object Model
 * @returns {SinglePOM<T>} - A Page Object Model instance
 */
export class SinglePOM<T extends Record<string, string> = {}> {
  #elements: Readonly<T>
  #origin: Readonly<string>
  /**
   * Represents the constructor of the SinglePOM class.
   * @param elements - The elements to be stored in the SinglePOM instance.
   * @param origin - The origin of the SinglePOM instance.
   */
  private constructor(elements: T) {
    this.#elements = elements
    this.#origin = ''
  }

  /**
   * Creates a new instance of SinglePOM with the provided elements.
   * @param elements - The elements to be associated with the SinglePOM instance.
   * @returns A new instance of SinglePOM.
   * @throws {Error} If the elements parameter is not an object.
   */
  static create<T extends Record<string, string>>(elements: T): SinglePOM<T> {
    if (!elements) {
      throw new Error('The elements must be an object')
    }
    return new SinglePOM(elements)
  }

  /**
   * Retrieves the Cypress.Chainable<JQuery<HTMLElement>> for the specified element.
   * @param element - The key representing the element to retrieve.
   * @returns The Cypress.Chainable<JQuery<HTMLElement>> for the specified element.
   * @throws Error if the specified element does not exist.
   */
  get = <K extends KeyOf<T>>(
    element: K
  ): Cypress.Chainable<JQuery<HTMLElement>> => {
    if (!(element in this.#elements)) {
      throw new Error(`The element ${element.toLocaleString()} does not exist`)
    }
    return cy.get(this.#elements[element])
  }

  /**
   * Retrieves the elements stored in the class instance.
   * @returns {T} The elements stored in the class instance.
   */
  getElements = (): T => this.#elements
}
