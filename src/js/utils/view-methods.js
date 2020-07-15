class ViewMethods {
  constructor() {
    this.app = this.getElement('#root');
  }

  createElement(options) {
    const el = document.createElement(options.node);
    el.className = options.styleName || '';
    el.setAttribute('id', options.id || '');
    return el || this.app;
  }

  getElement(selector) {
    const el = document.querySelector(selector);
    return el || this.app;
  }

  getAllElements(selector) {
    const el = document.querySelectorAll(selector);
    return el || this.app;
  }
}

export default ViewMethods;
