import './ancients-list.css';
import state from '../../state';
import BaseComponent from '../../utils/base-component';
import AncientCard from '../ancient-card/ancient-card';
import ancientsData from '../../data/ancients';

class AncientsList extends BaseComponent {
  constructor() {
    super({
      tagName: 'ul',
      className: 'ancients-list',
    });
    this.state = state;
    this.activeCard = null;
  }

  render() {
    ancientsData.forEach((ancient, index) => {
      const ancientCard = new AncientCard(ancient, index, (selectedAncient) => {
        this.state.setAncient = selectedAncient;
        if (this.activeCard) {
          this.activeCard.classList.remove('active');
        }
        this.activeCard = ancientCard.node;
      });
      this.appendToDom(ancientCard.node);
    });
  }
}

export default AncientsList;
