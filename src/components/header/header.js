import './header.css';
import BaseComponent from '../../utils/base-component';
import logoImage from '../../assets/images/logo.webp';

class Header extends BaseComponent {
  constructor() {
    super({
      tagName: 'header',
      className: 'header',
    });
    this.wrapper = new BaseComponent({
      className: 'wrapper header__wrapper',
    });
    this.logoContainer = new BaseComponent({
      className: 'logo-container',
    });
    this.logo = new BaseComponent({
      tagName: 'a',
      className: 'logo',
    });
    this.logoImage = new BaseComponent({
      tagName: 'img',
      className: 'logo__image',
      attributes: { alt: 'Eldritch Horror', src: logoImage },
    });
  }

  render() {
    this.appendToDom(this.wrapper.node);
    this.wrapper.appendToDom(this.logoContainer.node);
    this.logoContainer.appendToDom(this.logo.node);
    this.logo.appendToDom(this.logoImage.node);
  }
}

export default Header;
