

export declare global {
  export type AwaitableProcess<T> = Array<() => Cypress.Chainer<JQuery<T>>>;
  export type KeyOf<T> = {
    [K in keyof T]: T[K] extends any ? K : never;
  }[keyof T];
  type NestedKeys<T> = {
    [K in keyof T]: K extends string
      ? T[K] extends string
        ? K
        : NestedKeys<T[K]>
      : never;
  }[keyof T];
  namespace Cypress {
    interface Chainable {
      /**
       * @description A method to execute a process of steps with a wait time between each step
       * @param {AwaitableProcess<T>} process - The process of steps to execute
       * @param {number} wait - The wait time between each step iteration in milliseconds
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
      awaitableCluster: (
        process: Array<() => Cypress.Chainable<any>>,
        wait: number
      ) => Cypress.Chainable<JQuery<HTMLElement>>;
    }
  }
}
