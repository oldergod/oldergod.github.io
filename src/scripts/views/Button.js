'use strict';

import MaterialRipple from './MaterialRipple';

export default class Button {
  constructor(element) {
    this.element = element;

    if (this.element.classList.contains(Button.CssClasses_.RIPPLE_EFFECT)) {
      const rippleContainer = document.createElement('span');
      rippleContainer.classList.add(Button.CssClasses_.RIPPLE_CONTAINER);
      this.rippleElement_ = document.createElement('span');
      this.rippleElement_.classList.add(Button.CssClasses_.RIPPLE);
      rippleContainer.appendChild(this.rippleElement_);
      this.element.appendChild(rippleContainer);

      this.ripple = new MaterialRipple(this.element);
    }
  }

  static get CssClasses_() {
    return {
      RIPPLE_EFFECT: 'ripple-effect',
      RIPPLE_CONTAINER: 'ripple-container',
      RIPPLE: 'ripple'
    };
  }
}
