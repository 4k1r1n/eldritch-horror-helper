import './tracker.css';
import BaseComponent from '../../utils/base-component';
import { stagesTitles } from '../../constants/constants';
import state from '../../state';

class Tracker extends BaseComponent {
  constructor() {
    super({
      className: 'tracker',
    });
    this.state = state;
    this.cardsColorsCounters = [];
  }

  render() {
    const ancient = this.state.currentAncient;
    const title = new BaseComponent({
      className: 'tracker__title',
      content: 'Трекер',
    });
    this.appendToDom(title.node);
    for (let i = 0; i < 3; i += 1) {
      const stageContainter = new BaseComponent({
        className: 'tracker__stage stage',
      });
      const stageTitle = new BaseComponent({
        className: 'stage__title',
        content: `${stagesTitles[i]} этап`,
      });
      const cardsCounter = new BaseComponent({
        className: 'stage__counter counter',
      });
      const greenCardsCounter = new BaseComponent({
        className: 'counter__item counter__item_green',
        content: `${ancient.cardsCount[i].green}`,
      });
      const yellowCardsCounter = new BaseComponent({
        className: 'counter__item counter__item_yellow',
        content: `${ancient.cardsCount[i].yellow}`,
      });
      const blueCardsCounter = new BaseComponent({
        className: 'counter__item counter__item_blue',
        content: `${ancient.cardsCount[i].blue}`,
      });
      this.appendToDom(stageContainter.node);
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
