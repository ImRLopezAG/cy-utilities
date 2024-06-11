# Cypress Utilities

A collection of utilities that can be used to help with testing using Cypress, the tool provides
a lot of features out of the box, but sometimes we need to extend it to make it more powerful.

## Installation

To install the utilities, you can use the following command:

```bash
npm install --save-dev cy-utilities
```

```bash
pnpm add --save-dev cy-utilities
```

```bash
yarn add --dev cy-utilities
```

```bash
bun add --dev cy-utilities
```

## Usage

To use the utilities, you need to import the functions you want to use in your test files, for example:

```javascript
// cypress/support/e2e.js
import 'cy-utilities'
```

```javascript
// cypress/support/(your-file or your-folder)/*.js
import { SinglePOM, MultiPOM } from 'cy-utilities'

export const SitePOM = SinglePOM.create({
  ITEMS: 'div#tbodyid > div',
  ITEM_1: 'div#tbodyid > div:nth-child(1)',
  ITEM_2: 'div#tbodyid > div:nth-child(2)',
  ITEM_3: 'div#tbodyid > div:nth-child(3)',
  NEXT_ITEMS: 'ul.pagination > li > button#next2',
  PREV_ITEMS: 'ul.pagination > li > button#prev2'
})


```

```javascript
// cypress/e2e/your-test.spec.js
import { SitePOM } from '../support/(your-file or your-folder)/*.js';

describe('Test', () => {
  it('should do something', () => {
    cy.visit('https://example.com');
    SitePOM.getElement('ITEMS').should('have.length', 3);
    SitePOM.getElement('ITEM_1').should('have.text', 'Item 1');
    SitePOM.getElement('ITEM_2').should('have.text', 'Item 2');
    SitePOM.getElement('ITEM_3').should('have.text', 'Item 3');
    SitePOM.getElement('NEXT_ITEMS').click();
    SitePOM.getElement('PREV_ITEMS').click();
  });
  it('should do something with the command', () => {
    cy.visit('https://example.com');
    // it will wait for each command to finish before executing the next one the quantity of milliseconds is the second parameter
    cy.awaitableCluster([
      () => SitePOM.getElement('ITEMS').should('have.length', 3);
      () => SitePOM.getElement('ITEM_1').should('have.text', 'Item 1');
      () => SitePOM.getElement('ITEM_2').should('have.text', 'Item 2');
      () => SitePOM.getElement('ITEM_3').should('have.text', 'Item 3');
      () => SitePOM.getElement('NEXT_ITEMS').click();
      () => SitePOM.getElement('PREV_ITEMS').click();
    ], 200)
  });
});

```

> [!Warning]
> You must be careful with the time and the quantity of commands you are going to execute, if you have a lot of commands and the time is too long, you can slow down the test execution.

```javascript
// cypress/e2e/your-test.spec.js
import { SitePOM } from '../support/(your-file or your-folder)/*.js';

describe('Test', () => {
  it('should do something with the command', () => {
    cy.visit('https://example.com');
    // it will wait for each command to finish before executing the next one the quantity of milliseconds is the second parameter
    cy.awaitableCluster([
      () => SitePOM.getElement('ITEMS').should('have.length', 3);
      () => SitePOM.getElement('ITEM_1').should('have.text', 'Item 1');
      () => SitePOM.getElement('ITEM_2').should('have.text', 'Item 2');
      () => SitePOM.getElement('ITEM_3').should('have.text', 'Item 3');
      () => SitePOM.getElement('NEXT_ITEMS').click();
      () => SitePOM.getElement('PREV_ITEMS').click();
    ], 200)
  });
});
```

### 🛠️ Tools

[![Typescript](https://img.shields.io/badge/Typescript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Cypress](https://img.shields.io/badge/Cypress-17202C?logo=cypress&logoColor=white)](https://www.cypress.io/)
[![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=white)](https://prettier.io/)
[![NodeJS](https://img.shields.io/badge/NodeJS-339933?logo=node.js&logoColor=white)](https://nodejs.org/es/)

## Authors

[![ImRLopezAG](https://img.shields.io/badge/ImRLopezAG-000000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ImRLopezAG)

## 🔗 Links

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://imrlopez.vercel.app)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/angel-gabriel-lopez/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/imr_lopez)
