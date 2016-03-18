'use strict';

import BookCard from '../models/BookCard';
import Controller from './Controller';

export default class SideNavController extends Controller {
  constructor() {
    super()
    this.sideNav = document.querySelector('.side-nav');
    this.sideNavContent = this.sideNav.querySelector('.side-nav_content');

    this.sideNav.addEventListener('click', this.closeSideNav.bind(this));
    this.sideNavContent.addEventListener('click', (e) => e.stopPropagation());

    this.navToBooksButton = document.querySelector('.side-nav_nav-to-books');
    this.navToBooksButton.addEventListener('click', this.navToBooks.bind(this));
    this.navToPortfolioButton = document.querySelector('.side-nav_nav-to-portfolio');
    this.navToPortfolioButton.addEventListener('click', this.navToPortfolio.bind(this));

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
    }];
  }

  toggleSideNav() {
    if (this.sideNav.classList.contains('side-nav__visible')) {
      this.closeSideNav();
    } else {
      this.showSideNav();
    }
  }

  closeSideNav() {
    requestAnimationFrame(() => {
      this.sideNav.classList.remove('side-nav__visible');
      this.sideNavContent.classList.remove('side-nav_content_visible');
    });
  }

  showSideNav() {
    requestAnimationFrame(() => {
      this.sideNav.classList.add('side-nav__visible');
      this.sideNavContent.classList.add('side-nav_content_visible');
    });
  }

  navToBooks() {
    this.closeSideNav();
    // TODO(benoit) so wrong. lets get some adequate MVC...

    document.querySelector('.books-container').classList.add('books-container__visible');

    this.books.forEach(book => {
      let bookCard = new BookCard(book.id, book.title, book.description, book.image_url);
      bookCard.render();
    });
  }

  navToPortfolio() {
    // TODO(benoit)
  }
}
