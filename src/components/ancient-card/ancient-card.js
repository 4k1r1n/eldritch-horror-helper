import './ancient-card.css';
import BaseComponent from '../../utils/base-component';

class AncientCard extends BaseComponent {
  constructor(ancient, index, onAncientChange) {
    super({
      tagName: 'li',
      className: 'ancient-card',
    });
    this.ancientImage = new BaseComponent({
      tagName: 'img',
      className: 'ancient-card__image',
    });
    this.ancient = ancient;
    this.index = index;
    this.ancientImage.setAttribute('src', this.ancient.cardFace);
    this.ancientImage.setAttribute('alt', `${this.ancient.name}`);
    this.setAttribute('data-id', `${this.index}`);
    this.appendToDom(this.ancientImage.node);

    this.node.addEventListener('click', () => {
      onAncientChange(ancient);
      this.addClass('active');
    });
  }
}

export default AncientCard;
