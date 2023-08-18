import './difficulty-levels.css';
import difficulties from '../../data/difficulties';
import BaseComponent from '../../utils/base-component';
import state from '../../state';

class DifficultyLevels extends BaseComponent {
  constructor() {
    super({ className: 'difficulties__levels' });
    this.activeDifficulty = null;
    this.state = state;
  }

  render() {
    Object.values(difficulties).forEach((difficulty, index) => {
      const buttonDifficulty = new BaseComponent({
        tagName: 'button',
        className: 'button button_difficulty',
      });
      const setActiveDifficulty = () => {
        if (this.activeDifficulty) {
          this.activeDifficulty.classList.remove('active');
        }
        this.activeDifficulty = buttonDifficulty.node;
        buttonDifficulty.addClass('active');
        this.state.setDifficulty = difficulties[index];
      };
      buttonDifficulty.node.addEventListener('click', setActiveDifficulty);
      buttonDifficulty.setContent(`${difficulty.name}`);
      this.appendToDom(buttonDifficulty.node);
    });
  }
}

export default DifficultyLevels;
