import './settings.css';
import BaseComponent from '../../utils/base-component';
import AncientsList from '../ancients-list/ancients-list';
import state from '../../state';

class Settings extends BaseComponent {
  constructor() {
    super({
      className: 'settings',
    });
    this.state = state;
    this.wrapper = new BaseComponent({
      className: 'settings__wrapper',
    });
    this.title = new BaseComponent({
      tagName: 'h2',
      className: 'settings__title',
    });
    this.buttons = new BaseComponent({
      className: 'buttons',
    });
    this.buttonNext = new BaseComponent({
      tagName: 'button',
      className: 'button button_shadow',
      content: 'Далее',
    });
    this.buttonSuffle = new BaseComponent({
      tagName: 'button',
      className: 'button button_shadow',
      content: 'Замешать',
    });
    this.buttonNext.node.addEventListener('click', () => {
      const ancient = this.state.currentAncient;
      if (ancient) {
        this.wrapper.destroyChildren();
        this.renderDifficultiesSettings();
      }
    });
    this.buttonSuffle.node.addEventListener('click', () => {
      const difficulty = this.state.currentDifficulty;
      if (difficulty) {
        this.destroy();
        this.onShuffleClick();
      }
    });
    this.ancientsList = new AncientsList();
  }

  renderAncientsSettings() {
    this.title.setContent('Выберите Древнего');
    this.ancientsList.render();
    this.wrapper.appendToDom(this.title.node, this.ancientsList.node, this.buttonNext.node);
    this.appendToDom(this.wrapper.node);
  }
}

export default Settings;
