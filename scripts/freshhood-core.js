/*! (c) 2016 Benoit Quenaudon (MIT) */
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Controller2 = require('./Controller');

var _Controller3 = _interopRequireDefault(_Controller2);

var _SideNavController = require('./SideNavController');

var _SideNavController2 = _interopRequireDefault(_SideNavController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AppController = function (_Controller) {
  _inherits(AppController, _Controller);

  function AppController() {
    _classCallCheck(this, AppController);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AppController).call(this));

    _this.sideNavToggleButton = document.querySelector('.header_toggle-side-nav');
    _this.sideNavToggleButton.addEventListener('click', _this.toggleSideNav.bind(_this));
    _this.sideNavController = new _SideNavController2.default();
    return _this;
  }

  _createClass(AppController, [{
    key: 'toggleSideNav',
    value: function toggleSideNav() {
      this.sideNavController.toggleSideNav();
    }
  }]);

  return AppController;
}(_Controller3.default);

exports.default = AppController;

},{"./Controller":2,"./SideNavController":3}],2:[function(require,module,exports){
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
          response.body().then(function (body) {
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

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BookCard = require('../models/BookCard');

var _BookCard2 = _interopRequireDefault(_BookCard);

var _Controller2 = require('./Controller');

var _Controller3 = _interopRequireDefault(_Controller2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SideNavController = function (_Controller) {
  _inherits(SideNavController, _Controller);

  function SideNavController() {
    _classCallCheck(this, SideNavController);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SideNavController).call(this));

    _this.sideNav = document.querySelector('.side-nav');
    _this.sideNavContent = _this.sideNav.querySelector('.side-nav_content');

    _this.sideNav.addEventListener('click', _this.closeSideNav.bind(_this));
    _this.sideNavContent.addEventListener('click', function (e) {
      return e.stopPropagation();
    });

    _this.navToBooksButton = document.querySelector('.side-nav_nav-to-books');
    _this.navToBooksButton.addEventListener('click', _this.navToBooks.bind(_this));
    _this.navToPortfolioButton = document.querySelector('.side-nav_nav-to-portfolio');
    _this.navToPortfolioButton.addEventListener('click', _this.navToPortfolio.bind(_this));

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
    return _this;
  }

  _createClass(SideNavController, [{
    key: 'toggleSideNav',
    value: function toggleSideNav() {
      if (this.sideNav.classList.contains('side-nav__visible')) {
        this.closeSideNav();
      } else {
        this.showSideNav();
      }
    }
  }, {
    key: 'closeSideNav',
    value: function closeSideNav() {
      var _this2 = this;

      requestAnimationFrame(function () {
        _this2.sideNav.classList.remove('side-nav__visible');
        _this2.sideNavContent.classList.remove('side-nav_content_visible');
      });
    }
  }, {
    key: 'showSideNav',
    value: function showSideNav() {
      var _this3 = this;

      requestAnimationFrame(function () {
        _this3.sideNav.classList.add('side-nav__visible');
        _this3.sideNavContent.classList.add('side-nav_content_visible');
      });
    }
  }, {
    key: 'navToBooks',
    value: function navToBooks() {
      this.closeSideNav();
      // TODO(benoit) so wrong. lets get some adequate MVC...

      document.querySelector('.books-container').classList.add('books-container__visible');

      this.books.forEach(function (book) {
        var bookCard = new _BookCard2.default(book.id, book.title, book.description, book.image_url);
        bookCard.render();
      });
    }
  }, {
    key: 'navToPortfolio',
    value: function navToPortfolio() {
      // TODO(benoit)
    }
  }]);

  return SideNavController;
}(_Controller3.default);

exports.default = SideNavController;

},{"../models/BookCard":5,"./Controller":2}],4:[function(require,module,exports){
'use strict';

var _AppController = require('./controllers/AppController');

var _AppController2 = _interopRequireDefault(_AppController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _AppController2.default();

},{"./controllers/AppController":1}],5:[function(require,module,exports){
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
      console.log(this);
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

},{}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9jb250cm9sbGVycy9BcHBDb250cm9sbGVyLmpzIiwic3JjL3NjcmlwdHMvY29udHJvbGxlcnMvQ29udHJvbGxlci5qcyIsInNyYy9zY3JpcHRzL2NvbnRyb2xsZXJzL1NpZGVOYXZDb250cm9sbGVyLmpzIiwic3JjL3NjcmlwdHMvZnJlc2hob29kLWNvcmUuanMiLCJzcmMvc2NyaXB0cy9tb2RlbHMvQm9va0NhcmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7Ozs7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUI7OztBQUNuQixXQURtQixhQUNuQixHQUFjOzBCQURLLGVBQ0w7O3VFQURLLDJCQUNMOztBQUVaLFVBQUssbUJBQUwsR0FBMkIsU0FBUyxhQUFULENBQXVCLHlCQUF2QixDQUEzQixDQUZZO0FBR1osVUFBSyxtQkFBTCxDQUF5QixnQkFBekIsQ0FBMEMsT0FBMUMsRUFBbUQsTUFBSyxhQUFMLENBQW1CLElBQW5CLE9BQW5ELEVBSFk7QUFJWixVQUFLLGlCQUFMLEdBQXlCLGlDQUF6QixDQUpZOztHQUFkOztlQURtQjs7b0NBUUg7QUFDZCxXQUFLLGlCQUFMLENBQXVCLGFBQXZCLEdBRGM7Ozs7U0FSRzs7Ozs7O0FDTHJCOzs7Ozs7Ozs7O0lBRXFCOzs7Ozs7OytCQUNSLEtBQUs7QUFDZCxhQUFPLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBcUI7QUFDdEMsWUFBSSxTQUFTLFNBQVMsYUFBVCxDQUF1QixRQUF2QixDQUFULENBRGtDO0FBRXRDLGVBQU8sS0FBUCxHQUFlLElBQWYsQ0FGc0M7QUFHdEMsZUFBTyxHQUFQLEdBQWEsR0FBYixDQUhzQzs7QUFLdEMsZUFBTyxNQUFQLEdBQWdCLE9BQWhCLENBTHNDO0FBTXRDLGVBQU8sT0FBUCxHQUFpQixN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QUVQLFdBQUssT0FBTCxDQUFhLFNBQWIsQ0FBdUIsR0FBdkIsQ0FBMkIsV0FBM0IsWUFBZ0QsS0FBSyxFQUFMLENBQWhELENBRk87QUFHUCxXQUFLLE9BQUwsQ0FBYSxTQUFiLEdBQXlCLEtBQUssUUFBTCxDQUhsQjtBQUlQLGVBQVMsYUFBVCxDQUF1QixrQkFBdkIsRUFBMkMsV0FBM0MsQ0FBdUQsS0FBSyxPQUFMLENBQXZELENBSk87QUFLUCxjQUFRLEdBQVIsQ0FBWSxJQUFaLEVBTE87Ozs7d0JBaEJNO0FBQ2IsYUFBTywyRkFHeUIsS0FBSyxLQUFMLFVBSHpCLDhFQU0rQixLQUFLLFFBQUwsU0FOL0Isd0ZBUzhCLEtBQUssV0FBTCxTQVQ5QixzQkFZTCxJQVpLLENBWUEsRUFaQSxDQUFQLENBRGE7Ozs7U0FoQkkiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQ29udHJvbGxlciBmcm9tICcuL0NvbnRyb2xsZXInO1xuaW1wb3J0IFNpZGVOYXZDb250cm9sbGVyIGZyb20gJy4vU2lkZU5hdkNvbnRyb2xsZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBDb250cm9sbGVyIGV4dGVuZHMgQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLnNpZGVOYXZUb2dnbGVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX3RvZ2dsZS1zaWRlLW5hdicpO1xuICAgIHRoaXMuc2lkZU5hdlRvZ2dsZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMudG9nZ2xlU2lkZU5hdi5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLnNpZGVOYXZDb250cm9sbGVyID0gbmV3IFNpZGVOYXZDb250cm9sbGVyKCk7XG4gIH1cblxuICB0b2dnbGVTaWRlTmF2KCkge1xuICAgIHRoaXMuc2lkZU5hdkNvbnRyb2xsZXIudG9nZ2xlU2lkZU5hdigpO1xuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRyb2xsZXIge1xuICBsb2FkU2NyaXB0KHVybCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICBzY3JpcHQuYXN5bmMgPSB0cnVlO1xuICAgICAgc2NyaXB0LnNyYyA9IHVybDtcblxuICAgICAgc2NyaXB0Lm9ubG9hZCA9IHJlc29sdmU7XG4gICAgICBzY3JpcHQub25lcnJvciA9IHJlamVjdDtcblxuICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgIH0pO1xuICB9XG5cbiAgbG9hZENTUyh1cmwpIHtcbiAgICByZXR1cm4gZmV0Y2godXJsKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICByZXNwb25zZS5ib2R5KCkudGhlbihib2R5ID0+IHtcbiAgICAgICAgICB2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICAgIHN0eWxlLnRleHRDb250ZW50ID0gYm9keTtcbiAgICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBgc3R5bGUgYXQgdXJsOiR7dXJsfSBub3QgZm91bmQuYDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQm9va0NhcmQgZnJvbSAnLi4vbW9kZWxzL0Jvb2tDYXJkJztcbmltcG9ydCBDb250cm9sbGVyIGZyb20gJy4vQ29udHJvbGxlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNpZGVOYXZDb250cm9sbGVyIGV4dGVuZHMgQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLnNpZGVOYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZS1uYXYnKTtcbiAgICB0aGlzLnNpZGVOYXZDb250ZW50ID0gdGhpcy5zaWRlTmF2LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlLW5hdl9jb250ZW50Jyk7XG5cbiAgICB0aGlzLnNpZGVOYXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsb3NlU2lkZU5hdi5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLnNpZGVOYXZDb250ZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IGUuc3RvcFByb3BhZ2F0aW9uKCkpO1xuXG4gICAgdGhpcy5uYXZUb0Jvb2tzQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGUtbmF2X25hdi10by1ib29rcycpO1xuICAgIHRoaXMubmF2VG9Cb29rc0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMubmF2VG9Cb29rcy5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLm5hdlRvUG9ydGZvbGlvQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGUtbmF2X25hdi10by1wb3J0Zm9saW8nKTtcbiAgICB0aGlzLm5hdlRvUG9ydGZvbGlvQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5uYXZUb1BvcnRmb2xpby5iaW5kKHRoaXMpKTtcblxuICAgIHRoaXMuYm9va3MgPSBbe1xuICAgICAgaWQ6IDEsXG4gICAgICB0aXRsZTogJ1dpemFyZDogVGhlIExpZmUgQW5kIFRpbWVzIG9mIE5pa29sYSBUZXNsYScsXG4gICAgICBhdXRob3I6ICdNYXJjIEouIFNlaWZlcicsXG4gICAgICBpbWFnZV91cmw6ICdodHRwOi8vZWN4LmltYWdlcy1hbWF6b24uY29tL2ltYWdlcy9JLzUxc3d4MUdsJTJCTUwuX1NYMzIzX0JPMSwyMDQsMjAzLDIwMF8uanBnJyxcbiAgICAgIGRlc2NyaXB0aW9uOiBgTmlrb2xhIFRlc2xhICgxODU2LTE5NDMpLCBjcmVkaXRlZCBhcyB0aGUgaW5zcGlyYXRpb24gZm9yIHJhZGlvLCByb2JvdHMsIGFuZCBldmVuIHJhZGFyLCBoYXMgYmVlbiBjYWxsZWQgdGhlIHBhdHJvbiBzYWludCBvZiBtb2Rlcm4gZWxlY3RyaWNpdHkuIEJhc2VkIG9uIG9yaWdpbmFsIG1hdGVyaWFsIGFuZCBwcmV2aW91c2x5IHVuYXZhaWxhYmxlIGRvY3VtZW50cywgdGhpcyBhY2NsYWltZWQgYm9vayBpcyB0aGUgZGVmaW5pdGl2ZSBiaW9ncmFwaHkgb2YgdGhlIG1hbiBjb25zaWRlcmVkIGJ5IG1hbnkgdG8gYmUgdGhlIGZvdW5kaW5nIGZhdGhlciBvZiBtb2Rlcm4gZWxlY3RyaWNhbCB0ZWNobm9sb2d5LiBBbW9uZyBUZXNsYSdzIGNyZWF0aW9ucyB3ZXJlIHRoZSBjaGFubmVsaW5nIG9mIGFsdGVybmF0aW5nIGN1cnJlbnQsIGZsdW9yZXNjZW50IGFuZCBuZW9uIGxpZ2h0aW5nLCB3aXJlbGVzcyB0ZWxlZ3JhcGh5LCBhbmQgdGhlIGdpYW50IHR1cmJpbmVzIHRoYXQgaGFybmVzc2VkIHRoZSBwb3dlciBvZiBOaWFnYXJhIEZhbGxzLmBcbiAgICB9LCB7XG4gICAgICBpZDogMixcbiAgICAgIHRpdGxlOiAnSmVhbiBNb3VsaW4nLFxuICAgICAgYXV0aG9yOiAnSmVhbi1QaWVycmUgQXplbWEnLFxuICAgICAgaW1hZ2VfdXJsOiAnaHR0cDovL2VjeC5pbWFnZXMtYW1hem9uLmNvbS9pbWFnZXMvSS80MXRUelMxVHMlMkJMLl9TWDMwNF9CTzEsMjA0LDIwMywyMDBfLmpwZycsXG4gICAgICBkZXNjcmlwdGlvbjogYExlIEplYW4gTW91bGluIGQnQXrDqW1hIGZhaXQgYXVqb3VyZCdodWkgcsOpZsOpcmVuY2UgY29tbWUgaWwgYSByZWN1ZWlsbGkgbGVzIHN1ZmZyYWdlcyBkZSBsYSBjcml0aXF1ZSDDoCBzYSBwYXJ1dGlvbi4gQ2FyLCBhdS1kZWzDoCBkJ3VuZSBiaW9ncmFwaGllIHBvbGl0aXF1ZSwgSmVhbi1QaWVycmUgQXrDqW1hIGEgc3UgcmV0cmFjZXIgbCdoaXN0b2lyZSBkZSBsYSBGcmFuY2UgbGlicmUganVzcXUnZW4gMTk0MywgZGUgbGEgUsOpc2lzdGFuY2UgaW50w6lyaWV1cmUgZXQgZGVzIHJlbGF0aW9ucyBjb21wbGV4ZXMgZW50cmUgTG9uZHJlcywgV2FzaGluZ3RvbiBldCBBbGdlci4gRW4gY29tYmluYW50IGFyY2hpdmVzLCByw6ljaXRzLCBleHBsaWNhdGlvbnMgZXQgdMOpbW9pZ25hZ2VzLCBpbCBicm9zc2UgYXVzc2kgbCdhdmVudHVyZSBzaW5ndWxpw6hyZSBkJ3VuIGhvbW1lIMOgIGxhIGZvaXMgc2VtYmxhYmxlIMOgIHRhbnQgZGUgc2VzIGNvbnRlbXBvcmFpbnMgZXQgZG9udCBsJ2VudHJlcHJpc2UgbGUgaGlzc2UganVzcXUnw6AgaW5jYXJuZXIgbGUgaMOpcm9zIGRlIGxhIFLDqXNpc3RhbmNlIHBvdXIgcGx1c2lldXJzIGfDqW7DqXJhdGlvbnMgZGUgRnJhbsOnYWlzLiBKZWFuLVBpZXJyZSBBesOpbWEsIHByb2Zlc3NldXIgw6AgU2NpZW5jZXMtUG8sIGEgbm90YW1tZW50IHB1Ymxpw6kgRGUgTXVuaWNoIMOgIGxhIExpYsOpcmF0aW9uLCBMJ0FubsOpZSAxOTQwIGV0IFZpY2h5LmBcbiAgICB9LCB7XG4gICAgICBpZDogMyxcbiAgICAgIHRpdGxlOiAnRGVzIEdlbnMgVHJlcyBCaWVuJyxcbiAgICAgIGF1dGhvcjogJ0FsZXhhbmRlIEphcmRpbicsXG4gICAgICBpbWFnZV91cmw6ICdodHRwOi8vZWN4LmltYWdlcy1hbWF6b24uY29tL2ltYWdlcy9JLzUxNXJheGpYbnFMLl9TWDMwN19CTzEsMjA0LDIwMywyMDBfLmpwZycsXG4gICAgICBkZXNjcmlwdGlvbjogYFRhbmRpcyBxdWUgbW9uIHDDqHJlIHMnZW5kb3J0IHBldSDDoCBwZXUgY29udHJlIG1vaSwgamUgbHVpIHBhcmxlIHVuZSBkZXJuacOocmUgZm9pcyA6IFBsdXMgdGFyZCwgdHUgbmUgcG91cnJhcyBwYXMgdml2cmUgYXZlYyBsZSBzZWNyZXQgZGVzIEphcmRpbi4gSWwgdGUgdHVlcmEuLi4gVHUgZmVyYXMgdW4gbGl2cmUsIExlIE5haW4gamF1bmUsIHBvdXIgbGUgY2Ftb3VmbGVyLiBBdSBtw6ptZSDDomdlIHF1ZSB0b2ksIGonZW4gZmVyYWkgdW4sIERlcyBnZW5zIHRyw6hzIGJpZW4sIHBvdXIgbCdleHBvc2VyLiBFdCBqZSB2aXZyYWkgbGEgZGVybmnDqHJlIHBhcnRpZSBkZSB0YSB2aWUuLi4gTGEgbWllbm5lLiBEb3JzIG1vbiBwZXRpdCBwYXBhLCBkb3JzLi4uIENlIGxpdnJlIGF1cmFpdCBwdSBzJ2FwcGVsZXIgXCJmaW5pIGRlIHJpcmVcIi4gQydlc3QgbGUgY2FybmV0IGRlIGJvcmQgZGUgbWEgbGVudGUgbHVjaWRpdMOpLmBcbiAgICB9LCB7XG4gICAgICBpZDogNCxcbiAgICAgIHRpdGxlOiAnVGhlIEF1dG9iaW9ncmFwaHkgb2YgQmVuamFtaW4gRnJhbmtsaW4nLFxuICAgICAgYXV0aG9yOiAnQmVuamFtaW4gRnJhbmtsaW4nLFxuICAgICAgaW1hZ2VfdXJsOiAnaHR0cDovL2VjeC5pbWFnZXMtYW1hem9uLmNvbS9pbWFnZXMvSS81MU14akRNODAtTC5fU1gzMTBfQk8xLDIwNCwyMDMsMjAwXy5qcGcnLFxuICAgICAgZGVzY3JpcHRpb246IGBCbGVzc2VkIHdpdGggZW5vcm1vdXMgdGFsZW50cyBhbmQgdGhlIGVuZXJneSBhbmQgYW1iaXRpb24gdG8gZ28gd2l0aCB0aGVtLCBGcmFua2xpbiB3YXMgYSBzdGF0ZXNtYW4sIGF1dGhvciwgaW52ZW50b3IsIHByaW50ZXIsIGFuZCBzY2llbnRpc3QuYFxuICAgIH0sIHtcbiAgICAgIGlkOiA1LFxuICAgICAgdGl0bGU6ICdTZWN1cml0eSBBbmFseXNpczogUHJpbmNpcGxlcyBhbmQgVGVjaG5pcXVlcycsXG4gICAgICBhdXRob3I6ICdCZW5qYW1pbiBHcmFoYW0nLFxuICAgICAgaW1hZ2VfdXJsOiAnaHR0cDovL2VjeC5pbWFnZXMtYW1hem9uLmNvbS9pbWFnZXMvSS81MXlKelBxM25wTC5fU1gzMDlfQk8xLDIwNCwyMDMsMjAwXy5qcGcnLFxuICAgICAgZGVzY3JpcHRpb246IGBCZW5qYW1pbiBHcmFoYW0ncyByZXZvbHV0aW9uYXJ5IHRoZW9yaWVzIGhhdmUgaW5mbHVlbmNlZCBhbmQgaW5zcGlyZWQgaW52ZXN0b3JzIGZvciBuZWFybHkgNzAgeWVhcnMuIEZpcnN0IHB1Ymxpc2hlZCBpbiAxOTM0LCBoaXMgU2VjdXJpdHkgQW5hbHlzaXMgaXMgc3RpbGwgY29uc2lkZXJlZCB0byBiZSB0aGUgdmFsdWUgaW52ZXN0aW5nIGJpYmxlIGZvciBpbnZlc3RvcnMgb2YgZXZlcnkgaWxrLiBZZXQsIGl0IGlzIHRoZSBzZWNvbmQgZWRpdGlvbiBvZiB0aGF0IGJvb2ssIHB1Ymxpc2hlZCBpbiAxOTQwIGFuZCBsb25nIHNpbmNlIG91dCBvZiBwcmludCwgdGhhdCBtYW55IGV4cGVydHMtLWluY2x1ZGluZyBHcmFoYW0gcHJvdMOpZ8OpIFdhcnJlbiBCdWZmZXQtLWNvbnNpZGVyIHRvIGJlIHRoZSBkZWZpbml0aXZlIGVkaXRpb24uIFRoaXMgZmFjc2ltaWxlIHJlcHJvZHVjdGlvbiBvZiB0aGF0IHNlbWluYWwgd29yayBtYWtlcyBhdmFpbGFibGUgdG8gaW52ZXN0b3JzLCBvbmNlIGFnYWluLCB0aGUgb3JpZ2luYWwgdGhpbmtpbmcgb2YgXCJ0aGlzIGNlbnR1cnkncyAoYW5kIHBlcmhhcHMgaGlzdG9yeSdzKSBtb3N0IGltcG9ydGFudCB0aGlua2VyIG9uIGFwcGxpZWQgcG9ydGZvbGlvIGludmVzdG1lbnQuXCJgXG4gICAgfV07XG4gIH1cblxuICB0b2dnbGVTaWRlTmF2KCkge1xuICAgIGlmICh0aGlzLnNpZGVOYXYuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaWRlLW5hdl9fdmlzaWJsZScpKSB7XG4gICAgICB0aGlzLmNsb3NlU2lkZU5hdigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNob3dTaWRlTmF2KCk7XG4gICAgfVxuICB9XG5cbiAgY2xvc2VTaWRlTmF2KCkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLnNpZGVOYXYuY2xhc3NMaXN0LnJlbW92ZSgnc2lkZS1uYXZfX3Zpc2libGUnKTtcbiAgICAgIHRoaXMuc2lkZU5hdkNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnc2lkZS1uYXZfY29udGVudF92aXNpYmxlJyk7XG4gICAgfSk7XG4gIH1cblxuICBzaG93U2lkZU5hdigpIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5zaWRlTmF2LmNsYXNzTGlzdC5hZGQoJ3NpZGUtbmF2X192aXNpYmxlJyk7XG4gICAgICB0aGlzLnNpZGVOYXZDb250ZW50LmNsYXNzTGlzdC5hZGQoJ3NpZGUtbmF2X2NvbnRlbnRfdmlzaWJsZScpO1xuICAgIH0pO1xuICB9XG5cbiAgbmF2VG9Cb29rcygpIHtcbiAgICB0aGlzLmNsb3NlU2lkZU5hdigpO1xuICAgIC8vIFRPRE8oYmVub2l0KSBzbyB3cm9uZy4gbGV0cyBnZXQgc29tZSBhZGVxdWF0ZSBNVkMuLi5cblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib29rcy1jb250YWluZXInKS5jbGFzc0xpc3QuYWRkKCdib29rcy1jb250YWluZXJfX3Zpc2libGUnKTtcblxuICAgIHRoaXMuYm9va3MuZm9yRWFjaChib29rID0+IHtcbiAgICAgIGxldCBib29rQ2FyZCA9IG5ldyBCb29rQ2FyZChib29rLmlkLCBib29rLnRpdGxlLCBib29rLmRlc2NyaXB0aW9uLCBib29rLmltYWdlX3VybCk7XG4gICAgICBib29rQ2FyZC5yZW5kZXIoKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5hdlRvUG9ydGZvbGlvKCkge1xuICAgIC8vIFRPRE8oYmVub2l0KVxuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBBcHBDb250cm9sbGVyICBmcm9tICcuL2NvbnRyb2xsZXJzL0FwcENvbnRyb2xsZXInO1xuXG5uZXcgQXBwQ29udHJvbGxlcigpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb29rQ2FyZCB7XG4gIGNvbnN0cnVjdG9yKGlkLCB0aXRsZSA9ICd0aXRsZScsIGRlc2NyaXB0aW9uID0gJ2Rlc2NyaXB0aW9uJywgaW1hZ2VVcmwpIHtcbiAgICBpZiAoaWQgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgJ21pc3NpbmcgaWQnO1xuICAgIH1cblxuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIHRoaXMuaW1hZ2VVcmwgPSBpbWFnZVVybDtcbiAgfVxuICAvL1xuICAvLyBnZXQgaW1hZ2VVcmwoKSB7XG4gIC8vICAgcmV0dXJuIGBpbWFnZXMvJHt0aGlzLmlkfS5wbmdgO1xuICAvLyB9XG5cbiAgZ2V0IHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBbXG4gICAgICBgPGRpdiBjbGFzcz1cImNhcmRfaW5uZXJcIj5gLFxuICAgICAgICBgPGRpdiBjbGFzcz1cImNhcmRfdGl0bGUtaW5uZXJcIj5gLFxuICAgICAgICAgIGA8aDEgY2xhc3M9XCJjYXJkX3RpdGxlXCI+JHt0aGlzLnRpdGxlfTwvaDE+YCxcbiAgICAgICAgYDwvZGl2PmAsXG4gICAgICAgIGA8ZmlndXJlIGNsYXNzPVwiY2FyZF9maWd1cmVcIj5gLFxuICAgICAgICAgIGA8aW1nIGNsYXNzPVwiY2FyZF9pbWFnZVwiIHNyYz1cIiR7dGhpcy5pbWFnZVVybH1cIiAvPmAsXG4gICAgICAgIGA8L2ZpZ3VyZT5gLFxuICAgICAgICBgPGRpdiBjbGFzcz1cImNhcmRfZGVzY3JpcHRpb24taW5uZXJcIj5gLFxuICAgICAgICAgIGA8cCBjbGFzcz1cImNhcmRfZGVzY3JpcHRpb25cIj4ke3RoaXMuZGVzY3JpcHRpb259PC9wPmAsXG4gICAgICAgIGA8L2Rpdj5gLFxuICAgICAgYDwvZGl2PmBcbiAgICBdLmpvaW4oJycpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYm9vay1jYXJkJywgYGNhcmQtJHt0aGlzLmlkfWApO1xuICAgIHRoaXMuZWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLnRlbXBsYXRlO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib29rcy1jb250YWluZXInKS5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMpO1xuICB9XG59XG4iXX0=
