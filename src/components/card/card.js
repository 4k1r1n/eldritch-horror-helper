import './card.css';
import BaseComponent from '../../utils/base-component';
import cardBackground from '../../assets/images/mythic-cards/back.jpg';

class Card extends BaseComponent {
  constructor(cardInfo) {
    super({
      className: 'deck__card card',
    });
    this.cardFaceFront = new BaseComponent({
      tagName: 'img',
      className: 'card__face card__face_front',
    });
    this.cardFaceBack = new BaseComponent({
      tagName: 'img',
      className: 'card__face card__face_back',
    });
    this.cardFaceFront.node.src = cardBackground;
    this.cardFaceBack.node.src = cardInfo.cardFace;
    this.node.addEventListener('click', () => {
      this.addClass('is-flipped');
    });
  }

  render() {
    this.appendToDom(this.cardFaceBack.node, this.cardFaceFront.node);
  }
}

export default Card;
