import Element from './main-element';

class HealthPointBar extends Element {
    constructor(options, amount) {
        super(options);
        this.amount = amount;
    }

    addHealthPoints() {
        const hpItem = new Element({ node: 'div', cssStyle: 'savannah__hp-item' });

        const el = document.querySelector(`.${this.cssStyle}`);
        for (let i = 0; i < this.amount; i += 1) {
            el.append(hpItem.create());
        }
    }
}

export default HealthPointBar;