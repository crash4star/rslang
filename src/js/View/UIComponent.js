class UIComponent {
  constructor(type, id = '', text = '', attributes = {}, styles = '') {
    this.createComponent(type, id);
    if (text.length) this.setTextValue(type, text);
    if (Object.keys(attributes).length) this.setAttributesToComponent(attributes);
    if (styles.length) this.addStylesToComponent(styles);
  }

  createComponent(type, id = '') {
    this.element = document.createElement(type);
    if (id.length) {
      this.element.id = id;
    }
  }

  setAttributesToComponent(attributes) {
    Object.keys(attributes).forEach((el) => {
      this.element.setAttribute(`${el}`, `${attributes[el]}`);
    });
  }

  addStylesToComponent(styles) {
    this.element.className = styles;
  }

  setTextValue(type, text) {
    if (type === 'button') {
      this.element.innerHTML = text;
    } else if (type === 'input') {
      this.element.placeholder = text;
    } else {
      this.element.textContent = text;
    }
  }

  getHtml() {
    return this.element;
  }
}

export default UIComponent;
