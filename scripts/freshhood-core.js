/*! (c) 2016 Benoit Quenaudon (MIT) */
!function e(t,n,i){function r(s,a){if(!n[s]){if(!t[s]){var l="function"==typeof require&&require;if(!a&&l)return l(s,!0);if(o)return o(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var c=n[s]={exports:{}};t[s][0].call(c.exports,function(e){var n=t[s][1][e];return r(n?n:e)},c,c.exports,e,t,n,i)}return n[s].exports}for(var o="function"==typeof require&&require,s=0;s<i.length;s++)r(i[s]);return r}({1:[function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(n,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),l=e("../views/Button"),u=i(l),c=e("./Controller"),d=i(c),h=e("./SideNavController"),p=i(h),f=function(e){function t(){r(this,t);var e=o(this,Object.getPrototypeOf(t).call(this));return e.sideNavToggleButton=new u["default"](document.querySelector(".header_toggle-side-nav")),e.sideNavToggleButton.element.addEventListener("click",e.toggleSideNav.bind(e)),e.sideNavController=new p["default"],e}return s(t,e),a(t,[{key:"toggleSideNav",value:function(){this.sideNavController.toggleSideNav()}}]),t}(d["default"]);n["default"]=f},{"../views/Button":6,"./Controller":2,"./SideNavController":3}],2:[function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),o=function(){function e(){i(this,e)}return r(e,[{key:"loadScript",value:function(e){return new Promise(function(t,n){var i=document.createElement("script");i.async=!0,i.src=e,i.onload=t,i.onerror=n,document.head.appendChild(i)})}},{key:"loadCSS",value:function(e){return fetch(e).then(function(t){if(200!==t.status)throw"style at url:"+e+" not found.";t.body().then(function(e){var t=document.createElement("style");t.textContent=e,document.head.appendChild(t)})})}}]),e}();n["default"]=o},{}],3:[function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(n,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),l=e("../models/BookCard"),u=i(l),c=e("../views/Button"),d=i(c),h=e("./Controller"),p=i(h),f=function(e){function t(){r(this,t);var e=o(this,Object.getPrototypeOf(t).call(this));return e.sideNav=document.querySelector(".side-nav"),e.sideNavContent=e.sideNav.querySelector(".side-nav_content"),e.sideNav.addEventListener("click",e.closeSideNav.bind(e)),e.sideNavContent.addEventListener("click",function(e){return e.stopPropagation()}),e.navToBooksButton=new d["default"](document.querySelector(".side-nav_nav-to-books")),e.navToBooksButton.element.addEventListener("click",e.navToBooks.bind(e)),e.navToPortfolioButton=new d["default"](document.querySelector(".side-nav_nav-to-portfolio")),e.navToPortfolioButton.element.addEventListener("click",e.navToPortfolio.bind(e)),e.books=[{id:1,title:"Wizard: The Life And Times of Nikola Tesla",author:"Marc J. Seifer",image_url:"http://ecx.images-amazon.com/images/I/51swx1Gl%2BML._SX323_BO1,204,203,200_.jpg",description:"Nikola Tesla (1856-1943), credited as the inspiration for radio, robots, and even radar, has been called the patron saint of modern electricity. Based on original material and previously unavailable documents, this acclaimed book is the definitive biography of the man considered by many to be the founding father of modern electrical technology. Among Tesla's creations were the channeling of alternating current, fluorescent and neon lighting, wireless telegraphy, and the giant turbines that harnessed the power of Niagara Falls."},{id:2,title:"Jean Moulin",author:"Jean-Pierre Azema",image_url:"http://ecx.images-amazon.com/images/I/41tTzS1Ts%2BL._SX304_BO1,204,203,200_.jpg",description:"Le Jean Moulin d'Azéma fait aujourd'hui référence comme il a recueilli les suffrages de la critique à sa parution. Car, au-delà d'une biographie politique, Jean-Pierre Azéma a su retracer l'histoire de la France libre jusqu'en 1943, de la Résistance intérieure et des relations complexes entre Londres, Washington et Alger. En combinant archives, récits, explications et témoignages, il brosse aussi l'aventure singulière d'un homme à la fois semblable à tant de ses contemporains et dont l'entreprise le hisse jusqu'à incarner le héros de la Résistance pour plusieurs générations de Français. Jean-Pierre Azéma, professeur à Sciences-Po, a notamment publié De Munich à la Libération, L'Année 1940 et Vichy."},{id:3,title:"Des Gens Tres Bien",author:"Alexande Jardin",image_url:"http://ecx.images-amazon.com/images/I/515raxjXnqL._SX307_BO1,204,203,200_.jpg",description:"Tandis que mon père s'endort peu à peu contre moi, je lui parle une dernière fois : Plus tard, tu ne pourras pas vivre avec le secret des Jardin. Il te tuera... Tu feras un livre, Le Nain jaune, pour le camoufler. Au même âge que toi, j'en ferai un, Des gens très bien, pour l'exposer. Et je vivrai la dernière partie de ta vie... La mienne. Dors mon petit papa, dors... Ce livre aurait pu s'appeler \"fini de rire\". C'est le carnet de bord de ma lente lucidité."},{id:4,title:"The Autobiography of Benjamin Franklin",author:"Benjamin Franklin",image_url:"http://ecx.images-amazon.com/images/I/51MxjDM80-L._SX310_BO1,204,203,200_.jpg",description:"Blessed with enormous talents and the energy and ambition to go with them, Franklin was a statesman, author, inventor, printer, and scientist."},{id:5,title:"Security Analysis: Principles and Techniques",author:"Benjamin Graham",image_url:"http://ecx.images-amazon.com/images/I/51yJzPq3npL._SX309_BO1,204,203,200_.jpg",description:"Benjamin Graham's revolutionary theories have influenced and inspired investors for nearly 70 years. First published in 1934, his Security Analysis is still considered to be the value investing bible for investors of every ilk. Yet, it is the second edition of that book, published in 1940 and long since out of print, that many experts--including Graham protégé Warren Buffet--consider to be the definitive edition. This facsimile reproduction of that seminal work makes available to investors, once again, the original thinking of \"this century's (and perhaps history's) most important thinker on applied portfolio investment.\""}],e}return s(t,e),a(t,[{key:"toggleSideNav",value:function(){this.sideNav.classList.contains("side-nav__visible")?this.closeSideNav():this.showSideNav()}},{key:"closeSideNav",value:function(){var e=this;requestAnimationFrame(function(){e.sideNav.classList.remove("side-nav__visible"),e.sideNavContent.classList.remove("side-nav_content_visible")})}},{key:"showSideNav",value:function(){var e=this;requestAnimationFrame(function(){e.sideNav.classList.add("side-nav__visible"),e.sideNavContent.classList.add("side-nav_content_visible")})}},{key:"navToBooks",value:function(){this.closeSideNav(),document.querySelector(".books-container").classList.add("books-container__visible"),this.books.forEach(function(e){var t=new u["default"](e.id,e.title,e.description,e.image_url);t.render()})}},{key:"navToPortfolio",value:function(){}}]),t}(p["default"]);n["default"]=f},{"../models/BookCard":5,"../views/Button":6,"./Controller":2}],4:[function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}var r=e("./controllers/AppController"),o=i(r);new o["default"]},{"./controllers/AppController":1}],5:[function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),o=function(){function e(t){var n=arguments.length<=1||void 0===arguments[1]?"title":arguments[1],r=arguments.length<=2||void 0===arguments[2]?"description":arguments[2],o=arguments[3];if(i(this,e),null==t)throw"missing id";this.id=t,this.title=n,this.description=r,this.imageUrl=o}return r(e,[{key:"render",value:function(){this.element=document.createElement("section"),this.element.classList.add("book-card","card-"+this.id),this.element.innerHTML=this.template,document.querySelector(".books-container").appendChild(this.element),console.log(this)}},{key:"template",get:function(){return['<div class="card_inner">','<div class="card_title-inner">','<h1 class="card_title">'+this.title+"</h1>","</div>",'<figure class="card_figure">','<img class="card_image" src="'+this.imageUrl+'" />',"</figure>",'<div class="card_description-inner">','<p class="card_description">'+this.description+"</p>","</div>","</div>"].join("")}}]),e}();n["default"]=o},{}],6:[function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),s=e("./MaterialRipple"),a=i(s),l=function(){function e(t){if(r(this,e),this.element=t,this.element.classList.contains(e.CssClasses_.RIPPLE_EFFECT)){var n=document.createElement("span");n.classList.add(e.CssClasses_.RIPPLE_CONTAINER),this.rippleElement_=document.createElement("span"),this.rippleElement_.classList.add(e.CssClasses_.RIPPLE),n.appendChild(this.rippleElement_),this.element.appendChild(n),this.ripple=new a["default"](this.element)}}return o(e,null,[{key:"CssClasses_",get:function(){return{RIPPLE_EFFECT:"ripple-effect",RIPPLE_CONTAINER:"ripple-container",RIPPLE:"ripple"}}}]),e}();n["default"]=l},{"./MaterialRipple":7}],7:[function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),o=function(){function e(t){i(this,e),this.element_=t,this.init()}return r(e,[{key:"downHandler_",value:function(t){if(!this.rippleElement_.style.width&&!this.rippleElement_.style.height){var n=this.element_.getBoundingClientRect();this.boundHeight=n.height,this.boundWidth=n.width,this.rippleSize_=2*Math.sqrt(n.width*n.width+n.height*n.height)+2,this.rippleElement_.style.width=this.rippleSize_+"px",this.rippleElement_.style.height=this.rippleSize_+"px"}if(this.rippleElement_.classList.add(e.CssClasses_.IS_VISIBLE),"mousedown"===t.type&&this.ignoringMouseDown_)this.ignoringMouseDown_=!1;else{"touchstart"===t.type&&(this.ignoringMouseDown_=!0);var i=this.getFrameCount();if(i>0)return;this.setFrameCount(1);var r=t.currentTarget.getBoundingClientRect(),o=void 0,s=void 0;if(0===t.clientX&&0===t.clientY)o=Math.round(r.width/2),s=Math.round(r.height/2);else{var a=t.clientX?t.clientX:t.touches[0].clientX,l=t.clientY?t.clientY:t.touches[0].clientY;o=Math.round(a-r.left),s=Math.round(l-r.top)}this.setRippleXY(o,s),this.setRippleStyles(!0),window.requestAnimationFrame(this.animFrameHandler.bind(this))}}},{key:"upHandler_",value:function(t){var n=this;t&&2!==t.detail&&this.rippleElement_.classList.remove(e.CssClasses_.IS_VISIBLE),requestAnimationFrame(function(){n.rippleElement_.classList.remove(e.CssClasses_.IS_VISIBLE)})}},{key:"init",value:function(){this.element_&&(this.rippleElement_=this.element_.querySelector("."+e.CssClasses_.RIPPLE),this.frameCount_=0,this.rippleSize_=0,this.x_=0,this.y_=0,this.ignoringMouseDown_=!1,this.boundDownHandler=this.downHandler_.bind(this),this.element_.addEventListener("mousedown",this.boundDownHandler),this.element_.addEventListener("touchstart",this.boundDownHandler),this.boundUpHandler=this.upHandler_.bind(this),this.element_.addEventListener("mouseup",this.boundUpHandler),this.element_.addEventListener("mouseleave",this.boundUpHandler),this.element_.addEventListener("touchend",this.boundUpHandler),this.element_.addEventListener("blur",this.boundUpHandler),this.getFrameCount=function(){return this.frameCount_},this.setFrameCount=function(e){this.frameCount_=e},this.getRippleElement=function(){return this.rippleElement_},this.setRippleXY=function(e,t){this.x_=e,this.y_=t},this.setRippleStyles=function(t){if(null!==this.rippleElement_){var n=void 0,i=void 0,r="translate("+this.x_+"px, "+this.y_+"px)";t?(n=e.Constant_.INITIAL_SCALE,i=e.Constant_.INITIAL_SIZE):(n=e.Constant_.FINAL_SCALE,i=this.rippleSize_+"px");var o="translate(-50%, -50%) "+r+n;this.rippleElement_.style.webkitTransform=o,this.rippleElement_.style.msTransform=o,this.rippleElement_.style.transform=o,t?this.rippleElement_.classList.remove(e.CssClasses_.IS_ANIMATING):this.rippleElement_.classList.add(e.CssClasses_.IS_ANIMATING)}this.animFrameHandler=function(){this.frameCount_-- >0?window.requestAnimationFrame(this.animFrameHandler.bind(this)):this.setRippleStyles(!1)}})}},{key:"mdlDowngrade_",value:function(){this.element_.removeEventListener("mousedown",this.boundDownHandler),this.element_.removeEventListener("touchstart",this.boundDownHandler),this.element_.removeEventListener("mouseup",this.boundUpHandler),this.element_.removeEventListener("mouseleave",this.boundUpHandler),this.element_.removeEventListener("touchend",this.boundUpHandler),this.element_.removeEventListener("blur",this.boundUpHandler)}}],[{key:"Constant_",get:function(){return{INITIAL_SCALE:"scale(0.0001, 0.0001)",INITIAL_SIZE:"1px",INITIAL_OPACITY:"0.4",FINAL_OPACITY:"0",FINAL_SCALE:""}}},{key:"CssClasses_",get:function(){return{RIPPLE:"ripple",IS_ANIMATING:"is-animating",IS_VISIBLE:"is-visible"}}}]),e}();n["default"]=o},{}]},{},[4]);