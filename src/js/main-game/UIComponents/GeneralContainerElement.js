class GeneralContainerElement {
    constructor(HTMLTag, id) {
        this.element = document.createElement(HTMLTag);
        this.element.id = id;
        this.childrenList = [];
        this.descendantList = [];
    }

    getHTML() {
        return this.element;
    }
    
    addHTML(value) {
        const span = document.createElement('span');
        span.innerHTML = value;
        this.element.append(span);
    }

    updateHTML(value) {
        this.element.innerHTML = value;
    }

    addStyles(...rest) {
        if (rest.length > 0) {
            rest.forEach((style) => this.element.classList.add(style));
        }
    }

    removeStyle(style) {
        this.element.classList.remove(style);
    }

    addAttribute(attribute, value) {
        this.element.setAttribute(attribute, value);
    }

    getAttributeValue(attribute) {
        return this.element.getAttribute(attribute);
    }

    addChildren(...rest) { 
        if (rest.length > 0) { 
            rest.forEach((child) => {
                this.childrenList.push(child);
                if (child.hasOwnProperty('descendantList')) {
                    this.descendantList.push(child);
                    this.descendantList.push(child.descendantList);
                } else {
                    this.descendantList.push(child);
                }
                    this.element.append(child.getHTML());
            });
        }
    }

    getDescendantsByAttribute(attribute) {
        if (this.descendantList.length > 0) {
            function flat(array) {
                return array.reduce((acc, val) => Array.isArray(val) ? acc.concat(flat(val)) : acc.concat(val), []);
            }
            return flat(this.descendantList).filter((item) => item.getHTML().hasAttribute(attribute)); 
        }  
    }

    getDescendantById(id) { 
        if (this.descendantList.length > 0) {
            function flat(array) {
                return array.reduce((acc, val) => Array.isArray(val) ? acc.concat(flat(val)) : acc.concat(val), []);
            }
            return flat(this.descendantList).filter((item) => item.getHTML().id === id)[0]; 
        } 
    }
}

export default GeneralContainerElement;