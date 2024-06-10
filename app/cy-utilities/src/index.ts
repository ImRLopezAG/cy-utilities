Cypress.Commands.addAll({
  /**
   * @description A method to execute a process of steps with a wait time between each step
   * @param {AwaitableProcess<T>} process - The process of steps to execute
   * @param {number} wait - The wait time between each step
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>} - The last element of the process
   * @throws {Error} - If the process is not an array of functions or the wait is not a number
   * @fires ⚠️ Use with caution, this method can slow down the test execution the more steps it has and the longer the wait time is will increase the test duration ⚠️
   * @example
   * cy.awaitableCluster([
   * () => cy.get('button').click(),
   * () => cy.get('input').type('Hello, World!'),
   * () => cy.get('button').click(),
   * ], 1000);
   */
  awaitableCluster: <T>(process: AwaitableProcess<T>, wait: number) => {
    if (!process || !Array.isArray(process)) {
      throw new Error('The process must be an array of functions');
    }
    if (!wait || typeof wait !== 'number') {
      throw new Error('The wait must be a number');
    }
    let chain = cy.wrap(null);
    process.forEach((steps) => {
      chain = chain.then(() => steps()).then(() => cy.wait(wait)) && chain;
    });
    return chain;
  },
});

/**
 * @description A utility class to create a Page Object Model for Cypress tests
 * @param {T} elements - An object with the elements of the Page Object Model
 * @returns {CyPOM<T>} - A Page Object Model instance
 */
export class CyPOM<T extends Record<string, string> = {}> {
  #elements: T;
  private constructor(elements: T) {
    this.#elements = elements;
  }
  /**
   * @description A static method to create a Page Object Model instance
   * @param {T} elements - An object with the elements of the Page Object Model
   * @returns {CyPOM<T>} - A Page Object Model instance
   * @throws {Error} - If the elements are not an object
   * @example
   * const SitePOM = CyPOM.create({
   *  LOGIN_BUTTON: 'button[data-testid="login-button"]',
   *  USERNAME_INPUT: 'input[data-testid="username-input"]',
   *  PASSWORD_INPUT: 'input[data-testid="password-input"]',
   *  SUBMIT_BUTTON: 'button[data-testid="submit-button"]',
   * });
   * SitePOM.getElement('LOGIN_BUTTON').click();
   */
  static create<T extends Record<string, string>>(elements: T): CyPOM<T> {
    if (!elements) {
      throw new Error('The elements must be an object');
    }
    return new CyPOM(elements);
  }
  /**
   * @description A method to get an element from the Page Object Model
   * @param {KeyOf<T>} element - The key of the element to get
   * @returns {Cypress.Chainable<JQuery<HTMLElement>>} - The element
   * @example
   * SitePOM.getElement('LOGIN_BUTTON').click();
   */
  getElement = (element: KeyOf<T>): Cypress.Chainable<JQuery<HTMLElement>> =>
    cy.get(this.#elements[element]);
}

declare global {
  type AwaitableProcess<T> = Array<() => Cypress.Chainer<JQuery<T>>>;
  type KeyOf<T> = {
    [K in keyof T]: T[K] extends any ? K : never;
  }[keyof T];

  type NestedKeys<T> = T extends object
    ? {
        [K in keyof T]: K extends string
          ? T[K] extends string
            ? K
            : NestedKeys<T[K]>
          : never;
      }[keyof T]
    : never;
  namespace Cypress {
    interface Chainable {
      awaitableCluster: (
        process: Array<() => Cypress.Chainable<any>>,
        wait: number
      ) => Cypress.Chainable<JQuery<HTMLElement>>;
    }
  }
}
