'use strict';

import Controller from './Controller';

export default class AppController extends Controller {
  constructor() {
    super()
    this.sideNavToggleButton = document.querySelector('.header_toggle-side-nav');
    this.sideNav = document.querySelector('.side-nav');
    this.sideNavContent = this.sideNav.querySelector('.side-nav_content');

    this.sideNavToggleButton.addEventListener('click', this.toggleSideNav.bind(this));
    this.sideNav.addEventListener('click', this.closeSideNav.bind(this));
    this.sideNavContent.addEventListener('click', (e) => e.stopPropagation());
  }

  toggleSideNav() {
    if (this.sideNav.classList.contains('side-nav__visible')) {
      this.closeSideNav();
    } else {
      this.showSideNav();
    }
  }

  closeSideNav() {
    requestAnimationFrame(() => {
      this.sideNav.classList.remove('side-nav__visible');
      this.sideNavContent.classList.remove('side-nav_content_visible');
    });
  }

  showSideNav() {
    requestAnimationFrame(() => {
      this.sideNav.classList.add('side-nav__visible');
      this.sideNavContent.classList.add('side-nav_content_visible');
    });
  }
}
