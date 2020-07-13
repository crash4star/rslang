class GeneralElement {
    constructor(HTMLTag, id) {
      this.element = document.createElement(HTMLTag);
      this.element.id = id;
    }

    getHTML() {
        return this.element;
    }

    addStyles(...rest) {
        if (rest.length > 0) {
            rest.forEach((style) => this.element.classList.add(style));
        }
    }

    addAttribute(attribute, value) {
        this.element.setAttribute(attribute, value);
    }

    getAttributeValue(attribute) {
        return this.element.getAttribute(attribute);
    }

    removeStyle(style) {
        this.element.classList.remove(style);
    }
}

export default GeneralElement;