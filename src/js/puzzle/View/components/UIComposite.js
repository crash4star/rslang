import UIComponent from './UIComponent';

class UIComposite extends UIComponent {
  constructor(type, id, text, attributes, styles) {
    super(type, id, text, attributes, styles);
    this.children = [];
  }

  add(...child) {
    child.forEach((element) => {
      this.children.push(element);
    });
  }

  removeChild(child) {
    this.getChild(child).removeElement();
    this.children = this.children.filter((element) => element.getHtml().id !== child);
  }

  removeChildren() {
    this.children.forEach((child) => {
      this.removeChild(child.getHtml().id);
    });
  }

  getChild(id) {
    return this.children.find((element) => element.getHtml().id === id);
  }

  getHtml() {
    const items = this.children.map((element) => element.getHtml());
    this.element.append(...items);
    return this.element;
  }
}

export default UIComposite;
