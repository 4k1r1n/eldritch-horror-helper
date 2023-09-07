import './settings.css';
import BaseComponent from '../../utils/base-component';
import AncientsList from '../ancients-list/ancients-list';
import DifficultyLevels from '../difficulty-levels/difficulty-levels';

class Settings extends BaseComponent {
  constructor(onApplyClick, onBackgroundChange) {
    super({
      className: 'main__settings settings',
    });
    this.wrapper = new BaseComponent({
      className: 'settings__wrapper',
    });
    this.ancients = new BaseComponent({
      className: 'settings__content ancients',
    });
    this.ancientsContent = new BaseComponent({
      className: 'ancients__content',
    });
    this.difficulties = new BaseComponent({
      className: 'settings__content difficulties',
    });
    this.difficultiesContent = new BaseComponent({
      className: 'difficulties__content',
    });
    this.buttonContainer = new BaseComponent({
      className: 'settings__button',
    });
    this.button = new BaseComponent({
      tagName: 'button',
      className: 'button button_shadow',
      content: 'Замешать',
    });
    this.selectedAncient = new BaseComponent({
      tagName: 'span',
      className: 'ancients__text',
      content: 'Не выбран',
    });
    this.onApplyClick = onApplyClick;
    this.button.node.addEventListener('click', () => {
      this.onApplyClick();
    });
    this.ancientsList = new AncientsList(onBackgroundChange, this.setSelectedAncient.bind(this));
    this.difficultyLevels = new DifficultyLevels();
  }

  render() {
    this.renderAncientsSettings();
    this.renderDifficultiesSettings();
  }

  renderAncientsSettings() {
    const title = new BaseComponent({
      tagName: 'h3',
      className: 'title',
    });
    title.setContent('Древний');
    this.ancientsList.render();
    this.ancientsContent.appendToDom(this.selectedAncient.node, this.ancientsList.node);
    this.ancients.appendToDom(title.node, this.ancientsContent.node);
    this.wrapper.appendToDom(this.ancients.node);
    this.appendToDom(this.wrapper.node);
  }

  renderDifficultiesSettings() {
    const title = new BaseComponent({
      tagName: 'h3',
      className: 'title',
    });
    title.setContent('Уровень сложности');
    this.difficultyLevels.render();
    this.buttonContainer.appendToDom(this.button.node);
    this.difficultiesContent.appendToDom(this.difficultyLevels.node, this.buttonContainer.node);
    this.difficulties.appendToDom(title.node, this.difficultiesContent.node);
    this.wrapper.appendToDom(this.difficulties.node);
    this.appendToDom(this.wrapper.node);
  }

  setSelectedAncient(selectedAncient) {
    this.selectedAncient.setContent(selectedAncient.name);
  }
}

export default Settings;
