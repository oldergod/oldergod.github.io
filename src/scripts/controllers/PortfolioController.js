'use strict';

import BookCard from '../models/BookCard';
import Controller from './Controller';
import RouterInstance from '../libs/Router';

export default class PortfolioController extends Controller {
  constructor() {
    super()
    this.loadCSS('/styles/freshhood-portfolio.css').then(() => {
      // this.view.classList.remove('hidden');

      RouterInstance().then((router) => {
        router.add('portfolio',
          () => console.log('portfolio in'),
          () => console.log('portfolio out'),
          () => console.log('portfolio update'));
      });
    });
  }
}
