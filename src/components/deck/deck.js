import './deck.css';
import BaseComponent from '../../utils/base-component';
import shuffle from '../../utils/shuffle';
import cardsData from '../../data/mythic-cards';
import Card from '../card/card';
import state from '../../state';

class Deck extends BaseComponent {
  constructor() {
    super({
      className: 'deck',
    });
    this.state = state;
  }

  render() {
    const deck = this.state.currentDeck;
    for (let i = 0; i < deck.length; i += 1) {
      const card = new Card(deck[i]);
      card.render();
      card.node.style.right = `${i * 1}px`;
      card.node.style.bottom = `${i * 1}px`;
      this.appendToDom(card.node);
    }
  }

  filterCards(difficulty, cards) {
    const filteredCardsByColor = Object.keys(cards).map((color) => {
      const shuffleCards = shuffle(cards[color]);
      const filteredCardsByDifficulty = this.constructor.filterCardsByDifficulty(
        difficulty,
        shuffleCards,
      );
      return { [color]: filteredCardsByDifficulty };
    });
    return Object.assign({}, ...filteredCardsByColor);
  }

  static filterCardsByDifficulty(difficulty, cards) {
    let filteredCards;
    switch (difficulty) {
      case 'veryEasy':
        filteredCards = cards
          .filter((card) => card.difficulty !== 'hard')
          .sort((a, b) => (a.difficulty > b.difficulty ? 1 : -1));
        break;
      case 'nightmare':
        filteredCards = cards
          .filter((card) => card.difficulty !== 'easy')
          .sort((a, b) => (a.difficulty > b.difficulty ? 1 : -1));
        break;
      case 'easy':
        filteredCards = cards.filter((card) => card.difficulty !== 'hard');
        break;
      case 'hard':
        filteredCards = cards.filter((card) => card.difficulty !== 'easy');
        break;
      default:
        filteredCards = cards;
        break;
    }
    return filteredCards;
  }

  static getSumOfCardsForStagesByColors(ancient) {
    const sumOfCards = ancient.cardsCount.reduce(
      (acc, current) => {
        return {
          green: acc.green + current.green,
          yellow: acc.yellow + current.yellow,
          blue: acc.blue + current.blue,
        };
      },
      { green: 0, yellow: 0, blue: 0 },
    );
    return sumOfCards;
  }

  sliceCardSet(cards) {
    const ancient = this.state.currentAncient;
    const stagesColorsSum = this.constructor.getSumOfCardsForStagesByColors(ancient);
    Object.keys(cards).forEach((color) => {
      cards[color].splice(stagesColorsSum[color]);
      shuffle(cards[color]);
    });
    return cards;
  }

  createMiniDeck(number, cards) {
    const miniDeck = [];
    const cardSet = this.sliceCardSet(cards);
    Object.keys(cardSet).forEach((color) => {
      cardSet[color].slice(0, number[color]).forEach((card) => miniDeck.push(card));
    });
    Object.keys(cardSet).forEach((color) => cardSet[color].splice(0, number[color]));
    return shuffle(miniDeck);
  }

  constructDeck(ancient, difficulty) {
    const newCards = JSON.parse(JSON.stringify(cardsData));
    const filteredCards = this.filterCards(difficulty, newCards);
    const fullDeck = [];
    for (let i = 0; i < 3; i += 1) {
      const numberOfCardsForStage = ancient.cardsCount[i];
      fullDeck.push(this.createMiniDeck(numberOfCardsForStage, filteredCards));
    }
    return fullDeck;
  }
}

export default Deck;
