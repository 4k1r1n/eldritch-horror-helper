class BaseComponent {
  constructor({ tagName = 'div', className, content, attributes }) {
    this.node = document.createElement(tagName);
    if (className) {
      this.node.className = className;
    }
    if (content) {
      this.node.textContent = content;
    }
    if (attributes) {
      Object.entries(attributes).forEach(([key, value]) => this.node.setAttribute(key, value));
    }
  }

  setAttribute(attribute, value) {
    this.node.setAttribute(attribute, value);
  }

  setContent(content) {
    this.node.textContent = content;
  }

  addClass(className) {
    this.node.classList.add(className);
  }

  appendToDom(...elements) {
    elements.forEach((el) => this.node.append(el));
  }

  destroyChildren() {
    this.node.replaceChildren();
  }

  destroy() {
    this.node.remove();
  }
}

export default BaseComponent;
