'use strict';

export default class BookCard {
  constructor({id, title = 'title', description = 'description'}) {
    if (id == null) {
      throw 'missing id';
    }

    this.id = id;
    this.title = title;
    this.description = description;
  }

  get imageUrl() {
    return `images/${this.id}.png`;
  }

  get template() {
    return [
      `<div class="card_inner">`,
        `<div class="card_title"`,
          `<h1>${this.title}</h1>`,
        `</div>`,
        `<div class="card_image"`,
          `<img src="${this.imageUrl}" />`,
        `</div>`,
        `<div class="card_description"`,
          `<p>${this.description}</p>`,
        `</div>`,
      `</div>`
    ].join('');
  }

  render() {
    this.element = document.createElement('section');
    this.element.classList.add('card', `card-${this.id}`);
    this.element.innerHTML = this.template;
    document.body.appendChild(this.element);
    console.log(this);
  }
}
