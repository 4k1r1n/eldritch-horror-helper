import './card.css';
import BaseComponent from '../../utils/base-component';
import cardBackground from '../../assets/images/mythic-cards/back.jpg';

class Card extends BaseComponent {
  static prevCard = null;

  constructor(cardInfo, onCardClick) {
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
    this.cardInfo = cardInfo;
    this.onCardClick = onCardClick;
    this.cardFaceFront.node.src = cardBackground;
    this.cardFaceBack.node.src = cardInfo.cardFace;
    this.isAnimating = false;
    this.addListener();
    Card.prevCard = null;
  }

  render() {
    this.appendToDom(this.cardFaceBack.node, this.cardFaceFront.node);
  }

  addListener() {
    this.clickHandler = () => {
      if (Card.prevCard && Card.prevCard.isAnimating) {
        return;
      }
      this.addClass('is-flipped');
      this.node.addEventListener('transitionend', this.handleTransitionEnd);
      Card.prevCard = this;
      this.isAnimating = true;
    };
    this.handleTransitionEnd = () => {
      this.onCardClick(this.cardInfo);
      this.node.removeEventListener('transitionend', this.handleTransitionEnd);
      this.node.removeEventListener('click', this.clickHandler);
      this.isAnimating = false;
    };
    this.node.addEventListener('click', this.clickHandler);
  }
}

export default Card;
