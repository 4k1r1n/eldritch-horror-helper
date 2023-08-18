import './tracker.css';
import BaseComponent from '../../utils/base-component';
import { stagesNumbers } from '../../constants/constants';

class Tracker extends BaseComponent {
  constructor(state) {
    super({
      className: 'game__tracker tracker',
    });
    this.content = new BaseComponent({
      className: 'tracker__content',
    });
    this.state = state;
    this.cardsColorsCounters = [];
  }

  render() {
    const ancient = this.state.currentAncient;
    const difficulty = this.state.currentDifficulty;
    const title = new BaseComponent({
      tagName: 'h3',
      className: 'title',
      content: 'Трекер',
    });
    const currentSettings = new BaseComponent({
      className: 'tracker__current-settings current-settings',
    });
    const currentAncient = new BaseComponent({
      tagName: 'span',
      className: 'current-settings__ancient',
      content: `Древний: ${ancient.name}`,
    });
    const currentDifficulty = new BaseComponent({
      tagName: 'span',
      className: 'current-settings__difficulty',
      content: `Уровень сложности: ${difficulty.name}`,
    });
    currentSettings.appendToDom(currentAncient.node, currentDifficulty.node);
    this.content.appendToDom(title.node);
    this.renderStages(ancient);
    this.appendToDom(currentSettings.node, this.content.node);
  }

  renderStages(currentAncient) {
    const stages = new BaseComponent({
      className: 'tracker__stages',
    });
    for (let i = 0; i < 3; i += 1) {
      const stageContainter = new BaseComponent({
        className: 'stage',
      });
      const stageTitle = new BaseComponent({
        tagName: 'span',
        className: 'stage__title',
        content: `Этап ${stagesNumbers[i]}`,
      });
      const cardsCounter = new BaseComponent({
        className: 'stage__counter counter',
      });
      const greenCardsCounter = new BaseComponent({
        className: 'counter__item counter__item_green',
        content: `${currentAncient.cardsCount[i].green}`,
      });
      const yellowCardsCounter = new BaseComponent({
        className: 'counter__item counter__item_yellow',
        content: `${currentAncient.cardsCount[i].yellow}`,
      });
      const blueCardsCounter = new BaseComponent({
        className: 'counter__item counter__item_blue',
        content: `${currentAncient.cardsCount[i].blue}`,
      });
      stages.appendToDom(stageContainter.node);
      stageContainter.appendToDom(stageTitle.node, cardsCounter.node);
      cardsCounter.appendToDom(
        greenCardsCounter.node,
        yellowCardsCounter.node,
        blueCardsCounter.node,
      );
      this.cardsColorsCounters.push({
        green: greenCardsCounter.node,
        yellow: yellowCardsCounter.node,
        blue: blueCardsCounter.node,
      });
      this.content.appendToDom(stages.node);
    }
  }

  update(cardInfo) {
    let stage = this.state.currentStage;
    const greenCounters = this.cardsColorsCounters.map((counter) => counter.green);
    const yellowCounters = this.cardsColorsCounters.map((counter) => counter.yellow);
    const blueCounters = this.cardsColorsCounters.map((counter) => counter.blue);
    if (
      greenCounters[stage].textContent === '0' &&
      blueCounters[stage].textContent === '0' &&
      yellowCounters[stage].textContent === '0'
    ) {
      stage += 1;
      this.state.setStage = stage;
    }
    switch (cardInfo.color) {
      case 'green':
        greenCounters[stage].textContent -= 1;
        break;
      case 'blue':
        blueCounters[stage].textContent -= 1;
        break;
      default:
        yellowCounters[stage].textContent -= 1;
        break;
    }
  }
}

export default Tracker;
