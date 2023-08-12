import './footer.css';
import BaseComponent from '../../utils/base-component';

class Footer extends BaseComponent {
  constructor() {
    super({
      tagName: 'footer',
      className: 'footer',
    });
    this.wrapper = new BaseComponent({
      className: 'wrapper footer__wrapper',
    });
    this.copyright = new BaseComponent({
      className: 'footer-copyright',
    });
    this.linkGithub = new BaseComponent({
      tagName: 'a',
      className: 'link link_github',
      attributes: { target: '_blank', href: 'https://github.com/4k1r1n' },
    });
    this.year = new BaseComponent({
      tagName: 'span',
      className: 'footer-copyright__year',
      content: '2022',
    });
    this.linkRs = new BaseComponent({
      tagName: 'a',
      className: 'link link_rs',
      attributes: { target: '_blank', href: 'https://rs.school/js/' },
    });
  }

  render() {
    this.appendToDom(this.wrapper.node);
    this.wrapper.appendToDom(this.copyright.node);
    this.copyright.appendToDom(this.linkGithub.node, this.year.node, this.linkRs.node);
  }
}

export default Footer;
