import './main.css';
import state from '../../state';
import BaseComponent from '../../utils/base-component';
import backgrounds from '../../constants/backgrounds';
import homeBackground from '../../assets/images/backgrounds/Home.webp';

class Main extends BaseComponent {
  static state = state;

  constructor() {
    super({
      tagName: 'main',
      className: 'main',
    });
    this.state = state;
    this.wrapper = new BaseComponent({
      className: 'wrapper main__wrapper',
    });
    this.game = new BaseComponent({
      className: 'game',
    });
    this.buttonWrapper = new BaseComponent({
      className: 'game__button',
    });
    this.buttonRetry = new BaseComponent({
      tagName: 'button',
      className: 'button button_shadow',
      content: 'Начать заново',
    });
  }

  render() {
    this.constructor.setBackground();
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
