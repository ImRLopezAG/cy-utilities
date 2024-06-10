export const FEATURES: Record<string, Record<string, string>> = Cypress.env('FEATURES');
Cypress.Commands.addAll({
  /**
   * This function will execute a list of functions in a chain and wait for a specific time to make most of the process more stable and natural
   * @fires YOU MUST BE CAREFUL WITH THE WAIT TIME, IF YOU PUT A BIGGER TIME THAN THE PROCESS NEEDS, THE TEST WILL BE SLOWER AND REMOVE THE MOST  FUNCTION YOU HAVE THE MOST TIME YOU WILL WAIT
   * @param process
   * @param wait
   * @returns
   */
  getByFeature: <T extends KeyOf<FEATURES>, K extends KeyOf<FEATURES[T]>>(
    feature: T,
    element: K
  ) => {
    if (!FEATURES) {
      throw new Error('The features are not defined in cypress.env.json');
    }
    if (!FEATURES[feature]) {
      throw new Error(`The feature ${feature} does not exist`);
    }
    if (!FEATURES[feature][element]) {
      throw new Error(`The element ${element} does not exist in ${feature}`);
    }
    const selector = FEATURES[feature][element];
    return cy.get(selector);
  },
  /**
   * Get the element by feature and element, the feature must be a key of FEATURES and the element must be a key of the feature
   * to configure the features go to cypress.env.json
   * @param feature
   * @param element
   * @returns
   * @example
   * cy.getByFeature('HOME', 'ITEMS')
   * cy.getByFeature('HOME', 'NAVIGATE')
   * cy.getByFeature('HOME', 'NEXT_ITEMS')
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



declare global {
  type AwaitableProcess<T> = Array<() => Cypress.Chainer<JQuery<T>>>;

  export type FEATURES = typeof FEATURES;
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

  export type FEATURES_ELEMENTS = KeyOf<FEATURES>;
  export type FEATURES_ELEMENTS_KEYS<K extends FEATURES_ELEMENTS> = NestedKeys<
    FEATURES[K]
  >;
  namespace Cypress {
    interface Chainable {
      /**
       * Get the element by feature and element, the feature must be a key of FEATURES and the element must be a key of the feature
       * to configure the features go to cypress.env.json
       * @param feature
       * @param element
       * @returns
       * @example
       * cy.getByFeature('HOME', 'ITEMS')
       * cy.getByFeature('HOME', 'NAVIGATE')
       * cy.getByFeature('HOME', 'NEXT_ITEMS')
       */
      getByFeature: <K extends FEATURES_ELEMENTS>(
        feature: K,
        element: FEATURES_ELEMENTS_KEYS<K>
      ) => Cypress.Chainable<JQuery<HTMLElement>>;
      /**
       * This function will execute a list of functions in a chain and wait for a specific time to make most of the process more stable and natural
       * @fires YOU MUST BE CAREFUL WITH THE WAIT TIME, IF YOU PUT A BIGGER TIME THAN THE PROCESS NEEDS, THE TEST WILL BE SLOWER AND REMOVE THE MOST  FUNCTION YOU HAVE THE MOST TIME YOU WILL WAIT
       * @param process
       * @param wait
       * @returns
       */
      awaitableCluster: (
        process: Array<() => Cypress.Chainable<any>>,
        wait: number
      ) => Cypress.Chainable<JQuery<HTMLElement>>;
    }
  }
}
