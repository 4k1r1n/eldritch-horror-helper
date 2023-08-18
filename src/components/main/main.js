import './main.css';
import state from '../../state';
import BaseComponent from '../../utils/base-component';
import Settings from '../settings/settings';
import Tracker from '../tracker/tracker';
import Deck from '../deck/deck';
import backgrounds from '../../constants/backgrounds';
import homeBackground from '../../assets/images/backgrounds/Home.webp';

class Main extends BaseComponent {
  static state = state;

  constructor() {
    super({
      tagName: 'main',
      className: 'main',
    });
    this.wrapper = new BaseComponent({
      className: 'wrapper main__wrapper',
    });
    this.game = new BaseComponent({
      className: 'game',
    });
    this.buttonContainer = new BaseComponent({
      className: 'game__button',
    });
    this.button = new BaseComponent({
      tagName: 'button',
      className: 'button button_shadow',
      content: 'Новая игра',
    });
    this.button.node.addEventListener('click', () => {
      this.wrapper.destroyChildren();
      this.game.destroyChildren();
      this.state.setAncient = null;
      this.state.setDifficulty = null;
      this.state.setDeck = null;
      this.state.setStage = 0;
      this.render();
    });
    this.state = state;
  }

  render() {
    const tracker = new Tracker(this.state);
    const settings = new Settings(
      () => {
        const ancient = this.state.currentAncient;
        const difficulty = this.state.currentDifficulty;
        if (difficulty && ancient) {
          this.wrapper.destroyChildren();
          this.game.destroyChildren();
          this.renderTracker(tracker);
          this.renderDeck(ancient, difficulty, tracker);
          this.buttonContainer.appendToDom(this.button.node);
          this.game.appendToDom(this.buttonContainer.node);
        }
      },
      () => {
        this.constructor.setBackground();
      },
    );
    settings.render();
    this.appendToDom(this.wrapper.node);
    this.wrapper.appendToDom(settings.node);
    this.constructor.setBackground();
  }

  renderTracker(tracker) {
    tracker.render();
    this.game.appendToDom(tracker.node);
    this.wrapper.appendToDom(this.game.node);
  }

  renderDeck(currentAncient, currentDifficulty, tracker) {
    const deck = new Deck((card) => {
      tracker.update(card);
    });
    const miniDecks = deck.constructDeck(currentAncient, currentDifficulty.id);
    const flatMiniDecks = miniDecks.flat().reverse();
    this.state.setDeck = flatMiniDecks;
    deck.render();
    this.game.appendToDom(deck.node);
  }

  static setBackground() {
    const ancient = this.state.currentAncient;
    if (ancient) {
      const img = new Image();
      img.src = backgrounds[ancient.id];
      img.onload = () => {
        document.body.style.backgroundImage = `url(${img.src})`;
      };
    } else {
      document.body.style.backgroundImage = `url(${homeBackground})`;
    }
  }
}

export default Main;
