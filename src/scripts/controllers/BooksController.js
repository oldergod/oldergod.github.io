'use strict';

import BookCard from '../models/BookCard';
import Controller from './Controller';
import RouterInstance from '../libs/Router';

export default class BooksController extends Controller {
  constructor() {
    super()

    this.container = document.querySelector('.books-container');
    //TODO (benoit) get books from some json
    this.books = [{
      id: 1,
      title: 'Wizard: The Life And Times of Nikola Tesla',
      author: 'Marc J. Seifer',
      image_url: 'http://ecx.images-amazon.com/images/I/51swx1Gl%2BML._SX323_BO1,204,203,200_.jpg',
      description: `Nikola Tesla (1856-1943), credited as the inspiration for radio, robots, and even radar, has been called the patron saint of modern electricity. Based on original material and previously unavailable documents, this acclaimed book is the definitive biography of the man considered by many to be the founding father of modern electrical technology. Among Tesla's creations were the channeling of alternating current, fluorescent and neon lighting, wireless telegraphy, and the giant turbines that harnessed the power of Niagara Falls.`
    }, {
      id: 2,
      title: 'Jean Moulin',
      author: 'Jean-Pierre Azema',
      image_url: 'http://ecx.images-amazon.com/images/I/41tTzS1Ts%2BL._SX304_BO1,204,203,200_.jpg',
      description: `Le Jean Moulin d'Azéma fait aujourd'hui référence comme il a recueilli les suffrages de la critique à sa parution. Car, au-delà d'une biographie politique, Jean-Pierre Azéma a su retracer l'histoire de la France libre jusqu'en 1943, de la Résistance intérieure et des relations complexes entre Londres, Washington et Alger. En combinant archives, récits, explications et témoignages, il brosse aussi l'aventure singulière d'un homme à la fois semblable à tant de ses contemporains et dont l'entreprise le hisse jusqu'à incarner le héros de la Résistance pour plusieurs générations de Français. Jean-Pierre Azéma, professeur à Sciences-Po, a notamment publié De Munich à la Libération, L'Année 1940 et Vichy.`
    }, {
      id: 3,
      title: 'Des Gens Tres Bien',
      author: 'Alexande Jardin',
      image_url: 'http://ecx.images-amazon.com/images/I/515raxjXnqL._SX307_BO1,204,203,200_.jpg',
      description: `Tandis que mon père s'endort peu à peu contre moi, je lui parle une dernière fois : Plus tard, tu ne pourras pas vivre avec le secret des Jardin. Il te tuera... Tu feras un livre, Le Nain jaune, pour le camoufler. Au même âge que toi, j'en ferai un, Des gens très bien, pour l'exposer. Et je vivrai la dernière partie de ta vie... La mienne. Dors mon petit papa, dors... Ce livre aurait pu s'appeler "fini de rire". C'est le carnet de bord de ma lente lucidité.`
    }, {
      id: 4,
      title: 'The Autobiography of Benjamin Franklin',
      author: 'Benjamin Franklin',
      image_url: 'http://ecx.images-amazon.com/images/I/51MxjDM80-L._SX310_BO1,204,203,200_.jpg',
      description: `Blessed with enormous talents and the energy and ambition to go with them, Franklin was a statesman, author, inventor, printer, and scientist.`
    }, {
      id: 5,
      title: 'Security Analysis: Principles and Techniques',
      author: 'Benjamin Graham',
      image_url: 'http://ecx.images-amazon.com/images/I/51yJzPq3npL._SX309_BO1,204,203,200_.jpg',
      description: `Benjamin Graham's revolutionary theories have influenced and inspired investors for nearly 70 years. First published in 1934, his Security Analysis is still considered to be the value investing bible for investors of every ilk. Yet, it is the second edition of that book, published in 1940 and long since out of print, that many experts--including Graham protégé Warren Buffet--consider to be the definitive edition. This facsimile reproduction of that seminal work makes available to investors, once again, the original thinking of "this century's (and perhaps history's) most important thinker on applied portfolio investment."`
    }];
    this.renderedBooks = [];
    // show them - not here ? or use some requestIdleCallback ?
    // eventlistener <= expand cards, links etc.

    this.loadCSS('/styles/freshhood-books.css').then(() => {
      // this.view.classList.remove('hidden');

      RouterInstance().then((router) => {
        router.add('books',
          () => this.show(),
          () => this.hide(),
          () => console.log('update'));
      });
    });
  }

  show() {
    this.container.classList.add('books-container__visible');
    this.fill();
  }
  fill() {
    this.renderedBooks = this.books.map(book => {
      const bookCard = new BookCard(book.id, book.title, book.description, book.image_url);
      bookCard.render();
      return bookCard;
    });
  }
  hide() {
    this.container.classList.remove('books-container__visible');
    this.destroyBookCards();
  }
  update() {
    console.log('update')
  }
  destroyBookCards() {
    this.renderedBooks.forEach(bookCard => bookCard.destroy());
  }
}
