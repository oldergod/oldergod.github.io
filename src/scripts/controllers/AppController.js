'use strict';

import Button from '../components/Button';
import Controller from './Controller';
import SideNav from '../components/SideNav';

export default class AppController extends Controller {
  constructor() {
    super()
    this.appModel = null;
    this.sideNavToggleButton = new Button(document.querySelector('.header_toggle-side-nav'));

    this.sideNavToggleButton.element.addEventListener('click', this.toggleSideNav.bind(this));
    this.sideNav = new SideNav();

    // Wait for the first frame because sometimes
    // window.onload fires too quickly.
    requestAnimationFrame(() => {
      this.loadScript('/scripts/freshhood-books.js');
      this.loadScript('/scripts/freshhood-portfolio.js');
      // this.loadScript('/scripts/freshhood-portfolio.js');

      this.sideNavToggleButton.element.addEventListener('click', () => {
        this.toggleSideNav();
      });
    });
  }

  toggleSideNav() {
    this.sideNav.toggle();
  }
}
