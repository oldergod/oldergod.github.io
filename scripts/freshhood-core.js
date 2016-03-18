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
      return ['<div class="card_inner">', '<div class="card_title">', '<h1>' + this.title + '</h1>', '</div>', '<figure class="card_figure">', '<img class="card_image" src="' + this.imageUrl + '" />', '</figure>', '<div class="card_description">', '<p>' + this.description + '</p>', '</div>', '</div>'].join('');
    }
  }]);

  return BookCard;
}();

exports.default = BookCard;

},{}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9jb250cm9sbGVycy9BcHBDb250cm9sbGVyLmpzIiwic3JjL3NjcmlwdHMvY29udHJvbGxlcnMvQ29udHJvbGxlci5qcyIsInNyYy9zY3JpcHRzL2NvbnRyb2xsZXJzL1NpZGVOYXZDb250cm9sbGVyLmpzIiwic3JjL3NjcmlwdHMvZnJlc2hob29kLWNvcmUuanMiLCJzcmMvc2NyaXB0cy9tb2RlbHMvQm9va0NhcmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7Ozs7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUI7OztBQUNuQixXQURtQixhQUNuQixHQUFjOzBCQURLLGVBQ0w7O3VFQURLLDJCQUNMOztBQUVaLFVBQUssbUJBQUwsR0FBMkIsU0FBUyxhQUFULENBQXVCLHlCQUF2QixDQUEzQixDQUZZO0FBR1osVUFBSyxtQkFBTCxDQUF5QixnQkFBekIsQ0FBMEMsT0FBMUMsRUFBbUQsTUFBSyxhQUFMLENBQW1CLElBQW5CLE9BQW5ELEVBSFk7QUFJWixVQUFLLGlCQUFMLEdBQXlCLGlDQUF6QixDQUpZOztHQUFkOztlQURtQjs7b0NBUUg7QUFDZCxXQUFLLGlCQUFMLENBQXVCLGFBQXZCLEdBRGM7Ozs7U0FSRzs7Ozs7O0FDTHJCOzs7Ozs7Ozs7O0lBRXFCOzs7Ozs7OytCQUNSLEtBQUs7QUFDZCxhQUFPLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBcUI7QUFDdEMsWUFBSSxTQUFTLFNBQVMsYUFBVCxDQUF1QixRQUF2QixDQUFULENBRGtDO0FBRXRDLGVBQU8sS0FBUCxHQUFlLElBQWYsQ0FGc0M7QUFHdEMsZUFBTyxHQUFQLEdBQWEsR0FBYixDQUhzQzs7QUFLdEMsZUFBTyxNQUFQLEdBQWdCLE9BQWhCLENBTHNDO0FBTXRDLGVBQU8sT0FBUCxHQUFpQixN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QUwsQ0FBdkQsQ0FKTztBQUtQLGNBQVEsR0FBUixDQUFZLElBQVosRUFMTzs7Ozt3QkFoQk07QUFDYixhQUFPLGtFQUdNLEtBQUssS0FBTCxVQUhOLDhFQU0rQixLQUFLLFFBQUwsU0FOL0IseURBU0ssS0FBSyxXQUFMLFNBVEwsc0JBWUwsSUFaSyxDQVlBLEVBWkEsQ0FBUCxDQURhOzs7O1NBaEJJIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IENvbnRyb2xsZXIgZnJvbSAnLi9Db250cm9sbGVyJztcbmltcG9ydCBTaWRlTmF2Q29udHJvbGxlciBmcm9tICcuL1NpZGVOYXZDb250cm9sbGVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwQ29udHJvbGxlciBleHRlbmRzIENvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5zaWRlTmF2VG9nZ2xlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl90b2dnbGUtc2lkZS1uYXYnKTtcbiAgICB0aGlzLnNpZGVOYXZUb2dnbGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnRvZ2dsZVNpZGVOYXYuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5zaWRlTmF2Q29udHJvbGxlciA9IG5ldyBTaWRlTmF2Q29udHJvbGxlcigpO1xuICB9XG5cbiAgdG9nZ2xlU2lkZU5hdigpIHtcbiAgICB0aGlzLnNpZGVOYXZDb250cm9sbGVyLnRvZ2dsZVNpZGVOYXYoKTtcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250cm9sbGVyIHtcbiAgbG9hZFNjcmlwdCh1cmwpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgc2NyaXB0LmFzeW5jID0gdHJ1ZTtcbiAgICAgIHNjcmlwdC5zcmMgPSB1cmw7XG5cbiAgICAgIHNjcmlwdC5vbmxvYWQgPSByZXNvbHZlO1xuICAgICAgc2NyaXB0Lm9uZXJyb3IgPSByZWplY3Q7XG5cbiAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICB9KTtcbiAgfVxuXG4gIGxvYWRDU1ModXJsKSB7XG4gICAgcmV0dXJuIGZldGNoKHVybCkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgcmVzcG9uc2UuYm9keSgpLnRoZW4oYm9keSA9PiB7XG4gICAgICAgICAgdmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgICAgICBzdHlsZS50ZXh0Q29udGVudCA9IGJvZHk7XG4gICAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgYHN0eWxlIGF0IHVybDoke3VybH0gbm90IGZvdW5kLmA7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEJvb2tDYXJkIGZyb20gJy4uL21vZGVscy9Cb29rQ2FyZCc7XG5pbXBvcnQgQ29udHJvbGxlciBmcm9tICcuL0NvbnRyb2xsZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaWRlTmF2Q29udHJvbGxlciBleHRlbmRzIENvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5zaWRlTmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGUtbmF2Jyk7XG4gICAgdGhpcy5zaWRlTmF2Q29udGVudCA9IHRoaXMuc2lkZU5hdi5xdWVyeVNlbGVjdG9yKCcuc2lkZS1uYXZfY29udGVudCcpO1xuXG4gICAgdGhpcy5zaWRlTmF2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbG9zZVNpZGVOYXYuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5zaWRlTmF2Q29udGVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiBlLnN0b3BQcm9wYWdhdGlvbigpKTtcblxuICAgIHRoaXMubmF2VG9Cb29rc0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlLW5hdl9uYXYtdG8tYm9va3MnKTtcbiAgICB0aGlzLm5hdlRvQm9va3NCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm5hdlRvQm9va3MuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5uYXZUb1BvcnRmb2xpb0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlLW5hdl9uYXYtdG8tcG9ydGZvbGlvJyk7XG4gICAgdGhpcy5uYXZUb1BvcnRmb2xpb0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMubmF2VG9Qb3J0Zm9saW8uYmluZCh0aGlzKSk7XG5cbiAgICB0aGlzLmJvb2tzID0gW3tcbiAgICAgIGlkOiAxLFxuICAgICAgdGl0bGU6ICdXaXphcmQ6IFRoZSBMaWZlIEFuZCBUaW1lcyBvZiBOaWtvbGEgVGVzbGEnLFxuICAgICAgYXV0aG9yOiAnTWFyYyBKLiBTZWlmZXInLFxuICAgICAgaW1hZ2VfdXJsOiAnaHR0cDovL2VjeC5pbWFnZXMtYW1hem9uLmNvbS9pbWFnZXMvSS81MXN3eDFHbCUyQk1MLl9TWDMyM19CTzEsMjA0LDIwMywyMDBfLmpwZycsXG4gICAgICBkZXNjcmlwdGlvbjogYE5pa29sYSBUZXNsYSAoMTg1Ni0xOTQzKSwgY3JlZGl0ZWQgYXMgdGhlIGluc3BpcmF0aW9uIGZvciByYWRpbywgcm9ib3RzLCBhbmQgZXZlbiByYWRhciwgaGFzIGJlZW4gY2FsbGVkIHRoZSBwYXRyb24gc2FpbnQgb2YgbW9kZXJuIGVsZWN0cmljaXR5LiBCYXNlZCBvbiBvcmlnaW5hbCBtYXRlcmlhbCBhbmQgcHJldmlvdXNseSB1bmF2YWlsYWJsZSBkb2N1bWVudHMsIHRoaXMgYWNjbGFpbWVkIGJvb2sgaXMgdGhlIGRlZmluaXRpdmUgYmlvZ3JhcGh5IG9mIHRoZSBtYW4gY29uc2lkZXJlZCBieSBtYW55IHRvIGJlIHRoZSBmb3VuZGluZyBmYXRoZXIgb2YgbW9kZXJuIGVsZWN0cmljYWwgdGVjaG5vbG9neS4gQW1vbmcgVGVzbGEncyBjcmVhdGlvbnMgd2VyZSB0aGUgY2hhbm5lbGluZyBvZiBhbHRlcm5hdGluZyBjdXJyZW50LCBmbHVvcmVzY2VudCBhbmQgbmVvbiBsaWdodGluZywgd2lyZWxlc3MgdGVsZWdyYXBoeSwgYW5kIHRoZSBnaWFudCB0dXJiaW5lcyB0aGF0IGhhcm5lc3NlZCB0aGUgcG93ZXIgb2YgTmlhZ2FyYSBGYWxscy5gXG4gICAgfSwge1xuICAgICAgaWQ6IDIsXG4gICAgICB0aXRsZTogJ0plYW4gTW91bGluJyxcbiAgICAgIGF1dGhvcjogJ0plYW4tUGllcnJlIEF6ZW1hJyxcbiAgICAgIGltYWdlX3VybDogJ2h0dHA6Ly9lY3guaW1hZ2VzLWFtYXpvbi5jb20vaW1hZ2VzL0kvNDF0VHpTMVRzJTJCTC5fU1gzMDRfQk8xLDIwNCwyMDMsMjAwXy5qcGcnLFxuICAgICAgZGVzY3JpcHRpb246IGBMZSBKZWFuIE1vdWxpbiBkJ0F6w6ltYSBmYWl0IGF1am91cmQnaHVpIHLDqWbDqXJlbmNlIGNvbW1lIGlsIGEgcmVjdWVpbGxpIGxlcyBzdWZmcmFnZXMgZGUgbGEgY3JpdGlxdWUgw6Agc2EgcGFydXRpb24uIENhciwgYXUtZGVsw6AgZCd1bmUgYmlvZ3JhcGhpZSBwb2xpdGlxdWUsIEplYW4tUGllcnJlIEF6w6ltYSBhIHN1IHJldHJhY2VyIGwnaGlzdG9pcmUgZGUgbGEgRnJhbmNlIGxpYnJlIGp1c3F1J2VuIDE5NDMsIGRlIGxhIFLDqXNpc3RhbmNlIGludMOpcmlldXJlIGV0IGRlcyByZWxhdGlvbnMgY29tcGxleGVzIGVudHJlIExvbmRyZXMsIFdhc2hpbmd0b24gZXQgQWxnZXIuIEVuIGNvbWJpbmFudCBhcmNoaXZlcywgcsOpY2l0cywgZXhwbGljYXRpb25zIGV0IHTDqW1vaWduYWdlcywgaWwgYnJvc3NlIGF1c3NpIGwnYXZlbnR1cmUgc2luZ3VsacOocmUgZCd1biBob21tZSDDoCBsYSBmb2lzIHNlbWJsYWJsZSDDoCB0YW50IGRlIHNlcyBjb250ZW1wb3JhaW5zIGV0IGRvbnQgbCdlbnRyZXByaXNlIGxlIGhpc3NlIGp1c3F1J8OgIGluY2FybmVyIGxlIGjDqXJvcyBkZSBsYSBSw6lzaXN0YW5jZSBwb3VyIHBsdXNpZXVycyBnw6luw6lyYXRpb25zIGRlIEZyYW7Dp2Fpcy4gSmVhbi1QaWVycmUgQXrDqW1hLCBwcm9mZXNzZXVyIMOgIFNjaWVuY2VzLVBvLCBhIG5vdGFtbWVudCBwdWJsacOpIERlIE11bmljaCDDoCBsYSBMaWLDqXJhdGlvbiwgTCdBbm7DqWUgMTk0MCBldCBWaWNoeS5gXG4gICAgfSwge1xuICAgICAgaWQ6IDMsXG4gICAgICB0aXRsZTogJ0RlcyBHZW5zIFRyZXMgQmllbicsXG4gICAgICBhdXRob3I6ICdBbGV4YW5kZSBKYXJkaW4nLFxuICAgICAgaW1hZ2VfdXJsOiAnaHR0cDovL2VjeC5pbWFnZXMtYW1hem9uLmNvbS9pbWFnZXMvSS81MTVyYXhqWG5xTC5fU1gzMDdfQk8xLDIwNCwyMDMsMjAwXy5qcGcnLFxuICAgICAgZGVzY3JpcHRpb246IGBUYW5kaXMgcXVlIG1vbiBww6hyZSBzJ2VuZG9ydCBwZXUgw6AgcGV1IGNvbnRyZSBtb2ksIGplIGx1aSBwYXJsZSB1bmUgZGVybmnDqHJlIGZvaXMgOiBQbHVzIHRhcmQsIHR1IG5lIHBvdXJyYXMgcGFzIHZpdnJlIGF2ZWMgbGUgc2VjcmV0IGRlcyBKYXJkaW4uIElsIHRlIHR1ZXJhLi4uIFR1IGZlcmFzIHVuIGxpdnJlLCBMZSBOYWluIGphdW5lLCBwb3VyIGxlIGNhbW91Zmxlci4gQXUgbcOqbWUgw6JnZSBxdWUgdG9pLCBqJ2VuIGZlcmFpIHVuLCBEZXMgZ2VucyB0csOocyBiaWVuLCBwb3VyIGwnZXhwb3Nlci4gRXQgamUgdml2cmFpIGxhIGRlcm5pw6hyZSBwYXJ0aWUgZGUgdGEgdmllLi4uIExhIG1pZW5uZS4gRG9ycyBtb24gcGV0aXQgcGFwYSwgZG9ycy4uLiBDZSBsaXZyZSBhdXJhaXQgcHUgcydhcHBlbGVyIFwiZmluaSBkZSByaXJlXCIuIEMnZXN0IGxlIGNhcm5ldCBkZSBib3JkIGRlIG1hIGxlbnRlIGx1Y2lkaXTDqS5gXG4gICAgfV07XG4gIH1cblxuICB0b2dnbGVTaWRlTmF2KCkge1xuICAgIGlmICh0aGlzLnNpZGVOYXYuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaWRlLW5hdl9fdmlzaWJsZScpKSB7XG4gICAgICB0aGlzLmNsb3NlU2lkZU5hdigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNob3dTaWRlTmF2KCk7XG4gICAgfVxuICB9XG5cbiAgY2xvc2VTaWRlTmF2KCkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLnNpZGVOYXYuY2xhc3NMaXN0LnJlbW92ZSgnc2lkZS1uYXZfX3Zpc2libGUnKTtcbiAgICAgIHRoaXMuc2lkZU5hdkNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnc2lkZS1uYXZfY29udGVudF92aXNpYmxlJyk7XG4gICAgfSk7XG4gIH1cblxuICBzaG93U2lkZU5hdigpIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5zaWRlTmF2LmNsYXNzTGlzdC5hZGQoJ3NpZGUtbmF2X192aXNpYmxlJyk7XG4gICAgICB0aGlzLnNpZGVOYXZDb250ZW50LmNsYXNzTGlzdC5hZGQoJ3NpZGUtbmF2X2NvbnRlbnRfdmlzaWJsZScpO1xuICAgIH0pO1xuICB9XG5cbiAgbmF2VG9Cb29rcygpIHtcbiAgICB0aGlzLmNsb3NlU2lkZU5hdigpO1xuICAgIC8vIFRPRE8oYmVub2l0KSBzbyB3cm9uZy4gbGV0cyBnZXQgc29tZSBhZGVxdWF0ZSBNVkMuLi5cblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib29rcy1jb250YWluZXInKS5jbGFzc0xpc3QuYWRkKCdib29rcy1jb250YWluZXJfX3Zpc2libGUnKTtcblxuICAgIHRoaXMuYm9va3MuZm9yRWFjaChib29rID0+IHtcbiAgICAgIGxldCBib29rQ2FyZCA9IG5ldyBCb29rQ2FyZChib29rLmlkLCBib29rLnRpdGxlLCBib29rLmRlc2NyaXB0aW9uLCBib29rLmltYWdlX3VybCk7XG4gICAgICBib29rQ2FyZC5yZW5kZXIoKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5hdlRvUG9ydGZvbGlvKCkge1xuICAgIC8vIFRPRE8oYmVub2l0KVxuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBBcHBDb250cm9sbGVyICBmcm9tICcuL2NvbnRyb2xsZXJzL0FwcENvbnRyb2xsZXInO1xuXG5uZXcgQXBwQ29udHJvbGxlcigpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb29rQ2FyZCB7XG4gIGNvbnN0cnVjdG9yKGlkLCB0aXRsZSA9ICd0aXRsZScsIGRlc2NyaXB0aW9uID0gJ2Rlc2NyaXB0aW9uJywgaW1hZ2VVcmwpIHtcbiAgICBpZiAoaWQgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgJ21pc3NpbmcgaWQnO1xuICAgIH1cblxuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIHRoaXMuaW1hZ2VVcmwgPSBpbWFnZVVybDtcbiAgfVxuICAvL1xuICAvLyBnZXQgaW1hZ2VVcmwoKSB7XG4gIC8vICAgcmV0dXJuIGBpbWFnZXMvJHt0aGlzLmlkfS5wbmdgO1xuICAvLyB9XG5cbiAgZ2V0IHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBbXG4gICAgICBgPGRpdiBjbGFzcz1cImNhcmRfaW5uZXJcIj5gLFxuICAgICAgICBgPGRpdiBjbGFzcz1cImNhcmRfdGl0bGVcIj5gLFxuICAgICAgICAgIGA8aDE+JHt0aGlzLnRpdGxlfTwvaDE+YCxcbiAgICAgICAgYDwvZGl2PmAsXG4gICAgICAgIGA8ZmlndXJlIGNsYXNzPVwiY2FyZF9maWd1cmVcIj5gLFxuICAgICAgICAgIGA8aW1nIGNsYXNzPVwiY2FyZF9pbWFnZVwiIHNyYz1cIiR7dGhpcy5pbWFnZVVybH1cIiAvPmAsXG4gICAgICAgIGA8L2ZpZ3VyZT5gLFxuICAgICAgICBgPGRpdiBjbGFzcz1cImNhcmRfZGVzY3JpcHRpb25cIj5gLFxuICAgICAgICAgIGA8cD4ke3RoaXMuZGVzY3JpcHRpb259PC9wPmAsXG4gICAgICAgIGA8L2Rpdj5gLFxuICAgICAgYDwvZGl2PmBcbiAgICBdLmpvaW4oJycpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYm9vay1jYXJkJywgYGNhcmQtJHt0aGlzLmlkfWApO1xuICAgIHRoaXMuZWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLnRlbXBsYXRlO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib29rcy1jb250YWluZXInKS5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMpO1xuICB9XG59XG4iXX0=
