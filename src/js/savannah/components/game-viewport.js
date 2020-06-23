import Element from './main-element';

class GameViewPort extends Element {
    constructor(options, visible) {
        super(options);
        this.visible = visible;
    }

    addViewPort() {
        const wrapper = document.querySelector(`.${this.cssStyle}`);
        const viewPortShot = new Element({node: 'div', cssStyle: 'savannah__viewport-shot'});
        const viewPortCrystal = new Element({node: 'div', cssStyle: 'savannah__viewport-crystal'});

        wrapper.append(viewPortShot.create());
        wrapper.append(viewPortCrystal.create());

        if (this.visible) {
            wrapper.classList.remove('d-none');
        } else {
            wrapper.classList.add('d-none');
        }
    }
}

export default GameViewPort;