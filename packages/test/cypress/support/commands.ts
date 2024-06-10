import { CyPOM } from 'cy-utilities';

export const SitePOM = CyPOM.create({
  NAVIGATE: 'ul.navbar-nav > li.nav-item:nth-child(1) > a.nav-link',
  ITEMS: 'div#tbodyid > div',
  ITEM_1:
    'div#tbodyid > div:nth-child(1) > .card > .card-block > .card-title > .hrefch',
  ITEM_2:
    'div#tbodyid > div:nth-child(2) > .card > .card-block > .card-title > .hrefch',
  ITEM_3:
    'div#tbodyid > div:nth-child(3) > .card > .card-block > .card-title > .hrefch',
  NEXT_ITEMS: 'ul.pagination > li > button#next2',
  PREV_ITEMS: 'ul.pagination > li > button#prev2',
});
