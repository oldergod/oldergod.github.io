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

var _AppController = require('./controller/AppController');

var _AppController2 = _interopRequireDefault(_AppController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _AppController2.default();

},{"./controller/AppController":1}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9jb250cm9sbGVyL0FwcENvbnRyb2xsZXIuanMiLCJzcmMvc2NyaXB0cy9jb250cm9sbGVyL0NvbnRyb2xsZXIuanMiLCJzcmMvc2NyaXB0cy9mcmVzaGhvb2QtY29yZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOzs7Ozs7OztBQUVBOzs7Ozs7Ozs7Ozs7SUFFcUI7OztBQUNuQixXQURtQixhQUNuQixHQUFjOzBCQURLLGVBQ0w7O3VFQURLLDJCQUNMOztBQUVaLFVBQUssbUJBQUwsR0FBMkIsU0FBUyxhQUFULENBQXVCLHlCQUF2QixDQUEzQixDQUZZO0FBR1osVUFBSyxPQUFMLEdBQWUsU0FBUyxhQUFULENBQXVCLFdBQXZCLENBQWYsQ0FIWTtBQUlaLFVBQUssY0FBTCxHQUFzQixNQUFLLE9BQUwsQ0FBYSxhQUFiLENBQTJCLG1CQUEzQixDQUF0QixDQUpZOztBQU1aLFVBQUssbUJBQUwsQ0FBeUIsZ0JBQXpCLENBQTBDLE9BQTFDLEVBQW1ELE1BQUssYUFBTCxDQUFtQixJQUFuQixPQUFuRCxFQU5ZO0FBT1osVUFBSyxPQUFMLENBQWEsZ0JBQWIsQ0FBOEIsT0FBOUIsRUFBdUMsTUFBSyxZQUFMLENBQWtCLElBQWxCLE9BQXZDLEVBUFk7QUFRWixVQUFLLGNBQUwsQ0FBb0IsZ0JBQXBCLENBQXFDLE9BQXJDLEVBQThDLFVBQUMsQ0FBRDthQUFPLEVBQUUsZUFBRjtLQUFQLENBQTlDLENBUlk7O0dBQWQ7O2VBRG1COztvQ0FZSDtBQUNkLFVBQUksS0FBSyxPQUFMLENBQWEsU0FBYixDQUF1QixRQUF2QixDQUFnQyxtQkFBaEMsQ0FBSixFQUEwRDtBQUN4RCxhQUFLLFlBQUwsR0FEd0Q7T0FBMUQsTUFFTztBQUNMLGFBQUssV0FBTCxHQURLO09BRlA7Ozs7bUNBT2E7OztBQUNiLDRCQUFzQixZQUFNO0FBQzFCLGVBQUssT0FBTCxDQUFhLFNBQWIsQ0FBdUIsTUFBdkIsQ0FBOEIsbUJBQTlCLEVBRDBCO0FBRTFCLGVBQUssY0FBTCxDQUFvQixTQUFwQixDQUE4QixNQUE5QixDQUFxQywwQkFBckMsRUFGMEI7T0FBTixDQUF0QixDQURhOzs7O2tDQU9EOzs7QUFDWiw0QkFBc0IsWUFBTTtBQUMxQixlQUFLLE9BQUwsQ0FBYSxTQUFiLENBQXVCLEdBQXZCLENBQTJCLG1CQUEzQixFQUQwQjtBQUUxQixlQUFLLGNBQUwsQ0FBb0IsU0FBcEIsQ0FBOEIsR0FBOUIsQ0FBa0MsMEJBQWxDLEVBRjBCO09BQU4sQ0FBdEIsQ0FEWTs7OztTQTNCSzs7Ozs7O0FDSnJCOzs7Ozs7Ozs7O0lBRXFCOzs7Ozs7OytCQUNSLEtBQUs7QUFDZCxhQUFPLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBcUI7QUFDdEMsWUFBSSxTQUFTLFNBQVMsYUFBVCxDQUF1QixRQUF2QixDQUFULENBRGtDO0FBRXRDLGVBQU8sS0FBUCxHQUFlLElBQWYsQ0FGc0M7QUFHdEMsZUFBTyxHQUFQLEdBQWEsR0FBYixDQUhzQzs7QUFLdEMsZUFBTyxNQUFQLEdBQWdCLE9BQWhCLENBTHNDO0FBTXRDLGVBQU8sT0FBUCxHQUFpQixNQUFqQixDQU5zQzs7QUFRdEMsaUJBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsTUFBMUIsRUFSc0M7T0FBckIsQ0FBbkIsQ0FEYzs7Ozs0QkFhUixLQUFLO0FBQ1gsYUFBTyxNQUFNLEdBQU4sRUFBVyxJQUFYLENBQWdCLG9CQUFZO0FBQ2pDLFlBQUksU0FBUyxNQUFULEtBQW9CLEdBQXBCLEVBQXlCO0FBQzNCLG1CQUFTLElBQVQsR0FBZ0IsSUFBaEIsQ0FBcUIsZ0JBQVE7QUFDM0IsZ0JBQUksUUFBUSxTQUFTLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBUixDQUR1QjtBQUUzQixrQkFBTSxXQUFOLEdBQW9CLElBQXBCLENBRjJCO0FBRzNCLHFCQUFTLElBQVQsQ0FBYyxXQUFkLENBQTBCLEtBQTFCLEVBSDJCO1dBQVIsQ0FBckIsQ0FEMkI7U0FBN0IsTUFNTztBQUNMLGtDQUFzQixtQkFBdEIsQ0FESztTQU5QO09BRHFCLENBQXZCLENBRFc7Ozs7U0FkTTs7Ozs7O0FDRnJCOztBQUVBOzs7Ozs7QUFFQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBDb250cm9sbGVyIGZyb20gJy4vQ29udHJvbGxlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcENvbnRyb2xsZXIgZXh0ZW5kcyBDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuc2lkZU5hdlRvZ2dsZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfdG9nZ2xlLXNpZGUtbmF2Jyk7XG4gICAgdGhpcy5zaWRlTmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGUtbmF2Jyk7XG4gICAgdGhpcy5zaWRlTmF2Q29udGVudCA9IHRoaXMuc2lkZU5hdi5xdWVyeVNlbGVjdG9yKCcuc2lkZS1uYXZfY29udGVudCcpO1xuXG4gICAgdGhpcy5zaWRlTmF2VG9nZ2xlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy50b2dnbGVTaWRlTmF2LmJpbmQodGhpcykpO1xuICAgIHRoaXMuc2lkZU5hdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xvc2VTaWRlTmF2LmJpbmQodGhpcykpO1xuICAgIHRoaXMuc2lkZU5hdkNvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4gZS5zdG9wUHJvcGFnYXRpb24oKSk7XG4gIH1cblxuICB0b2dnbGVTaWRlTmF2KCkge1xuICAgIGlmICh0aGlzLnNpZGVOYXYuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaWRlLW5hdl9fdmlzaWJsZScpKSB7XG4gICAgICB0aGlzLmNsb3NlU2lkZU5hdigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNob3dTaWRlTmF2KCk7XG4gICAgfVxuICB9XG5cbiAgY2xvc2VTaWRlTmF2KCkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLnNpZGVOYXYuY2xhc3NMaXN0LnJlbW92ZSgnc2lkZS1uYXZfX3Zpc2libGUnKTtcbiAgICAgIHRoaXMuc2lkZU5hdkNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnc2lkZS1uYXZfY29udGVudF92aXNpYmxlJyk7XG4gICAgfSk7XG4gIH1cblxuICBzaG93U2lkZU5hdigpIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5zaWRlTmF2LmNsYXNzTGlzdC5hZGQoJ3NpZGUtbmF2X192aXNpYmxlJyk7XG4gICAgICB0aGlzLnNpZGVOYXZDb250ZW50LmNsYXNzTGlzdC5hZGQoJ3NpZGUtbmF2X2NvbnRlbnRfdmlzaWJsZScpO1xuICAgIH0pO1xuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRyb2xsZXIge1xuICBsb2FkU2NyaXB0KHVybCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICBzY3JpcHQuYXN5bmMgPSB0cnVlO1xuICAgICAgc2NyaXB0LnNyYyA9IHVybDtcblxuICAgICAgc2NyaXB0Lm9ubG9hZCA9IHJlc29sdmU7XG4gICAgICBzY3JpcHQub25lcnJvciA9IHJlamVjdDtcblxuICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgIH0pO1xuICB9XG5cbiAgbG9hZENTUyh1cmwpIHtcbiAgICByZXR1cm4gZmV0Y2godXJsKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICByZXNwb25zZS5ib2R5KCkudGhlbihib2R5ID0+IHtcbiAgICAgICAgICB2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICAgIHN0eWxlLnRleHRDb250ZW50ID0gYm9keTtcbiAgICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBgc3R5bGUgYXQgdXJsOiR7dXJsfSBub3QgZm91bmQuYDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQXBwQ29udHJvbGxlciAgZnJvbSAnLi9jb250cm9sbGVyL0FwcENvbnRyb2xsZXInO1xuXG5uZXcgQXBwQ29udHJvbGxlcigpO1xuIl19
