'use strict';

import Controller from './Controller';
import SideNavController from './SideNavController';

export default class AppController extends Controller {
  constructor() {
    super()
    this.sideNavToggleButton = document.querySelector('.header_toggle-side-nav');
    this.sideNavToggleButton.addEventListener('click', this.toggleSideNav.bind(this));
    this.sideNavController = new SideNavController();
  }

  toggleSideNav() {
    this.sideNavController.toggleSideNav();
  }
}
