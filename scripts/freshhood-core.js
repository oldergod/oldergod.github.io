/*! (c) 2016 Benoit Quenaudon (MIT) */
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Controller2 = require('./Controller');

var _Controller3 = _interopRequireDefault(_Controller2);

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
    _this.sideNav = document.querySelector('.side-nav');
    _this.sideNavContent = _this.sideNav.querySelector('.side-nav_content');

    _this.sideNavToggleButton.addEventListener('click', _this.toggleSideNav.bind(_this));
    _this.sideNav.addEventListener('click', _this.closeSideNav.bind(_this));
    _this.sideNavContent.addEventListener('click', function (e) {
      return e.stopPropagation();
    });
    return _this;
  }

  _createClass(AppController, [{
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
  }]);

  return AppController;
}(_Controller3.default);

exports.default = AppController;

},{"./Controller":2}],2:[function(require,module,exports){
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

var _AppController = require('./controllers/AppController');

var _AppController2 = _interopRequireDefault(_AppController);

var _BookCard = require('./models/BookCard');

var _BookCard2 = _interopRequireDefault(_BookCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _AppController2.default();

new _BookCard2.default({ id: 'id' }).render();

},{"./controllers/AppController":1,"./models/BookCard":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BookCard = function () {
  function BookCard(_ref) {
    var id = _ref.id;
    var _ref$title = _ref.title;
    var title = _ref$title === undefined ? 'title' : _ref$title;
    var _ref$description = _ref.description;
    var description = _ref$description === undefined ? 'description' : _ref$description;

    _classCallCheck(this, BookCard);

    if (id == null) {
      throw 'missing id';
    }

    this.id = id;
    this.title = title;
    this.description = description;
  }

  _createClass(BookCard, [{
    key: 'render',
    value: function render() {
      this.element = document.createElement('section');
      this.element.classList.add('card', 'card-' + this.id);
      this.element.innerHTML = this.template;
      document.body.appendChild(this.element);
      console.log(this);
    }
  }, {
    key: 'imageUrl',
    get: function get() {
      return 'images/' + this.id + '.png';
    }
  }, {
    key: 'template',
    get: function get() {
      return ['<div class="card_inner">', '<div class="card_title"', '<h1>' + this.title + '</h1>', '</div>', '<div class="card_image"', '<img src="' + this.imageUrl + '" />', '</div>', '<div class="card_description"', '<p>' + this.description + '</p>', '</div>', '</div>'].join('');
    }
  }]);

  return BookCard;
}();

exports.default = BookCard;

},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9jb250cm9sbGVycy9BcHBDb250cm9sbGVyLmpzIiwic3JjL3NjcmlwdHMvY29udHJvbGxlcnMvQ29udHJvbGxlci5qcyIsInNyYy9zY3JpcHRzL2ZyZXNoaG9vZC1jb3JlLmpzIiwic3JjL3NjcmlwdHMvbW9kZWxzL0Jvb2tDYXJkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7Ozs7Ozs7O0FBRUE7Ozs7Ozs7Ozs7OztJQUVxQjs7O0FBQ25CLFdBRG1CLGFBQ25CLEdBQWM7MEJBREssZUFDTDs7dUVBREssMkJBQ0w7O0FBRVosVUFBSyxtQkFBTCxHQUEyQixTQUFTLGFBQVQsQ0FBdUIseUJBQXZCLENBQTNCLENBRlk7QUFHWixVQUFLLE9BQUwsR0FBZSxTQUFTLGFBQVQsQ0FBdUIsV0FBdkIsQ0FBZixDQUhZO0FBSVosVUFBSyxjQUFMLEdBQXNCLE1BQUssT0FBTCxDQUFhLGFBQWIsQ0FBMkIsbUJBQTNCLENBQXRCLENBSlk7O0FBTVosVUFBSyxtQkFBTCxDQUF5QixnQkFBekIsQ0FBMEMsT0FBMUMsRUFBbUQsTUFBSyxhQUFMLENBQW1CLElBQW5CLE9BQW5ELEVBTlk7QUFPWixVQUFLLE9BQUwsQ0FBYSxnQkFBYixDQUE4QixPQUE5QixFQUF1QyxNQUFLLFlBQUwsQ0FBa0IsSUFBbEIsT0FBdkMsRUFQWTtBQVFaLFVBQUssY0FBTCxDQUFvQixnQkFBcEIsQ0FBcUMsT0FBckMsRUFBOEMsVUFBQyxDQUFEO2FBQU8sRUFBRSxlQUFGO0tBQVAsQ0FBOUMsQ0FSWTs7R0FBZDs7ZUFEbUI7O29DQVlIO0FBQ2QsVUFBSSxLQUFLLE9BQUwsQ0FBYSxTQUFiLENBQXVCLFFBQXZCLENBQWdDLG1CQUFoQyxDQUFKLEVBQTBEO0FBQ3hELGFBQUssWUFBTCxHQUR3RDtPQUExRCxNQUVPO0FBQ0wsYUFBSyxXQUFM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TCxJQVpLLENBWUEsRUFaQSxDQUFQLENBRGE7Ozs7U0FmSSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBDb250cm9sbGVyIGZyb20gJy4vQ29udHJvbGxlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcENvbnRyb2xsZXIgZXh0ZW5kcyBDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuc2lkZU5hdlRvZ2dsZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfdG9nZ2xlLXNpZGUtbmF2Jyk7XG4gICAgdGhpcy5zaWRlTmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGUtbmF2Jyk7XG4gICAgdGhpcy5zaWRlTmF2Q29udGVudCA9IHRoaXMuc2lkZU5hdi5xdWVyeVNlbGVjdG9yKCcuc2lkZS1uYXZfY29udGVudCcpO1xuXG4gICAgdGhpcy5zaWRlTmF2VG9nZ2xlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy50b2dnbGVTaWRlTmF2LmJpbmQodGhpcykpO1xuICAgIHRoaXMuc2lkZU5hdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xvc2VTaWRlTmF2LmJpbmQodGhpcykpO1xuICAgIHRoaXMuc2lkZU5hdkNvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4gZS5zdG9wUHJvcGFnYXRpb24oKSk7XG4gIH1cblxuICB0b2dnbGVTaWRlTmF2KCkge1xuICAgIGlmICh0aGlzLnNpZGVOYXYuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaWRlLW5hdl9fdmlzaWJsZScpKSB7XG4gICAgICB0aGlzLmNsb3NlU2lkZU5hdigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNob3dTaWRlTmF2KCk7XG4gICAgfVxuICB9XG5cbiAgY2xvc2VTaWRlTmF2KCkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLnNpZGVOYXYuY2xhc3NMaXN0LnJlbW92ZSgnc2lkZS1uYXZfX3Zpc2libGUnKTtcbiAgICAgIHRoaXMuc2lkZU5hdkNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnc2lkZS1uYXZfY29udGVudF92aXNpYmxlJyk7XG4gICAgfSk7XG4gIH1cblxuICBzaG93U2lkZU5hdigpIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5zaWRlTmF2LmNsYXNzTGlzdC5hZGQoJ3NpZGUtbmF2X192aXNpYmxlJyk7XG4gICAgICB0aGlzLnNpZGVOYXZDb250ZW50LmNsYXNzTGlzdC5hZGQoJ3NpZGUtbmF2X2NvbnRlbnRfdmlzaWJsZScpO1xuICAgIH0pO1xuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRyb2xsZXIge1xuICBsb2FkU2NyaXB0KHVybCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICBzY3JpcHQuYXN5bmMgPSB0cnVlO1xuICAgICAgc2NyaXB0LnNyYyA9IHVybDtcblxuICAgICAgc2NyaXB0Lm9ubG9hZCA9IHJlc29sdmU7XG4gICAgICBzY3JpcHQub25lcnJvciA9IHJlamVjdDtcblxuICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgIH0pO1xuICB9XG5cbiAgbG9hZENTUyh1cmwpIHtcbiAgICByZXR1cm4gZmV0Y2godXJsKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICByZXNwb25zZS5ib2R5KCkudGhlbihib2R5ID0+IHtcbiAgICAgICAgICB2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICAgIHN0eWxlLnRleHRDb250ZW50ID0gYm9keTtcbiAgICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBgc3R5bGUgYXQgdXJsOiR7dXJsfSBub3QgZm91bmQuYDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQXBwQ29udHJvbGxlciAgZnJvbSAnLi9jb250cm9sbGVycy9BcHBDb250cm9sbGVyJztcbmltcG9ydCBCb29rQ2FyZCBmcm9tICcuL21vZGVscy9Cb29rQ2FyZCc7XG5uZXcgQXBwQ29udHJvbGxlcigpO1xuXG5uZXcgQm9va0NhcmQoe2lkOiAnaWQnfSkucmVuZGVyKCk7XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvb2tDYXJkIHtcbiAgY29uc3RydWN0b3Ioe2lkLCB0aXRsZSA9ICd0aXRsZScsIGRlc2NyaXB0aW9uID0gJ2Rlc2NyaXB0aW9uJ30pIHtcbiAgICBpZiAoaWQgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgJ21pc3NpbmcgaWQnO1xuICAgIH1cblxuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICB9XG5cbiAgZ2V0IGltYWdlVXJsKCkge1xuICAgIHJldHVybiBgaW1hZ2VzLyR7dGhpcy5pZH0ucG5nYDtcbiAgfVxuXG4gIGdldCB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gW1xuICAgICAgYDxkaXYgY2xhc3M9XCJjYXJkX2lubmVyXCI+YCxcbiAgICAgICAgYDxkaXYgY2xhc3M9XCJjYXJkX3RpdGxlXCJgLFxuICAgICAgICAgIGA8aDE+JHt0aGlzLnRpdGxlfTwvaDE+YCxcbiAgICAgICAgYDwvZGl2PmAsXG4gICAgICAgIGA8ZGl2IGNsYXNzPVwiY2FyZF9pbWFnZVwiYCxcbiAgICAgICAgICBgPGltZyBzcmM9XCIke3RoaXMuaW1hZ2VVcmx9XCIgLz5gLFxuICAgICAgICBgPC9kaXY+YCxcbiAgICAgICAgYDxkaXYgY2xhc3M9XCJjYXJkX2Rlc2NyaXB0aW9uXCJgLFxuICAgICAgICAgIGA8cD4ke3RoaXMuZGVzY3JpcHRpb259PC9wPmAsXG4gICAgICAgIGA8L2Rpdj5gLFxuICAgICAgYDwvZGl2PmBcbiAgICBdLmpvaW4oJycpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnY2FyZCcsIGBjYXJkLSR7dGhpcy5pZH1gKTtcbiAgICB0aGlzLmVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy50ZW1wbGF0ZTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudCk7XG4gICAgY29uc29sZS5sb2codGhpcyk7XG4gIH1cbn1cbiJdfQ==
