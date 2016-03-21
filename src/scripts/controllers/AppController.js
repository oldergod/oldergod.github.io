'use strict';

import Button from '../views/Button';
import Controller from './Controller';
import SideNavController from './SideNavController';

export default class AppController extends Controller {
  constructor() {
    super()
    this.sideNavToggleButton = new Button(document.querySelector('.header_toggle-side-nav'));

    this.sideNavToggleButton.element.addEventListener('click', this.toggleSideNav.bind(this));
    this.sideNavController = new SideNavController();
  }

  toggleSideNav() {
    this.sideNavController.toggleSideNav();
  }
}
