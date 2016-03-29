/*! (c) 2016 Benoit Quenaudon (MIT) */
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MaterialRipple = require('./MaterialRipple');

var _MaterialRipple2 = _interopRequireDefault(_MaterialRipple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Button = function () {
  function Button(element) {
    _classCallCheck(this, Button);

    this.element = element;

    if (this.element.classList.contains(Button.CssClasses_.RIPPLE_EFFECT)) {
      var rippleContainer = document.createElement('span');
      rippleContainer.classList.add(Button.CssClasses_.RIPPLE_CONTAINER);
      this.rippleElement_ = document.createElement('span');
      this.rippleElement_.classList.add(Button.CssClasses_.RIPPLE);
      rippleContainer.appendChild(this.rippleElement_);
      this.element.appendChild(rippleContainer);

      this.ripple = new _MaterialRipple2.default(this.element);
    }
  }

  _createClass(Button, null, [{
    key: 'CssClasses_',
    get: function get() {
      return {
        RIPPLE_EFFECT: 'ripple-effect',
        RIPPLE_CONTAINER: 'ripple-container',
        RIPPLE: 'ripple'
      };
    }
  }]);

  return Button;
}();

exports.default = Button;

},{"./MaterialRipple":2}],2:[function(require,module,exports){
'use strict';
/**
 * Class constructor for Ripple MDL component.
 * Implements MDL component design pattern defined at:
 * https://github.com/jasonmayes/mdl-component-design-pattern
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MaterialRipple = function () {
  /**
   * @constructor
   * @param {HTMLElement} element The element that will be upgraded.
   */

  function MaterialRipple(element) {
    _classCallCheck(this, MaterialRipple);

    this.element_ = element;
    // Initialize instance.
    this.init();
  }

  /**
   * Store constants in one place so they can be updated easily.
   *
   * @enum {string | number}
   * @private
   */


  _createClass(MaterialRipple, [{
    key: 'downHandler_',


    /**
     * Handle mouse / finger down on element.
     *
     * @param {Event} event The event that fired.
     * @private
     */
    value: function downHandler_(event) {
      if (!this.rippleElement_.style.width && !this.rippleElement_.style.height) {
        var rect = this.element_.getBoundingClientRect();
        this.boundHeight = rect.height;
        this.boundWidth = rect.width;
        this.rippleSize_ = Math.sqrt(rect.width * rect.width + rect.height * rect.height) * 2 + 2;
        this.rippleElement_.style.width = this.rippleSize_ + 'px';
        this.rippleElement_.style.height = this.rippleSize_ + 'px';
      }
      this.rippleElement_.classList.add(MaterialRipple.CssClasses_.IS_VISIBLE);
      if (event.type === 'mousedown' && this.ignoringMouseDown_) {
        this.ignoringMouseDown_ = false;
      } else {
        if (event.type === 'touchstart') {
          this.ignoringMouseDown_ = true;
        }
        var frameCount = this.getFrameCount();
        if (frameCount > 0) {
          return;
        }
        this.setFrameCount(1);
        var bound = event.currentTarget.getBoundingClientRect();
        var x = void 0;
        var y = void 0;
        // Check if we are handling a keyboard click.
        if (event.clientX === 0 && event.clientY === 0) {
          x = Math.round(bound.width / 2);
          y = Math.round(bound.height / 2);
        } else {
          var clientX = event.clientX ? event.clientX : event.touches[0].clientX;
          var clientY = event.clientY ? event.clientY : event.touches[0].clientY;
          x = Math.round(clientX - bound.left);
          y = Math.round(clientY - bound.top);
        }
        this.setRippleXY(x, y);
        this.setRippleStyles(true);
        window.requestAnimationFrame(this.animFrameHandler.bind(this));
      }
    }

    /**
     * Handle mouse / finger up on element.
     *
     * @param {Event} event The event that fired.
     * @private
     */

  }, {
    key: 'upHandler_',
    value: function upHandler_(event) {
      var _this = this;

      // Don't fire for the artificial "mouseup" generated by a double-click.
      if (event && event.detail !== 2) {
        this.rippleElement_.classList.remove(MaterialRipple.CssClasses_.IS_VISIBLE);
      }
      // Allow a repaint to occur before removing this class, so the animation
      // shows for tap events, which seem to trigger a mouseup too soon after
      // mousedown.
      requestAnimationFrame(function () {
        _this.rippleElement_.classList.remove(MaterialRipple.CssClasses_.IS_VISIBLE);
      });
    }

    /**
     * Initialize element.
     */

  }, {
    key: 'init',
    value: function init() {
      if (this.element_) {
        this.rippleElement_ = this.element_.querySelector('.' + MaterialRipple.CssClasses_.RIPPLE);
        this.frameCount_ = 0;
        this.rippleSize_ = 0;
        this.x_ = 0;
        this.y_ = 0;
        // Touch start produces a compat mouse down event, which would cause a
        // second ripples. To avoid that, we use this property to ignore the first
        // mouse down after a touch start.
        this.ignoringMouseDown_ = false;
        this.boundDownHandler = this.downHandler_.bind(this);
        this.element_.addEventListener('mousedown', this.boundDownHandler);
        this.element_.addEventListener('touchstart', this.boundDownHandler);
        this.boundUpHandler = this.upHandler_.bind(this);
        this.element_.addEventListener('mouseup', this.boundUpHandler);
        this.element_.addEventListener('mouseleave', this.boundUpHandler);
        this.element_.addEventListener('touchend', this.boundUpHandler);
        this.element_.addEventListener('blur', this.boundUpHandler);
        /**
         * Getter for frameCount_.
         * @return {number} the frame count.
         */
        this.getFrameCount = function () {
          return this.frameCount_;
        };
        /**
         * Setter for frameCount_.
         * @param {number} fC the frame count.
         */
        this.setFrameCount = function (fC) {
          this.frameCount_ = fC;
        };
        /**
         * Getter for rippleElement_.
         * @return {Element} the ripple element.
         */
        this.getRippleElement = function () {
          return this.rippleElement_;
        };
        /**
         * Sets the ripple X and Y coordinates.
         * @param{number} newX the new X coordinate
         * @param{number} newY the new Y coordinate
         */
        this.setRippleXY = function (newX, newY) {
          this.x_ = newX;
          this.y_ = newY;
        };
        /**
         * Sets the ripple styles.
         * @param{boolean} start whether or not this is the start frame.
         */
        this.setRippleStyles = function (start) {
          if (this.rippleElement_ !== null) {
            var scale = void 0;
            var size = void 0;
            var offset = 'translate(' + this.x_ + 'px, ' + this.y_ + 'px)';
            if (start) {
              scale = MaterialRipple.Constant_.INITIAL_SCALE;
              size = MaterialRipple.Constant_.INITIAL_SIZE;
            } else {
              scale = MaterialRipple.Constant_.FINAL_SCALE;
              size = this.rippleSize_ + 'px';
            }
            var transformString = 'translate(-50%, -50%) ' + offset + scale;
            this.rippleElement_.style.webkitTransform = transformString;
            this.rippleElement_.style.msTransform = transformString;
            this.rippleElement_.style.transform = transformString;
            if (start) {
              this.rippleElement_.classList.remove(MaterialRipple.CssClasses_.IS_ANIMATING);
            } else {
              this.rippleElement_.classList.add(MaterialRipple.CssClasses_.IS_ANIMATING);
            }
          };
          /**
           * Handles an animation frame.
           */
          this.animFrameHandler = function () {
            if (this.frameCount_-- > 0) {
              window.requestAnimationFrame(this.animFrameHandler.bind(this));
            } else {
              this.setRippleStyles(false);
            }
          };
        };
      }
    }

    /**
     * Downgrade the component
     *
     * @private
     */

  }, {
    key: 'mdlDowngrade_',
    value: function mdlDowngrade_() {
      this.element_.removeEventListener('mousedown', this.boundDownHandler);
      this.element_.removeEventListener('touchstart', this.boundDownHandler);
      this.element_.removeEventListener('mouseup', this.boundUpHandler);
      this.element_.removeEventListener('mouseleave', this.boundUpHandler);
      this.element_.removeEventListener('touchend', this.boundUpHandler);
      this.element_.removeEventListener('blur', this.boundUpHandler);
    }
  }], [{
    key: 'Constant_',
    get: function get() {
      return {
        INITIAL_SCALE: 'scale(0.0001, 0.0001)',
        INITIAL_SIZE: '1px',
        INITIAL_OPACITY: '0.4',
        FINAL_OPACITY: '0',
        FINAL_SCALE: ''
      };
    }

    /**
     * Store strings for class names defined by this component that are used in
     * JavaScript. This allows us to simply change it in one place should we
     * decide to modify at a later date.
     *
     * @enum {string}
     * @private
     */

  }, {
    key: 'CssClasses_',
    get: function get() {
      return {
        RIPPLE: 'ripple',
        IS_ANIMATING: 'is-animating',
        IS_VISIBLE: 'is-visible'
      };
    }
  }]);

  return MaterialRipple;
}();

exports.default = MaterialRipple;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BookCard = require('../models/BookCard');

var _BookCard2 = _interopRequireDefault(_BookCard);

var _Button = require('../components/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Router = require('../libs/Router');

var _Router2 = _interopRequireDefault(_Router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SideNav = function () {
  function SideNav() {
    _classCallCheck(this, SideNav);

    this.sideNav = document.querySelector('.side-nav');
    this.sideNavContent = this.sideNav.querySelector('.side-nav_content');

    this.sideNav.addEventListener('click', this.hide.bind(this));
    this.sideNavContent.addEventListener('click', function (e) {
      return e.stopPropagation();
    });

    // binding
    this.onSideNavTransitionEnd = this.onSideNavTransitionEnd.bind(this);

    this.navToBooksButton = new _Button2.default(document.querySelector('.side-nav_nav-to-books'));
    this.navToBooksButton.element.addEventListener('click', this.navToBooks.bind(this));
    this.navToPortfolioButton = new _Button2.default(document.querySelector('.side-nav_nav-to-portfolio'));
    this.navToPortfolioButton.element.addEventListener('click', this.navToPortfolio.bind(this));

    this.books = [{
      id: 1,
      title: 'Wizard: The Life And Times of Nikola Tesla',
      author: 'Marc J. Seifer',
      image_url: 'http://ecx.images-amazon.com/images/I/51swx1Gl%2BML._SX323_BO1,204,203,200_.jpg',
      description: 'Nikola Tesla (1856-1943), credited as the inspiration for radio, robots, and even radar, has been called the patron saint of modern electricity. Based on original material and previously unavailable documents, this acclaimed book is the definitive biography of the man considered by many to be the founding father of modern electrical technology. Among Tesla\'s creations were the channeling of alternating current, fluorescent and neon lighting, wireless telegraphy, and the giant turbines that harnessed the power of Niagara Falls.'
    }, {
      id: 2,
      title: 'Jean Moulin',
      author: 'Jean-Pierre Azema',
      image_url: 'http://ecx.images-amazon.com/images/I/41tTzS1Ts%2BL._SX304_BO1,204,203,200_.jpg',
      description: 'Le Jean Moulin d\'Azéma fait aujourd\'hui référence comme il a recueilli les suffrages de la critique à sa parution. Car, au-delà d\'une biographie politique, Jean-Pierre Azéma a su retracer l\'histoire de la France libre jusqu\'en 1943, de la Résistance intérieure et des relations complexes entre Londres, Washington et Alger. En combinant archives, récits, explications et témoignages, il brosse aussi l\'aventure singulière d\'un homme à la fois semblable à tant de ses contemporains et dont l\'entreprise le hisse jusqu\'à incarner le héros de la Résistance pour plusieurs générations de Français. Jean-Pierre Azéma, professeur à Sciences-Po, a notamment publié De Munich à la Libération, L\'Année 1940 et Vichy.'
    }, {
      id: 3,
      title: 'Des Gens Tres Bien',
      author: 'Alexande Jardin',
      image_url: 'http://ecx.images-amazon.com/images/I/515raxjXnqL._SX307_BO1,204,203,200_.jpg',
      description: 'Tandis que mon père s\'endort peu à peu contre moi, je lui parle une dernière fois : Plus tard, tu ne pourras pas vivre avec le secret des Jardin. Il te tuera... Tu feras un livre, Le Nain jaune, pour le camoufler. Au même âge que toi, j\'en ferai un, Des gens très bien, pour l\'exposer. Et je vivrai la dernière partie de ta vie... La mienne. Dors mon petit papa, dors... Ce livre aurait pu s\'appeler "fini de rire". C\'est le carnet de bord de ma lente lucidité.'
    }, {
      id: 4,
      title: 'The Autobiography of Benjamin Franklin',
      author: 'Benjamin Franklin',
      image_url: 'http://ecx.images-amazon.com/images/I/51MxjDM80-L._SX310_BO1,204,203,200_.jpg',
      description: 'Blessed with enormous talents and the energy and ambition to go with them, Franklin was a statesman, author, inventor, printer, and scientist.'
    }, {
      id: 5,
      title: 'Security Analysis: Principles and Techniques',
      author: 'Benjamin Graham',
      image_url: 'http://ecx.images-amazon.com/images/I/51yJzPq3npL._SX309_BO1,204,203,200_.jpg',
      description: 'Benjamin Graham\'s revolutionary theories have influenced and inspired investors for nearly 70 years. First published in 1934, his Security Analysis is still considered to be the value investing bible for investors of every ilk. Yet, it is the second edition of that book, published in 1940 and long since out of print, that many experts--including Graham protégé Warren Buffet--consider to be the definitive edition. This facsimile reproduction of that seminal work makes available to investors, once again, the original thinking of "this century\'s (and perhaps history\'s) most important thinker on applied portfolio investment."'
    }];
  }

  _createClass(SideNav, [{
    key: 'toggle',
    value: function toggle() {
      if (this.sideNav.classList.contains('side-nav__visible')) {
        this.hide();
      } else {
        this.show();
      }
    }
  }, {
    key: 'hide',
    value: function hide() {
      var _this = this;

      this.sideNavContent.classList.add('save-nav_content_animatable');
      requestAnimationFrame(function () {
        _this.sideNav.classList.remove('side-nav__visible');
        _this.sideNavContent.classList.remove('side-nav_content_visible');
      });
    }
  }, {
    key: 'onSideNavTransitionEnd',
    value: function onSideNavTransitionEnd() {
      this.sideNavContent.classList.remove('save-nav_content_animatable');
      this.sideNavContent.removeEventListener('transitionend', this.onSideNavTransitionEnd);
    }
  }, {
    key: 'show',
    value: function show() {
      var _this2 = this;

      this.sideNavContent.classList.add('save-nav_content_animatable');
      this.sideNavContent.addEventListener('transitionend', this.onSideNavTransitionEnd);

      requestAnimationFrame(function () {
        _this2.sideNav.classList.add('side-nav__visible');
        _this2.sideNavContent.classList.add('side-nav_content_visible');
      });
    }
  }, {
    key: 'navToBooks',
    value: function navToBooks() {
      this.hide();
      //TODO(benoit) should deal with the router here as
      // same for portfolio
      //
      (0, _Router2.default)().then(function (router) {
        router.go('/books/');
      });

      // this.hide();
      // // TODO(benoit) so wrong. lets get some adequate MVC...
      //
      // document.querySelector('.books-container').classList.add('books-container__visible');
      //
      // this.books.forEach(book => {
      //   const bookCard = new BookCard(book.id, book.title, book.description, book.image_url);
      //   bookCard.render();
      // });
    }
  }, {
    key: 'navToPortfolio',
    value: function navToPortfolio() {
      this.hide();
      (0, _Router2.default)().then(function (router) {
        router.go('/portfolio/');
      });
    }
  }]);

  return SideNav;
}();

exports.default = SideNav;

},{"../components/Button":1,"../libs/Router":7,"../models/BookCard":8}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Button = require('../components/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Controller2 = require('./Controller');

var _Controller3 = _interopRequireDefault(_Controller2);

var _SideNav = require('../components/SideNav');

var _SideNav2 = _interopRequireDefault(_SideNav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AppController = function (_Controller) {
  _inherits(AppController, _Controller);

  function AppController() {
    _classCallCheck(this, AppController);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AppController).call(this));

    _this.appModel = null;
    _this.sideNavToggleButton = new _Button2.default(document.querySelector('.header_toggle-side-nav'));

    _this.sideNavToggleButton.element.addEventListener('click', _this.toggleSideNav.bind(_this));
    _this.sideNav = new _SideNav2.default();

    // Wait for the first frame because sometimes
    // window.onload fires too quickly.
    requestAnimationFrame(function () {
      _this.loadScript('/scripts/freshhood-books.js');
      _this.loadScript('/scripts/freshhood-portfolio.js');
      // this.loadScript('/scripts/freshhood-portfolio.js');

      _this.sideNavToggleButton.element.addEventListener('click', function () {
        _this.toggleSideNav();
      });
    });
    return _this;
  }

  _createClass(AppController, [{
    key: 'toggleSideNav',
    value: function toggleSideNav() {
      this.sideNav.toggle();
    }
  }]);

  return AppController;
}(_Controller3.default);

exports.default = AppController;

},{"../components/Button":1,"../components/SideNav":3,"./Controller":5}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = function () {
  function Controller() {
    _classCallCheck(this, Controller);
  }

  _createClass(Controller, [{
    key: 'loadScript',
    value: function loadScript(url) {
      return new Promise(function (resolve, reject) {
        var script = document.createElement('script');
        script.async = true;
        script.src = url;

        script.onload = resolve;
        script.onerror = reject;

        document.head.appendChild(script);
      });
    }
  }, {
    key: 'loadCSS',
    value: function loadCSS(url) {
      return fetch(url).then(function (response) {
        if (response.status === 200) {
          response.text().then(function (body) {
            var style = document.createElement('style');
            style.textContent = body;
            document.head.appendChild(style);
          });
        } else {
          throw 'style at url:' + url + ' not found.';
        }
      });
    }
  }]);

  return Controller;
}();

exports.default = Controller;

},{}],6:[function(require,module,exports){
'use strict';

var _AppController = require('./controllers/AppController');

var _AppController2 = _interopRequireDefault(_AppController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _AppController2.default();

},{"./controllers/AppController":4}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = RouterInstance;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function RouterInstance() {
  if (typeof window.RouterInstance_ !== 'undefined') {
    return Promise.resolve(window.RouterInstance_);
  }

  window.RouterInstance_ = new Router();
  return Promise.resolve(window.RouterInstance_);
}

var Router = function () {
  function Router() {
    var _this = this;

    _classCallCheck(this, Router);

    this.routes = {};
    this.currentAction = null;
    this.loader = document.querySelector('.loader');

    window.addEventListener('popstate', function (e) {
      _this.onPopState(e);
    });

    this.manageState();
  }

  _createClass(Router, [{
    key: 'add',
    value: function add(path, callbackIn, callbackOut, callbackUpdate) {
      var _this2 = this;

      // Assume the first part of the path is the
      // verb we want to action, with the rest of the path
      // being the data to pass to the handler.
      var pathParts = path.split('/');
      var action = pathParts.shift();

      if (this.routes[action]) {
        throw "A handler already exists for this action: " + action;
      }

      this.routes[action] = {
        in: callbackIn,
        out: callbackOut,
        update: callbackUpdate
      };

      // Check to see if this path is fulfilled.
      requestAnimationFrame(function () {
        if (_this2.manageState()) {
          document.body.classList.remove('deeplink');
        }
      });
    }
  }, {
    key: 'remove',
    value: function remove(path) {
      var pathParts = path.split('/');
      var action = pathParts.shift();

      if (!this.routes[action]) {
        return;
      }
      delete this.routes[action];
    }
  }, {
    key: 'manageState',
    value: function manageState() {
      var path = document.location.pathname.replace(/^\//, '');

      // Assume the first part of the path is the
      // verb we want to action, with the rest of the path
      // being the data to pass to the handler.
      var pathParts = path.split('/');
      var action = pathParts.shift();
      var data = pathParts.join('/');

      // Add a special case for the root.
      if (action === '') {
        action = '_root';
      }

      // Remove any deeplink covers.
      if (document.body.classList.contains('app-deeplink')) {
        document.body.classList.remove('app-deeplink');
      }

      // Hide the loader.
      this.loader.classList.add('hidden');

      if (this.currentAction === this.routes[action]) {
        if (typeof this.currentAction.update === 'function') {
          this.currentAction.update(data);
          return true;
        }

        return false;
      }

      if (!this.routes[action]) {
        if (this.currentAction) {
          this.currentAction.out();
        }

        this.currentAction = null;
        document.body.focus();
        return false;
      }

      // Set the new action going.
      var delay = this.routes[action].in(data) || 0;

      // Remove the old action and update the reference.
      if (this.currentAction) {
        // Allow the incoming view to delay the outgoing one
        // so that we don't get too much overlapping animation.
        if (delay === 0) {
          this.currentAction.out();
        } else {
          setTimeout(this.currentAction.out, delay);
        }
      }

      this.currentAction = this.routes[action];

      return true;
    }
  }, {
    key: 'go',
    value: function go(path) {
      var _this3 = this;

      // Only process real changes.
      if (path === window.location.pathname) {
        return;
      }

      history.pushState(undefined, "", path);
      requestAnimationFrame(function () {
        _this3.manageState();
      });
    }
  }, {
    key: 'onPopState',
    value: function onPopState(e) {
      var _this4 = this;

      e.preventDefault();
      requestAnimationFrame(function () {
        _this4.manageState();
      });
    }
  }]);

  return Router;
}();

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BookCard = function () {
  function BookCard(id) {
    var title = arguments.length <= 1 || arguments[1] === undefined ? 'title' : arguments[1];
    var description = arguments.length <= 2 || arguments[2] === undefined ? 'description' : arguments[2];
    var imageUrl = arguments[3];

    _classCallCheck(this, BookCard);

    if (id == null) {
      throw 'missing id';
    }

    this.id = id;
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
  }
  //
  // get imageUrl() {
  //   return `images/${this.id}.png`;
  // }

  _createClass(BookCard, [{
    key: 'render',
    value: function render() {
      this.element = document.createElement('section');
      this.element.classList.add('book-card', 'card-' + this.id);
      this.element.innerHTML = this.template;
      document.querySelector('.books-container').appendChild(this.element);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.element.remove();
    }
  }, {
    key: 'template',
    get: function get() {
      return ['<div class="card_inner">', '<div class="card_title-inner">', '<h1 class="card_title">' + this.title + '</h1>', '</div>', '<figure class="card_figure">', '<img class="card_image" src="' + this.imageUrl + '" />', '</figure>', '<div class="card_description-inner">', '<p class="card_description">' + this.description + '</p>', '</div>', '</div>'].join('');
    }
  }]);

  return BookCard;
}();

exports.default = BookCard;

},{}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL0J1dHRvbi5qcyIsInNyYy9zY3JpcHRzL2NvbXBvbmVudHMvTWF0ZXJpYWxSaXBwbGUuanMiLCJzcmMvc2NyaXB0cy9jb21wb25lbnRzL1NpZGVOYXYuanMiLCJzcmMvc2NyaXB0cy9jb250cm9sbGVycy9BcHBDb250cm9sbGVyLmpzIiwic3JjL3NjcmlwdHMvY29udHJvbGxlcnMvQ29udHJvbGxlci5qcyIsInNyYy9zY3JpcHRzL2ZyZXNoaG9vZC1jb3JlLmpzIiwic3JjL3NjcmlwdHMvbGlicy9Sb3V0ZXIuanMiLCJzcmMvc2NyaXB0cy9tb2RlbHMvQm9va0NhcmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7Ozs7Ozs7QUFFQTs7Ozs7Ozs7SUFFcUI7QUFDbkIsV0FEbUIsTUFDbkIsQ0FBWSxPQUFaLEVBQXFCOzBCQURGLFFBQ0U7O0FBQ25CLFNBQUssT0FBTCxHQUFlLE9BQWYsQ0FEbUI7O0FBR25CLFFBQUksS0FBSyxPQUFMLENBQWEsU0FBYixDQUF1QixRQUF2QixDQUFnQyxPQUFPLFdBQVAsQ0FBbUIsYUFBbkIsQ0FBcEMsRUFBdUU7QUFDckUsVUFBTSxrQkFBa0IsU0FBUyxhQUFULENBQXVCLE1BQXZCLENBQWxCLENBRCtEO0FBRXJFLHNCQUFnQixTQUFoQixDQUEwQixHQUExQixDQUE4QixPQUFPLFdBQVAsQ0FBbUIsZ0JBQW5CLENBQTlCLENBRnFFO0FBR3JFLFdBQUssY0FBTCxHQUFzQixTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBdEIsQ0FIcUU7QUFJckUsV0FBSyxjQUFMLENBQW9CLFNBQXBCLENBQThCLEdBQTlCLENBQWtDLE9BQU8sV0FBUCxDQUFtQixNQUFuQixDQUFsQyxDQUpxRTtBQUtyRSxzQkFBZ0IsV0FBaEIsQ0FBNEIsS0FBSyxjQUFMLENBQTVC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LENBQXVCLFNBQXZCLENBQWYsQ0FETztBQUVQLFdBQUssT0FBTCxDQUFhLFNBQWIsQ0FBdUIsR0FBdkIsQ0FBMkIsV0FBM0IsWUFBZ0QsS0FBSyxFQUFMLENBQWhELENBRk87QUFHUCxXQUFLLE9BQUwsQ0FBYSxTQUFiLEdBQXlCLEtBQUssUUFBTCxDQUhsQjtBQUlQLGVBQVMsYUFBVCxDQUF1QixrQkFBdkIsRUFBMkMsV0FBM0MsQ0FBdUQsS0FBSyxPQUFMLENBQXZELENBSk87Ozs7OEJBT0M7QUFDUixXQUFLLE9BQUwsQ0FBYSxNQUFiLEdBRFE7Ozs7d0JBdkJLO0FBQ2IsYUFBTywyRkFHeUIsS0FBSyxLQUFMLFVBSHpCLDhFQU0rQixLQUFLLFFBQUwsU0FOL0Isd0ZBUzhCLEtBQUssV0FBTCxTQVQ5QixzQkFZTCxJQVpLLENBWUEsRUFaQSxDQUFQLENBRGE7Ozs7U0FoQkkiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgTWF0ZXJpYWxSaXBwbGUgZnJvbSAnLi9NYXRlcmlhbFJpcHBsZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1dHRvbiB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuXG4gICAgaWYgKHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoQnV0dG9uLkNzc0NsYXNzZXNfLlJJUFBMRV9FRkZFQ1QpKSB7XG4gICAgICBjb25zdCByaXBwbGVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICByaXBwbGVDb250YWluZXIuY2xhc3NMaXN0LmFkZChCdXR0b24uQ3NzQ2xhc3Nlc18uUklQUExFX0NPTlRBSU5FUik7XG4gICAgICB0aGlzLnJpcHBsZUVsZW1lbnRfID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgdGhpcy5yaXBwbGVFbGVtZW50Xy5jbGFzc0xpc3QuYWRkKEJ1dHRvbi5Dc3NDbGFzc2VzXy5SSVBQTEUpO1xuICAgICAgcmlwcGxlQ29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMucmlwcGxlRWxlbWVudF8pO1xuICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHJpcHBsZUNvbnRhaW5lcik7XG5cbiAgICAgIHRoaXMucmlwcGxlID0gbmV3IE1hdGVyaWFsUmlwcGxlKHRoaXMuZWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGdldCBDc3NDbGFzc2VzXygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgUklQUExFX0VGRkVDVDogJ3JpcHBsZS1lZmZlY3QnLFxuICAgICAgUklQUExFX0NPTlRBSU5FUjogJ3JpcHBsZS1jb250YWluZXInLFxuICAgICAgUklQUExFOiAncmlwcGxlJ1xuICAgIH07XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0Jztcbi8qKlxuICogQ2xhc3MgY29uc3RydWN0b3IgZm9yIFJpcHBsZSBNREwgY29tcG9uZW50LlxuICogSW1wbGVtZW50cyBNREwgY29tcG9uZW50IGRlc2lnbiBwYXR0ZXJuIGRlZmluZWQgYXQ6XG4gKiBodHRwczovL2dpdGh1Yi5jb20vamFzb25tYXllcy9tZGwtY29tcG9uZW50LWRlc2lnbi1wYXR0ZXJuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hdGVyaWFsUmlwcGxlIHtcbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSB1cGdyYWRlZC5cbiAgICovXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICB0aGlzLmVsZW1lbnRfID0gZWxlbWVudDtcbiAgICAvLyBJbml0aWFsaXplIGluc3RhbmNlLlxuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0b3JlIGNvbnN0YW50cyBpbiBvbmUgcGxhY2Ugc28gdGhleSBjYW4gYmUgdXBkYXRlZCBlYXNpbHkuXG4gICAqXG4gICAqIEBlbnVtIHtzdHJpbmcgfCBudW1iZXJ9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBzdGF0aWMgZ2V0IENvbnN0YW50XygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgSU5JVElBTF9TQ0FMRTogJ3NjYWxlKDAuMDAwMSwgMC4wMDAxKScsXG4gICAgICBJTklUSUFMX1NJWkU6ICcxcHgnLFxuICAgICAgSU5JVElBTF9PUEFDSVRZOiAnMC40JyxcbiAgICAgIEZJTkFMX09QQUNJVFk6ICcwJyxcbiAgICAgIEZJTkFMX1NDQUxFOiAnJ1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogU3RvcmUgc3RyaW5ncyBmb3IgY2xhc3MgbmFtZXMgZGVmaW5lZCBieSB0aGlzIGNvbXBvbmVudCB0aGF0IGFyZSB1c2VkIGluXG4gICAqIEphdmFTY3JpcHQuIFRoaXMgYWxsb3dzIHVzIHRvIHNpbXBseSBjaGFuZ2UgaXQgaW4gb25lIHBsYWNlIHNob3VsZCB3ZVxuICAgKiBkZWNpZGUgdG8gbW9kaWZ5IGF0IGEgbGF0ZXIgZGF0ZS5cbiAgICpcbiAgICogQGVudW0ge3N0cmluZ31cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHN0YXRpYyBnZXQgQ3NzQ2xhc3Nlc18oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIFJJUFBMRTogJ3JpcHBsZScsXG4gICAgICBJU19BTklNQVRJTkc6ICdpcy1hbmltYXRpbmcnLFxuICAgICAgSVNfVklTSUJMRTogJ2lzLXZpc2libGUnXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGUgbW91c2UgLyBmaW5nZXIgZG93biBvbiBlbGVtZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCBUaGUgZXZlbnQgdGhhdCBmaXJlZC5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGRvd25IYW5kbGVyXyhldmVudCkge1xuICAgIGlmICghdGhpcy5yaXBwbGVFbGVtZW50Xy5zdHlsZS53aWR0aCAmJiAhdGhpcy5yaXBwbGVFbGVtZW50Xy5zdHlsZS5oZWlnaHQpIHtcbiAgICAgIGNvbnN0IHJlY3QgPSB0aGlzLmVsZW1lbnRfLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgdGhpcy5ib3VuZEhlaWdodCA9IHJlY3QuaGVpZ2h0O1xuICAgICAgdGhpcy5ib3VuZFdpZHRoID0gcmVjdC53aWR0aDtcbiAgICAgIHRoaXMucmlwcGxlU2l6ZV8gPSBNYXRoLnNxcnQocmVjdC53aWR0aCAqIHJlY3Qud2lkdGggKyByZWN0LmhlaWdodCAqIHJlY3QuaGVpZ2h0KSAqIDIgKyAyO1xuICAgICAgdGhpcy5yaXBwbGVFbGVtZW50Xy5zdHlsZS53aWR0aCA9IHRoaXMucmlwcGxlU2l6ZV8gKyAncHgnO1xuICAgICAgdGhpcy5yaXBwbGVFbGVtZW50Xy5zdHlsZS5oZWlnaHQgPSB0aGlzLnJpcHBsZVNpemVfICsgJ3B4JztcbiAgICB9XG4gICAgdGhpcy5yaXBwbGVFbGVtZW50Xy5jbGFzc0xpc3QuYWRkKE1hdGVyaWFsUmlwcGxlLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpO1xuICAgIGlmIChldmVudC50eXBlID09PSAnbW91c2Vkb3duJyAmJiB0aGlzLmlnbm9yaW5nTW91c2VEb3duXykge1xuICAgICAgdGhpcy5pZ25vcmluZ01vdXNlRG93bl8gPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGV2ZW50LnR5cGUgPT09ICd0b3VjaHN0YXJ0Jykge1xuICAgICAgICB0aGlzLmlnbm9yaW5nTW91c2VEb3duXyA9IHRydWU7XG4gICAgICB9XG4gICAgICBjb25zdCBmcmFtZUNvdW50ID0gdGhpcy5nZXRGcmFtZUNvdW50KCk7XG4gICAgICBpZiAoZnJhbWVDb3VudCA+IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5zZXRGcmFtZUNvdW50KDEpO1xuICAgICAgY29uc3QgYm91bmQgPSBldmVudC5jdXJyZW50VGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgbGV0IHg7XG4gICAgICBsZXQgeTtcbiAgICAgIC8vIENoZWNrIGlmIHdlIGFyZSBoYW5kbGluZyBhIGtleWJvYXJkIGNsaWNrLlxuICAgICAgaWYgKGV2ZW50LmNsaWVudFggPT09IDAgJiYgZXZlbnQuY2xpZW50WSA9PT0gMCkge1xuICAgICAgICB4ID0gTWF0aC5yb3VuZChib3VuZC53aWR0aCAvIDIpO1xuICAgICAgICB5ID0gTWF0aC5yb3VuZChib3VuZC5oZWlnaHQgLyAyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGNsaWVudFggPSBldmVudC5jbGllbnRYID8gZXZlbnQuY2xpZW50WCA6IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WDtcbiAgICAgICAgY29uc3QgY2xpZW50WSA9IGV2ZW50LmNsaWVudFkgPyBldmVudC5jbGllbnRZIDogZXZlbnQudG91Y2hlc1swXS5jbGllbnRZO1xuICAgICAgICB4ID0gTWF0aC5yb3VuZChjbGllbnRYIC0gYm91bmQubGVmdCk7XG4gICAgICAgIHkgPSBNYXRoLnJvdW5kKGNsaWVudFkgLSBib3VuZC50b3ApO1xuICAgICAgfVxuICAgICAgdGhpcy5zZXRSaXBwbGVYWSh4LCB5KTtcbiAgICAgIHRoaXMuc2V0UmlwcGxlU3R5bGVzKHRydWUpO1xuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1GcmFtZUhhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZSBtb3VzZSAvIGZpbmdlciB1cCBvbiBlbGVtZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCBUaGUgZXZlbnQgdGhhdCBmaXJlZC5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHVwSGFuZGxlcl8oZXZlbnQpIHtcbiAgICAvLyBEb24ndCBmaXJlIGZvciB0aGUgYXJ0aWZpY2lhbCBcIm1vdXNldXBcIiBnZW5lcmF0ZWQgYnkgYSBkb3VibGUtY2xpY2suXG4gICAgaWYgKGV2ZW50ICYmIGV2ZW50LmRldGFpbCAhPT0gMikge1xuICAgICAgdGhpcy5yaXBwbGVFbGVtZW50Xy5jbGFzc0xpc3QucmVtb3ZlKE1hdGVyaWFsUmlwcGxlLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpO1xuICAgIH1cbiAgICAvLyBBbGxvdyBhIHJlcGFpbnQgdG8gb2NjdXIgYmVmb3JlIHJlbW92aW5nIHRoaXMgY2xhc3MsIHNvIHRoZSBhbmltYXRpb25cbiAgICAvLyBzaG93cyBmb3IgdGFwIGV2ZW50cywgd2hpY2ggc2VlbSB0byB0cmlnZ2VyIGEgbW91c2V1cCB0b28gc29vbiBhZnRlclxuICAgIC8vIG1vdXNlZG93bi5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5yaXBwbGVFbGVtZW50Xy5jbGFzc0xpc3QucmVtb3ZlKE1hdGVyaWFsUmlwcGxlLkNzc0NsYXNzZXNfLklTX1ZJU0lCTEUpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgZWxlbWVudC5cbiAgICovXG4gIGluaXQoKSB7XG4gICAgaWYgKHRoaXMuZWxlbWVudF8pIHtcbiAgICAgIHRoaXMucmlwcGxlRWxlbWVudF8gPSB0aGlzLmVsZW1lbnRfLnF1ZXJ5U2VsZWN0b3IoJy4nICsgTWF0ZXJpYWxSaXBwbGUuQ3NzQ2xhc3Nlc18uUklQUExFKTtcbiAgICAgIHRoaXMuZnJhbWVDb3VudF8gPSAwO1xuICAgICAgdGhpcy5yaXBwbGVTaXplXyA9IDA7XG4gICAgICB0aGlzLnhfID0gMDtcbiAgICAgIHRoaXMueV8gPSAwO1xuICAgICAgLy8gVG91Y2ggc3RhcnQgcHJvZHVjZXMgYSBjb21wYXQgbW91c2UgZG93biBldmVudCwgd2hpY2ggd291bGQgY2F1c2UgYVxuICAgICAgLy8gc2Vjb25kIHJpcHBsZXMuIFRvIGF2b2lkIHRoYXQsIHdlIHVzZSB0aGlzIHByb3BlcnR5IHRvIGlnbm9yZSB0aGUgZmlyc3RcbiAgICAgIC8vIG1vdXNlIGRvd24gYWZ0ZXIgYSB0b3VjaCBzdGFydC5cbiAgICAgIHRoaXMuaWdub3JpbmdNb3VzZURvd25fID0gZmFsc2U7XG4gICAgICB0aGlzLmJvdW5kRG93bkhhbmRsZXIgPSB0aGlzLmRvd25IYW5kbGVyXy5iaW5kKHRoaXMpO1xuICAgICAgdGhpcy5lbGVtZW50Xy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmJvdW5kRG93bkhhbmRsZXIpO1xuICAgICAgdGhpcy5lbGVtZW50Xy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5ib3VuZERvd25IYW5kbGVyKTtcbiAgICAgIHRoaXMuYm91bmRVcEhhbmRsZXIgPSB0aGlzLnVwSGFuZGxlcl8uYmluZCh0aGlzKTtcbiAgICAgIHRoaXMuZWxlbWVudF8uYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuYm91bmRVcEhhbmRsZXIpO1xuICAgICAgdGhpcy5lbGVtZW50Xy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5ib3VuZFVwSGFuZGxlcik7XG4gICAgICB0aGlzLmVsZW1lbnRfLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5ib3VuZFVwSGFuZGxlcik7XG4gICAgICB0aGlzLmVsZW1lbnRfLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCB0aGlzLmJvdW5kVXBIYW5kbGVyKTtcbiAgICAgIC8qKlxuICAgICAgICogR2V0dGVyIGZvciBmcmFtZUNvdW50Xy5cbiAgICAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIGZyYW1lIGNvdW50LlxuICAgICAgICovXG4gICAgICB0aGlzLmdldEZyYW1lQ291bnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZnJhbWVDb3VudF87XG4gICAgICB9O1xuICAgICAgLyoqXG4gICAgICAgKiBTZXR0ZXIgZm9yIGZyYW1lQ291bnRfLlxuICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGZDIHRoZSBmcmFtZSBjb3VudC5cbiAgICAgICAqL1xuICAgICAgdGhpcy5zZXRGcmFtZUNvdW50ID0gZnVuY3Rpb24oZkMpIHtcbiAgICAgICAgdGhpcy5mcmFtZUNvdW50XyA9IGZDO1xuICAgICAgfTtcbiAgICAgIC8qKlxuICAgICAgICogR2V0dGVyIGZvciByaXBwbGVFbGVtZW50Xy5cbiAgICAgICAqIEByZXR1cm4ge0VsZW1lbnR9IHRoZSByaXBwbGUgZWxlbWVudC5cbiAgICAgICAqL1xuICAgICAgdGhpcy5nZXRSaXBwbGVFbGVtZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJpcHBsZUVsZW1lbnRfO1xuICAgICAgfTtcbiAgICAgIC8qKlxuICAgICAgICogU2V0cyB0aGUgcmlwcGxlIFggYW5kIFkgY29vcmRpbmF0ZXMuXG4gICAgICAgKiBAcGFyYW17bnVtYmVyfSBuZXdYIHRoZSBuZXcgWCBjb29yZGluYXRlXG4gICAgICAgKiBAcGFyYW17bnVtYmVyfSBuZXdZIHRoZSBuZXcgWSBjb29yZGluYXRlXG4gICAgICAgKi9cbiAgICAgIHRoaXMuc2V0UmlwcGxlWFkgPSBmdW5jdGlvbihuZXdYLCBuZXdZKSB7XG4gICAgICAgIHRoaXMueF8gPSBuZXdYO1xuICAgICAgICB0aGlzLnlfID0gbmV3WTtcbiAgICAgIH07XG4gICAgICAvKipcbiAgICAgICAqIFNldHMgdGhlIHJpcHBsZSBzdHlsZXMuXG4gICAgICAgKiBAcGFyYW17Ym9vbGVhbn0gc3RhcnQgd2hldGhlciBvciBub3QgdGhpcyBpcyB0aGUgc3RhcnQgZnJhbWUuXG4gICAgICAgKi9cbiAgICAgIHRoaXMuc2V0UmlwcGxlU3R5bGVzID0gZnVuY3Rpb24oc3RhcnQpIHtcbiAgICAgICAgaWYgKHRoaXMucmlwcGxlRWxlbWVudF8gIT09IG51bGwpIHtcbiAgICAgICAgICBsZXQgc2NhbGU7XG4gICAgICAgICAgbGV0IHNpemU7XG4gICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gJ3RyYW5zbGF0ZSgnICsgdGhpcy54XyArICdweCwgJyArIHRoaXMueV8gKyAncHgpJztcbiAgICAgICAgICBpZiAoc3RhcnQpIHtcbiAgICAgICAgICAgIHNjYWxlID0gTWF0ZXJpYWxSaXBwbGUuQ29uc3RhbnRfLklOSVRJQUxfU0NBTEU7XG4gICAgICAgICAgICBzaXplID0gTWF0ZXJpYWxSaXBwbGUuQ29uc3RhbnRfLklOSVRJQUxfU0laRTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2NhbGUgPSBNYXRlcmlhbFJpcHBsZS5Db25zdGFudF8uRklOQUxfU0NBTEU7XG4gICAgICAgICAgICBzaXplID0gdGhpcy5yaXBwbGVTaXplXyArICdweCc7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHRyYW5zZm9ybVN0cmluZyA9ICd0cmFuc2xhdGUoLTUwJSwgLTUwJSkgJyArIG9mZnNldCArIHNjYWxlO1xuICAgICAgICAgIHRoaXMucmlwcGxlRWxlbWVudF8uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xuICAgICAgICAgIHRoaXMucmlwcGxlRWxlbWVudF8uc3R5bGUubXNUcmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XG4gICAgICAgICAgdGhpcy5yaXBwbGVFbGVtZW50Xy5zdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XG4gICAgICAgICAgaWYgKHN0YXJ0KSB7XG4gICAgICAgICAgICB0aGlzLnJpcHBsZUVsZW1lbnRfLmNsYXNzTGlzdC5yZW1vdmUoTWF0ZXJpYWxSaXBwbGUuQ3NzQ2xhc3Nlc18uSVNfQU5JTUFUSU5HKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yaXBwbGVFbGVtZW50Xy5jbGFzc0xpc3QuYWRkKE1hdGVyaWFsUmlwcGxlLkNzc0NsYXNzZXNfLklTX0FOSU1BVElORyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogSGFuZGxlcyBhbiBhbmltYXRpb24gZnJhbWUuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmFuaW1GcmFtZUhhbmRsZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAodGhpcy5mcmFtZUNvdW50Xy0tID4gMCkge1xuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1GcmFtZUhhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0UmlwcGxlU3R5bGVzKGZhbHNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERvd25ncmFkZSB0aGUgY29tcG9uZW50XG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBtZGxEb3duZ3JhZGVfKCkge1xuICAgIHRoaXMuZWxlbWVudF8ucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5ib3VuZERvd25IYW5kbGVyKTtcbiAgICB0aGlzLmVsZW1lbnRfLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLmJvdW5kRG93bkhhbmRsZXIpO1xuICAgIHRoaXMuZWxlbWVudF8ucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuYm91bmRVcEhhbmRsZXIpO1xuICAgIHRoaXMuZWxlbWVudF8ucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMuYm91bmRVcEhhbmRsZXIpO1xuICAgIHRoaXMuZWxlbWVudF8ucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLmJvdW5kVXBIYW5kbGVyKTtcbiAgICB0aGlzLmVsZW1lbnRfLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2JsdXInLCB0aGlzLmJvdW5kVXBIYW5kbGVyKTtcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQm9va0NhcmQgZnJvbSAnLi4vbW9kZWxzL0Jvb2tDYXJkJztcbmltcG9ydCBCdXR0b24gZnJvbSAnLi4vY29tcG9uZW50cy9CdXR0b24nO1xuaW1wb3J0IFJvdXRlckluc3RhbmNlIGZyb20gJy4uL2xpYnMvUm91dGVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2lkZU5hdiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuc2lkZU5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlLW5hdicpO1xuICAgIHRoaXMuc2lkZU5hdkNvbnRlbnQgPSB0aGlzLnNpZGVOYXYucXVlcnlTZWxlY3RvcignLnNpZGUtbmF2X2NvbnRlbnQnKTtcblxuICAgIHRoaXMuc2lkZU5hdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGlkZS5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLnNpZGVOYXZDb250ZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IGUuc3RvcFByb3BhZ2F0aW9uKCkpO1xuXG4gICAgLy8gYmluZGluZ1xuICAgIHRoaXMub25TaWRlTmF2VHJhbnNpdGlvbkVuZCA9IHRoaXMub25TaWRlTmF2VHJhbnNpdGlvbkVuZC5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5uYXZUb0Jvb2tzQnV0dG9uID0gbmV3IEJ1dHRvbihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZS1uYXZfbmF2LXRvLWJvb2tzJykpO1xuICAgIHRoaXMubmF2VG9Cb29rc0J1dHRvbi5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5uYXZUb0Jvb2tzLmJpbmQodGhpcykpO1xuICAgIHRoaXMubmF2VG9Qb3J0Zm9saW9CdXR0b24gPSBuZXcgQnV0dG9uKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlLW5hdl9uYXYtdG8tcG9ydGZvbGlvJykpO1xuICAgIHRoaXMubmF2VG9Qb3J0Zm9saW9CdXR0b24uZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMubmF2VG9Qb3J0Zm9saW8uYmluZCh0aGlzKSk7XG5cbiAgICB0aGlzLmJvb2tzID0gW3tcbiAgICAgIGlkOiAxLFxuICAgICAgdGl0bGU6ICdXaXphcmQ6IFRoZSBMaWZlIEFuZCBUaW1lcyBvZiBOaWtvbGEgVGVzbGEnLFxuICAgICAgYXV0aG9yOiAnTWFyYyBKLiBTZWlmZXInLFxuICAgICAgaW1hZ2VfdXJsOiAnaHR0cDovL2VjeC5pbWFnZXMtYW1hem9uLmNvbS9pbWFnZXMvSS81MXN3eDFHbCUyQk1MLl9TWDMyM19CTzEsMjA0LDIwMywyMDBfLmpwZycsXG4gICAgICBkZXNjcmlwdGlvbjogYE5pa29sYSBUZXNsYSAoMTg1Ni0xOTQzKSwgY3JlZGl0ZWQgYXMgdGhlIGluc3BpcmF0aW9uIGZvciByYWRpbywgcm9ib3RzLCBhbmQgZXZlbiByYWRhciwgaGFzIGJlZW4gY2FsbGVkIHRoZSBwYXRyb24gc2FpbnQgb2YgbW9kZXJuIGVsZWN0cmljaXR5LiBCYXNlZCBvbiBvcmlnaW5hbCBtYXRlcmlhbCBhbmQgcHJldmlvdXNseSB1bmF2YWlsYWJsZSBkb2N1bWVudHMsIHRoaXMgYWNjbGFpbWVkIGJvb2sgaXMgdGhlIGRlZmluaXRpdmUgYmlvZ3JhcGh5IG9mIHRoZSBtYW4gY29uc2lkZXJlZCBieSBtYW55IHRvIGJlIHRoZSBmb3VuZGluZyBmYXRoZXIgb2YgbW9kZXJuIGVsZWN0cmljYWwgdGVjaG5vbG9neS4gQW1vbmcgVGVzbGEncyBjcmVhdGlvbnMgd2VyZSB0aGUgY2hhbm5lbGluZyBvZiBhbHRlcm5hdGluZyBjdXJyZW50LCBmbHVvcmVzY2VudCBhbmQgbmVvbiBsaWdodGluZywgd2lyZWxlc3MgdGVsZWdyYXBoeSwgYW5kIHRoZSBnaWFudCB0dXJiaW5lcyB0aGF0IGhhcm5lc3NlZCB0aGUgcG93ZXIgb2YgTmlhZ2FyYSBGYWxscy5gXG4gICAgfSwge1xuICAgICAgaWQ6IDIsXG4gICAgICB0aXRsZTogJ0plYW4gTW91bGluJyxcbiAgICAgIGF1dGhvcjogJ0plYW4tUGllcnJlIEF6ZW1hJyxcbiAgICAgIGltYWdlX3VybDogJ2h0dHA6Ly9lY3guaW1hZ2VzLWFtYXpvbi5jb20vaW1hZ2VzL0kvNDF0VHpTMVRzJTJCTC5fU1gzMDRfQk8xLDIwNCwyMDMsMjAwXy5qcGcnLFxuICAgICAgZGVzY3JpcHRpb246IGBMZSBKZWFuIE1vdWxpbiBkJ0F6w6ltYSBmYWl0IGF1am91cmQnaHVpIHLDqWbDqXJlbmNlIGNvbW1lIGlsIGEgcmVjdWVpbGxpIGxlcyBzdWZmcmFnZXMgZGUgbGEgY3JpdGlxdWUgw6Agc2EgcGFydXRpb24uIENhciwgYXUtZGVsw6AgZCd1bmUgYmlvZ3JhcGhpZSBwb2xpdGlxdWUsIEplYW4tUGllcnJlIEF6w6ltYSBhIHN1IHJldHJhY2VyIGwnaGlzdG9pcmUgZGUgbGEgRnJhbmNlIGxpYnJlIGp1c3F1J2VuIDE5NDMsIGRlIGxhIFLDqXNpc3RhbmNlIGludMOpcmlldXJlIGV0IGRlcyByZWxhdGlvbnMgY29tcGxleGVzIGVudHJlIExvbmRyZXMsIFdhc2hpbmd0b24gZXQgQWxnZXIuIEVuIGNvbWJpbmFudCBhcmNoaXZlcywgcsOpY2l0cywgZXhwbGljYXRpb25zIGV0IHTDqW1vaWduYWdlcywgaWwgYnJvc3NlIGF1c3NpIGwnYXZlbnR1cmUgc2luZ3VsacOocmUgZCd1biBob21tZSDDoCBsYSBmb2lzIHNlbWJsYWJsZSDDoCB0YW50IGRlIHNlcyBjb250ZW1wb3JhaW5zIGV0IGRvbnQgbCdlbnRyZXByaXNlIGxlIGhpc3NlIGp1c3F1J8OgIGluY2FybmVyIGxlIGjDqXJvcyBkZSBsYSBSw6lzaXN0YW5jZSBwb3VyIHBsdXNpZXVycyBnw6luw6lyYXRpb25zIGRlIEZyYW7Dp2Fpcy4gSmVhbi1QaWVycmUgQXrDqW1hLCBwcm9mZXNzZXVyIMOgIFNjaWVuY2VzLVBvLCBhIG5vdGFtbWVudCBwdWJsacOpIERlIE11bmljaCDDoCBsYSBMaWLDqXJhdGlvbiwgTCdBbm7DqWUgMTk0MCBldCBWaWNoeS5gXG4gICAgfSwge1xuICAgICAgaWQ6IDMsXG4gICAgICB0aXRsZTogJ0RlcyBHZW5zIFRyZXMgQmllbicsXG4gICAgICBhdXRob3I6ICdBbGV4YW5kZSBKYXJkaW4nLFxuICAgICAgaW1hZ2VfdXJsOiAnaHR0cDovL2VjeC5pbWFnZXMtYW1hem9uLmNvbS9pbWFnZXMvSS81MTVyYXhqWG5xTC5fU1gzMDdfQk8xLDIwNCwyMDMsMjAwXy5qcGcnLFxuICAgICAgZGVzY3JpcHRpb246IGBUYW5kaXMgcXVlIG1vbiBww6hyZSBzJ2VuZG9ydCBwZXUgw6AgcGV1IGNvbnRyZSBtb2ksIGplIGx1aSBwYXJsZSB1bmUgZGVybmnDqHJlIGZvaXMgOiBQbHVzIHRhcmQsIHR1IG5lIHBvdXJyYXMgcGFzIHZpdnJlIGF2ZWMgbGUgc2VjcmV0IGRlcyBKYXJkaW4uIElsIHRlIHR1ZXJhLi4uIFR1IGZlcmFzIHVuIGxpdnJlLCBMZSBOYWluIGphdW5lLCBwb3VyIGxlIGNhbW91Zmxlci4gQXUgbcOqbWUgw6JnZSBxdWUgdG9pLCBqJ2VuIGZlcmFpIHVuLCBEZXMgZ2VucyB0csOocyBiaWVuLCBwb3VyIGwnZXhwb3Nlci4gRXQgamUgdml2cmFpIGxhIGRlcm5pw6hyZSBwYXJ0aWUgZGUgdGEgdmllLi4uIExhIG1pZW5uZS4gRG9ycyBtb24gcGV0aXQgcGFwYSwgZG9ycy4uLiBDZSBsaXZyZSBhdXJhaXQgcHUgcydhcHBlbGVyIFwiZmluaSBkZSByaXJlXCIuIEMnZXN0IGxlIGNhcm5ldCBkZSBib3JkIGRlIG1hIGxlbnRlIGx1Y2lkaXTDqS5gXG4gICAgfSwge1xuICAgICAgaWQ6IDQsXG4gICAgICB0aXRsZTogJ1RoZSBBdXRvYmlvZ3JhcGh5IG9mIEJlbmphbWluIEZyYW5rbGluJyxcbiAgICAgIGF1dGhvcjogJ0JlbmphbWluIEZyYW5rbGluJyxcbiAgICAgIGltYWdlX3VybDogJ2h0dHA6Ly9lY3guaW1hZ2VzLWFtYXpvbi5jb20vaW1hZ2VzL0kvNTFNeGpETTgwLUwuX1NYMzEwX0JPMSwyMDQsMjAzLDIwMF8uanBnJyxcbiAgICAgIGRlc2NyaXB0aW9uOiBgQmxlc3NlZCB3aXRoIGVub3Jtb3VzIHRhbGVudHMgYW5kIHRoZSBlbmVyZ3kgYW5kIGFtYml0aW9uIHRvIGdvIHdpdGggdGhlbSwgRnJhbmtsaW4gd2FzIGEgc3RhdGVzbWFuLCBhdXRob3IsIGludmVudG9yLCBwcmludGVyLCBhbmQgc2NpZW50aXN0LmBcbiAgICB9LCB7XG4gICAgICBpZDogNSxcbiAgICAgIHRpdGxlOiAnU2VjdXJpdHkgQW5hbHlzaXM6IFByaW5jaXBsZXMgYW5kIFRlY2huaXF1ZXMnLFxuICAgICAgYXV0aG9yOiAnQmVuamFtaW4gR3JhaGFtJyxcbiAgICAgIGltYWdlX3VybDogJ2h0dHA6Ly9lY3guaW1hZ2VzLWFtYXpvbi5jb20vaW1hZ2VzL0kvNTF5SnpQcTNucEwuX1NYMzA5X0JPMSwyMDQsMjAzLDIwMF8uanBnJyxcbiAgICAgIGRlc2NyaXB0aW9uOiBgQmVuamFtaW4gR3JhaGFtJ3MgcmV2b2x1dGlvbmFyeSB0aGVvcmllcyBoYXZlIGluZmx1ZW5jZWQgYW5kIGluc3BpcmVkIGludmVzdG9ycyBmb3IgbmVhcmx5IDcwIHllYXJzLiBGaXJzdCBwdWJsaXNoZWQgaW4gMTkzNCwgaGlzIFNlY3VyaXR5IEFuYWx5c2lzIGlzIHN0aWxsIGNvbnNpZGVyZWQgdG8gYmUgdGhlIHZhbHVlIGludmVzdGluZyBiaWJsZSBmb3IgaW52ZXN0b3JzIG9mIGV2ZXJ5IGlsay4gWWV0LCBpdCBpcyB0aGUgc2Vjb25kIGVkaXRpb24gb2YgdGhhdCBib29rLCBwdWJsaXNoZWQgaW4gMTk0MCBhbmQgbG9uZyBzaW5jZSBvdXQgb2YgcHJpbnQsIHRoYXQgbWFueSBleHBlcnRzLS1pbmNsdWRpbmcgR3JhaGFtIHByb3TDqWfDqSBXYXJyZW4gQnVmZmV0LS1jb25zaWRlciB0byBiZSB0aGUgZGVmaW5pdGl2ZSBlZGl0aW9uLiBUaGlzIGZhY3NpbWlsZSByZXByb2R1Y3Rpb24gb2YgdGhhdCBzZW1pbmFsIHdvcmsgbWFrZXMgYXZhaWxhYmxlIHRvIGludmVzdG9ycywgb25jZSBhZ2FpbiwgdGhlIG9yaWdpbmFsIHRoaW5raW5nIG9mIFwidGhpcyBjZW50dXJ5J3MgKGFuZCBwZXJoYXBzIGhpc3RvcnkncykgbW9zdCBpbXBvcnRhbnQgdGhpbmtlciBvbiBhcHBsaWVkIHBvcnRmb2xpbyBpbnZlc3RtZW50LlwiYFxuICAgIH1dO1xuICB9XG5cbiAgdG9nZ2xlKCkge1xuICAgIGlmICh0aGlzLnNpZGVOYXYuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaWRlLW5hdl9fdmlzaWJsZScpKSB7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zaG93KCk7XG4gICAgfVxuICB9XG5cbiAgaGlkZSgpIHtcbiAgICB0aGlzLnNpZGVOYXZDb250ZW50LmNsYXNzTGlzdC5hZGQoJ3NhdmUtbmF2X2NvbnRlbnRfYW5pbWF0YWJsZScpO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLnNpZGVOYXYuY2xhc3NMaXN0LnJlbW92ZSgnc2lkZS1uYXZfX3Zpc2libGUnKTtcbiAgICAgIHRoaXMuc2lkZU5hdkNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnc2lkZS1uYXZfY29udGVudF92aXNpYmxlJyk7XG4gICAgfSk7XG4gIH1cblxuICBvblNpZGVOYXZUcmFuc2l0aW9uRW5kKCkge1xuICAgIHRoaXMuc2lkZU5hdkNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnc2F2ZS1uYXZfY29udGVudF9hbmltYXRhYmxlJyk7XG4gICAgdGhpcy5zaWRlTmF2Q29udGVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgdGhpcy5vblNpZGVOYXZUcmFuc2l0aW9uRW5kKTtcbiAgfVxuXG4gIHNob3coKSB7XG4gICAgdGhpcy5zaWRlTmF2Q29udGVudC5jbGFzc0xpc3QuYWRkKCdzYXZlLW5hdl9jb250ZW50X2FuaW1hdGFibGUnKTtcbiAgICB0aGlzLnNpZGVOYXZDb250ZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCB0aGlzLm9uU2lkZU5hdlRyYW5zaXRpb25FbmQpO1xuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMuc2lkZU5hdi5jbGFzc0xpc3QuYWRkKCdzaWRlLW5hdl9fdmlzaWJsZScpO1xuICAgICAgdGhpcy5zaWRlTmF2Q29udGVudC5jbGFzc0xpc3QuYWRkKCdzaWRlLW5hdl9jb250ZW50X3Zpc2libGUnKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5hdlRvQm9va3MoKSB7XG4gICAgdGhpcy5oaWRlKCk7XG4gICAgLy9UT0RPKGJlbm9pdCkgc2hvdWxkIGRlYWwgd2l0aCB0aGUgcm91dGVyIGhlcmUgYXNcbiAgICAvLyBzYW1lIGZvciBwb3J0Zm9saW9cbiAgICAvL1xuICAgIFJvdXRlckluc3RhbmNlKCkudGhlbihyb3V0ZXIgPT4ge1xuICAgICAgcm91dGVyLmdvKGAvYm9va3MvYCk7XG4gICAgfSk7XG5cbiAgICAvLyB0aGlzLmhpZGUoKTtcbiAgICAvLyAvLyBUT0RPKGJlbm9pdCkgc28gd3JvbmcuIGxldHMgZ2V0IHNvbWUgYWRlcXVhdGUgTVZDLi4uXG4gICAgLy9cbiAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm9va3MtY29udGFpbmVyJykuY2xhc3NMaXN0LmFkZCgnYm9va3MtY29udGFpbmVyX192aXNpYmxlJyk7XG4gICAgLy9cbiAgICAvLyB0aGlzLmJvb2tzLmZvckVhY2goYm9vayA9PiB7XG4gICAgLy8gICBjb25zdCBib29rQ2FyZCA9IG5ldyBCb29rQ2FyZChib29rLmlkLCBib29rLnRpdGxlLCBib29rLmRlc2NyaXB0aW9uLCBib29rLmltYWdlX3VybCk7XG4gICAgLy8gICBib29rQ2FyZC5yZW5kZXIoKTtcbiAgICAvLyB9KTtcbiAgfVxuXG4gIG5hdlRvUG9ydGZvbGlvKCkge1xuICAgIHRoaXMuaGlkZSgpO1xuICAgIFJvdXRlckluc3RhbmNlKCkudGhlbihyb3V0ZXIgPT4ge1xuICAgICAgcm91dGVyLmdvKGAvcG9ydGZvbGlvL2ApO1xuICAgIH0pO1xuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBCdXR0b24gZnJvbSAnLi4vY29tcG9uZW50cy9CdXR0b24nO1xuaW1wb3J0IENvbnRyb2xsZXIgZnJvbSAnLi9Db250cm9sbGVyJztcbmltcG9ydCBTaWRlTmF2IGZyb20gJy4uL2NvbXBvbmVudHMvU2lkZU5hdic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcENvbnRyb2xsZXIgZXh0ZW5kcyBDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuYXBwTW9kZWwgPSBudWxsO1xuICAgIHRoaXMuc2lkZU5hdlRvZ2dsZUJ1dHRvbiA9IG5ldyBCdXR0b24oZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl90b2dnbGUtc2lkZS1uYXYnKSk7XG5cbiAgICB0aGlzLnNpZGVOYXZUb2dnbGVCdXR0b24uZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMudG9nZ2xlU2lkZU5hdi5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLnNpZGVOYXYgPSBuZXcgU2lkZU5hdigpO1xuXG4gICAgLy8gV2FpdCBmb3IgdGhlIGZpcnN0IGZyYW1lIGJlY2F1c2Ugc29tZXRpbWVzXG4gICAgLy8gd2luZG93Lm9ubG9hZCBmaXJlcyB0b28gcXVpY2tseS5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5sb2FkU2NyaXB0KCcvc2NyaXB0cy9mcmVzaGhvb2QtYm9va3MuanMnKTtcbiAgICAgIHRoaXMubG9hZFNjcmlwdCgnL3NjcmlwdHMvZnJlc2hob29kLXBvcnRmb2xpby5qcycpO1xuICAgICAgLy8gdGhpcy5sb2FkU2NyaXB0KCcvc2NyaXB0cy9mcmVzaGhvb2QtcG9ydGZvbGlvLmpzJyk7XG5cbiAgICAgIHRoaXMuc2lkZU5hdlRvZ2dsZUJ1dHRvbi5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICB0aGlzLnRvZ2dsZVNpZGVOYXYoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgdG9nZ2xlU2lkZU5hdigpIHtcbiAgICB0aGlzLnNpZGVOYXYudG9nZ2xlKCk7XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udHJvbGxlciB7XG4gIGxvYWRTY3JpcHQodXJsKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgIHNjcmlwdC5hc3luYyA9IHRydWU7XG4gICAgICBzY3JpcHQuc3JjID0gdXJsO1xuXG4gICAgICBzY3JpcHQub25sb2FkID0gcmVzb2x2ZTtcbiAgICAgIHNjcmlwdC5vbmVycm9yID0gcmVqZWN0O1xuXG4gICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgfSk7XG4gIH1cblxuICBsb2FkQ1NTKHVybCkge1xuICAgIHJldHVybiBmZXRjaCh1cmwpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgIHJlc3BvbnNlLnRleHQoKS50aGVuKGJvZHkgPT4ge1xuICAgICAgICAgIHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAgICAgc3R5bGUudGV4dENvbnRlbnQgPSBib2R5O1xuICAgICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IGBzdHlsZSBhdCB1cmw6JHt1cmx9IG5vdCBmb3VuZC5gO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBBcHBDb250cm9sbGVyICBmcm9tICcuL2NvbnRyb2xsZXJzL0FwcENvbnRyb2xsZXInO1xuXG5uZXcgQXBwQ29udHJvbGxlcigpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBSb3V0ZXJJbnN0YW5jZSgpIHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cuUm91dGVySW5zdGFuY2VfICE9PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUod2luZG93LlJvdXRlckluc3RhbmNlXyk7XG4gIH1cblxuICB3aW5kb3cuUm91dGVySW5zdGFuY2VfID0gbmV3IFJvdXRlcigpO1xuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHdpbmRvdy5Sb3V0ZXJJbnN0YW5jZV8pO1xufVxuXG5jbGFzcyBSb3V0ZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnJvdXRlcyA9IHt9O1xuICAgIHRoaXMuY3VycmVudEFjdGlvbiA9IG51bGw7XG4gICAgdGhpcy5sb2FkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9hZGVyJyk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCAoZSkgPT4ge1xuICAgICAgdGhpcy5vblBvcFN0YXRlKGUpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5tYW5hZ2VTdGF0ZSgpO1xuICB9XG5cbiAgYWRkKHBhdGgsIGNhbGxiYWNrSW4sIGNhbGxiYWNrT3V0LCBjYWxsYmFja1VwZGF0ZSkge1xuICAgIC8vIEFzc3VtZSB0aGUgZmlyc3QgcGFydCBvZiB0aGUgcGF0aCBpcyB0aGVcbiAgICAvLyB2ZXJiIHdlIHdhbnQgdG8gYWN0aW9uLCB3aXRoIHRoZSByZXN0IG9mIHRoZSBwYXRoXG4gICAgLy8gYmVpbmcgdGhlIGRhdGEgdG8gcGFzcyB0byB0aGUgaGFuZGxlci5cbiAgICBjb25zdCBwYXRoUGFydHMgPSBwYXRoLnNwbGl0KCcvJyk7XG4gICAgY29uc3QgYWN0aW9uID0gcGF0aFBhcnRzLnNoaWZ0KCk7XG5cbiAgICBpZiAodGhpcy5yb3V0ZXNbYWN0aW9uXSkge1xuICAgICAgdGhyb3cgXCJBIGhhbmRsZXIgYWxyZWFkeSBleGlzdHMgZm9yIHRoaXMgYWN0aW9uOiBcIiArIGFjdGlvbjtcbiAgICB9XG5cbiAgICB0aGlzLnJvdXRlc1thY3Rpb25dID0ge1xuICAgICAgaW4gOiBjYWxsYmFja0luLFxuICAgICAgb3V0OiBjYWxsYmFja091dCxcbiAgICAgIHVwZGF0ZTogY2FsbGJhY2tVcGRhdGVcbiAgICB9O1xuXG4gICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHRoaXMgcGF0aCBpcyBmdWxmaWxsZWQuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLm1hbmFnZVN0YXRlKCkpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdkZWVwbGluaycpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlKHBhdGgpIHtcbiAgICBjb25zdCBwYXRoUGFydHMgPSBwYXRoLnNwbGl0KCcvJyk7XG4gICAgY29uc3QgYWN0aW9uID0gcGF0aFBhcnRzLnNoaWZ0KCk7XG5cbiAgICBpZiAoIXRoaXMucm91dGVzW2FjdGlvbl0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZGVsZXRlIHRoaXMucm91dGVzW2FjdGlvbl07XG4gIH1cblxuICBtYW5hZ2VTdGF0ZSgpIHtcbiAgICBjb25zdCBwYXRoID0gZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXlxcLy8sICcnKTtcblxuICAgIC8vIEFzc3VtZSB0aGUgZmlyc3QgcGFydCBvZiB0aGUgcGF0aCBpcyB0aGVcbiAgICAvLyB2ZXJiIHdlIHdhbnQgdG8gYWN0aW9uLCB3aXRoIHRoZSByZXN0IG9mIHRoZSBwYXRoXG4gICAgLy8gYmVpbmcgdGhlIGRhdGEgdG8gcGFzcyB0byB0aGUgaGFuZGxlci5cbiAgICBjb25zdCBwYXRoUGFydHMgPSBwYXRoLnNwbGl0KCcvJyk7XG4gICAgbGV0IGFjdGlvbiA9IHBhdGhQYXJ0cy5zaGlmdCgpO1xuICAgIGNvbnN0IGRhdGEgPSBwYXRoUGFydHMuam9pbignLycpO1xuXG4gICAgLy8gQWRkIGEgc3BlY2lhbCBjYXNlIGZvciB0aGUgcm9vdC5cbiAgICBpZiAoYWN0aW9uID09PSAnJykge1xuICAgICAgYWN0aW9uID0gJ19yb290JztcbiAgICB9XG5cbiAgICAvLyBSZW1vdmUgYW55IGRlZXBsaW5rIGNvdmVycy5cbiAgICBpZiAoZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuY29udGFpbnMoJ2FwcC1kZWVwbGluaycpKSB7XG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2FwcC1kZWVwbGluaycpO1xuICAgIH1cblxuICAgIC8vIEhpZGUgdGhlIGxvYWRlci5cbiAgICB0aGlzLmxvYWRlci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcblxuICAgIGlmICh0aGlzLmN1cnJlbnRBY3Rpb24gPT09IHRoaXMucm91dGVzW2FjdGlvbl0pIHtcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5jdXJyZW50QWN0aW9uLnVwZGF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLmN1cnJlbnRBY3Rpb24udXBkYXRlKGRhdGEpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5yb3V0ZXNbYWN0aW9uXSkge1xuICAgICAgaWYgKHRoaXMuY3VycmVudEFjdGlvbikge1xuICAgICAgICB0aGlzLmN1cnJlbnRBY3Rpb24ub3V0KCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY3VycmVudEFjdGlvbiA9IG51bGw7XG4gICAgICBkb2N1bWVudC5ib2R5LmZvY3VzKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gU2V0IHRoZSBuZXcgYWN0aW9uIGdvaW5nLlxuICAgIGNvbnN0IGRlbGF5ID0gdGhpcy5yb3V0ZXNbYWN0aW9uXS5pbihkYXRhKSB8fCAwO1xuXG4gICAgLy8gUmVtb3ZlIHRoZSBvbGQgYWN0aW9uIGFuZCB1cGRhdGUgdGhlIHJlZmVyZW5jZS5cbiAgICBpZiAodGhpcy5jdXJyZW50QWN0aW9uKSB7XG4gICAgICAvLyBBbGxvdyB0aGUgaW5jb21pbmcgdmlldyB0byBkZWxheSB0aGUgb3V0Z29pbmcgb25lXG4gICAgICAvLyBzbyB0aGF0IHdlIGRvbid0IGdldCB0b28gbXVjaCBvdmVybGFwcGluZyBhbmltYXRpb24uXG4gICAgICBpZiAoZGVsYXkgPT09IDApIHtcbiAgICAgICAgdGhpcy5jdXJyZW50QWN0aW9uLm91dCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0VGltZW91dCh0aGlzLmN1cnJlbnRBY3Rpb24ub3V0LCBkZWxheSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5jdXJyZW50QWN0aW9uID0gdGhpcy5yb3V0ZXNbYWN0aW9uXTtcblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZ28ocGF0aCkge1xuICAgIC8vIE9ubHkgcHJvY2VzcyByZWFsIGNoYW5nZXMuXG4gICAgaWYgKHBhdGggPT09IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGhpc3RvcnkucHVzaFN0YXRlKHVuZGVmaW5lZCwgXCJcIiwgcGF0aCk7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMubWFuYWdlU3RhdGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIG9uUG9wU3RhdGUoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5tYW5hZ2VTdGF0ZSgpO1xuICAgIH0pO1xuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvb2tDYXJkIHtcbiAgY29uc3RydWN0b3IoaWQsIHRpdGxlID0gJ3RpdGxlJywgZGVzY3JpcHRpb24gPSAnZGVzY3JpcHRpb24nLCBpbWFnZVVybCkge1xuICAgIGlmIChpZCA9PSBudWxsKSB7XG4gICAgICB0aHJvdyAnbWlzc2luZyBpZCc7XG4gICAgfVxuXG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgdGhpcy5pbWFnZVVybCA9IGltYWdlVXJsO1xuICB9XG4gIC8vXG4gIC8vIGdldCBpbWFnZVVybCgpIHtcbiAgLy8gICByZXR1cm4gYGltYWdlcy8ke3RoaXMuaWR9LnBuZ2A7XG4gIC8vIH1cblxuICBnZXQgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIGA8ZGl2IGNsYXNzPVwiY2FyZF9pbm5lclwiPmAsXG4gICAgICAgIGA8ZGl2IGNsYXNzPVwiY2FyZF90aXRsZS1pbm5lclwiPmAsXG4gICAgICAgICAgYDxoMSBjbGFzcz1cImNhcmRfdGl0bGVcIj4ke3RoaXMudGl0bGV9PC9oMT5gLFxuICAgICAgICBgPC9kaXY+YCxcbiAgICAgICAgYDxmaWd1cmUgY2xhc3M9XCJjYXJkX2ZpZ3VyZVwiPmAsXG4gICAgICAgICAgYDxpbWcgY2xhc3M9XCJjYXJkX2ltYWdlXCIgc3JjPVwiJHt0aGlzLmltYWdlVXJsfVwiIC8+YCxcbiAgICAgICAgYDwvZmlndXJlPmAsXG4gICAgICAgIGA8ZGl2IGNsYXNzPVwiY2FyZF9kZXNjcmlwdGlvbi1pbm5lclwiPmAsXG4gICAgICAgICAgYDxwIGNsYXNzPVwiY2FyZF9kZXNjcmlwdGlvblwiPiR7dGhpcy5kZXNjcmlwdGlvbn08L3A+YCxcbiAgICAgICAgYDwvZGl2PmAsXG4gICAgICBgPC9kaXY+YFxuICAgIF0uam9pbignJyk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdib29rLWNhcmQnLCBgY2FyZC0ke3RoaXMuaWR9YCk7XG4gICAgdGhpcy5lbGVtZW50LmlubmVySFRNTCA9IHRoaXMudGVtcGxhdGU7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJvb2tzLWNvbnRhaW5lcicpLmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudCk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuZWxlbWVudC5yZW1vdmUoKTtcbiAgfVxufVxuIl19
