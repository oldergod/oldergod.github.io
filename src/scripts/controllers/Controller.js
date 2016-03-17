'use strict';

export default class Controller {
  loadScript(url) {
    return new Promise((resolve, reject) => {
      var script = document.createElement('script');
      script.async = true;
      script.src = url;

      script.onload = resolve;
      script.onerror = reject;

      document.head.appendChild(script);
    });
  }

  loadCSS(url) {
    return fetch(url).then(response => {
      if (response.status === 200) {
        response.body().then(body => {
          var style = document.createElement('style');
          style.textContent = body;
          document.head.appendChild(style);
        });
      } else {
        throw `style at url:${url} not found.`;
      }
    });
  }
}
