'use strict';

export default class BookCard {
  constructor(id, title = 'title', description = 'description', imageUrl) {
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

  get template() {
    return [
      `<div class="card_inner">`,
        `<div class="card_title-inner">`,
          `<h1 class="card_title">${this.title}</h1>`,
        `</div>`,
        `<figure class="card_figure">`,
          `<img class="card_image" src="${this.imageUrl}" />`,
        `</figure>`,
        `<div class="card_description-inner">`,
          `<p class="card_description">${this.description}</p>`,
        `</div>`,
      `</div>`
    ].join('');
  }

  render() {
    this.element = document.createElement('section');
    this.element.classList.add('book-card', `card-${this.id}`);
    this.element.innerHTML = this.template;
    document.querySelector('.books-container').appendChild(this.element);
    console.log(this);
  }
}
