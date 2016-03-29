/*! (c) 2016 Benoit Quenaudon (MIT) */
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BookCard = require('../models/BookCard');

var _BookCard2 = _interopRequireDefault(_BookCard);

var _Controller2 = require('./Controller');

var _Controller3 = _interopRequireDefault(_Controller2);

var _Router = require('../libs/Router');

var _Router2 = _interopRequireDefault(_Router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PortfolioController = function (_Controller) {
  _inherits(PortfolioController, _Controller);

  function PortfolioController() {
    _classCallCheck(this, PortfolioController);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PortfolioController).call(this));

    console.log('portfolio');

    _this.loadCSS('/styles/freshhood-portfolio.css').then(function () {
      // this.view.classList.remove('hidden');

      (0, _Router2.default)().then(function (router) {
        router.add('portfolio', function () {
          return console.log('portfolio in');
        }, function () {
          return console.log('portfolio out');
        }, function () {
          return console.log('portfolio update');
        });
      });
    });
    return _this;
  }

  return PortfolioController;
}(_Controller3.default);

exports.default = PortfolioController;

},{"../libs/Router":4,"../models/BookCard":5,"./Controller":1}],3:[function(require,module,exports){
'use strict';

var _PortfolioController = require('./controllers/PortfolioController');

var _PortfolioController2 = _interopRequireDefault(_PortfolioController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _PortfolioController2.default();

console.log('portfolio loaded');

},{"./controllers/PortfolioController":2}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9jb250cm9sbGVycy9Db250cm9sbGVyLmpzIiwic3JjL3NjcmlwdHMvY29udHJvbGxlcnMvUG9ydGZvbGlvQ29udHJvbGxlci5qcyIsInNyYy9zY3JpcHRzL2ZyZXNoaG9vZC1wb3J0Zm9saW8uanMiLCJzcmMvc2NyaXB0cy9saWJzL1JvdXRlci5qcyIsInNyYy9zY3JpcHRzL21vZGVscy9Cb29rQ2FyZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOzs7Ozs7Ozs7O0lBRXFCOzs7Ozs7OytCQUNSLEtBQUs7QUFDZCxhQUFPLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBcUI7QUFDdEMsWUFBSSxTQUFTLFNBQVMsYUFBVCxDQUF1QixRQUF2QixDQUFULENBRGtDO0FBRXRDLGVBQU8sS0FBUCxHQUFlLElBQWYsQ0FGc0M7QUFHdEMsZUFBTyxHQUFQLEdBQWEsR0FBYixDQUhzQzs7QUFLdEMsZUFBTyxNQUFQLEdBQWdCLE9BQWhCLENBTHNDO0FBTXRDLGVBQU8sT0FBUCxHQUFpQixNQUFqQixDQU5zQzs7QUFRdEMsaUJBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsTUFBMUIsRUFSc0M7T0FBckIsQ0FBbkIsQ0FEYzs7Ozs0QkFhUixLQUFLO0FBQ1gsYUFBTyxNQUFNLEdBQU4sRUFBVyxJQUFYLENBQWdCLG9CQUFZO0FBQ2pDLFlBQUksU0FBUyxNQUFULEtBQW9CLEdBQXBCLEVBQXlCO0FBQzNCLG1CQUFTLElBQVQsR0FBZ0IsSUFBaEIsQ0FBcUIsZ0JBQVE7QUFDM0IsZ0JBQUksUUFBUSxTQUFTLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBUixDQUR1QjtBQUUzQixrQkFBTSxXQUFOLEdBQW9CLElBQXBCLENBRjJCO0FBRzNCLHFCQUFTLElBQVQsQ0FBYyxXQUFkLENBQTBCLEtBQTFCLEVBSDJCO1dBQVIsQ0FBckIsQ0FEMkI7U0FBN0IsTUFNTztBQUNMLGtDQUFzQixtQkFBdEIsQ0FESztTQU5QO09BRHFCLENBQXZCLENBRFc7Ozs7U0FkTTs7Ozs7O0FDRnJCOzs7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQjs7O0FBQ25CLFdBRG1CLG1CQUNuQixHQUFjOzBCQURLLHFCQUNMOzt1RUFESyxpQ0FDTDs7QUFFWixZQUFRLEdBQVIsQ0FBWSxXQUFaLEVBRlk7O0FBSVosVUFBSyxPQUFMLENBQWEsaUNBQWIsRUFBZ0QsSUFBaEQsQ0FBcUQsWUFBTTs7O0FBR3pELDhCQUFpQixJQUFqQixDQUFzQixVQUFDLE1BQUQsRUFBWTtBQUNoQyxlQUFPLEdBQVAsQ0FBVyxXQUFYLEVBQ0U7aUJBQU0sUUFBUSxHQUFSLENBQVksY0FBWjtTQUFOLEVBQ0E7aUJBQU0sUUFBUSxHQUFSLENBQVksZUFBWjtTQUFOLEVBQ0E7aUJBQU0sUUFBUSxHQUFSLENBQVksa0JBQVo7U0FBTixDQUhGLENBRGdDO09BQVosQ0FBdEIsQ0FIeUQ7S0FBTixDQUFyRCxDQUpZOztHQUFkOztTQURtQjs7Ozs7O0FDTnJCOztBQUVBOzs7Ozs7QUFFQTs7QUFFQSxRQUFRLEdBQVIsQ0FBWSxrQkFBWjs7O0FDTkE7Ozs7Ozs7O2tCQUV3Qjs7OztBQUFULFNBQVMsY0FBVCxHQUEwQjtBQUN2QyxNQUFJLE9BQU8sT0FBTyxlQUFQLEtBQTJCLFdBQWxDLEVBQStDO0FBQ2pELFdBQU8sUUFBUSxPQUFSLENBQWdCLE9BQU8sZUFBUCxDQUF2QixDQURpRDtHQUFuRDs7QUFJQSxTQUFPLGVBQVAsR0FBeUIsSUFBSSxNQUFKLEVBQXpCLENBTHVDO0FBTXZDLFNBQU8sUUFBUSxPQUFSLENBQWdCLE9BQU8sZUFBUCxDQUF2QixDQU51QztDQUExQjs7SUFTVDtBQUNKLFdBREksTUFDSixHQUFjOzs7MEJBRFYsUUFDVTs7QUFDWixTQUFLLE1BQUwsR0FBYyxFQUFkLENBRFk7QUFFWixTQUFLLGFBQUwsR0FBcUIsSUFBckIsQ0FGWTtBQUdaLFNBQUssTUFBTCxHQUFjLFNBQVMsYUFBVCxDQUF1QixTQUF2QixDQUFkLENBSFk7O0FBS1osV0FBTyxnQkFBUCxDQUF3QixVQUF4QixFQUFvQyxVQUFDLENBQUQsRUFBTztBQUN6QyxZQUFLLFVBQUwsQ0FBZ0IsQ0FBaEIsRUFEeUM7S0FBUCxDQUFwQyxDQUxZOztBQVNaLFNBQUssV0FBTCxHQVRZO0dBQWQ7O2VBREk7O3dCQWFBLE1BQU0sWUFBWSxhQUFhLGdCQUFnQjs7Ozs7O0FBSWpELFVBQU0sWUFBWSxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQVosQ0FKMkM7QUFLakQsVUFBTSxTQUFTLFVBQVUsS0FBVixFQUFULENBTDJDOztBQU9qRCxVQUFJLEtBQUssTUFBTCxDQUFZLE1BQVosQ0FBSixFQUF5QjtBQUN2QixjQUFNLCtDQUErQyxNQUEvQyxDQURpQjtPQUF6Qjs7QUFJQSxXQUFLLE1BQUwsQ0FBWSxNQUFaLElBQXNCO0FBQ3BCLFlBQUssVUFBTDtBQUNBLGFBQUssV0FBTDtBQUNBLGdCQUFRLGNBQVI7T0FIRjs7O0FBWGlELDJCQWtCakQsQ0FBc0IsWUFBTTtBQUMxQixZQUFJLE9BQUssV0FBTCxFQUFKLEVBQXdCO0FBQ3RCLG1CQUFTLElBQVQsQ0FBYyxTQUFkLENBQXdCLE1BQXhCLENBQStCLFVBQS9CLEVBRHNCO1NBQXhCO09BRG9CLENBQXRCLENBbEJpRDs7OzsyQkF5QjVDLE1BQU07QUFDWCxVQUFNLFlBQVksS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFaLENBREs7QUFFWCxVQUFNLFNBQVMsVUFBVSxLQUFWLEVBQVQsQ0FGSzs7QUFJWCxVQUFJLENBQUMsS0FBSyxNQUFMLENBQVksTUFBWixDQUFELEVBQXNCO0FBQ3hCLGVBRHdCO09BQTFCO0FBR0EsYUFBTyxLQUFLLE1BQUwsQ0FBWSxNQUFaLENBQVAsQ0FQVzs7OztrQ0FVQztBQUNaLFVBQU0sT0FBTyxTQUFTLFFBQVQsQ0FBa0IsUUFBbEIsQ0FBMkIsT0FBM0IsQ0FBbUMsS0FBbkMsRUFBMEMsRUFBMUMsQ0FBUDs7Ozs7QUFETSxVQU1OLFlBQVksS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFaLENBTk07QUFPWixVQUFJLFNBQVMsVUFBVSxLQUFWLEVBQVQsQ0FQUTtBQVFaLFVBQU0sT0FBTyxVQUFVLElBQVYsQ0FBZSxHQUFmLENBQVA7OztBQVJNLFVBV1IsV0FBVyxFQUFYLEVBQWU7QUFDakIsaUJBQVMsT0FBVCxDQURpQjtPQUFuQjs7O0FBWFksVUFnQlIsU0FBUyxJQUFULENBQWMsU0FBZCxDQUF3QixRQUF4QixDQUFpQyxjQUFqQyxDQUFKLEVBQXNEO0FBQ3BELGlCQUFTLElBQVQsQ0FBYyxTQUFkLENBQXdCLE1BQXhCLENBQStCLGNBQS9CLEVBRG9EO09BQXREOzs7QUFoQlksVUFxQlosQ0FBSyxNQUFMLENBQVksU0FBWixDQUFzQixHQUF0QixDQUEwQixRQUExQixFQXJCWTs7QUF1QlosVUFBSSxLQUFLLGFBQUwsS0FBdUIsS0FBSyxNQUFMLENBQVksTUFBWixDQUF2QixFQUE0QztBQUM5QyxZQUFJLE9BQU8sS0FBSyxhQUFMLENBQW1CLE1BQW5CLEtBQThCLFVBQXJDLEVBQWlEO0FBQ25ELGVBQUssYUFBTCxDQUFtQixNQUFuQixDQUEwQixJQUExQixFQURtRDtBQUVuRCxpQkFBTyxJQUFQLENBRm1EO1NBQXJEOztBQUtBLGVBQU8sS0FBUCxDQU44QztPQUFoRDs7QUFTQSxVQUFJLENBQUMsS0FBSyxNQUFMLENBQVksTUFBWixDQUFELEVBQXNCO0FBQ3hCLFlBQUksS0FBSyxhQUFMLEVBQW9CO0FBQ3RCLGVBQUssYUFBTCxDQUFtQixHQUFuQixHQURzQjtTQUF4Qjs7QUFJQSxhQUFLLGFBQUwsR0FBcUIsSUFBckIsQ0FMd0I7QUFNeEIsaUJBQVMsSUFBVCxDQUFjLEtBQWQsR0FOd0I7QUFPeEIsZUFBTyxLQUFQLENBUHdCO09BQTFCOzs7QUFoQ1ksVUEyQ04sUUFBUSxLQUFLLE1BQUwsQ0FBWSxNQUFaLEVBQW9CLEVBQXBCLENBQXVCLElBQXZCLEtBQWdDLENBQWhDOzs7QUEzQ0YsVUE4Q1IsS0FBSyxhQUFMLEVBQW9COzs7QUFHdEIsWUFBSSxVQUFVLENBQVYsRUFBYTtBQUNmLGVBQUssYUFBTCxDQUFtQixHQUFuQixHQURlO1NBQWpCLE1BRU87QUFDTCxxQkFBVyxLQUFLLGFBQUwsQ0FBbUIsR0FBbkIsRUFBd0IsS0FBbkMsRUFESztTQUZQO09BSEY7O0FBVUEsV0FBSyxhQUFMLEdBQXFCLEtBQUssTUFBTCxDQUFZLE1BQVosQ0FBckIsQ0F4RFk7O0FBMERaLGFBQU8sSUFBUCxDQTFEWTs7Ozt1QkE2RFgsTUFBTTs7OztBQUVQLFVBQUksU0FBUyxPQUFPLFFBQVAsQ0FBZ0IsUUFBaEIsRUFBMEI7QUFDckMsZUFEcUM7T0FBdkM7O0FBSUEsY0FBUSxTQUFSLENBQWtCLFNBQWxCLEVBQTZCLEVBQTdCLEVBQWlDLElBQWpDLEVBTk87QUFPUCw0QkFBc0IsWUFBTTtBQUMxQixlQUFLLFdBQUwsR0FEMEI7T0FBTixDQUF0QixDQVBPOzs7OytCQVlFLEdBQUc7OztBQUNaLFFBQUUsY0FBRixHQURZO0FBRVosNEJBQXNCLFlBQU07QUFDMUIsZUFBSyxXQUFMLEdBRDBCO09BQU4sQ0FBdEIsQ0FGWTs7OztTQXpIVjs7OztBQ1hOOzs7Ozs7Ozs7O0lBRXFCO0FBQ25CLFdBRG1CLFFBQ25CLENBQVksRUFBWixFQUF3RTtRQUF4RCw4REFBUSx1QkFBZ0Q7UUFBdkMsb0VBQWMsNkJBQXlCO1FBQVYsd0JBQVU7OzBCQURyRCxVQUNxRDs7QUFDdEUsUUFBSSxNQUFNLElBQU4sRUFBWTtBQUNkLFlBQU0sWUFBTixDQURjO0tBQWhCOztBQUlBLFNBQUssRUFBTCxHQUFVLEVBQVYsQ0FMc0U7QUFNdEUsU0FBSyxLQUFMLEdBQWEsS0FBYixDQU5zRTtBQU90RSxTQUFLLFdBQUwsR0FBbUIsV0FBbkIsQ0FQc0U7QUFRdEUsU0FBSyxRQUFMLEdBQWdCLFFBQWhCLENBUnNFO0dBQXhFOzs7Ozs7ZUFEbUI7OzZCQWdDVjtBQUNQLFdBQUssT0FBTCxHQUFlLFNBQVMsYUFBVCxDQUF1QixTQUF2QixDQUFmLENBRE87QUFFUCxXQUFLLE9BQUwsQ0FBYSxTQUFiLENBQXVCLEdBQXZCLENBQTJCLFdBQTNCLFlBQWdELEtBQUssRUFBTCxDQUFoRCxDQUZPO0FBR1AsV0FBSyxPQUFMLENBQWEsU0FBYixHQUF5QixLQUFLLFFBQUwsQ0FIbEI7QUFJUCxlQUFTLGFBQVQsQ0FBdUIsa0JBQXZCLEVBQTJDLFdBQTNDLENBQXVELEtBQUssT0FBTCxDQUF2RCxDQUpPOzs7OzhCQU9DO0FBQ1IsV0FBSyxPQUFMLENBQWEsTUFBYixHQURROzs7O3dCQXZCSztBQUNiLGFBQU8sMkZBR3lCLEtBQUssS0FBTCxVQUh6Qiw4RUFNK0IsS0FBSyxRQUFMLFNBTi9CLHdGQVM4QixLQUFLLFdBQUwsU0FUOUIsc0JBWUwsSUFaSyxDQVlBLEVBWkEsQ0FBUCxDQURhOzs7O1NBaEJJIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udHJvbGxlciB7XG4gIGxvYWRTY3JpcHQodXJsKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgIHNjcmlwdC5hc3luYyA9IHRydWU7XG4gICAgICBzY3JpcHQuc3JjID0gdXJsO1xuXG4gICAgICBzY3JpcHQub25sb2FkID0gcmVzb2x2ZTtcbiAgICAgIHNjcmlwdC5vbmVycm9yID0gcmVqZWN0O1xuXG4gICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgfSk7XG4gIH1cblxuICBsb2FkQ1NTKHVybCkge1xuICAgIHJldHVybiBmZXRjaCh1cmwpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgIHJlc3BvbnNlLnRleHQoKS50aGVuKGJvZHkgPT4ge1xuICAgICAgICAgIHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAgICAgc3R5bGUudGV4dENvbnRlbnQgPSBib2R5O1xuICAgICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IGBzdHlsZSBhdCB1cmw6JHt1cmx9IG5vdCBmb3VuZC5gO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBCb29rQ2FyZCBmcm9tICcuLi9tb2RlbHMvQm9va0NhcmQnO1xuaW1wb3J0IENvbnRyb2xsZXIgZnJvbSAnLi9Db250cm9sbGVyJztcbmltcG9ydCBSb3V0ZXJJbnN0YW5jZSBmcm9tICcuLi9saWJzL1JvdXRlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcnRmb2xpb0NvbnRyb2xsZXIgZXh0ZW5kcyBDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKVxuICAgIGNvbnNvbGUubG9nKCdwb3J0Zm9saW8nKTtcblxuICAgIHRoaXMubG9hZENTUygnL3N0eWxlcy9mcmVzaGhvb2QtcG9ydGZvbGlvLmNzcycpLnRoZW4oKCkgPT4ge1xuICAgICAgLy8gdGhpcy52aWV3LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuXG4gICAgICBSb3V0ZXJJbnN0YW5jZSgpLnRoZW4oKHJvdXRlcikgPT4ge1xuICAgICAgICByb3V0ZXIuYWRkKCdwb3J0Zm9saW8nLFxuICAgICAgICAgICgpID0+IGNvbnNvbGUubG9nKCdwb3J0Zm9saW8gaW4nKSxcbiAgICAgICAgICAoKSA9PiBjb25zb2xlLmxvZygncG9ydGZvbGlvIG91dCcpLFxuICAgICAgICAgICgpID0+IGNvbnNvbGUubG9nKCdwb3J0Zm9saW8gdXBkYXRlJykpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFBvcnRmb2xpb0NvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVycy9Qb3J0Zm9saW9Db250cm9sbGVyJztcblxubmV3IFBvcnRmb2xpb0NvbnRyb2xsZXIoKTtcblxuY29uc29sZS5sb2coJ3BvcnRmb2xpbyBsb2FkZWQnKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUm91dGVySW5zdGFuY2UoKSB7XG4gIGlmICh0eXBlb2Ygd2luZG93LlJvdXRlckluc3RhbmNlXyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHdpbmRvdy5Sb3V0ZXJJbnN0YW5jZV8pO1xuICB9XG5cbiAgd2luZG93LlJvdXRlckluc3RhbmNlXyA9IG5ldyBSb3V0ZXIoKTtcbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh3aW5kb3cuUm91dGVySW5zdGFuY2VfKTtcbn1cblxuY2xhc3MgUm91dGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5yb3V0ZXMgPSB7fTtcbiAgICB0aGlzLmN1cnJlbnRBY3Rpb24gPSBudWxsO1xuICAgIHRoaXMubG9hZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvYWRlcicpO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgKGUpID0+IHtcbiAgICAgIHRoaXMub25Qb3BTdGF0ZShlKTtcbiAgICB9KTtcblxuICAgIHRoaXMubWFuYWdlU3RhdGUoKTtcbiAgfVxuXG4gIGFkZChwYXRoLCBjYWxsYmFja0luLCBjYWxsYmFja091dCwgY2FsbGJhY2tVcGRhdGUpIHtcbiAgICAvLyBBc3N1bWUgdGhlIGZpcnN0IHBhcnQgb2YgdGhlIHBhdGggaXMgdGhlXG4gICAgLy8gdmVyYiB3ZSB3YW50IHRvIGFjdGlvbiwgd2l0aCB0aGUgcmVzdCBvZiB0aGUgcGF0aFxuICAgIC8vIGJlaW5nIHRoZSBkYXRhIHRvIHBhc3MgdG8gdGhlIGhhbmRsZXIuXG4gICAgY29uc3QgcGF0aFBhcnRzID0gcGF0aC5zcGxpdCgnLycpO1xuICAgIGNvbnN0IGFjdGlvbiA9IHBhdGhQYXJ0cy5zaGlmdCgpO1xuXG4gICAgaWYgKHRoaXMucm91dGVzW2FjdGlvbl0pIHtcbiAgICAgIHRocm93IFwiQSBoYW5kbGVyIGFscmVhZHkgZXhpc3RzIGZvciB0aGlzIGFjdGlvbjogXCIgKyBhY3Rpb247XG4gICAgfVxuXG4gICAgdGhpcy5yb3V0ZXNbYWN0aW9uXSA9IHtcbiAgICAgIGluIDogY2FsbGJhY2tJbixcbiAgICAgIG91dDogY2FsbGJhY2tPdXQsXG4gICAgICB1cGRhdGU6IGNhbGxiYWNrVXBkYXRlXG4gICAgfTtcblxuICAgIC8vIENoZWNrIHRvIHNlZSBpZiB0aGlzIHBhdGggaXMgZnVsZmlsbGVkLlxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5tYW5hZ2VTdGF0ZSgpKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnZGVlcGxpbmsnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZShwYXRoKSB7XG4gICAgY29uc3QgcGF0aFBhcnRzID0gcGF0aC5zcGxpdCgnLycpO1xuICAgIGNvbnN0IGFjdGlvbiA9IHBhdGhQYXJ0cy5zaGlmdCgpO1xuXG4gICAgaWYgKCF0aGlzLnJvdXRlc1thY3Rpb25dKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGRlbGV0ZSB0aGlzLnJvdXRlc1thY3Rpb25dO1xuICB9XG5cbiAgbWFuYWdlU3RhdGUoKSB7XG4gICAgY29uc3QgcGF0aCA9IGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLCAnJyk7XG5cbiAgICAvLyBBc3N1bWUgdGhlIGZpcnN0IHBhcnQgb2YgdGhlIHBhdGggaXMgdGhlXG4gICAgLy8gdmVyYiB3ZSB3YW50IHRvIGFjdGlvbiwgd2l0aCB0aGUgcmVzdCBvZiB0aGUgcGF0aFxuICAgIC8vIGJlaW5nIHRoZSBkYXRhIHRvIHBhc3MgdG8gdGhlIGhhbmRsZXIuXG4gICAgY29uc3QgcGF0aFBhcnRzID0gcGF0aC5zcGxpdCgnLycpO1xuICAgIGxldCBhY3Rpb24gPSBwYXRoUGFydHMuc2hpZnQoKTtcbiAgICBjb25zdCBkYXRhID0gcGF0aFBhcnRzLmpvaW4oJy8nKTtcblxuICAgIC8vIEFkZCBhIHNwZWNpYWwgY2FzZSBmb3IgdGhlIHJvb3QuXG4gICAgaWYgKGFjdGlvbiA9PT0gJycpIHtcbiAgICAgIGFjdGlvbiA9ICdfcm9vdCc7XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIGFueSBkZWVwbGluayBjb3ZlcnMuXG4gICAgaWYgKGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKCdhcHAtZGVlcGxpbmsnKSkge1xuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdhcHAtZGVlcGxpbmsnKTtcbiAgICB9XG5cbiAgICAvLyBIaWRlIHRoZSBsb2FkZXIuXG4gICAgdGhpcy5sb2FkZXIuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG5cbiAgICBpZiAodGhpcy5jdXJyZW50QWN0aW9uID09PSB0aGlzLnJvdXRlc1thY3Rpb25dKSB7XG4gICAgICBpZiAodHlwZW9mIHRoaXMuY3VycmVudEFjdGlvbi51cGRhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50QWN0aW9uLnVwZGF0ZShkYXRhKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMucm91dGVzW2FjdGlvbl0pIHtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRBY3Rpb24pIHtcbiAgICAgICAgdGhpcy5jdXJyZW50QWN0aW9uLm91dCgpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmN1cnJlbnRBY3Rpb24gPSBudWxsO1xuICAgICAgZG9jdW1lbnQuYm9keS5mb2N1cygpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIFNldCB0aGUgbmV3IGFjdGlvbiBnb2luZy5cbiAgICBjb25zdCBkZWxheSA9IHRoaXMucm91dGVzW2FjdGlvbl0uaW4oZGF0YSkgfHwgMDtcblxuICAgIC8vIFJlbW92ZSB0aGUgb2xkIGFjdGlvbiBhbmQgdXBkYXRlIHRoZSByZWZlcmVuY2UuXG4gICAgaWYgKHRoaXMuY3VycmVudEFjdGlvbikge1xuICAgICAgLy8gQWxsb3cgdGhlIGluY29taW5nIHZpZXcgdG8gZGVsYXkgdGhlIG91dGdvaW5nIG9uZVxuICAgICAgLy8gc28gdGhhdCB3ZSBkb24ndCBnZXQgdG9vIG11Y2ggb3ZlcmxhcHBpbmcgYW5pbWF0aW9uLlxuICAgICAgaWYgKGRlbGF5ID09PSAwKSB7XG4gICAgICAgIHRoaXMuY3VycmVudEFjdGlvbi5vdXQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFRpbWVvdXQodGhpcy5jdXJyZW50QWN0aW9uLm91dCwgZGVsYXkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuY3VycmVudEFjdGlvbiA9IHRoaXMucm91dGVzW2FjdGlvbl07XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGdvKHBhdGgpIHtcbiAgICAvLyBPbmx5IHByb2Nlc3MgcmVhbCBjaGFuZ2VzLlxuICAgIGlmIChwYXRoID09PSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBoaXN0b3J5LnB1c2hTdGF0ZSh1bmRlZmluZWQsIFwiXCIsIHBhdGgpO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLm1hbmFnZVN0YXRlKCk7XG4gICAgfSk7XG4gIH1cblxuICBvblBvcFN0YXRlKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMubWFuYWdlU3RhdGUoKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb29rQ2FyZCB7XG4gIGNvbnN0cnVjdG9yKGlkLCB0aXRsZSA9ICd0aXRsZScsIGRlc2NyaXB0aW9uID0gJ2Rlc2NyaXB0aW9uJywgaW1hZ2VVcmwpIHtcbiAgICBpZiAoaWQgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgJ21pc3NpbmcgaWQnO1xuICAgIH1cblxuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIHRoaXMuaW1hZ2VVcmwgPSBpbWFnZVVybDtcbiAgfVxuICAvL1xuICAvLyBnZXQgaW1hZ2VVcmwoKSB7XG4gIC8vICAgcmV0dXJuIGBpbWFnZXMvJHt0aGlzLmlkfS5wbmdgO1xuICAvLyB9XG5cbiAgZ2V0IHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBbXG4gICAgICBgPGRpdiBjbGFzcz1cImNhcmRfaW5uZXJcIj5gLFxuICAgICAgICBgPGRpdiBjbGFzcz1cImNhcmRfdGl0bGUtaW5uZXJcIj5gLFxuICAgICAgICAgIGA8aDEgY2xhc3M9XCJjYXJkX3RpdGxlXCI+JHt0aGlzLnRpdGxlfTwvaDE+YCxcbiAgICAgICAgYDwvZGl2PmAsXG4gICAgICAgIGA8ZmlndXJlIGNsYXNzPVwiY2FyZF9maWd1cmVcIj5gLFxuICAgICAgICAgIGA8aW1nIGNsYXNzPVwiY2FyZF9pbWFnZVwiIHNyYz1cIiR7dGhpcy5pbWFnZVVybH1cIiAvPmAsXG4gICAgICAgIGA8L2ZpZ3VyZT5gLFxuICAgICAgICBgPGRpdiBjbGFzcz1cImNhcmRfZGVzY3JpcHRpb24taW5uZXJcIj5gLFxuICAgICAgICAgIGA8cCBjbGFzcz1cImNhcmRfZGVzY3JpcHRpb25cIj4ke3RoaXMuZGVzY3JpcHRpb259PC9wPmAsXG4gICAgICAgIGA8L2Rpdj5gLFxuICAgICAgYDwvZGl2PmBcbiAgICBdLmpvaW4oJycpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYm9vay1jYXJkJywgYGNhcmQtJHt0aGlzLmlkfWApO1xuICAgIHRoaXMuZWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLnRlbXBsYXRlO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib29rcy1jb250YWluZXInKS5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLmVsZW1lbnQucmVtb3ZlKCk7XG4gIH1cbn1cbiJdfQ==
