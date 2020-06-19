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

  remove(child) {
    this.children = this.children.filter((element) => element !== child);
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
