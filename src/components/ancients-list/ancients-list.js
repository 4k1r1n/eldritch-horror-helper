import './ancients-list.css';
import state from '../../state';
import BaseComponent from '../../utils/base-component';
import AncientCard from '../ancient-card/ancient-card';
import ancientsData from '../../data/ancients';

class AncientsList extends BaseComponent {
  constructor(onBackgroundChange, onAncientChange) {
    super({
      tagName: 'ul',
      className: 'ancients__list',
    });
    this.state = state;
    this.activeCard = null;
    this.onBackgroundChange = onBackgroundChange;
    this.onAncientChange = onAncientChange;
  }

  render() {
    ancientsData.forEach((ancient, index) => {
      const ancientCard = new AncientCard(ancient, index, (selectedAncient) => {
        this.state.setAncient = selectedAncient;
        if (this.activeCard) {
          this.activeCard.classList.remove('active');
        }
        this.activeCard = ancientCard.node;
        this.onAncientChange(selectedAncient);
      });
      this.appendToDom(ancientCard.node);
      ancientCard.node.addEventListener('transitionend', () => {
        this.onBackgroundChange();
      });
    });
  }
}

export default AncientsList;
