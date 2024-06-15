import { MultiPOM, SinglePOM } from 'cy-utilities'

export const SitePOM = SinglePOM.create({
  NAVIGATE: 'ul.navbar-nav > li.nav-item:nth-child(1) > a.nav-link',
  ITEMS: 'div#tbodyid > div',
  ITEM_1:
    'div#tbodyid > div:nth-child(1) > .card > .card-block > .card-title > .hrefch',
  ITEM_2:
    'div#tbodyid > div:nth-child(2) > .card > .card-block > .card-title > .hrefch',
  ITEM_3:
    'div#tbodyid > div:nth-child(3) > .card > .card-block > .card-title > .hrefch',
  NEXT_ITEMS: 'ul.pagination > li > button#next2',
  PREV_ITEMS: 'ul.pagination > li > button#prev2'
})

export const SiteMultiPOM = MultiPOM.create({
  CART: {
    NAVIGATE: 'ul.navbar-nav > li.nav-item:nth-child(4) > a.nav-link',
    ITEMS_TABLE: 'table.table > tbody > tr',
    PLACE_ORDER: '.col-lg-1 > .btn',
    MODAL_ORDER: '#orderModal',
    TOTAL_MODAL: '#totalm',
    NAME: '#name',
    COUNTRY: '#country',
    CITY: '#city',
    CREDIT_CARD: '#card',
    MONTH: '#month',
    YEAR: '#year',
    PURCHASE: '#orderModal .modal-footer > button:nth-child(2)',
    SWEET_ALERT: '.sweet-alert',
    SWEET_BUTTON: '.confirm'
  },
  HOME: {
    NAVIGATE: 'ul.navbar-nav > li.nav-item:nth-child(1) > a.nav-link',
    ITEMS: 'div#tbodyid > div',
    ITEM_1:
      'div#tbodyid > div:nth-child(1) > .card > .card-block > .card-title > .hrefch',
    ITEM_2:
      'div#tbodyid > div:nth-child(2) > .card > .card-block > .card-title > .hrefch',
    ITEM_3:
      'div#tbodyid > div:nth-child(3) > .card > .card-block > .card-title > .hrefch',
    NEXT_ITEMS: 'ul.pagination > li > button#next2',
    PREV_ITEMS: 'ul.pagination > li > button#prev2'
  }
})

export const SiteOriginPOM = SitePOM.withOrigin('http://localhost:3000')