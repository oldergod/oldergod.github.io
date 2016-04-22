/*! (c) 2016 Benoit Quenaudon (MIT) */
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

var BooksController = function (_Controller) {
  _inherits(BooksController, _Controller);

  function BooksController() {
    _classCallCheck(this, BooksController);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BooksController).call(this));

    _this.container = document.querySelector('.books-container');
    //TODO (benoit) get books from some json
    _this.books = [{
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
    _this.renderedBooks = [];
    // show them - not here ? or use some requestIdleCallback ?
    // eventlistener <= expand cards, links etc.

    _this.loadCSS('/styles/freshhood-books.css').then(function () {
      // this.view.classList.remove('hidden');

      (0, _Router2.default)().then(function (router) {
        router.add('books', function () {
          return _this.show();
        }, function () {
          return _this.hide();
        }, function () {
          return console.log('update');
        });
      });
    });
    return _this;
  }

  _createClass(BooksController, [{
    key: 'show',
    value: function show() {
      this.container.classList.add('books-container__visible');
      this.fill();
    }
  }, {
    key: 'fill',
    value: function fill() {
      this.renderedBooks = this.books.map(function (book) {
        var bookCard = new _BookCard2.default(book.id, book.title, book.description, book.image_url);
        bookCard.render();
        return bookCard;
      });
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.container.classList.remove('books-container__visible');
      this.destroyBookCards();
    }
  }, {
    key: 'update',
    value: function update() {
      console.log('update');
    }
  }, {
    key: 'destroyBookCards',
    value: function destroyBookCards() {
      this.renderedBooks.forEach(function (bookCard) {
        return bookCard.destroy();
      });
    }
  }]);

  return BooksController;
}(_Controller3.default);

exports.default = BooksController;

},{"../libs/Router":4,"../models/BookCard":5,"./Controller":2}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
'use strict';

var _BooksController = require('./controllers/BooksController');

var _BooksController2 = _interopRequireDefault(_BooksController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _BooksController2.default();

console.log('books loaded');

},{"./controllers/BooksController":1}],4:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9jb250cm9sbGVycy9Cb29rc0NvbnRyb2xsZXIuanMiLCJzcmMvc2NyaXB0cy9jb250cm9sbGVycy9Db250cm9sbGVyLmpzIiwic3JjL3NjcmlwdHMvZnJlc2hob29kLWJvb2tzLmpzIiwic3JjL3NjcmlwdHMvbGlicy9Sb3V0ZXIuanMiLCJzcmMvc2NyaXB0cy9tb2RlbHMvQm9va0NhcmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7Ozs7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQjs7O0FBQ25CLFdBRG1CLGVBQ25CLEdBQWM7MEJBREssaUJBQ0w7O3VFQURLLDZCQUNMOztBQUdaLFVBQUssU0FBTCxHQUFpQixTQUFTLGFBQVQsQ0FBdUIsa0JBQXZCLENBQWpCOztBQUhZLFNBS1osQ0FBSyxLQUFMLEdBQWEsQ0FBQztBQUNaLFVBQUksQ0FBSjtBQUNBLGFBQU8sNENBQVA7QUFDQSxjQUFRLGdCQUFSO0FBQ0EsaUJBQVcsaUZBQVg7QUFDQSwwaUJBTFk7S0FBRCxFQU1WO0FBQ0QsVUFBSSxDQUFKO0FBQ0EsYUFBTyxhQUFQO0FBQ0EsY0FBUSxtQkFBUjtBQUNBLGlCQUFXLGlGQUFYO0FBQ0Esa3VCQUxDO0tBTlUsRUFZVjtBQUNELFVBQUksQ0FBSjtBQUNBLGFBQU8sb0JBQVA7QUFDQSxjQUFRLGlCQUFSO0FBQ0EsaUJBQVcsK0VBQVg7QUFDQSx1ZUFMQztLQVpVLEVBa0JWO0FBQ0QsVUFBSSxDQUFKO0FBQ0EsYUFBTyx3Q0FBUDtBQUNBLGNBQVEsbUJBQVI7QUFDQSxpQkFBVywrRUFBWDtBQUNBLG1LQUxDO0tBbEJVLEVBd0JWO0FBQ0QsVUFBSSxDQUFKO0FBQ0EsYUFBTyw4Q0FBUDtBQUNBLGNBQVEsaUJBQVI7QUFDQSxpQkFBVywrRUFBWDtBQUNBLDZvQkFMQztL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QWhCLENBUnNFO0dBQXhFOzs7Ozs7ZUFEbUI7OzZCQWdDVjtBQUNQLFdBQUssT0FBTCxHQUFlLFNBQVMsYUFBVCxDQUF1QixTQUF2QixDQUFmLENBRE87QUFFUCxXQUFLLE9BQUwsQ0FBYSxTQUFiLENBQXVCLEdBQXZCLENBQTJCLFdBQTNCLFlBQWdELEtBQUssRUFBTCxDQUFoRCxDQUZPO0FBR1AsV0FBSyxPQUFMLENBQWEsU0FBYixHQUF5QixLQUFLLFFBQUwsQ0FIbEI7QUFJUCxlQUFTLGFBQVQsQ0FBdUIsa0JBQXZCLEVBQTJDLFdBQTNDLENBQXVELEtBQUssT0FBTCxDQUF2RCxDQUpPOzs7OzhCQU9DO0FBQ1IsV0FBSyxPQUFMLENBQWEsTUFBYixHQURROzs7O3dCQXZCSztBQUNiLGFBQU8sMkZBR3lCLEtBQUssS0FBTCxVQUh6Qiw4RUFNK0IsS0FBSyxRQUFMLFNBTi9CLHdGQVM4QixLQUFLLFdBQUwsU0FUOUIsc0JBWUwsSUFaSyxDQVlBLEVBWkEsQ0FBUCxDQURhOzs7O1NBaEJJIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEJvb2tDYXJkIGZyb20gJy4uL21vZGVscy9Cb29rQ2FyZCc7XG5pbXBvcnQgQ29udHJvbGxlciBmcm9tICcuL0NvbnRyb2xsZXInO1xuaW1wb3J0IFJvdXRlckluc3RhbmNlIGZyb20gJy4uL2xpYnMvUm91dGVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9va3NDb250cm9sbGVyIGV4dGVuZHMgQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKClcblxuICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJvb2tzLWNvbnRhaW5lcicpO1xuICAgIC8vVE9ETyAoYmVub2l0KSBnZXQgYm9va3MgZnJvbSBzb21lIGpzb25cbiAgICB0aGlzLmJvb2tzID0gW3tcbiAgICAgIGlkOiAxLFxuICAgICAgdGl0bGU6ICdXaXphcmQ6IFRoZSBMaWZlIEFuZCBUaW1lcyBvZiBOaWtvbGEgVGVzbGEnLFxuICAgICAgYXV0aG9yOiAnTWFyYyBKLiBTZWlmZXInLFxuICAgICAgaW1hZ2VfdXJsOiAnaHR0cDovL2VjeC5pbWFnZXMtYW1hem9uLmNvbS9pbWFnZXMvSS81MXN3eDFHbCUyQk1MLl9TWDMyM19CTzEsMjA0LDIwMywyMDBfLmpwZycsXG4gICAgICBkZXNjcmlwdGlvbjogYE5pa29sYSBUZXNsYSAoMTg1Ni0xOTQzKSwgY3JlZGl0ZWQgYXMgdGhlIGluc3BpcmF0aW9uIGZvciByYWRpbywgcm9ib3RzLCBhbmQgZXZlbiByYWRhciwgaGFzIGJlZW4gY2FsbGVkIHRoZSBwYXRyb24gc2FpbnQgb2YgbW9kZXJuIGVsZWN0cmljaXR5LiBCYXNlZCBvbiBvcmlnaW5hbCBtYXRlcmlhbCBhbmQgcHJldmlvdXNseSB1bmF2YWlsYWJsZSBkb2N1bWVudHMsIHRoaXMgYWNjbGFpbWVkIGJvb2sgaXMgdGhlIGRlZmluaXRpdmUgYmlvZ3JhcGh5IG9mIHRoZSBtYW4gY29uc2lkZXJlZCBieSBtYW55IHRvIGJlIHRoZSBmb3VuZGluZyBmYXRoZXIgb2YgbW9kZXJuIGVsZWN0cmljYWwgdGVjaG5vbG9neS4gQW1vbmcgVGVzbGEncyBjcmVhdGlvbnMgd2VyZSB0aGUgY2hhbm5lbGluZyBvZiBhbHRlcm5hdGluZyBjdXJyZW50LCBmbHVvcmVzY2VudCBhbmQgbmVvbiBsaWdodGluZywgd2lyZWxlc3MgdGVsZWdyYXBoeSwgYW5kIHRoZSBnaWFudCB0dXJiaW5lcyB0aGF0IGhhcm5lc3NlZCB0aGUgcG93ZXIgb2YgTmlhZ2FyYSBGYWxscy5gXG4gICAgfSwge1xuICAgICAgaWQ6IDIsXG4gICAgICB0aXRsZTogJ0plYW4gTW91bGluJyxcbiAgICAgIGF1dGhvcjogJ0plYW4tUGllcnJlIEF6ZW1hJyxcbiAgICAgIGltYWdlX3VybDogJ2h0dHA6Ly9lY3guaW1hZ2VzLWFtYXpvbi5jb20vaW1hZ2VzL0kvNDF0VHpTMVRzJTJCTC5fU1gzMDRfQk8xLDIwNCwyMDMsMjAwXy5qcGcnLFxuICAgICAgZGVzY3JpcHRpb246IGBMZSBKZWFuIE1vdWxpbiBkJ0F6w6ltYSBmYWl0IGF1am91cmQnaHVpIHLDqWbDqXJlbmNlIGNvbW1lIGlsIGEgcmVjdWVpbGxpIGxlcyBzdWZmcmFnZXMgZGUgbGEgY3JpdGlxdWUgw6Agc2EgcGFydXRpb24uIENhciwgYXUtZGVsw6AgZCd1bmUgYmlvZ3JhcGhpZSBwb2xpdGlxdWUsIEplYW4tUGllcnJlIEF6w6ltYSBhIHN1IHJldHJhY2VyIGwnaGlzdG9pcmUgZGUgbGEgRnJhbmNlIGxpYnJlIGp1c3F1J2VuIDE5NDMsIGRlIGxhIFLDqXNpc3RhbmNlIGludMOpcmlldXJlIGV0IGRlcyByZWxhdGlvbnMgY29tcGxleGVzIGVudHJlIExvbmRyZXMsIFdhc2hpbmd0b24gZXQgQWxnZXIuIEVuIGNvbWJpbmFudCBhcmNoaXZlcywgcsOpY2l0cywgZXhwbGljYXRpb25zIGV0IHTDqW1vaWduYWdlcywgaWwgYnJvc3NlIGF1c3NpIGwnYXZlbnR1cmUgc2luZ3VsacOocmUgZCd1biBob21tZSDDoCBsYSBmb2lzIHNlbWJsYWJsZSDDoCB0YW50IGRlIHNlcyBjb250ZW1wb3JhaW5zIGV0IGRvbnQgbCdlbnRyZXByaXNlIGxlIGhpc3NlIGp1c3F1J8OgIGluY2FybmVyIGxlIGjDqXJvcyBkZSBsYSBSw6lzaXN0YW5jZSBwb3VyIHBsdXNpZXVycyBnw6luw6lyYXRpb25zIGRlIEZyYW7Dp2Fpcy4gSmVhbi1QaWVycmUgQXrDqW1hLCBwcm9mZXNzZXVyIMOgIFNjaWVuY2VzLVBvLCBhIG5vdGFtbWVudCBwdWJsacOpIERlIE11bmljaCDDoCBsYSBMaWLDqXJhdGlvbiwgTCdBbm7DqWUgMTk0MCBldCBWaWNoeS5gXG4gICAgfSwge1xuICAgICAgaWQ6IDMsXG4gICAgICB0aXRsZTogJ0RlcyBHZW5zIFRyZXMgQmllbicsXG4gICAgICBhdXRob3I6ICdBbGV4YW5kZSBKYXJkaW4nLFxuICAgICAgaW1hZ2VfdXJsOiAnaHR0cDovL2VjeC5pbWFnZXMtYW1hem9uLmNvbS9pbWFnZXMvSS81MTVyYXhqWG5xTC5fU1gzMDdfQk8xLDIwNCwyMDMsMjAwXy5qcGcnLFxuICAgICAgZGVzY3JpcHRpb246IGBUYW5kaXMgcXVlIG1vbiBww6hyZSBzJ2VuZG9ydCBwZXUgw6AgcGV1IGNvbnRyZSBtb2ksIGplIGx1aSBwYXJsZSB1bmUgZGVybmnDqHJlIGZvaXMgOiBQbHVzIHRhcmQsIHR1IG5lIHBvdXJyYXMgcGFzIHZpdnJlIGF2ZWMgbGUgc2VjcmV0IGRlcyBKYXJkaW4uIElsIHRlIHR1ZXJhLi4uIFR1IGZlcmFzIHVuIGxpdnJlLCBMZSBOYWluIGphdW5lLCBwb3VyIGxlIGNhbW91Zmxlci4gQXUgbcOqbWUgw6JnZSBxdWUgdG9pLCBqJ2VuIGZlcmFpIHVuLCBEZXMgZ2VucyB0csOocyBiaWVuLCBwb3VyIGwnZXhwb3Nlci4gRXQgamUgdml2cmFpIGxhIGRlcm5pw6hyZSBwYXJ0aWUgZGUgdGEgdmllLi4uIExhIG1pZW5uZS4gRG9ycyBtb24gcGV0aXQgcGFwYSwgZG9ycy4uLiBDZSBsaXZyZSBhdXJhaXQgcHUgcydhcHBlbGVyIFwiZmluaSBkZSByaXJlXCIuIEMnZXN0IGxlIGNhcm5ldCBkZSBib3JkIGRlIG1hIGxlbnRlIGx1Y2lkaXTDqS5gXG4gICAgfSwge1xuICAgICAgaWQ6IDQsXG4gICAgICB0aXRsZTogJ1RoZSBBdXRvYmlvZ3JhcGh5IG9mIEJlbmphbWluIEZyYW5rbGluJyxcbiAgICAgIGF1dGhvcjogJ0JlbmphbWluIEZyYW5rbGluJyxcbiAgICAgIGltYWdlX3VybDogJ2h0dHA6Ly9lY3guaW1hZ2VzLWFtYXpvbi5jb20vaW1hZ2VzL0kvNTFNeGpETTgwLUwuX1NYMzEwX0JPMSwyMDQsMjAzLDIwMF8uanBnJyxcbiAgICAgIGRlc2NyaXB0aW9uOiBgQmxlc3NlZCB3aXRoIGVub3Jtb3VzIHRhbGVudHMgYW5kIHRoZSBlbmVyZ3kgYW5kIGFtYml0aW9uIHRvIGdvIHdpdGggdGhlbSwgRnJhbmtsaW4gd2FzIGEgc3RhdGVzbWFuLCBhdXRob3IsIGludmVudG9yLCBwcmludGVyLCBhbmQgc2NpZW50aXN0LmBcbiAgICB9LCB7XG4gICAgICBpZDogNSxcbiAgICAgIHRpdGxlOiAnU2VjdXJpdHkgQW5hbHlzaXM6IFByaW5jaXBsZXMgYW5kIFRlY2huaXF1ZXMnLFxuICAgICAgYXV0aG9yOiAnQmVuamFtaW4gR3JhaGFtJyxcbiAgICAgIGltYWdlX3VybDogJ2h0dHA6Ly9lY3guaW1hZ2VzLWFtYXpvbi5jb20vaW1hZ2VzL0kvNTF5SnpQcTNucEwuX1NYMzA5X0JPMSwyMDQsMjAzLDIwMF8uanBnJyxcbiAgICAgIGRlc2NyaXB0aW9uOiBgQmVuamFtaW4gR3JhaGFtJ3MgcmV2b2x1dGlvbmFyeSB0aGVvcmllcyBoYXZlIGluZmx1ZW5jZWQgYW5kIGluc3BpcmVkIGludmVzdG9ycyBmb3IgbmVhcmx5IDcwIHllYXJzLiBGaXJzdCBwdWJsaXNoZWQgaW4gMTkzNCwgaGlzIFNlY3VyaXR5IEFuYWx5c2lzIGlzIHN0aWxsIGNvbnNpZGVyZWQgdG8gYmUgdGhlIHZhbHVlIGludmVzdGluZyBiaWJsZSBmb3IgaW52ZXN0b3JzIG9mIGV2ZXJ5IGlsay4gWWV0LCBpdCBpcyB0aGUgc2Vjb25kIGVkaXRpb24gb2YgdGhhdCBib29rLCBwdWJsaXNoZWQgaW4gMTk0MCBhbmQgbG9uZyBzaW5jZSBvdXQgb2YgcHJpbnQsIHRoYXQgbWFueSBleHBlcnRzLS1pbmNsdWRpbmcgR3JhaGFtIHByb3TDqWfDqSBXYXJyZW4gQnVmZmV0LS1jb25zaWRlciB0byBiZSB0aGUgZGVmaW5pdGl2ZSBlZGl0aW9uLiBUaGlzIGZhY3NpbWlsZSByZXByb2R1Y3Rpb24gb2YgdGhhdCBzZW1pbmFsIHdvcmsgbWFrZXMgYXZhaWxhYmxlIHRvIGludmVzdG9ycywgb25jZSBhZ2FpbiwgdGhlIG9yaWdpbmFsIHRoaW5raW5nIG9mIFwidGhpcyBjZW50dXJ5J3MgKGFuZCBwZXJoYXBzIGhpc3RvcnkncykgbW9zdCBpbXBvcnRhbnQgdGhpbmtlciBvbiBhcHBsaWVkIHBvcnRmb2xpbyBpbnZlc3RtZW50LlwiYFxuICAgIH1dO1xuICAgIHRoaXMucmVuZGVyZWRCb29rcyA9IFtdO1xuICAgIC8vIHNob3cgdGhlbSAtIG5vdCBoZXJlID8gb3IgdXNlIHNvbWUgcmVxdWVzdElkbGVDYWxsYmFjayA/XG4gICAgLy8gZXZlbnRsaXN0ZW5lciA8PSBleHBhbmQgY2FyZHMsIGxpbmtzIGV0Yy5cblxuICAgIHRoaXMubG9hZENTUygnL3N0eWxlcy9mcmVzaGhvb2QtYm9va3MuY3NzJykudGhlbigoKSA9PiB7XG4gICAgICAvLyB0aGlzLnZpZXcuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG5cbiAgICAgIFJvdXRlckluc3RhbmNlKCkudGhlbigocm91dGVyKSA9PiB7XG4gICAgICAgIHJvdXRlci5hZGQoJ2Jvb2tzJyxcbiAgICAgICAgICAoKSA9PiB0aGlzLnNob3coKSxcbiAgICAgICAgICAoKSA9PiB0aGlzLmhpZGUoKSxcbiAgICAgICAgICAoKSA9PiBjb25zb2xlLmxvZygndXBkYXRlJykpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBzaG93KCkge1xuICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2Jvb2tzLWNvbnRhaW5lcl9fdmlzaWJsZScpO1xuICAgIHRoaXMuZmlsbCgpO1xuICB9XG4gIGZpbGwoKSB7XG4gICAgdGhpcy5yZW5kZXJlZEJvb2tzID0gdGhpcy5ib29rcy5tYXAoYm9vayA9PiB7XG4gICAgICBjb25zdCBib29rQ2FyZCA9IG5ldyBCb29rQ2FyZChib29rLmlkLCBib29rLnRpdGxlLCBib29rLmRlc2NyaXB0aW9uLCBib29rLmltYWdlX3VybCk7XG4gICAgICBib29rQ2FyZC5yZW5kZXIoKTtcbiAgICAgIHJldHVybiBib29rQ2FyZDtcbiAgICB9KTtcbiAgfVxuICBoaWRlKCkge1xuICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2Jvb2tzLWNvbnRhaW5lcl9fdmlzaWJsZScpO1xuICAgIHRoaXMuZGVzdHJveUJvb2tDYXJkcygpO1xuICB9XG4gIHVwZGF0ZSgpIHtcbiAgICBjb25zb2xlLmxvZygndXBkYXRlJylcbiAgfVxuICBkZXN0cm95Qm9va0NhcmRzKCkge1xuICAgIHRoaXMucmVuZGVyZWRCb29rcy5mb3JFYWNoKGJvb2tDYXJkID0+IGJvb2tDYXJkLmRlc3Ryb3koKSk7XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udHJvbGxlciB7XG4gIGxvYWRTY3JpcHQodXJsKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgIHNjcmlwdC5hc3luYyA9IHRydWU7XG4gICAgICBzY3JpcHQuc3JjID0gdXJsO1xuXG4gICAgICBzY3JpcHQub25sb2FkID0gcmVzb2x2ZTtcbiAgICAgIHNjcmlwdC5vbmVycm9yID0gcmVqZWN0O1xuXG4gICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgfSk7XG4gIH1cblxuICBsb2FkQ1NTKHVybCkge1xuICAgIHJldHVybiBmZXRjaCh1cmwpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgIHJlc3BvbnNlLnRleHQoKS50aGVuKGJvZHkgPT4ge1xuICAgICAgICAgIHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAgICAgc3R5bGUudGV4dENvbnRlbnQgPSBib2R5O1xuICAgICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IGBzdHlsZSBhdCB1cmw6JHt1cmx9IG5vdCBmb3VuZC5gO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBCb29rc0NvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVycy9Cb29rc0NvbnRyb2xsZXInO1xuXG5uZXcgQm9va3NDb250cm9sbGVyKCk7XG5cbmNvbnNvbGUubG9nKCdib29rcyBsb2FkZWQnKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUm91dGVySW5zdGFuY2UoKSB7XG4gIGlmICh0eXBlb2Ygd2luZG93LlJvdXRlckluc3RhbmNlXyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHdpbmRvdy5Sb3V0ZXJJbnN0YW5jZV8pO1xuICB9XG5cbiAgd2luZG93LlJvdXRlckluc3RhbmNlXyA9IG5ldyBSb3V0ZXIoKTtcbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh3aW5kb3cuUm91dGVySW5zdGFuY2VfKTtcbn1cblxuY2xhc3MgUm91dGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5yb3V0ZXMgPSB7fTtcbiAgICB0aGlzLmN1cnJlbnRBY3Rpb24gPSBudWxsO1xuICAgIHRoaXMubG9hZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvYWRlcicpO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgKGUpID0+IHtcbiAgICAgIHRoaXMub25Qb3BTdGF0ZShlKTtcbiAgICB9KTtcblxuICAgIHRoaXMubWFuYWdlU3RhdGUoKTtcbiAgfVxuXG4gIGFkZChwYXRoLCBjYWxsYmFja0luLCBjYWxsYmFja091dCwgY2FsbGJhY2tVcGRhdGUpIHtcbiAgICAvLyBBc3N1bWUgdGhlIGZpcnN0IHBhcnQgb2YgdGhlIHBhdGggaXMgdGhlXG4gICAgLy8gdmVyYiB3ZSB3YW50IHRvIGFjdGlvbiwgd2l0aCB0aGUgcmVzdCBvZiB0aGUgcGF0aFxuICAgIC8vIGJlaW5nIHRoZSBkYXRhIHRvIHBhc3MgdG8gdGhlIGhhbmRsZXIuXG4gICAgY29uc3QgcGF0aFBhcnRzID0gcGF0aC5zcGxpdCgnLycpO1xuICAgIGNvbnN0IGFjdGlvbiA9IHBhdGhQYXJ0cy5zaGlmdCgpO1xuXG4gICAgaWYgKHRoaXMucm91dGVzW2FjdGlvbl0pIHtcbiAgICAgIHRocm93IFwiQSBoYW5kbGVyIGFscmVhZHkgZXhpc3RzIGZvciB0aGlzIGFjdGlvbjogXCIgKyBhY3Rpb247XG4gICAgfVxuXG4gICAgdGhpcy5yb3V0ZXNbYWN0aW9uXSA9IHtcbiAgICAgIGluIDogY2FsbGJhY2tJbixcbiAgICAgIG91dDogY2FsbGJhY2tPdXQsXG4gICAgICB1cGRhdGU6IGNhbGxiYWNrVXBkYXRlXG4gICAgfTtcblxuICAgIC8vIENoZWNrIHRvIHNlZSBpZiB0aGlzIHBhdGggaXMgZnVsZmlsbGVkLlxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5tYW5hZ2VTdGF0ZSgpKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnZGVlcGxpbmsnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZShwYXRoKSB7XG4gICAgY29uc3QgcGF0aFBhcnRzID0gcGF0aC5zcGxpdCgnLycpO1xuICAgIGNvbnN0IGFjdGlvbiA9IHBhdGhQYXJ0cy5zaGlmdCgpO1xuXG4gICAgaWYgKCF0aGlzLnJvdXRlc1thY3Rpb25dKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGRlbGV0ZSB0aGlzLnJvdXRlc1thY3Rpb25dO1xuICB9XG5cbiAgbWFuYWdlU3RhdGUoKSB7XG4gICAgY29uc3QgcGF0aCA9IGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLCAnJyk7XG5cbiAgICAvLyBBc3N1bWUgdGhlIGZpcnN0IHBhcnQgb2YgdGhlIHBhdGggaXMgdGhlXG4gICAgLy8gdmVyYiB3ZSB3YW50IHRvIGFjdGlvbiwgd2l0aCB0aGUgcmVzdCBvZiB0aGUgcGF0aFxuICAgIC8vIGJlaW5nIHRoZSBkYXRhIHRvIHBhc3MgdG8gdGhlIGhhbmRsZXIuXG4gICAgY29uc3QgcGF0aFBhcnRzID0gcGF0aC5zcGxpdCgnLycpO1xuICAgIGxldCBhY3Rpb24gPSBwYXRoUGFydHMuc2hpZnQoKTtcbiAgICBjb25zdCBkYXRhID0gcGF0aFBhcnRzLmpvaW4oJy8nKTtcblxuICAgIC8vIEFkZCBhIHNwZWNpYWwgY2FzZSBmb3IgdGhlIHJvb3QuXG4gICAgaWYgKGFjdGlvbiA9PT0gJycpIHtcbiAgICAgIGFjdGlvbiA9ICdfcm9vdCc7XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIGFueSBkZWVwbGluayBjb3ZlcnMuXG4gICAgaWYgKGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKCdhcHAtZGVlcGxpbmsnKSkge1xuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdhcHAtZGVlcGxpbmsnKTtcbiAgICB9XG5cbiAgICAvLyBIaWRlIHRoZSBsb2FkZXIuXG4gICAgdGhpcy5sb2FkZXIuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG5cbiAgICBpZiAodGhpcy5jdXJyZW50QWN0aW9uID09PSB0aGlzLnJvdXRlc1thY3Rpb25dKSB7XG4gICAgICBpZiAodHlwZW9mIHRoaXMuY3VycmVudEFjdGlvbi51cGRhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50QWN0aW9uLnVwZGF0ZShkYXRhKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMucm91dGVzW2FjdGlvbl0pIHtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRBY3Rpb24pIHtcbiAgICAgICAgdGhpcy5jdXJyZW50QWN0aW9uLm91dCgpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmN1cnJlbnRBY3Rpb24gPSBudWxsO1xuICAgICAgZG9jdW1lbnQuYm9keS5mb2N1cygpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIFNldCB0aGUgbmV3IGFjdGlvbiBnb2luZy5cbiAgICBjb25zdCBkZWxheSA9IHRoaXMucm91dGVzW2FjdGlvbl0uaW4oZGF0YSkgfHwgMDtcblxuICAgIC8vIFJlbW92ZSB0aGUgb2xkIGFjdGlvbiBhbmQgdXBkYXRlIHRoZSByZWZlcmVuY2UuXG4gICAgaWYgKHRoaXMuY3VycmVudEFjdGlvbikge1xuICAgICAgLy8gQWxsb3cgdGhlIGluY29taW5nIHZpZXcgdG8gZGVsYXkgdGhlIG91dGdvaW5nIG9uZVxuICAgICAgLy8gc28gdGhhdCB3ZSBkb24ndCBnZXQgdG9vIG11Y2ggb3ZlcmxhcHBpbmcgYW5pbWF0aW9uLlxuICAgICAgaWYgKGRlbGF5ID09PSAwKSB7XG4gICAgICAgIHRoaXMuY3VycmVudEFjdGlvbi5vdXQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFRpbWVvdXQodGhpcy5jdXJyZW50QWN0aW9uLm91dCwgZGVsYXkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuY3VycmVudEFjdGlvbiA9IHRoaXMucm91dGVzW2FjdGlvbl07XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGdvKHBhdGgpIHtcbiAgICAvLyBPbmx5IHByb2Nlc3MgcmVhbCBjaGFuZ2VzLlxuICAgIGlmIChwYXRoID09PSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBoaXN0b3J5LnB1c2hTdGF0ZSh1bmRlZmluZWQsIFwiXCIsIHBhdGgpO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLm1hbmFnZVN0YXRlKCk7XG4gICAgfSk7XG4gIH1cblxuICBvblBvcFN0YXRlKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMubWFuYWdlU3RhdGUoKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb29rQ2FyZCB7XG4gIGNvbnN0cnVjdG9yKGlkLCB0aXRsZSA9ICd0aXRsZScsIGRlc2NyaXB0aW9uID0gJ2Rlc2NyaXB0aW9uJywgaW1hZ2VVcmwpIHtcbiAgICBpZiAoaWQgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgJ21pc3NpbmcgaWQnO1xuICAgIH1cblxuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIHRoaXMuaW1hZ2VVcmwgPSBpbWFnZVVybDtcbiAgfVxuICAvL1xuICAvLyBnZXQgaW1hZ2VVcmwoKSB7XG4gIC8vICAgcmV0dXJuIGBpbWFnZXMvJHt0aGlzLmlkfS5wbmdgO1xuICAvLyB9XG5cbiAgZ2V0IHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBbXG4gICAgICBgPGRpdiBjbGFzcz1cImNhcmRfaW5uZXJcIj5gLFxuICAgICAgICBgPGRpdiBjbGFzcz1cImNhcmRfdGl0bGUtaW5uZXJcIj5gLFxuICAgICAgICAgIGA8aDEgY2xhc3M9XCJjYXJkX3RpdGxlXCI+JHt0aGlzLnRpdGxlfTwvaDE+YCxcbiAgICAgICAgYDwvZGl2PmAsXG4gICAgICAgIGA8ZmlndXJlIGNsYXNzPVwiY2FyZF9maWd1cmVcIj5gLFxuICAgICAgICAgIGA8aW1nIGNsYXNzPVwiY2FyZF9pbWFnZVwiIHNyYz1cIiR7dGhpcy5pbWFnZVVybH1cIiAvPmAsXG4gICAgICAgIGA8L2ZpZ3VyZT5gLFxuICAgICAgICBgPGRpdiBjbGFzcz1cImNhcmRfZGVzY3JpcHRpb24taW5uZXJcIj5gLFxuICAgICAgICAgIGA8cCBjbGFzcz1cImNhcmRfZGVzY3JpcHRpb25cIj4ke3RoaXMuZGVzY3JpcHRpb259PC9wPmAsXG4gICAgICAgIGA8L2Rpdj5gLFxuICAgICAgYDwvZGl2PmBcbiAgICBdLmpvaW4oJycpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYm9vay1jYXJkJywgYGNhcmQtJHt0aGlzLmlkfWApO1xuICAgIHRoaXMuZWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLnRlbXBsYXRlO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib29rcy1jb250YWluZXInKS5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLmVsZW1lbnQucmVtb3ZlKCk7XG4gIH1cbn1cbiJdfQ==
