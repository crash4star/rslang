class Element {
    constructor(options) {
        this.node = options.node;
        this.id = options.id;
        this.cssStyle = options.cssStyle;
        this.textContent = options.textContent;
    }

    create() {
        const el = document.createElement(this.node);
        el.setAttribute('id', this.id || '');
        el.className = this.cssStyle || '';
        el.textContent = this.textContent;

        return el;
    }

    delete() {
        if (this.cssStyle === undefined) {
            const el = document.querySelector(`#${this.id}`);
            el.remove();
        } else {
            const el = document.querySelector(`.${this.cssStyle}`);
            el.remove();
        }
    } 
}


export default Element;